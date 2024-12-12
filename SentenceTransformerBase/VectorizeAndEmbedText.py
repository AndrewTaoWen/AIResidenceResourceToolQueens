from sentence_transformers import SentenceTransformer
import os
import json
import numpy as np

model = SentenceTransformer('all-MiniLM-L6-v2')

def create_embeddings_from_folder(folder_path):
    embeddings = {}
    for root, _, files in os.walk(folder_path):
        for filename in files:
            if filename.endswith('.txt'):
                txt_path = os.path.join(root, filename)
                with open(txt_path, 'r', encoding='utf-8') as file:
                    text = file.read()
                embedding = model.encode(text)
                norm = np.linalg.norm(embedding)
                normalized_embedding = embedding / norm if norm != 0 else embedding
                embeddings[txt_path] = normalized_embedding.tolist()
                print(f"Embedded and normalized {txt_path}")
    return embeddings

folder_path = "../QueensDataTXT"
embeddings_dict = create_embeddings_from_folder(folder_path)

output_path = "./QueensResourceEmbeddings.json"
with open(output_path, 'w', encoding='utf-8') as json_file:
    json.dump(embeddings_dict, json_file, ensure_ascii=False, indent=4)

print(f"Normalized embeddings saved to {output_path}")
