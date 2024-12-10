import "./PlayingPage.css";
import PlayerCard from "../../components/PlayerCard/PlayerCard";
import illustration1 from "../../illustration1.png"
import illustration3 from "../../illustration3.png"
import Symbol1 from "../../components/Symbol1/Symbol1"
import Symbol2 from "../../components/Symbol2/Symbol2"
import PlayingGrid from "../../components/PlayingGrid/PlayingGrid";

export default function PlayingPage() {

  return (
    <div className="playing-container">
      <div className="player-cards">
        <PlayerCard avatar={illustration1} name="Marshall">
          <Symbol1 />
        </PlayerCard>
        <PlayerCard avatar={illustration3} name="Fofo">
          <Symbol2 />
        </PlayerCard>
      </div>
      <PlayingGrid />
    </div>
  );
}
