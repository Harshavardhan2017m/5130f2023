let map;
let service;
let infowindow;

function initMap() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const userLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            map = new google.maps.Map(document.getElementById('map'), {
                center: userLocation,
                zoom: 9,
            });
            infowindow = new google.maps.InfoWindow();
            const request = {
                location: userLocation,
                radius: '50000', // Search within 50 km
                keyword: 'beach'
            };
            service = new google.maps.places.PlacesService(map);
            service.nearbySearch(request, callback);
        }, function (error) {
            handleLocationError(true, error.message);
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, "Error: Your browser doesn't support geolocation.");
    }
}

function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        let listHTML = '';
        for (let i = 0; i < results.length; i++) {
            createMarker(results[i]);
            listHTML += `<li>${results[i].name}</li>`; // Add beach name to the list
        }
        document.getElementById('beachList').innerHTML = listHTML; // Update the list on the page
    } else {
        console.error('Places Service status:', status);
    }
}

function createMarker(place) {
    const marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
    });
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(place.name + '<br>Distance: ' + calculateDistance(place.geometry.location) + ' km');
        infowindow.open(map, this);
    });
}

function calculateDistance(beachLocation) {
    const userLocation = map.getCenter();
    return (google.maps.geometry.spherical.computeDistanceBetween(userLocation, beachLocation) / 1000).toFixed(2);
}

function handleLocationError(hasGeolocation, errorMessage) {
    alert(hasGeolocation ?
        errorMessage :
        "Error: Your browser doesn't support geolocation.");
}

// Uncomment the following line if you want the map to load automatically
// window.onload = initMap;
