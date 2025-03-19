import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import "./App.css";
import CatalogPage from "./pages/CatalogPage";
import MainLayout from "./layouts/MainLayout";
import QuizPage from "./pages/QuizPage";
import CreatePage from "./pages/CreatePage";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<CatalogPage />} />
            <Route path="/quiz/:id" element={<QuizPage />} />
            <Route path="/quiz/create" element={<CreatePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
