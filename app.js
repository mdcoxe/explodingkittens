//================================================//
//=============== Cached DOM Nodes ===============//
//================================================//
const startButton = document.getElementById('startGameButton');//e listener added
const rulesButton = document.getElementById('showRulesButton');//e listener added
const resetButton = document.getElementById('resetButton');//e listener added
const backButton = document.getElementById('backButton');//e listener added
const showButton = document.getElementById('showButton');//e listener added
const carouselNext = document.getElementById('carousel-next');//e listener added
const carouselPrevious = document.getElementById('carousel-previous');//e listener added
const carouselImage = document.querySelector('.carousel img');
const carouselText = document.querySelector('.carouselText');
const carousel = document.querySelector('.carousel');
const gameOverOverlay = document.querySelector('.gameOver');
const startGameOverlay = document.getElementById('start-game');
const swapTurnsOverlay = document.getElementById('new-player-turn');
const activeCards = document.getElementById('active-cards');
const inactiveCards = document.getElementById('inactive-cards');
const deckButton = document.getElementById('play-deck');//e listener added
const discardDeck = document.getElementById('discard-deck');

let player1; //odds
let player2; //evens
let turnCounter = 0;
let currentActive;
let currentInActive;





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


//================================================//
//==========Build the ruless carousel ============//
//================================================//
// Rules/Card rules carousel
// Flow through all available cards with text explaining game
// 	- The carousel just turns through the different types of cards available...no choices given, just a read me type output.
const backgroundImage = ['icon.jpeg', 'huge_logo.png']; //add images for carousel here
const rulesText = ['test', 'test2']; //add rules to correspond to backgroundImage
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
    constructor(name, id){
        this.name = name;
        this.id = id;
    }
}
const cardNames = ['Attack', 'Skip', 'Shuffle'];
const cardId = [1,2,3,4]
const generateDeck = () => {
        for(let n = 0; n < cardNames.length; n++) {
            for(let i = 0; i < cardId.length; i++){
                var cards = new Card(cardNames[n], cardNames[n] + cardId[i]);
                deck.push(cards)
            }
        }
        for(let i = 0; i < 4; i++){
            const defuseCard = new Card ('Defuse', 'Defuse' + i)
            deck.push(defuseCard);
        }
}
// 	- append individual rules to the parent class??
// - Build functions for the cards 
// 	-  exploding kitten (endgame/choice if defuse card available) - triggers engame state
// 	-  defuse kitten - if defuse card played add exploding kitten back into deck in random spot
// 	-  Attack - end turn without drawing card(using skip function), opposing player takes 2 turns
// 	-  Skip - immediately end your turn without drawing( need 2 skip cards to end attack since it's 2 turns)
// 	-  Shuffle - Shuffle deck (reorder deck cards remaining in random order)
//shuffle(deck);
//loop to generate cards and add to the deck
// 	-  The Deck of cards (needs to be a button when pressed draws a card and then gives option to end turn after viewing drawn card

//================================================//
//=================Game Logic=====================//
//================================================//
    
//=========begin game function==========//
const beginGame = () => {
// - Build begin game state no cards dealt to the players and no card in the discard pile
    // call the begin game protect card overlay from CSS with start and rules butto
    startGameOverlay.classList.add('show')
    // clear player arrays    
    player1Hand = [];
    player2Hand = [];
    // reset deck array to []
    deck = [];
    //Reset discard array to []
    discard = [];
    generateDeck();
    console.log(deck);
// shuffle deck
    shuffle(deck);
    console.log(deck);
// deal initial hand of cards
    dealCards();
//add in exploding kitten randomly
    exploKitt();
    player1 = true//Ensures starting player is player 1
}

//==============Which Players turn ===============//

//whos turn is it
function whosTurn() {
    turnCounter++;
    if(turnCounter % 2 == 0){
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
    setActive();
    if(currentActive.length > 0){
    swapTurnsOverlay.classList.add('show');
    for(let i = 0; i < currentActive.length; i++){
        let act = document.querySelector('.card')
        act.remove();   
    }
    for(let i = 0; i < currentInActive.length; i++){
        let act2 = document.querySelector('.card')
        act2.remove();   
    }
    } else {
        swapTurnsOverlay.classList.add('show');
    }
}
const showCards = () => {
    setActive();
    //swap visible cards to new active players array
    for(let i = 0; i < currentActive.length; i++){
        let cardDiv = document.createElement('div');
        cardDiv.setAttribute('class', 'card');
        cardDiv.setAttribute('id', `${currentActive[i].id}`)
        cardDiv.innerText = `${currentActive[i].name}`
        activeCards.appendChild(cardDiv);
        cardDiv.addEventListener("click", chooseCard);
    }
    for(let i = 0; i < currentInActive.length; i++ ){
        let cardDiv = document.createElement('div');
        cardDiv.setAttribute('class', 'card');
        inactiveCards.appendChild(cardDiv);
    }
    //remove overlay
    removeTurnOverlay();
}


//================================================//
//============Additional Functions================//
//================================================//

//Removes start over lay and adds card protect overlay...can be built into other function...needed to start
const startGame = () => {
    startGameOverlay.classList.remove('show');
    applyTurnOverlay();
}
//Shuffle randomly swap values of 2 different cards in arrray for 500 permutations
function shuffle(x) {
    for(let i = 0; i < 500; i++){
        let arr1 = Math.floor((Math.random() * x.length));
        let arr2 = Math.floor((Math.random() * x.length));
        let arr3 = x[arr1]
        x[arr1] = x[arr2];
        x[arr2] = arr3;
    }
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
const explodingKitten = new Card ('Exploding Kitten', 'explodyKit1')
        deck.push(explodingKitten);
        shuffle(deck);
}
//chooses player card on click and does action of card
// function gamePlay () {
//     


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

    //Call selected cards' function  
}

//Draw card (or skip function depending on card played)=====ends turn
//-----Draw card / Adds deckArray[0] to active players hand and ends turn, blanks out page (pulls up protect cards overlay, swaps hands and puts button on screen for opposing payer to click to reveil cards,
// on draw card end turn and swap player turn
//if draw card remove card from deck, add to player hand
const drawCard = () => {
    setActive();
    currentActive.unshift(deck[0]);
    console.log(currentActive);
    let cardDiv = document.createElement('div');
    cardDiv.setAttribute('class', 'card');
    cardDiv.setAttribute('id', `${currentActive[0].id}`)
    cardDiv.innerText = `${currentActive[0].name}`
    activeCards.appendChild(cardDiv);
    deck.splice(0,1);
    console.log(deck);
    console.log(currentActive);
    applyTurnOverlay();
    whosTurn();

    //Add in if statement that will stop gameplay and alert exploding Kitten has been drawn
}





//================================================//
//===================End Game=====================//
//================================================//
//If exploding kitten card is drawn, then pay defuse card, or game over
//show via exploding kitten giant card with button to defuse (if in players hand) or with end game button that declares winner by moving to game over overlay
// - Game over page overlay has restart button






//================================================//
//=============Buttony button=====================//
//================================================//
function resetGame () {
    beginGame();
}

// - rules/carousel buttons
rulesButton.addEventListener('click', openCarousel);
backButton.addEventListener('click', closeCarousel);
carouselNext.addEventListener('click', changeSlideNext);
carouselPrevious.addEventListener('click', changeSlidePrevious);
// - start game button
startButton.addEventListener('click', startGame );
// - Restart button
resetButton.addEventListener('click', resetGame);
// - show cards button
showButton.addEventListener('click', showCards);
// - draw card - for the deck, whole deck is button
deckButton.addEventListener('click', drawCard);
// - play card - click any button for the 

//================================================//
//=============Let's Play!!!!!!===================//
//================================================//
beginGame();
// gamePlay();