var APPID = '43398a1072dabcf216413b65510d9e8e';
var CITY_BCN = 'Barcelona,es';
var CITY_LODZ = 'Lodz,pl';
var CITY_TALLINN = 'Tallinn,ee';
var CITY_ATHNS = 'Athens,gr';
var CITY_GLASGOW = 'Glasgow,uk';

var api_url;/* = 'http://api.openweathermap.org/data/2.5/weather?q=' + CITY_BCN + '&mode=xml&units=metric&appid=' + APPID;

$.get(api_url, function(xml) {
    console.log(xml);
});



api_url = 'http://api.openweathermap.org/data/2.5/weather?q=' + CITY_GLASGOW + '&mode=xml&units=metric&appid=' + APPID;

$.get(api_url, function(xml) {
    console.log(xml);
});
*/
function getXMLForecast(city, isFirst) {
    api_url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&mode=xml&units=metric&appid=' + APPID;
    $.ajax({
        url: api_url,
        type: 'GET',
        success: function(data){
            setForecasts(data, isFirst);
            updateTable();
        },
        error: function(data) {
            alert("One of inserted cities could not be found.");
        }
    });
}

