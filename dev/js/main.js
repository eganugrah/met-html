// AOS.init();

var medSize;
var bpDesktop;

$(document).ready(function () {
  AOS.init({ disable: 'mobile' });
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

  if ($('#map').length) {
    $.getJSON('/asset/sample-data/map-data.json', function (data) {
      var map,
        markerIndex = 0,
        markersCoords = {};

      map = new jvm.Map({
        container: $('#map'),
        map: 'japan',
        zoomOnScroll: false,
        // zoomMin: 1.2,
        zoomStep: 1.2,
        // focusOn: {
        //   x: 0,
        //   y: 0,
        //   scale: 1.5,
        // },
        backgroundColor: 'transparent',
        regionsSelectable: true,
        regionsSelectableOne: true,
        regionStyle: {
          initial: {
            fill: '#E3D8BF',
            stroke: 'white',
            'stroke-width': 1,
            'stroke-opacity': 1,
          },
          hover: {
            fill: '#A37E2C',
            'fill-opacity': 1,
            cursor: 'pointer',
          },
          selected: {
            fill: '#A37E2C',
          },
        },
        regionLabelStyle: {
          initial: {
            'font-family': 'montserrat-regular',
            'font-size': '8',
            'font-weight': 'normal',
            fill: 'white',
          },
          hover: {
            fill: 'white',
          },
          selected: {
            fill: 'white',
          },
        },
        labels: {
          regions: {
            render: function (code) {
              var doNotShow = ['US-RI', 'US-DC', 'US-DE', 'US-MD'];

              if (doNotShow.indexOf(code) === -1) {
                return code.split('-')[1];
              }
            },
            offsets: function (code) {
              return {
                '02': [0, 13],
                '04': [0, -8],
                '05': [3, 0],
                '08': [0, 13],
                15: [10, 0],
                12: [-3, 0],
                17: [-10, 20],
                18: [5, -5],
                22: [-10, 0],
                27: [5, 0],
                30: [-10, 0],
                31: [-5, -5],
                39: [5, -10],
                43: [10, 0],
                46: [0, -10],
              }[code.split('-')[1]];
            },
          },
        },
        series: {
          regions: [
            {
              scale: {
                Hokkaido: '#e3136e',
                Tohoku: '#79af30',
                Kanto: '#9cc5e9',
                Chubu: '#de3539',
                Kansai: '#f7b233',
                Chugoku: '#79af30',
                Shikoku: '#8a002b',
                Kyushu: '#04a9d2',
              },
              attribute: 'fill',
              values: {
                'JP-01': 'Hokkaido',
                'JP-02': 'Tohoku',
                'JP-03': 'Tohoku',
                'JP-04': 'Tohoku',
                'JP-05': 'Tohoku',
                'JP-06': 'Tohoku',
                'JP-07': 'Tohoku',
                'JP-08': 'Kanto',
                'JP-09': 'Kanto',
                'JP-10': 'Kanto',
                'JP-11': 'Kanto',
                'JP-12': 'Kanto',
                'JP-13': 'Kanto',
                'JP-14': 'Kanto',
                'JP-15': 'Chubu',
                'JP-16': 'Chubu',
                'JP-17': 'Chubu',
                'JP-18': 'Chubu',
                'JP-19': 'Chubu',
                'JP-20': 'Chubu',
                'JP-21': 'Chubu',
                'JP-22': 'Chubu',
                'JP-23': 'Chubu',
                'JP-24': 'Kansai',
                'JP-25': 'Kansai',
                'JP-26': 'Kansai',
                'JP-27': 'Kansai',
                'JP-28': 'Kansai',
                'JP-29': 'Kansai',
                'JP-30': 'Kansai',
                'JP-31': 'Chugoku',
                'JP-32': 'Chugoku',
                'JP-33': 'Chugoku',
                'JP-34': 'Chugoku',
                'JP-35': 'Chugoku',
                'JP-36': 'Shikoku',
                'JP-37': 'Shikoku',
                'JP-38': 'Shikoku',
                'JP-39': 'Shikoku',
                'JP-40': 'Kyushu',
                'JP-41': 'Kyushu',
                'JP-42': 'Kyushu',
                'JP-43': 'Kyushu',
                'JP-44': 'Kyushu',
                'JP-45': 'Kyushu',
                'JP-46': 'Kyushu',
                'JP-47': 'Kyushu',
              },
              legend: {
                vertical: true,
                title: 'Area',
              },
            },
          ],
        },
        onRegionClick: function (e, code) {
          var map = $('#map').vectorMap('get', 'mapObject');
          var customTip = $('#customTip');
          if (typeof data.japan[code] != 'undefined') {
            customTip.html('');
            customTip.show();
            customTip.append(
              '<div class="map-info">' +
                '<div class="map-info-title">' +
                map.tip.text() +
                '</div>' +
                '<div>' +
                data.japan[code]['area'] +
                '</div>' +
                '<div>' +
                data.japan[code]['address'] +
                ', ' +
                data.japan[code]['region'] +
                '</div>' +
                //   '<div class="map-info-footer">' +
                '<a href="' +
                data.japan[code]['url'] +
                '" class="btn btn-block btn-light mt-3">See Details</a>' +
                //   '</div>' +
                '<div class="map-info-close"><i class="fa fa-close"></i></div>' +
                '</div>',
            );
            customTip.find('.map-info-close').click(function () {
              map.clearSelectedRegions();
              customTip.hide();
            });
            var tipHeight = customTip.innerHeight();
            var tipWidth = customTip.innerWidth();
            customTip.css({
              left: getLeft - map.container.offset().left - tipWidth / 2 + 10,
              top: getTop - map.container.offset().top - tipHeight / 2,
            });
            //   console.log(getLeft - map.container.offset().left);
          } else {
            map.clearSelectedRegions();
            customTip.hide();
            console.log('data tidak ditemukan');
          }
        },
        onRegionTipShow: function (e, tip, code) {
          if (!bpDesktop) {
            e.preventDefault();
          }
        },
      });

      var getLeft, getTop, addOffsetX, addOffsetY;
      $('#map')
        .vectorMap('get', 'mapObject')
        .container.mousemove(function (e) {
          //   var parentOffset = $(this).parent().offset();
          //   getLeft = e.pageX - 182;
          //   getTop = e.pageY - 1050;
          if (!bpDesktop) {
            addOffsetX = 0;
            addOffsetY = 240;
          } else {
            addOffsetX = 0;
            addOffsetY = 100;
          }
          getLeft = e.pageX;
          getTop = e.pageY - addOffsetY;
        });
    });
  }
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
