import { useState } from 'react'
import './App.css'
import confetti from 'canvas-confetti'
import { Square } from './components/Square.jsx'
import { TURNS } from './constants'
import { checkWinnerFrom,checkEndGame } from './logics/board'
import { WinnerModal } from './components/WinnerModal'
import { resetGameStorage,saveGameToStorage } from './logics/Storage/index.js'

function App() {
  const [board,setBoard] = useState(()=>{
    const boardFromStorage = window.localStorage.getItem('Board')
    if(boardFromStorage) return JSON.parse(boardFromStorage)
      return Array(9).fill(null)
  })
/*
Creamos un estado para definir el turno, pasamos el turno inicial(x en este caso)
y esto nos devuelve un array con 2 posiciones, primera el valor del estado
segunda posicion como actualizar el estado 
*/
  const [turn,setTurn] = useState(()=>{
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X 

  }) 
  const [winner, setWinner] = useState(null) //null no win, false tie
  
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  //Reset GameLocalStorage
    resetGameStorage()
  
  }

  const updateBoard = (index)=>{
    if(board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    //actualiza el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    //Guardar partida
    saveGameToStorage({
      board: newBoard,
      turn: newTurn
    })
 
    //revisa si existe ganador
    const newWinner = checkWinnerFrom(newBoard)
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
      <button onClick = {resetGame}>Reset del juego</button> 
      <section className='game'>
      {
        board.map((square,index)=>{
          return(
            <Square 
            key={index} 
            index={index}
            updateBoard={updateBoard}
            >
            {square}
            </Square>
          )
        })
      }
      </section>
    
    <section className='turn'>
      <Square isSelected={turn===TURNS.X}>
      {TURNS.X}
      </Square>
      <Square isSelected={turn===TURNS.O} >
      {TURNS.O}
      </Square>
    </section>

    <WinnerModal resetGame={resetGame} winner={winner}/>
    </main>
  ) 
}

export default App
