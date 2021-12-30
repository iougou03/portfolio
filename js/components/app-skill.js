import { mySkills } from "../data/works-data.js";

const prefix = "./static/images/skills/";

class AppSkill extends HTMLElement {
  imgSrc;
  imgAlt;
  styleType="";

  styles = `
    div{
      background-color:#fff;
      width:fit-content;
      padding:20px;
      border-radius:15px;
      width:100px;
      height:100px;
      display:flex;
      align-items:center;
      justify-content:center;
      transition:ease 300ms;
    }
    .small{
      border-radius:10px;
      width:25px;
      height:25px;
    }
    .small img{
      width:100%;
    }
    div:hover{
      transform: translateY(-6px);
    }
  `;
  constructor() {
    super();
    this.imgSrc = this.getAttribute("imgSrc");
    this.imgAlt = this.getAttribute("imgAlt");
    this.styleType = this.getAttribute("styleType");
  }
  
  connectedCallback() {
    if (!this.imgSrc) return;
    this.attachShadow({ mode: "open" });
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>${this.styles}</style>
      <div ${this.styleType? "class=small" : ""}>
        <img src=${this.imgSrc} alt=${this.imgAlt}>
      </div>
    `
  }
}
class AppSkillContainer extends HTMLElement {
  skillListHTML = "";
  styles=`
    .container{
      display:flex;
      align-items:center;
      width:100%;
    }
    .container > app-skill{
      margin-right:1rem;
    }
    .container::-webkit-scrollbar-thumb{
      background-color: #C4C4C4;
      border-radius:999px;
      border: solid 2px #474747;
      box-shadow: inset 0 0 10px 10px #C4C4C4;
    }
    .small-container{
      display:grid;
      grid-template-columns: auto auto;
    }
    .small-container app-skill:nth-child(1){
      margin:0 7px 7px 0;
    }

    @media screen and (max-width:870px){
      .container{
        flex-wrap:wrap;
      }
      .container > app-skill, .small-container{
        margin:0.5rem;
      }
    }
  `

  constructor() {
    super();
  }
  skillGenerator(){
    for(let i = 0 ; i < mySkills.length - 4 ; i++){
      this.skillListHTML +=`
        <app-skill
          imgSrc="${prefix + mySkills[i].name + mySkills[i].extension}"
          imgAlt="${mySkills[i].imgAlt}"
        >
        </app-skill>
      `    
    }

    this.skillListHTML += "<div class='small-container'>";
    for(let i = mySkills.length - 4 ; i < mySkills.length; i++){
      this.skillListHTML +=`
        <app-skill
          imgSrc="${prefix + mySkills[i].name + mySkills[i].extension}"
          imgAlt="${mySkills[i].imgAlt}"
          styleType="small"
        >
        </app-skill>
      `    
    }
    this.skillListHTML += "</div>";
  }


  connectedCallback() {
    this.attachShadow({ mode: "open" });
    this.render();
  }
  
  render() {
    this.skillGenerator();
    this.shadowRoot.innerHTML=`
      <style>${this.styles}</style>
      <div class="container">
        ${this.skillListHTML}
      </div>
    `
  }
}

export { AppSkill, AppSkillContainer };
