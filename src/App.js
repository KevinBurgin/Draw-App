import React, { useRef, useState, useEffect, useCallback} from 'react'
import { useNavigate} from 'react-router-dom'
import './App.css';





const colors = [
    "Black",
    "Grey",
    "White",
    "Blue",
    "Red",
    "Green",
    "Purple",
    "Orange",
    "Yellow",
    "Pink",
    "Tan",
    "Maroon",
    "Aqua",
    "Teal"
]

const brush =[
    "1",
    "2",
    "3",
    "4",
    "6",
    "7",
    "8",
    "9",
    "10",
    "15",
    "20",
    "25",
    "30",
    "35",
    "40",
    "45",
    "50",
    "55",
    "60",
    "65",
    "70",
    "75",
    "80", 
    "85", 
    "90",
    "95",
    "100",
    "500"
]
const radius =[
  "1",
  "2",
  "3",
  "4",
  "6",
  "7",
  "8",
  "9",
  "10",
  "15",
  "20",
  "25",
  "30",
  "35",
  "40",
  "45",
  "50",
  "55",
  "60",
  "65",
  "70",
  "75",
  "80", 
  "85", 
  "90",
  "95",
  "100",
  "500"
]

function App() {

    const navigate = useNavigate();
    const canvasRef = useRef(null)
    const contextRef = useRef(null)


    const [selectedRadius, setSelectedRadius] = useState(radius[0])
    const [selectedBrush, setSelectedBrush] = useState(brush[0])
    const [selectedColor, setSelectedColor] = useState(colors[0])
    const [mouseDown, setMouseDown] = useState(false);
    const [lastPosition, setPosition] = useState({
        x: 0,
        y: 0
    });

    useEffect(() => {
        if (canvasRef.current) {
            contextRef.current = canvasRef.current.getContext('2d');
        }
    }, []);

   const draw = useCallback((x, y) => {
       if (mouseDown) {
        contextRef.current.beginPath();
        contextRef.current.strokeStyle = selectedColor;
        contextRef.current.lineWidth = selectedBrush;
        contextRef.current.radius = selectedRadius;
        contextRef.current.lineJoin = "round";
        contextRef.current.moveTo(lastPosition.x, lastPosition.y)
        contextRef.current.lineTo(x, y)
        contextRef.current.closePath();
        contextRef.current.stroke();

        setPosition({
            x,
            y
        })
       }
   }, [lastPosition, mouseDown, selectedColor, setPosition])

   const download = async () => {
       const image = canvasRef.current.toDataURL('image/png');
       const blob = await (await fetch(image)).blob();
       const blobURL = URL.createObjectURL(blob);
       const link = document.createElement('a');
       link.href = blobURL;
       link.download = "image.png";
       link.click();
   }

   const clear = () => {
       contextRef.current.clearRect(0, 0, contextRef.current.canvas.width, contextRef.current.canvas.height)
   }

   const redirect = () => {
    navigate.push('/')
    }  
    
   const onMouseDown = (e) => {
       setPosition({
           x: e.pageX,
           y: e.pageY
       })
       setMouseDown(true)
   }

   const onMouseUp = () => {
    setMouseDown(false)
    }

    const onMouseMove = (e) => {
        draw(e.pageX, e.pageY)
    }

    return (
        <div className="draw-container">
            {/* <NavBar/> */}
            <canvas
            style ={{borderBottom: "5px solid black"}}
            width={1440}
            height={700}
            ref={canvasRef}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            />
            <br/>
            <div className="canvas-buttons">
            <select value={selectedColor} className="color-select" onChange={(e) => setSelectedColor(e.target.value)}>
                {
                    colors.map(
                        color => <option key={color} value={color}>{color}</option>
                    )
                }
            </select>
            <select value={selectedBrush} className="color-select" onChange={(e) => setSelectedBrush(e.target.value)}>
                {
                    brush.map(
                        brush => <option key={brush} value={brush}>Brush Size:{brush}</option>
                    )
                }
            </select>
            <select value={selectedRadius} className="color-select" onChange={(e) => setSelectedRadius(e.target.value)}>
                {
                    brush.map(
                        brush => <option key={radius} value={radius}>Brush Radius:{radius}</option>
                    )
                }
                </select>
                <button onClick={clear} className="clear-button">Clear</button>
                <button onClick={download} className="download-button">Download</button>
                <button onClick={redirect} className="home-button">Home</button>
            </div>
        </div>
    )
}

export default App;
