import React, {useState} from 'react'
import './App.css'

const App = () => {
  const turnRightconfig= {
    'N': 'E',
    'E': 'S',
    'S': 'W',
    'W': 'N'
  }

  const [roombaPos, setRoombaPos] = useState({
    x: 0,
    y:0
  });

  const [roombaDir, setRoombaDir] = useState('N');
  
  const handleDirectionChange = () => {
    setRoombaDir(turnRightconfig[roombaDir])
  }

  const handleMoveForward = () => {
    if((roombaDir === 'N' && roombaPos.y === 0) || 
       (roombaDir === 'E' && roombaPos.x === 9) || 
       (roombaDir === 'S' && roombaPos.y === 9) || 
       (roombaDir === 'W' && roombaPos.x === 0)){
      handleDirectionChange()
      return
    }

    switch (roombaDir) {
      case 'E':
        setRoombaPos(prev => ({
          ...prev,
          x: prev.x + 1
        })) 
        break;
      case 'S':
        setRoombaPos(prev => ({
          ...prev,
          y: prev.y + 1
        })) 
        break;
      case 'W':
        setRoombaPos(prev => ({
          ...prev,
          x: prev.x - 1
        })) 
        break;
      case 'N':
        setRoombaPos(prev => ({
          ...prev,
          y: prev.y - 1
        })) 
        break;  
      default:
        break;
    }
  }

  const calculateDeg = () => {
    let deg 
    switch (roombaDir) {
      case 'N':
        deg = 0
        break;
      case 'E':
        deg= 90
        break;
      case 'S':
          deg= 180
          break;
      case 'W':
        deg = 270
        break;
        default:
          break;
    }
    return deg
  }

  return (
    <div className="flex flex-col justify-center items-center m-8">
      <h1 className="text-2xl font-sans mb-4 ">Roomba Exercise</h1>
      <div>
        <button className="border border-black p-2 m-2 rounded" onClick={handleDirectionChange}>Turn Right</button>
        <button className="border border-black p-2 m-2 rounded" onClick={handleMoveForward}>Move Forward</button>

      </div>

        <div className="Grid">

        {[...Array(10).keys()].map((_, x) => (
            <div key={x} className="Column">
            {[...Array(10).keys()].map((_, y) => (
              <div key={y} className="Cell">
              {(x===roombaPos.x && y===roombaPos.y) && 
                <div 
                  className="text-xl p-1"
                  style={{
                    transform: `rotate(${calculateDeg()}deg)`
                  }}>
                  ☝🏼
                </div> 
                }
            </div>
            ))}
            </div>
        ))}   
        </div>
    </div>
  )
}

export default App