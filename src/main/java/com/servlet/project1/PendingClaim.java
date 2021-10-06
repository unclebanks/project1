package com.servlet.project1;

public class PendingClaim {
	private String claimRequestor;
	private String claimType;

	public PendingClaim(String claimRequestor, String claimType) {
		// TODO Auto-generated constructor stub
	}

    public PendingClaim() {}
	public String getClaimRequestor() {
		return claimRequestor;
	}
	public void setClaimRequestor(String claimRequestor) {
		this.claimRequestor = claimRequestor;
	}
	public String getClaimType() {
		return claimType;
	}
	public void setClaimType(String claimType) {
		this.claimType = claimType;
	}
}
