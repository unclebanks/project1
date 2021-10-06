package com.servlet.project1;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * Servlet implementation class LoginServlet
 */
public class LoginServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public LoginServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("Made it to login servlet");
	    String jsonString = request.getReader().readLine();
	    ObjectMapper om = new ObjectMapper();
	    TempCreds l = om.readValue(jsonString, TempCreds.class);
	    String username = l.getUsername();
	    String password = l.getPassword();
	    String login = JDBCSingleton.checkLogin(username,password);
	   	if(login == "incorrect") {
		    response.setContentType("text");     
		   	PrintWriter out = response.getWriter();
		   	out.print(login);
		   	out.flush();
	   	} else {
		    response.setContentType("application/json");     
		   	PrintWriter out = response.getWriter();
		   	out.print(login);
		   	out.flush();}
	}
}
