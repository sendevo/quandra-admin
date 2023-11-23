import { Typography } from "@mui/material";
import MainView from "../../components/MainView";
import { Link } from "react-router-dom";

const View = () => (
    <MainView>
        <Typography>Panel de administración Quandra</Typography>
        <Link to={'/about'}>Acerca de</Link>
    </MainView>
);

export default View;