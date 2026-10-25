
const LegalTerm = require("../models/LegalTerm");

function escapeRegex(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Allow spaces and line breaks to vary between the stored term
// and the document text.
function buildTermRegex(term) {
  const escapedTerm = escapeRegex(String(term).trim())
    .replace(/\s+/g, "\\s+");

  // Unicode-aware boundaries work with English and Indian scripts.
  return new RegExp(
    `(?<![\\p{L}\\p{N}_])${escapedTerm}(?![\\p{L}\\p{N}_])`,
    "giu"
  );
}

function getLanguageKey(targetLanguage) {
  const languageMap = {
    "ml-IN": "malayalam",
    "hi-IN": "hindi",
    "ta-IN": "tamil",
  };

  return languageMap[targetLanguage] || null;
}

// Keep only unique, non-overlapping matches.
// When matches start at the same position, prefer the longest phrase.
function removeDuplicateAndOverlappingTerms(terms) {
  const uniqueTerms = new Map();

  for (const term of terms) {
    const key = [
      term.start,
      term.end,
      term.term.toLowerCase(),
    ].join(":");

    if (!uniqueTerms.has(key)) {
      uniqueTerms.set(key, term);
    }
  }

  const sortedTerms = Array.from(uniqueTerms.values()).sort(
    (a, b) =>
      a.start - b.start ||
      (b.end - b.start) - (a.end - a.start)
  );

  const result = [];
  let currentEnd = -1;

  for (const term of sortedTerms) {
    // The viewer cannot render overlapping highlights reliably.
    if (term.start < currentEnd) {
      continue;
    }

    result.push(term);
    currentEnd = term.end;
  }

  return result;
}

async function detectLegalTerms(text) {
  if (!text || !text.trim()) {
    return [];
  }

  const legalTerms = await LegalTerm.find({}).lean();
  const detectedTerms = [];

  for (const legalTerm of legalTerms) {
    if (!legalTerm.term?.trim()) {
      continue;
    }

    const regex = buildTermRegex(legalTerm.term);
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
        simplifiedMeaning: legalTerm.simplifiedMeaning,
      });

      // Safety guard against zero-length matches.
      if (match[0].length === 0) {
        regex.lastIndex++;
      }
    }
  }

  return removeDuplicateAndOverlappingTerms(detectedTerms);
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

    if (
      typeof translatedTerm !== "string" ||
      !translatedTerm.trim()
    ) {
      continue;
    }

    const regex = buildTermRegex(translatedTerm);
    let match;

    while ((match = regex.exec(text)) !== null) {
      const definition =
        legalTerm.definitions?.[languageKey] ||
        legalTerm.definitions?.english ||
        "";

      const simplifiedMeaning =
        legalTerm.simplifiedMeaning?.[languageKey] ||
        legalTerm.simplifiedMeaning?.english ||
        "";

      detectedTerms.push({
        term: legalTerm.term,
        translatedTerm,
        translations: legalTerm.translations || {},
        definition,
        definitions: legalTerm.definitions || {},
        simplifiedMeaning,
        category: legalTerm.category || "Legal Term",
        start: match.index,
        end: match.index + match[0].length,
        matchedText: match[0],
      });

      if (match[0].length === 0) {
        regex.lastIndex++;
      }
    }
  }

  return removeDuplicateAndOverlappingTerms(detectedTerms);
}



module.exports = {
  detectLegalTerms,
  detectTranslatedLegalTerms,
};
