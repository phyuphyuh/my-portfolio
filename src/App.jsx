import { useRef } from 'react';
import { useScroll } from 'motion/react';
import Nav from './components/Nav';
import Intro from './components/Intro';
import About from './components/About';
import Home from './components/Home';
import Projects from './components/Projects';
import Contact from './components/Contact';

import "@fontsource/montserrat";
import "@fontsource/montserrat/800.css";
import "@fontsource/montserrat/700.css";
import "@fontsource/montserrat/600.css";
import "@fontsource/montserrat-alternates";
import "@fontsource/montserrat-alternates/800.css";
import './App.scss'

function App() {
  const containerRef = useRef(null);
  const { scrollYProgress: globalScrollProgress } = useScroll();

  return (
    <>
      <div className="container" ref={containerRef}>
        {/* <Nav />
        <Intro containerRef={containerRef} />
        <About /> */}
        <Home />
        <Projects />
      </div>
      <Nav scrollYProgress={globalScrollProgress} />
      <Contact />
    </>
  );
};

export default App
