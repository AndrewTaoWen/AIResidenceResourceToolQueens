# AI Residence Resource Tool for Queens University

This project recursively generates embeddings from `.txt` files in a directory, stores them in a JSON file, and performs similarity-based searches using FAISS. It leverages `spaCy` for embedding generation and `faiss-cpu` for efficient similarity searches.

## Setup

### Requirements

- **Python 3.8.10**
- **Dependencies**: `spaCy`, `faiss-cpu`, `scikit-learn`

### Installation Steps

To make contributions to this repo, we need to follow the following steps.

Make sure you get brew, makes life easier:

Install brew (https://brew.sh)

1. **Create and Activate a Virtual Environment**
   ```bash
   brew install pyenv
   pyenv virtualenv 3.8.10 embedding-env
   pyenv activate embedding-env
   ```
2. **Create Environment Script**
   ```bash
   vi ~/.bashrc
   ```
   Paste the following contents in:
   ```bash
   export PATH="$HOME/.pyenv/bin:$PATH"
   eval "$(pyenv init --path)"
   eval "$(pyenv init -)"
   eval "$(pyenv virtualenv-init -)"
   
   ```
   (Don't forget newline charater)

   We can run this to reset
   ```bash
   exec "$SHELL"
   ```

   And when we activate the environment and **fail**, run
   ```bash
   source ~/.bashrc
   ```
   to reset, then run
   ```bash
   pyenv virtualenvs
   ```
   to see our environments.
   

4. **Install Required Packages**
   ```bash
   pip install spacy faiss-cpu scikit-learn
   ```

5. **Download `spaCy` Language Model**
   ```bash
   python -m spacy download en_core_web_md
   ```

### Running the Scripts

1. **PDF to TXT Conversion**
   Use the folliwng script to convert the website PDFs to `.txt`, which is required for performing the embedding.

   ```python
   python PdfToTxt.py
   ```

3. **Generate Embeddings from Text Files**

   Use the following script to recursively convert all `.txt` files in a directory into embeddings and save them to a JSON file.

   ```python
   python VectorizeAndEmbedText.py
   ```

   This script will:
   - Traverse the directory `path/to/your/txt/folder` and create embeddings for each `.txt` file.
   - Save all embeddings as `embeddings.json` in the specified output path.
  
4. **Query Embeddings**

   Run the query script to load the embeddings from `embeddings.json` and perform similarity searches with FAISS.

   ```python
   python Query.py
   ```

   This script will:
   - Load the embeddings from the JSON file.
   - Convert the query into an embedding and find the most similar documents using FAISS.
   - Print the top matches with similarity scores.
  

