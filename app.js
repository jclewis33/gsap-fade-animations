"use strict";

window.Webflow ||= [];
window.Webflow.push(() => {
  //alert("hello world");

  gsap.registerPlugin(ScrollTrigger);

  ///////////////////// FADE IN ANIMATION ////////////////

  const fadeInElements = gsap.utils.toArray("[fade-in]");

  fadeInElements.forEach((fadeInElement) => {
    gsap.fromTo(
      fadeInElement,
      { opacity: 0, y: 20 }, // Initial state
      {
        // Final state
        opacity: 1,
        y: 0,
        duration: 0.5,
        scrollTrigger: {
          trigger: fadeInElement,
          start: "top 60%", // When top of element reaches 60% in the viewport
          end: "bottom 50%", // When bottom of element reaches 50% in the viewport
          markers: "true",
        },
      }
    );
  });

  ///////////////////// END FADE IN ANIMATION ////////////////

  ///////////////////// BEGIN FADE LIST ANIMATION ////////////////

  const fadeInLists = gsap.utils.toArray("[fade-list]");

  fadeInLists.forEach((fadeInList) => {
    gsap.fromTo(
      fadeInList.children,
      { opacity: 0, y: 20 }, // Initial state
      {
        // Final state
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.2,
        scrollTrigger: {
          trigger: fadeInList,
          start: "top 60%", // When top of element reaches 60% in the viewport
          end: "bottom 50%", // When bottom of element reaches 50% in the viewport
          markers: "true",
        },
      }
    );
  });

  ///////////////////// END FADE LIST ANIMATION ////////////////

  //////////// REFRESH SCROLLTRIGGER after everything has loaded //////////////

  // PICK BETWEEN THE TWO. The load event is a great option to ensure everything is loaded.

  /////////// OPTION 1 - setTimeout ///////////
  //Using a setTimeout to ensure everything has loaded on the page.

  setTimeout(() => {
    ScrollTrigger.refresh(true);
    console.log("Scroll Trigger has been refreshed");
  }, 1500); //Refreshes ScrollTrigger after 1.5 seconds to ensure everything has completed loaded and is settled into place.

  ///////// OPTION 2 - Load event /////////

  //Using the 'load' event to ensure everything has loaded on the page

  window.addEventListener("load", () => {
    ScrollTrigger.refresh(true);
    console.log("Scroll Trigger has been refreshed");
  });

  ///////////// MANUAL SCROLLTRIGGER REFRESH /////////////////

  //Meant to esnure Fade In Animiation above runs properly. Placed selectively to refresh scrollTrigger on sections that were affecting scrollTrigger animations afterwards. These are typically sections that have fade-in animations where images are loading, or sections that have dynamic content that needs to load. If proper aspect-ratio's are applied to all images on the site, you should not need this option.

  //But if you need to use it, place refresh in the attributes panel on the element at which you want Scroll Trigger to be refreshed. No value is needed.

  const refreshElements = gsap.utils.toArray("[refresh]");

  refreshElements.forEach((refreshElement) => {
    const id = refreshElement.id; // Get the ID of the element
    const message = `${id} has refreshed` || "section refreshed - no ID added";
    const refresh = gsap.timeline({
      scrollTrigger: {
        trigger: refreshElement,
        start: "top bottom",
        onLeave: () => {
          console.log(message);
          ScrollTrigger.refresh();
        },
      },
    });
  });
});

/*code to add into webflor project
<script src="http://localhost:1234/app.js"></script>
*/
