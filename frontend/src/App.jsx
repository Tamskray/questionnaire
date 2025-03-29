import { BrowserRouter, Routes, Route } from "react-router";
import CatalogPage from "./pages/CatalogPage";
import MainLayout from "./layouts/MainLayout";
import QuizPage from "./pages/QuizPage";
import CreatePage from "./pages/CreatePage";

import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<CatalogPage />} />
            <Route path="/quiz/:id" element={<QuizPage />} />
            <Route path="/quiz/create" element={<CreatePage />} />
            <Route path="/quiz/edit/:id" element={<CreatePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
