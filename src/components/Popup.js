import './Popup.css';

export const Popup = ({ gameWinner }) => {
    if (!gameWinner) {
        return null
    }
    return (
        <div className="Popup">
            <div>{gameWinner} won</div>
        </div>
    )
}