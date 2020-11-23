//selection du DOM
let lettres = document.querySelector(".lettres");
let erreur = document.querySelector(".erreur");
let image = document.querySelector(".pendu img");
let score = document.querySelector(".score");
let btnRejouer = document.querySelector(".rejouer");

//Variables de travail
btnRejouer.style.display = "none"; //btn rejouer par defaut invisible
let rejouer;
let etape = 1; // étape image
let presenceLettre = false;
let tabLettreErreur = []; // liste des lettres tapé non présente dans le mot
let stop = false; // si stop vaut true on arrête de jouer
let tabLettres;

let mots = [
  "sanglier",
  "tomate",
  "maison",
  "ecureil",
  "chaise",
  "escalier",
  "carabine",
  "bracelet",
  "biere",
  "bureau",
  "koala",
  "couverture",
];

let nbrRandom;
let nbrRandomPartieAvant;
let motRandom;
let divLettres;

//GENERATION DU MOT ALEATOIRE
let motAleatoire = () => {
  //génére un nombre aléatoire tant que le nombre est le même que celui de la partie d'avant
  //pour changer a chaque partie et ne pas jouer 2x d'affilé avec le même mot
  do {
    nbrRandom = Math.floor(Math.random() * mots.length);
    motRandom = mots[nbrRandom];
  } while (nbrRandom == nbrRandomPartieAvant);

  nbrRandomPartieAvant = nbrRandom;

  tabLettres = motRandom.split("");

  //Pour chaque lettre on fait un div
  tabLettres.forEach((lettre) => {
    let div = document.createElement("div");
    div.textContent = lettre;
    lettres.append(div);
  });

  divLettres = document.querySelectorAll(".lettres div");
};

motAleatoire();

//LORSQUE L'ON TAPE SUR UNE TOUCHE
document.body.addEventListener("keydown", (e) => {
  //on ne détecte les touches que si le stop n'est pas activé
  if (stop == false) {
    //on ne test la lettre que si une lettre de l'alphabet de 1 caractères
    //pour éviter d'accepter 'enter' par exemple
    if (e.key.match(/[a-z]/) && e.key.length == 1) {
      presenceLettre = false;

      //si la lettre est présente dans le mot, on l'a fait apparaitre
      tabLettres.forEach((lettre) => {
        if (e.key == lettre) {
          presenceLettre = true;
          for (const divLettre of divLettres) {
            if (divLettre.textContent == lettre) {
              divLettre.style.color = "black";
            }
          }
          // si toutes les cases sont bien remplies, on arrête de jouer
          if (testJeuFini()) {
            stop = true;
            score.innerHTML = "🎉 Félicitations vous avez gagné ! 🎉";
            btnRejouer.style.display = "block";
          }
        }
      });
      //si la lettre n'est pas présente dans le mot, on affiche l'erreur
      if (presenceLettre == false) {
        affichageErreur(e.key);
      }
    }
  }
});

//AFFICHAGE DES ERREURS
let affichageErreur = (lettre) => {
  //si la lettre n'est pas dans le tableau de lettres d'erreur
  if (!tabLettreErreur.includes(lettre)) {
    //changement d'image
    etape++;
    if (etape < 8) {
      image.src = `img/etape${etape}.png`;
    }

    //creation lettre erronnées
    tabLettreErreur.push(lettre);
    let divError = document.createElement("div");
    divError.textContent = lettre;
    erreur.append(divError);
    //si le joueur a fait 6 erreurs on arrête le jeu et on affiche le score
    if (tabLettreErreur.length >= 6) {
      stop = true;
      score.innerHTML = "😭 Vous avez perdu, le mot était : " + motRandom + " 😭 !";
      btnRejouer.style.display = "block";
    }
  }
};

//RENVOIE TRUE SI TOUTES LES LETTRES SONT BONNES
let testJeuFini = () => {
  let fini = true;
  for (const divLettre of divLettres) {
    if (divLettre.style.color != "black") {
      fini = false;
    }
  }
  return fini;
};

//RECOMMENCE LA PARTIE QUAND ON CLIQUE SUR LE BOUTON REJOUER
btnRejouer.addEventListener("click", () => {
  etape = 1;
  image.src = `img/etape${etape}.png`;
  //on vide l'affichage des lettres/erreur/score
  lettres.innerHTML = "";
  erreur.innerHTML = "";
  score.innerHTML = "";
  motAleatoire();
  tabLettreErreur = [];
  stop = false;
  btnRejouer.style.display = "none";
});
