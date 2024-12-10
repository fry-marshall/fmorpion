import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomePage from './pages/welcome-page/WelcomePage';
import Multiplayer from './pages/multiplayer/Multiplayer';
import PlayingPage from './pages/playing-page/PlayingPage';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<WelcomePage />} />
        <Route path='/multiplayer' element={<Multiplayer />} />
        <Route path='/playing' element={<PlayingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
