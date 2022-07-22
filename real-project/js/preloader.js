paceOptions = {
  ajax: true,
  document: true,
};

Pace.on("done", function () {
  $(".p").delay(1500).animate({ top: "30%", opacity: "0" }, 1000);

  $("#preloader").delay(3000).animate({ top: "-100%" }, 1000);

  TweenMax.from(".title", 2, {
    delay: 2.8,
    y: 10,
    opacity: 0,
    ease: Expo.easeInOut,
  });
});
