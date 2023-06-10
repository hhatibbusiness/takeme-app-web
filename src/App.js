import logo from './logo.svg';
import './App.css';
import {Routes, Route} from "react-router-dom";
import Home from "./screens/Home/Home";

const App = (props) => {
    return (
        <div className={'App'}>
            <Routes>
                <Route path={'/'} exact element={<Home />} />
            </Routes>
        </div>
    )
}

export default App;
