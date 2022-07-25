let cardsArr = ["Spade", "Club", "Dimond", "Heart"];
let allCards = [];
let player1Array = [];
let player2Array = [];
let p1Result = 0;
let p2Result = 0;
SavedCard = 0;
cardsLeft = 52;
function fillCards() {
  let counter = 1;
  while (counter <= 52) {
    let rndNum = Math.floor(Math.random() * 13 + 1);
    let rndKind = cardsArr[Math.floor(Math.random() * 4)];
    let newCard = {
      number: rndNum,
      kind: rndKind,
    };
    const found = allCards.find(
      (element) => element.number === rndNum && element.kind == rndKind
    );
    if (found == undefined) {
      allCards.push(newCard);
      counter++;
    }
  }
}

function getCard(arr) {
  let randomNum = Math.floor(Math.random() * (arr.length - 1));
  randomCard = arr[randomNum];
  arr.splice(randomNum, 1);
  return randomCard;
}

function create3CardsContainer() {
  let threeCardsContainer = document.createElement("div");
  threeCardsContainer.id = "equalContainer";

  let p1_3CardsContainer = document.createElement("div");
  let p2_3CardsContainer = document.createElement("div");
  document.body.appendChild(threeCardsContainer);
  threeCardsContainer.className = "Cards3Container";
  p1_3CardsContainer.className = "Cards3";
  p2_3CardsContainer.className = "Cards3";
  threeCardsContainer.appendChild(p1_3CardsContainer);
  threeCardsContainer.appendChild(p2_3CardsContainer);
  return [p1_3CardsContainer, p2_3CardsContainer];
}
function create3Cards() {
  let playerSection = create3CardsContainer();
  let cardInfo;
  let cardInfo1;
  let the6Cards = [];
  // let cardInfo2;
  for (j = 0; j < 2; j++) {
    for (let i = 1; i < 4; i++) {
      let cardImg = document.createElement("div");
      cardImg.style.position = "relative";
      cardInfo = getCard(allCards);
      the6Cards.push(cardInfo);
      playerSection[j].appendChild(cardImg);
      cardImg.innerHTML = `<img src="/images/${cardInfo.kind}/${cardInfo.number}.png" height="200px" width="150px">`;
      if (i > 1) cardImg.style.marginLeft = "-120px";
      cardImg.style.marginTop = `${i * 20 + 30}px`;
      cardImg.style.left = "150px";
      if (j == 0 && i == 3) cardInfo1 = cardInfo;
    }
  }
  return { p1UpCard: cardInfo1, p2UpCard: cardInfo, sixCards: the6Cards };
}

function p1Win(p1Card, p2Card) {
  if (cardsLeft != 0) {
    cardsLeft -= 2;
    p1Result += 2;
  } else {
    p1Result += 1;
    p2Result -= 1;
  }
  document.getElementById("p1Result").innerHTML = p1Result;
  document.getElementById("p2Result").innerHTML = p2Result;
  player1Array.push(p1Card, p2Card);
  myMove("p1");
  document.getElementById("CardsLeft").innerText = `Cards: ${cardsLeft}`;
}
function p2Win(p1Card, p2Card) {
  if (cardsLeft != 0) {
    cardsLeft -= 2;
    p2Result += 2;
  } else {
    p2Result += 1;
    p1Result -= 1;
  }
  document.getElementById("p1Result").innerHTML = p1Result;
  document.getElementById("p2Result").innerHTML = p2Result;
  player2Array.push(p1Card, p2Card);
  myMove("p2");
  document.getElementById("CardsLeft").innerText = `Cards: ${cardsLeft}`;
}
function isEqual(p1Card, p2Card) {
  const equalObj = create3Cards();
  if (equalObj.p1UpCard.number == equalObj.p2UpCard.number) {
    allCards.push(p1Card, p2Card);
    console.log("is equal!!");
    return;
  } else if (equalObj.p1UpCard.number > equalObj.p2UpCard.number) {
    player1Array.push(p1Card, p2Card, equalObj.sixCards);
    myMove("p1");
    p1Result += 8;
    // cardsLeft = 0 ? (p2Result -= 4) : (cardsLeft -= 8);

    document.getElementById("p1Result").innerHTML = p1Result;
    document.getElementById("p2Result").innerHTML = p2Result;
  } else {
    player2Array.push(p1Card, p2Card, equalObj.sixCards);
    myMove("p2");

    p2Result += 8;
    document.getElementById("p2Result").innerHTML = p2Result;
    document.getElementById("p1Result").innerHTML = p1Result;
  }
  cardsLeft -= 8;
  document.getElementById("CardsLeft").innerText = `Cards: ${cardsLeft}`;
}
function getWinner(p1Card, p2Card) {
  setTimeout(function () {
    if (p1Card.number > p2Card.number) p1Win(p1Card, p2Card);
    else if (p1Card.number < p2Card.number) p2Win(p1Card, p2Card);
    else isEqual(p1Card, p2Card);

    randomCard1 = null;
    randomCard2 = null;
    if (p1Result == 52) alert("Mahmod is the winner");
    else if (p2Result == 52) alert("Nimrod is the winner");
  }, 1000);
}

function myMove(player) {
  let cardsContainer = document.getElementById("cardsContainer");
  // let equalContainer = document.getElementById("equalContainer");
  let pos = cardsContainer.getBoundingClientRect().top;
  // let posEqual = equalContainer.getBoundingClientRect().top;
  cardsContainer.style.position = "absolute";
  // equalContainer.style.position = "absolute";
  if (player == "p2") {
    let id = setInterval(frame, 10);
    function frame() {
      if (pos > 500) {
        cardsContainer.style.position = "static";
        // equalContainer.style.position = "static";
        document.getElementById("p1Card").innerHTML = "";
        document.getElementById("p2Card").innerHTML = "";
        // document.getElementById("equalContainer").innerHTML = "";
        clearInterval(id);
      } else {
        pos = pos + 5;
        posEqual = pos + 5;
        cardsContainer.style.top = pos + "px";
        // equalContainer.style.top = posEqual + "px";
      }
    }
  } else {
    let id = setInterval(frame, 10);
    function frame() {
      if (pos < 100) {
        cardsContainer.style.position = "static";
        // equalContainer.style.position = "static";

        document.getElementById("p1Card").innerHTML = "";
        document.getElementById("p2Card").innerHTML = "";
        // document.getElementById("equalContainer").innerHTML = "";

        clearInterval(id);
      } else {
        pos = pos - 5;
        posEqual = pos - 5;
        cardsContainer.style.top = pos + "px";
        // equalContainer.style.top = posEqual + "px";
      }
    }
  }
}
