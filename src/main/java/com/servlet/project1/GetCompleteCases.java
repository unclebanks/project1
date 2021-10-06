package com.servlet.project1;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * Servlet implementation class GetCompleteCases
 */
public class GetCompleteCases extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public GetCompleteCases() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		System.out.println("Made it to complete--------------------------");
	    String jsonString = request.getReader().readLine();
	    ObjectMapper om = new ObjectMapper();
	    PendingClaim pC = om.readValue(jsonString, PendingClaim.class);
	    System.out.println(pC.getClaimRequestor());
	    String username = pC.getClaimRequestor();
	    String completeClaim = JDBCSingleton.completeClaims(username);
		response.setContentType("application/json");     
		PrintWriter out = response.getWriter();
	   	out.print(completeClaim);
	   	out.flush();
	}

}
