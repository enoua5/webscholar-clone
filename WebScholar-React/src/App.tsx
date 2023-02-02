import { Route, Routes } from "react-router-dom";
import LoginPage from "./components/pages/loginPage";
import Portal from "./components/portal";

function App() {

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/*" element={<Portal />} />
    </Routes>
  )
}

export default App
