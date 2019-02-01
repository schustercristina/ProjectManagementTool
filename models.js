function User(id, name) {
	this.userId = id;
	this.userName = name;
}

function Project(id, sprints) {
	this.projectId = id;
	this.sprints = sprints; 
}

function Sprint(id, name) {
	this.sprintId = id;
	this.sprintName = name;
}

function Comment(id, name) {
	this.commentId = id;
	this.commentName = name;
}

function Issue(
	id,
	type, 
	name,
	sprintId,
	createdById,
	assigneeId,
	description,
	statusId,
	comments,
	updatedAt,
	createdAt) {

	this.issueId = id;
	this.issueType = type;
	this.issueName = name;
	this.issueSprint = sprintId;
	this.issueCreatedBy = createdById;
	this.assignee = assigneeId;
	this.issueDescription = description;
	this.issueStatus = statusId;
	this.issueComments = comments;
	this.updatedAt = updatedAt;
	this.issueCreatedAt = createdAt;

}

