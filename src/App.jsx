import { useRef } from 'react';
import Nav from './components/Nav';
import Intro from './components/Intro';
import About from './components/About';
import Contact from './components/Contact';
import './App.scss'

function App() {
  const containerRef = useRef(null);

  return (
    <div className="container" ref={containerRef}>
      <Nav />
      <Intro containerRef={containerRef} />
      <About />
      <Contact />
    </div>
  )
}

export default App
