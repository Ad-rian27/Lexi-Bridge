const { SarvamAIClient } = require("sarvamai");

const client = new SarvamAIClient({
    apiSubscriptionKey: process.env.SARVAM_API_KEY
});

const MAX_CHARS = 1800;

// Split text while trying to preserve paragraphs and sentences
function splitText(text) {
    const chunks = [];
    let currentChunk = "";

    const paragraphs = text.split(/\n\s*\n/);

    for (const paragraph of paragraphs) {
        const cleanedParagraph = paragraph.trim();

        if (!cleanedParagraph) {
            continue;
        }

        // If the paragraph fits, add it normally
        if (
            currentChunk.length + cleanedParagraph.length + 2 <=
            MAX_CHARS
        ) {
            currentChunk +=
                (currentChunk ? "\n\n" : "") + cleanedParagraph;
            continue;
        }

        // Save the current chunk
        if (currentChunk) {
            chunks.push(currentChunk);
            currentChunk = "";
        }

        // If the paragraph itself is too long,
        // split it sentence by sentence
        const sentences = cleanedParagraph.split(/(?<=[.!?])\s+/);

        for (const sentence of sentences) {
            if (
                currentChunk.length + sentence.length + 1 <=
                MAX_CHARS
            ) {
                currentChunk +=
                    (currentChunk ? " " : "") + sentence;
            } else {
                if (currentChunk) {
                    chunks.push(currentChunk);
                }

                currentChunk = sentence;
            }
        }
    }

    if (currentChunk) {
        chunks.push(currentChunk);
    }

    return chunks;
}

async function translateText(text, targetLanguage) {
    const response = await client.text.translate({
        input: text,
        source_language_code: "en-IN",
        target_language_code: targetLanguage,
        model: "sarvam-translate:v1",
        mode: "formal"
    });

    return response.translated_text;
}

async function translateLongText(text, targetLanguage) {
    const chunks = splitText(text);

    console.log(`Translation split into ${chunks.length} chunks.`);

    const translatedChunks = [];

    for (let i = 0; i < chunks.length; i++) {
        console.log(
            `Translating chunk ${i + 1}/${chunks.length}...`
        );

        const translatedChunk = await translateText(
            chunks[i],
            targetLanguage
        );

        translatedChunks.push(translatedChunk);
    }

    return translatedChunks.join("\n\n");
}

module.exports = {
    translateText,
    translateLongText
};