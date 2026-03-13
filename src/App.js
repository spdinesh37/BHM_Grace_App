import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Curriculum from "./pages/Curriculum";
import Events from "./pages/Events";
import Gallery from "./pages/Gallery";
import Home from "./pages/Home";
import Leadership from "./pages/Leadership";
import StudentLife from "./pages/StudentLife";

function App() {
  return (
    <div className="min-h-screen bg-sandal text-ink">
      <ScrollToTop />
      <Navbar />
      <main className="overflow-hidden">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/curriculum" element={<Curriculum />} />
          <Route path="/student-life" element={<StudentLife />} />
          <Route path="/leadership" element={<Leadership />} />
          <Route path="/events" element={<Events />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;

