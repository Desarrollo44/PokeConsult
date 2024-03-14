import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar';
import PokeForm from './components/pokeForm';
import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import Pokemons from './components/pokemons';
import Berries from './components/berry';
import Games from './components/games';

function App() {

  const [pokeParam, setPokeParam] = useState('');
  const [component,setComponent]=useState('pokemons');
  const setParam = async (newParam) => {
    setPokeParam(newParam);
  };
  const renderizarC=async(newComponent)=>{
    setComponent(newComponent)
  }
  useEffect(() => {
    console.log(component);
  }, [component]);
  const renderComponente = () => {
    switch (component) {
      case 'pokemons':
        return <Pokemons param={pokeParam}/>;
      case 'berry':
        return <Berries param={pokeParam}/>;
      case 'games':
        return <Games param={pokeParam}/>;
      default:
        return null; // O un componente por defecto
    }
  };
 
  return (
    <div className="App">
      <header className="App-header">
        <Navbar setComponent={renderizarC}/>
      </header>
      <body style={{ marginTop: '8%', padding: '20px' }}>
        <PokeForm setParam={setParam} />
        <Box
          // height={650}
          sx={{
            border: '3px solid #887DFF',
            my: 3,
            borderRadius: '25px 25px 0 0'
          }}
        >
          {renderComponente()}
        </Box>
      </body>
    </div>
  );
}

export default App;
