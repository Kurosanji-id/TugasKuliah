import { FaceScanner } from "./components/FaceScanner"
import "./index.css"

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <FaceScanner />
      </div>
    </div>
  )
}

export default App
