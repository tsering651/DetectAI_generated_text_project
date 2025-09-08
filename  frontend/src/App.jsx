
import React, { useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
 
  
  
  const API_URL = import.meta.env.VITE_API_URL ;

const handleSubmit = async () => {
  if (!text.trim()) return;
  setLoading(true);
  setResult(null);

  try {
    const response = await fetch(`${API_URL}/predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    const data = await response.json();
    setResult(data);
  } catch (err) {
    console.error("Error:", err);
    setResult({ prediction: "Error", probabilities: [] });
  }

  setLoading(false);
};

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-center text-indigo-600">
          AI Text Detector (TinyBERT)
        </h1>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your text here..."
          className="w-full h-40 border rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition disabled:bg-gray-400"
        >
          {loading ? "Analyzing..." : "Check Text"}
        </button>

        {result && (
          <div className="mt-6 p-4 border rounded-lg bg-gray-50">
            <h2 className="text-lg font-semibold">Prediction:</h2>
            <p className="text-xl font-bold text-indigo-700">
              {result.prediction}
            </p>
            {result.probabilities && (
              <p className="mt-2 text-sm text-gray-600">
                Probabilities: {JSON.stringify(result.probabilities)}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
