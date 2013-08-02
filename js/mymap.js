// $(function() {


// });
var map;
var routePoints = [];

$(document).ready(function(){
  initilizeGmaps();
  $('#somebutton').click(function () {locate(false);});  
});

function locate(){ 
  GMaps.geocode({
    address: $('#address').val(),
    callback: function(results, status) {
      if (status == 'OK') {
        var latlng = results[0].geometry.location;
        map.setCenter(latlng.lat(), latlng.lng());
        map.setZoom(15);
      }
    }
  });
}

function addRoutePoint(latlng){ 
  map.addMarker({
    lat: latlng.lat(),
    lng: latlng.lng()
  });
  routePoints.push(latlng);

  if (routePoints.length > 1){  
    var routeWayPoints = [];
    for (var i=1; i<routePoints.length-1; i++){ 
      routeWayPoints.push({location:routePoints[i],stopover:true});
    }
    console.log("way points are"+routeWayPoints);
    map.drawRoute({
      origin: [routePoints[0].lat(), routePoints[0].lng()],
      waypoints: routeWayPoints,
      destination: [routePoints[routePoints.length-1].lat(), routePoints[routePoints.length-1].lng()],
      travelMode: 'biking',
      strokeColor: '#131540',
      strokeOpacity: 0.6,
      strokeWeight: 6
    });
  }
}
        
function initilizeGmaps(){ 
  map = new GMaps({
    el: '#map',
    lat: 39.8282,
    lng: -98.5795,
    zoom: 4, 
    click: function(e) {
      addRoutePoint(e.latLng);
    }
  });
  GMaps.geolocate({
    success: function(position) {
      map.setCenter(position.coords.latitude, position.coords.longitude);
    }
  });
  
}
