
import json
import os
import sys
import pymupdf


FONT_FILES = {
    "Malayalam": "NotoSansMalayalam-Regular.ttf",
    "Hindi": "NotoSansDevanagari-Regular.ttf",
    "Tamil": "NotoSansTamil-Regular.ttf",
}

# These original closing markings must not remain in the translation.
EXCLUDED_TEXT = {
    "anand/-",
    "(alok kumar, j)",
    "u t",
}


def normalize(text):
    return " ".join((text or "").split()).casefold()


def render_translated_blocks(
    input_pdf,
    translated_json,
    output_pdf,
    language,
    fonts_directory,
):
    font_file = FONT_FILES.get(language)
    if not font_file:
        raise ValueError(f"Unsupported language: {language}")

    font_path = os.path.join(fonts_directory, font_file)
    if not os.path.isfile(font_path):
        raise FileNotFoundError(f"Font not found: {font_path}")

    with open(translated_json, "r", encoding="utf-8-sig") as file:
        blocks = json.load(file)

    document = pymupdf.open(input_pdf)

    try:
        # Match the original text blocks to the translated blocks.
        translations_by_page = {}
        for block in blocks:
            translations_by_page.setdefault(
                int(block["pageNumber"]), []
            ).append(block)

        # Identify excluded markings directly in the original PDF.
        for page in document:
            for block in page.get_text("dict")["blocks"]:
                if block.get("type") != 0:
                    continue

                original_text = "\n".join(
                    "".join(span.get("text", "") for span in line.get("spans", []))
                    for line in block.get("lines", [])
                ).strip()

                if normalize(original_text) in EXCLUDED_TEXT:
                    page.add_redact_annot(
                        pymupdf.Rect(block["bbox"]),
                        fill=False,
                        cross_out=False,
                    )

        # Redact source text only where translations are available.
        for page_number, page_blocks in translations_by_page.items():
            page = document[page_number - 1]

            for block in page_blocks:
                page.add_redact_annot(
                    pymupdf.Rect(block["bbox"]),
                    fill=False,
                    cross_out=False,
                )

        # Apply redactions once per page.
        for page in document:
            page.apply_redactions(
                images=pymupdf.PDF_REDACT_IMAGE_NONE,
                graphics=pymupdf.PDF_REDACT_LINE_ART_NONE,
                text=pymupdf.PDF_REDACT_TEXT_REMOVE,
            )

        
        # Insert the translations.
        for page_number, page_blocks in translations_by_page.items():
            page = document[page_number - 1]

            for index, block in enumerate(page_blocks):
                rect = pymupdf.Rect(block["bbox"])
                original_text = block.get("originalText", "").strip()

                # Give the ORAL ORDER heading more room.
                if original_text.upper() == "ORAL ORDER":
                    rect.x0 = 150
                    rect.x1 = page.rect.width - 50
                    rect.y0 -= 3
                    rect.y1 += 18
                elif block["blockId"] == "p1-b7":
                # Preserve the page number and date while allowing
                # the translated sentence more vertical space.
                    rect.y0 -= 1
                    rect.y1 += 30
                
                elif block["blockId"] == "p1-b16":
                    rect.y0 -= 2
                    rect.y1 += 20
                    
                elif block["blockId"] == "p1-b18":
                    rect.y0 -= 2
                    rect.y1 += 20
                    
                elif block["blockId"] == "p1-b20":
                    rect.y0 -= 2
                    rect.y1 += 20
                
                elif block["blockId"] == "p2-b1":
                    rect.y0 -= 2
                    rect.y1 += 20
                    
                elif block["blockId"] == "p2-b10":
                    rect.y0 -= 2
                    rect.y1 += 20
                
                elif block["blockId"] == "p2-b13":
                    rect.y0 -= 2
                    rect.y1 += 20

                else:
                    rect.x0 -= 1
                    rect.y0 -= 1
                    rect.x1 += 1
                    rect.y1 += 1

                font_name = f"LexiFont{page_number}_{index}"
                page.insert_font(
                    fontname=font_name,
                    fontfile=font_path,
                )

                translated_text = block["translatedText"].strip()
                original_size = max(8, rect.height * 0.8)
                successful_size = None

                # Test font sizes before drawing visible text.
                for font_size in sorted(
                    {original_size, 10.0, 9.0, 8.0},
                    reverse=True,
                ):
                    remaining = page.insert_textbox(
                        rect,
                        translated_text,
                        fontname=font_name,
                        fontsize=font_size,
                        lineheight=1.0,
                        color=(0, 0, 0),
                        align=pymupdf.TEXT_ALIGN_CENTER,
                        render_mode=3,
                        overlay=True,
                    )

                    if remaining >= 0:
                        successful_size = font_size
                        break

                if successful_size is None:
                    raise ValueError(
                        f"Translation does not fit block "
                        f"{block['blockId']}. The text area needs "
                        "expansion or reflow."
                    )

                page.insert_textbox(
                    rect,
                    translated_text,
                    fontname=font_name,
                    fontsize=successful_size,
                    lineheight=1.0,
                    color=(0, 0, 0),
                    align=pymupdf.TEXT_ALIGN_CENTER,
                    overlay=True,
                )


        document.save(output_pdf, garbage=4, deflate=True)
        print(f"Rendered PDF: {output_pdf}")

    finally:
        document.close()


def main():
    if len(sys.argv) != 6:
        raise ValueError(
            "Usage: pdf_block_renderer.py input.pdf translated.json "
            "output.pdf Language fonts_directory"
        )

    render_translated_blocks(
        sys.argv[1],
        sys.argv[2],
        sys.argv[3],
        sys.argv[4],
        sys.argv[5],
    )


if __name__ == "__main__":
    main()
