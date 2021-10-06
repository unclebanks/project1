package com.servlet.project1;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;


public class JDBCSingleton {

	private static Connection conn = JDBCOneTime.getConn();
    static String valueSought = "none";

	
	public static String checkLogin(String username, String password2) {	    
		try {
			Statement stmt=conn.createStatement();
			ResultSet rs = stmt.executeQuery("Select * from TYLER_DB.P1USERS WHERE USERNAME = '"+username+"'");
			while(rs.next()) {
				if (rs.getString(2).equals(password2)) {
					User u = new User();
					u.setUsername(username);
					u.setPassword(password2);
					u.setFirstname(rs.getString(3));
					u.setLastname(rs.getString(4));
					u.setSocial(rs.getDouble(5));
					u.setAdmin(rs.getString(6));
					ObjectMapper obMap = new ObjectMapper();
					String userAccount = null;
					try {
						userAccount = obMap.writeValueAsString(u);
					} catch (JsonProcessingException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
					valueSought = userAccount;
				} else {valueSought = "incorrect";}
			}
		}
		catch (SQLException e) {
		// TODO Auto-generated catch block
			e.printStackTrace();
			valueSought = "sql error catch";
		}
		return valueSought;
	}
	public static String replaceUserValue(String username,String catChange, String newValue) {	    
		try {
			Statement stmt=conn.createStatement();
			ResultSet rs = stmt.executeQuery("Select * from TYLER_DB.P1USERS WHERE USERNAME = '"+username+"'");
			if (rs.next()) {
				System.out.println("User found, updating.");
				stmt.executeUpdate("UPDATE TYLER_DB.P1USERS SET "+catChange+" = '"+newValue+"' WHERE USERNAME = '"+username+"' ");
				System.out.println("Finished updating.\nReturning to main menu");
				valueSought = "Successfully updated "+catChange+" to "+newValue;
				} else {valueSought="failure";}
		}
		catch (SQLException e) {
		// TODO Auto-generated catch block
			e.printStackTrace();
			valueSought = "sql error catch";
		}
		return valueSought;
	}
	public static String retrieveUser(String username) {	    
		try {
			Statement stmt=conn.createStatement();
			ResultSet rs = stmt.executeQuery("Select * from TYLER_DB.P1USERS WHERE USERNAME = '"+username+"'");
			while(rs.next()) {
					User u = new User();
					u.setUsername(username);
					u.setPassword(rs.getString(2));
					u.setFirstname(rs.getString(3));
					u.setLastname(rs.getString(4));
					u.setSocial(rs.getDouble(5));
					u.setAdmin(rs.getString(6));
					ObjectMapper obMap = new ObjectMapper();
					String userAccount = null;
					try {
						userAccount = obMap.writeValueAsString(u);
					} catch (JsonProcessingException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
					valueSought = userAccount;
				}
		}
		catch (SQLException e) {
		// TODO Auto-generated catch block
			e.printStackTrace();
			valueSought = "sql error catch";
		}
		return valueSought;
	}
	public static String createClaim(String username, String claimType, Double claimAmount, String desc) {
		String operationResult = "failure";
		try {
			Statement stmt=conn.createStatement();
			stmt.executeUpdate("INSERT INTO TYLER_DB.OPENREQ VALUES ('"+username+"','"+claimType+"','"+claimAmount+"','"+desc+"')");
			operationResult = "success";
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return operationResult;
		
	}
	public static String approveClaim(String username, String claimType, Double claimAmount, Double approvalAmount) {
		String operationResult = "failure";
		try {
			Statement stmt=conn.createStatement();
			Statement stmt2=conn.createStatement();
			ResultSet rs = stmt.executeQuery("Select * from TYLER_DB.OPENREQ WHERE USERNAME = '"+username+"' AND TYPE = '"+claimType+"' AND AMOUNT = '"+claimAmount+"'"); //
			if (rs.next()) {
				stmt2.executeUpdate("INSERT INTO TYLER_DB.CLOSEDREQ (USERNAME, TYPE, AMOUNT, DESCRIPTION, STATUS, FUNDED) VALUES ('"+rs.getString(1)+"','"+rs.getString(2)+"',"+rs.getDouble(3)+",'"+rs.getString(4)+"', 'APPROVED', "+approvalAmount+")");
				stmt.executeUpdate("DELETE FROM TYLER_DB.OPENREQ WHERE USERNAME = '"+username+"' AND TYPE = '"+claimType+"' AND AMOUNT = '"+claimAmount+"'");
			}
			operationResult = "success";
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return operationResult;
		
	}
	public static String denyClaim(String username, String claimType, Double claimAmount) {
		String operationResult = "failure";
		try {
			Statement stmt=conn.createStatement();
			Statement stmt2=conn.createStatement();
			ResultSet rs = stmt.executeQuery("Select * from TYLER_DB.OPENREQ WHERE USERNAME = '"+username+"' AND TYPE = '"+claimType+"' AND AMOUNT = '"+claimAmount+"'"); //
			if (rs.next()) {
				stmt2.executeUpdate("INSERT INTO TYLER_DB.CLOSEDREQ (USERNAME, TYPE, AMOUNT, DESCRIPTION, STATUS, FUNDED) VALUES ('"+rs.getString(1)+"','"+rs.getString(2)+"',"+rs.getDouble(3)+",'"+rs.getString(4)+"', 'DENIED', 0)");
				stmt.executeUpdate("DELETE FROM TYLER_DB.OPENREQ WHERE USERNAME = '"+username+"' AND TYPE = '"+claimType+"' AND AMOUNT = '"+claimAmount+"'");
			}
			operationResult = "success";
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return operationResult;
		
	}
	public static String pendingClaims(String username) {
		List<NewClaim> returnClaims = new ArrayList<NewClaim>();
		String finalList = "";
		System.out.println("Made it to generate list------------------");
		try {
			System.out.println("Made it to search for claim----------------------");
			Statement stmt=conn.createStatement();
			ResultSet rs = stmt.executeQuery("Select * from TYLER_DB.OPENREQ WHERE USERNAME = '"+username+"'");
			while (rs.next()) {
				System.out.println("there is a next------------------");
				NewClaim nClaim = new NewClaim();
				nClaim.setUserName(rs.getString(1));
				nClaim.setclaimType(rs.getString(2));
				nClaim.setclaimAmount(rs.getDouble(3));
				nClaim.setDesc(rs.getString(4));
				returnClaims.add(nClaim);
			}
			ObjectMapper obMap = new ObjectMapper();
			try {
				finalList = obMap.writeValueAsString(returnClaims);
				System.out.println(finalList);
			} catch (JsonProcessingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return finalList;
		
	}
	public static String allPendingClaims(String dbToParse) {
		List<NewClaim> returnClaims = new ArrayList<NewClaim>();
		String finalList = "";
		System.out.println("Made it to generate list------------------");
		try {
			System.out.println("Made it to search for claim----------------------");
			Statement stmt=conn.createStatement();
			ResultSet rs = stmt.executeQuery("Select * from "+dbToParse+"");
			if (dbToParse.equals("TYLER_DB.OPENREQ")) {
				while (rs.next()) {
					System.out.println("there is a next------------------");
					NewClaim nClaim = new NewClaim();
					nClaim.setUserName(rs.getString(1));
					nClaim.setclaimType(rs.getString(2));
					nClaim.setclaimAmount(rs.getDouble(3));
					nClaim.setDesc(rs.getString(4));
					returnClaims.add(nClaim);
				}
			} else {
				while (rs.next()) {
					System.out.println("there is a next------------------");
					CompletedClaim cClaim = new CompletedClaim();
					cClaim.setUsername(rs.getString(1));
					cClaim.setClaimType(rs.getString(2));
					cClaim.setClaimAmount(rs.getDouble(3));
					cClaim.setClaimDesc(rs.getString(4));
					cClaim.setStatus(rs.getString(5));
					cClaim.setFundedAmount(rs.getDouble(6));
					returnClaims.add(cClaim);
				}
			}
			ObjectMapper obMap = new ObjectMapper();
			try {
				finalList = obMap.writeValueAsString(returnClaims);
				System.out.println(finalList);
			} catch (JsonProcessingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return finalList;
		
	}
	public static String completeClaims(String username) {
		List<CompletedClaim> returnClaims = new ArrayList<CompletedClaim>();
		String finalList = "";
		System.out.println("Made it to generate complete list------------------");
		try {
			System.out.println("Made it to search for complete claims----------------------");
			Statement stmt=conn.createStatement();
			ResultSet rs = stmt.executeQuery("Select * from TYLER_DB.CLOSEDREQ WHERE USERNAME = '"+username+"'");
			while (rs.next()) {
				System.out.println("there is a next------------------");
				CompletedClaim cClaim = new CompletedClaim();
				cClaim.setUsername(rs.getString(1));
				cClaim.setClaimType(rs.getString(2));
				cClaim.setClaimAmount(rs.getDouble(3));
				cClaim.setClaimDesc(rs.getString(4));
				cClaim.setStatus(rs.getString(5));
				cClaim.setFundedAmount(rs.getDouble(6));
				returnClaims.add(cClaim);
			}
			ObjectMapper obMap = new ObjectMapper();
			try {
				finalList = obMap.writeValueAsString(returnClaims);
				System.out.println("finalListstuff"+finalList);
			} catch (JsonProcessingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return finalList;
		
	}
}
