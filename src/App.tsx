import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import HomeAlternative from "@/pages/HomeAlternative";
import ColorShowcase from "@/components/ColorShowcase";
import Mobile3DTest from "@/components/Mobile3DTest";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeAlternative />} />
        <Route path="/original" element={<Home />} />
        <Route path="/colors" element={<ColorShowcase />} />
        <Route path="/mobile-test" element={<Mobile3DTest />} />
        <Route path="/other" element={<div className="text-center text-xl">Other Page - Coming Soon</div>} />
      </Routes>
    </Router>
  );
}
