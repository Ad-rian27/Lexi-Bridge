const mongoose = require("mongoose");

const legalTermSchema = new mongoose.Schema(
    {
        term: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        translations: {
            malayalam: {
                type: String,
                required: true
            },

            hindi: {
                type: String,
                required: true
            },

            tamil: {
                type: String,
                required: true
            }
        },

        definitions: {
            english: {
                type: String,
                required: true
            },

            malayalam: {
                type: String,
                required: true
            },

            hindi: {
                type: String,
                required: true
            },

            tamil: {
                type: String,
                required: true
            }
        },

        simplifiedMeaning: {
            english: {
                type: String,
                required: true
            },

            malayalam: {
                type: String,
                required: true
            },

            hindi: {
                type: String,
                required: true
            },

            tamil: {
                type: String,
                required: true
            }
        },

        category: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("LegalTerm", legalTermSchema);