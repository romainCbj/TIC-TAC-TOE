
import './App.css';
import React, { useState } from 'react';

export default function App() {
  //Si true c'est à X 
  //Si false c'est à O
  const [tourJoueur, setTourJoueur] = useState(true);
  const [matrice, setMatrice] = useState ([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ])
  const [winner, setWinner] = useState ("");

  const [mat, setMat] = useState();
  const [scoreX, setScoreX] = useState(0);
  const [scoreO, setScoreO] = useState(0);

const tourContent = (value) => {
  if(value === true) return "X"
  if(value === false) return "O"
}

const tdContent = (x) => {
  if (x== 0) return "";
  if (x== 1) return "X";
  if (x== -1) return "O";
}


const GenerateMatrice = () => {
  const lignes = [];
  for(let i = 0; i < 3; i++) {
    const ligne = [];
    for(let j = 0; j < 3; j++){
      const col  = (<td key = {i+j}onClick = {()=>RemplirCase(i,j)}>{tdContent(matrice[i][j])}</td>);
      ligne.push(col);
    }
     lignes.push((<tr>{ligne}</tr>));
  }
  setMat(lignes);
   return lignes;
};

  // Au lancement de la page
  React.useEffect(() => {
    GenerateMatrice();

  },[matrice])

function RemplirCase(i,j){
  const _newMatrice = [...matrice];
  if(tourJoueur == true){
    _newMatrice[i][j] = 1;
  }
  else{
    _newMatrice[i][j] = -1;
  }
  setMatrice (_newMatrice);
  GenerateMatrice();
  VerifWinner();
  if(winner != ""){
    alert("Winner is " + winner)
    if(winner == "X") {
      setScoreX(scoreX +1);
    }
    else if(winner == "O"){
      setScoreO(scoreO +1);
    }
    Reset();
    setWinner("");
  }
  setTourJoueur(!tourJoueur);
}

function VerifWinner(){
  for(let i = 0; i < 3; i++) {
    let somme = 0;
    for(let j = 0; j < 3; j++){
      somme += matrice[i][j];
      VerifSomme(somme)
    }
  }

  for(let i = 0; i < 3; i++) {
    let somme = 0;
    for(let j = 0; j < 3; j++){
      somme += matrice[j][i];
      VerifSomme(somme)
    }
  }
  //Diagonales
  VerifSomme(matrice[0][0] + matrice[1][1] + matrice[2][2])
  VerifSomme(matrice[2][0] + matrice[1][1] + matrice[0][2])

}

function VerifSomme(somme){
  if(somme == 3){
    console.log("test X")
    setWinner("X");
    console.log(winner);
    return
  }
  else if(somme == -3){
    console.log("test O")
    setWinner("O");
    return
  }
  console.log(winner);
}

function Reset (){
  const _newMatrice = [...matrice];
  for(let i = 0; i < 3; i++) {
    for(let j = 0; j < 3; j++){
      _newMatrice[i][j] = 0
    }
  }
  setMatrice (_newMatrice);
  GenerateMatrice();

}

  return (
    <div > 
      <div class ="Game"> 
      
        <table>
        {mat}
        </table>
       
      </div>
    
     <div class = "infos">
     <h2> C'est à {tourContent(tourJoueur)} de jouer</h2>
        <h2>Score </h2>
        <h3>X : {scoreX}</h3>
        <h3>0 : {scoreO}</h3>
        <button name='reste' onClick={Reset}>Reset</button>
     </div>
    </div>

  );

};
