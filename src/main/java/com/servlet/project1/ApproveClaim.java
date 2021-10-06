package com.servlet.project1;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * Servlet implementation class ApproveClaim
 */
public class ApproveClaim extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public ApproveClaim() {
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
	    ApprovedClaim aC = om.readValue(jsonString, ApprovedClaim.class);
	    String username = aC.getUserName();
	    String claimType = aC.getclaimType();
	    Double claimAmount = aC.getclaimAmount();
	    Double approvedAmount = aC.getApprovedAmount();
	    System.out.println(aC.getUserName());
	    String approvedClaim = JDBCSingleton.approveClaim(username, claimType, claimAmount, approvedAmount);
	    System.out.println("This is from the servlet "+approvedClaim);
		response.setContentType("text");     
		PrintWriter out = response.getWriter();
	   	out.print(approvedClaim);
	   	out.flush();
	}

}
