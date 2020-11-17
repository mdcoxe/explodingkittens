// Cached DOM Nodes

// - Restart the game when the user lose


//================================================//
//==========Build the ruless carousel ============//
//================================================//
// Rules/Card rules carousel
// Flow through all available cards with text explaining game
// 	- The carousel just turns through the different types of cards available...no choices given, just a read me type output.

//================================================//
//=========Build the begin game function==========//
//================================================//
// - Build begin game state no cards dealt to the players and no card in the discard pile
// clear player arrays
// reset deck array to []
// call the begin game protect card overlay from CSS with start and rules button

//================================================//
//==========Build the cards and the deck==========//
//================================================//
// - class constructor for card generator - name and id
// 	- append individual rules to the parent class??
// - Build functions for the cards 
// 	-  exploding kitten (endgame/choice if defuse card available) - triggers engame state
// 	-  defuse kitten - if defuse card played add exploding kitten back into deck in random spot
// 	-  Attack - end turn without drawing card, oppsing player takes 2 turns
// 	-  Skip - immediately end your turn without drawing( need 2 skip cards to end attack since it's 2 turns)
// 	-  Shuffle - Shuffle deck (reorder deck cards remaining in random order)
// 	-  see the future - view top 3 cards in order

// 	-  The Deck of cards (needs to be a button when pressed draws a card and then gives option to end turn after viewing drawn card



//================================================//
//=================Game Logic=====================//
//================================================//
//See cards on DOM, show active players cards, hides non-active players cards

//Play card (1 per turn) on click removes from player array and adds to discard array.  Shows on top.
//-----play card - on click of a card remove from hand and place on discard pile then do action of card - not required function...can draw instead and end turn

//Draw card (or skip function depending on card played)=====ends turn
//-----Draw card / Adds deckArray[0] to active players hand and ends turn, blanks out page (pulls up protect cards overlay, swaps hands and puts button on screen for opposing payer to click to reveil cards,

//swap players (put up players turn page overlay)




//================================================//
//===================End Game=====================//
//================================================//
//If exploding kitten card is drawn, then pay defuse card, or game over
//show via exploding kitten giant card with button to defuse (if in players hand) or with end game button that declares winner by moving to game over overlay
// - Game over page overlay has restart button



// - Add in all the event listeners