
    maptilersdk.config.apiKey = map_key;
    const map = new maptilersdk.Map({
      container: 'map', // container's id or the HTML element in which the SDK will render the map
       projectionControl: true,
      style: maptilersdk.MapStyle.STREETS,
      center: [72.8697, 19.1136], // starting position [lng, lat]
      zoom: 15 // starting zoom
      
    });
 const gc = new maptilersdkMaptilerGeocoder.GeocodingControl({});

      map.addControl(gc, 'top-left');
    
