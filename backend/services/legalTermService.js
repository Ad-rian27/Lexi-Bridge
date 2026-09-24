const LegalTerm = require("../models/LegalTerm");

function escapeRegex(text) {
    return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function getLanguageKey(targetLanguage) {
    const languageMap = {
        "ml-IN": "malayalam",
        "hi-IN": "hindi",
        "ta-IN": "tamil"
    };

    return languageMap[targetLanguage] || null;
}

async function detectLegalTerms(text) {
    if (!text || !text.trim()) {
        return [];
    }

    const legalTerms = await LegalTerm.find({}).lean();

    const detectedTerms = [];

    for (const legalTerm of legalTerms) {
        const escapedTerm = escapeRegex(legalTerm.term);

        const regex = new RegExp(
            `\\b${escapedTerm}\\b`,
            "gi"
        );

        let match;

        while ((match = regex.exec(text)) !== null) {
            detectedTerms.push({
                term: legalTerm.term,
                start: match.index,
                end: match.index + match[0].length,
                matchedText: match[0],
                category: legalTerm.category,
                translations: legalTerm.translations,
                definitions: legalTerm.definitions,
                simplifiedMeaning: legalTerm.simplifiedMeaning
            });
        }
    }

    detectedTerms.sort((a, b) => a.start - b.start);

    return detectedTerms;
}

async function detectTranslatedLegalTerms(text, targetLanguage) {
    if (!text || !text.trim()) {
        return [];
    }

    const languageKey = getLanguageKey(targetLanguage);

    if (!languageKey) {
        return [];
    }

    const legalTerms = await LegalTerm.find({}).lean();

    const detectedTerms = [];

    for (const legalTerm of legalTerms) {
        const translatedTerm = legalTerm.translations?.[languageKey];

        if (!translatedTerm) {
            continue;
        }

        const escapedTerm = escapeRegex(translatedTerm);

        const regex = new RegExp(
            escapedTerm,
            "gi"
        );

        let match;

        while ((match = regex.exec(text)) !== null) {
            detectedTerms.push({
                term: legalTerm.term,
                matchedText: match[0],
                start: match.index,
                end: match.index + match[0].length,
                translatedTerm,
                category: legalTerm.category,
                definitions: legalTerm.definitions,
                simplifiedMeaning: legalTerm.simplifiedMeaning
            });
        }
    }

    detectedTerms.sort((a, b) => a.start - b.start);

    return detectedTerms;
}

module.exports = {
    detectLegalTerms,
    detectTranslatedLegalTerms
};