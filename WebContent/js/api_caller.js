var APPID = '43398a1072dabcf216413b65510d9e8e';

var api_url;

function getXMLForecast(city, isFirst) {
    api_url = 'http://api.openweathermap.org/data/2.5/weather';
    $.ajax({
        url: api_url,
        data: {
        	q: city,
        	mode: "xml",
        	units: "metric",
        	appid: APPID,
        },
        type: 'GET',
        success: function(data){
            setForecasts(data, isFirst);
            updateTable();
        },
        error: function(data) {
            alert("There has been an error with request. Maybe a network issue or a non-existent city.");
        }
    });
}

function loadXMLDoc(dname)
{
   if (window.XMLHttpRequest)
     {
         xhttp=new XMLHttpRequest();
     }
   else
     {
         xhttp=new ActiveXObject("Microsoft.XMLHTTP");
     }
   xhttp.open("GET",dname,false);
   xhttp.send("");
   return xhttp.responseXML;
}

