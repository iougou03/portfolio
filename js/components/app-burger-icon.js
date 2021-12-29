export default class AppBurgerIcon extends HTMLElement{
  constructor(){
    super();
  }

  connectedCallback(){
    this.attachShadow({ mode: "open" });
    this.render();
  }

  render(){
    this.shadowRoot.innerHTML=`
      <div>burger</div>
    `;
  }
}