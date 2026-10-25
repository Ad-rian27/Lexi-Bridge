
const path = require("path");
const { spawn } = require("child_process");

const PYTHON_PATH = path.resolve(
    __dirname,
    "../../.venv-pdf/Scripts/python.exe"
);

const PYTHON_SCRIPT = path.join(
    __dirname,
    "pdf_block_extractor.py"
);

function extractPdfBlocks(inputPdfPath) {
    return new Promise((resolve, reject) => {
        const child = spawn(
            PYTHON_PATH,
            [PYTHON_SCRIPT, inputPdfPath],
            { windowsHide: true }
        );

        let stdout = "";
        let stderr = "";

        child.stdout.on("data", chunk => {
            stdout += chunk.toString();
        });

        child.stderr.on("data", chunk => {
            stderr += chunk.toString();
        });

        child.on("error", reject);

        child.on("close", code => {
            if (code !== 0) {
                reject(
                    new Error(
                        stderr.trim() ||
                        `PDF block extraction failed (${code})`
                    )
                );
                return;
            }

            try {
                resolve(JSON.parse(stdout));
            } catch (error) {
                reject(
                    new Error(
                        `Could not parse extracted PDF blocks: ${error.message}`
                    )
                );
            }
        });
    });
}

module.exports = { extractPdfBlocks };
