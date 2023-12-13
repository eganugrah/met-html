$.fn.hasAttr = function (name) {
  if (typeof this.attr(name) !== 'undefined' || this.attr(name) !== '') {
    return this.attr(name);
  } else {
    return false;
  }
};

if ($('#map').length) {
  var getRegion = $('#map').data('region'),
    getJsonFile = $('#map').data('json'),
    getSelectedAreaCode = $('#map').hasAttr('data-selected');
  var mapEast,
    mapWest,
    mapAll,
    regionColor,
    doNotShow,
    regionClass,
    regionName,
    arrayCode,
    arrayArea,
    setLegend;
  switchCase(getRegion);

  if (!mapEast && !mapWest && !mapAll) {
    setLegend = false;
  } else {
    setLegend = {
      vertical: true,
      cssClass: 'legend-title legend-title_' + getRegion,
      title: regionName,
    };
  }

  $.getJSON(getJsonFile, function (data) {
    var map,
      markerIndex = 0,
      markersCoords = {},
      selectableStat,
      setHover;
    if (getSelectedAreaCode) {
      selectableStat = false;
      setHover = false;
    } else {
      selectableStat = true;
      setHover = {
        fill: '#A37E2C',
        'fill-opacity': 1,
        cursor: 'pointer',
      };
    }

    map = new jvm.Map({
      container: $('#map'),
      map: 'japan',
      // panOnDrag: false,
      zoomOnScroll: false,
      // zoomMin: 1.2,
      zoomMax: 5,
      zoomStep: 1.2,
      backgroundColor: 'transparent',
      regionsSelectable: selectableStat,
      regionsSelectableOne: selectableStat,
      regionStyle: {
        initial: {
          fill: '#E3D8BF',
          stroke: 'white',
          'stroke-width': 1,
          'stroke-opacity': 1,
        },
        hover: setHover,
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
            //   if (mapEast) {
            doNotShow = ['JP-99999'];

            if (doNotShow.indexOf(code) === -1) {
              return code.split('-')[1];
            }
            //   }
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
            scale: regionColor,
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
            legend: setLegend,
          },
        ],
      },
      onRegionSelected: function (e, code) {
        var map = $('#map').vectorMap('get', 'mapObject');
        var customTip = $('#customTip');
        if (typeof data.japan[code] != 'undefined') {
          customTip.html('');
          customTip.show();
          customTip.append(
            '<div class="map-info">' +
              '<div class="map-info-title">' +
              data.japan[code]['name'] +
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
              '" class="btn btn-block btn-light mt-3 btn-detail-tip">See Details</a>' +
              //   '</div>' +
              '<div class="map-info-close"><i class="fa fa-close"></i></div>' +
              '</div>',
          );
          //   map.setFocus({region: code, animate: true});
          customTip.find('.map-info-close').click(function () {
            map.clearSelectedRegions();
            customTip.hide();
          });
          var tipsPosition,
            tipHeight = customTip.innerHeight(),
            tipWidth = customTip.innerWidth();

          if (getSelectedAreaCode) {
            customTip.addClass('tip-selected');
            tipsPosition = {
              left: 0, //'calc(50% - 125px)',
              right: 0,
              top: 0, //'calc(50% - 100px)',
              //   bottom: 0,
            };
            $('.map-info-close').hide();
          } else {
            tipsPosition = {
              left: getLeft - map.container.offset().left - tipWidth / 2 + 10,
              top: getTop - map.container.offset().top - tipHeight / 2,
            };
          }

          customTip.css(tipsPosition);
          //   console.log(getLeft - map.container.offset().left);
        } else {
          map.clearSelectedRegions();
          customTip.hide();
          console.log('data tidak ditemukan');
        }
      },
      //   onRegionSelected: function (e, code) {
      //     console.log(code);
      //   },
      onRegionTipShow: function (e, tip, code) {
        if (!bpDesktop) {
          e.preventDefault();
        }
      },
    });

    var mapObj = $('#map').vectorMap('get', 'mapObject');

    if (getSelectedAreaCode) {
      mapObj.setSelectedRegions(getSelectedAreaCode);
      mapObj.setFocus({
        region: getSelectedAreaCode,
        animate: true,
        x: -100,
      });
    } else if (!mapAll) {
      mapObj.setFocus({
        regions: arrayCode,
        animate: true,
      });
    }

    var getLeft, getTop, addOffsetX, addOffsetY;
    mapObj.container.mousemove(function (e) {
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

function switchCase(getRegion) {
  switch (getRegion) {
    case 'east':
      arrayCode = [
        'JP-01',
        'JP-02',
        'JP-03',
        'JP-04',
        'JP-05',
        'JP-06',
        'JP-07',
        'JP-08',
        'JP-09',
        'JP-10',
        'JP-11',
        'JP-12',
        'JP-13',
        'JP-14',
        'JP-15',
        'JP-16',
        'JP-17',
        'JP-18',
        'JP-19',
        'JP-20',
        'JP-21',
        'JP-22',
        'JP-23',
        'JP-24',
      ];
      regionName = "East Japan's Area";
      mapEast = true;
      mapWest = false;
      mapAll = false;
      regionColor = {
        Hokkaido: '#fc579f',
        Tohoku: '#79af30',
        Kanto: '#9cc5e9',
        Chubu: '#de3539',
        Kansai: '#ddd',
        Chugoku: '#ddd',
        Shikoku: '#ddd',
        Kyushu: '#ddd',
      };
      break;

    case 'hokkaido':
      arrayCode = ['JP-01'];
      regionName = "East Japan's Area";
      mapEast = false;
      mapWest = false;
      mapAll = false;
      regionColor = {
        Hokkaido: '#fc579f',
        Tohoku: '#ddd',
        Kanto: '#ddd',
        Chubu: '#ddd',
        Kansai: '#ddd',
        Chugoku: '#ddd',
        Shikoku: '#ddd',
        Kyushu: '#ddd',
      };
      break;

    case 'tohoku':
      arrayCode = ['JP-02', 'JP-03', 'JP-04', 'JP-05', 'JP-06', 'JP-07'];
      regionName = "East Japan's Area";
      mapEast = false;
      mapWest = false;
      mapAll = false;
      regionColor = {
        Hokkaido: '#ddd',
        Tohoku: '#79af30',
        Kanto: '#ddd',
        Chubu: '#ddd',
        Kansai: '#ddd',
        Chugoku: '#ddd',
        Shikoku: '#ddd',
        Kyushu: '#ddd',
      };
      break;

    case 'kanto':
      arrayCode = [
        'JP-08',
        'JP-09',
        'JP-10',
        'JP-11',
        'JP-12',
        'JP-13',
        'JP-14',
      ];
      regionName = "East Japan's Area";
      mapEast = false;
      mapWest = false;
      mapAll = false;
      regionColor = {
        Hokkaido: '#ddd',
        Tohoku: '#ddd',
        Kanto: '#9cc5e9',
        Chubu: '#ddd',
        Kansai: '#ddd',
        Chugoku: '#ddd',
        Shikoku: '#ddd',
        Kyushu: '#ddd',
      };
      break;

    case 'chubu':
      arrayCode = [
        'JP-15',
        'JP-16',
        'JP-17',
        'JP-18',
        'JP-19',
        'JP-20',
        'JP-21',
        'JP-22',
        'JP-23',
      ];
      regionName = "East Japan's Area";
      mapEast = false;
      mapWest = false;
      mapAll = false;
      regionColor = {
        Hokkaido: '#ddd',
        Tohoku: '#ddd',
        Kanto: '#ddd',
        Chubu: '#de3539',
        Kansai: '#ddd',
        Chugoku: '#ddd',
        Shikoku: '#ddd',
        Kyushu: '#ddd',
      };
      break;

    // END EAST JAPAN

    case 'west':
      arrayCode = [
        'JP-24',
        'JP-25',
        'JP-26',
        'JP-27',
        'JP-28',
        'JP-29',
        'JP-30',
        'JP-31',
        'JP-32',
        'JP-33',
        'JP-34',
        'JP-35',
        'JP-36',
        'JP-37',
        'JP-38',
        'JP-39',
        'JP-40',
        'JP-41',
        'JP-42',
        'JP-43',
        'JP-44',
        'JP-45',
        'JP-46',
        'JP-47',
      ];
      regionName = "West Japan's Area";
      mapEast = false;
      mapWest = true;
      mapAll = false;
      regionColor = {
        Hokkaido: '#ddd',
        Tohoku: '#ddd',
        Kanto: '#ddd',
        Chubu: '#ddd',
        Kansai: '#f7b233',
        Chugoku: '#850bf9',
        Shikoku: '#8a002b',
        Kyushu: '#04a9d2',
      };
      break;

    case 'kansai':
      arrayCode = [
        'JP-24',
        'JP-25',
        'JP-26',
        'JP-27',
        'JP-28',
        'JP-29',
        'JP-30',
      ];
      regionName = "West Japan's Area";
      mapEast = false;
      mapWest = false;
      mapAll = false;
      regionColor = {
        Hokkaido: '#ddd',
        Tohoku: '#ddd',
        Kanto: '#ddd',
        Chubu: '#ddd',
        Kansai: '#f7b233',
        Chugoku: '#ddd',
        Shikoku: '#ddd',
        Kyushu: '#ddd',
      };
      break;

    case 'chugoku':
      arrayCode = ['JP-31', 'JP-32', 'JP-33', 'JP-34', 'JP-35'];
      regionName = "West Japan's Area";
      mapEast = false;
      mapWest = false;
      mapAll = false;
      regionColor = {
        Hokkaido: '#ddd',
        Tohoku: '#ddd',
        Kanto: '#ddd',
        Chubu: '#ddd',
        Kansai: '#ddd',
        Chugoku: '#850bf9',
        Shikoku: '#ddd',
        Kyushu: '#ddd',
      };
      break;

    case 'shikoku':
      arrayCode = ['JP-36', 'JP-37', 'JP-38', 'JP-39'];
      regionName = "West Japan's Area";
      mapEast = false;
      mapWest = false;
      mapAll = false;
      regionColor = {
        Hokkaido: '#ddd',
        Tohoku: '#ddd',
        Kanto: '#ddd',
        Chubu: '#ddd',
        Kansai: '#ddd',
        Chugoku: '#ddd',
        Shikoku: '#8a002b',
        Kyushu: '#ddd',
      };
      break;

    case 'kyushu':
      arrayCode = [
        'JP-40',
        'JP-41',
        'JP-42',
        'JP-43',
        'JP-44',
        'JP-45',
        'JP-46',
        'JP-47',
      ];
      regionName = "West Japan's Area";
      mapEast = false;
      mapWest = false;
      mapAll = false;
      regionColor = {
        Hokkaido: '#ddd',
        Tohoku: '#ddd',
        Kanto: '#ddd',
        Chubu: '#ddd',
        Kansai: '#ddd',
        Chugoku: '#ddd',
        Shikoku: '#ddd',
        Kyushu: '#04a9d2',
      };
      break;

    default:
      regionName = 'Area';
      mapEast = false;
      mapWest = false;
      mapAll = true;
      regionColor = {
        Hokkaido: '#fc579f',
        Tohoku: '#79af30',
        Kanto: '#9cc5e9',
        Chubu: '#de3539',
        Kansai: '#f7b233',
        Chugoku: '#850bf9',
        Shikoku: '#8a002b',
        Kyushu: '#04a9d2',
      };
  }
}
