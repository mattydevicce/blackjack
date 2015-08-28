$(function(){
  var totalScore = [0,0];
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

  function makeSvgCard(xcoord, ycoord, cardClass) {
    var rect = document.createElementNS('http://www.w3.org/2000/svg','rect');
    rect.setAttributeNS(null,'height','70');
    rect.setAttributeNS(null,'width','50');
    rect.setAttributeNS(null,'x', xcoord);
    rect.setAttributeNS(null,'y', ycoord);
    rect.setAttributeNS(null, 'rx', '5');
    rect.setAttributeNS(null, 'ry', '5');
    rect.setAttributeNS(null, 'fill', '#FFFFFF');
    rect.setAttributeNS(null, 'stroke', '#000000');
    rect.setAttributeNS(null, 'stroke-width', '4');
    rect.setAttributeNS(null, 'visibility', 'visible');
    rect.setAttributeNS(null, 'class', cardClass + '-card')
    return $('svg').append(rect);
  }

  function makeSvgNumber(number, xcoord, ycoord, cardClass) {
    var num = document.createElementNS('http://www.w3.org/2000/svg','text');
    num.textContent = number;
    num.setAttributeNS(null, 'class', cardClass + '-number');
    num.setAttributeNS(null, 'x', xcoord);
    num.setAttributeNS(null, 'y', ycoord);
    num.setAttributeNS(null, 'font-size', '17');
    num.setAttributeNS(null, 'fill', 'black');
    num.setAttributeNS(null, 'visibility', 'visible');

    return $('svg').append(num);
  }

  function makingTheSvg(singleCardArray, xcard, ycard, xnum, ynum, xsuit, ysuit, cardClass) {
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

    makeSvgCard(xcard,ycard,cardClass);
    makeSvgNumber(card, xnum, ynum, cardClass);
    makeSvgNumber(card, xnum+28, ynum+40, cardClass);
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

  function displayScore(cardArray, coords, scoreClass) {
    var totalScore = getScore(cardArray);

    var s = document.createElementNS('http://www.w3.org/2000/svg','text');
    s.textContent = totalScore;
    s.setAttributeNS(null, 'class', scoreClass);
    s.setAttributeNS(null, 'x', coords['xCoord']);
    s.setAttributeNS(null, 'y', coords['yCoord']);
    s.setAttributeNS(null, 'font-size', '32');
    s.setAttributeNS(null, 'fill', 'black');
    s.setAttributeNS(null, 'visibility', 'visible');

    return $('svg').append(s);
  }

  function getScore(cardArray) {
    var total = 0;
    var cardNumbers = [];
    cardArray.forEach(function(element) {
      cardNumbers.push(element[1]);
    })
    cardNumbers.sort(function(a, b){return a-b})
    cardNumbers.forEach(function(element) {
      var cardWorth = element + 2;
      if ( cardWorth > 10 && cardWorth < 14) {
        cardWorth = 10;
      } else if (cardWorth == 14) {
        if ((11 + total) > 21) {
          cardWorth = 1;
        } else {
          cardWorth = 11;
        }
      }
      total += cardWorth;
    })
    return total
  }

  function getWinner(winner, playerScore, dealerScore) {
    var score = [];
    if (winner != '') {
      alert(winner);
      return
    } else if (playerScore > 21) {
      alert("Player busts.. dealer wins");
      score.push(0);
      score.push(1);
    } else if (dealerScore > 21) {
      alert("Dealer busts.. player wins");
      score.push(1);
      score.push(0);
    }
    else if (playerScore > dealerScore) {
      alert("Player wins with " + playerScore);
      score.push(1);
      score.push(0);
    } else if (dealerScore > playerScore) {
      alert("Dealer wins with " + dealerScore);
      score.push(0);
      score.push(1);
    } else {
      alert("Tie game with " + playerScore + " all around");
      return
    }
    return score
  }

  function playBlackjackForDealer(shoe, cards, coords){
    
    var currentScore = getScore(cards);
    // Updates the score of the dealer
    document.getElementsByClassName("dealer-score")[0].childNodes[0].nodeValue = currentScore;

    // Need to get the coordinates of the previous card...
    var currentCard = 'dealerCard' + (cards.length+1).toString();
    var previousCard = 'dealerCard' + (cards.length).toString();
    var previousCardCoordinates = coords[previousCard]
    var currentCardCoordinates = {};
    for(key in previousCardCoordinates) {
      if (key[0] == 'x') {
        currentCardCoordinates[key] = previousCardCoordinates[key] + 60;
      } else {
        currentCardCoordinates[key] = previousCardCoordinates[key];
      }
    }
    coords[currentCard] = currentCardCoordinates;
    

    if (currentScore > 21) {
      console.log('dealer busts');
      return
    } else if (currentScore >= 17) {
      console.log("Dealer score is " + currentScore)
      return
    } else {
      newCard = shoe.pop();
      displayACard(newCard, coords[currentCard], 'dealer')
      cards.push(newCard);
      document.getElementsByClassName("dealer-score")[0].childNodes[0].nodeValue = getScore(cards);
      playBlackjackForDealer(shoe, cards, coords);
    }
    return true
  }
  // Want to play a game?
  function playGame(newDeck) {
    startGameButton.off("click");
    // Initialize variables
    var shoeDeck   = shuffle(newDeck)
    var playerDeck = [];
    var dealerDeck = [];
    var bust = false;
    var stay = false;
    var blackjackPlayer = false;
    var blackjackDealer = false;
    var gameOver = false;
    var winner = '';
    var playerScore = 0;
    var dealerScore = 0;

    if (document.getElementsByClassName("dealer-score")[0]) {
      document.getElementsByClassName("dealer-score")[0].remove();
    };
    if (document.getElementsByClassName("player-score")[0]) {
      document.getElementsByClassName("player-score")[0].remove();
    };
    if (document.getElementsByClassName("player-card")) {
      var bs =  document.getElementsByClassName("player-card")[0]
    }

    // I would have made this dry but the mix of jQuery and svg do not mix well..
    var coordinates = {dealerCard1: {xCoordCard: 80,   yCoordCard: 25,  xCoordNum: 84,   yCoordNum: 45,  xCoordSuit: 90,   yCoordSuit: 45},
                       dealerCard2: {xCoordCard: 140,  yCoordCard: 25,  xCoordNum: 144,  yCoordNum: 45,  xCoordSuit: 150,  yCoordSuit: 45},
                       playerCard1: {xCoordCard: 80,   yCoordCard: 160, xCoordNum: 84,   yCoordNum: 180, xCoordSuit: 90,   yCoordSuit: 180},
                       playerCard2: {xCoordCard: 140,  yCoordCard: 160, xCoordNum: 144,  yCoordNum: 180, xCoordSuit: 150,  yCoordSuit: 180},
                       hitMe:       {xCoordBG: 70,  yCoordBG:  280, xCoordText: 77,  yCoordText: 308},
                       stay:        {xCoordBG: 150, yCoordBG:  280, xCoordText: 163, yCoordText: 308},
                       playerScoordinates: {xCoord: 20,  yCoord: 210},
                       dealerScoordinates: {xCoord: 20,  yCoord: 70},
                       newGameCoordinates: {xCoord: 220, yCoord: 280, xCoordText: 230, yCoordText: 308}};


    // Putting cards in hands and displaying them
    var playerCardDealt1 = shoeDeck.pop();
    displayACard(playerCardDealt1, coordinates['playerCard1'], 'player');
    
    var dealerCardDealt1 = shoeDeck.pop();
    displayACard(dealerCardDealt1, coordinates['dealerCard1'], 'dealer');    

    var playerCardDealt2 = shoeDeck.pop();
    displayACard(playerCardDealt2, coordinates['playerCard2'], 'player');
    
    var dealerCardDealt2 = shoeDeck.pop();

    displayAButton(coordinates['hitMe'], 'Hit me', 'hit');
    displayAButton(coordinates['stay'], 'Stay', 'stay')

    playerDeck.push(playerCardDealt1);
    playerDeck.push(playerCardDealt2);
    dealerDeck.push(dealerCardDealt1);

    displayScore(playerDeck, coordinates['playerScoordinates'], 'player-score');
    displayScore(dealerDeck, coordinates['dealerScoordinates'], 'dealer-score');
    // Going to check if anyone got blackjack on the deal
    dealerDeck.push(dealerCardDealt2);
    if (getScore(dealerDeck) == 21 && getScore(playerDeck) == 21){
      winner = 'blackjack all around... tie';
      blackjackDealer = true;
      blackjackPlayer = true;
      gameOver = true;
      displayACard(dealerCardDealt2, coordinates['dealerCard2'], 'dealer');
      getWinner(winner);
    } else if (getScore(dealerDeck) == 21) {
      winner ='Blackjack for dealer, dealer wins';
      blackjackDealer = true;
      gameOver = true;
      displayACard(dealerCardDealt2, coordinates['dealerCard2'], 'dealer');
      getWinner(winner);          
    } else if (getScore(playerDeck) == 21) {
      winner = 'Blackjack for player, player wins';
      blackjackPlayer = true;
      gameOver = true;
      displayACard(dealerCardDealt2, coordinates['dealerCard2'], 'dealer'); 
      getWinner(winner);              
    } else {
      dealerDeck.pop();
      displayABlankCard(coordinates['dealerCard2'], 'dealer');  
    }

    $("#cont").html($("#cont").html());

    var hitMeButton = $("#hit");
    var stayButton  = $("#stay");    

    // Hit me actions
    hitMeButton.on("click",function(){
      // else update coordinates object with new card and display it
      var playerCardDealHit = shoeDeck.pop();
      playerDeck.push(playerCardDealHit);
      var currentPlayerCard = 'playerCard' + (playerDeck.length).toString();
      var previousPlayerCard = 'playerCard' + (playerDeck.length-1).toString();
      var previousPlayerCardCoordinates = coordinates[previousPlayerCard]
      var currentPlayerCardCoordinates = {};
      
      // This is just so you can have infinite cards and it will append the next
      // one nicely untill the canvas is filled... so we can increase the size
      // of the canvas
      for(key in previousPlayerCardCoordinates) {
        if (key[0] == 'x') {
          currentPlayerCardCoordinates[key] = previousPlayerCardCoordinates[key] + 60;
        } else {
          currentPlayerCardCoordinates[key] = previousPlayerCardCoordinates[key];
        }
      }
      coordinates[currentPlayerCard] = currentPlayerCardCoordinates;
      displayACard(playerCardDealHit, coordinates[currentPlayerCard], 'player');
      // end the display scaling

      document.getElementsByClassName("player-score")[0].childNodes[0].nodeValue = getScore(playerDeck);
      if ( getScore(playerDeck) == 21) {
        // If the initial deal is already 21.. make it so buttons dont work
        playerDeck.push(playerCardDealt2);
        displayACard(dealerCardDealt2, coordinates['dealerCard2'], 'dealer');
        hitMeButton.off("click");
        stayButton.off("click");
        playBlackjackForDealer(shoeDeck, dealerDeck, coordinates);       
      } 
      if (getScore(playerDeck) > 21) {
        bust = true;
        winner = 'Player busts, computer wins'
        dealerDeck.push(dealerCardDealt2);
        displayACard(dealerCardDealt2, coordinates['dealerCard2'], 'dealer');
        document.getElementsByClassName("dealer-score")[0].childNodes[0].nodeValue = getScore(dealerDeck);
        hitMeButton.off("click");
        stayButton.off("click");
        gameOver = true;
        getWinner(winner, getScore(playerDeck), getScore(dealerDeck));
      }
    })

    stayButton.on("click", function() {     
      stay = true;
      dealerDeck.push(dealerCardDealt2);
      displayACard(dealerCardDealt2, coordinates['dealerCard2'], 'dealer'); 
      playBlackjackForDealer(shoeDeck, dealerDeck, coordinates);
      gameOver = true;
      stayButton.off("click");
      hitMeButton.off("click");
      getWinner(winner, getScore(playerDeck), getScore(dealerDeck));
    })

    if (gameOver) {
      hitMeButton.off("click");
      stayButton.off("click");
      document.getElementsByClassName("dealer-score")[0].childNodes[0].nodeValue = getScore(dealerDeck);      
      getWinner(winner, getScore(playerDeck), getScore(dealerDeck));
    }
    $("cont").on("click", function() {
      alert("game over")
    })

  }
  // I need a start the game button.. maybe using jqueery
  startGameButton = $("<div id='start-game-button'></div>");
  startGameText   = $("<div id='start-game-text'>Start Game</div>");
  startGameButton.append(startGameText);
  $(".title").append(startGameButton);
  // $("body").html($("body").html());
  startGameButton.on("click", function(event) {
    playGame(splitDeckToSuits(deckOfCards()));
  })

})