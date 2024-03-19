import { Typography, Box, CircularProgress, Fade,Button } from "@mui/material";
import Table from "@mui/material/Table";
import { useState, useEffect } from "react";
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import SearchIcon from '@mui/icons-material/Search';
import axios from "axios";

function Berries({ param }) {
    const [berryConsult, setBerryConsult] = useState({});
    const [berryParam, setBerryParam] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [pokedata,setPokedata]=useState([]);
    const [offSetData,setOffSetData]=useState(0);

    useEffect(() => {
        if(param===''){
            setBerryParam(1);
        }else{
            setBerryParam(param);
        }
        
    }, [param]);

    useEffect(() => {
        pokeFech();
    }, [offSetData]);
    
    async function pokeFech() {
        setLoading(true);
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/berry/?limit=20&offset=${offSetData}`);
            setPokedata(response.data.results);
            setLoading(false);
            //console.log(pokedata[0].name);
        } catch (error) {
            setLoading(false);
            console.log(`error: ${error}`);
        }
    };

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/berry/${berryParam}/`);
                setBerryConsult(response.data);
                setError('');
            } catch (error) {
                console.log(`error: ${error}`);
                setError(`No se encontraron resultados: ${error}`);
            } finally {
                setLoading(false);
            }
        }
        if (berryParam) {
            fetchData();
        }
    }, [berryParam]);

    const berryArray = Object.values(berryConsult);

    // const filteredData = berryArray?.filter((item) => {
      
    //   });  

    // Imprimir los resultados filtrados (si berryConsult existe)
    // if (berryConsult) {
    //     console.log(filteredData);
    // }



    return (
        <Box>
             <Box padding={2}>
                <Button variant="outlined" disabled={offSetData === 0} onClick={() => (setOffSetData(offSetData - 20))} ><ArrowBackIosIcon /></Button>
                <Button variant="outlined" disabled={offSetData === 60} onClick={() => (setOffSetData(offSetData + 20))} ><ArrowForwardIosIcon /></Button>
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
                                backgroundColor: data.name === berryConsult.name ? 'darkgrey' : 'white',
                                color: data.name === berryConsult.name ? 'white' : 'black'
                            }}
                            sx={{
                                ":hover": {
                                    backgroundColor: "grey",
                                    color: 'whitesmoke'
                                }
                            }}
                            key={index}
                            width={'10rem'}
                            height={'4rem'}
                            border={'solid 3px'}
                            borderRadius={2}
                            padding={1}
                            onClick={() => (setBerryParam(index + 1 + offSetData))}

                        > {/* Asegúrate de incluir un key único para cada elemento */}
                            <Typography variant="body1">{`id: ${index + offSetData + 1}`}</Typography>
                            <Typography variant="body1">{`nombre: ${data.name}`}</Typography>
                        </Box>
                    ))}
                </Box>
            </Box>
            {loading ? (
                <Box
                    display={'flex'}
                    style={{ margin: '0 auto' }}
                    width={400}
                    height={300}
                    padding={5}
                    alignItems='center'
                >
                    Cargando...
                    <CircularProgress style={{ width: '100px', height: '100px' }} />
                </Box>
            ) : (

                berryParam === '' ? (

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
                                <Typography variant="h4">{`Berry's name: ${berryConsult.name}`}</Typography>
                                <Box display={'flex'} flexDirection={'row'} gap={6} alignItems={'center'}>
                                    <Box>
                                        <Typography variant="h5">Flavors:</Typography>
                                        {berryConsult.flavors && berryConsult.flavors.map(flavors => (
                                            <Typography marginLeft={2}><li>{flavors.flavor.name}</li></Typography>
                                        ))}
                                    </Box>
                                    <Box marginLeft={6}>
                                        <Typography variant="h5">Details:</Typography>
                                        <br />
                                        <TableContainer component={Paper}>

                                            <Table sx={{ minWidth: 650 }} size="middle" aria-label="a dense table">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>id</TableCell>
                                                        <TableCell align="right">growth time(hours)</TableCell>
                                                        <TableCell align="right">max harvest</TableCell>
                                                        <TableCell align="right">size(mm)</TableCell>
                                                        <TableCell align="right">smoothness</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    <TableRow
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell>{berryConsult.id}</TableCell>
                                                        <TableCell align="right">{berryConsult.growth_time}</TableCell>
                                                        <TableCell align="right">{berryConsult.max_harvest}</TableCell>
                                                        <TableCell align="right">{berryConsult.size}</TableCell>
                                                        <TableCell align="right">{berryConsult.smoothness}</TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
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
                )
            )}
        </Box>
    );
}
export default Berries;
