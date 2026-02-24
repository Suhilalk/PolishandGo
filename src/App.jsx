import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Quote from "./pages/Quote";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quote" element={<Quote />} />
      </Routes>
    </BrowserRouter>
  );
}