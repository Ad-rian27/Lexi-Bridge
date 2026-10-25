
import json
import os
import sys
import pymupdf


FONT_FILES = {
    "Malayalam": "NotoSansMalayalam-Regular.ttf",
    "Hindi": "NotoSansDevanagari-Regular.ttf",
    "Tamil": "NotoSansTamil-Regular.ttf",
}

# Original closing markings that should not appear in the translation.
EXCLUDED_TEXT = {
    "anand/-",
    "(alok kumar, j)",
    "u",
    "t",
}


def normalize(text):
    return " ".join((text or "").split()).casefold()


def create_translated_pdf(
    input_pdf,
    translated_pages_json,
    output_pdf,
    language,
    fonts_directory,
):
    if not os.path.isfile(input_pdf):
        raise FileNotFoundError(f"Original PDF not found: {input_pdf}")

    if not os.path.isfile(translated_pages_json):
        raise FileNotFoundError("Translated pages JSON not found")

    if language not in FONT_FILES:
        raise ValueError(f"Unsupported language: {language}")

    font_path = os.path.join(fonts_directory, FONT_FILES[language])

    if not os.path.isfile(font_path):
        raise FileNotFoundError(f"Language font not found: {font_path}")

    with open(translated_pages_json, "r", encoding="utf-8") as file:
        translated_pages = json.load(file)

    translations = {
        int(item["pageNumber"]): item.get("text", "")
        for item in translated_pages
    }

    source = pymupdf.open(input_pdf)
    output = pymupdf.open()

    try:
        for page_index, original_page in enumerate(source):
            page_number = page_index + 1
            translated_text = translations.get(page_number, "").strip()

            # Preserve the original page dimensions.
            page = output.new_page(
                width=original_page.rect.width,
                height=original_page.rect.height,
            )

            # Preserve non-text artwork where possible.
            # Text removal is performed separately below.
            page.show_pdf_page(
                page.rect,
                source,
                page_index,
                overlay=False,
            )

            # Remove the original text layer, retaining images and vectors.
            # This is intentionally a prototype; complex PDFs need visual QA.
            page.add_redact_annot(
                page.rect,
                fill=False,
                cross_out=False,
            )
            page.apply_redactions(
                images=pymupdf.PDF_REDACT_IMAGE_NONE,
                graphics=pymupdf.PDF_REDACT_LINE_ART_NONE,
                text=pymupdf.PDF_REDACT_TEXT_REMOVE,
            )

            if not translated_text:
                continue

            # Use a broad content area and allow text to flow to
            # additional pages in a future pagination pass.
            margin_x = 54
            margin_top = 90
            margin_bottom = 60

            content_rect = pymupdf.Rect(
                margin_x,
                margin_top,
                page.rect.width - margin_x,
                page.rect.height - margin_bottom,
            )

            page.insert_font(fontname="LexiFont", fontfile=font_path)

            font_size = 12
            result = page.insert_textbox(
                content_rect,
                translated_text,
                fontname="LexiFont",
                fontsize=font_size,
                lineheight=1.5,
                color=(0, 0, 0),
                align=pymupdf.TEXT_ALIGN_LEFT,
                overlay=True,
            )

            if result < 0:
                raise ValueError(
                    f"Translated text overflows page {page_number}. "
                    "Automatic continuation pages are not implemented yet."
                )

        output.save(output_pdf, garbage=4, deflate=True)

    finally:
        output.close()
        source.close()


def main():
    if len(sys.argv) != 6:
        raise ValueError(
            "Usage: pdf_reconstruct_translated.py "
            "original.pdf translated_pages.json output.pdf "
            "Language fonts_directory"
        )

    create_translated_pdf(
        input_pdf=sys.argv[1],
        translated_pages_json=sys.argv[2],
        output_pdf=sys.argv[3],
        language=sys.argv[4],
        fonts_directory=sys.argv[5],
    )

    print(f"Translated PDF created: {sys.argv[3]}")


if __name__ == "__main__":
    main()
