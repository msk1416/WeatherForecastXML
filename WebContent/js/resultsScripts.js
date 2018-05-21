
function callForecastApi(city1, city2) {
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
        xmlDoc.documentElement.setAttribute("xmlns", "http://www.w3schools.com/RedsDevils/WeatherXML");
        xmlDoc.documentElement.setAttribute("xmlns:xsi", "http://www.w3.org/2001/XMLSchema-instance");
        xmlDoc.documentElement.setAttribute("xsi:schemaLocation", "http://www.w3schools.com/RedsDevils/WeatherXML ../xml/schema.xsd");
        xmlDoc.documentElement.append(forecast1.documentElement.cloneNode(true));
        xmlDoc.documentElement.append(forecast2.documentElement.cloneNode(true));
        currentXML = xmlDoc;
        //validateXMLAgainstSchema(xmlDoc);
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
        a.download = $("#city1Name")[0].innerHTML + "_" + $("#city2Name")[0].innerHTML + ".xml";
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}

function getXMLFullText(xml) {
	var xmlHeader = '<?xml version="1.0" encoding="UTF-8"?><forecasts xmlns="http://www.w3schools.com/RedsDevils/WeatherXML" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">';
	return xmlHeader + xml.documentElement.innerHTML + "</forecasts>";
}
function validate(xml) {
    var res = $.post("/WeatherComp/XMLValidationServlet", { xml: getXMLFullText(xml) }, function(responseText) {
    	if(responseText != "valid") {
    		alert("Some error happened while validating the xml file.");
    	} else {
    		console.log("XML file has been successfully validated.");
    	}
    } );
}
