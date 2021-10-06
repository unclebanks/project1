package com.servlet.project1;

public class CompletedClaim extends NewClaim {
	private String userName;
	private String claimType;
	private Double claimAmount;
	private String claimDesc;
	private String status;
	private Double fundedAmount;
	

	public CompletedClaim(String userName, String claimType, Double claimAmount, String ClaimDesc, String status, Double fundedAmount) {
		// TODO Auto-generated constructor stub
	}

    public CompletedClaim() {}
	
	
	
	public String getClaimType() {
		return claimType;
	}
	public void setClaimType(String claimType) {
		this.claimType = claimType;
	}
	public Double getClaimAmount() {
		return claimAmount;
	}
	public void setClaimAmount(Double claimAmount) {
		this.claimAmount = claimAmount;
	}
	public String getUsername() {
		return userName;
	}
	public void setUsername(String userName) {
		this.userName = userName;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public Double getFundedAmount() {
		return fundedAmount;
	}
	public void setFundedAmount(Double fundedAmount) {
		this.fundedAmount = fundedAmount;
	}
	public String getClaimDesc() {
		return claimDesc;
	}
	public void setClaimDesc(String claimDesc) {
		this.claimDesc = claimDesc;
	}

}
