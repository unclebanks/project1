let pageNumber = 0;
let claimsPage = 0;
let breaker = document.createElement('br');

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
	.then( res=> console.log(res));
}
function renderUserMainPage(userType) {
	if (pageNumber === 0) {
    	hideLogin();
		renderPage();
    	renderToolBar(userType);
		var toolBarClaimsButton = document.getElementById('homeButton');
		toolBarClaimsButton.style.backgroundColor = "#e0d0c1";
		toolBarClaimsButton.style.color = "#bffce6";
		pageNumber = 1;
	} else {alert("Not done with all the page movement.");}
}
function renderPage() {
    var userDiv = document.createElement('div');
    var userGrid = document.createElement('div');
    var userBody = document.createElement('div');
    var userFooter = document.createElement('div');
    userDiv.setAttribute("id","userDiv");
    userGrid.setAttribute("id","userGrid");
    userBody.setAttribute("id","userBody");
    userFooter.setAttribute("id","userFooter");
    document.getElementById('body').appendChild(userGrid);
    document.getElementById('userGrid').appendChild(userDiv);
    document.getElementById('userDiv').appendChild(userBody);
    document.getElementById('userDiv').appendChild(userFooter);
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
function renderToolBar(userType) {
    var userToolBar = document.createElement('div');
    var homeButton = document.createElement('button');
    var button2 = document.createElement('button');
    var button3 = document.createElement('button');
    var logoutButton = document.createElement('button');
    userToolBar.setAttribute("id","userToolBar");
    homeButton.setAttribute("id", "homeButton");
    homeButton.setAttribute("onclick", "homeButton()");
	homeButton.innerHTML = "HOME";
    button2.setAttribute("id","button2");
	if (userType === "j") {
    	button2.setAttribute("onclick","renderClaimsPage()");
	} else { button2.setAttribute("onclick","renderManagerConsole()"); }
	button2.innerHTML = "CLAIMS";
    button3.setAttribute("id","button3");
    button3.setAttribute("onclick","button3()");
	button3.innerHTML = "BUTTON3";
    logoutButton.setAttribute("id", "logoutButton");
    logoutButton.setAttribute("onclick", "logoutButton()");
	logoutButton.innerHTML = "LOGOUT";
    document.getElementById('userDiv').appendChild(userToolBar);
    document.getElementById('userToolBar').appendChild(homeButton);
    document.getElementById('userToolBar').appendChild(button2);
    document.getElementById('userToolBar').appendChild(button3);
    document.getElementById('userToolBar').appendChild(logoutButton);

}
function homeButton() {
    alert('Home button function needed here');
}
function button3() {
    alert('Not sure what to do here');
}
function logoutButton() {
    alert('Logout button function needed here');
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
function renderClaimsPage() {
	if (pageNumber === 1) {
		hideUserMainPage();
		renderToolBar();
		renderClaimsBody();
		pageNumber === 2;
	} else {alert("Still working on page navigation.");}
}
function renderClaimsBody() {
	var toolBarClaimsButton = document.getElementById('button2');
	toolBarClaimsButton.style.backgroundColor = "#e0d0c1";
	toolBarClaimsButton.style.color = "#bffce6";
    var claimsBody = document.createElement('div');
    var claimsFooter = document.createElement('div');
    claimsBody.setAttribute("id","claimsBody");
    claimsFooter.setAttribute("id","claimsFooter");
    document.getElementById('userDiv').appendChild(claimsBody);
    document.getElementById('userDiv').appendChild(claimsFooter);
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
	claimsButtonType.style.color = "#e0d0c1";
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
		buttonToReturnToNormal.style.backgroundColor = "#e0d0c1";
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
	nCSubmitButton.setAttribute("onclick", "submitNewClaim()");
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
	claimsTableBottomHeader.setAttribute("id", "claimsTableHeader");
	claimsTableBottomHeader.innerHTML = "Welcome USER";
	claimsTableBottom.appendChild(claimsTableBottomHeader);
}
function hideUserMainPage() {
	var userDiv = document.getElementById('userDiv');
	removeAllChildren(userDiv);
}
function renderManagerConsole() {
	if (pageNumber === 1) {
		alert("going to management console");
		hideUserMainPage();
		renderToolBar();
		renderManagerBody();
		pageNumber === 2;
	} else {alert("Still working on page navigation.");}
}