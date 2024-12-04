import './Button.css';

export default function Button({label, color}){
    return <div className={`button ${color}`}>
        {label}
    </div>
}