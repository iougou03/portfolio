export default class ObserverFadeInOut {
  io;
  // rootMargin = TOP, RIGHT, BOTTOM, LEFT | (TOP, BOTTOM), (LEFT, RIGHT) 
  // must write px or %
  constructor(fadeType, elementDict, threshold=0.5, rootMargin = "0px 0px -10% 0px") {
    elementDict.forEach(({ element, attributes }) => {
      switch (fadeType) {
        case "fadeIn":
          element.style.cssText = `
            opacity:0;
            transform:translateY(10px);
          `;
          this.io = new IntersectionObserver(
            (entries, observer) =>
              this.onlyFadeIn(entries, observer, attributes),
            {
              threshold,
              rootMargin,
            }
          );
          break;
        case "fadeInOut":
          this.io = new IntersectionObserver((entries, observer) =>
          this.onlyFadeInOut(entries, observer, attributes), {
            threshold,
            rootMargin,
          });
          break;
      }

      this.io.observe(element);
    });
  }

  onlyFadeInOut(entries, observer, attributes) {
    entries.forEach((entry) => {
      if (!entry.isIntersecting)
        entry.target.style.cssText = `
        transition:ease 600ms;
        opacity:0;
        transform:translateY(10px);
      `;
      else
        entry.target.style.cssText = `
        transition:ease 600ms;
        opacity:1;
        transform:translateY(0);
      `;
      for(const key in attributes){
          entry.target.style[key] = attributes[key];
      }
    });
  }

  onlyFadeIn(entries, observer, attributes) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
          entry.target.style.cssText = `
          transition:ease 600ms;
          opacity:1;
          transform:translateY(0px);
        `;
        for(const key in attributes){
          entry.target.style[key] = attributes[key];
        }
        observer.disconnect();
      }
    });
  }
}
