/**
 * Instagram adds <div>'s to the page that overlay the image tags which prevent the click from
 * registering the image tag. This script locates the blocking divs and removes them from the page
 * so that the underlying images can be clicked on.
*/

import { RemoveContentBackgroundWorker } from "./remove-content-background-worker";

new RemoveContentBackgroundWorker({
  classNames: ['_aagw', '_aakl', '_aakh']
}).start();

// const removeElements = (elements: Element[]) => {
//   elements.forEach((element) => element.remove());
// }

// const removeBlockers = () => {
//   const imageBlockers = Array.from(document.getElementsByClassName('_aagw'));
//   removeElements(imageBlockers);

//   const videoBlockers1 = Array.from(document.getElementsByClassName('_aakl'));
//   removeElements(videoBlockers1);

//   const videoBlockers2 = Array.from(document.getElementsByClassName('_aakh'));
//   removeElements(videoBlockers2);

//   setTimeout(removeBlockers, 1000);
// }

// removeBlockers();
