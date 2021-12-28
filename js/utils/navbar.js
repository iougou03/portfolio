import { scrollRatio, sectionPoint } from "../index.js";

const itemMarginRight = 20
const item = document.querySelector(".nav-item-container")
const underbar = document.querySelector(".nav-underbar");

let navbarPosition = 0;
let underbarPoint = [
  0, // "intro"
  0, // "about"
  0, // "motivation"
  0, // "works"
  0, // "goal"
  0, // "fphrase"
]

function setUnderbarPoint() {
  let width = 0; // margin-right 1rem

  for(let i = 0 ; i < underbarPoint.length - 1 ; i++){
    width += item.children[i].offsetWidth;
    underbarPoint[i + 1] = width;
  }

  underbar.style.width = `${item.children[0].offsetWidth}px`;
}

function setUnderbarPosition(){
  let idx = 0;
  for(let i = 0 ; i < sectionPoint.length ; i++){
    if(window.scrollY < sectionPoint[i].sumHeight){
      idx = i;
      break;
    }
  }
  if (idx === navbarPosition) return;

  navbarPosition = idx;
  let width = item.children[idx].offsetWidth;
  underbar.style.left = `${underbarPoint[idx] + width *0.1 + idx*itemMarginRight}px`;
  underbar.style.width = `${width *0.8}px`;
}

function setPercent(){
  const percent = document.querySelector(".nav-percent span")
  percent.innerHTML = scrollRatio;
}

function handleItemClick(){
  for(let i = 0 ; i < underbarPoint.length; i++){
    item.children[i].addEventListener("click",()=>{
      document.getElementById(sectionPoint[i].key).scrollIntoView();
    })
  }
}

export {
  setUnderbarPosition,
  setPercent,
  setUnderbarPoint,
  handleItemClick
}