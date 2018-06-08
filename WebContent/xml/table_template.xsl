<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
    xmlns:wd="http://www.w3schools.com/WeatherXML">
	<xsl:output method="html"/>
    <xsl:template match="wd:forecasts">
        <table class="table" id="resultsTable" style="width: 65%;">
            <thead class="thead-dark">
                <tr>
                    <th scope="col"> </th>
                    <xsl:for-each select="//wd:current/wd:city">
	                    <th scope="col">
	                        <xsl:value-of select="@name"/>, <xsl:value-of select="wd:country"/>
	                    </th>
                    </xsl:for-each>
                    
                </tr>
            </thead>

            <tr>
                <th scope="row">Temperature</th>
                <xsl:for-each select="//wd:current/wd:temperature">
                    <td> <xsl:value-of select="@value" />ºC (<xsl:value-of select="@min" />º min./<xsl:value-of select="@max" />º max.) </td>
                </xsl:for-each>
            </tr>
            <tr>
                <th scope="row">Humidity</th>
                <xsl:for-each select="//wd:current/wd:humidity">
                    <td> <xsl:value-of select="@value" />% </td>
                </xsl:for-each>
            </tr>
            <tr>
                <th scope="row">Forecast</th>
                <xsl:for-each select="//wd:current/wd:weather">
                    <td> <xsl:value-of select="@value" /> <img src="http://openweathermap.org/img/w/{@icon}.png"/> </td>
                </xsl:for-each>
            </tr>
        </table>
        <button><a href="#" id="saver" onclick="saveXMLFile();">Save XML</a></button>
    </xsl:template>

</xsl:stylesheet>