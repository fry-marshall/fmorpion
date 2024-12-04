import './App.css';
import Button from './components/Button/Button';
import logo from './logo.png';

function App() {
  return (
    <div className="App">
      <img src={logo} alt="toto"></img>
      <div className="options">
        <Button color="alert" label="Multijoueur" />
        <Button color="info" label="Joueur unique" />
      </div>
    </div>
  );
}

export default App;
