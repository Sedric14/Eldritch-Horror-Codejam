import deck from './deck.js';

const ancientsList = document.querySelector('.ancientsContainer');
const buttonsLevel = document.querySelectorAll('.btnLevel')
const deckContainer = document.querySelector('.deckContainer')
const fsGreen = document.querySelector('.fsGreen');
const ssGreen = document.querySelector('.ssGreen');
const tsGreen = document.querySelector('.tsGreen');
const fsBlue = document.querySelector('.fsBlue');
const ssBlue = document.querySelector('.ssBlue');
const tsBlue = document.querySelector('.tsBlue');
const fsBrown = document.querySelector('.fsBrown');
const ssBrown = document.querySelector('.ssBrown');
const tsBrown = document.querySelector('.tsBrown');
const btnLevelHide = document.querySelector('.btnLevelHide');
const trecker = document.querySelector('.trecker');

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
            let anim3 = trecker.animate([{ opacity: 0 }, { opacity: 1 }], 2000)
            anim3.addEventListener('finish', function () { trecker.style.opacity = "1" })
        }
        btnLevelHide.style.zIndex = "1";
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
        divItem.addEventListener('click', () => {

            for (let k = 0; k < 4; k++) {
                const listChild = ancientsList.childNodes;

                if (i === k) {
                    divItem.classList.add('ancCardSelect')

                    let beforeLeft = divItem.offsetLeft;

                    let beforeTop = divItem.offsetTop;
                    let calcLeft = beforeLeft + 108 + (120 * i);
                    let animation = divItem.animate([
                        { left: 'calc(-50vw + ' + calcLeft + 'px)', top: 'calc(' + beforeTop + 'px + 130px' },
                        { left: "calc(-50vw + 120px)", top: "140px" }
                    ], 500);
                    animation.addEventListener('finish', function () {
                        divItem.style.left = 'calc(-50vw + 120px)';
                        divItem.style.top = '140px';
                    });

                    idAncient = data.ancients[i];
                    ancientsList.style.height = "0px"
                } else {
                    let child = listChild[k]
                    child.style.display = "none"
                }
            }
            btnLevelHide.style.zIndex = "-1"
        })
    }
}

function getRandomNum(num) {
    const number = Math.floor(Math.random() * num);
    return number;
}

function buildCardDeck() {
    let mydeck = deck
    let blueCards = idAncient.firstStage.blueCards + idAncient.secondStage.blueCards + idAncient.thirdStage.blueCards;
    let brownCards = idAncient.firstStage.brownCards + idAncient.secondStage.brownCards + idAncient.thirdStage.brownCards;
    let greenCards = idAncient.firstStage.greenCards + idAncient.secondStage.greenCards + idAncient.thirdStage.greenCards;

    let general = [[], [], []]

    switch (level) {
        case "Very Easy":
            if (blueCards > 4) {
                mydeck.blueCardsData[0].forEach(card => { general[0].push(card) })
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
                    general[0].push(mydeck.blueCardsData[0][c]);
                    mydeck.blueCardsData[0].splice(c, 1)
                    bj--;
                }
            }

            if (brownCards > 5) {
                mydeck.brownCardsData[0].forEach(card => { general[1].push(card) })
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
                mydeck.greenCardsData[0].forEach(card => { general[2].push(card) })
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
                mydeck.blueCardsData[2].forEach(card => { general[0].push(card) })
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
                for (let i = 0; i < 5; i++) {
                    general[1].push(mydeck.brownCardsData[2][i])
                }
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
                mydeck.greenCardsData[2].forEach(card => { general[2].push(card) })
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
    let finalArr = [[], [], []];
    let first = idAncient.firstStage.blueCards;
    let second = idAncient.secondStage.blueCards;
    let third = idAncient.thirdStage.blueCards;
    let lengthGeneral = general[0].length;
    for (let i = 0; i < lengthGeneral; i++) {
        let ind = getRandomNum(general[0].length)
        if (first !== 0) {
            finalArr[0].push(general[0][ind])
            general[0].splice(ind, 1)
            first--;
        } else if (second !== 0) {
            finalArr[1].push(general[0][ind])
            general[0].splice(ind, 1)
            second--;
        } else {
            finalArr[2].push(general[0][ind])
            general[0].splice(ind, 1)
            third--;
        }
    }
    first = idAncient.firstStage.brownCards;
    second = idAncient.secondStage.brownCards;
    third = idAncient.thirdStage.brownCards;
    lengthGeneral = general[1].length;
    for (let i = 0; i < lengthGeneral; i++) {
        let ind = getRandomNum(general[1].length)
        if (first !== 0) {
            finalArr[0].push(general[1][ind])
            general[1].splice(ind, 1)
            first--;
        } else if (second !== 0) {
            finalArr[1].push(general[1][ind])
            general[1].splice(ind, 1)
            second--;
        } else {
            finalArr[2].push(general[1][ind])
            general[1].splice(ind, 1)
            third--;
        }
    }
    first = idAncient.firstStage.greenCards;
    second = idAncient.secondStage.greenCards;
    third = idAncient.thirdStage.greenCards;
    lengthGeneral = general[2].length;
    for (let i = 0; i < lengthGeneral; i++) {
        let ind = getRandomNum(general[2].length)
        if (first !== 0) {
            finalArr[0].push(general[2][ind])
            general[2].splice(ind, 1)
            first--;
        } else if (second !== 0) {
            finalArr[1].push(general[2][ind])
            general[2].splice(ind, 1)
            second--;
        } else {
            finalArr[2].push(general[2][ind])
            general[2].splice(ind, 1)
            third--;
        }
    }
    return finalArr;
}

function createDeck() {
    let deckSum = deckArr[0].length + deckArr[1].length + deckArr[2].length;
    for (let i = 0; i < deckSum; i++) {
        setTimeout(function () {
            const cardBack = document.createElement('div');
            cardBack.classList.add('cardsShirt');
            deckContainer.append(cardBack);
            cardBack.style.backgroundImage = "url(./assets/mythicCardBackground.png)"
            cardBack.style.transform = "translate(" + (i * 1.5) + "px, " + (-i * 1.5) + "px) rotate(" + ((Math.random() * 4) - 2) + "deg)";
            cardBack.addEventListener('click', () => { layingOutCards(i) });
        }, 70 * (i + 1))

    }
    fsBlue.innerHTML = idAncient.firstStage.blueCards;
    ssBlue.innerHTML = idAncient.secondStage.blueCards;
    tsBlue.innerHTML = idAncient.thirdStage.blueCards;
    fsBrown.innerHTML = idAncient.firstStage.brownCards;
    ssBrown.innerHTML = idAncient.secondStage.brownCards;
    tsBrown.innerHTML = idAncient.thirdStage.brownCards;
    fsGreen.innerHTML = idAncient.firstStage.greenCards;
    ssGreen.innerHTML = idAncient.secondStage.greenCards;
    tsGreen.innerHTML = idAncient.thirdStage.greenCards;
}

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do { currentDate = Date.now(); } while (currentDate - date < milliseconds);
}

function layingOutCards(index) {
    let cardItems = deckContainer.childNodes;
    let rand = 0;
    let face = '';
    if (deckArr[0].length !== 0) {
        rand = getRandomNum(deckArr[0].length)
        face = deckArr[0][rand].cardFace
        if (deckArr[0][rand].color === 'blue') fsBlue.innerHTML = (fsBlue.innerHTML - 1);
        if (deckArr[0][rand].color === 'green') fsGreen.innerHTML = (fsGreen.innerHTML - 1);
        if (deckArr[0][rand].color === 'brown') fsBrown.innerHTML = (fsBrown.innerHTML - 1);
        deckArr[0].splice(rand, 1)
    } else if (deckArr[1].length !== 0) {
        rand = getRandomNum(deckArr[1].length)
        face = deckArr[1][rand].cardFace
        if (deckArr[1][rand].color === 'blue') ssBlue.innerHTML = (ssBlue.innerHTML - 1);
        if (deckArr[1][rand].color === 'green') ssGreen.innerHTML = (ssGreen.innerHTML - 1);
        if (deckArr[1][rand].color === 'brown') ssBrown.innerHTML = (ssBrown.innerHTML - 1);
        deckArr[1].splice(rand, 1)
    } else {
        rand = getRandomNum(deckArr[2].length)
        face = deckArr[2][rand].cardFace
        if (deckArr[2][rand].color === 'blue') tsBlue.innerHTML = (tsBlue.innerHTML - 1);
        if (deckArr[2][rand].color === 'green') tsGreen.innerHTML = (tsGreen.innerHTML - 1);
        if (deckArr[2][rand].color === 'brown') tsBrown.innerHTML = (tsBrown.innerHTML - 1);
        deckArr[2].splice(rand, 1)
    }
    // cardItems[index].style.backgroundImage = face
    let anim2 = cardItems[index].animate([
        { transform: 'translate(15px, 15px)', backgroundImage: 'url(./assets/mythicCardBackground.png)', offset: 0 },
        { transform: "translate(" + (-5 - (index * 1.75)) + "vw, 20vh) rotateY(30deg)", backgroundImage: 'url(./assets/mythicCardBackground.png)', offset: 0.4 },
        { transform: "translate(" + (-5 - (index * 1.75)) + "vw, 20vh) rotateY(90deg)", backgroundImage: 'url(./assets/mythicCardBackground.png)', offset: 0.5 },
        { transform: "translate(" + (-5 - (index * 1.75)) + "vw, 20vh) rotateY(90deg)", backgroundImage: face, offset: 0.5 },
        { transform: "translate(" + (-5 - (index * 1.75)) + "vw, 20vh) rotateY(30deg)", backgroundImage: face, offset: 0.6 },
        { transform: "translate(" + (-10 - (index * 3.5)) + "vw, 40vh) rotate(" + ((Math.random() * 4) - 2) + "deg)", backgroundImage: face, offset: 1 },
    ], { duration: 1000 });

    anim2.addEventListener('finish', function () {
        cardItems[index].style.transform = "translate(" + (-10 - (index * 3.5)) + "vw, 40vh) rotate(" + ((Math.random() * 4) - 2) + "deg)"
        cardItems[index].style.backgroundImage = face
        cardItems[index].style.zIndex = "" + (0 - index) + "";
    })
}