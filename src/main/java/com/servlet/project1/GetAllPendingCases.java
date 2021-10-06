package com.servlet.project1;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * Servlet implementation class GetAllPendingCases
 */
public class GetAllPendingCases extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public GetAllPendingCases() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String dbToParse;
		System.out.println("Made it to get all pending");
	    String jsonString = request.getReader().readLine();
	    ObjectMapper om = new ObjectMapper();
	    PendingClaim pC = om.readValue(jsonString, PendingClaim.class);
	    String claimType = pC.getClaimType();
	    System.out.println(claimType);
	    if (claimType.equals("PEND")) { dbToParse = "TYLER_DB.OPENREQ"; }
	    else { dbToParse = "TYLER_DB.CLOSEDREQ"; }
	    String pendingClaim = JDBCSingleton.allPendingClaims(dbToParse);
		response.setContentType("application/json");     
		PrintWriter out = response.getWriter();
	   	out.print(pendingClaim);
	   	out.flush();
	}

}
