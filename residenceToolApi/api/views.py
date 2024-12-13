from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import json
import numpy as np
from sentence_transformers import SentenceTransformer

model = SentenceTransformer('all-MiniLM-L6-v2')

with open("./QueensResourceEmbeddings.json", "r") as f:
    embeddings_dict = json.load(f)

def embed_input_string(input_string):
    """Embed and normalize the input string using Sentence Transformers."""
    embedding = model.encode(input_string)
    norm = np.linalg.norm(embedding)
    return embedding / norm if norm != 0 else embedding

def calculate_cosine_similarity(vec1, vec2):
    """Compute cosine similarity between two vectors."""
    return np.dot(vec1, vec2)

def find_top_k_similar(input_string, embeddings_dict, k=5):
    """Find top-k similar embeddings to the input string."""
    query_embedding = embed_input_string(input_string)
    similarities = []
    for file_path, stored_embedding in embeddings_dict.items():
        stored_embedding = np.array(stored_embedding)
        similarity = calculate_cosine_similarity(query_embedding, stored_embedding)
        similarities.append((file_path, similarity))
    similarities = sorted(similarities, key=lambda x: x[1], reverse=True)
    return similarities[:k]

class SimilaritySearchAPIView(APIView):
    def post(self, request):
        input_string = request.data.get("input_string")
        if not input_string:
            return Response({"error": "input_string is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            top_k_results = find_top_k_similar(input_string, embeddings_dict, k=5)
            response_data = [
                {"file_path": file_path, "similarity": similarity}
                for file_path, similarity in top_k_results
            ]
            return Response(response_data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
