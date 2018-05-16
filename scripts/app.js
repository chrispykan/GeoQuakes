// define globals
var monthly_quakes_endpoint = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";

$(document).ready(function() {
  console.log("Let's get coding!");
  // CODE IN HERE!
  $('#info').ready(function(){
    $.ajax({
      method: 'GET',
      url: monthly_quakes_endpoint,
      success: quakeTitle,
      error: errorLog
    });

    $.ajax({
      method: 'GET',
      url: monthly_quakes_endpoint,
      success: quakeCord,
      error: errorLog
    });



    function quakeCord (response){
      //var markerCord = [];
      
      for (i=0; i < response.features.length; i++  ){
        var quCordLat = response.features[i].geometry.coordinates[1];
        var quCordLng = response.features[i].geometry.coordinates[0];
        var icon = {
          url: "./images/earthquake.png", // url
          scaledSize: new google.maps.Size(30, 30), // scaled size
          origin: new google.maps.Point(0,0), // origin
          anchor: new google.maps.Point(0, 0) // anchor
      };
        var latLng = new google.maps.LatLng(quCordLat,quCordLng);
          var marker = new google.maps.Marker({
            position: latLng,
            map: map,
            icon: icon
        })
      }
    }
      


    function quakeTitle (response) {
      console.log(response);
      for (i=0; i < response.features.length; i++  ){
        var quTit = response.features[i].properties.title;
        $('#info').append(`<p>${quTit}</p>`);
      }
      
    }
    
    function errorLog(a,b,c){
      console.log(b);
    }
  })


  var map;
  function initMap() {
    console.log('map!');
    map = new google.maps.Map(document.getElementById("map"), {
      center: {lat: 37.78, lng: -122.44},
      zoom: 8
    });
  }
initMap();


});
