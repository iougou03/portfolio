export default class ObserverFadeInOut {
  io;

  constructor(fadeType, elementList, rootMargin="0px 0px -10% 0px") {
    elementList.forEach((element) => {
      switch (fadeType) {
        case "fadeIn":
          element.style.cssText = `
            opacity:0;
            transform:translateY(10px);
          `;
          this.io = new IntersectionObserver(this.onlyFadeIn, {
            threshold: 0.7,
            rootMargin,
          });
          break;
        case "fadeInOut":
          this.io = new IntersectionObserver(this.onlyFadeInOut, {
            threshold: 0.1,
            rootMargin,
          });
          break;
      }

      this.io.observe(element);
    });
  }

  onlyFadeInOut(entries, observer) {
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
    });
  }

  onlyFadeIn(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting){
        entry.target.style.cssText = `
        transition:ease 600ms;
        opacity:1;
        transform:translateY(0px);
      `;
        observer.disconnect();
      }
    });
  }
}
