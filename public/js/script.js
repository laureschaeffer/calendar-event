//----------------------------------------------------------- VARIABLES ET CONSTANTES -----------------------------------------------------------
//elements du dom
const calendar = document.getElementById('calendar')
const modal = document.querySelector('.modal')
const clearLocalBtn = document.getElementById('clearLocal')
const heart = document.querySelector('.heart')

let openedWindows = JSON.parse(localStorage.getItem('openedWindows')) || [0];

let favoriteCitations = JSON.parse(localStorage.getItem('favoriteCitations')) || [];

    
//couleurs utilisées
// const colors = [
//     "#8dae87", "#b6d3c2", "#c4e3e3", "#f3d1d1","#cd5c44","#f9edcc","#ded8f5", "#e0c3fc","#fcd1e3","#fff5e6","#d3d3f3","#b5e3cd","#f6e5f9","#e6f7f9","#cce5ff","#d3f6e3","#f7e6cc","#d46f5a","#65bcb8","#f2d59e","#e6f2d9","#e8e4f7","#ffe6f2","#d9f4f1"  
// ];
const colors = [
    "#AEC6FF", // Soft pastel blue
    "#B39CFF", // Lavender purple
    "#FFC2E2", // Light pastel pink
    "#D4A1FF", // Light orchid
    "#C6E3FF", // Baby blue
    "#E5CFFF", // Light mauve
    "#FFCCE5", // Blush pink
    "#B0DAFF", // Sky pastel blue
    "#D1C2FF", // Lilac
    "#FFC8D9", // Soft coral pink
    "#BBE6FF", // Powder blue
    "#DAB6FF", // Wisteria purple
    "#FFD1E8", // Cotton candy pink
    "#AFC8FF", // Light denim
    "#C4B1FF", // Pale amethyst
    "#FFCCE0", // Rosy pink
    "#ADD8FF", // Ice blue
    "#DEC5FF", // Light lavender
    "#FFCBE5", // Peony pink
    "#9CCAFF", // Morning blue
    "#C3AFFF", // Soft violet
    "#FFC3D8", // Pastel rose
    "#B1DEFF", // Cool aqua blue
    "#D8B8FF"  // Orchid pastel
];


//nb de jours pour le calendrier
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]

//citations dans le pop up
const citations = [
    "Noël, c'est la magie dans l'air.",
    "La joie de donner est le vrai cadeau de Noël.",
    "Une étoile brille pour illuminer nos cœurs.",
    "Noël, le moment de partager l'amour.",
    "Le sapin est le symbole d'un foyer chaleureux.",
    "Noël est un état d'esprit, pas une simple fête.",
    "La neige danse comme un ballet féerique.",
    "Chaque flamme de bougie porte un souhait.",
    "Noël est le parfum des souvenirs d'enfance.",
    "Les rires des enfants sont les cloches de Noël.",
    "Le plus beau cadeau est la présence de ceux qu'on aime.",
    "Un Noël simple est un Noël parfait.",
    "La lumière de Noël guide nos âmes.",
    "Les guirlandes sont des rêves tissés de lumière.",
    "Noël transforme le froid en chaleur humaine.",
    "La magie de Noël réside dans les petits détails.",
    "Une tasse de chocolat chaud, et Noël est là.",
    "Les étoiles de Noël brillent dans nos cœurs.",
    "Sous la neige, Noël trouve son écrin parfait.",
    "Les cadeaux s'ouvrent, mais les cœurs aussi.",
    "Noël est un poème écrit en lumières.",
    "Le vent d'hiver murmure des chansons de Noël.",
    "Les souvenirs de Noël sont des trésors éternels.",
    "Un sourire est le plus beau des ornements de Noël."
];

const shuffledNumbers = shuffleArray(numbers);
const shuffledColors = shuffleArray(colors);


let windows = [] //tableau vide

// ----------------------------------------------------------- FONCTIONS -----------------------------------------------------------

// pour chaque nombre, créer un tableau avec des objets window
shuffledNumbers.forEach(number => {
    windows.push({
        "id": number,
        "color": shuffledColors[number]
    })
});



//melange de Fisher-Yates
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        // choisir un index aléatoire entre 0 et i
        const j = Math.floor(Math.random() * (i + 1));
        
        // echanger les éléments array[i] et array[j]
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// *********************************fenetres calendrier*********************************

// crée le boutton, ajoute une classe window, un data-attribute avec l'id, le numéro du jour et une couleur
function createWindow(element){
    let windowBtn = document.createElement('button');
    windowBtn.classList.add('window');

    //si la fenetre a déjà été ouverte : ajoute open à la classe
    if(openedWindows.includes(element.id)){
        windowBtn.classList.add('open')
    }
    windowBtn.setAttribute('data-id', element.id);
    windowBtn.style.backgroundColor = element.color
    windowBtn.innerHTML = element.id

    calendar.appendChild(windowBtn)
}

//pour chaque objet window dans windows : créer une fenetre
windows.forEach(window => {createWindow(window)});


const domWindows = document.querySelectorAll('.window') //tous les elements dom nouvellement créés

// ajoute l'id de la fenetre au localstorage
function addOpenWindow(button){
    const windowId = button.dataset.id
    
    // il faut avoir ouvert la fenetre du jour d'avant
    if(openedWindows.includes(windowId-1)){
        openedWindows.push(Number(windowId))
        button.classList.add('open')

        createSnowEffect()

        //si c'est le dernier jour, ouverture de modal différente
        openedWindows.length == 25 ? endCalendar() : showModal(button)

    } else {
        window.FlashMessage.error("Veuillez ouvrir la fenetre d'avant!");
    }

    //met à jour le localstorage
    localStorage.setItem('openedWindows', JSON.stringify(openedWindows)); 
}

// ecouteur d'evenement pour chaque fenetre du dom
domWindows.forEach(button => {
    button.addEventListener('click', function(){
        // si la fenetre est ouverte, ouvrir le modal avec la citation, sinon ouvrir la fenetre dans le localstorage + le modal      
        openedWindows.includes(Number(button.dataset.id)) ? showModal(button) : addOpenWindow(button)
    })
})

// *********************************modal*********************************
function showModal(button){    
    modal.style.display="initial"

    let modalContent = document.querySelector('.modal-content')
    modalContent.innerHTML =`
        <p class="modal-citation">${citations[(button.dataset.id - 1)]}</p>
        <span class="heart" onclick="addCitationToFavorite(${button.dataset.id - 1})"><i class="fa-regular fa-heart"></i></span>
        <span class="closeModal" onclick="closeModal()">&times;</span>
    `
    
}

// ferme le modal avec le bouton
function closeModal() {
    modal.style.display = "none"; 
}

//recommencer le calendrier
clearLocalBtn.addEventListener("click", () => {
    localStorage.clear();
    window.FlashMessage.success("Calendrier remis à 0");
    location.reload();
})


// *********************************citations*********************************
// ajoute citation aux favoris
function addCitationToFavorite(citationId){
    favoriteCitations.push(citationId);

    // met à jour le localstorage
    localStorage.setItem('favoriteCitations', JSON.stringify(favoriteCitations));

    //ferme le modal et affiche la citation à la suite des autres
    closeModal() 
    window.FlashMessage.success("Citation ajoutée aux favoris");
    showCitation(citationId)
}

//crée une card citation dans le container
function showCitation(element){
    const citationContainer = document.getElementById('citations')
    
    let citationCard = document.createElement('div')
    citationCard.classList.add('citation')
    citationCard.innerHTML =`
        <span>${citations[element]}</span>
        <span class="deleteCitation" onclick="deleteCitation(${element})">&times;</span>
    `
    citationContainer.appendChild(citationCard)
}

//supprime une citation des fav
function deleteCitation(citationId){
    //filtre le tableau pour en retourner un nouveau sans l'id de la citation à supprimer
    favoriteCitations = favoriteCitations.filter(id => id !== citationId)
    // met à jour le localstorage
    localStorage.setItem('favoriteCitations', JSON.stringify(favoriteCitations))

    location.reload();
}

favoriteCitations.forEach(element => { showCitation(element) })

// *********************************flocons*********************************
function createSnowEffect() {
    const snowContainer = document.getElementById('snow-container');
    const snowflakes = []; // flocons créés
  
    // genere 50 flocons de neige
    for (let i = 0; i < 50; i++) {
      const snowflake = document.createElement('div')

      snowflake.classList.add('snowflake')
      snowflake.textContent = '❄'
      snowflake.style.left = Math.random() * 100 + 'vw' // position aleatoire
      snowflake.style.animationDuration = Math.random() * 3 + 2 + 's' // durée aleatoire
      snowflake.style.fontSize = Math.random() * 1.5 + 0.5 + 'rem' // taille aleatoire
  
      snowContainer.appendChild(snowflake)
      snowflakes.push(snowflake) // ajoute le flocon au tableau
  
      // supprime chaque flocon apres son animation
      snowflake.addEventListener('animationend', () => {
        snowflake.remove()
      })
    }
  
    // nettoie tous les flocons après 5 secondes
    setTimeout(() => {
      snowflakes.forEach(flake => flake.remove())
    }, 5000);
}

// *********************************fin calendrier*********************************

// ouvre les 23 premières cases du calendrier
const goToEndBtn = document.getElementById('goToEnd')
goToEndBtn.addEventListener('click', () => {    
    openedWindows = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
    localStorage.setItem('openedWindows', JSON.stringify(openedWindows)); 

    location.reload();
})



//modal différent si dernier jour : photo, github et musique
function endCalendar(){
    modal.style.display="initial"

    let modalContent = document.querySelector('.modal-content')
    
    modalContent.innerHTML =`
    <img src="../../public/img/self.png" alt="picture"> 
    <div>
        <p>Ce calendrier de l'avent vous a été présenté par Laure<br> N'hésitez pas à aller voir mon <a href="https://github.com/laureschaeffer" target=_blank>Github</a> !</p>
        
        <audio id="audio-surprise" controls>
        <source src="../../public/surprise.mp3" type="audio/mpeg">
        Message à afficher en cas de non support de la balise par le navigateur.
        </audio>
    </div>

    <span class="closeModal" onclick="closeModal()">&times;</span>
    `

    // démarre l'audio
    const audio = document.getElementById('audio-surprise');
    audio.play();
    audio.style.display="initial"

}
