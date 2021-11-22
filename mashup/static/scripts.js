// Google Map
 var mymap = L.map('map-canvas').setView([51.505,-0.09],7).on("drag",function(){removeMarkers();}).on("dragend", function(){update();})


L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
maxZoom: 18,
id: 'mapbox.streets',
accessToken: 'pk.eyJ1Ijoib3JsYW5kbzU2IiwiYSI6ImNrMWwyNWVldjAwankzZXBjaDVzM3hyeGIifQ.1RZa0To9OyDloNRP64Jp_A'
 }).addTo(mymap)


function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

// Markers for map
let markers = [];
var div ="";

// Execute when the DOM is fully loaded
$(document).ready(function() {

    configure();

});


// Add marker for place to map
function addMarker(place)
{
    content = "<ul>"
    $.ajax({
	url: '/articles?geo=' + place.postal_code,
	success: function(respuesta) {
	for(let i = 0; i < respuesta.length; i++){
	    content += "<li> <a href='" + respuesta[i].link +"' target = '_blank'>" + respuesta[i].title + "</a></li>"
	}
	var map = L.marker([place.latitude,place.longitude], {
    title: "hola, mundo",
    draggable:true,
    opacity: 0.75
    }).bindPopup(content)
//layer.bindPopup(popupContent);")
    .addTo(mymap);


    //for(let j = 0; j < array.length; j++){
        //addMarker(array[j]);
	},
	error: function() {
        console.log("No se ha podido obtener la información");
    }
});
    content += "</ul>"



}

// Configure application
function configure()
{

    // Configure typeahead
    $("#q").typeahead({
        highlight: false,
        minLength: 1
    },
    {
        display: function(suggestion) { return null; },
        limit: 10,
        source: search,
        templates: {
            suggestion: Handlebars.compile(
                "<div>{{place_name}}</div>"
            )
        }
    });

    // Re-center map after place is selected from drop-down
    $("#q").on("typeahead:selected", function(eventObject, suggestion, name) {

        // Set map's center
        mymap.setView([parseFloat(suggestion.latitude), parseFloat(suggestion.longitude)]);

        // Update UI
        update();
    });


    // Re-enable ctrl- and right-clicking (and thus Inspect Element) on Google Map
    // https://chrome.google.com/webstore/detail/allow-right-click/hompjdfbfmmmgflfjdlnkohcplmboaeo?hl=en
    document.addEventListener("contextmenu", function(event) {
        event.returnValue = true;
        event.stopPropagation && event.stopPropagation();
      //  event.cancelBubble && event.cancelBubble();
    }, true);

    // Update UI
    update();

    // Give focus to text box
    $("#q").focus();
}


// Remove markers from map
function removeMarkers()
{
    for(let i = 0; i < markers.length; i++){
        markers[i].remove();
    }

}


// Search database for typeahead's suggestions
function search(query, syncResults, asyncResults)
{
    // Get places matching query (asynchronously)
    let parameters = {
        q: query
    };
    $.getJSON("/search", parameters, function(data, textStatus, jqXHR) {

        // Call typeahead's callback with search results (i.e., places)
        asyncResults(data);
        console.log(data);
    });
}


// Show info window at marker with content
function showInfo(geo)
{
    // Start div
    div = "<div id='info'>";
    if (typeof(content) == "undefined")
    {
        // http://www.ajaxload.info/
        div += "<img alt='loading' src='/static/ajax-loader.gif'/>";
    }

    for(let i = 0; i < array.length; i++){
        addMarker(array[i]);
    }
    // End div
    div += "</div>";

    $.when($.getJSON("/articles?geo="+geo,  function( data ){
        div = data[0]['title'];
        console.log(data);
        } )).then(function(){ return div;});



}


// Update UI's markers
function update()
{

    // Get map's bounds
    let bounds = mymap.getBounds();
    let ne = bounds.getNorthEast();
    let sw = bounds.getSouthWest();
    // Get places within bounds (asynchronously)
    let parameters = {
        ne: `${ne.lat},${ne.lng}`,
        q: $("#q").val(),
        sw: `${sw.lat},${sw.lng}`
    };
    $.getJSON("/update", parameters, function(data, textStatus, jqXHR) {

       // Remove old markers from map
        removeMarkers();

       // Add new markers to map
       for (let i = 0; i < data.length; i++)
       {
           addMarker(data[i]);
       }
    });
};
