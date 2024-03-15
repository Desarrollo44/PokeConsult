import { useState} from "react";
import { TextField,Button } from "@mui/material";

function PokeForm({setParam}){
    const[pokePram,setPokeParam]=useState('');

    const handleSearch =()=>{
       setParam(pokePram);
       setPokeParam('');
    //    console.log(pokePram);
    }
    const handleEnter=(e)=>{ 
        if(e.key==='Enter'){
            handleSearch();
        }
    }
    const handleChange=(e)=>{
        setPokeParam(e.target.value);
    }
 return(<>
    <box style={{display:'flex', alignItems:'center',gap:'2rem'}}>
        <TextField
        label='Ingrese Nombre o Id'
        autoComplete="off"
        variant="outlined"
        value={pokePram}
        onChange={handleChange}
        onKeyDown={handleEnter}
        />
        <Button 
        onClick={handleSearch}
        variant="outlined"
        >Search</Button>
    </box>
 </>);
}
export default PokeForm;