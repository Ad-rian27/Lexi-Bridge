
const fs = require("fs");
const path = require("path");
const os = require("os");
const { spawn } = require("child_process");

const PYTHON_PATH = path.resolve(
  __dirname,
  "../../.venv-pdf/Scripts/python.exe"
);

const PYTHON_SCRIPT = path.join(
  __dirname,
  "pdf_reconstruction.py"
);

function inspectPdfLayout(inputPdfPath) {
  return new Promise((resolve, reject) => {
    const outputJsonPath = path.join(
      os.tmpdir(),
      `lexibridge-layout-${Date.now()}-${process.pid}.json`
    );

    const child = spawn(
      PYTHON_PATH,
      [PYTHON_SCRIPT, inputPdfPath, outputJsonPath],
      { windowsHide: true }
    );

    let stdout = "";
    let stderr = "";

    child.stdout.on("data", (chunk) => {
      stdout += chunk.toString();
    });

    child.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
    });

    child.on("error", (error) => {
      reject(error);
    });

    child.on("close", (code) => {
      try {
        if (code !== 0) {
          reject(
            new Error(
              stderr.trim() ||
                stdout.trim() ||
                `PDF inspection failed with exit code ${code}`
            )
          );
          return;
        }

        if (!fs.existsSync(outputJsonPath)) {
          reject(new Error("Layout report was not created"));
          return;
        }

        const report = JSON.parse(
          fs.readFileSync(outputJsonPath, "utf8")
        );

        resolve(report);
      } catch (error) {
        reject(error);
      } finally {
        try {
          if (fs.existsSync(outputJsonPath)) {
            fs.unlinkSync(outputJsonPath);
          }
        } catch {
          // Ignore temporary-file cleanup errors.
        }
      }
    });
  });
}

module.exports = {
  inspectPdfLayout,
};
