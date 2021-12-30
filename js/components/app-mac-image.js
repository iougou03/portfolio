export default class AppMacImage extends HTMLElement {
  imgSrc;
  imgAlt;
  imgWidth;
  imgHeight;

  styles = `
  .window {
    width: fit-content;
    background-color: #E8E7E8;
    border: 1px #E8E7E8 solid;
    border-radius: 6px;
    border-bottom:none;
    transition: ease 300ms;
  }
  .window img {
    border-radius: 0 0 7px 7px;
    position:relative;
    bottom:-2px;
  }
  
  .window-bar {
    padding: 3px 5px;
  }
  
  .bar-list {
    display: flex;
  }
  .bar-list span {
    display: inline-block;
    width: 7px;
    height: 7px;
    border-radius: 50%;
  }
  .bar-list span:nth-child(1) {
    background-color: #FF6059;
  }
  .bar-list span:nth-child(2) {
    background-color: #FFBD2E;
    margin: 0 5px;
  }
  .bar-list span:nth-child(3) {
    background-color: #28CA42;
  }
  
  p {
    position:relative;
    color: #C4C4C4;
    text-align: right;
    margin: 5px 5px 0 0;
    width:fit-content;
    float:right;
  }
  p > span{
    display:inline-block;
    height:2px;
    width:0;
    position:absolute;
    bottom:-3px;
    right:0;
    background-color: #C4C4C4;
    transition: ease 300ms;
  }
  .window:hover{
    transform: translateY(-6px);
  }
  `;
  constructor() {
    super();
    this.imgSrc = this.getAttribute("imgSrc");
    this.imgAlt = this.getAttribute("imgAlt");
    this.imgWidth = this.getAttribute("imgWidth");
    this.imgHeight = this.getAttribute("imgHeight");
    this.imgLink = this.getAttribute("imgLink");
  }
  
  connectedCallback() {
    if (!this.imgSrc) return;
    this.attachShadow({ mode: "open" });
    this.render();
    
    if(this.imgAlt){
      this.shadowRoot.querySelector(".window").addEventListener("mouseenter",()=>{
        this.shadowRoot.querySelector(".comment > span").style.width = "100%";
      })
      this.shadowRoot.querySelector(".window").addEventListener("mouseleave",()=>{
        this.shadowRoot.querySelector(".comment > span").style.width = "0";
      })
    }
  }

  render() {
    this.shadowRoot.innerHTML += `
    <style>
    ${this.styles}
      .window img{
        ${this.imgWidth ? "width : " + this.imgWidth + "px": ""};
        ${this.imgHeight ? "height : " + this.imgHeight + "px": ""};
      }
      @media screen and (max-width:1050px){
        .window img{
          ${this.imgWidth ? "width : " + this.imgWidth / 3 * 2 +"px": ""};
        }
      }
      a{
        transition:ease 300ms;
      }
      a:hover{
        filter: brightness(50%);
      }
    </style>
    <div class="window">
      <div class="window-bar">
        <div class="bar-list">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <img src="${this.imgSrc}" alt="${this.imgAlt ? "alt = " + this.imgAlt : ""}">
    </div>
    ${this.imgAlt ? `
      ${this.imgLink? `<a title="navigate to link" target="_blank" href=${this.imgLink}>`:""}
        <p class="comment">${this.imgAlt}<span></span>
      ${this.imgLink? `👈</p></a>`:"</p>"}
      ` : ""}

    `;
  }
}
