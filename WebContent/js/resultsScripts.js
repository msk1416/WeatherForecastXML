function callForecastApi(city1, city2) {
	resetForecasts();
    getXMLForecast(city1, true);
    getXMLForecast(city2, false);
}
var forecast1;
var forecast2;
var city1;
var city2;
var currentXML;

$(document).ready(function() { 
	$("#city1").on('keyup', function (e) {
	    if (e.keyCode == 13) {
	        $("#btnCompare").trigger("click");
	    }
	});
	$("#city2").on('keyup', function (e) {
	    if (e.keyCode == 13) {
	        $("#btnCompare").trigger("click");
	    }
	});
});

function resetForecasts(){
	forecast1 = null;
	forecast2 = null;
}

function setForecasts(fc, isFirstForecast) {
    if (isFirstForecast) {
        forecast1 = fc;
    } else {
        forecast2 = fc;
    }

}

function updateTable() {
    if (forecast1 && forecast2) {
        //run xpath and xslt against xmlDoc element
        var xmlDoc = document.implementation.createDocument(null, "forecasts");
        xmlDoc.documentElement.setAttribute("xmlns", "http://www.w3schools.com/WeatherXML");
        xmlDoc.documentElement.append(forecast1.documentElement.cloneNode(true));
        xmlDoc.documentElement.append(forecast2.documentElement.cloneNode(true));
        currentXML = xmlDoc;
        validate(currentXML);
        applyStyles(xmlDoc);

        $('#resultsTable')[0].style.display = 'table';
    }
}


function applyStyles(xml) {
    var xsl = document.implementation.createDocument("","",null);
    xsl = loadXMLDoc("xml/table_template.xsl");

    xsltProcessor = new XSLTProcessor();
    xsltProcessor.importStylesheet(xsl);
    resultDocument = xsltProcessor.transformToFragment(xml, document);
    document.getElementById("compareResults").innerHTML = "";
    document.getElementById("compareResults").appendChild(resultDocument);

}

function saveXMLFile() {
	var file = new Blob([getXMLFullText(currentXML)], {type: "text/xml"});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        city1 = forecast1.children[0].querySelector("city").getAttribute("name");
        city2 = forecast2.children[0].querySelector("city").getAttribute("name");
        var filename = city1 + "_" + city2 + ".xml";
        a.download = filename.split(' ').join('');
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}

function getXMLFullText(xml) {
	var xmlHeader = '<?xml version="1.0" encoding="UTF-8"?><forecasts xmlns="http://www.w3schools.com/WeatherXML">';
	return xmlHeader + xml.documentElement.innerHTML + "</forecasts>";
}

function validate(xml) {
    var res = $.post("/WeatherComp/XMLValidationServlet", { xml: getXMLFullText(xml) }, function(responseText) {
    	if(responseText != "valid") {
    		alert("Some error happened while validating the xml file.");
    	} else {
    		console.log("%cXML file has been successfully validated.", "color: green;");

    	}
    } );
}
