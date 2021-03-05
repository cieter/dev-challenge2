const grid = document.querySelector('#grid');
const scene = document.querySelector('#scene');
let gridSize = 5;
let gridItems;
let fps = 60;
let acceleration = 0.25;
let topSpeed = 25;
// minimal/maximal grid location
let minZ_index = -1000; // has to start at -1000
let maxZ_index = 545;

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
    //Catch multiple inputs
    setInterval(() => {
        const player = document.querySelector('#player');
        let playerTop = player.offsetTop;
        let playerLeft = player.offsetLeft;
        if (keys_pressed.includes('ArrowUp')||keys_pressed.includes('KeyW')) {
            // move up
            // console.log('arrow up pressed');
            playerTop--;
        }
        if (keys_pressed.includes('ArrowDown')||keys_pressed.includes('KeyS')) {
            // move down
            // console.log('arrow down pressed');
            playerTop++;
        }
        if (keys_pressed.includes('ArrowLeft')||keys_pressed.includes('KeyA')) {
            // move left
            // console.log('arrow left pressed');
            playerLeft--;
        }
        if (keys_pressed.includes('ArrowRight')||keys_pressed.includes('KeyD')) {
            // move right
            // console.log('arrow right pressed');
            playerLeft++;
        }
        // ****** collision detection ****** //
        // for (i=0;i<gridItems.length;i++) {
        //     let blockobject = gridItems[i].getBoundingClientRect();
        //     let playerObject = player.getBoundingClientRect();
        // }
        // if (blockobject.left < playerObject.left && playerObject.width)

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
    let opacityCounter = 1;
    var interval = setInterval(() => {
        if (counter < -1) {
            counter+=10;
        } else if (counter == -1){
            counter = 0;
        } else if (counter <= maxZ_index){
            counter +=10;
        }
        if (350 < counter) {
            opacityCounter-=0.1;
        }
        if (counter > maxZ_index) {
            console.log('STOP');
            clearInterval(interval);
            generateWall();
        }
        // console.log(counter);
        for (i=0;i<gridItems.length;i++) {
            gridItems[i].style.setProperty('--z-index', counter+'px');
            gridItems[randomInt].style.visibility = 'hidden';
            gridItems[randomInt].classList.add = 'invisible';
            gridItems[i].style.opacity = opacityCounter;
        }
    }, 1000/fps);
    // for (i=0;i<gridItems.length;i++) {
    //     gridItems[i].style.setProperty('--z-index', minZ_index+'px');
    //     gridItems[randomInt].style.visibility = 'hidden';
    //     gridItems[randomInt].classList.add('invisible');
    // }
}

const buildGame = () => {
    generateWall();
    generateSprite();
    gameLoop();
}

const showMenu = () => {
    let menu = document.createElement('div');
    scene.appendChild(menu).className = 'menu';
    let menuItem1 = document.createElement('div');
    menu.appendChild(menuItem1).id = 'startGameBtn';
    let startGameBtn = document.querySelector('#startGameBtn');
    startGameBtn.innerHTML = 'Start Game!';
    startGameBtn.addEventListener('mouseup', function(){
        startGameBtn.style.backgroundColor = '#aa2333';
        checkGrid(menu);
    });
}

const generateSprite = () => {
    // create perspective class for player
    let spriteBox = document.createElement('div');
    scene.appendChild(spriteBox).id = 'playerBox';
    let sprite = document.createElement('div');
    spriteBox.appendChild(sprite).id = 'player';
    let playerFront = document.createElement('div');
    let playerBack = document.createElement('div');
    let playerTop = document.createElement('div');
    let playerBottom = document.createElement('div');
    let playerLeft = document.createElement('div');
    let playerRight = document.createElement('div');
    sprite.appendChild(playerFront).className = 'playerFace playerFace-front';
    sprite.appendChild(playerBack).className = 'playerFace playerFace-back';
    sprite.appendChild(playerTop).className = 'playerFace playerFace-top';
    sprite.appendChild(playerBottom).className = 'playerFace playerFace-bottom';
    sprite.appendChild(playerLeft).className = 'playerFace playerFace-left';
    sprite.appendChild(playerRight).className = 'playerFace playerFace-right';
}

const generateWall = () =>{
    document.getElementById('grid').remove();
    let grid = document.createElement('div');
    scene.appendChild(grid).id = 'grid';
    for (i = 0; i < gridSize*gridSize; i++) {
        grid.style.setProperty('--grid-cols', gridSize);
        let gridItem = document.createElement('div');
        grid.appendChild(gridItem).className = 'block';
        let frontFace = document.createElement('div');
        let backFace = document.createElement('div');
        let topFace = document.createElement('div');
        let bottomFace = document.createElement('div');
        let leftFace = document.createElement('div');
        let rightFace = document.createElement('div');
        gridItem.appendChild(frontFace).className = 'blockFace blockFace-front';
        gridItem.appendChild(backFace).className = 'blockFace blockFace-back';
        gridItem.appendChild(topFace).className = 'blockFace blockFace-top';
        gridItem.appendChild(bottomFace).className = 'blockFace blockFace-bottom';
        gridItem.appendChild(leftFace).className = 'blockFace blockFace-left';
        gridItem.appendChild(rightFace).className = 'blockFace blockFace-right';
        frontFace.innerHTML = i;
    }
    gridItems = document.querySelectorAll('.block');
    setTimeout(animateWall, 100);
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