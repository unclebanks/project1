package com.servlet.project1;

public class ApprovedClaim extends NewClaim {

	public ApprovedClaim(String userName, String claimType, Double claimAmount, String desc) {
		super(userName, claimType, claimAmount, desc);
		// TODO Auto-generated constructor stub
	}
	public ApprovedClaim() {}

	private String claimStatus;
	private Double approvedAmount;
	
	public String getClaimStatus() {
		return claimStatus;
	}
	public void setClaimStatus(String claimStatus) {
		this.claimStatus = claimStatus;
	}

	public Double getApprovedAmount() {
		return approvedAmount;
	}
	public void setApprovedAmount(Double approvedAmount) {
		this.approvedAmount = approvedAmount;
	}

}
