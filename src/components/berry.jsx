import { Typography, Box, CircularProgress } from "@mui/material";
import Table from "@mui/material/Table";
import { useState, useEffect } from "react";
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import SearchIcon from '@mui/icons-material/Search';
import axios from "axios";

function Berries({ param }) {
    const [berryConsult, setBerryConsult] = useState({});
    const [berryParam, setBerryParam] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        setBerryParam(param);
    }, [param]);

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

    return (
        <Box>
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
                    ) : (
                        <Box
                            width={600}
                            paddingTop={10}
                            margin={'0 auto'}
                            color={'red'}
                        >
                            <Typography>{error}</Typography>
                            <img style={{ marginLeft: '6rem' }} src="https://i.pinimg.com/originals/7b/d6/ab/7bd6abf0cb4502e87fd70fad35c66184.gif" />
                        </Box>
                    )
                )
            )}
        </Box>
    );
}
export default Berries;
