import { Typography, Box, CircularProgress, Button } from "@mui/material";
import { useState, useEffect } from "react";
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import axios from "axios";
import Fade from '@mui/material/Fade';

function Pokemons({ param }) {
    const [pokeConsult, setPokeConsult] = useState({});
    const [pokeParam, setPokeParam] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [offSetData, setOffSetData] = useState(0);
    const [pokedata, setPokedata] = useState([]);

    useEffect(() => {
        pokeFech();
    }, [offSetData]);

    async function pokeFech() {
        setLoading(true);
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${offSetData}`);
            setPokedata(response.data.results);
            setLoading(false);
            //console.log(pokedata[0].name);
        } catch (error) {
            setLoading(false);
            console.log(`error: ${error}`);
        }
    };

    useEffect(() => {
        setPokeParam(param);
    }, [param]);


    //https://pokeapi.co/api/v2/pokemon?limit=20 hacer paginacion de pokemon
    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeParam}/`);
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

    const handleOnClick = () => {
        setOffSetData(offSetData + 20);

    }
    const handleBack = () => {
        setOffSetData(offSetData - 20);

    }

    return (
        <Box>
            <Box padding={2}>
                <Button variant="outlined" disabled={offSetData===0} onClick={handleBack} ><ArrowBackIosIcon /></Button>
                <Button variant="outlined" onClick={handleOnClick} ><ArrowForwardIosIcon /></Button>
                <Box
                    width={'75%'}
                    style={{ margin: '0 auto' }}
                    display={'flex'}
                    flexWrap={'wrap'}
                    justifyContent={'space-around'}
                    alignItems={'center'}
                    gap={1}
                >
                    {pokedata.map((data, index) => (
                        <Box
                            style={{
                                backgroundColor: data.name===pokeConsult.name? 'darkgrey':'none',
                                color: data.name===pokeConsult.name? 'white':'none'
                            }}
                            sx={{
                                ":hover":{
                                    backgroundColor:"grey",
                                    color:'whitesmoke'
                                }
                            }}
                            key={index}
                            width={'10rem'}
                            border={'solid 3px'}
                            borderRadius={2}
                            padding={1}
                            onClick={()=>(setPokeParam(index+1+offSetData))}

                        > {/* Asegúrate de incluir un key único para cada elemento */}
                            <Typography variant="body1">{`id: ${index + offSetData + 1}`}</Typography>
                            <Typography variant="body1">{`nombre: ${data.name}`}</Typography>
                        </Box>
                    ))}
                </Box>
            </Box>

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
                        // <Fade in={error === ''} timeout={2000}>
                        <Box
                            display={'flex'}
                            flexDirection={'column'}
                            justifyContent={'center'}
                            width={600}
                            padding={3}
                            margin={6}
                            gap={3}
                        >


                            <Typography variant="h4">{`Pokemon's name: ${pokeConsult.name}`}</Typography>
                            <Typography variant="h5">{`Pokedex's number: ${pokeConsult.id}`}</Typography>
                            <Box display={'flex'} flexDirection={'row'} gap={6}>
                                <Box>
                                    <Typography variant="h5">Types:</Typography>
                                    {pokeConsult.types && pokeConsult.types.map(types => (
                                        <Typography marginLeft={2}><li>{types.type.name}</li></Typography>
                                    ))}
                                </Box>
                                <Box>
                                    <Typography variant="h5">Abilities:</Typography>
                                    {pokeConsult.types && pokeConsult.abilities.map(abilities => (
                                        <Typography marginLeft={2}><li>{abilities.ability.name}</li></Typography>
                                    ))}
                                </Box>
                            </Box>
                            <Box
                                display={'flex'}
                                flexDirection={'row'}
                                gap={5}
                                margin={5}
                            >
                                <Box>
                                    <Typography variant="h5">Sprite default:</Typography>
                                    <img width={'300px'} height={'300px'} alt={pokeConsult.name} src={pokeConsult.sprites?.front_default} />
                                </Box>
                                <Box>
                                    <Typography variant="h5">Sprite shiny:</Typography>
                                    <img width={'300px'} height={'300px'} alt={pokeConsult.name} src={pokeConsult.sprites?.front_shiny} />
                                </Box>
                            </Box>
                        </Box>
                        // </Fade>
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
            
        </Box>
    );
}

export default Pokemons;
