let lettres = document.querySelector(".lettres");
let erreur = document.querySelector(".erreur");
let image = document.querySelector(".pendu img");
let etape = 1;
let presenceLettre = false;

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
      presenceLettre = true;
      console.log("passer");
      for (const divLettre of divLettres) {
        if (divLettre.textContent == lettre) {
          divLettre.style.color = "black";
        }
      }
    }
  });
  if (presenceLettre == false) {
    affichageErreur(e.key);
  }
});

let affichageErreur = (lettre) => {
  //changement d'image
  etape++;
  if (etape < 8) {
    console.log(etape + " etape");
    image.src = `img/etape${etape}.png`;
  } else {
    console.log("perdu");
  }

  //creation lettre erronnées
  let divError = document.createElement("div");
  divError.textContent = lettre;
  console.log(divError.textContent)
  erreur.append(divError);
};
