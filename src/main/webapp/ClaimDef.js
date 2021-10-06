export default class ClaimDef {
	constructor(tempUser) {
		this.userName = tempUser.userName;
		this.claimType = tempUser.claimType;
		this.claimAmount = tempUser.claimAmount;
		this.desc = tempUser.desc;
	}
}