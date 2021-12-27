import AppHighlight from "./components/app-highlight.js";
import AppMacImage from "./components/app-mac-image.js";
import {
  setUnderbarPosition,
  setPercent,
  setUnderbarPoint,
  handleItemClick,
} from "./utils/navbar.js";

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
}
function handleScroll() {
  setScrollRatio();
  // setting from navbar
  setUnderbarPosition();
  setPercent();
}

function setComponents() {
  customElements.define("app-highlight", AppHighlight);
  customElements.define("app-mac-image", AppMacImage);
}

// definate web components
(() => {
  setComponents();
  // setting from navbar
  handleItemClick();

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
