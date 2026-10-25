const User = require("../models/Users.js");

/**
 * Verify the current database role instead of trusting only the role stored in
 * a JWT. This means an account whose admin role is removed loses access on the
 * next request, even if its token has not expired yet.
 */
const adminMiddleware = async (req, res, next) => {
  try {
    const userId = req.user?.userId || req.user?.id || req.user?._id;

    if (!userId) {
      return res.status(401).json({ message: "Authentication required." });
    }

    const user = await User.findById(userId).select("role").lean();

    if (!user) {
      return res.status(401).json({ message: "User account not found." });
    }

    if (user.role !== "admin") {
      return res.status(403).json({ message: "Administrator access required." });
    }

    req.adminUser = { id: userId, role: user.role };
    return next();
  } catch (error) {
    console.error("Admin authorization error:", error.message);
    return res.status(500).json({ message: "Unable to verify administrator access." });
  }
};

module.exports = adminMiddleware;
