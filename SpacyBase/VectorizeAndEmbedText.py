import os
import spacy
import numpy as np
import json

nlp = spacy.load("en_core_web_md")

def create_embeddings_from_folder(folder_path):
    embeddings = {}

    for root, _, files in os.walk(folder_path):
        for filename in files:
            if filename.endswith('.txt'):
                txt_path = os.path.join(root, filename)

                with open(txt_path, 'r', encoding='utf-8') as file:
                    text = file.read()
                
                doc = nlp(text)
                embedding = doc.vector.tolist()  
                
                embeddings[txt_path] = embedding
                print(f"Embedded {txt_path}")
                
    return embeddings

folder_path = "./QueensDataTXT"
embeddings_dict = create_embeddings_from_folder(folder_path)

output_path = "./QueensResourceEmbeddings.json"
with open(output_path, 'w', encoding='utf-8') as json_file:
    json.dump(embeddings_dict, json_file, ensure_ascii=False, indent=4)
