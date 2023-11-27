import { useState } from "react"
import "./App.css"
import Button from "./GlobalComponents/Button"
import CheckBox from "./GlobalComponents/Checkbox"
import Input from "./GlobalComponents/Input"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Applicant FLKR</h1>
      <div className="card">
        <Button label="Click me" onClick={() => setCount(count + 1)} />
        <CheckBox label="Check me" name="check" />
        <Input label="Type something" name="input" />
      </div>
    </>
  )
}

export default App
