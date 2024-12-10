import './PlayerCard.css';

export default function PlayerCard({avatar, name, children}){
    return <div className="player-card">
        <img src={avatar} alt="toto" />
        <p>{name}</p>
        {children}
    </div>
}