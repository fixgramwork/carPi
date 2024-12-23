import './App.css'
import Header from "./components/Header";
import MainPage from "./pages/MainPage";
import { Routes, Route } from "react-router-dom";
import CameraPage from "./pages/CameraPage";
import ResultPage from "./pages/ResultPage";
function App() {
  return (
      <>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/Camera" element={<CameraPage />} />
          <Route path="/Result" element={<ResultPage />} />
        </Routes>
      </>
  )
}

export default App
