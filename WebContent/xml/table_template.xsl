<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:template match="forecasts">
        <table class="table" id="resultsTable" style="width: 65%;">
            <thead class="thead-dark">
                <tr>
                    <th scope="col"> </th>
                    <th scope="col" id="city1Name">
                        <xsl:value-of select="string(//current[1]/city/@name)"/>
                    </th>
                    <th scope="col" id="city2Name">
                        <xsl:value-of select="string(//current[2]/city/@name)"/>
                    </th>
                </tr>
            </thead>

            <tr>
                <th scope="row">Temperature</th>
                <xsl:for-each select="//current/temperature">
                    <td> <xsl:value-of select="string(@value)" />ºC (<xsl:value-of select="string(@min)" />º min./<xsl:value-of select="string(@max)" />º max.) </td>
                </xsl:for-each>
            </tr>
            <tr>
                <th scope="row">Humidity</th>
                <xsl:for-each select="//current/humidity">
                    <td> <xsl:value-of select="string(@value)" />% </td>
                </xsl:for-each>
            </tr>
            <tr>
                <th scope="row">Sky</th>
                <xsl:for-each select="//current/weather">
                    <td> <xsl:value-of select="string(@value)" /> <img src="http://openweathermap.org/img/w/{string(@icon)}.png"/> </td>
                </xsl:for-each>
            </tr>
        </table>
        <button><a href="#" id="saver" onclick="saveXMLFile();">Save XML</a></button>
    </xsl:template>

</xsl:stylesheet>