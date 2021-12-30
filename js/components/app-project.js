import { myProjects } from "../data/works-data.js";

const prefix = "./static/images/projects/";

class AppProject extends HTMLElement {
  imgSrc;
  imgAlt;
  overlayTitle
  overlayPeriod
  overlayBody
  type;
  title;
  overlayClick = 0;

  styles = `
    .window{
      position:relative;
      padding:2rem;
      background-color:#fff;
      width:280px;
      height:424px;
      border-radius:20px;
      display:flex;
      flex-direction:column;
      align-items:space-between;
      transition: 300ms ease;
    }
    .window img{
      margin:auto;
    }
    .text-container{
      display: flex;
      justify-content:space-between;
      align-items:flex-end; 
    }
    .text h3, .text h2{
      margin:0;
    }
    .text h3{
      font-size:18px;
      color: #7D7D7D;
    }
    .text h2{
      margin-top:0.5rem;
      font-size:32px;
    }
    .project-button{
      width:30px;
      height:30px;
      background-color:#000;
      border-radius:50%;
      position:relative;
      transition:ease 300ms;
      position:relative;
      z-index:3;
    }
    .project-button span{
      display:inline-block;
      width:2px;
      border-radius:999px;
      height:18px;
      background-color:#fff;
      position:absolute;
      top:50%;
      left:50%;
      transform: translate(-50%,-50%);
    }
    .project-button span:nth-child(2){
      transform: translate(-50%,-50%) rotate(90deg);
    }
    .project-button:hover{
      cursor:pointer;
      transform: rotate(45deg);
    }
    .overlay{
      transition:ease 300ms;
      opacity:0;
      position:absolute;
      top:10px;
      left:0;
      right:0;
      bottom:0;
      padding:2rem;
      background-color:rgba(255,255,255,0.9);
      z-index:2;
      border-radius:20px;
    }
    .overlay p:nth-child(2){
      color : #147CE5;
      font-weight:bold;
    }
    .overlay p:nth-child(3){
      color:#7D7D7D;
      font-size:1.15rem;
      line-height:1.5em;
    }
  `;
  constructor() {
    super();
    this.imgSrc = this.getAttribute("imgSrc");
    this.imgAlt = this.getAttribute("imgAlt");
    this.overlayTitle = this.getAttribute("overlayTitle");
    this.overlayPeriod = this.getAttribute("overlayPeriod");
    this.overlayBody = this.getAttribute("overlayBody");    
    this.type = this.getAttribute("type");
    this.title = this.getAttribute("title");
  }

  connectedCallback() {
    if (!this.imgSrc) return;
    this.attachShadow({ mode: "open" });
    this.render();
    const btn = this.shadowRoot.querySelector(".project-button");
    const ov = this.shadowRoot.querySelector(".overlay");

    btn.addEventListener("mousedown", () => {
      this.overlayClick = this.overlayClick ? 0 : 1;
      ov.style.opacity = this.overlayClick;
      btn.style.transform = this.overlayClick ? "rotate(45deg)" : "";
      ov.style.top = this.overlayClick ? "0" : "10px";
    });
  }

  render() {
    this.shadowRoot.innerHTML = `
    <style>${this.styles}</style>
    <div class="window">
      <img src=${this.imgSrc} alt=${this.imgAlt}>
      <div class="text-container">
        <div class="text">
          <h3>${this.type}</h3>
          <h2>${this.title}</h2>
        </div>
        <div class="project-button">
          <span></span>
          <span></span>
        </div>
      </div>
      <div class="overlay">
        <h1>${this.overlayTitle}</h1>
        <p>${this.overlayPeriod}</p>
        <p>${this.overlayBody}</p>
      </div>
    </div>
    `;
  }
}
class AppProjectContainer extends HTMLElement {
  projectListHTML = "";
  styles = `
    div{
      display:flex;
      align-items:center;
    }
    div app-project{
      margin-right:1.5rem;
    }
    @media screen and (max-width:870px){
      div{
        flex-direction:column;
      }
      div app-project{
        margin:1rem;
      }
    }
  `;
  constructor() {
    super();
  }
  projectGenerator() {
    myProjects.forEach((elem) => {
      this.projectListHTML += `
        <app-project
          imgSrc=${prefix + elem.name + elem.extension}
          imgAlt=${elem.imgAlt}
          overlayTitle="${elem.overlay.title}"
          overlayPeriod="${elem.overlay.period}"
          overlayBody="${elem.overlay.body}"
          type=${elem.type}
          title=${elem.title}
        >
        </app-project>
      `;
    });
  }

  connectedCallback() {
    this.attachShadow({ mode: "open" });
    this.render();
  }

  render() {
    this.projectGenerator();
    this.shadowRoot.innerHTML = `
      <style>${this.styles}</style>
      <div>
        ${this.projectListHTML}
      </div>
    `;
  }
}

export { AppProject, AppProjectContainer };
