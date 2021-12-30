import { scrollRatio, sectionPoint } from "../index.js";

const itemList = document.querySelector(".nav-item-list");
const underbar = document.querySelector(".nav-underbar");
const iconComponent = document.querySelector("app-burger-icon");
const navItemContainer = document.querySelector(".nav-item-container");
const itemMarginRightPC = 20;
const itemMarginRightMobile = 16;
const mobilewidth = 780;

let idx = 0;
let isMobile = false;
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
  if(mobilewidth < window.innerWidth){
    let width = 0; // margin-right 1rem

    for(let i = 0 ; i < underbarPoint.length - 1 ; i++){
      width += itemList.children[i].offsetWidth;
      underbarPoint[i + 1] = width;
    }

    // since we need diffrent position on each mode(pc, mobile) 
    // we should set styles in javascript which have higher priorty 
    // than css. 
    underbar.style.top = "unset";
    underbar.style.right = "unset";
    underbar.style.bottom = "-2px";
    underbar.style.height = "2px";
    isMobile = false
  }
  else{
    let height = 0; // margin-right 1rem
    
    for(let i = 0 ; i < underbarPoint.length - 1 ; i++){
      height += itemList.children[i].offsetHeight;
      underbarPoint[i + 1] = height;
    }

    underbar.style.right = "9px";
    underbar.style.bottom = " unset";
    underbar.style.left = " unset";
    underbar.style.width = "2px";
    isMobile = true;
  }
  
  setUnderbarStyles();
  if(!isMobile){
    navItemContainer.classList.remove("active");
    if(iconComponent.isClicked) iconComponent.click();
  }
}

function setUnderbarPosition(){
  for(let i = 0 ; i < sectionPoint.length ; i++){
    if(window.scrollY < sectionPoint[i].sumHeight - 10){
      idx = i;
      break;
    }
  }
  if (idx === navbarPosition) return;

  navbarPosition = idx;
  setUnderbarStyles();
}

function setUnderbarStyles(){
  if(!isMobile){
    let width = itemList.children[idx].offsetWidth;
    underbar.style.left = `${underbarPoint[idx] + width *0.1 + idx*itemMarginRightPC}px`;
    underbar.style.width = `${width *0.8}px`;
  }
  else {
    let height = itemList.children[idx].offsetHeight;
    underbar.style.top = `${underbarPoint[idx] + height *0.1 + (idx + 1)*itemMarginRightMobile}px`;
    underbar.style.height = `${height *0.8}px`;
  }
}

function setPercent(){
  const percent = document.querySelector(".nav-percent span")
  percent.innerHTML = scrollRatio;
}

function handleItemClick(){
  for(let i = 0 ; i < underbarPoint.length; i++){
    itemList.children[i].addEventListener("click",()=>{
      document.getElementById(sectionPoint[i].key).scrollIntoView();
    })
  }
}

function setMobileNavbar(){
  iconComponent.addEventListener("mousedown",()=>{
    console.log(iconComponent.isClicked)
    if(isMobile){
      if(iconComponent.isClicked) navItemContainer.classList.remove("active");
      else navItemContainer.classList.add("active");
    } 
  })
}

export {
  setUnderbarPosition,
  setPercent,
  setUnderbarPoint,
  handleItemClick,
  setMobileNavbar,
  isMobile,
}
