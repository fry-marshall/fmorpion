import Button from "../../components/Button/Button"
import logo from "../../logo.png"
import './WelcomePage.css';
import { useNavigate } from "react-router-dom";


export default function WelcomePage(){

    const navigate = useNavigate()

    function navigateUrl(route){
        navigate(`/${route}`);
    }

    return <div className="welcome-container">
        <img src={logo} alt="logo"></img>
        <div className="options">
            <Button color="alert" label="Multiplayer" action={() => navigateUrl('multiplayer')} />
            <Button color="info" label="Unique player ( IA soon )" />
        </div>
    </div>
}