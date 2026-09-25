require("dotenv").config();

const mongoose = require("mongoose");
const LegalTerm = require("../models/LegalTerm");
const legalTerms = require("../data/legalTerms");

async function seedLegalTerms() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        console.log("Connected to MongoDB");

        let inserted = 0;
        let updated = 0;

        for (const termData of legalTerms) {
            const existingTerm = await LegalTerm.findOne({
                term: termData.term
            });

            if (existingTerm) {
                await LegalTerm.updateOne(
                    { term: termData.term },
                    { $set: termData }
                );

                updated++;
                console.log(`Updated: ${termData.term}`);
            } else {
                await LegalTerm.create(termData);

                inserted++;
                console.log(`Inserted: ${termData.term}`);
            }
        }

        console.log("\nSeeding completed.");
        console.log(`Inserted: ${inserted}`);
        console.log(`Updated: ${updated}`);

        await mongoose.connection.close();

        console.log("MongoDB connection closed");
    } catch (error) {
        console.error("Seeding failed:", error);

        if (mongoose.connection.readyState !== 0) {
            await mongoose.connection.close();
        }

        process.exit(1);
    }
}

seedLegalTerms();