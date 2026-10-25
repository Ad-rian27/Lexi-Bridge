const express = require("express");
const authMiddleware = require("../middleware/authMiddleware.js");
const adminMiddleware = require("../middleware/adminMiddleware.js");
const User = require("../models/Users.js");
const Document = require("../models/Document.js");
const Translation = require("../models/Translation.js");

const router = express.Router();
router.use(authMiddleware, adminMiddleware);

const countStatuses = async (Model, field, statuses) => {
  const rows = await Model.aggregate([
    { $group: { _id: `$${field}`, count: { $sum: 1 } } },
  ]);
  const result = Object.fromEntries(statuses.map((status) => [status, 0]));
  for (const row of rows) {
    if (Object.prototype.hasOwnProperty.call(result, row._id)) result[row._id] = row.count;
  }
  return result;
};

router.get("/overview", async (req, res) => {
  try {
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const [
      totalUsers,
      newUsers7d,
      totalDocuments,
      documents7d,
      totalTranslations,
      translations7d,
      documentStatuses,
      translationStatuses,
      languageRows,
      recentUsers,
      dailyTranslations,
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ createdAt: { $gte: sevenDaysAgo } }),
      Document.countDocuments(),
      Document.countDocuments({ createdAt: { $gte: sevenDaysAgo } }),
      Translation.countDocuments(),
      Translation.countDocuments({ createdAt: { $gte: sevenDaysAgo } }),
      countStatuses(Document, "processingStatus", ["pending", "processing", "completed", "failed"]),
      countStatuses(Translation, "status", ["pending", "processing", "completed", "failed"]),
      Translation.aggregate([
        { $group: { _id: "$targetLanguage", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]),
      User.find({}, { name: 1, email: 1, role: 1, createdAt: 1 })
        .sort({ createdAt: -1 })
        .limit(8)
        .lean(),
      Translation.aggregate([
        { $match: { createdAt: { $gte: thirtyDaysAgo } } },
        {
          $group: {
            _id: {
              $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
            },
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ]),
    ]);

    const languageUsage = { Malayalam: 0, Hindi: 0, Tamil: 0 };
    for (const row of languageRows) {
      if (Object.prototype.hasOwnProperty.call(languageUsage, row._id)) {
        languageUsage[row._id] = row.count;
      }
    }

    // Return the last 30 calendar days, including zero-activity days.
    const countsByDate = new Map(dailyTranslations.map((row) => [row._id, row.count]));
    const translationActivity = [];
    for (let offset = 29; offset >= 0; offset -= 1) {
      const date = new Date(now);
      date.setHours(0, 0, 0, 0);
      date.setDate(date.getDate() - offset);
      const key = date.toISOString().slice(0, 10);
      translationActivity.push({ date: key, count: countsByDate.get(key) || 0 });
    }

    return res.json({
      generatedAt: now.toISOString(),
      summary: {
        totalUsers,
        newUsers7d,
        totalDocuments,
        documents7d,
        totalTranslations,
        translations7d,
      },
      documentStatuses,
      translationStatuses,
      languageUsage,
      recentUsers: recentUsers.map((user) => ({
        id: String(user._id),
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      })),
      translationActivity,
    });
  } catch (error) {
    console.error("Admin overview error:", error.message);
    return res.status(500).json({ message: "Unable to load admin overview." });
  }
});

// Return a small, paginated user directory. Sensitive fields such as password
// hashes and document contents are never selected or returned.
router.get("/users", async (req, res) => {
  try {
    const page = Math.max(1, Number.parseInt(req.query.page, 10) || 1);
    const limit = Math.min(50, Math.max(1, Number.parseInt(req.query.limit, 10) || 20));
    const search = String(req.query.search || "").trim().slice(0, 100);
    const filter = search
      ? { $or: [
          { name: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
        ] }
      : {};

    const [users, total] = await Promise.all([
      User.find(filter, { name: 1, email: 1, role: 1, createdAt: 1 })
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      User.countDocuments(filter),
    ]);

    return res.json({
      users: users.map((user) => ({
        id: String(user._id),
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      })),
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error("Admin user list error:", error.message);
    return res.status(500).json({ message: "Unable to load users." });
  }
});

module.exports = router;
