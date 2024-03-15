import { useState,useEffect } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import SearchIcon from '@mui/icons-material/Search';
import { Typography, Box, CircularProgress,Fade} from "@mui/material";

function Games({param}){
    const [gameConsult, setGameConsult] = useState({});
    const [gameParam, setGameParam] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [version,setVersion]=useState('');

    useEffect(() => {
        setGameParam(param);
    }, [param]);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/generation/${gameParam}/`);
                setGameConsult(response.data);
                setError('');
            } catch (error) {
                console.log(`error: ${error}`);
                setError(`No se encontraron resultados: ${error}`);
            } finally {
                setLoading(false);
            }
        }
        if (gameParam) {
            fetchData();
        }
        setVersion(gameConsult.version);
    }, [gameParam]);
    

    return(<>
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
                gameParam === '' ? (
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
                            <Typography variant="h4">{`Berry's name: ${gameConsult.name}`}</Typography>
                            <Box display={'flex'} flexDirection={'row'} gap={6} alignItems={'center'}>
                                {/* <Box>
                                    <Typography variant="h5">Flavors:</Typography>
                                    {berryConsult.flavors && berryConsult.flavors.map(flavors => (
                                        <Typography marginLeft={2}><li>{flavors.flavor.name}</li></Typography>
                                    ))}
                                </Box> */}
                                <Box marginLeft={6}>
                                    <Typography variant="h5">Details:</Typography>
                                    <br />
                                    <TableContainer component={Paper}>

                                        <Table sx={{ minWidth: 650 }} size="middle" aria-label="a dense table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>id</TableCell>
                                                    <TableCell align="right">group version</TableCell>
                                                    <TableCell align="right">mian region</TableCell>
                                                    
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                <TableRow
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell>{gameConsult.id}</TableCell>
                                                    <TableCell align="right">{gameConsult.version_groups && gameConsult.version_groups[0]?.name}</TableCell>
                                                    <TableCell align="right">{gameConsult.main_region && gameConsult.main_region.name}</TableCell>
                                                    
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
                           <Fade in={error!==''} timeout={2000}>
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
    </>);
}
export default Games;