import { useState, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import prism from "prismjs"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import "highlight.js/styles/github-dark.css"
import axios from 'axios'
import './App.css'

function App() {
  const [code, setCode] = useState(`function sum() {
  return 1 + 1;
}`)
  const [review, setReview] = useState(``)

  useEffect(() => {
    prism.highlightAll()
  }, [])

  async function reviewCode() {
    try {
      const response = await axios.post(
  'https://code-review-backend-8j4t.onrender.com/ai/get-review',
  { code }
)
setReview(response.data)
    } catch (error) {
      console.error("Error fetching review:", error)
      setReview("⚠️ Unable to fetch review. Please write your code.")
    }
  }

  return (
    <main>
      {/* Left Side: Code Editor */}
      <div className="left">
        <div className="code">
          <Editor
            value={code}
            onValueChange={(newCode) => setCode(newCode)}
            highlight={(newCode) =>
              prism.highlight(newCode, prism.languages.javascript, "javascript")
            }
            padding={15}
            style={{
              fontFamily: '"Fira Code", "Fira Mono", monospace',
              fontSize: 16,
              backgroundColor: "#0f0f0f",
              color: "#fff",
              minHeight: "80vh",
              borderRadius: "8px",
              outline: "none",
            }}
          />
        </div>
        <button className="review" onClick={reviewCode}>
          Review
        </button>
      </div>

      {/* Right Side: Review Output */}
      <div className="right">
        <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
      </div>
    </main>
  )
}

export default App

