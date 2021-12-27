export default class AppMacImage extends HTMLElement {
  styles = `
  .window {
    width: fit-content;
    background-color: #C4C4C4;
    border: 1px #C4C4C4 solid;
    border-radius: 11px;
  }
  .window img {
    border-radius: 0 0 14px 14px;
  }
  
  .window-bar {
    padding: 3px 8px;
  }
  
  .bar-list {
    display: flex;
  }
  .bar-list span {
    display: inline-block;
    width: 5px;
    height: 5px;
    border-radius: 50%;
  }
  .bar-list span:nth-child(1) {
    background-color: #E13535;
  }
  .bar-list span:nth-child(2) {
    background-color: #DCC23A;
    margin: 0 5px;
  }
  .bar-list span:nth-child(3) {
    background-color: #09DE8D;
  }
  
  p {
    color: #C4C4C4;
    text-align: right;
    margin: 0;
    padding: 5px 5px 0 0;
  }
  `;
  constructor() {
    super();
  }

  connectedCallback() {
    this.attachShadow({ mode: "open" });
    this.render();
  }

  render() {
    const imgSrc = this.getAttribute("imgSrc");
    const imgAlt = this.getAttribute("imgAlt");
    const imgWidth = this.getAttribute("imgWidth");
    const imgHeight = this.getAttribute("imgHeight");
    if (!imgSrc) return;

    this.shadowRoot.innerHTML += `
    <style>
    ${this.styles}
      .window img{
        ${imgWidth ? "width : " + imgWidth : ""}
        ${imgHeight ? "height : " + imgHeight : ""}
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
      <img src="${imgSrc}" alt="${imgAlt ? "alt = " + imgAlt : ""}">
    </div>
    ${imgAlt ? `<p>${imgAlt}</p>` : ""}
    `;
  }
}
