import React, { useRef, useState, useEffect, useCallback} from 'react'
// import { useNavigate} from 'react-router-dom'
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
// const fill =[
//   " Blue",
//   " Red"
// ]

function App() {

    // const navigate = useNavigate();
    const canvasRef = useRef(null)
    const contextRef = useRef(null)


    // const [selectedFill, setSelectedFill] = useState(fill[0])
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

   const save = () => {
    contextRef.current.save(0,0,contextRef.current.canvas.width, contextRef.current.canvas.height)
   }

   const restore = () => {
    contextRef.current.restore(0,0,contextRef.current.canvas.width, contextRef.current.canvas.height)
   }

  //  const fill = () => {
  //     // contextRef.current.fillRect(10,10,100,100);
  //     for (let i = 0; i < 6; i++) {
  //       for (let j = 0; j < 6; j++) {
  //         contextRef.current.fillStyle = `rgb(
  //             ${Math.floor(355 - 42.5 * i)},
  //             ${Math.floor(355 - 42.5 * j)},
  //             0)`;
  //         contextRef.current.fillRect(j * 25, i * 25, 25, 25);
  //       }
  //     }
  //  }

    // const fill = useCallback((x,y) => {
    //   let start = { x: 50,    y: 20  };
    //   let cp1 =   { x: 230,   y: 30  };
    //   let cp2 =   { x: 150,   y: 80  };
    //   let end =   { x: 250,   y: 100 };
            
    //   canvasRef.current.beginPath();
    //   canvasRef.current.moveTo(start.x, start.y);
    //   canvasRef.current.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, end.x, end.y);
    //   canvasRef.current.stroke();

    //   // Start and end points
    //   canvasRef.current.fillStyle = 'blue';
    //   canvasRef.current.beginPath();
    //   canvasRef.current.arc(start.x, start.y, 5, 0, 2 * Math.PI);  // Start point
    //   canvasRef.current.arc(end.x, end.y, 5, 0, 2 * Math.PI);      // End point
    //   canvasRef.current.fill();

    //   // Control points
    //   canvasRef.current.fillStyle = 'red';
    //   canvasRef.current.beginPath();
    //   canvasRef.current.arc(cp1.x, cp1.y, 5, 0, 2 * Math.PI);  // Control point one
    //   canvasRef.current.arc(cp2.x, cp2.y, 5, 0, 2 * Math.PI);  // Control point two
    //   canvasRef.current.fill();
    // }

  //  const redirect = () => {
  //   navigate.push('/')
  //   }  
    
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
            <canvas className='canvas'
            style ={{border: "5px solid black"}}
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
            {/* <select value={selectedFill} className="color-select" onChange={(e) => setSelectedFill(e.target.value)}>
                {
                    fill.map(
                        fill => <option key={fill} value={fill}>Fill:{fill}</option>
                    )
                }
                </select> */}
                <button onClick={clear} className="clear-button">Clear</button>
                <button onClick={download} className="download-button">Download</button>
                <button onClick={save} className="save-button">Save</button>
                <button onClick={restore} className="restore-button">Restore</button>
            </div>
        </div>
    )
}

export default App;
