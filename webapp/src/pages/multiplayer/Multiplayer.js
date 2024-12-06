import { useState } from "react";
import Button from "../../components/Button/Button";
import logo from "../../logo.png";
import "./Multiplayer.css";
import { useNavigate } from "react-router-dom";
import Popup from "../../components/Popup/Popup";

export default function Multiplayer() {

    const [openCreateParty, setOpenCreateParty] = useState(false)
  
const navigate = useNavigate();

  function navigateUrl(route) {
    navigate(`/${route}`);
  }

  return (
    <div className="multiplayer-container">
      <div className="navigation">
        <span
          className="material-symbols-outlined"
          style={{ color: "#fff", fontSize: "30px" }}
          onClick={() => navigate("..")}
        >
          arrow_back
        </span>
      </div>
      <img src={logo} alt="logo"></img>
      <div className="options">
        <Button color="alert" label="Create a party" action={() => setOpenCreateParty(true)}/>
        <Button color="info" label="Join a party" />
      </div>
      {openCreateParty && <Popup close={() => setOpenCreateParty(false)}>toto</Popup>}
    </div>
  );
}
