from sentence_transformers import SentenceTransformer
import numpy as np
import json

model = SentenceTransformer('all-MiniLM-L6-v2')

def embed_input_string(input_string):
    embedding = model.encode(input_string)
    norm = np.linalg.norm(embedding)
    return embedding / norm if norm != 0 else embedding

def calculate_cosine_similarity(vec1, vec2):
    return np.dot(vec1, vec2)

def find_top_k_similar(input_string, embeddings_dict, k=5):
    query_embedding = embed_input_string(input_string)

    similarities = []
    for file_path, stored_embedding in embeddings_dict.items():
        stored_embedding = np.array(stored_embedding)
        similarity = calculate_cosine_similarity(query_embedding, stored_embedding)
        similarities.append((file_path, similarity))

    similarities = sorted(similarities, key=lambda x: x[1], reverse=True)
    return similarities[:k]

with open("./QueensResourceEmbeddings.json", "r") as f:
    embeddings_dict = json.load(f)

input_string = "Places to study on campus in Queens University"

top_k_results = find_top_k_similar(input_string, embeddings_dict, k=5)

print("Top 5 most similar files:")
for rank, (file_path, similarity) in enumerate(top_k_results, start=1):
    print(f"Rank {rank}: {file_path}, Similarity: {similarity:.4f}")
