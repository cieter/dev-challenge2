const grid = document.querySelector('#grid');
const scene = document.getElementById('scene');
let gridSize = 5;
let gridItems;
let fps = 60;
let acceleration = 0.25;
let topSpeed = 25;
// minimal/maximal grid location
let minZ_index = -1000; // has to start at -1000
let maxZ_index = 50;

let keys_pressed = [];

document.addEventListener("keyup",(keyevent)=>{
    const key=keyevent.code;
    keys_pressed=keys_pressed.filter(key_item=>key_item!=key);
});
document.addEventListener("keydown",(keyevent)=>{
    const key=keyevent.code;
    if(!keys_pressed.includes(key)){ keys_pressed.push(key); }
});

window.onload = () => {
    showMenu();
}

// game loop
const gameLoop = () => {  
    animateWall();
    //Catch multiple inputs

    setInterval(() => {
        const player = document.getElementById('player');
        let playerTop = player.offsetTop;
        let playerLeft = player.offsetLeft;
        if (keys_pressed.includes('ArrowUp')||keys_pressed.includes('KeyW')) {
            // move up
            console.log('arrow up pressed');
            playerTop--;
        }
        if (keys_pressed.includes('ArrowDown')||keys_pressed.includes('KeyS')) {
            // move down
            console.log('arrow down pressed');
            playerTop++;
        }
        if (keys_pressed.includes('ArrowLeft')||keys_pressed.includes('KeyA')) {
            // move left
            console.log('arrow left pressed');
            playerLeft--;
        }
        if (keys_pressed.includes('ArrowRight')||keys_pressed.includes('KeyD')) {
            // move right
            console.log('arrow right pressed');
            playerLeft++;
        }
        player.style.top = playerTop+'px';
        player.style.left = playerLeft+'px';
    }, 100/fps);
}
// end game loop

const animateWall = () => {
    let randomInt = getRandomInt(0, gridItems.length);
    console.log(randomInt);
    let counter = minZ_index;
    console.log(counter);
    setInterval(() => {
        if (counter < -1) {
            counter+=10;
        } else if (counter == -1){
            counter = 0;
        } else if (counter <= maxZ_index){
            counter +=2.5;
        }
        if (counter > maxZ_index+5) {
            gameloop();
        }
        console.log(counter);
        for (i=0;i<gridItems.length;i++) {
            gridItems[i].style.setProperty('--z-index', counter+'px');
            gridItems[randomInt].style.visibility = 'hidden';
        }
    }, 1000/fps);
}

const buildGame = () => {
    generateGridItems();
    generateSprite();
    gridItems = document.querySelectorAll('.block');
    gameLoop();
}

const showMenu = () => {
    let menu = document.createElement('div');
    scene.appendChild(menu).className = 'menu';
    let menuItem1 = document.createElement('div');
    menu.appendChild(menuItem1).id = 'startGameBtn';
    let startGameBtn = document.getElementById('startGameBtn');
    startGameBtn.innerHTML = 'Start Game!';
    startGameBtn.addEventListener('click', function(){
        startGameBtn.style.backgroundColor = '#aa2333';
        checkGrid(menu);
    });
}

const generateSprite = () => {
    let sprite = document.createElement('div');
    scene.appendChild(sprite).id = 'player';
}

const generateGridItems = () =>{ 
    for (i = 0; i < gridSize*gridSize; i++) {
        grid.style.setProperty('--grid-cols', gridSize);
        let gridItem = document.createElement('div');
        grid.appendChild(gridItem).className = 'block';
    }
}

const checkGrid = (menu) => {
    if (gridSize == 1 || !(gridSize % 2)) {
        alert('grid must have a center block. enter odd number');
        menu.remove();
        showMenu();
    } else {
        menu.remove();
        buildGame();
    }
}

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}