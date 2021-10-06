package com.servlet.project1;

public class User extends TempCreds {

	public User(String username, String password) {
		super(username, password);
		// TODO Auto-generated constructor stub
	}
	public User() {}
	private String firstname;
	private String lastname;
	private String admin;
	private Double social;
	
	public String getFirstname() {
		return firstname;
	}
	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}
	public String getLastname() {
		return lastname;
	}
	public void setLastname(String lastname) {
		this.lastname = lastname;
	}
	public String getAdmin() {
		return admin;
	}
	public void setAdmin(String admin) {
		this.admin = admin;
	}
	public Double getSocial() {
		return social;
	}
	public void setSocial(Double social) {
		this.social = social;
	}

}
