import logo from './logo.svg';
import './App.css';
import InicioSesionApp from './components/InicioSesionApp';
import RegistroApp from './components/RegistroApp';

function App() {
  return (
    <div className="App">
      <RegistroApp 
      user={"Tapasco"}
      />
    </div>
  );
}

export default App;
