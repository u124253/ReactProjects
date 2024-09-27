export const saveGameToStorage = ({ board, turn}) => {
    //Guardar partida
    window.localStorage.setItem('Board',JSON.stringify(board))
    window.localStorage.setItem('turn',turn)
}
export const resetGameStorage = () =>{

    window.localStorage.removeItem('Board')
    window.localStorage.removeItem('turn')
}