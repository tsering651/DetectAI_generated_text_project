from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch
import uvicorn

# 🔹 Create FastAPI app FIRST
app = FastAPI()

# 🔹 Add CORS middleware BEFORE defining routes
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,       # allow your React frontend
    allow_credentials=True,
    allow_methods=["*"],         # allow GET, POST, OPTIONS
    allow_headers=["*"],         # allow headers
)

# 🔹 Request schema
class TextRequest(BaseModel):
    text: str

# 🔹 Load model
MODEL_PATH = "./ GlobalModel"
tokenizer = AutoTokenizer.from_pretrained(MODEL_PATH)
model = AutoModelForSequenceClassification.from_pretrained(MODEL_PATH)

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)
model.eval()

# 🔹 Routes
@app.get("/")
def read_root():
    return {"message": "Hello World"}

@app.post("/predict")
async def predict(request: TextRequest):
    inputs = tokenizer(request.text, return_tensors="pt", truncation=True, padding=True, max_length=512).to(device)
    with torch.no_grad():
        outputs = model(**inputs)
        probs = torch.softmax(outputs.logits, dim=-1).cpu().numpy()[0]

    prediction = "AI Generated" if probs[1] > 0.6 else "Human Written"
    return {"prediction": prediction, "probabilities": {"human": float(probs[0]), "ai": float(probs[1])}}

# 🔹 Run backend
#uvicorn backend:app --reload --port 8000

if __name__ == "__main__":
    uvicorn.run("backend:app", host="0.0.0.0", port=8000, reload=True)
