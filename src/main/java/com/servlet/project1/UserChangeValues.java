package com.servlet.project1;

public class UserChangeValues {

	private String username;
	private String catChange;
	private String newValue;
	
	public UserChangeValues(String username, String catChange, String newValue) {
		// TODO Auto-generated constructor stub
	}

	public UserChangeValues() {}
	
	
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getCatChange() {
		return catChange;
	}
	public void setCatChange(String catChange) {
		this.catChange = catChange;
	}
	public String getNewValue() {
		return newValue;
	}
	public void setNewValue(String newValue) {
		this.newValue = newValue;
	}
}
