// version avec 24 boutons dans le fichier html 

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

const windows = document.querySelectorAll('.window') //toutes les fenetres



// modifie le backgroundcolor de chaque fenetre 
function changeWindowBackground(){
    
    //couleurs pour les fenetres
    const colors = [
        "#8dae87", "#b6d3c2", "#c4e3e3", "#f3d1d1","#cd5c44","#f9edcc","#ded8f5", "#e0c3fc","#fcd1e3","#fff5e6","#d3d3f3","#b5e3cd","#f6e5f9","#e6f7f9","#cce5ff","#d3f6e3","#f7e6cc","#fde9e9","#65bcb8","#f2d59e","#e6f2d9","#e8e4f7","#ffe6f2","#d9f4f1"  
      ];
    
    // version plus simple mais chaque bouton n'a pas une couleur unique
    
    // windows.forEach(window => {
    //     let randomIndex = Math.floor(Math.random() * 24) //index entre 0 et 24
    //     console.log(randomIndex);
        
    //     window.style.backgroundColor = colors[randomIndex]
    // });
    
    
    
    const shuffledColors = shuffleArray(colors);
    windows.forEach((window, index) => {
        // console.log(shuffledColors[index]);
        // console.log(window)
        window.style.backgroundColor = shuffledColors[index]
    });
}

//modifie le numéro à l'intérieur de chaque fenetre
function changeWindowNumber(){
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]

    const shuffledNumbers = shuffleArray(numbers);
    windows.forEach((window, index) => {
        // console.log(shuffledNumbers[index]);
        // console.log(window)
        window.innerHTML = shuffledNumbers[index]
    });

}


changeWindowBackground()
changeWindowNumber()
