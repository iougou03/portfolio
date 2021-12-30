export default class AppBurgerIcon extends HTMLElement{
  isClicked = false;
  backgroundColor = "";

  styles=`
    div{
      position:relative;
      width:30px;
      height:30px;
      cursor:pointer;
      transition: ease 200ms;
    }
    div:hover{
      filter:invert(60%);
    }
    span{
      top:50%;
      left:50%;
      transform:translate(-50%,-50%);
      position:absolute;
      height: 2px;
      width: 70%;
      border-radius:999px;
      transition: ease 200ms;
    }
    span:nth-child(1){
      top:25%;
    }
    span:nth-child(3){
      top:76%;
    }
  `
  constructor(){
    super();
    this.backgroundColor = this.getAttribute("backgroundColor");
  }
  click(){
    this.shadowRoot.querySelector("div").click();

    return this.isClicked;
  }
  connectedCallback(){
    this.attachShadow({ mode: "open" });
    this.render();

    const icon = this.shadowRoot.querySelector("div");
    const bars = icon.children;

    icon.addEventListener("click",e=>{
      e.stopPropagation();
      this.isClicked = !this.isClicked;
      if(this.isClicked) {
        bars[0].style.transform = "rotate(45deg)";
        bars[0].style.left = "15%"
        bars[0].style.top = "47%"
        bars[1].style.left = "100%";
        bars[1].style.opacity = 0;
        bars[2].style.transform = "rotate(-45deg)";
        bars[2].style.left = "15%"
        bars[2].style.top = "47%"
      }
      else{
        bars[0].style.transform = "translate(-50%,-50%)";
        bars[0].style.left = "50%"
        bars[0].style.top = "25%"
        bars[1].style.left = "50%";
        bars[1].style.opacity = 1;
        bars[2].style.transform = "translate(-50%,-50%)";
        bars[2].style.left = "50%"
        bars[2].style.top = "76%"
      }
    })
  }

  render(){
    this.shadowRoot.innerHTML=`
      <style>
        ${this.styles}
        span{
          background-color: ${this.backgroundColor}
        }
      </style>
      <div>
        <span></span>
        <span></span>
        <span></span>
      </div>
    `;
  }
}