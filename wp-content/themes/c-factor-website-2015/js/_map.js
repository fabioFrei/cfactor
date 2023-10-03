/////////2015/////////
//
// ███████ ██████
//    ██    ████
//    ██    ██
//
/////////ZH/CH////////


// ==========================================================================
// Map
// ==========================================================================

// requires in html
// data-js-map-canvas

(function($){
  $(function() {

    // select slides
    var $map = $('[data-js-map-canvas]');

    // check if slides exist
    if ($map.length) {

      var markerPos = $map.data('js-map-marker-position').split(',');
      markerPos = markerPos.map(function(el) {
        return parseFloat(el);
      });

      var mapOptions = {
        center: {lat: markerPos[0], lng: markerPos[1]},
        zoom: $map.data('js-map-zoom'),
        scrollwheel: false,
        disableDefaultUI: true,
        zoomControl: true,
        zoomControlOptions: {
          style: google.maps.ZoomControlStyle.SMALL,
          position: google.maps.ControlPosition.RIGHT_TOP
        },
        styles: [
          {
            "stylers": [
              { "saturation": -100 }
            ]
          }
        ]
      };

      var map = new google.maps.Map($map[0], mapOptions);

      // add marker
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(markerPos[0], markerPos[1]),
        icon: $map.data('js-map-marker-icon'),
        map: map
      });
    }

  });
}(jQuery));
