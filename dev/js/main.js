// AOS.init();

$(document).ready(function () {
  AOS.init({ disable: 'mobile' });

  var medSize;
  if (window.matchMedia('(min-width: 1200px)').matches) {
    bpDesktop = true;
  } else {
    bpDesktop = false;
  }
  console.log('desktop: ' + bpDesktop);
  cloneMenu(bpDesktop);
  stickyHeaderDesktop();
  $('.close-menu').click(function () {
    $('#mm-blocker').trigger('click').blur();
    // $('html').removeClass('mm-opened mm-blocking mm-background mm-opening');
    // $('#menuMobile').removeClass('mm-opened');
    // $('.mm-page').removeAttr('style aria-hidden');
    console.log('klik');
  });
  //   function toggleNavbarMethod() {
  //     if ($(window).width() > 1200) {
  //       $('.navbar .dropdown')
  //         .on('mouseover', function () {
  //           $('.dropdown-toggle', this).trigger('click');
  //         })
  //         .on('mouseout', function () {
  //           $('.dropdown-toggle', this).trigger('click').blur();
  //         });
  //     } else {
  //       $('.navbar .dropdown').off('mouseover').off('mouseout');
  //     }
  //   }
  //   toggleNavbarMethod();
  //   $(window).resize(toggleNavbarMethod);

  if ($('.image-popup').length) {
    $('.image-popup').magnificPopup({
      type: 'image',
      mainClass: 'mfp-with-zoom',
      gallery: {
        enabled: true,
      },

      zoom: {
        enabled: true,

        duration: 300, // duration of the effect, in milliseconds
        easing: 'ease-in-out', // CSS transition easing function

        opener: function (openerElement) {
          return openerElement.is('img')
            ? openerElement
            : openerElement.find('img');
        },
      },
    });
  }
});

if ($('.slick-header-menu').length) {
  $('.slick-header-menu').slick({
    dots: false,
    infinite: false,
    speed: 600,
    slidesToShow: 8,
    slidesToScroll: 1,
    variableWidth: true,
    //   centerPadding: '60px',
    //   centerMode: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });
}

if ($('.section-image-slick-1').length) {
  $('.section-image-slick-1').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '.nav-slick-section-1',
    responsive: [
      {
        breakpoint: 991,
        settings: {
          arrows: true,
          adaptiveHeight: true,
        },
      },
    ],
  });
  if ($('.nav-slick-section-1').length) {
    $('.nav-slick-section-1').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      asNavFor: '.section-image-slick-1',
      dots: false,
      arrows: true,
      infinite: true,
      focusOnSelect: true,
    });
  }
}

if ($('.section-image-slick-2').length) {
  $('.section-image-slick-2').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '.nav-slick-section-2',
    responsive: [
      {
        breakpoint: 991,
        settings: {
          arrows: true,
          adaptiveHeight: true,
        },
      },
    ],
  });
  if ($('.nav-slick-section-2').length) {
    $('.nav-slick-section-2').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      asNavFor: '.section-image-slick-2',
      dots: false,
      arrows: true,
      infinite: true,
      focusOnSelect: true,
    });
  }
}

if ($('.testimoni-slider').length) {
  $('.testimoni-slider').slick({
    dots: true,
    infinite: false,
    arrows: false,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 4,
    adaptiveHeight: true,
    //   centerPadding: '60px',
    //   centerMode: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });
}

if ($('.slider-recommended').length) {
  $('.slider-recommended').slick({
    dots: false,
    arrows: true,
    infinite: false,
    speed: 600,
    slidesToShow: 5,
    slidesToScroll: 1,
    // adaptiveHeight: true,
    //   centerPadding: '60px',
    //   centerMode: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });
}

$('.list-recommended').on('mouseenter', function (e) {
  var getParent = $(this).closest('.section-content').find('.recommended-bg');
  var thisBg = $(this).data('img');
  $(getParent).fadeOut(200);
  setTimeout(function () {
    $(getParent)
      .attr('style', 'background-image: url("' + thisBg + '");')
      .fadeIn(200);
  }, 100);
});

$(window).on('resize', function () {
  //   cloneMenu();
});

$('.trigger-search').click(function () {
  var searchContainer = $('.search-top-container');
  searchContainer.addClass('show-search');
  searchContainer.find('input').focus();
});
$('.close-search').click(function () {
  var searchContainer = $('.search-top-container');
  searchContainer.removeClass('show-search');
  searchContainer.find('input').val('');
});

$(document).on('click', '.dropdown-menu', function (e) {
  e.stopPropagation();
});

// make it as accordion for smaller screens
// if ($(window).width() < 1200) {
//   $('.header-menu-list .dropdown-menu a').click(function (e) {
//     e.preventDefault();
//     if ($(this).next('.submenu').length) {
//       $(this).next('.submenu').toggle();
//     }
//     $('.header-menu-list .dropdown').on('hide.bs.dropdown', function () {
//       $(this).find('.submenu').hide();
//     });
//   });
// }

const parallax = $('.parallax-item');

// Parallax Effect for DIV 1
$(window).scroll(function () {
  let offset = window.pageYOffset;
  parallax.css('background-position-y', offset - 143 * 0.7 + 'px');
  //   parallax.style.backgroundPositionY = offset * 0.7 + 'px';
  // DIV 1 background will move slower than other elements on scroll.
});

$(function () {
  $('input.datetimes-range').daterangepicker({
    timePicker: true,
    timePicker24Hour: true,
    startDate: moment().startOf('hour'),
    endDate: moment().startOf('hour').add(32, 'hour'),
    locale: {
      format: 'MMM D, YYYY H:mm',
    },
  });
});

function stickyHeaderDesktop() {
  $(window).scroll(function () {
    if (bpDesktop) {
      if ($('.sticky-header').length) {
        var batasScroll;
        var elStickyHeader = $('.sticky-header'),
          winScroll = $(window).scrollTop();

        if ($('.section-hero').length) {
          batasScroll = $('.section-hero').height();
        } else {
          batasScroll = 600;
        }

        if (winScroll >= batasScroll) {
          elStickyHeader.addClass('fixed');
        } else {
          elStickyHeader.removeClass('fixed');
        }
        // console.log(batasScroll);
      }
    }
  });
}

function cloneMenu(bpDesktop) {
  if (!bpDesktop) {
    var mainMenu = $('#main_nav .main-menu'),
      htmlMainMenu = $(mainMenu).html(),
      menuMobile = $('#menuMobile > ul');
    $(htmlMainMenu).remove().clone().appendTo(menuMobile);
    $('#menuMobile *').removeClass('dropdown-menu');
    setTimeout(function () {
      if ($('#menuMobile').length) {
        $('#menuMobile').mmenu();
        //   $('.mh-head').mhead({
        //     scroll: {
        //       hide: 200,
        //     },
        //   });
        //   $(mainMenu).remove();
        $('#menuMobile').addClass('menu-cloned');
      }
    }, 100);
  }
}
