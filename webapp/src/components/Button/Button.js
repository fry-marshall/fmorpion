import './Button.css';

export default function Button({label, color, action}){
    return <div className={`button ${color}`} onClick={action}>
        {label}
    </div>
}