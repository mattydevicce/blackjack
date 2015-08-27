$(function(){
  function deckOfCards() {
    // This function just creates an initial deck
    // of 52 cards and returns the array of all cards
    var cards = [];
    for (var i = 0; i < 52; i++) {
      cards.push(i);
    };
    return cards;
  }

  function splitDeckToSuits(deck) {
    // This function will split the deck (array)
    // into 4 sections and assign each card
    // a suit and give it a number 0 through
    // 13 and return it as an array
    var deckSplitIntoArrayOfSuits = [];
    var deckJoinedWithSuits = [];
    var hearts    = [];
    var diamonds  = [];
    var spades    = [];
    var clubs     = [];

    deck.forEach(function(element) {
      suit = Math.floor(element / 13);
      switch (suit) {
        case 0:
          hearts.push(['heart', element%13]);
          break;     
        case 1:
          diamonds.push(['diamond', element%13]);
          break;
        case 2:
          spades.push(['spade', element%13]);
          break;
        case 3:
          clubs.push(['club', element%13]);
          break; 
      }
    })
    deckSplitIntoArrayOfSuits.push(hearts);
    deckSplitIntoArrayOfSuits.push(diamonds);
    deckSplitIntoArrayOfSuits.push(spades);
    deckSplitIntoArrayOfSuits.push(clubs);
    deckSplitIntoArrayOfSuits.map(function(element) {
      element.forEach(function(singleCard) {
        deckJoinedWithSuits.push(singleCard);
      })
    })
    // returns an array of arrays size of 2.. [[suit, number],[suit,number]]
    return deckJoinedWithSuits;
  }

  function shuffle(o){
    // This function will shuffle and array I  give it
    // AKA some cards
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
  }


  // Initialize an svg variable
  var svg = $("svg");

  function makeSvgSuit(suit,xcoord, ycoord, cardClass) {

    // This is what stack overflow said to do in order to make an svg work with
    // jquery and appendance
    var img = document.createElementNS('http://www.w3.org/2000/svg','image');
    img.setAttributeNS(null,'height','30');
    img.setAttributeNS(null,'width','30');
    img.setAttributeNS('http://www.w3.org/1999/xlink','href','./images/' + suit + '.png');
    img.setAttributeNS(null,'x', xcoord);
    img.setAttributeNS(null,'y', ycoord);
    img.setAttributeNS(null, 'visibility', 'visible');
    img.setAttributeNS(null, 'class', cardClass)
    return $('svg').append(img);
  }

  function makingTheSvg(singleCardArray, xcard, ycard, xnum1, ynum1, xsuit, ysuit, cardClass) {
    // This function will make the elements and tags of the svg and put them where
    // Chaning the card number to face value
    var card = singleCardArray[1] + 2;
    switch(card) {
      case 11:
        card = 'J';
        break;
      case 12:
        card = 'Q';
        break;
      case 13:
        card = 'K';
        break;
      case 14:
        card = 'A';
        break;
    }

    // SE
    var b = $('<rect class="' + cardClass + '-card" x=' + xcard + ' y=' + ycard + ' rx="5" ry="5" width="50" height="70" fill="#FFFFFF" stroke="#000000" stroke-width="4"/>');
    var c = $('<text class="' + cardClass + '-number" x=' + xnum1 + ' y=' + ynum1 + ' font-size="17" fill="black">' + card + '</text>');
    var d = $('<text x=' + (xnum1+28) + ' y=' + (ynum1 + 40) + ' font-size="17" fill="black">' + card + '</text>');
    console.log(b); 
    console.log(c); 
    console.log(d); 
    $('svg').append(b);
    $('svg').append(c);
    $('svg').append(d);
    makeSvgSuit(singleCardArray[0], xsuit, ysuit, cardClass);
  }
  
  function displayACard(card, coordinates, cardClass) {
    // card should be an object in the form of 
    // {card: [suit, number], xCoordCard: #,yCoordCard: #,
    //  xCoordNum: #, yCoordNum: #, xCoordSuit: #, yCoordSuit: #}
    var xCoordCard    = coordinates['xCoordCard'];
    var yCoordCard    = coordinates['yCoordCard'];
    var xCoordNumber1 = coordinates['xCoordNum'];
    var yCoordNumber1 = coordinates['yCoordNum'];
    var xCoordSuit    = coordinates['xCoordSuit'];
    var yCoordSuit    = coordinates['yCoordSuit'];
    makingTheSvg(card, xCoordCard, yCoordCard, xCoordNumber1, yCoordNumber1, xCoordSuit, yCoordSuit, cardClass);
  }

  function displayAButton(coords, text, id) {
    var buttonBackground = $('<rect id=' + id + ' x=' + coords['xCoordBG'] + ' y=' + coords['yCoordBG'] + ' rx="20" ry="20" width="50" height="50" fill="#FFFFFF" stroke="#000000" stroke-width="4"/>');
    var buttonText       = $('<text x=' + coords['xCoordText'] + ' y=' + coords['yCoordText'] + ' font-size="13" fill="black" stroke="#000000" stroke-width="1">' + text + '</text>');
    svg.append(buttonBackground);
    svg.append(buttonText);
  }

  function displayABlankCard(coordinates) {
    var xcard = coordinates['xCoordCard'];
    var ycard = coordinates['yCoordCard'];
    var b = $('<rect x=' + xcard + ' y=' + ycard + ' rx="5" ry="5" width="50" height="70" fill="#FFFFFF" stroke="#000000" stroke-width="4"/>');
    svg.append(b);
  }

  // Function doesnt work... probably because of something I missed...
  // function shiftTheCard(cardElement, numberElement, suitElement) {
  //   // This function is to take the last card played and return an object with
  //   // coordinates of a new card
  //   return {xCoordCard: (parseInt(cardElement.attr('x'))+60), cardX, yCoordCard: cardElement.attr('y'), xCoordNum: (parseInt(numberElement.attr('x'))+60),
  //           yCoordNum: parseInt(numberElement.attr('y')), xCoordSuit: (parseInt(suitElement.attr('x'))+60), yCoordSuit: parseInt(suitElement.attr('y'))};
  // }


  // Want to play a game?
  function playGame(newDeck) {

    var shoeDeck   = shuffle(splitDeckToSuits(newDeck))
    var playerDeck = [];
    var dealerDeck = [];
    

    // I would have made this dry but the mix of jQuery and svg do not mix well..
    var coordinates = {dealerCard1: {xCoordCard: 80,   yCoordCard: 25,  xCoordNum: 84,   yCoordNum: 45,  xCoordSuit: 90,   yCoordSuit: 45},
                       dealerCard2: {xCoordCard: 140,  yCoordCard: 25,  xCoordNum: 144,  yCoordNum: 45,  xCoordSuit: 150,  yCoordSuit: 45},
                       dealerCard3: {xCoordCard: 200,  yCoordCard: 25,  xCoordNum: 204,  yCoordNum: 45,  xCoordSuit: 210,  yCoordSuit: 45},
                       dealerCard4: {xCoordCard: 260,  yCoordCard: 25,  xCoordNum: 264,  yCoordNum: 45,  xCoordSuit: 270,  yCoordSuit: 45},
                       dealerCard5: {xCoordCard: 320,  yCoordCard: 25,  xCoordNum: 324,  yCoordNum: 45,  xCoordSuit: 330,  yCoordSuit: 45},
                       playerCard1: {xCoordCard: 80,   yCoordCard: 160, xCoordNum: 84,   yCoordNum: 180, xCoordSuit: 90,   yCoordSuit: 180},
                       playerCard2: {xCoordCard: 140,  yCoordCard: 160, xCoordNum: 144,  yCoordNum: 180, xCoordSuit: 150,  yCoordSuit: 180},
                       playerCard3: {xCoordCard: 200,  yCoordCard: 160, xCoordNum: 204,  yCoordNum: 180, xCoordSuit: 210,  yCoordSuit: 180},
                       playerCard4: {xCoordCard: 260,  yCoordCard: 160, xCoordNum: 264,  yCoordNum: 180, xCoordSuit: 270,  yCoordSuit: 180},
                       playerCard5: {xCoordCard: 320,  yCoordCard: 160, xCoordNum: 324,  yCoordNum: 180, xCoordSuit: 330,  yCoordSuit: 180},
                       hitMe:       {xCoordBG: 70,  yCoordBG:  280, xCoordText: 77,  yCoordText: 308},
                       stay:        {xCoordBG: 150, yCoordBG:  280, xCoordText: 163, yCoordText: 308}};


    // Putting cards in hands and displaying them
    var playerCardDealt1 = shoeDeck.pop();
    displayACard(playerCardDealt1, coordinates['playerCard1'], 'player');
    
    var dealerCardDealt1 = shoeDeck.pop();
    displayACard(dealerCardDealt1, coordinates['dealerCard1'], 'dealer');    

    var playerCardDealt2 = shoeDeck.pop();
    displayACard(playerCardDealt2, coordinates['playerCard2'], 'player');
    
    var dealerCardDealt2 = shoeDeck.pop();
    displayABlankCard(coordinates['dealerCard2'], 'dealer');  

    var displayButton = displayAButton(coordinates['hitMe'], 'Hit me', 'hit');
    var displayButton = displayAButton(coordinates['stay'], 'Stay', 'stay')

    playerDeck.push(playerCardDealt1);
    playerDeck.push(playerCardDealt2);
    dealerDeck.push(dealerCardDealt1);
    dealerDeck.push(dealerCardDealt2);

    // Need to update the graphics which this function will do so I can incorporate
    // clicks on the buttons

    $("#cont").html($("#cont").html());
    var hitMe = $("#hit");
    var stay  = $("#stay");

    var cardToDeal = 3;
    hitMe.on("click", function() {
      var cardToDealString = 'playerCard' + cardToDeal.toString();
      var playerCardDealHit = shoeDeck.pop();
      console.log(cardToDealString)
      cardToDeal += 1;
      // var numberOfCardsPlayed = document.getElementsByClassName("player-card").length;
      // var lastCardLayed   = $(".player-card").last();
      // var lastSuitLayed   = $(".player").last();
      // var lastNumberLayed = document.getElementsByClassName("player-number");

      displayACard(playerCardDealHit, coordinates[cardToDealString], 'player');
    })
  }

  playGame(deckOfCards());


})