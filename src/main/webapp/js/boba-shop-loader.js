/**
 * Loads the Json array data constructed from BobaShopServlet and construct the map based on the array
 */
 
/* exported createBobaShopsMap */ 
function createBobaShopsMap(){
  fetch('/boba-data').then(function(response) {
    return response.json();
  }).then((bobaShops) => {
      
    const map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 37.7749, lng: -122.4194},
      zoom:9
    });


    bobaShops.forEach((bobaShop) => {
      var icon = '/img/boba.png';
      var marker = new google.maps.Marker({
        position: {lat: bobaShop.lat, lng: bobaShop.lng},
        map: map,
        icon: icon,
        name: bobaShop.name,
        address: bobaShop.address,
        rating: bobaShop.rating
      });

      google.maps.event.addListener(marker, 'click', function() {
        displayShopInfo(marker);
      }); 

    });
  });
}

/**
 * Function to display the boba shop information on the web page when a marker is clicked
 * @param {marker} The marker that is clicked
 */
function displayShopInfo(marker){
  console.log('display function called');
  const nameDiv = document.getElementById('shop-name');
  nameDiv.innerHTML = 'Shop name: ' + marker.name;

  const addressDiv = document.getElementById('shop-address');
  addressDiv.innerHTML = 'Address: ' + marker.address;

  const ratingDiv = document.getElementById('shop-rating');
  ratingDiv.innerHTML = 'Rating: ' + marker.rating;

  marker.setAnimation(google.maps.Animation.BOUNCE);
  setTimeout(function(){ marker.setAnimation(null); }, 1500);
}
    