package com.servlet.project1;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * Servlet implementation class CreateClaim
 */
public class CreateClaim extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public CreateClaim() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stubSystem.out.println("Made it to do post");
	    String jsonString = request.getReader().readLine();
	    ObjectMapper om = new ObjectMapper();
	    NewClaim nC = om.readValue(jsonString, NewClaim.class);
	    String username = nC.getUserName();
	    String claimType = nC.getclaimType();
	    Double claimAmount = nC.getclaimAmount();
	    String claimDesc = nC.getDesc();
	    String createClaim = JDBCSingleton.createClaim(username,claimType,claimAmount,claimDesc);
		response.setContentType("text");     
		PrintWriter out = response.getWriter();
	   	out.print(createClaim);
	   	out.flush();
	}

}
