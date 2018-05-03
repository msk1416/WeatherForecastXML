<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:template match="forecasts">
        <table class="table" id="resultsTable" style="width: 65%; display: none;">
            <thead class="thead-dark">
                <tr>
                    <th scope="col"> </th>
                    <th scope="col">
                        <xsl:value-of select="string(//current[1]/city/@name)"/>
                    </th>
                    <th scope="col">
                        <xsl:value-of select="string(//current[2]/city/@name)"/>
                    </th>
                </tr>
            </thead>

            <tr>
                <th scope="row">Temperature</th>
                <xsl:for-each select="//current/temperature">
                    <td> <xsl:value-of select="string(@value)" /> </td>
                </xsl:for-each>
            </tr>
            <tr>
                <th scope="row">Humidity</th>
                <xsl:for-each select="//current/humidity">
                    <td> <xsl:value-of select="string(@value)" /> </td>
                </xsl:for-each>
            </tr>
            <tr>
                <th scope="row">Sky</th>
                <xsl:for-each select="//current/weather">
                    <td> <xsl:value-of select="string(@value)" /> </td>
                </xsl:for-each>
            </tr>
        </table>
    </xsl:template>

</xsl:stylesheet>