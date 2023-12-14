import { Link } from 'react-router-dom';
import { AppBar, Box, Toolbar } from '@mui/material';
import logo from "../../assets/quandra_logo_512.png";
import banner from "../../assets/quandra-banner.png";
import { FaCode, FaInfoCircle } from 'react-icons/fa';

const TopNavigationBar = () => (
    <AppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between" }}>
            <img src={logo} height={"40px"}></img>
            <img src={banner} height={"40px"}></img>
            <Box sx={{display:"flex", flexDirection:"row"}}>
                <Box sx={{mr:3}}>
                    <Link 
                        to={'https://github.com/sendevo/quandra-admin'}
                        rel="noopener noreferrer"
                        target="_blank">
                        <FaCode color="#22B1E3FF" size={30}/>
                    </Link>
                </Box>
                <Box>
                    <Link to={'/about'}>
                        <FaInfoCircle color="#22B1E3FF" size={30}/>
                    </Link>
                </Box>
            </Box>
        </Toolbar>
    </AppBar>
);

export default TopNavigationBar;
