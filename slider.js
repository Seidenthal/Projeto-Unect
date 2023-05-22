$(".carrossel").slick({
  prevArrow: $(".seta-esquerda"),
  nextArrow: $(".seta-direita"),
  infinite: true,
  dots: true,
  speed: 300,
  slidesToShow: 1,
  slidesToScroll: 1,
  mobileFirst: true,
  responsive: [
    {
      breakpoint: 1100,
      settings: "unslick",
    },
  ],
});
