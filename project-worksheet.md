# Project Exploding Kittens Overview

[Click here to see program in progress](https://mdcoxe.github.io/explodingkittens/)

### Key Project 1 Dates
- Nov 16 - Project Approvals
- Nov 17 - Nov 22 - Project Week! We will not meet during normal class times. You will be meeting with your squad at the times instructed by your Squad lead.
- Nov 23 - Project Presentations

## Project Schedule


|  Day | Deliverable | Status
|---|---| ---|
|Day 1| ~~Project worksheet~~  | In-Progress
|Day 1| ~~Wireframes~~ / ~~Priority Matrix / Timeline~~ | Complete
|Day 2| ~~Flesh out HTML/CSS frame~~ / ~~PseudoCode~~ / ~~Build card class / add cards & Players~~ | Complete
|Day 3| Build game logic and connect to DOM  | Continued on
|Day 4| Game Logic cont. / Explode a kitten or 2| Incomplete
|Day 5| Troubleshoot / CSS / MVP| Incomplete
|Day 6| Troubleshoot / CSS / MVP| | Incomplete
|Day 7| Final Touches / Explode a kitten or 2 | Incomplete

- Day 2 - Completed additional accomplishments
	- Built and styled rules carousel
	-got the first event listeners on program and working
- Day 3 - Completed 
	- shuffle function for both initial game start and for shuffle card
	- was able to make cards appear on the DOM, take turns, draw a card, and discard a card. 
	- Created a bug with chooseCard function...does it's job correctly but now it breaks the overlay function that removed cards from the DOM to prep for the next turn
	- adjusted schedule
- Day 4 - 
	- Complete choose card function and track down the bug
	- Finish building out the basic game functions 
	- start adding in the card functions

## Project Description

Exploding Kittens(https://explodingkittens.com/) is a 2-5 player card game where the goal is to avoid the exploding kitten.  In this project I am going to build a 2 player version of the game.  The game functions a lot like Uno and Old Maid combined, wrapped in a meme and thrown to a pack of wild sloths.  The basic functionality of the game comes down to action cards:
- the exploding kitten (ends the game)
- The defuse card (counters the exploding Kitten)
- attack (forces a player to play 2 turns)
- the skip (allows current player to avoid playing a turn)
- the shuffle (shuffles the deck of cards)


There are also 4 other types of cards I'm not going to initially start with.  These I am putting as post MVP goals, the goal of the project is to make a working game, these additions would be a bonus to me.
- the nope (stops any action from happening)
- the favor (forces opposing player to give a card of their choice to you)
- see the future (allows player to see top 3 cards)
- 5 meme cards with 4 copies of each to make up pairs (when a pair is played you get to choose a card at random from opposing player)

## Wireframes

Wireframe of Exploding Kittens:

- [Click here for my Mockflow of this project](https://wireframepro.mockflow.com/view/Mac91b3bf745e9e0540af45fcd77b77841605462970417)

![](https://i.imgur.com/uYSqJY0.png)
I used Mockflow to build a wireframe of Exploding Kittens.  Going from top left to bottom right...first browser is the initial board layout, the second browser is the end game/close to end game state. The browser labeled End of players turn is showing a blanked out screen with text and a button to allow the players to swap sidesand hide screen from view.  The final 2 broswers show how a pair will be visible and a new button and also how the current players cards will flex when a card is removed. The link above is a public link and should be able to be shared.

Added in page 2 to start layout what I think I need for html and css to have a good start


## Time/Priority 

### High priority
- Game Logic
	- Deal Cards
		- Add players cards to the DOM
	- Take turns
	- Draw Card
	- Play Card
- Win / lose Logic ( sub to game logic above)
	- Built arouond Exploding Kitten card and defuse cards
- Card generation
	- Name/id
	- multiple cards of each type
	- build action functions and tie to each related card
	- Array to push deck into
	- Empty array for each players hand to be pushed into
- Build the board
	- HTML of initial Divs
	- CSS to allow visual checking of the game logic


### Medium Priority
- CSS and more CSS
	- Adding images for the cards to make game more visually appealing
- Add additional card functionality
	- Matched pairs
	- See the future

### Low Priority
- Nope card functionality
- Favor Card functionality
- Figure out how to make viewable and playable on mobile device


# MVP
- Build the HTML/CSS using the wireframe
- Build the game logic
	- Deal the cards
	- Take turns
	- Draw card
	- play card
- Build the cards
	- class constructor
	- add cards with functions added as method on creation??
- Basic styling using css (No added images initially, use css to build cards and text to denote card type)
- Build win/lose logic and add to DOM
- Add players cards to the DOM


# PostMVP 
- Fine tune the CSS
	Add in images where appropriate, like every card, card backs)
- Add in additional action cards
	- Matched pairs
	- See the future
	- nope - stops any action card except exploding kitten and defuse (plays from opposing players hand on current players turn)
	- Favor - opposing player choose card to give to current player
- Build in the special combo functions (2 of a kind, 3 of a kind, 5 different cards)
- Figure out how to shrink for mobile

## Functional Components
### Game Functions
- Deal the cards - on game start - cover gameboard with protect cards overlay, deal cards (initial deal includes 1 defuse card) 
- Take turns / End turn on draw card click
- Draw card / Adds deckArray[0] to active players hand and ends turn, blanks out page (pulls up protect cards overlay, swaps hands and puts button on screen for opposing payer to click to reveil cards, 
- play card - on click of a card remove from hand and place on discard pile then do action of card - not required function...can draw instead and end turn
### Card Functions
- Attack - End turn without drawing card, skips next turn(build skip function first and reference in this function??
- Exploding Kitten - End game unless player has Defuse card...must play or game over
- Defuse card -  adds exploding kitten back intto deck in random spot (does not reshuffle deck) can only be played on exploding kitten
- Skip - Ends turn immediately without drawing new card
- Shuffle - Randomizes deck
### Game States
- Begin game function - Clear board, no cards in discard pile, no cards in player arrays then protect card overlay and begin game button and rules button
- Game - play card, discard, next players turn
- End game - Exploding Kitten drawn no defuse card available...pops up with end game button which goes to protect card overlay and has winner message and a reset game button..reset button starts begin game function
### Players turn function
- Denotes which players turn it is, has reference to a variable that can be turned on or off for attack function to allow for it to skip first turn after opposing players turn is finished forcing opposing player to have 2 turns in a row.
Something like this:
```
let dontSkipTurn = true;
let player2Turn;
function whosTurn() {
   if(skipTurn = false){
       player2Turn = player2Turn
       skipTurn = true
   } else {
       player2Turn = !player2Turn
}
```

#### MVP
| Component | Priority | Estimated Time | Time Invetsted | Actual Time |
| --- | :---: |  :---: | :---: | :---: |
| Build the HTML/CSS using the wireframe | H | 4hr | -hr | -hr|
| Build the cards | H | 5hr | -hr | -hr|
| Basic styling using css | H | 5hr| -hr | -hr |
| Card & player generation | M | 4hr | -hr | -hr|
| Build win/lose logic and add to DOM | H | 3hrs| -hr | -hr |
| Add players cards to the DOM | H | 1hr | -hr | -hr|
| Build the game logic | H | 8hr | -hr | -hr|
| Total | H | 30hrs| -hrs | -hrs |

#### PostMVP
| Component | Priority | Estimated Time | Time Invetsted | Actual Time |
| --- | :---: |  :---: | :---: | :---: |
| Fine tune the CSS/add images | H | 8hr | -hr | -hr|
| Add in additional action cards(additional complexity) | M | 8hr | -hr | -hr|
| Build in the special combo functions | L | 4hr | -hr | -hr|
| Make mobile friendly | L | 12hr | -hr | -hr|
| Total | H | 32hrs| -hrs | -hrs |

## Additional Libraries
 Use this section to list all supporting libraries and thier role in the project. 

## Code Snippet

Brief Description of code snippet I'm proud of...

```
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
```

## Issues and Resolutions
 Use this section to list of all major issues encountered and their resolution.

#### SAMPLE.....
**ERROR**: app.js:34 Uncaught SyntaxError: Unexpected identifier                                
**RESOLUTION**: Missing comma after first object in sources {} object
