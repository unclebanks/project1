package com.servlet.project1;

public class NewClaim {
	private String claimType;
	private Double claimAmount;
	private String userName;
	private String desc;


	public NewClaim(String userName, String claimType, Double claimAmount, String desc) {
		// TODO Auto-generated constructor stub
	}

    public NewClaim() {}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public Double getclaimAmount() {
		return claimAmount;
	}

	public void setclaimAmount(Double claimAmount) {
		this.claimAmount = claimAmount;
	}

	public String getclaimType() {
		return claimType;
	}

	public void setclaimType(String claimType) {
		this.claimType = claimType;
	}

	public String getDesc() {
		return desc;
	}

	public void setDesc(String desc) {
		this.desc = desc;
	}   
}
