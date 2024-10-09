document.addEventListener("DOMContentLoaded", function () {
  // Select all elements with the class 'lazy-image'
  let lazyImages = document.querySelectorAll('.lazy-image');
  let paragraphs = document.querySelectorAll('.text-regular'); // Change this selector to match your <p> elements

  // Create an Intersection Observer for regular lazy loading
  let observer = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        // The target element is now in view
        let img = entry.target;
        img.src = img.getAttribute('data-src');

        observer.unobserve(img);
      }
    });
  }, { rootMargin: '0px 0px 50px 0px' }); // Adjust rootMargin as needed

  // Create another Intersection Observer for shorter distance
  let shortDistanceObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
      
      if (entry.isIntersecting) {
        // The target element is closer to the viewport
        let elementToAnimate = entry.target;
        if (elementToAnimate.tagName.toLowerCase() === 'img') {
          elementToAnimate.classList.remove('lazy-image');
        }
        else {
          elementToAnimate.classList.add('visible');
          //elementToAnimate.style.opacity = 1; // Change
        }

        shortDistanceObserver.unobserve(elementToAnimate);
      }
    });
  }, { rootMargin: '0px 0px 16px 0px' }); // Adjust rootMargin for shorter distance

  // Observe each lazy image for regular lazy loading
  lazyImages.forEach(function (img) {
    observer.observe(img);
  });

  // Observe each lazy image for shorter distance
  lazyImages.forEach(function (img) {
    shortDistanceObserver.observe(img);
  });
  paragraphs.forEach(function (associatedParagraph) {
    shortDistanceObserver.observe(associatedParagraph);
  });
});

$('#emailToCopy').on( "click tap",function() {
  var copyText = 'roberto.unsettled@gmail.com';
  navigator.clipboard.writeText(copyText);

  $('#emailToCopy').addClass('copied');
  setTimeout(function() {
    $('#emailToCopy').removeClass('copied');
   }, 2000);

});