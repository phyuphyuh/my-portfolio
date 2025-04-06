import { useRef } from 'react';
import Nav from './components/Nav';
import Intro from './components/Intro';
import About from './components/About';
import Contact from './components/Contact';
import "@fontsource/montserrat";
import "@fontsource/montserrat-alternates";
import "@fontsource/montserrat-alternates/800.css";
import './App.scss'

function App() {
  const containerRef = useRef(null);

  return (
    <>
      <div className="container" ref={containerRef}>
        {/* <Nav /> */}
        <Intro containerRef={containerRef} />
        <About />
      </div>
      {/* <Contact /> */}
    </>
  )
}

export default App
