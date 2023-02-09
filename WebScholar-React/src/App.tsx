import { ConfigProvider } from "antd";
import { Route, Routes } from "react-router-dom";
import Portal from "./components/portal";

function App() {

  return (
    <ConfigProvider
    theme={{
      token: {
        colorPrimary: '#2C9EB5',
      },
    }}
  >
    <Routes>
      <Route path="/*" element={<Portal />} />
    </Routes>
    </ConfigProvider>
  )
}

export default App
