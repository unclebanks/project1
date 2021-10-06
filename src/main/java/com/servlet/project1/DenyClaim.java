package com.servlet.project1;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * Servlet implementation class DenyClaim
 */
public class DenyClaim extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public DenyClaim() {
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
	    NewClaim aC = om.readValue(jsonString, NewClaim.class);
	    String username = aC.getUserName();
	    String claimType = aC.getclaimType();
	    Double claimAmount = aC.getclaimAmount();
	    System.out.println(aC.getUserName());
	    String deniedClaim = JDBCSingleton.denyClaim(username, claimType, claimAmount);
	    System.out.println("This is from the servlet "+deniedClaim);
		response.setContentType("text");     
		PrintWriter out = response.getWriter();
	   	out.print(deniedClaim);
	   	out.flush();
	}

}
