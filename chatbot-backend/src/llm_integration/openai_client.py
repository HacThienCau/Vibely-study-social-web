from llama_index.llms.openai import OpenAI
import yaml
import os 
import openai

# Load file yaml
def load_config(config_file="./configs/api_keys.yaml"):
    with open(config_file, "r") as file:
        return yaml.safe_load(file)

# Tải API key từ file yaml
config = load_config()
openai.api_key = config["openai"]["api_key"]

# Khởi tạo các model LLM từ OpenAI với các thông số khác nhau để xử lý các tác vụ khác nhau
llmTitle = OpenAI(        
        temperature=0.2,
        model="gpt-4o-mini",
        api_key=config["openai"]["api_key"])

llmAgent = OpenAI(
        temperature=0.1,
        model="gpt-4o-mini",
        api_key=config["openai"]["api_key"])

llmRetriever = OpenAI(
        temperature=0,
        model="gpt-4o-mini",
        api_key=config["openai"]["api_key"])

llmTransform = OpenAI(
        temperature=0.2,
        model="gpt-4o-mini",
        api_key=config["openai"]["api_key"])

# Các hàm getter để lấy các model LLM khi cần
def get_llmTitle():
    return llmTitle

def get_llmAgent():
    return llmAgent

def get_llmRetriever():
    return llmRetriever

def get_llmTransform():
    return llmTransform