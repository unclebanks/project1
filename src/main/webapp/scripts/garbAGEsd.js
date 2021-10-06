
function renderToolBar() {
    var userToolBar = createEls(userToolBar,'div');
    var homeButton = createEls(homeButton,'button');
    var button2 = createEls(button2,'button');
    var button3 = createEls(button3,'button');
    var logoutButton = createEls(logoutButton,'button');
    userToolBar.setAttribute("id","userToolBar");
    homeButton.setAttribute("id", "homeButton");
    homeButton.setAttribute("onclick", "renderUserMainPage()");
	homeButton.innerHTML = "HOME";
    button2.setAttribute("id","button2");
	if (checkAdmin() === false) {
    	button2.setAttribute("onclick","renderClaimsPage()");
	} else { button2.setAttribute("onclick","renderManagerConsole()"); }
	button2.innerHTML = "CLAIMS";
    button3.setAttribute("id","button3");
    button3.setAttribute("onclick","button3()");
	button3.innerHTML = "MANAGE";
    logoutButton.setAttribute("id", "logoutButton");
    logoutButton.setAttribute("onclick", "logoutButton()");
	logoutButton.innerHTML = "LOGOUT";
	var parent = 'userDiv';
	var parent2 = 'userToolBar';
	var children= [homeButton,button2,button3,logoutButton];
	var child=userToolBar;
	appendContent(parent,child);
	children.forEach(child => appendContent(parent2,child));
}