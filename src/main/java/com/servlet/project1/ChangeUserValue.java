package com.servlet.project1;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * Servlet implementation class ChangeUserValue
 */
public class ChangeUserValue extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public ChangeUserValue() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("Made it to change user value servlet");
	    String jsonString = request.getReader().readLine();
	    ObjectMapper om = new ObjectMapper();
	    UserChangeValues l = om.readValue(jsonString, UserChangeValues.class);
	    String username = l.getUsername();
	    String catChange = l.getCatChange();
	    String newValue = l.getNewValue();
	    String login = JDBCSingleton.replaceUserValue(username,catChange,newValue);
	   	if(login == "failure") {
		    response.setContentType("text");     
		   	PrintWriter out = response.getWriter();
		   	out.print(login);
		   	out.flush();
	   	} else {
		    response.setContentType("text");     
		   	PrintWriter out = response.getWriter();
		   	out.print(login);
		   	out.flush();}
	}
}
