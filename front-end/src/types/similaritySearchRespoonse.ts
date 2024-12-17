export interface SimilaritySearchResponse {
    data: SimilaritySearchEntry[]
}

export interface SimilaritySearchEntry {
    file_path: string
    similarity: number
}