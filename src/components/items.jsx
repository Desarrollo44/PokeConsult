import { Typography, Box, CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";
import SearchIcon from '@mui/icons-material/Search';
import axios from "axios";
import Fade from '@mui/material/Fade';

function Items({ param }) {
    const [pokeConsult, setPokeConsult] = useState({});
    const [pokeParam, setPokeParam] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');


    useEffect(() => {
        setPokeParam(param);
    }, [param]);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/item/${pokeParam}/`);
                setPokeConsult(response.data);
                setError('');
                setLoading(false);
            } catch (error) {
                console.log(`error: ${error}`);
                setError(`No se encontraron resultados: ${error}`);
                setLoading(false);
            }
        }
        if (pokeParam) {
            fetchData();

        }
    }, [pokeParam]);

    //acedecer a un dato dentro de objeto
    const searchTerm = "category";
    const pokeArray = Object.values(pokeConsult);
    const filteredData = pokeArray?.filter((item) => {
        // Convierte cada valor del objeto en una cadena y verifica si contiene el término de búsqueda
        for (const key in item) {
            if (Object.prototype.hasOwnProperty.call(item, key)) {
                const value = item[key];
                if (
                    value &&
                    typeof value === "string" &&
                    value.toLowerCase().includes(searchTerm.toLowerCase())
                ) {
                    return true; // Si alguna propiedad contiene el término de búsqueda, se incluye en los resultados
                }
            }
        }
        return false;
    });
    // acceder a un dato dentro de un array de objetos
    const arrayflavor = Object.values(pokeConsult.flavor_text_entries || []);
    const filteredDescription = arrayflavor
        .filter((item) => item && item.language.name === 'en') // Filtra solo los elementos con language.name igual a 'es'
        .map((item) => item.text); // Mapea los elementos filtrados para obtener solo el texto

    if (loading) {
        return (<Box
            display={'flex'}
            style={{ margin: '0 auto' }}
            width={400}
            height={300}
            padding={5}
            alignItems='center'
        >
            Cargando...
            <CircularProgress style={{ width: '100px', height: '100px' }} />
        </Box>);
    }


    return (
        <Box>
            {pokeParam === '' ? (

                <Box

                    display={'flex'}
                    style={{ margin: '0 auto' }}
                    width={400}
                    height={100}
                    padding={5}
                    alignItems='center'

                >
                    <SearchIcon style={{ fontSize: '120px' }} />
                    <Typography variant="h4">por favor realice una consulta</Typography>
                </Box>
            ) : (
                error === '' ? (
                    <Fade in={error === ''} timeout={2000}>
                        <Box
                            display={'flex'}
                            flexDirection={'column'}
                            justifyContent={'center'}
                            // width={700}
                            padding={3}
                            margin={6}
                            gap={3}
                        >
                            <Typography variant="h4">{`Item's name: ${pokeConsult.name}`}</Typography>
                            <Typography variant="h5">{`Item's Id: ${pokeConsult.id}`}</Typography>
                            <Box display={'flex'} flexDirection={'row'} gap={6}>
                                <Box>
                                    <Typography variant="h5">Description:</Typography>
                                    <Typography variant="body1" maxWidth={250} marginLeft={2}><li>{filteredDescription[0]}</li></Typography>
                                </Box>
                                <Box>
                                    <Typography variant="h5">Category:</Typography>
                                    <Typography marginLeft={2}><li>{filteredData[0] && filteredData[0].name}</li></Typography>
                                </Box>

                            </Box>
                            <Box display={'flex'} flexDirection={'row'} gap={6} marginTop={3}>
                                <Box>
                                    <Typography variant="h5">Effects:</Typography>
                                    <Typography variant="body1" maxWidth={250} marginLeft={2}><li>{`${pokeConsult.effect_entries && pokeConsult.effect_entries[0].short_effect}`}</li></Typography>
                                </Box>
                                <Box>
                                    <Typography variant="h5">Cost:</Typography>
                                    <Typography marginLeft={2}><li>{`P$ ${pokeConsult.cost}`}</li></Typography>
                                </Box>
                            </Box>
                            <Box
                                display={'flex'}
                                flexDirection={'row'}
                                gap={5}
                                marginTop={5}
                            >
                                <Box>
                                    <Typography variant="h5">Sprite predeterminado:</Typography>
                                    <img
                                        style={{ marginLeft: '3rem' }}
                                        width={'150px'}
                                        height={'150px'}
                                        alt={pokeConsult.name}
                                        src={pokeConsult.sprites?.default} />
                                </Box>
                            </Box>
                        </Box>
                    </Fade>
                ) : (
                    <Box
                        width={600}
                        paddingTop={10}
                        margin={'0 auto'}
                        color={'red'}
                    >
                        <Fade in={error !== ''} timeout={2000}>
                            <div>
                                <Typography>{error}</Typography>
                                {/* Otro contenido aquí, como imágenes o videos */}
                                <img style={{ marginLeft: '6rem' }} src="https://i.pinimg.com/originals/7b/d6/ab/7bd6abf0cb4502e87fd70fad35c66184.gif" alt="error" loop />
                            </div>
                        </Fade>

                    </Box>
                )
            )}
        </Box>
    );
}

export default Items;
