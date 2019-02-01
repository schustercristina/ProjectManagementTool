var allUsers = [];
var sprints = [];
var issues = [];
var statuses = ["New", "In Progress", "Feedback", "Rework", "Resolved", "Ready For Testing"];
var loggedUser;
var currentSprint;
var tempIssueNr = 0;

var nameInput = document.querySelector("#userName");
var idInput = document.querySelector("#userId");
var sprintName = document.querySelector("#sprintName");
var sprintIdInput = document.querySelector("#sprintIdInput");
var selectIssueSprint = document.querySelector("#issueSprintIdSelect");
var issueIdInput = document.querySelector("#issueIdInput");
var issueNameInput = document.querySelector("#issueNameInput");
var issueDescriptionInput = document.querySelector("#descriptionInput");

var selectUser = document.querySelector("#userSelect");
var selectSprint = document.querySelector("#selectSprint");
var assignedTo = document.querySelector("#assignedToSelect");
var typeSelect = document.querySelector("#issueTypeSelect");
var statusSelect = document.querySelector("#statusSelect");

var newUserBtn = document.querySelector("#newUserBtn");
var updateIssueBtn = document.querySelector("#updateIssueBtn");
var createIssueBtn = document.querySelector("#createIssueBtn");
var newSprintBtn = document.querySelector("#newSprintBtn");

var table = document.querySelector("#table");
var issuesDisplay = document.querySelector("#projectOverviewDisplay");
var issueBox = document.querySelector("#issueBox");

hideBlocks();
projectOverviewStructure();

function hideBlocks() {
	issuesDisplay.style.display = "none";
	issueBox.style.display = "none";
	newUserBtn.style.display = "none";
	newSprintBtn.style.display = "none";
}

function displayIssue(){
	if(allUsers.length > 0 && sprints.length){
		issueBox.style.display = "initial";
		updateIssueBtn.disabled = true;
		updateIssueBtn.classList.add("disabled");
		createIssueBtn.classList.remove("disabled");
		createIssueBtn.disabled = false;
	}else {
		alert("You have to Log in first and create a Sprint in order to add an issue!")
	}
}

newUserBtn.addEventListener("click", function() {
	nameInput.style.display = "initial";
	this.style.display = "none";
	document.querySelector("#nameTitle").style.display = "initial";
});

selectUser.addEventListener("change", function() {
	var optionValue = selectUser.options[selectUser.selectedIndex].value;

	for(var i = 0; i < allUsers.length; i++) {	
		if(allUsers[i].userName == optionValue) {
			loggedUser = allUsers[i];
			idInput.value = allUsers[i].userId;
			break;
		}
	}
});


function addsUser() {
	if(nameInput.value) {
		var found = false;
		for(var i = 0; i < allUsers.length; i++){
			if(allUsers[i].userName == nameInput.value) {
				found = true;
				break;
			}
		}

		if(found) {
			alert("The user already exists!");
		}else {
			var id = allUsers.length + 1;
			var user = new User(id, nameInput.value);
			loggedUser = user;
			allUsers.push(user);
			idInput.value = id;

			nameInput.style.display = "none";
			newUserBtn.style.display = "initial";
			document.querySelector("#nameTitle").style.display = "none";

			var option = document.createElement("option");
			option.text = allUsers[i].userName;
			selectUser.add(option);
			selectUser.options[selectUser.length - 1].selected = option.value;
			
			var option2 = document.createElement("option");
			option2.text = allUsers[i].userName;
			assignedTo.add(option2);
		}

	}else {
		alert("Please enter a valid username!");
	}	
}

newSprintBtn.addEventListener("click", function() {
	sprintName.style.display = "initial";
	this.style.display = "none";
	document.querySelector("#sprintTitle").style.display = "initial";
});

function addsSprint() {	
	if(allUsers.length > 0){
		if(sprintName.value) {
			var sprintId = sprints.length + 1;
			var sprint = new Sprint(sprintId, sprintName.value);
			sprints.push(sprint);
			sprintIdInput.value = sprintId;

			sprintName.style.display = "none";
			newSprintBtn.style.display = "initial";
			document.querySelector("#sprintTitle").style.display = "none";

			var option = document.createElement("option");
			option.text = sprint.sprintId + " " + sprint.sprintName;
			selectSprint.add(option);
			selectSprint.options[selectSprint.length - 1].selected = option.value;
			
			var option2 = document.createElement("option");
			option2.text = sprint.sprintId + " " + sprint.sprintName;
			selectIssueSprint.add(option2)
		}else {
			alert("Please Enter a Sprint Name!");
		}
	}else{
		alert("you have to log in");
	}
}

selectSprint.addEventListener("change", function() {
	var optionValue = selectSprint.options[selectSprint.selectedIndex].value;
	var optionSplit = optionValue.split(" ");
	sprintIdInput.value = optionSplit[0];

	for(var i = 0; i < sprints.length; i++) {
		if(sprints[i].sprintId == optionSplit[0] && sprints[i].sprintName == optionSplit[1]){
			currentSprint = sprints[i];
		}
	}
});

function createIssue() {
	issueBox.style.display = "none";
	var issueId = issues.length + 1;
	issueIdInput.value = issueId;
	var issueType = typeSelect.options[typeSelect.selectedIndex].value;
	var issueName = issueNameInput.value;
	var issueDescription = issueDescriptionInput.value;
	var issueSprintId = parseInt(selectIssueSprint.options[selectIssueSprint.selectedIndex].value.split(" ")[0]);
	var createdBy = loggedUser.userId;
	var currentStatus = statusSelect.options[statusSelect.selectedIndex].value;
	var statusId = statuses.indexOf(currentStatus);
	var comments = [];
	var createdAt = new Date();
	var updatedAt = new Date();
	var assignee;
	var selectedAssignee = assignedTo.options[assignedTo.selectedIndex].value;
	for(var i = 0; i< allUsers.length; i++) {
		if(allUsers[i].userName == selectedAssignee){
			assignee = allUsers[i].userId;	
		}
	}

	var issue = new Issue(
		issueId,				//id,
		issueType,				//type, 
		issueName,				//name,
		issueSprintId, 			//sprintId,
		createdBy,			 	//createdById,
		assignee,				//assigneeId,
		issueDescription,		//description,
		statusId,				//statusId,
		comments,				//comments,
		updatedAt,				//updatedAt,
		createdAt				//createdAt
	);

	issues.push(issue);
	
	if(statusSelect.options[statusSelect.selectedIndex].value != "New"){
		for(var i = 0; i < statusSelect.length; i++) {
			if (statusSelect.options[i].value == "New") {
				statusSelect.options[i].selected = true;
				statusSelect.disabled = true;
				break;
			}
		}
	}	

	//issueBox.style.display = "none";
	alert("Issue with ID " + issueId + " was added in the database");

}

function projectOverviewStructure() {
	var newRow = table.insertRow(table.length);
	var cell1 = newRow.insertCell(0);
	var cell2 = newRow.insertCell(1);
	var cell3 = newRow.insertCell(2);
	var cell4 = newRow.insertCell(3);
	var cell5 = newRow.insertCell(4);
	var cell6 = newRow.insertCell(5);
	var cell7 = newRow.insertCell(6);
	var cell8 = newRow.insertCell(7);
	var cell9 = newRow.insertCell(8);
	var cell10 = newRow.insertCell(9);
	var cell11 = newRow.insertCell(10);

	cell1.innerHTML = "Issue ID";
	cell2.innerHTML = "Issue Type";
	cell3.innerHTML = "Issue Name";
	cell4.innerHTML = "Sprint ID";
	cell5.innerHTML = "Created By";
	cell6.innerHTML = "Assignee";
	cell7.innerHTML = "Description";
	cell8.innerHTML = "Status ID";
	cell9.innerHTML = "Comments";
	cell10.innerHTML = "Updated at";
	cell11.innerHTML = "Created at";
}

function projectOverview() {
	if(issues.length > 0) {	
		issueBox.style.display = "none";
		issuesDisplay.style.display = "initial";
			
		for(var i = tempIssueNr; i < issues.length; i ++) {

			var newRow = table.insertRow(table.length);
			var cell1 = newRow.insertCell(0);
			var cell2 = newRow.insertCell(1);
			var cell3 = newRow.insertCell(2);
			var cell4 = newRow.insertCell(3);
			var cell5 = newRow.insertCell(4);
			var cell6 = newRow.insertCell(5);
			var cell7 = newRow.insertCell(6);
			var cell8 = newRow.insertCell(7);
			var cell9 = newRow.insertCell(8);
			var cell10 = newRow.insertCell(9);
			var cell11 = newRow.insertCell(10);

			cell1.innerHTML = issues[i].issueId;
			cell2.innerHTML = issues[i].issueType;
			cell3.innerHTML = issues[i].issueName;
			cell4.innerHTML = issues[i].issueSprint;
			cell5.innerHTML = issues[i].issueCreatedBy;
			cell6.innerHTML = issues[i].assignee;
			cell7.innerHTML = issues[i].issueDescription;
			cell8.innerHTML = issues[i].issueStatus;
			cell9.innerHTML = issues[i].issueComments;
			cell10.innerHTML = issues[i].updatedAt;
			cell11.innerHTML = issues[i].issueCreatedAt;

			tempIssueNr++;
		}

	}else {
		alert("You haven't added any issues yet!");
	}

	selectIssue();
}

function selectIssue() {
	for(var i = 0; i < table.rows.length; i++) {
		table.rows[i].onclick = function(){
			issueBox.style.display = "initial";
			mirrorIssueFields(this.rowIndex - 1);
			updateIssueBtn.disabled = false;
			updateIssueBtn.classList.remove("disabled");
			createIssueBtn.classList.add("disabled");
			createIssueBtn.disabled =true;
		}
	}
}

function clearTable(){
	while(table.hasChildNodes()) {
		table.removeChild(table.firstChild);
	}
}


function mirrorIssueFields(issueIndex) {
	var issue = issues[issueIndex];
	statusSelect.disabled = false;
	issueIdInput.value = issue.issueId;

	for(var i = 0; i < typeSelect.length; i++) {
		if (typeSelect.options[i].value == issue.issueType) {
			typeSelect.options[i].selected = true;
			break;
		}
	}

	issueNameInput.value = issue.issueName;

	for(var i = 0; i < selectSprint.length; i++) {	
		if (selectSprint.options[i].value.split(" ")[0] == issue.issueSprint) {
			selectSprint.options[i].selected = true;
			break;
		}
	}

	issueDescriptionInput.value = issue.issueDescription;

	for(var i = 0; i < statusSelect.length; i++) {
		if (statusSelect.options[i].value == statuses[issue.issueStatus]) {
			statusSelect.options[i].selected = true;
			break;
		}
	}

	for(var i = 0; i < assignedTo.length; i++) {
		if (assignedTo.options[i].value == issue.assignee) {
			assignedTo.options[i].selected = true;
			break;
		}
	}
}

function updateIssueFields() {
	issueBox.style.display = "none";
	var issueId = issueIdInput.value;
	var issue = issues[issueId - 1];
	var issueType = typeSelect.options[typeSelect.selectedIndex].value;
	var issueName = issueNameInput.value;
	var issueDescription = issueDescriptionInput.value;
	var issueSprintId = parseInt(selectIssueSprint.options[selectIssueSprint.selectedIndex].value.split(" ")[0]);
	var currentStatus = statusSelect.options[statusSelect.selectedIndex].value;
	var statusId = statuses.indexOf(currentStatus);
	var updatedAt = new Date();
	var selectedAssigneeName = assignedTo.options[assignedTo.selectedIndex].value;
	var assignee;
	
	for(var i = 0; i< allUsers.length; i++) {
		if(allUsers[i].userName == selectedAssigneeName){
			assignee = allUsers[i].userId;	
		}
	}
	
	issue.issueType = issueType;
	issue.issueName = issueName;
	issue.issueSprintId = issueSprintId;
	issue.asignee = assignee;
	issue.issueDescription = issueDescription;
	issue.issueStatus = statusId;
	issue.updatedAt = new Date();

	clearTable();
	projectOverviewStructure();
	tempIssueNr = 0;
}
