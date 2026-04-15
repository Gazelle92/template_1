$(document).on("click", ".brands .right-box .sliding-slider .img-box", function () {
  var slideIndex = $(this).parents(".swiper-slide").index();
  var smallOffset = (120 / 900) * $("body").height();
  var largeOffset = 0.48 * $("body").height();

  if ($("body").width() <= 768) {
    smallOffset = (77 / 720) * $("body").height();
    largeOffset = 0.3 * $("body").height();
  }

  if (!$(".brands").hasClass("expand")) {
    $(".brands").addClass("expand transition");

    e(Number($(this).parents(".swiper-slide").attr("data-swiper-slide-index")));
    x.slideTo(slideIndex, 1000, false);

    s.Tween.fromTo(
      $(".brands .right-box .slider-inner"),
      0,
      { marginTop: 0 },
      { marginTop: -(largeOffset - smallOffset) * slideIndex - (largeOffset - smallOffset) / 2 }
    );

    setTimeout(function () {
      $(".brands").addClass("end").removeClass("transition");
      $(".brands .right-box .slider-inner").removeAttr("style");

      x.slideTo(slideIndex, 0, false);
      x.params.speed = 1000;
      x.params.slideToClickedSlide = true;
      x.mousewheel.disable();
      x.update();
    }, 1000);
  }
});

$(document).on("click", ".brands .back span", function () {
  var activeIndex = $(".brands .right-box .swiper-slide-active").index();
  var smallOffset = (120 / 900) * $("body").height();
  var largeOffset = 0.48 * $("body").height();

  if ($("body").width() <= 768) {
    smallOffset = (77 / 720) * $("body").height();
    largeOffset = 0.3 * $("body").height();
  }

  $(".brands").removeClass("expand end").addClass("transition back");

  e($(".brands .left-box .cont-box.step2 li.current").index(), "up");

  s.Tween.fromTo(
    $(".brands .right-box .slider-inner"),
    0,
    { marginTop: 0 },
    { marginTop: (largeOffset - smallOffset) * activeIndex + (largeOffset - smallOffset) / 2 }
  );

  setTimeout(function () {
    $(".brands").removeClass("transition back");
    $(".brands .right-box .slider-inner").removeAttr("style");
    $(".brands .left-box .cont-box.step2 li").removeClass("prev current next on");
    $(".brands .show-ani").removeAttr("style");

    x.update();
    x.params.speed = 300;
    x.params.slideToClickedSlide = false;
    x.mousewheel.enable();
  }, 1000);
});

(0, t.scrollAnimation)();