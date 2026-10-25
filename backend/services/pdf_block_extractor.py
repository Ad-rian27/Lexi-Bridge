
import json
import os
import sys
import pymupdf


def extract_pdf_blocks(input_pdf):
    if not os.path.isfile(input_pdf):
        raise FileNotFoundError(f"PDF not found: {input_pdf}")

    document = pymupdf.open(input_pdf)

    try:
        result = {
            "pageCount": len(document),
            "pages": [],
        }

        for page_number, page in enumerate(document, start=1):
            blocks = []
            block_id = 0

            for block in page.get_text("dict")["blocks"]:
                if block.get("type") != 0:
                    continue

                lines = []

                for line in block.get("lines", []):
                    text = "".join(
                        span.get("text", "")
                        for span in line.get("spans", [])
                    )

                    if text.strip():
                        lines.append(text)

                text = "\n".join(lines).strip()

                if not text:
                    continue

                block_id += 1

                blocks.append({
                    "blockId": f"p{page_number}-b{block_id}",
                    "pageNumber": page_number,
                    "text": text,
                    "bbox": list(block["bbox"]),
                })

            result["pages"].append({
                "pageNumber": page_number,
                "width": page.rect.width,
                "height": page.rect.height,
                "blocks": blocks,
            })

        return result

    finally:
        document.close()


def main():
    if len(sys.argv) != 2:
        raise ValueError(
            "Usage: pdf_block_extractor.py input.pdf"
        )

    result = extract_pdf_blocks(sys.argv[1])
    print(json.dumps(result, ensure_ascii=False))


if __name__ == "__main__":
    main()
