
import Navbar from "./components/navbar";
import { Home as HomeContent } from "./components/home";
import { Projects as ProjectContent } from "./components/projects"
import Footer from "./components/footer";
import "./globals.css";

export default function Home() {
  return (
    <div>
      <Navbar />
      <HomeContent />
      <ProjectContent />
      <Footer />
    </div>
  );
}
