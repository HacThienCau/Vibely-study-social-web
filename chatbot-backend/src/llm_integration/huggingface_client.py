from llama_index.embeddings.huggingface import HuggingFaceEmbedding

# Tạo và lưu trữ embed model
embed_model = HuggingFaceEmbedding(model_name="bkai-foundation-models/vietnamese-bi-encoder")

def get_embed_model():
    return embed_model

embed_model_halong = HuggingFaceEmbedding(model_name="hiieu/halong_embedding")

def get_embed_model_halong():
    return embed_model_halong