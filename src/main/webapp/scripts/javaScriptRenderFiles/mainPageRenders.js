
function renderUserMainPage() {
		var claimsPage = document.getElementById('body');
        console.log(localStorage.getItem('P1UN'));
	if (pageNumber === 0) {
    	hideLogin();
		renderPage();
    	renderToolBar();
		var toolBarClaimsButton = document.getElementById('homeButton');
		toolBarClaimsButton.style.backgroundColor = "#a57e56";
		toolBarClaimsButton.style.color = "#bffce6";
		pageNumber = 1;
	} else if(pageNumber === 2){
		removeAllChildren(claimsPage);
		renderPage();
    	renderToolBar();
		var toolBarClaimsButton = document.getElementById('homeButton');
		toolBarClaimsButton.style.backgroundColor = "#a57e56";
		toolBarClaimsButton.style.color = "#bffce6";
		pageNumber = 1;		
	} else if(pageNumber === 3){
		removeAllChildren(claimsPage);
		renderPage();
    	renderToolBar();
		var toolBarClaimsButton = document.getElementById('homeButton');
		toolBarClaimsButton.style.backgroundColor = "#a57e56";
		toolBarClaimsButton.style.color = "#bffce6";
		pageNumber = 1;		
	} else {alert("Not done with all the page movement.");}
}