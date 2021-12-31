let ratio = 0;

export default function scrollZoom(
  scrollPosition,
  start,
  end,
  element,
  initialWidth,
  initialHeight,
  windowWidth,
  windowHeight,
  attrClass,
) {
  if (start > scrollPosition) {
    element.style.width = `${initialWidth}px`;
    element.style.height = `${initialHeight}px`;
    element.style.opacity = 1;
  }
  else if (start <= scrollPosition && scrollPosition < end) {
    const zoomPoint = start + windowWidth / 2;
    const fadeOutPoint = start + ((end - start) / 4) * 3;
    const gapx = windowWidth - initialWidth;
    const gapy = windowHeight - initialHeight;
    
    if (scrollPosition < zoomPoint) {
      ratio = 1 - (zoomPoint - scrollPosition) / (zoomPoint - start);

      element.style.width = `${initialWidth + gapx * ratio}px`;
      element.style.height = `${initialHeight + gapy * ratio}px`;
      element.classList.remove(attrClass);
    } else if (zoomPoint <= scrollPosition && scrollPosition < fadeOutPoint) {
      element.classList.add(attrClass);
      element.style.width = `${windowWidth}px`;
      element.style.height = `${windowHeight}px`;
    } else if (fadeOutPoint <= scrollPosition) {
      element.style.width = `${windowWidth}px`;
      element.style.height = `${windowHeight}px`;
      ratio = 1 - (end - scrollPosition) / (end - fadeOutPoint);
      element.style.opacity = 1 - ratio;
    }
  }
  else element.style.opacity = 0;
}
