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

function createAllWindowElement(){

    const calendar = document.getElementById('calendar')
    
    //couleurs utilisées
    const colors = [
        "#8dae87", "#b6d3c2", "#c4e3e3", "#f3d1d1","#cd5c44","#f9edcc","#ded8f5", "#e0c3fc","#fcd1e3","#fff5e6","#d3d3f3","#b5e3cd","#f6e5f9","#e6f7f9","#cce5ff","#d3f6e3","#f7e6cc","#fde9e9","#65bcb8","#f2d59e","#e6f2d9","#e8e4f7","#ffe6f2","#d9f4f1"  
    ];
    
    //nb de jours pour le calendrier
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
    
    const shuffledNumbers = shuffleArray(numbers);
    const shuffledColors = shuffleArray(colors);
    
    const windows = [] //tableau vide
    
    // pour chaque nombre, créer un tableau avec des objets window
    shuffledNumbers.forEach(number => {
        windows.push({
            "id": number,
            "color": shuffledColors[number]
        })
    });
    
    
    // crée le boutton, ajoute une classe window, un data-attribute avec l'id, le numéro du jour et une couleur
    function createWindow(element){
        let windowBtn = document.createElement('button');
        windowBtn.classList.add('window');
        windowBtn.setAttribute('data-attribute', element.id);
        windowBtn.style.backgroundColor = element.color
        windowBtn.innerHTML = element.id

        calendar.appendChild(windowBtn)
    }
    
    //pour chaque objet window dans windows (donc 24), créer une fenetre
    windows.forEach(window => {createWindow(window)});
}
// localStorage.clear();
createAllWindowElement()