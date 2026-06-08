import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { BigVideo } from "./components/BigVideo";
import { ReelsCarousel } from "./components/ReelsCarousel";
import { SkillsCarousel } from "./components/SkillsCarousel";
import { Footer } from "./components/Footer";

function App() {
  return (
    <div id="top" className="min-h-screen overflow-x-clip bg-white">
      <Header />
      <main>
        <Hero />
        <BigVideo />
        <ReelsCarousel />
        <SkillsCarousel />
        <Footer />
      </main>
    </div>
  );
}

export default App;
