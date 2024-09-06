import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import confetti from 'canvas-confetti'

const TURNS = {
  X: 'x',
  O: 'o'
}


const Square = ({children,isSelected,updateBoard,index})=>{
  const className = `square ${isSelected ? 'is-selected' : ''}`
   const handleClick = () =>{ updateBoard(index) }
  return(
    <div onClick = {handleClick} className={className}>
      {children}
    </div>
  )
}

const WINNER_COMBOS = [
  // Horizontales
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  
  // Verticales
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  
  // Diagonales
  [0, 4, 8],
  [2, 4, 6],
] 

function App() {
  const [board,setBoard] = useState(
    Array(9).fill(null)
  )
/*
Creamos un estado para definir el turno, pasamos el turno inicial(x en este caso)
y esto nos devuelve un array con 2 posiciones, primera el valor del estado
segunda posicion como actualizar el estado 
*/
  const [turn,setTurn] = useState(TURNS.X) 
  const [winner, setWinner] = useState(null) //null no win, false tie
  
  const checkWinner = (boardToCheck) =>{
    for (const combo of WINNER_COMBOS){
      const [a,b,c] = combo
      if (boardToCheck[a] && boardToCheck[a] === boardToCheck[b]
        && boardToCheck[a] === boardToCheck[c]
        ){return boardToCheck[a] }
      
    }
    return null
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

  }


  const checkEndGame = (newBoard)=>{
    return newBoard.every((square)=>square !== null)
  }
  const updateBoard = (index)=>{
    if(board[index]) return
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    const newWinner = checkWinner(newBoard)
    if(newWinner){
      setWinner(newWinner)
      confetti()
    } else if (checkEndGame(newBoard)){
      setWinner(false)
    }
  }


  return(
    <main className='board'>
      <h1>tic tac toe</h1>
      <section className='game'>
      {
        board.map((_,index)=>{
          return(
            <Square 
            key={index} 
            index={index}
            updateBoard={updateBoard}
            >
            {board[index]}
            </Square>
          )
        })
      }
      </section>
    
    <section className='turn'>
      <Square isSelected={turn==TURNS.X}>{TURNS.X}</Square>
      <Square isSelected={turn==TURNS.O} >{TURNS.O}</Square>
    </section>

    {
      winner !==null && (
        <section className = "winner">
          <div className='text'>
            <h2>
              {
                winner === false
                ? 'Empate'
                : 'Gano'
              }
            </h2>
            <header className='win'>
              {winner && <Square>{winner}</Square>}
            </header>

            <footer>
              <button onClick={resetGame}>Empezar de nuevo </button>
            </footer>
          </div>
        </section>
      )
    }

    </main>
  ) 
}

export default App
