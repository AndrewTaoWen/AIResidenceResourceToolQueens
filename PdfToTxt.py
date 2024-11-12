import fitz  
import os

def convert_pdf_folder_to_txt(folder_path, output_folder):
    os.makedirs(output_folder, exist_ok=True)

    for root, _, files in os.walk(folder_path):
        for filename in files:
            if filename.endswith('.pdf'):
                pdf_path = os.path.join(root, filename)
                
                relative_path = os.path.relpath(root, folder_path)
                output_subfolder = os.path.join(output_folder, relative_path)
                os.makedirs(output_subfolder, exist_ok=True)
                
                txt_filename = f"{os.path.splitext(filename)[0]}.txt"
                txt_path = os.path.join(output_subfolder, txt_filename)
                
                with fitz.open(pdf_path) as pdf:
                    text = ""
                    for page_num in range(pdf.page_count):
                        page = pdf[page_num]
                        text += page.get_text()
                        
                with open(txt_path, 'w', encoding='utf-8') as txt_file:
                    txt_file.write(text)
                print(f"Converted {pdf_path} to {txt_path}")

pdf_folder = "./QueensDataPDF"
output_folder = "./QueensDataTXT"

convert_pdf_folder_to_txt(pdf_folder, output_folder)
