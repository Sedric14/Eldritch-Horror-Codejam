import deck from './deck.js';


// import ancients from "./assets/Ancients";
const ancientsList = document.querySelector('.ancientsContainer');
// const mainContainer = document.querySelector('main')
const buttonsLevel = document.querySelectorAll('.btnLevel')
const deckContainer = document.querySelector('.deckContainer')
// const anc = ancients;

// console.log(ancients)
const links = 'links.json';
let idAncient = {};
let level = "";
let deckArr = []

for (let it = 0; it < buttonsLevel.length; it++) {
    buttonsLevel[it].addEventListener('click', () => {
        if (idAncient !== {}) {
            level = buttonsLevel[it].innerHTML;
            buttonsLevel.forEach(elem => elem.style.color = "white")
            buttonsLevel[it].style.color = 'red'
            deckArr = buildCardDeck();
            createDeck();
        }
        else {
            alert("Выберите древнего")
         }
    })
}

createAncientList();
async function createAncientList() {
    const res = await fetch(links);
    const data = await res.json();
    for (let i = 0; i < 4; i++) {
        const divItem = document.createElement('div');
        divItem.classList.add('ancCard');
        
        divItem.style.backgroundImage = data.ancients[i].cardFace;
        
        ancientsList.append(divItem);
        divItem.addEventListener('click', ()=>{
            
            for (let k = 0; k < 4; k++) {
                const listChild = ancientsList.childNodes;
                
                if (i === k) {console.log("ancients")
                    divItem.classList.add('ancCardSelect')
                    idAncient = data.ancients[i];
                    ancientsList.style.height = "0px"
                }else{
                    let child =listChild[k]
                    child.style.display ="none"
                }
            }
        })
    }
    
}

function getRandomNum(num){
    const number = Math.floor(Math.random() * num);
  return number;
  }

function buildCardDeck(){
    let mydeck = deck
    let blueCards = idAncient.firstStage.blueCards + idAncient.secondStage.blueCards + idAncient.thirdStage.blueCards;
    let brownCards = idAncient.firstStage.brownCards + idAncient.secondStage.brownCards + idAncient.thirdStage.brownCards;
    let greenCards = idAncient.firstStage.greenCards + idAncient.secondStage.greenCards + idAncient.thirdStage.greenCards;

    let general = [[], [], []]

    switch (level) {
        case "Very Easy":
            if (blueCards > 4) {
                mydeck.blueCardsData[0].forEach(card => { general.push(card) })
                let n = (blueCards - 4);
                let bj = 4;
                for (let i = 0; i < n; i++) {
                    let c = getRandomNum(bj)
                    general[0].push(mydeck.blueCardsData[1][c]);
                    mydeck.blueCardsData[1].splice(c, 1)
                    bj--;
                }
            } else {
                let bj = 4;
                for (let i = 0; i < blueCards; i++) {
                    console.log('blC = ' + blueCards);
                    let c = getRandomNum(bj)
                    general[0].push(mydeck.blueCardsData[0][c]);
                    mydeck.blueCardsData[0].splice(c, 1)
                    bj--;
                }
            }

            if (brownCards > 5) {
                mydeck.brownCardsData[0].forEach(card => { general.push(card) })
                let n = (brownCards - 5);
                let hj = 11;
                for (let i = 0; i < n; i++) {
                    let c = getRandomNum(hj)
                    general[1].push(mydeck.brownCardsData[1][c]);
                    mydeck.brownCardsData[1].splice(c, 1)
                    hj--;
                }
            } else {
                let hj = 5
                for (let i = 0; i < brownCards; i++) {
                    let c = getRandomNum(hj)
                    general[1].push(mydeck.brownCardsData[0][c]);
                    mydeck.brownCardsData[0].splice(c, 1)
                    hj--;
                }
            }

            if (greenCards > 5) {
                mydeck.greenCardsData[0].forEach(card => { general.push(card) })
                let n = (greenCards - 5);
                let gj = 8;
                for (let i = 0; i < n; i++) {
                    let c = getRandomNum(gj)
                    general[2].push(mydeck.greenCardsData[1][c]);
                    mydeck.greenCardsData[1].splice(c, 1)
                    gj--;
                }
            } else {
                let gj = 5
                for (let i = 0; i < greenCards; i++) {
                    let c = getRandomNum(gj)
                    general[2].push(mydeck.greenCardsData[0][c]);
                    mydeck.greenCardsData[0].splice(c, 1)
                    gj--;
                }
            }
            break;

        case 'Easy':
            let blueArr = [...deck.blueCardsData[0], ...deck.blueCardsData[1]];
            let brownArr = [...deck.brownCardsData[0], ...deck.brownCardsData[1]];
            let greenArr = [...deck.greenCardsData[0], ...deck.greenCardsData[1]];
            let bj = blueArr.length;
            for (let i = 0; i < blueCards; i++) {
                let c = getRandomNum(bj)
                general[0].push(blueArr[c]);
                blueArr.splice(c, 1)
                bj--;
            }

            let hj = brownArr.length;
            for (let i = 0; i < brownCards; i++) {
                let c = getRandomNum(hj)
                general[1].push(brownArr[c]);
                brownArr.splice(c, 1)
                hj--;
            }

            let gj = greenArr.length;
            for (let i = 0; i < greenCards; i++) {
                let c = getRandomNum(gj)
                general[2].push(greenArr[c]);
                greenArr.splice(c, 1)
                gj--;
            }
            break;

        case "Normal":
            let blueArrNorm = [...deck.blueCardsData[0], ...deck.blueCardsData[1], ...deck.blueCardsData[2]];
            let brownArrNorm = [...deck.brownCardsData[0], ...deck.brownCardsData[1], ...deck.brownCardsData[2]];
            let greenArrNorm = [...deck.greenCardsData[0], ...deck.greenCardsData[1], ...deck.greenCardsData[2]];
            let bnj = blueArrNorm.length;
            for (let i = 0; i < blueCards; i++) {
                let c = getRandomNum(bnj)
                general[0].push(blueArrNorm[c]);
                blueArrNorm.splice(c, 1)
                bnj--;
            }

            let hnj = brownArrNorm.length;
            for (let i = 0; i < brownCards; i++) {
                let c = getRandomNum(hnj)
                general[1].push(brownArrNorm[c]);
                brownArrNorm.splice(c, 1)
                hnj--;
            }

            let gnj = greenArrNorm.length;
            for (let i = 0; i < greenCards; i++) {
                let c = getRandomNum(gnj)
                general[2].push(greenArrNorm[c]);
                greenArrNorm.splice(c, 1)
                gnj--;
            }
            break;

        case 'Hard':
            let blueArrHard = [...deck.blueCardsData[1], ...deck.blueCardsData[2]];
            let brownArrHard = [...deck.brownCardsData[1], ...deck.brownCardsData[2]];
            let greenArrHard = [...deck.greenCardsData[1], ...deck.greenCardsData[2]];
            let bhj = blueArrHard.length;
            for (let i = 0; i < blueCards; i++) {
                let c = getRandomNum(bhj)
                general[0].push(blueArrHard[c]);
                blueArrHard.splice(c, 1)
                bhj--;
            }

            let hhj = brownArrHard.length;
            for (let i = 0; i < brownCards; i++) {
                let c = getRandomNum(hhj)
                general[1].push(brownArrHard[c]);
                brownArrHard.splice(c, 1)
                hhj--;
            }

            let ghj = greenArrHard.length;
            for (let i = 0; i < greenCards; i++) {
                let c = getRandomNum(ghj)
                general[2].push(greenArrHard[c]);
                greenArrHard.splice(c, 1)
                ghj--;
            }
            break;

        case "Very Hard":
            if (blueCards > 4) {
                mydeck.blueCardsData[2].forEach(card => { general.push(card) })
                let n = (blueCards - 4);
                let bj = 4;
                for (let i = 0; i < n; i++) {
                    let c = getRandomNum(bj)
                    general[0].push(mydeck.blueCardsData[1][c]);
                    mydeck.blueCardsData[1].splice(c, 1)
                    bj--;
                }
            } else {
                let bj = 4;
                for (let i = 0; i < blueCards; i++) {
                    let c = getRandomNum(bj)
                    general[0].push(mydeck.blueCardsData[2][c]);
                    mydeck.blueCardsData[2].splice(c, 1)
                    bj--;
                }
            }

            if (brownCards > 5) {
                mydeck.brownCardsData[2].forEach(card => { general.push(card) })
                let n = (brownCards - 5);
                let hj = 11;
                for (let i = 0; i < n; i++) {
                    let c = getRandomNum(hj)
                    general[1].push(mydeck.brownCardsData[1][c]);
                    mydeck.brownCardsData[1].splice(c, 1)
                    hj--;
                }
            } else {
                let hj = 5
                for (let i = 0; i < brownCards; i++) {
                    let c = getRandomNum(hj)
                    general[1].push(mydeck.brownCardsData[2][c]);
                    mydeck.brownCardsData[2].splice(c, 1)
                    hj--;
                }
            }

            if (greenCards > 5) {
                mydeck.greenCardsData[2].forEach(card => { general.push(card) })
                let n = (greenCards - 5);
                let gj = 8;
                for (let i = 0; i < n; i++) {
                    let c = getRandomNum(gj)
                    general[2].push(mydeck.greenCardsData[1][c]);
                    mydeck.greenCardsData[1].splice(c, 1)
                    gj--;
                }
            } else {
                let gj = 5
                for (let i = 0; i < greenCards; i++) {
                    let c = getRandomNum(gj)
                    general[2].push(mydeck.greenCardsData[2][c]);
                    mydeck.greenCardsData[2].splice(c, 1)
                    gj--;
                }
            }
            break;
    }
    console.log(idAncient);
    console.log(general);
    let finalArr = [[], [], []];
    let first = idAncient.firstStage.blueCards;
    let second = idAncient.secondStage.blueCards;
    let third = idAncient.thirdStage.blueCards;
    general[0].forEach(el => {
       if (first !== 0){ 
         finalArr[0].push(el)
         first --;
    } else if(second!==0){
        finalArr[1].push(el)
        second --;
    }else{
        finalArr[2].push(el)
        third --;
    }
    })
    first = idAncient.firstStage.brownCards;
    second = idAncient.secondStage.brownCards;
    third = idAncient.thirdStage.brownCards;
    general[1].forEach(el => {
        if (first !== 0){ 
          finalArr[0].push(el)
          first --;
     } else if(second!==0){
         finalArr[1].push(el)
         second --;
     }else{
         finalArr[2].push(el)
         third --;
     }
     })
     first = idAncient.firstStage.greenCards;
    second = idAncient.secondStage.greenCards;
    third = idAncient.thirdStage.greenCards;
    general[2].forEach(el => {
        if (first !== 0){ 
          finalArr[0].push(el)
          first --;
     } else if(second!==0){
         finalArr[1].push(el)
         second --;
     }else{
         finalArr[2].push(el)
         third --;
     }
     })
     console.log(finalArr);
     return finalArr;
}

function createDeck(){
    let deckSum = deckArr[0].length + deckArr[1].length + deckArr[2].length;
    for (let i = 0; i < deckSum; i++) {
        const cardBack = document.createElement('div');
        cardBack.classList.add('cardsShirt');
        deckContainer.append(cardBack);
        cardBack.style.transform = "translate(" + (i*1.5) + "px, " + (-i*1.5) + "px)"
    }

}