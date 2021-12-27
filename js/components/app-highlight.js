export default class AppHighlight extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.attachShadow({ mode: "open" });
    this.render();
  }

  render() {
    const text = this.getAttribute("text");
    const color = this.getAttribute("color");
    const fontSize = this.getAttribute("fontSize");
    const fontWeight = this.getAttribute("fontWeight");
    if (!text) return;

    this.shadowRoot.innerHTML = `
      <style>
        span{
          ${color ? "color : " + color : ""};
          ${fontSize ? "font-size : " + fontSize : ""};
          ${fontWeight ? "font-weight : " + fontWeight : ""};
        }
      </style>
      <span>${text}</span>
    `;
  }
}
