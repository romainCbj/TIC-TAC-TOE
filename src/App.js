
import './App.css';
import React, { useState } from 'react';

export default function App() {
  //Si true c'est à X 
  //Si false c'est à O
  const [tourJoueur, setTourJoueur] = useState(true);
  const [test, setTest] = useState("bite")
  const [matrice, setMatrice] = useState ([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ])
  const [winner, setWinner] = useState ("");

  const [mat, setMat] = useState();


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

}

function VerifSomme(somme){
  if(somme == 3){
    console.log("test X")
    setWinner("X");
    alert("Winner is " + winner)
    return
  }
  else if(somme == -3){
    console.log("test O")
    setWinner("O");
    alert("Winner is " + winner)
    return
  }
  console.log(winner);
}

  return (
    <div> 
      <h2> Tour joueur </h2>
      <table>
      {mat}
      </table>
     
     
    </div>
  );

};
