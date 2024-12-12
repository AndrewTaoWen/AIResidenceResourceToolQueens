import faiss
import numpy as np
import json 
import spacy
import os

os.environ["KMP_DUPLICATE_LIB_OK"] = "TRUE"

nlp = spacy.load("en_core_web_md")

def load_embeddings_from_json(json_path):
    with open(json_path, 'r', encoding='utf-8') as file:
        embeddings_dict = json.load(file)
    
    embeddings_dict = {key: np.array(value, dtype='float32') for key, value in embeddings_dict.items()}
    
    return embeddings_dict

json_path = "./QueensResourceEmbeddings.json"
embeddings_dict = load_embeddings_from_json(json_path)

embedding_matrix = np.array(list(embeddings_dict.values())).astype('float32')

num_threads = 4  
faiss.omp_set_num_threads(num_threads)

d = embedding_matrix.shape[1]  
index = faiss.IndexFlatL2(d)  
index.add(embedding_matrix)  

def query_faiss(query_text, n_results=20):
    query_embedding = np.array([nlp(query_text).vector]).astype('float32')

    distances, indices = index.search(query_embedding, n_results)

    results = [(list(embeddings_dict.keys())[idx], distances[0][i]) for i, idx in enumerate(indices[0])]

    results.sort(key=lambda x: x[1], reverse=True)

    return results

query = "internation students financial aid"
similar_docs = query_faiss(query)
for path, score in similar_docs:
    print(f"Document: {path}, Similarity Score: {score}")

embedding_matrix = np.array(list(embeddings_dict.values()))

doc_paths = list(embeddings_dict.keys())


