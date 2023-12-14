import { 
    BrowserRouter, 
    Routes, 
    Route, 
    Navigate 
} from 'react-router-dom';
import { CssBaseline, GlobalStyles } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles"; 
import theme, { globalStyles } from "./themes";
import Home from "./views/Home";
import views from "./views";
import Navigation from "./components/Navigation";

const App = () => (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles styles={globalStyles}/>
        <BrowserRouter>
            <Navigation />
            <Routes>
                <Route index element={<Home/>} />
                {
                    views.map((v, index) => (
                        <Route key={index} path={v.path} element={v.component} />
                    ))        
                }
                <Route path="*" element={<Navigate replace to="/" />} />
            </Routes>
        </BrowserRouter>
    </ThemeProvider>
);

export default App;