import { Route, Routes } from "react-router-dom";
import Login from "./components/pages/login";
import Portal from "./components/portal";

function App() {

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<Portal />} />
    </Routes>
  )
}

export default App
