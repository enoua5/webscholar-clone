import { Route, Routes } from "react-router-dom";
import Portal from "./components/portal";

function App() {

  return (
    <Routes>
      <Route path="/*" element={<Portal />} />
    </Routes>
  )
}

export default App
