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
          hearts.push('h' + element%13);
          break;     
        case 1:
          diamonds.push('d' + element%13);
          break;
        case 2:
          spades.push('s' + element%13);
          break;
        case 3:
          clubs.push('c' + element%13);
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
    return deckJoinedWithSuits;
  }

  function shuffle(o){
    // This function will shuffle and array I  give it
    // AKA some cards
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
  }

  // Make an initial deck of cards
  var deck = deckOfCards();
  
  // Split the deck into suits
  var deckSplitToSuits = splitDeckToSuits(deck);
  console.log(deckSplitToSuits);
  
  // Shuffle each suit up
  var shuffledDeck = shuffle(deckSplitToSuits);
  console.log(shuffledDeck);

  // Set up 3 decks, 1 shoe, 1 player, and 1 for the dealer
  var shoeDeck   = shuffledDeck;
  var playerDeck = [];
  var dealerDeck = [];
  var oneCard = shuffledDeck.pop();

  // Displaying the cards
  // Switch case to switch the suits
  var suit;
  switch(oneCard[0]) {
  case 'h':
    suit = 'heart';
    break;
  case 'd':
    suit = 'diamond';
    break;
  case 's':
    suit = 'spade';
    break;
  case 'c':
    suit = 'club';
    break;
  }
  var svg = $("svg");

  function makeSvgCard(card) {
    var img = document.createElementNS('http://www.w3.org/2000/svg','image');
    img.setAttributeNS(null,'height','536');
    img.setAttributeNS(null,'width','536');
    img.setAttributeNS('http://www.w3.org/1999/xlink','href','./images/heart.png');
    img.setAttributeNS(null,'x','10');
    img.setAttributeNS(null,'y','10');
    img.setAttributeNS(null, 'visibility', 'visible');
    return $('svg').append(img);
  }
  function makingTheSvg() {
    var b = $('<rect id="rect1" x="5" y="25" rx="5" ry="5" width="200" height="300" fill="#FFFFFF" stroke="#000000" stroke-width="4"/>');
    var c = $('<text id="number" x="10" y="75" font-size="55" fill="black">1</text>');
    var d = $('<text id="number" x="170" y="310" font-size="55" fill="black">1</text>');
    var e = $('<image class="suit" x="25" y="100" height="150" width="150"></image>');
    e.attr('xlink:href', "./images/"+ suit + ".png")
    svg.append(b);
    svg.append(c);
    svg.append(d);
    makeSvgCard();
  }

  var rect = $('<rect x="10" y="10" width="100" height="20" fill="#f80c12"></rect>');
  svg.append(rect);
  makingTheSvg();

  $("#cont").html($("#cont").html());
})