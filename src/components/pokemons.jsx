import { Typography, Box, CircularProgress, Button, Divider } from "@mui/material";
import { useState, useEffect } from "react";
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import axios from "axios";
import Fade from '@mui/material/Fade';
import { flushSync } from "react-dom";

function Pokemons({ param }) {
    const [pokeConsult, setPokeConsult] = useState({});
    const [pokeParam, setPokeParam] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [offSetData, setOffSetData] = useState(0);
    const [pokedata, setPokedata] = useState([]);
    const [pokeInfo, setPokeInfo] = useState([]);
    const [page, setPage] = useState(0);
    const [pokemonIds, setPokemonIds] = useState([]);

    useEffect(() => {
        fetchInfo();

    }, [page]);

    async function fetchInfo() {
        setLoading(true);
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=4&offset=${page}`);
            setPokeInfo(response.data.results);
            setLoading(false);
            //console.log(pokedata[0].name);
        } catch (error) {
            setLoading(false);
            console.log(`error: ${error}`);
        }
    };

    useEffect(() => {
        async function fetchPk() {
            if (pokeInfo && pokeInfo.length > 0) {
                const ids = [];
                for (const data of pokeInfo) {
                    const id = await fetchPokemon(data.url);
                    ids.push(id);
                }
                setPokemonIds(ids);
            }
        }
        fetchPk();
    }, [pokeInfo]);

    async function fetchPokemon(url) {
        setLoading(true);
        try {
            const response = await axios.get(url);
            setLoading(false);
            return (response.data);

            //console.log(pokedata[0].name);
        } catch (error) {
            setLoading(false);
            console.log(`error: ${error}`);
        }
    };


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
        if (param === '') {
            setPokeParam(1);
        } else {
            setPokeParam(param);
        }

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

    return (
        <Box>
            <Box  padding={2} >
                <Box display={'flex'} justifyContent={'space-evenly'} marginBottom={3}>
                    <Button variant="outlined" disabled={page === 0} onClick={() => (setPage(page - 4))} ><ArrowBackIosIcon /></Button>
                    <Button variant="outlined" disabled={page === 1300} onClick={() => (setPage(page + 4))} ><ArrowForwardIosIcon /></Button>
                </Box>
                {pokemonIds && pokemonIds.map((data, index) => (
                    <Box
                        key={index}
                        margin={'0 auto'}
                        marginBottom={2}
                        width={'1200px'}
                        border={'solid 3px'}
                        borderRadius={'20px'}
                        borderColor={'#8CAA9A'}
                        padding={3}
                    >
                        <Typography variant="h6">{`Nombre: ${data.name}`}</Typography>
                        <Typography variant="h6">{`id: ${data.id}`}</Typography>
                        <Box display={'flex'} flexDirection={'row'} gap={3}>
                            <Box>
                                <Typography variant="h6">Types:</Typography>
                                {data.types && data.types.map(types => (
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
                        <Box display={'flex'} flexDirection={'row'} justifyContent={'space-evenly'}>
                            <Box>
                                <Typography variant="h5">Sprite default:</Typography>
                                <img width={'300px'} height={'300px'} alt={data.name} src={data.sprites?.front_default} />
                            </Box>
                            <Box>
                                <Typography variant="h5">Sprite shiny:</Typography>
                                <img width={'300px'} height={'300px'} alt={data.name} src={data.sprites?.front_shiny} />
                            </Box>
                        </Box>
                    </Box>
                ))}

                <Box display={'flex'} justifyContent={'space-evenly'} marginTop={3}>
                    <Button variant="outlined" disabled={page === 0} onClick={() => (setPage(page - 4))} ><ArrowBackIosIcon /></Button>
                    <Button variant="outlined" disabled={page === 1300} onClick={() => (setPage(page + 4))} ><ArrowForwardIosIcon /></Button>
                </Box>
            </Box>
            <Divider />
            <Box padding={2}>
                <Button variant="outlined" disabled={offSetData === 0} onClick={() => (setOffSetData(offSetData - 20))} ><ArrowBackIosIcon /></Button>
                <Button variant="outlined" disabled={offSetData === 1300} onClick={() => (setOffSetData(offSetData + 20))} ><ArrowForwardIosIcon /></Button>
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
                                backgroundColor: data.name === pokeConsult.name ? 'darkgrey' : 'none',
                                color: data.name === pokeConsult.name ? 'white' : 'none'
                            }}
                            sx={{
                                ":hover": {
                                    backgroundColor: "grey",
                                    color: 'whitesmoke'
                                }
                            }}
                            key={index}
                            width={'10rem'}
                            border={'solid 3px'}
                            borderRadius={2}
                            padding={1}
                            onClick={() => (setPokeParam(index + 1 + offSetData))}

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
                        <Fade in={error === ''} timeout={2000}>
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
            <Divider />

        </Box>
    );
}

export default Pokemons;
