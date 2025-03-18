import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import "./App.css";
import CatalogPage from "./pages/CatalogPage";
import MainLayout from "./layouts/MainLayout";
import QuizPage from "./pages/QuizPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<CatalogPage />} />
            <Route path="/quiz/:id" element={<QuizPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
