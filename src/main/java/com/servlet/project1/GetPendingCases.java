package com.servlet.project1;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * Servlet implementation class GetPendingCases
 */
public class GetPendingCases extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public GetPendingCases() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		System.out.println("Made it to pending");
	    String jsonString = request.getReader().readLine();
	    ObjectMapper om = new ObjectMapper();
	    PendingClaim pC = om.readValue(jsonString, PendingClaim.class);
	    String username = pC.getClaimRequestor();
	    System.out.println(pC.getClaimRequestor());
	    String pendingClaim = JDBCSingleton.pendingClaims(username);
	    System.out.println("This is from the servlet "+pendingClaim);
		response.setContentType("application/json");     
		PrintWriter out = response.getWriter();
	   	out.print(pendingClaim);
	   	out.flush();
	}

}
