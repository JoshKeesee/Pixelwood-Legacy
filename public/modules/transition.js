var transition = false;

$(document).ready(() => {
  setTimeout(() => {
    $(".align").css("opacity", 1);
  }, 100);
});

function transitionScene(ms) {
  transition = true;
  brightness = 1;
  setTimeout(() => {
    transition = false;
  }, ms);
}

function startGame() {
  $(".furnace").slideUp(0);
  $(".chest").slideUp(0);
  $(".connected").addClass("hidden");
  $(".save").removeClass("hidden");

  $(".loading .icon").removeClass("hidden");
  $(".loading .icon").fadeOut(0);
  $(".align").slideUp();
  $(".main-menu").slideUp("slow");
  $("footer").fadeOut("slow");
  setTimeout(() => {
    $("meta[name=theme-color]").attr("content", "black");
    $(".loading .icon").fadeIn();
  }, 500);
  
  setTimeout(loadImages, 500);
  checkForAnimate();
}

function doneLoading() {
  $(".loading").fadeOut("slow");
  usingUtility = false;
  startMusic();
  if (user) {
    setTimeout(() => {
      $(".logged-in").slideDown();
    }, 1000);
    
    setTimeout(() => {
      $(".logged-in").slideUp();
    }, 4000);
  }
  nextScene();
}