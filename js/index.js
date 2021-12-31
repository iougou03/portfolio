import AppHighlight from "./components/app-highlight.js";
import AppMacImage from "./components/app-mac-image.js";
import { AppSkill, AppSkillContainer } from "./components/app-skill.js";
import { AppProject, AppProjectContainer } from "./components/app-project.js";
import {
  setUnderbarPosition,
  setPercent,
  setUnderbarPoint,
  handleItemClick,
  setMobileNavbar,
  isMobile
} from "./utils/navbar.js";
import ObserverFadeInOut from "./utils/observerFadeInOut.js";
import scrollFadeInOut from "./utils/scrollFadeInOut.js";
import AppBurgerIcon from "./components/app-burger-icon.js";
import scrollZoom from "./utils/scrollZoom.js";

let scrollRatio = 0;
let totalHeight = 0;
let windowWidth = 0;
let windowHeight = 0;


const sectionPoint = [
  { key: "intro", sumHeight: 0 },
  { key: "about", sumHeight: 0 },
  { key: "motivation", sumHeight: 0 },
  { key: "works", sumHeight: 0 },
  { key: "goal", sumHeight: 0 },
  { key: "fphrase", sumHeight: 0 },
];

const scrollScreenHeight = {
  "#intro": "280vh",
  ".works--top-container": "400vh",
};
// in index.js 99 lines, we can see that .works--text-container
// end the animation at 400vh(total height) - 300vh, so we should
// start graph animation at 200vh!
const worksGraph = document.querySelector(".works--graph");
const worksTopContainer = document.querySelector(".works--top-container")

function setSectionPoint() {
  let sum = 0;
  for (let i = 0; i < sectionPoint.length; i++) {
    const height = document.getElementById(sectionPoint[i].key).offsetHeight;
    sum += height;
    sectionPoint[i].sumHeight = sum;
  }
}

function setWindowAttributes(){
  windowWidth = window.innerWidth;
  windowHeight = window.innerHeight;
}
function setTotalHeight() {
  totalHeight = document.body.offsetHeight - windowHeight;
}
function setScrollRatio() {
  scrollRatio = Math.round((window.scrollY / totalHeight) * 100);
}

function handleResize() {
  setTotalHeight();
  setSectionPoint();
  setUnderbarPoint();
  setWindowAttributes();
  if(isMobile){
    worksTopContainer.style.height = "600vh"
    worksGraph.style.marginTop = "300vh";
  }
  else{
    worksTopContainer.style.height = "400vh"
    worksGraph.style.marginTop = "200vh";
  }
}

function setScrollFadeDiv() {
  document.querySelectorAll(".scroll-fade-in-out").forEach((elem) => {
    elem.style.display = "block";
    elem.style.transform = "translateY(-15px)";
  });
}
function setScrollScreenHeight() {
  for (const name in scrollScreenHeight) {
    document.querySelector(name).style.height = scrollScreenHeight[name];
  }
}

const introHeaderContainer = document.querySelector(".intro--header-container > .scroll-fade-in-out");
const worksTextContainer = document.querySelector(".works--top-container .works--text-container");
const worksHero = document.querySelector(".works--top-container img");
const parent = document.querySelector(".works--top-container");
worksHero.style.width = "400px";
worksHero.style.height = "300px";
const worksHeroInitialX = worksHero.offsetWidth;
const worksHeroInitialY = worksHero.offsetHeight;

function handleScroll() {
  setScrollRatio();
  // setting from navbar
  setUnderbarPosition();
  setPercent();

  scrollFadeInOut(
    window.scrollY,
    400,
    sectionPoint[0].sumHeight - windowHeight,
    introHeaderContainer
  );
  scrollFadeInOut(
    window.scrollY,
    sectionPoint[2].sumHeight + windowHeight / 2,
    sectionPoint[2].sumHeight + parent.offsetHeight - (isMobile?windowHeight * 3: windowHeight * 2), 
    worksTextContainer
  );
  scrollZoom(
    window.scrollY,
    sectionPoint[2].sumHeight + windowHeight / 2, // start + 50vh
    sectionPoint[2].sumHeight + parent.offsetHeight - windowHeight / 2, // end - 50vh
    worksHero,
    worksHeroInitialX,
    worksHeroInitialY,
    windowWidth,
    windowHeight,
    "darker"
  );
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
function setFadeAnimation() {
  // about
  const aboutHeaderContainer = document.querySelector(
    ".about--header-container"
  );
  const aboutInfoContainer = document.querySelector(".about--info-container");
  const aboutQuestionContainer = document.querySelector(".about--question-container");
  // motivation
  const motivationHeaderContainer = document.querySelector(".motivation--header-container");
  const motivationTextContainer = document.querySelector(".motivation--text-container");
  // works
  const worksGraphHeaderContainer = document.querySelector(".works--graph-header-container");
  const worksCareerList = document.querySelectorAll(".works--career");
  const worksHeaderContainer = document.querySelector(".works--header-container");
  const worksSkillsContainer = document.querySelector(".works--skills-container");
  const worksProjectsContainer = document.querySelector(".works--projects-container");
  // goal
  const goalHeaderContainer = document.querySelector(".goal--header-container");
  const goalTextField = document.querySelector(".goal--text-field");
  // fphrase
  const fphraseContainer = document.querySelector(".fphrase--container");

  const elementFadeInDict = [
    { element: aboutHeaderContainer, attributes: {} },
    { element: aboutInfoContainer, attributes: {} },
    { element: aboutQuestionContainer, attributes: {} },
    { element: motivationHeaderContainer, attributes: {} },
    { element: motivationTextContainer, attributes: {} },
    { element: worksHeaderContainer, attributes: {} },
    { element: worksSkillsContainer, attributes: {} },
    { element: goalHeaderContainer, attributes: {} },
    { element: goalTextField, attributes: {} },
  ];

  const introHero = document.querySelector(".intro--hero");
  new ObserverFadeInOut("fadeIn", elementFadeInDict);
  new ObserverFadeInOut(
    "fadeIn",
    [{ element: worksProjectsContainer, attributes: {} }],
    0.3
  ); // change threshold 
  const elementFaddeInOutDict = [
    { element : worksGraphHeaderContainer, attributes: {}},
    { element: introHero, attributes: { transitionDuration: "1.5s" } },
    { element: fphraseContainer, attributes: {} },
  ]
  worksCareerList.forEach(element=>{
    elementFaddeInOutDict.push({element, attributes:{transitionDuration: "500ms"}});
  })
  new ObserverFadeInOut("fadeInOut", elementFaddeInOutDict);
}

(() => {
  setScrollScreenHeight();

  setComponents();
  // setting from navbar
  handleItemClick();
  // setting for animation
  setFadeAnimation();
  setWindowAttributes
  // set scroll DOM to block (to prevent the DOM appear shortly when relaod)
  setScrollFadeDiv();

  document.body.onload = () => {
    handleResize();
    handleScroll();
    setSectionPoint();
    // setting from navbar
    setUnderbarPoint();
    setUnderbarPosition();
    setMobileNavbar();

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
  };
})();

export { scrollRatio, sectionPoint };
