
// import React, { useState } from "react";

// function App() {
//   const [text, setText] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [result, setResult] = useState(null);
 
  
  
//   const API_URL = import.meta.env.VITE_API_URL ;

// const handleSubmit = async () => {
//   if (!text.trim()) return;
//   setLoading(true);
//   setResult(null);

//   try {
//     const response = await fetch(`${API_URL}/predict`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ text }),
//     });

//     const data = await response.json();
//     setResult(data);
//   } catch (err) {
//     console.error("Error:", err);
//     setResult({ prediction: "Error", probabilities: [] });
//   }

//   setLoading(false);
// };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
//       <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-6">
//         <h1 className="text-2xl font-bold mb-4 text-center text-indigo-600">
//           AI Text Detector (TinyBERT)
//         </h1>

//         <textarea
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           placeholder="Paste your text here..."
//           className="w-full h-40 border rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
//         />

//         <button
//           onClick={handleSubmit}
//           disabled={loading}
//           className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition disabled:bg-gray-400"
//         >
//           {loading ? "Analyzing..." : "Check Text"}
//         </button>

//         {result && (
//           <div className="mt-6 p-4 border rounded-lg bg-gray-50">
//             <h2 className="text-lg font-semibold">Prediction:</h2>
//             <p className="text-xl font-bold text-indigo-700">
//               {result.prediction}
//             </p>
//             {result.probabilities && (
//               <p className="mt-2 text-sm text-gray-600">
//                 Probabilities: {JSON.stringify(result.probabilities)}
//               </p>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;


import React, { useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

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
    
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-indigo-50 via-white to-indigo-100">
      {/* Header */}
      <header className="w-full flex items-center justify-between bg-white shadow-md px-6 py-4 border-b border-gray-200">
        {/* Left: Logo + Name */}
        <div className="flex items-center space-x-3">
         
          <h1 className="text-xl font-bold text-indigo-700">AI Detector</h1>
        </div>

        {/* Right: Upgrade button */}
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium shadow">
          Upgrade
        </button>
      </header>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-grow p-6">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
          <h2 className="text-2xl font-extrabold mb-6 text-center text-indigo-700">
            Paste your text below to detect AI vs Human
          </h2>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your text here..."
            className="w-full h-44 border border-gray-300 rounded-xl p-4 mb-5 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm text-gray-800"
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 shadow-md transition disabled:bg-gray-400"
          >
            {loading ? "Analyzing..." : "Check Text"}
          </button>

          {result && (
            <div className="mt-8 p-6 border rounded-xl bg-gray-50 shadow-inner">
              <h3 className="text-lg font-semibold text-gray-700">Prediction:</h3>
              <p
                className={`text-2xl font-bold mt-2 ${
                  result.prediction === "AI Generated"
                    ? "text-red-600"
                    : result.prediction === "Human Written"
                    ? "text-green-600"
                    : "text-indigo-700"
                }`}
              >
                {result.prediction}
              </p>
              {result.probabilities && (
                <p className="mt-3 text-sm text-gray-600">
                  Probabilities:{" "}
                  <span className="font-mono">
                    {JSON.stringify(result.probabilities)}
                  </span>
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full text-center py-4 bg-indigo-700 text-white text-sm rounded-t-2xl shadow-md">
        © {new Date().getFullYear()} Tsering Wangchu. All rights reserved.
      </footer>
    </div>
  );
}

export default App;

