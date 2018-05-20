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

import org.jdom2.Document;
import org.jdom2.JDOMException;
import org.jdom2.input.SAXBuilder;
import org.jdom2.input.sax.XMLReaders;

/**
 * Servlet implementation class ValidateXML
 */
@WebServlet("/ValidateXML")
public class ValidateXML extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public ValidateXML() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String xmlContent = request.getParameter("xml");
		try {
			Random r = new Random(50000000);
//			File tmp = File.createTempFile("tmpXmlForecast" + r.nextInt() + "_tmp", ".xml");
			File tmp = new File("C:\\Windows\\Temp\\" + "tmpXmlForecast" + r.nextInt() + "_tmp.xml");
			PrintWriter writer = new PrintWriter(tmp);
			writer.print(xmlContent);
			writer.close();
			SAXBuilder builder = new SAXBuilder(XMLReaders.XSDVALIDATING);
			Document doc = builder.build(tmp);
		} catch (IOException e) {
			e.printStackTrace();
		} catch (JDOMException e) {
			e.printStackTrace();
		}
	}

}
