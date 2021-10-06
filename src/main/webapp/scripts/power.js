let pageNumber = 0;
let claimsPage = 0;
let viewPage = 0;
let breaker = document.createElement('br');
let tempUser;
let manager = "u";
let timeOutBandAid = 0;
let cTyppy = "";
let uNammy = "";
let cAmmy = "";

function login() {
	let uName = document.getElementById('uNameForm').value;
	let pWord = document.getElementById('pWordForm').value;
	let url = "LoginServlet";
	let userCreds = {
        username: uName,
        password: pWord
    }
    let options = {
        method: 'POST',
        headers: {"content-type":'application/json'},
        body: JSON.stringify(userCreds)
    }
	console.log(JSON.stringify(userCreds));
	fetch(url, options)
	.then(res => {return res.text()})
	.then(function(res){
		const craig = JSON.parse(res);
		if(res == 'incorrect') {
			alert("wrong pass");
		} else {
			tempUser = new Users(craig);
			console.log(tempUser);
			console.log(tempUser.username);
			if(tempUser.admin === "m") {
				manager = "m";
			}
			if(!localStorage.getItem('P1UN') || localStorage.getItem('P1UN') != tempUser.username) {
				localStorage.setItem('P1UN', tempUser.username);
				console.log('set temp data');
			}
			console.log(tempUser.admin)
			renderUserMainPage();
		}
	});
}
function checkAdmin() {
	if (manager === "m") {
		return true;
	} else { return false; }
}
function submitNewClaim() {
			var claimType = document.getElementById('newClaimFormSelector').value;
			var claimAmount = document.getElementById('newClaimFormAmount').value;
			var username = localStorage.getItem('P1UN');
			let url = "CreateClaim";
			let newClaim = {
        		claimAmount: claimAmount,
        		claimType: claimType,
				userName: username
    		}
    		let options = {
        		method: 'POST',
        		headers: {"content-type":'application/json'},
        		body: JSON.stringify(newClaim)
    		}
			console.log(JSON.stringify(newClaim));
			fetch(url, options)
			.then(res => {return res.text()})
			.then(function(res){
				if(res == 'failure') {
					alert("Somewhere the process has failed. Please try again later or contact a system administrator.");
				} else if (res == 'success') {
					alert('Claim has successfully been created and submitted. You can check the status of it at any time by clicking the corresponding tab.')
				}
			});
}
function renderPage() {
    var userDiv = document.createElement('div');
    var userGrid = document.createElement('div');
    var userBody = document.createElement('div');
    userDiv.setAttribute("id","userDiv");
    userGrid.setAttribute("id","userGrid");
    userBody.setAttribute("id","userBody");
    document.getElementById('body').appendChild(userGrid);
    document.getElementById('userGrid').appendChild(userDiv);
    document.getElementById('userDiv').appendChild(userBody);
	renderFooter();
	renderHomePageBody();
}
function renderHomePageBody() {
	var homePageBody = document.getElementById('userBody');
	var homePageBodyHeader = document.createElement('h1');
	var homePageBodyParagraph = document.createElement('p')
	homePageBodyHeader.setAttribute("id", "homePageBodyHeader");
	homePageBodyHeader.innerHTML = "Welcome To The Home Page";
	homePageBodyParagraph.setAttribute("id", "homePageBodyParagraph");
	homePageBodyParagraph.innerHTML = "Please select a button from the navigational bar to go to the desired page.";
	homePageBody.appendChild(homePageBodyHeader);
	homePageBody.appendChild(homePageBodyParagraph);
}
function setAtts(item,type, data) {
	item.setAttribute(type,data);
}
function appendContent(parent,child) {
	document.getElementById(parent).appendChild(child);
}
function createEls(name, type) {
	var name = document.createElement(type);
	return name;
}
function homeButton() {
    alert('Home button function needed here');
}
function button3() {
	hideUserMainPage();
	renderToolBar();
	var button3 = document.getElementById('button3');
	button3.style.backgroundColor = "#a57e56";
	button3.style.color = "#bffce6";
    var userInfoBody = document.createElement('div');
    var userInfoFooter = document.createElement('div');
	var userInfoBodyMain = document.createElement('div');
	var userInfoBodyMainFirst = document.createElement('button');
	var userInfoBodyMainLast = document.createElement('button');
	var userInfoBodyMainUser = document.createElement('button');
	var userInfoBodyMainPass = document.createElement('button');
	userInfoBodyMain.setAttribute("id","userInfoBodyMain");
	userInfoBodyMainFirst.setAttribute("id","userInfoBodyMainFirst");
	userInfoBodyMainFirst.setAttribute("onclick","getUserChangeValue('FIRSTNAME')");
	userInfoBodyMainFirst.innerHTML = "FirstName";
	userInfoBodyMainLast.setAttribute("id","userInfoBodyMainLast");
	userInfoBodyMainLast.setAttribute("onclick","getUserChangeValue('LASTNAME')");
	userInfoBodyMainLast.innerHTML = "LastName";
	userInfoBodyMainUser.setAttribute("id","userInfoBodyMainUser");
	userInfoBodyMainUser.setAttribute("onclick","getUserChangeValue('USERNAME')");
	userInfoBodyMainUser.innerHTML = "UserName";
	userInfoBodyMainPass.setAttribute("id","userInfoBodyMainPass");
	userInfoBodyMainPass.setAttribute("onclick","getUserChangeValue('PASSWORD')");
	userInfoBodyMainPass.innerHTML = "Password";
    userInfoBody.setAttribute("id","userInfoBody");
    userInfoFooter.setAttribute("id","userInfoFooter");
    document.getElementById('userDiv').appendChild(userInfoBody);
    document.getElementById('userDiv').appendChild(userInfoFooter);
	userInfoBody.appendChild(userInfoBodyMain);
	userInfoBodyMain.appendChild(userInfoBodyMainFirst);
	userInfoBodyMain.appendChild(userInfoBodyMainLast);
	userInfoBodyMain.appendChild(userInfoBodyMainUser);
	userInfoBodyMain.appendChild(userInfoBodyMainPass);
	retrieveUserData();
}
function retrieveUserData() {
	let uName = localStorage.getItem('P1UN');
	let url = "RetrieveUser";
	let userCreds = {
        username: uName,
        password: 'null'
    }
    let options = {
        method: 'POST',
        headers: {"content-type":'application/json'},
        body: JSON.stringify(userCreds)
    }
	console.log(JSON.stringify(userCreds));
	fetch(url, options)
	.then(res => {return res.text()})
	.then(function(res){
		const craig = JSON.parse(res);
		if(res == 'incorrect') {
			alert("wrong pass");
		} else {
			tempUser = new Users(craig);
			document.getElementById('userInfoBodyMainFirst').innerHTML = "FIRST NAME: \ "+tempUser.first;
			document.getElementById('userInfoBodyMainLast').innerHTML = "LAST NAME: \ "+tempUser.last;
			document.getElementById('userInfoBodyMainUser').innerHTML = "USERNAME: \ "+tempUser.username;
			document.getElementById('userInfoBodyMainPass').innerHTML = "PASSWORD: \ "+tempUser.password;
			//button3
		}
	});
}
function getUserChangeValue(catChange) {
	var newValue = prompt("Please enter the value to replace the currenct value.", "New Value here.");
	if (catChange == "FIRSTNAME" || catChange == "LASTNAME ") {
		if (newValue.length > 20) {
			alert("Please enter a value smaller than 20 digits.");
		}
	} else if (catChange == "USERNAME" || catChange == "PASSWORD") {
		if (newValue.length > 10) {
			alert("Please enter a value smaller than 10 digits")
		}
	}
	changeUserData(catChange,newValue)
}
function changeUserData(catChange,newValue) {
	let username = localStorage.getItem('P1UN');
	let url = "ChangeUserValue";
	let valChange = {
        username: username,
        catChange: catChange,
		newValue: newValue
    }
    let options = {
        method: 'POST',
        headers: {"content-type":'application/json'},
        body: JSON.stringify(valChange)
    }
	console.log(JSON.stringify(valChange));
	fetch(url, options)
	.then(res => {return res.text()})
	.then(function(res){
		if(res == 'incorrect') {
			alert("wrong pass");
		} else {
			alert(`Successfully updated ${catChange} to ${newValue}.`)
			button3();
		}
	});
}
function logoutButton() {
	hideUserMainPage();
	var uGrid = document.getElementById('userGrid');
	uGrid.innerHTML = "You have been logged out, please close your browser for security purposes.";
	uGrid.style.margin = "auto";
	uGrid.style.color = "black";
	uGrid.style.fontSize = "larger";
}
function hideLogin() {
	var loginForm = document.getElementById('body');
	removeAllChildren(loginForm);
}
function removeAllChildren(parent) {
	while (parent.firstChild) {
		parent.removeChild(parent.firstChild);
	}
}
function renderViewClaimDirector(viewTab) {
	var vCForm = document.getElementById('viewClaimForm');
	var pendButt = document.getElementById('vCFHPendingButton');
	var compButt = document.getElementById('vCFHCompleteButton');
	switch(viewTab) {
		case "PENDING": 
			pendButt.style.backgroundColor = "#bffce6";
			pendButt.style.color = "#a57e56";
			if (viewPage <= 0) {
				viewPage = 1;
				renderVCPending(vCForm);
				break;
			} else if (viewPage > 1) {
				viewPage = 1;
				var stuffToRemove = document.getElementById('viewClaimForm');
				removeAllChildren(stuffToRemove);
				renderVCFormHeader(vCForm);
				renderVCPending(vCForm);
				break;
			} else if (viewPage == 1) {
				break;
			} break;
		case "COMPLETED":
			compButt.style.backgroundColor = "#bffce6";
			compButt.style.color = "#a57e56";
			if (viewPage == 1) {
				renderVCComplete(vCForm);
				viewPage = 2;
				pendButt.style.backgroundColor = "#a57e56";
				pendButt.style.color = "#bffce6";
				break;
			}
	}
}
function renderVCComplete(vCForm) {
	var stuffToRemove = document.getElementById('viewClaimForm');
	removeAllChildren(stuffToRemove);
	renderVCFormHeader(vCForm);
	//stuff to change, rewrite later, time crunch, dang you fetch API
	var vCFormBody = document.createElement('div');
	var vCFormBodyTitle = document.createElement('span');
	var vCFormBodyTable = document.createElement('div');
	vCFormBody.setAttribute("id", "vCFormBody");
	vCFormBodyTitle.setAttribute("id", "vCFormBodyTitle");
	vCFormBodyTable.setAttribute("id", "vCFormBodyTable");
    vCFormBodyTitle.innerHTML = "COMPLETED";
	vCFormBodyTitle.style.textAlign = 'center'
	vCForm.appendChild(vCFormBody);
    vCFormBody.appendChild(vCFormBodyTitle);
    vCFormBody.appendChild(vCFormBodyTable);
    renderVCFormBodyCompleteTable(vCFormBodyTable);
	console.log("made it to render VCComplete")
}
function renderVCPending(vCForm) {
	var vCFormBody = document.createElement('div');
	var vCFormBodyTitle = document.createElement('span');
	var vCFormBodyTable = document.createElement('div');
	vCFormBody.setAttribute("id", "vCFormBody");
	vCFormBodyTitle.setAttribute("id", "vCFormBodyTitle");
	vCFormBodyTable.setAttribute("id", "vCFormBodyTable");
    vCFormBodyTitle.innerHTML = "PENDING";
	vCFormBodyTitle.style.textAlign = 'center'
	vCForm.appendChild(vCFormBody);
    vCFormBody.appendChild(vCFormBodyTitle);
    vCFormBody.appendChild(vCFormBodyTable);
    renderVCFormBodyTable(vCFormBodyTable);
}
function renderVCFormBodyTable(vCFormBodyTable) {
	var vCFormBodyTableTable = document.createElement('table');
	var vCFormBodyTableRow1 = document.createElement('tr');
	var vCFormBodyTableUserH = document.createElement('th');
	var vCFormBodyTableTypeH = document.createElement('th');
	var vCFormBodyTableAmountH = document.createElement('th');
    vCFormBodyTable.appendChild(vCFormBodyTableTable);
	vCFormBodyTableTable.setAttribute("id", "vCFormBodyTableTable")
    vCFormBodyTableTable.appendChild(vCFormBodyTableRow1);
    vCFormBodyTableRow1.appendChild(vCFormBodyTableUserH);
    vCFormBodyTableUserH.innerHTML = 'TYPE';
    vCFormBodyTableRow1.appendChild(vCFormBodyTableTypeH);
    vCFormBodyTableTypeH.innerHTML = "AMOUNT";
    vCFormBodyTableRow1.appendChild(vCFormBodyTableAmountH);
    vCFormBodyTableAmountH.innerHTML = "DESC";
	const userN = localStorage.getItem('P1UN');
    getPendingRequests(userN,"PENDING");
    // workstuff
}
function renderVCFormBodyCompleteTable(vCFormBodyTable) {
	var vCFormBodyTableTable = document.createElement('table');
	var vCFormBodyTableRow1 = document.createElement('tr');
	var vCFormBodyTableUserH = document.createElement('th');
	var vCFormBodyTableTypeH = document.createElement('th');
	var vCFormBodyTableAmountH = document.createElement('th');
	var vCFormBodyTableStatusH = document.createElement('th');
	var vCFormBodyTableAmountApprovedH = document.createElement('th');
    vCFormBodyTable.appendChild(vCFormBodyTableTable);
	vCFormBodyTableTable.setAttribute("id", "vCFormBodyTableTable")
    vCFormBodyTableTable.appendChild(vCFormBodyTableRow1);
    vCFormBodyTableRow1.appendChild(vCFormBodyTableUserH);
    vCFormBodyTableUserH.innerHTML = 'TYPE';
    vCFormBodyTableRow1.appendChild(vCFormBodyTableTypeH);
    vCFormBodyTableTypeH.innerHTML = "AMOUNT";
    vCFormBodyTableRow1.appendChild(vCFormBodyTableAmountH);
    vCFormBodyTableAmountH.innerHTML = "DESC";
    vCFormBodyTableRow1.appendChild(vCFormBodyTableStatusH);
    vCFormBodyTableStatusH.innerHTML = "STATUS";
    vCFormBodyTableRow1.appendChild(vCFormBodyTableAmountApprovedH);
    vCFormBodyTableAmountApprovedH.innerHTML = "FUNDED";
	const userN = localStorage.getItem('P1UN');
    getCompletedRequests(userN,"COMPLETED");
    // workstuff
}
function getCompletedRequests(username,claimType) {
			let url = "GetCompleteCases";
			let caseRequest = {
        		claimRequestor: username,
        		claimType: claimType,
    		}
    		let options = {
        		method: 'POST',
        		headers: {"content-type":'application/json'},
        		body: JSON.stringify(caseRequest)
    		}
			console.log(JSON.stringify(caseRequest));
			fetch(url, options)
			.then(res => {return res.text()})
			.then(res => JSON.parse(res))
			.then(function(res){
				if(res == 'failure') {
					alert("Somewhere the process has failed. Please try again later or contact a system administrator.");
				} else {
					let i = 0
					while (i<res.length) {
						claimList = new CompleteClaim(res[i]);
						if(document.getElementById('managerBlankTable')) {
							makeAManagerBlank();
						}
						if (claimType == null) {// 
							var tTS = document.getElementById('managerBlankTableTable');
						} else {
							var tTS = document.getElementById('vCFormBodyTableTable');
						}
						var tempROW = document.createElement('tr');
						tempROW.style.textAlign = 'center'
						var tempType = document.createElement('td');
						tempType.innerHTML = claimList.claimType;
						var tempUser = document.createElement('td');
						tempUser.innerHTML = claimList.username;
						var tempAmount = document.createElement('td');
						tempAmount.innerHTML = claimList.claimAmount;
						var tempDesc = document.createElement('td');
						tempDesc.innerHTML = claimList.desc;
						var tempStatus = document.createElement('td');
						tempStatus.innerHTML = claimList.status;
						var tempFunded = document.createElement('td');
						tempFunded.innerHTML = claimList.funded;
						tTS.appendChild(tempROW);
						tempROW.appendChild(tempType);
						tempROW.appendChild(tempUser);
						tempROW.appendChild(tempAmount);
						tempROW.appendChild(tempDesc);	
						tempROW.appendChild(tempStatus);
						tempROW.appendChild(tempFunded);						
						console.log(claimList)
						i++;
					}
				}
			});
}
function getPendingRequests(username,claimType) {
			let url = "GetPendingCases";
			let caseRequest = {
        		claimRequestor: username,
        		claimType: claimType,
    		}
    		let options = {
        		method: 'POST',
        		headers: {"content-type":'application/json'},
        		body: JSON.stringify(caseRequest)
    		}
			console.log(JSON.stringify(caseRequest));
			fetch(url, options)
			.then(res => {return res.text()})
			.then(res => JSON.parse(res))
			.then(function(res){
				if(res == 'failure') {
					alert("Somewhere the process has failed. Please try again later or contact a system administrator.");
				} else {
					let i = 0
					while (i<res.length) {
						if (claimType == null) {//
							claimList = new ClaimDef(res[i]);
							var tTS = document.getElementById('managerBlankTableTable');
							var tempROW = document.createElement('tr');
							tempROW.style.textAlign = 'center'
							var tempType = document.createElement('td');
							tempType.innerHTML = claimList.claimType;
						var tempUser = document.createElement('td');
						tempUser.innerHTML = claimList.userName;
							var tempAmount = document.createElement('td');
							tempAmount.innerHTML = claimList.claimAmount;
							var tempDesc = document.createElement('td');
							tempDesc.innerHTML = claimList.desc;
							var tempStatus = document.createElement('td');
							tempStatus.innerHTML = "PENDING";
							if (timeOutBandAid == 1) {
								var approveColumn = document.createElement('td');
								var approveColumnButton = document.createElement('button');
								approveColumnButton.innerHTML = "APPROVE";
								approveColumnButton.setAttribute("onclick", 'approveClaim("'+claimList.userName+'", '+claimList.claimAmount+', "'+claimList.claimType+'")');
								approveColumn.appendChild(approveColumnButton);
								var denyColumn = document.createElement('td');
								var denyColumnButton = document.createElement('button');
								denyColumnButton.innerHTML = "DENY";
								denyColumnButton.setAttribute("onclick", 'denyClaim("'+claimList.userName+'", '+claimList.claimAmount+', "'+claimList.claimType+'")');
								denyColumn.appendChild(denyColumnButton);
							} else {
								var tempFunded = document.createElement('td');
								tempFunded.innerHTML = "NONE";
							}
							tTS.appendChild(tempROW);
							tempROW.appendChild(tempType);
							tempROW.appendChild(tempUser);
							tempROW.appendChild(tempAmount);
							tempROW.appendChild(tempDesc);	
							tempROW.appendChild(tempStatus);
							if (timeOutBandAid == 1) {
								tempROW.appendChild(approveColumn);
								tempROW.appendChild(denyColumn);
							} else {
								tempROW.appendChild(tempFunded);
						}							
							console.log(claimList)
							i++;
						} else {
							claimList = new ClaimDef(res[i]);
							var tTS = document.getElementById('vCFormBodyTableTable');
							var tempROW = document.createElement('tr');
							tempROW.style.textAlign = 'center'
							var tempType = document.createElement('td');
							tempType.innerHTML = claimList.claimType;
							var tempAmount = document.createElement('td');
							tempAmount.innerHTML = claimList.claimAmount;
							var tempDesc = document.createElement('td');
							tempDesc.innerHTML = claimList.desc;
							tTS.appendChild(tempROW);
							tempROW.appendChild(tempType);
							tempROW.appendChild(tempAmount);
							tempROW.appendChild(tempDesc);						
							console.log(claimList)
							i++;
						}
					}
				}
			});
}
function renderVCFormHeader(vCForm) {
	var vCFormHeader = document.createElement('div');
	var vCFHPending = document.createElement('button');
	var vCFHComplete = document.createElement('button');
	vCFormHeader.setAttribute("id", "vCFormHeader");
	vCFHPending.innerHTML = "PENDING";
	vCFHPending.setAttribute("id", "vCFHPendingButton");
	vCFHPending.setAttribute("onclick", "renderViewClaimDirector('PENDING')");
	vCFHComplete.innerHTML = "COMPLETE";
	vCFHComplete.setAttribute("id", "vCFHCompleteButton");
	vCFHComplete.setAttribute("onclick", "renderViewClaimDirector('COMPLETED')");
	vCForm.appendChild(vCFormHeader);
	vCFormHeader.appendChild(vCFHPending);
	vCFormHeader.appendChild(vCFHComplete);
}
function renderViewButton() {
	
}
function renderNewClaimsTab() {
	var nCBody = document.getElementById('claimsTableBottom');
	var nCForm = document.createElement('div');
	nCForm.setAttribute("id", "newClaimForm");
	nCBody.appendChild(nCForm);
	renderNCFormHeader(nCForm);
	renderNCFormTypeSelect(nCForm);
	renderNCFormTypeAmount(nCForm);
	renderNCFormDescription(nCForm);
}
function renderNCFormHeader(nCForm) {
	var nCFormHeader = document.createElement('div');
	nCFormHeader.setAttribute("id", "nCFormHeader");
	nCFormHeader.innerHTML = "Please enter the following information to submit a NEW reimbursement request.";
	nCForm.appendChild(nCFormHeader);
}
function renderNCFormTypeAmount(nCForm) {
	var nCTypeAmount = document.createElement('input');
	var nCSubmitButton = document.createElement('button');
	nCTypeAmount.setAttribute("type", "number");
	nCTypeAmount.setAttribute("id", "newClaimFormAmount");
	nCTypeAmount.setAttribute("placeholder", "COST");
	nCSubmitButton.setAttribute("id", "nCSubmitButton");
	nCSubmitButton.setAttribute("onclick", "submitNewClaim('"+tempUser+"')");
	nCSubmitButton.innerHTML = "SUBMIT";
	nCForm.appendChild(nCTypeAmount);
	nCForm.appendChild(nCSubmitButton);
}
function renderNCFormDescription(nCForm) {
	var nCDesc = document.createElement('input');
	nCDesc.setAttribute("type", "text");
	nCDesc.setAttribute("id", "newClaimFormDesc");
	nCDesc.setAttribute("placeholder", "Please enter an optional description of the charges.");
	nCForm.appendChild(nCDesc);
}
function renderNCFormTypeSelect(nCForm) {
	var nCFormSelector = document.createElement('select');
	var nCFormSelectorFood = document.createElement('option');
	var nCFormSelectorTravel = document.createElement('option');
	var nCFormSelectorLodging = document.createElement('option');
	var nCFormSelectorMisc = document.createElement('option');
	nCFormSelector.setAttribute("id", "newClaimFormSelector");
	nCFormSelectorFood.setAttribute("id", "newClaimFormSelectorFood");
	nCFormSelectorMisc.setAttribute("value", "Food");
	nCFormSelectorFood.innerHTML = 'FOOD';
	nCFormSelectorTravel.setAttribute("id", "nCFormSelectorTravel");
	nCFormSelectorMisc.setAttribute("value", "Travel");
	nCFormSelectorTravel.innerHTML = 'TRAVEL';
	nCFormSelectorLodging.setAttribute("id", "nCFormSelectorLodging");
	nCFormSelectorMisc.setAttribute("value", "Lodging");
	nCFormSelectorLodging.innerHTML = 'LODGING';
	nCFormSelectorMisc.setAttribute("id", "nCFormSelectorMisc");
	nCFormSelectorMisc.setAttribute("value", "Misc");
	nCFormSelectorMisc.innerHTML = 'MISC.';
	nCForm.appendChild(nCFormSelector);
	nCFormSelector.appendChild(nCFormSelectorFood);
	nCFormSelector.appendChild(nCFormSelectorTravel);
	nCFormSelector.appendChild(nCFormSelectorLodging);
	nCFormSelector.appendChild(nCFormSelectorMisc);
}
function renderClaimsTableBottom() {
	var claimsTableBottom = document.getElementById('claimsTableBottom');
	var claimsTableBottomHeader = document.createElement('h1');
	var uN = localStorage.getItem('P1UN');
	claimsTableBottomHeader.setAttribute("id", "claimsTableHeader");
	claimsTableBottomHeader.innerHTML = `Welcome ${uN}`;
	claimsTableBottom.appendChild(claimsTableBottomHeader);
}
function hideUserMainPage() {
	var userDiv = document.getElementById('userDiv');
	removeAllChildren(userDiv);
}
function renderManagerConsole(tempUser) {
	if (pageNumber === 1) {
		hideUserMainPage();
		renderToolBar(tempUser);
		renderManagerBody();
		pageNumber = 2;
	} else {alert("Still working on page navigation.");}
}
function renderManagerBody() {
	var managerBody = document.createElement('div');
	managerBody.setAttribute("id", "managerBody");
	document.getElementById('userDiv').appendChild(managerBody);
	renderManagerToolBarDirector("CLAIMS");
	//renderManagerTabSelector();
	renderFooter();
}
function renderManagerToolBarDirector(mainManagerView) {
	var claimManagerView = document.createElement('div');
	var accountClaimButton = document.createElement('button');
	var userAccountButton = document.createElement('button');
	claimManagerView.setAttribute("id", "claimManagerView");
	accountClaimButton.setAttribute("id", "accountClaimButton");
	accountClaimButton.setAttribute("onclick", "renderManagerSubToolBarDirector('CLAIMS')");
	accountClaimButton.innerHTML = "CLAIMS";
	userAccountButton.setAttribute("id", "userAccountButton");
	userAccountButton.setAttribute("onclick", "renderManagerSubToolBarDirector('EMPLOYEES')");
	userAccountButton.innerHTML = "EMPLOYEES";
	claimManagerView.appendChild(accountClaimButton)
	claimManagerView.appendChild(userAccountButton)
	document.getElementById('managerBody').appendChild(claimManagerView)
	renderManagerSubToolBarDirector(mainManagerView);	
}
function renderManagerSubToolBarDirector(mainManagerView) {
	var accountClaimButton = document.getElementById('accountClaimButton');
	var userAccountButton = document.getElementById('userAccountButton');
	switch(mainManagerView) {
		case "CLAIMS":
			accountClaimButton.style.backgroundColor = "#bffce6";
			accountClaimButton.style.color = "#a57e56";
			userAccountButton.style.backgroundColor = "#a57e56";
			userAccountButton.style.color = "#bffce6";
			renderManagerAccountsTab();
			break;
		case "EMPLOYEES":
			alert("EMPLOYEES");
			document.getElementById('managerAccountsTabStuff').remove();
			userAccountButton.style.backgroundColor = "#bffce6";
			userAccountButton.style.color = "#a57e56";
			accountClaimButton.style.backgroundColor = "#a57e56";
			accountClaimButton.style.color = "#bffce6";
			renderManagerUsersTab();
			break;
	}
}
function renderManagerAccountsTab() {
	if (document.getElementById('managerBlankTable')) {
		document.getElementById('managerBlankTable').remove();
	}
	if (document.getElementById('managerAccountsTabStuff')) {
		document.getElementById('managerAccountsTabStuff').remove();
	}
	var managerAccountsTabStuff = document.createElement('div');
	var manViewAll = document.createElement('button');
	var manViewByID = document.createElement('button');
	var manAODAll = document.createElement('button');
	var manAODID = document.createElement('button');
	managerAccountsTabStuff.setAttribute("id", "managerAccountsTabStuff");
	manViewAll.setAttribute("id", "manViewAll");
	manViewAll.setAttribute("onclick", "managerRequestAllClaims()");
	manViewAll.innerHTML = "ALL CLAIMS";
	manViewByID.setAttribute("id", "manViewByID");
	manViewByID.setAttribute("onclick", "managerRequestClaimByID()");
	manViewByID.innerHTML = "FIND CLAIMS";
	manAODAll.setAttribute("id", "manAODAll");
	manAODAll.setAttribute("onclick", "managerApproveOrDenyAll()");
	manAODAll.innerHTML = "A.O.D. Claims";
	manAODID.setAttribute("id", "manAODID");
	manAODID.setAttribute("onclick", "managerApproveOrDenyByID()");// 
	manAODID.innerHTML = "A.O.D. by ID";
	managerAccountsTabStuff.appendChild(manViewAll);
	managerAccountsTabStuff.appendChild(manViewByID);
	managerAccountsTabStuff.appendChild(manAODAll);
	managerAccountsTabStuff.appendChild(manAODID);
	var managerBlankTable = document.createElement('div');
	managerBlankTable.setAttribute("id", "managerBlankTable");
	document.getElementById('managerBody').append(managerBlankTable);
	document.getElementById('managerBody').appendChild(managerAccountsTabStuff)
}
function managerApproveOrDenyByID() {
	timeOutBandAid = 1;
	var userID = prompt("Please enter the USERNAME of the user you would like to find", "USERNAME HERE");
	makeAManagerBlank();// 
	getPendingRequests(userID,null);
}
function managerApproveOrDenyAll() {
	timeOutBandAid = 1;
	makeAManagerBlank();
	manReqAllPendClaims('PEND');
}
function managerRequestClaimByID() {
	makeAManagerBlank();
	var userID = prompt("Please enter the USERNAME of the user you would like to find", "USERNAME HERE");
	getCompletedRequests(userID, null);
	getPendingRequests(userID,null);
}
function renderFooter() {
    var claimsFooter = document.createElement('div');
    claimsFooter.setAttribute("id","claimsFooter");
    document.getElementById('userDiv').appendChild(claimsFooter);
}
function makeAManagerBlank() {
	removeAllChildren(document.getElementById('managerBlankTable'));
	var managerBlankTableTable = document.createElement('table');
    managerBlankTable.appendChild(managerBlankTableTable);
	managerBlankTableTable.setAttribute("id", "managerBlankTableTable")
	var managerBlankTableRow1 = document.createElement('tr');
	var managerBlankTableUserName = document.createElement('th');
	var managerBlankTableUserH = document.createElement('th');
	var managerBlankTableTypeH = document.createElement('th');
	var managerBlankTableAmountH = document.createElement('th');
	var managerBlankTableStatus = document.createElement('th');
	if (timeOutBandAid == 1) {
		var managerBlankTableApprove = document.createElement('th');
		var managerBlankTableDeny = document.createElement('th');
	} else {
		var managerBlankTableFunded = document.createElement('th');
	}
    managerBlankTableTable.appendChild(managerBlankTableRow1);
    managerBlankTableRow1.appendChild(managerBlankTableUserH);
    managerBlankTableUserH.innerHTML = 'TYPE';
    managerBlankTableRow1.appendChild(managerBlankTableUserName);
    managerBlankTableUserName.innerHTML = 'USER';
    managerBlankTableRow1.appendChild(managerBlankTableTypeH);
    managerBlankTableTypeH.innerHTML = "AMOUNT";
    managerBlankTableRow1.appendChild(managerBlankTableAmountH);
    managerBlankTableAmountH.innerHTML = "DESC";
    managerBlankTableRow1.appendChild(managerBlankTableStatus);
    managerBlankTableStatus.innerHTML = "STATUS";
	if(timeOutBandAid == 1) {
    	managerBlankTableRow1.appendChild(managerBlankTableApprove);
    	managerBlankTableApprove.innerHTML = "APPROVE";
    	managerBlankTableRow1.appendChild(managerBlankTableDeny);
    	managerBlankTableDeny.innerHTML = "DENY";
	} else {
    	managerBlankTableRow1.appendChild(managerBlankTableFunded);
    	managerBlankTableFunded.innerHTML = "FUNDED";
	}
	return managerBlankTableTable;
}
function managerRequestAllClaims() {
	timeOutBandAid = 0;
	makeAManagerBlank();
	manReqAllPendClaims('PEND');
	manReqAllCompClaims('COMP');
	
}
function manReqAllCompClaims(claimType) {
			let url = "GetAllPendingCases";
			let caseRequest = {
        		claimRequestor: null,
        		claimType: claimType,
    		}
    		let options = {
        		method: 'POST',
        		headers: {"content-type":'application/json'},
        		body: JSON.stringify(caseRequest)
    		}
			console.log(JSON.stringify(caseRequest));
			fetch(url, options)
			.then(res => {return res.text()})
			.then(res => JSON.parse(res))
			.then(function(res){
				if(res == 'failure') {
					alert("Somewhere the process has failed. Please try again later or contact a system administrator.");
				} else {
					let i = 0
					while (i<res.length) {
						claimList = new CompleteClaim(res[i]);
						var tTS = document.getElementById('managerBlankTableTable');
						var tempROW = document.createElement('tr');
						tempROW.style.textAlign = 'center'
						var tempType = document.createElement('td');
						tempType.innerHTML = claimList.claimType;
						var tempUser = document.createElement('td');
						tempUser.innerHTML = claimList.username;
						var tempAmount = document.createElement('td');
						tempAmount.innerHTML = claimList.claimAmount;
						var tempDesc = document.createElement('td');
						tempDesc.innerHTML = claimList.desc;
						var tempStatus = document.createElement('td');
						tempStatus.innerHTML = claimList.status;
						var tempFunded = document.createElement('td');
						tempFunded.innerHTML = claimList.funded;
						tTS.appendChild(tempROW);
						tempROW.appendChild(tempType);
						tempROW.appendChild(tempUser);
						tempROW.appendChild(tempAmount);
						tempROW.appendChild(tempDesc);	
						tempROW.appendChild(tempStatus);
						tempROW.appendChild(tempFunded);					
						console.log(claimList)
						i++;
					}
				}
			});
}
function manReqAllPendClaims(claimType) {
			let url = "GetAllPendingCases";
			let caseRequest = {
        		claimRequestor: null,
        		claimType: claimType,
    		}
    		let options = {
        		method: 'POST',
        		headers: {"content-type":'application/json'},
        		body: JSON.stringify(caseRequest)
    		}
			console.log(JSON.stringify(caseRequest));
			fetch(url, options)
			.then(res => {return res.text()})
			.then(res => JSON.parse(res))
			.then(function(res){
				if(res == 'failure') {
					alert("Somewhere the process has failed. Please try again later or contact a system administrator.");
				} else {
					let i = 0
					while (i<res.length) {
						claimList = new ClaimDef(res[i]);
						uNammy = claimList.userName;
						cAmmy = claimList.claimAmount;
						cTyppy = claimList.claimType;
						var tTS = document.getElementById('managerBlankTableTable');
						var tempROW = document.createElement('tr');
						tempROW.style.textAlign = 'center'
						var tempType = document.createElement('td');
						tempType.innerHTML = cTyppy;
						var tempUser = document.createElement('td');
						tempUser.innerHTML = uNammy;
						var tempAmount = document.createElement('td');
						tempAmount.innerHTML = cAmmy;
						var tempDesc = document.createElement('td');
						tempDesc.innerHTML = claimList.desc;
						var tempStatus = document.createElement('td');
						tempStatus.innerHTML = "PENDING";
						if (timeOutBandAid == 1) {
							var approveColumn = document.createElement('td');
							var approveColumnButton = document.createElement('button');
							approveColumnButton.innerHTML = "APPROVE";
							approveColumnButton.setAttribute("onclick", 'approveClaim("'+claimList.userName+'", '+claimList.claimAmount+', "'+claimList.claimType+'")');
							approveColumn.appendChild(approveColumnButton);
							var denyColumn = document.createElement('td');
							var denyColumnButton = document.createElement('button');
							denyColumnButton.innerHTML = "DENY";
							denyColumnButton.setAttribute("onclick", 'denyClaim("'+claimList.userName+'", '+claimList.claimAmount+', "'+claimList.claimType+'")');
							denyColumn.appendChild(denyColumnButton);
						} else {
							var tempFunded = document.createElement('td');
							tempFunded.innerHTML = "NONE";
						}// shit
						tTS.appendChild(tempROW);
						tempROW.appendChild(tempType);
						tempROW.appendChild(tempUser);
						tempROW.appendChild(tempAmount);
						tempROW.appendChild(tempDesc);	
						tempROW.appendChild(tempStatus);
						if (timeOutBandAid == 1) {
							tempROW.appendChild(approveColumn);
							tempROW.appendChild(denyColumn);
						} else {
							tempROW.appendChild(tempFunded);
						}					
						console.log(claimList)
						i++;
					}
				}
			});
}
function approveClaim(username, claimAmount, claimType) {
	var approvalAmount = prompt("What amound would you like to approve?");
	if (approvalAmount > claimAmount) {
		alert("Please enter an amount lower than the requested claim.");
	} else if (!parseInt(approvalAmount)) {
		alert("Please enter a numberic value.");
	} else {
		approvalClaimProcess(username, claimType, claimAmount, parseInt(approvalAmount));
	}
}
function denyClaim(username, claimAmount, claimType) {
			let url = "DenyClaim";
			let caseApproval = {
        		userName: username,
        		claimType: claimType,
				claimAmount: claimAmount,
				desc: null,
				
    		}
    		let options = {
        		method: 'POST',
        		headers: {"content-type":'application/json'},
        		body: JSON.stringify(caseApproval)
    		}
			console.log(JSON.stringify(caseApproval));
			fetch(url, options)
			.then(res => {return res.text()})
			.then(function(res){
				if(res == 'failure') {
					alert("Somewhere the process has failed. Please try again later or contact a system administrator.");
				} else {
					alert('Claim successfully denied, returning to the main menu');
					renderManagerSubToolBarDirector('CLAIMS');
				}
			});
}

function approvalClaimProcess(username, claimType, claimAmount, approvalAmount) {
			let url = "ApproveClaim";
			let caseApproval = {
        		userName: username,
        		claimType: claimType,
				claimAmount: claimAmount,
				desc: null,
				claimStatus: 'APPROVED',
				approvedAmount: approvalAmount
				
    		}
    		let options = {
        		method: 'POST',
        		headers: {"content-type":'application/json'},
        		body: JSON.stringify(caseApproval)
    		}
			console.log(JSON.stringify(caseApproval));
			fetch(url, options)
			.then(res => {return res.text()})
			.then(function(res){
				if(res == 'failure') {
					alert("Somewhere the process has failed. Please try again later or contact a system administrator.");
				} else {
					managerApproveOrDenyAll();
				}
			});
}
function renderClaimsPage() {
	if (pageNumber === 1) {
		hideUserMainPage();
		renderToolBar();
		renderClaimsBody();
		pageNumber = 2;
	} else {alert("Still working on page navigation.");}
}
function renderClaimsBody() {
	var toolBarClaimsButton = document.getElementById('button2');
	toolBarClaimsButton.style.backgroundColor = "#a57e56";
	toolBarClaimsButton.style.color = "#bffce6";
    var claimsBody = document.createElement('div');
    claimsBody.setAttribute("id","claimsBody");
    document.getElementById('userDiv').appendChild(claimsBody);
	renderFooter();
	renderClaimsTable();
}
function renderClaimsTable() {
	var claimsBody = document.getElementById('claimsBody');
	var claimsTableTop = document.createElement('div');
	var claimsTableBottom = document.createElement('div');
	claimsTableTop.setAttribute("id", "claimsTableTop");
	claimsTableBottom.setAttribute("id", "claimsTableBottom");
	claimsBody.appendChild(claimsTableTop);
	claimsBody.appendChild(claimsTableBottom);
	renderClaimsTableTop();
	renderClaimsTableBottom();
}
function renderClaimsTableTop() {
	var claimsTableTop = document.getElementById('claimsTableTop');
	var claimsNewButton = document.createElement('button');
	var claimsViewButton = document.createElement('button');
	var claimsEditButton = document.createElement('button');
	claimsNewButton.setAttribute("id", "claimsNewButton");
    claimsNewButton.setAttribute("onclick", "renderClaimButton('New')");
	claimsNewButton.innerHTML = "NEW";
	claimsViewButton.setAttribute("id", "claimsViewButton");
    claimsViewButton.setAttribute("onclick", "renderClaimButton('View')");
	claimsViewButton.innerHTML = "VIEW";
	claimsEditButton.setAttribute("id", "claimsEditButton");
    claimsEditButton.setAttribute("onclick", "renderClaimButton('Edit')");
	claimsEditButton.innerHTML = "EDIT";
	claimsTableTop.appendChild(claimsNewButton);
	claimsTableTop.appendChild(claimsViewButton);
	claimsTableTop.appendChild(claimsEditButton);
}
function renderClaimButton(buttonType) {
	var claimsTableBottom = document.getElementById('claimsTableBottom');
	var claimsButtonType = document.getElementById(`claims${buttonType}Button`);
	claimsButtonType.style.backgroundColor = "#bffce6";
	claimsButtonType.style.color = "#a57e56";
	removeAllChildren(claimsTableBottom);
	var claimsFromButton = '';
	switch (buttonType) {
		case "New": if (claimsPage <= 1) {
						claimsPage = 1;
						break;
					} else if (claimsPage === 2) {
						claimsPage = 1;
						claimsFromButton = 'View';
						break;
					  } else if (claimsPage === 3) {
						claimsPage = 1;
						claimsFromButton = 'Edit';
						break;
						} else { alert('ERROR'); break; }
		case "View": if (claimsPage <= 1) {
						claimsPage = 2;
						claimsFromButton = 'New';
						break;
					} else if (claimsPage === 2) {
						break;
					  } else if (claimsPage === 3) {
						claimsPage = 2;
						claimsFromButton = 'Edit';
						break;
						} else { alert('ERROR'); break; }
		case "Edit": if (claimsPage <= 1) {
						claimsPage = 3;
						claimsFromButton = 'New';
						break;
					} else if (claimsPage === 2) {
						claimsPage = 3;
						claimsFromButton = 'View';
						break;
					  } else if (claimsPage === 3) {
						break;
						} else { alert('ERROR'); break; }
		default: alert('Error in the render claim button switch case.');
	}
	if (claimsFromButton != '') {
		var buttonToReturnToNormal = document.getElementById(`claims${claimsFromButton}Button`);
		buttonToReturnToNormal.style.backgroundColor = "#a57e56";
		buttonToReturnToNormal.style.color = "#bffce6";
	}
	renderClaimsTabDirector(buttonType);
}
function renderClaimsTabDirector(tabType) {
	switch(tabType) {
		case 'New': renderNewClaimsTab();
					break;
		case 'View': renderViewClaimsTab();
					break;
		case 'Edit': renderEditClaimsTab();
					break;
		default: alert('Error in the claims tab director function.');
	}
}
function renderViewClaimsTab() {
	var vCBody = document.getElementById('claimsTableBottom');
	var vCForm = document.createElement('div');
	vCForm.setAttribute("id", "viewClaimForm");
	vCBody.appendChild(vCForm);
	renderVCFormHeader(vCForm);
	renderViewClaimDirector("PENDING", vCForm);
}