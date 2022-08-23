// import ancients from "./assets/Ancients";
const ancientsList = document.querySelector('.ancientsContainer');

// const anc = ancients;

// console.log(ancients)
const links = 'links.json';
createAncientList();
async function createAncientList() {
    const res = await fetch(links);
    const data = await res.json();
    for (let i = 0; i < 4; i++) {
        const divItem = document.createElement('div');
        divItem.classList.add('ancCard');
        divItem.style.backgroundImage = data.ancients[i];
        console.log(data.ancients[i])
        ancientsList.append(divItem);
        divItem.addEventListener('click', ()=>{
            for (let k = 0; k < 4; k++) {
                const listChild = ancientsList.childNodes
                if (i === k) {console.log("ancients")
                    divItem.classList.add('ancCardSelect')
                }else{
                    listChild[k].style.display = "none"
                }
            }
        })
    }
}

function selectAncient(index) {
    const listChild = ancientsList.childNodes
    console.log(listChild)
    for (let i = 0; i < 4; i++) {
        if (i === index) {console.log("ancients")
            listChild[i].classList.add('ancCardSelect')
        }else{
            listChild[i].style.display = "none"
        }
    }
}