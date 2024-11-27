//----------------------------------------------------------- VARIABLES ET CONSTANTES -----------------------------------------------------------

//elements du dom
const calendar = document.getElementById('calendar')
const modal = document.querySelector('.modal')
const modalCitation = document.querySelector('.modal-citation')
const closeModalBtn = document.querySelector('.closeModal')
const clearLocalBtn = document.getElementById('clearLocal')

const openedWindows = JSON.parse(localStorage.getItem('openedWindow')) || [0];
console.log(openedWindows);
    
//couleurs utilisées
const colors = [
    "#8dae87", "#b6d3c2", "#c4e3e3", "#f3d1d1","#cd5c44","#f9edcc","#ded8f5", "#e0c3fc","#fcd1e3","#fff5e6","#d3d3f3","#b5e3cd","#f6e5f9","#e6f7f9","#cce5ff","#d3f6e3","#f7e6cc","#fde9e9","#65bcb8","#f2d59e","#e6f2d9","#e8e4f7","#ffe6f2","#d9f4f1"  
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

const windows = [] //tableau vide

// ----------------------------------------------------------- FONCTIONS -----------------------------------------------------------

// pour chaque nombre, créer un tableau avec des objets window
shuffledNumbers.forEach(number => {
    windows.push({
        "id": number,
        "color": shuffledColors[number],
        "citation": citations[number]
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

        // ouvre le modal et affiche la citation associée
        modal.style.display="initial"
        modalCitation.innerHTML = windows[button.dataset.id].citation
    } else {
        alert("veuillez ouvrir la fenetre d'avant!");
    }

    //met à jour le localstorage
    localStorage.setItem('openedWindow', JSON.stringify(openedWindows)); 
}

// ecouteur d'evenement pour chaque fenetre du dom
domWindows.forEach(button => {
    button.addEventListener('click', function(){
        // si la fenetre n'est pas déjà ouverte appel de la fonction addopenwindow
        openedWindows.includes(button.dataset.id) ? console.log("Fenetre déjà ouverte") : addOpenWindow(button)
    })
})

//recommencer le calendrier
clearLocalBtn.addEventListener("click", () => {
    localStorage.clear();
    window.alert("Calendrier remis à 0")
    location.reload();
})

// ferme le modal avec le bouton
closeModalBtn.onclick = () => {
    modal.style.display = "none"; 
}
