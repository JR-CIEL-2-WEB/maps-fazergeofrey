/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
// The following example creates complex markers to indicate stade near
// Sydney, NSW, Australia. Note that the anchor is set to (0,32) to correspond
// to the base of the flagpole.
function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 12,
      center: { lat: -33.9, lng: 151.2 },
    });
  
    setMarkers(map);
  }
  
  // Data for the markers consisting of a name, a LatLng and a zIndex for the
  // order in which these markers should display on top of each other.
  const stade = [
    ["Mediathèque", 48.95982902339824, 2.549717074353292, 4], 
    ["service de sport ", 48.95972936149503, 2.5459058583085477, 5],  
    ["Auchan", 48.960211569819755, 2.554864917393666, 3],
    [" Espace V", 48.96216151312424, 2.5517507318293977, 2],
  ];
  
  function setMarkers(map) {
    // Adds markers to the map.
    // Marker sizes are expressed as a Size of X,Y where the origin of the image
    // (0,0) is located in the top left of the image.
    // Origins, anchor positions and coordinates of the marker increase in the X
    // direction to the right and in the Y direction down.
    const image = {
      url: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
      // This marker is 20 pixels wide by 32 pixels high.
      size: new google.maps.Size(20, 32),
      // The origin for this image is (0, 0).
      origin: new google.maps.Point(0, 0),
      // The anchor for this image is the base of the flagpole at (0, 32).
      anchor: new google.maps.Point(0, 32),
    };
    // Shapes define the clickable region of the icon. The type defines an HTML
    // <area> element 'poly' which traces out a polygon as a series of X,Y points.
    // The final coordinate closes the poly by connecting to the first coordinate.
    const shape = {
      coords: [1, 1, 1, 20, 18, 20, 18, 1],
      type: "poly",
    };
  
    for (let i = 0; i < stade.length; i++) {
      const beach = stade[i];
  
      new google.maps.Marker({
        position: { lat: beach[1], lng: beach[2] },
        map,
        icon: image,
        shape: shape,
        title: beach[0],
        zIndex: beach[3],
      });
    }
  }
  
  window.initMap = initMap;