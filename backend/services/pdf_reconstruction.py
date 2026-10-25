
import os
import sys
import json
import pymupdf


def inspect_pdf_layout(input_pdf, output_json):
    if not os.path.isfile(input_pdf):
        raise FileNotFoundError(f"PDF not found: {input_pdf}")

    document = pymupdf.open(input_pdf)

    try:
        report = {
            "source": os.path.basename(input_pdf),
            "pageCount": len(document),
            "pages": [],
        }

        for page_number, page in enumerate(document, start=1):
            blocks = []

            for block in page.get_text("dict")["blocks"]:
                if block.get("type") != 0:
                    continue

                lines = []

                for line in block.get("lines", []):
                    text = "".join(
                        span.get("text", "")
                        for span in line.get("spans", [])
                    ).strip()

                    if text:
                        lines.append({
                            "text": text,
                            "bbox": line.get("bbox"),
                        })

                if lines:
                    blocks.append({
                        "bbox": block.get("bbox"),
                        "lines": lines,
                        "text": "\n".join(
                            line["text"] for line in lines
                        ),
                    })

            report["pages"].append({
                "pageNumber": page_number,
                "width": page.rect.width,
                "height": page.rect.height,
                "blocks": blocks,
            })

        with open(output_json, "w", encoding="utf-8") as file:
            json.dump(report, file, ensure_ascii=False, indent=2)

    finally:
        document.close()


def main():
    if len(sys.argv) != 3:
        raise ValueError(
            "Usage: pdf_reconstruction.py input.pdf layout_report.json"
        )

    inspect_pdf_layout(sys.argv[1], sys.argv[2])
    print("PDF layout report created successfully.")


if __name__ == "__main__":
    main()
