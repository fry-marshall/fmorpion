import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomePage from './pages/welcome-page/WelcomePage';
import Multiplayer from './pages/multiplayer/Multiplayer';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<WelcomePage />} />
        <Route path='/multiplayer' element={<Multiplayer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
