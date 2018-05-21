package mcmt.forecast.servlets;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Random;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.parsers.SAXParser;
import javax.xml.parsers.SAXParserFactory;


import org.xml.sax.InputSource;
import org.xml.sax.SAXException;
import org.xml.sax.SAXNotRecognizedException;
import org.xml.sax.XMLReader;

/**
 * Servlet implementation class XMLValidationServlet
 */
@WebServlet("/XMLValidationServlet")
public class XMLValidationServlet extends HttpServlet {
	
	static final String JAXP_SCHEMA_LANGUAGE =
	        "http://java.sun.com/xml/jaxp/properties/schemaLanguage";
	    
	static final String W3C_XML_SCHEMA =
	        "http://www.w3.org/2001/XMLSchema";

	static final String JAXP_SCHEMA_SOURCE =
	        "http://java.sun.com/xml/jaxp/properties/schemaSource";
	static final String XSD_FILE_SOURCE = 
			"C:\\Users\\sergi\\git\\WeatherForecastXML\\WebContent\\xml\\schema.xsd";
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public XMLValidationServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		System.out.println("The request arrived to the servlet.");
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("The request arrived to the servlet.");
//		System.out.println("XML: " + request.getParameter("xml"));
		String xmlContent = request.getParameter("xml");
		SAXParserFactory spf = SAXParserFactory.newInstance();
		spf.setNamespaceAware(true);
		spf.setValidating(true);
		File tmp = null;
		try {
			Random r = new Random(50000000);
			tmp = new File("tmpXmlForecast" + r.nextInt() + "_tmp.xml");
			PrintWriter writer = new PrintWriter(tmp);
			writer.print(xmlContent);
			writer.close();
			
			SAXParser parser = spf.newSAXParser();
			parser.setProperty(JAXP_SCHEMA_LANGUAGE, W3C_XML_SCHEMA);
			parser.setProperty(JAXP_SCHEMA_SOURCE, new File(XSD_FILE_SOURCE));
			XMLReader reader = parser.getXMLReader();
			reader.parse(new InputSource(tmp.getAbsolutePath()));
			
		} catch (ParserConfigurationException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (SAXNotRecognizedException x){
	        System.err.println("Error: JAXP SAXParser property not recognized: "
                    + JAXP_SCHEMA_LANGUAGE);
			 System.err.println( "Check to see if parser conforms to the JAXP spec.");
		} catch (SAXException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			if (tmp != null)
				tmp.delete();
			response.getOutputStream().write("valid".getBytes());
		}
		System.out.println("XML has been validated successfully without errors.");
	}

}
