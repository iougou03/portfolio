export default class AppHighlight extends HTMLElement {
  text;
  color;
  fontSize;
  fontWeight;

  constructor() {
    super();
    this.text = this.getAttribute("text");
    this.color = this.getAttribute("color");
    this.fontSize = this.getAttribute("fontSize");
    this.fontWeight = this.getAttribute("fontWeight");
  }

  connectedCallback() {
    if (!this.text) return;
    this.attachShadow({ mode: "open" });
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        span{
          ${this.color ? "color : " + this.color : ""};
          ${this.fontSize ? "font-size : " + this.fontSize : ""};
          ${this.fontWeight ? "font-weight : " + this.fontWeight : ""};
        }
      </style>
      <span>${this.text}</span>
    `;
  }
}
