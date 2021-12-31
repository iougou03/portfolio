let move=0;
let ratio = 0;

export default function scrollFadeInOut(scrollPosition, start, end, element){
  if(start <= scrollPosition && scrollPosition < end){
      const fadeInPoint = start? start + (end - start) / 4 : 0;
      const fadeOutPoint = start + (end - start) / 4 * 3;
      
      if(scrollPosition < fadeInPoint){
        ratio =(fadeInPoint - scrollPosition) / (fadeInPoint - start);
        
        element.style.transform = `translateY(-${ratio * 15}px)`;
        element.style.opacity = 1 - ratio
      } 
      else if (fadeInPoint <= scrollPosition && scrollPosition < fadeOutPoint){
        element.style.opacity = 1
        element.style.transform = ``;
      }
      else if(fadeOutPoint <= scrollPosition){
        ratio = 1 - (end - scrollPosition) / (end - fadeOutPoint);

        element.style.transform = `translateY(${ratio * 15}px)`;
        element.style.opacity = 1 - ratio
      }
  }
  else {
    element.style.opacity = 0;
  }
}