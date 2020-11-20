let lettres = document.querySelector(".lettres");
let erreur = document.querySelector(".erreur");
let image = document.querySelector(".pendu img");
let etape = 1; // étape image
let presenceLettre = false;
let tabLettreErreur = []; // liste des lettres tapé non présente dans le mot

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

//Pour chaque lettre on fait un div
tabLettres.forEach((lettre) => {
  let div = document.createElement("div");
  div.textContent = lettre;
  lettres.append(div);
});

let divLettres = document.querySelectorAll(".lettres div");

//Quand on tape sur une touche
document.body.addEventListener("keydown", (e) => {
  //on ne test la lettre que si une lettre de l'alphabet de 1 caractères
  //pour éviter d'accepter 'enter' par exemple
  if (e.key.match(/[a-z]/) && e.key.length == 1) {
    presenceLettre = false;

    //si la lettre est présente dans le mot, on l'a fait apparaitre
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
    //si la lettre n'est pas présente dans le mot, on affiche l'erreur
    if (presenceLettre == false) {
      affichageErreur(e.key);
    }
  }
});

let affichageErreur = (lettre) => {
  //si la lettre n'est pas dans le tableau de lettres d'erreur
  if(!tabLettreErreur.includes(lettre)) {
  //changement d'image
  etape++;
  if (etape < 8) {
    console.log(etape + " etape");
    image.src = `img/etape${etape}.png`;
  } else {
    console.log("perdu");
  }

  //creation lettre erronnées
    tabLettreErreur.push(lettre);
    console.log("le tableau d'erreur contient : " + tabLettreErreur)
    let divError = document.createElement("div");
    divError.textContent = lettre;
    erreur.append(divError);
  }
};
