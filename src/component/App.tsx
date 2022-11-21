import logo from '../asset/logo.svg';
import './App.css';
import Canvas from './Canvas';

function App() {
  // draw in canvas using the mouse
  // https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes

  // draw in canvas using the keyboard
  // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          My links
        </p>
        <a
          className="main-link"
          href="https://www.linkedin.com/in/%C3%B8yvind-brakstad-5b4061159/"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
        <Canvas></Canvas>
      </header>
    </div>
  );
}



export default App;
