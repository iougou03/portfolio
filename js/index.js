import AppHighlight from "./components/app-highlight.js";
import AppMacImage from "./components/app-mac-image.js";
import { AppSkill, AppSkillContainer} from "./components/app-skill.js";
import { AppProject, AppProjectContainer} from "./components/app-project.js";
import {
  setUnderbarPosition,
  setPercent,
  setUnderbarPoint,
  handleItemClick,
  setMobileNavbar
} from "./utils/navbar.js";
import ObserverFadeInOut from "./utils/ObserverFadeInOut.js";
import scrollFadeInOut from "./utils/scrollFadeInOut.js";
import AppBurgerIcon from "./components/app-burger-icon.js";

let scrollRatio = 0;
let totalHeight = 0;

const sectionPoint = [
  { key: "intro", sumHeight: 0 },
  { key: "about", sumHeight: 0 },
  { key: "motivation", sumHeight: 0 },
  { key: "works", sumHeight: 0 },
  { key: "goal", sumHeight: 0 },
  { key: "fphrase", sumHeight: 0 },
];

const scrollScreenHeight = {
  intro:"250vh"
}

function setSectionPoint() {
  let sum = 0;
  for (let i = 0; i < sectionPoint.length; i++) {
    const height = document.getElementById(sectionPoint[i].key).offsetHeight;
    sum += height;
    sectionPoint[i].sumHeight = sum;
  }
}

function setTotalHeight() {
  totalHeight = document.body.offsetHeight - window.innerHeight;
}
function setScrollRatio() {
  scrollRatio = Math.round((window.scrollY / totalHeight) * 100);
}

function handleResize() {
  setTotalHeight();
  setSectionPoint();
  setMobileNavbar();
}

const introHeaderContainer = document.querySelector(".intro--header-container > .scroll-fade-in-out");

function setScrollFadeDiv(){
  document.querySelectorAll(".scroll-fade-in-out").forEach(elem=>{
    elem.style.display = "block";
    elem.style.transform="translateY(-15px)";
  });
  
}
function setScrollScreenHeight(){
  for(const id in scrollScreenHeight){
    document.getElementById(id).style.height = scrollScreenHeight[id]
  }
}

function handleScroll() {
  setScrollRatio();
  // setting from navbar
  setUnderbarPosition();
  setPercent();
  
  scrollFadeInOut(window.scrollY, 100, sectionPoint[0].sumHeight - window.innerHeight, introHeaderContainer);
}

// define web components
function setComponents() {
  customElements.define("app-highlight", AppHighlight);
  customElements.define("app-mac-image", AppMacImage);
  customElements.define("app-skill", AppSkill);
  customElements.define("app-skill-container", AppSkillContainer);
  customElements.define("app-project", AppProject);
  customElements.define("app-project-container", AppProjectContainer);
  customElements.define("app-burger-icon", AppBurgerIcon);
}

// define fade in out DOMs
function setFadeAnimation(){
  // about
  const aboutHeaderContainer = document.querySelector(".about--header-container");
  const aboutInfoContainer = document.querySelector(".about--info-container");
  const aboutQuestionContainer = document.querySelector(".about--question-container")
  // motivation
  const motivationHeaderContainer = document.querySelector(".motivation--header-container");
  const motivationTextContainer = document.querySelector(".motivation--text-container")
  // works
  const worksHeaderContainer = document.querySelector(".works--header-container")
  const worksSkillsContainer = document.querySelector(".works--skills-container");
  const worksProjectsContainer = document.querySelector(".works--projects-container");
  // goal
  const goalHeaderContainer = document.querySelector(".goal--header-container");
  const goalTextField = document.querySelector(".goal--text-field");
  // fphrase 
  const fphraseContainer = document.querySelector(".fphrase--container");

  const elementList = [
    aboutHeaderContainer,
    aboutInfoContainer,
    aboutQuestionContainer,
    motivationHeaderContainer,
    motivationTextContainer,
    worksHeaderContainer,
    worksSkillsContainer,
    worksProjectsContainer,
    goalHeaderContainer,
    goalTextField,
    fphraseContainer
  ]

  const introHero = document.querySelector(".intro--hero");
  new ObserverFadeInOut("fadeIn",elementList);
  new ObserverFadeInOut("fadeInOut",[introHero]);
}

(() => {
  setScrollScreenHeight()

  setComponents();
  // setting from navbar
  handleItemClick();
  // setting for animation
  setFadeAnimation();
  // set scroll DOM to block (to prevent the DOM appear shortly when relaod)
  setScrollFadeDiv();
  
  document.body.onload = () => {
    handleResize();
    handleScroll();
    setSectionPoint();
    // setting from navbar
    setUnderbarPoint();
    setUnderbarPosition();

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
  };
})();

export { scrollRatio, sectionPoint };
