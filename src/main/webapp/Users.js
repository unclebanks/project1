export default class Users {
	constructor(tempUser) {
		this.first = tempUser.firstname;
		this.last = tempUser.lastname;
		this.username = tempUser.username;
		this.password = tempUser.password;
		this.social = tempUser.social;
		this.admin = tempUser.admin;
		
	}
}