import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import "./App.css";
import CatalogPage from "./pages/CatalogPage";
import MainLayout from "./layouts/MainLayout";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<CatalogPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
