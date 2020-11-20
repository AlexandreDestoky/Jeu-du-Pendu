let lettres = document.querySelector(".lettres");

// let mots = ["sanglier", "tomate", "maison", "ecureil", "chaise"];
let mots = ["chaises"];
let nbrRandom;
let motRandom;
let motAleatoire = () => {
  nbrRandom = Math.floor(Math.random() * mots.length);
  motRandom = mots[nbrRandom];
  console.log(motRandom);
};

motAleatoire();

let tabLettres = motRandom.split("");

tabLettres.forEach((lettre) => {
  let div = document.createElement("div");
  div.textContent = lettre;
  lettres.append(div);
});

let divLettres = document.querySelectorAll(".lettres div");

//Quand on tape sur une touche
document.body.addEventListener("keydown", (e) => {

  //si la lettre est la même que celle dans le div on montre la lettre sinon on fait défiler une autre image
  tabLettres.forEach((lettre) => {
    if (e.key == lettre) {
      console.log("passer");
      for (const divLettre of divLettres) {
        if (divLettre.textContent == lettre) {
          divLettre.style.color = "black";
        }
      }
    } else {
      
    }
  });
});
