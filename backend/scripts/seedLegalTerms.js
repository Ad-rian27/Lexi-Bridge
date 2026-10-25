
require("dotenv").config();

const mongoose = require("mongoose");
const LegalTerm = require("../models/LegalTerm");
const legalTerms = require("../data/legalTerms");

async function seedLegalTerms() {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is missing from your backend .env file");
  }

  await mongoose.connect(process.env.MONGODB_URI);

  const operations = legalTerms.map((item) => ({
    updateOne: {
      filter: { term: item.term },
      update: {
        $set: item,
      },
      upsert: true,
    },
  }));

  const result = await LegalTerm.bulkWrite(operations, {
    ordered: false,
  });

  console.log(`Dataset terms: ${legalTerms.length}`);
  console.log(`Inserted: ${result.upsertedCount}`);
  console.log(`Updated existing: ${result.modifiedCount}`);
  console.log(`Matched: ${result.matchedCount}`);
  console.log("Legal-term sync completed successfully.");
}

seedLegalTerms()
  .catch((error) => {
    console.error("Legal-term sync failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
  });
