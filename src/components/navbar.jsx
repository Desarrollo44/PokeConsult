import { useState } from "react";
import { Avatar, Box, Typography } from "@mui/material";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import PetsIcon from '@mui/icons-material/Pets';
import EggAltIcon from '@mui/icons-material/EggAlt';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';


function Navbar({setComponent}) {
    const [value, setValue] = useState('pokemons');

    const handleChange = (e, newValue) => {
        setComponent(newValue);
        setValue(newValue);
    }
    return (<>
        <Box
            style={{
                fontFamily: 'PokemonSolid',
                width: '100%',
                hieght: '20%',
                padding: '20px',
                top: 0,
                position: 'fixed',
                zIndex: '10',
                backgroundColor: '#7DFFBA',
                display: 'flex',
                gap: '20px',
                alignItems: 'center'
            }}
        >
            <img width='50px' height='50px' src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/2052px-Pok%C3%A9_Ball_icon.svg.png" />
            <Typography
                fontSize={'50px'}
                variant="h1"
            >Poke-Counsult</Typography>
            <BottomNavigation
                style={{ backgroundColor: '#7DFFBA', marginLeft: '5rem',display:'flex',gap:'3rem' }}
                value={value}
                onChange={handleChange}
            >
                <BottomNavigationAction
                    label="Pokemons"
                    value='pokemons'
                    icon={<PetsIcon style={{ fontSize: 40 }} />} />
                <BottomNavigationAction
                    label="Berry"
                    value='berry'
                    icon={<EggAltIcon style={{ fontSize: 40 }} />} />
                <BottomNavigationAction
                    style={{ fontSize: 40 }}
                    label="Games"
                    value='games'
                    icon={<VideogameAssetIcon style={{ fontSize: 40 }} />} />
            </BottomNavigation>
        </Box>
    </>);
}
export default Navbar;