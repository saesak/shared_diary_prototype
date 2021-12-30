import {useState, React} from "react";
import "../App.css";

const Menu = ({ setLineColor, setLineWidth,
    setLineOpacity }) => {

    const [isText, setIsText] = useState('Text');
    
    const toggleMode = () => {
        if (isText == 'Text') {
            setIsText('Drawing')
            document.getElementsByClassName('draw-area')[0].style.zIndex = '1';
            document.getElementsByClassName('text-area')[0].style.zIndex = '0';
        }
        if (isText == 'Drawing') {
            setIsText('Text')
            document.getElementsByClassName('draw-area')[0].style.zIndex = '0';
            document.getElementsByClassName('text-area')[0].style.zIndex = '1';
        }
    }

    return (
        <div className="Menu">
            <label>Brush Color </label>
            <input
                type="color"
                onChange={(e) => {
                    setLineColor(e.target.value);
                }}
            />
            <label>Brush Width </label>
            <input
                type="range"
                min="3"
                max="20"
                onChange={(e) => {
                    setLineWidth(e.target.value);
                }}
            />
            <label>Brush Opacity</label>
            <input
                type="range"
                min="1"
                max="100"
                onChange={(e) => {
                    setLineOpacity(e.target.value / 100);
                }}
            />
            <label>Toggle Text or Drawing</label>    
            <button onClick={toggleMode}>
                Currently {isText}
            </button>
        </div>
    );
};

export default Menu;