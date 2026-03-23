import { Navigate, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Curriculum from "./pages/Curriculum";
import Events from "./pages/Events";
import Gallery from "./pages/Gallery";
import GraceAshram from "./pages/GraceAshram";
import Home from "./pages/Home";
import Leadership from "./pages/Leadership";
import ResidenceApplication from "./pages/ResidenceApplication";
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
          <Route path="/grace-ashram" element={<GraceAshram />}>
            <Route index element={<Navigate to="curriculum" replace />} />
            <Route path="curriculum" element={<Curriculum />} />
            <Route path="student-life" element={<StudentLife />} />
            <Route path="residence-application" element={<ResidenceApplication />} />
          </Route>
          <Route path="/curriculum" element={<Navigate to="/grace-ashram/curriculum" replace />} />
          <Route path="/student-life" element={<Navigate to="/grace-ashram/student-life" replace />} />
          <Route path="/residence-application" element={<Navigate to="/grace-ashram/residence-application" replace />} />
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
