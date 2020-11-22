//================================================//
//=============== Cached DOM Nodes ===============//
//================================================//
const startButton = document.getElementById('startGameButton');//e listener added
const rulesButton = document.getElementById('showRulesButton');//e listener added
const resetButton = document.getElementById('resetButton');//e listener added
const backButton = document.getElementById('backButton');//e listener added
const showButton = document.getElementById('showButton');//e listener added
const defuseButton = document.getElementById('defuseButton');
const gameOverButton = document.getElementById('gameOverButton');
const winnerText = document.querySelector('.gameOver-text');
const carouselNext = document.getElementById('carousel-next');//e listener added
const carouselPrevious = document.getElementById('carousel-previous');//e listener added
const carouselImage = document.querySelector('.carousel img');
const carouselText = document.querySelector('.carouselText');
const carousel = document.querySelector('.carousel');
const gameOverOverlay = document.querySelector('.gameOver');
const startGameOverlay = document.getElementById('start-game');
const swapTurnsOverlay = document.getElementById('new-player-turn');
const exploKittyOverlay = document.getElementById('explo-kitty');
const activeCards = document.getElementById('active-cards');
const inactiveCards = document.getElementById('inactive-cards');
const deckButton = document.getElementById('play-deck');//e listener added
const discardDeck = document.getElementById('discard-deck');
const card = document.querySelector('.card');

const swapText = document.querySelector('.New-player-turn-text');
//================================================//
//=============== Global Variables================//
//================================================//
let player1; 
let player2; 
let turnCounter = 0;
let currentActive;
let currentInActive;
let attackedPlayer;
let attackCount = 0;
//=============Arrays===============//
let player1Hand = [];
let player2Hand = [];
let deck = [];
let discard = [];
const setActive= () =>{
    if(player1 === true){
        currentActive = player1Hand
        currentInActive = player2Hand
    } else {
        currentActive = player2Hand
        currentInActive = player1Hand
    }
}
const gamePlay = () => {
    // turnCounter++;
    applyTurnOverlay();
    setActive();
    showCards();
    // whosTurn();   
}
//================================================//
//==========Build the ruless carousel ============//
//================================================//
// Rules/Card rules carousel
// Flow through all available cards with text explaining game
// 	- The carousel just turns through the different types of cards available...no choices given, just a read me type output.
// images pulled from https://refreshplay.co.uk/2018/01/25/exploding-kittens-card-game-review/
const backgroundImage = [
    'images/attack-cat.jpg',
    'images/explodingkittencard.png',
    'images/defuse-card.png', 
    'images/attack-card-back.png',
    'images/shuffle-card.png',
    'images/skip-card.png'
    ]; //add images for carousel here
const rulesText = [
    'The basics, click on a card to play, click on the deck to draw a card.  Drawing a card ends your turn...don\'t die!',
    'The Exploding Kitten - This will hurt you more than it will hurt me...avoid at all costs..it will end you', 
    'Throw toys to the kitten, chances are it\'ll just lay in a box and watch you very suspiciously.  This card cancels the Exploding Kitten and puts it back into the deck randomly',
    'You attacked, with your awesome back hair. End your turn without drawing a card, force your opponent to take 2 turns in a row',
    'Shuffles deck and ends turn by drawing a card...nerd speak...using the Fisher-Yates Shuffle',
    'You live to die another day, ends your turn without drawing a card'
]; 
let slideIndex = 0;
//Update carousel image
const updateCarouselImage = () => {
    carouselImage.setAttribute('src', backgroundImage[slideIndex]);
    carouselText.innerText = `${rulesText[slideIndex]}`;
}
updateCarouselImage();
//change slide next function
//when the user clicks the next button
const changeSlideNext = () => {
    if(slideIndex < backgroundImage.length -1){
        slideIndex++;
    } else {
        slideIndex = 0;
    }
    updateCarouselImage();
}
const changeSlidePrevious = () => {
    if(slideIndex >0){
        slideIndex--;
    }else {
        slideIndex = backgroundImage.length -1;
    }
    updateCarouselImage();
}
const openCarousel = () =>{
    startGameOverlay.classList.remove('show');
    carousel.classList.add('show');
}
const closeCarousel = () => {
    carousel.classList.remove('show');
}
//================================================//
//==========Build the cards and the deck==========//
//================================================//
// - class constructor for card generator - name and id
class Card {
    constructor(name, id, image){
        this.name = name;
        this.id = id;  
        this.image = image;   
    }
}
const cardNames = ['Attack', 'Skip', 'Shuffle'];
const cardId = [1,2,3,4];
const cardImage = ['images/attack-card-back.png', 'images/skip-card.png', 'images/shuffle-card.png'];
const generateDeck = () => {
        for(let n = 0; n < cardNames.length; n++) {
            for(let i = 0; i < cardId.length; i++){
                var cards = new Card(cardNames[n], cardNames[n] + cardId[i], cardImage[n]);
                deck.push(cards)
            }
        }
        for(let i = 0; i < 4; i++){
            const defuseCard = new Card ('Defuse', 'Defuse' + i, 'images/defuse-card.png')
            deck.push(defuseCard);
        }
}
//================================================//
//=================Game Logic=====================//
//================================================//
    
//=========begin game function==========//
const beginGame = () => {
// - Build begin game state no cards dealt to the players and no card in the discard pile
    // call the begin game protect card overlay from CSS with start and rules butto
    // startGameOverlay.classList.add('show')
    // clear player arrays    
    let emptyArr1 = [];
    let emptyArr2 = [];
    let emptyArr3 = [];
    let emptyArr4 = [];
    player1Hand = emptyArr1;
    player2Hand = emptyArr2;
    // reset deck array to []
    deck = emptyArr3;
    //Reset discard array to []
    discard = emptyArr4;
    let resetCount = 0;
    turnCounter = resetCount;
    generateDeck();
// shuffle deck
    shuffle(deck);
// deal initial hand of cards
    dealCards();
//add in exploding kitten randomly
    exploKitt();
    player1 = true//Ensures starting player is player 1
    startGameOverlay.classList.remove('show');
}
//==============Which Players turn ===============//
//whos turn is it
function whosTurn() {
    turnCounter++;
    if(turnCounter % 2 === 0){
        player1 = true
        player2 = false
    } else {
        player1 = false
        player2 = true
    }
    console.log(turnCounter);
}
//==============Show Active Cards ===============//
//See cards on DOM, show active players cards, hides non-active players cards
// Only show active players cards after show cards screen is clicked
function removeTurnOverlay () {
    swapTurnsOverlay.classList.remove('show');
}
//removes both players hands from DOM so they can be swapped and added back 
function applyTurnOverlay () {
    swapTurnsOverlay.classList.add('show');
    for(let i = 0; i < currentActive.length; i++){
        let act = document.querySelector('.card')
        act.remove();   
    }
    for(let i = 0; i < currentInActive.length; i++){
        let act2 = document.querySelector('.card')
        act2.remove();   
    }
}
const showCards = () => {
    setActive();
     if(player1 === true){
        let playerText = document.querySelector('.whos-turn')
        playerText.innerText = 'Player 1\'s Turn'
        swapText.innerText = 'Player 2\'s Turn'
    } else {
        let playerText = document.querySelector('.whos-turn')
        playerText.innerText = 'Player 2\'s Turn'
        swapText.innerText = 'Player 1\'s Turn'
    }
    //swap visible cards to new active players array
    for(let i = 0; i < currentActive.length; i++){
        let cardDiv = document.createElement('div');
        cardDiv.setAttribute('class', 'card');
        cardDiv.setAttribute('id', `${currentActive[i].id}`)
        cardDiv.innerText = `${currentActive[i].name}`
        let cardImg = document.createElement('img')
        cardImg.src = `${currentActive[i].image}`
        cardDiv.appendChild(cardImg);
        activeCards.appendChild(cardDiv);
        cardDiv.addEventListener("click", chooseCard);
    }
    for(let i = 0; i < currentInActive.length; i++ ){
        let cardDiv = document.createElement('div');
        cardDiv.setAttribute('class', 'card');
        inactiveCards.appendChild(cardDiv);
    }
    //remove overlay
    xplodKat();
    removeTurnOverlay();
    
}
//================================================//
//============Additional Functions================//
//================================================//
//Removes start over lay and adds card protect overlay...can be built into other function...needed to start
const startGame = () => {
    startGameOverlay.classList.add('show');
}

const xplodKat = () => {
    for(i =0; i < currentActive.length; i++){
        if(currentActive[i].name === 'Exploding Kitten'){
            exploKittyOverlay.classList.add('show');
        }
    }
}
//adapted from https://medium.com/@joshfoster_14132/best-javascript-shuffle-algorithm-c2c8057a3bc1
//Fisher-Yates Shuffle
function shuffle(x) {
    let currI = x.length, tmp, rIndex;
    while(0 !== currI) {
        rIndex = Math.floor(Math.random() * currI);
        currI -= 1;
        tmp = x[currI];
        x[currI] = x[rIndex];
        x[rIndex] = tmp
    }
    //Shuffle randomly swap values of 2 different cards in arrray for 500 permutations
    //This one works as well
    // for(let i = 0; i < 500; i++){
    //     let arr1 = Math.floor((Math.random() * x.length));
    //     let arr2 = Math.floor((Math.random() * x.length));
    //     let arr3 = x[arr1]
    //     x[arr1] = x[arr2];
    //     x[arr2] = arr3;
    // }
}
//deal the cards from already randomized array dealing cards one at a time
function dealCards() {
    for(let i = 0; i <= 4; i++){
        let card1 = deck[i];
        player1Hand.push(card1);
        deck.splice(i, 1);
        let card2 = deck[i + 1];
        player2Hand.push(card2);
        deck.splice(i, 1)
    }
}
//add in exploding kitten randomly into the deck
function exploKitt() {
const explodingKitten = new Card ('Exploding Kitten', 'explodyKit1','images/explodingkittencard.png')
        deck.push(explodingKitten);
        shuffle(deck);
}
//chooses player card on click and does action of card
//======= choose card =========//
function chooseCard(){
//player can click either a card in hand to play
//on click - player chooses one of their cards to play
    setActive();   
    // Remove clicked card from DOM and find id of removed card
    const currVal = this.parentNode.removeChild(this).id
    // find index using id
    let index = currentActive.findIndex(x => x.id === currVal);
    //Add to 0 index of discard array
    discard.splice(0, 0, currentActive[index])
    //remove from players hand array 
    currentActive.splice(index, 1)
    //build the div, name and append
    let cardDiv = document.createElement('div');
    cardDiv.setAttribute('class', 'discardedCard');
    cardDiv.innerText = `${discard[0].name}`
    discardDeck.appendChild(cardDiv);
    // let cardImg = document.createElement('img')
    // cardImg.src = `${discard[0].image}`
    // cardDiv.appendChild(cardImg);
    //Call selected cards' function  
    if(discard[0].name === 'Shuffle'){
        shuffle(deck);
        //remove eventlistener for click...or modify to pop up alert to click on the deck
        drawCard();
    } else if (discard[0].name === 'Skip'){
        setActive();
        applyTurnOverlay();
        whosTurn();
    } else if (discard[0].name === 'Attack'){
        // whosTurn();
        whosTurn();
        if(player1 === true){
            player1Hand.push(deck[0])
            player1Hand.push(deck[1])
            deck.splice(0, 2);
        } else{
            player2Hand.push(deck[0])
            player2Hand.push(deck[1])
            deck.splice(0, 2);
        }
        setActive();
        // attackOppP();
        applyTurnOverlay();
        
        // drawCard();
        // drawCard();
        
       showCards();
    }
}
// const attackOppP = () => {
//     currentInActive.push(deck)
// }
//Draw card (or skip function depending on card played)=====ends turn
//-----Draw card / Adds deckArray[0] to active players hand and ends turn, blanks out page (pulls up protect cards overlay, swaps hands and puts button on screen for opposing payer to click to reveil cards,
// on draw card end turn and swap player turn
//if draw card remove card from deck, add to player hand
const drawCard = () => {
    setActive();
    //Add in if statement that will stop gameplay and alert exploding Kitten has been drawn
    // if(deck[0].name === 'Exploding Kitten'){
    //     exploKittyOverlay.classList.add('show');
    // } else {
        currentActive.unshift(deck[0]);
        let cardDiv = document.createElement('div');
        cardDiv.setAttribute('class', 'card');
        cardDiv.setAttribute('id', `${currentActive[0].id}`)
        cardDiv.innerText = `${currentActive[0].name}`
        activeCards.appendChild(cardDiv);
        deck.splice(0,1);
    // }   
    whosTurn();
    applyTurnOverlay();   
}
//================================================//
//===================End Game=====================//
//================================================//
//If exploding kitten card is drawn, then pay defuse card, or game over
//show via exploding kitten giant card with button to defuse (if in players hand) or with end game button that declares winner by moving to game over overlay
// - Game over page overlay has restart button
const endGame = () => {
    removeTurnOverlay();
    exploKittyOverlay.classList.remove('show')
    gameOverOverlay.classList.add('show');
    if(turnCounter % 2 === 0){
        winnerText.innerText = 'Player 1 is the winner!!'
    } else {
        winnerText.innerText = 'Player 2 is the winner!!'
    }
};
const defuseKitten = () => {
    for(let i = 0; i < currentActive.length - 1; i++){
        if(currentActive[i].name === 'Defuse'){
            //remove explodykitten from deck
            deck.splice(0,1);
            // Reinsert kitten randomly
            exploKitt();
            //push defuse card to discard deck
            discard.splice(0, 0, currentActive[i])
            //Remove the defuse card
            currentActive.splice(i, 1);
            currentActive.splice(0,1);
            //build the div, name and append
            let cardDiv = document.createElement('div');
            cardDiv.setAttribute('class', 'discardedCard');
            cardDiv.innerText = `${discard[0].name}`
            discardDeck.appendChild(cardDiv);
            break;
            
        } 
        if(currentActive[i].name === 'Exploding Kitten'){
            currentActive.splice(i, 1);
        }
    }  if(discard[0].name != 'Defuse'){
        endGame();
    } else {
        exploKittyOverlay.classList.remove('show');
    }
    whosTurn();
    applyTurnOverlay();
}
//================================================//
//=============Buttony button=====================//
//================================================//
function resetGame () {
    gameOverOverlay.classList.remove('show');
    startGame();
    gamePlay();
}
// - rules/carousel buttons
rulesButton.addEventListener('click', openCarousel);
backButton.addEventListener('click', closeCarousel);
carouselNext.addEventListener('click', changeSlideNext);
carouselPrevious.addEventListener('click', changeSlidePrevious);
// - start game button
startButton.addEventListener('click', beginGame );
// - Restart button
resetButton.addEventListener('click', resetGame);
// - show cards button
showButton.addEventListener('click', showCards);
// - draw card - for the deck, whole deck is button
deckButton.addEventListener('click', drawCard);
// - defuse the exploding kitten
defuseButton.addEventListener('click', defuseKitten);
// - I give up/Game over button
gameOverButton.addEventListener('click', endGame);
//================================================//
//=============Let's Play!!!!!!===================//
//================================================//
startGame();
gamePlay();
// applyTurnOverlay();
// setActive();
// showCards();