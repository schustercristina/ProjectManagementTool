# ProjectManagementTool

**This project has the following functionalities:**

**User creation** - a user can create an account with an unique name and an automaticaly generated ID.\
After creation, that account appears to be logged in;
	
**Sprint creation** - a user can create a sprint with an unique ID; sprints cannot be created if a user is not logged in;\
issue creation - "add new issue" button opens up an issue creation block; There the issue type, name, sprint (at sprint creation the list used here will be updated as well), assignee (at user creation this list will also be updated), status and description. Notice the difference between the "create issue" and the "update issue" buttons; after taping on the "add new issue" button, the "update" button is disabled. When updating the issue, the "create" button is disabled. After taping the "update" and "create" buttons, the issue creation block will be hidden. Also, the status is locked to "new" at creation, but unlocked at update.

**Project Overview** - when tapping the "project overview" button the issue creation block will be hidden and a table with all recorded issues will appear. \
If any issue needs to be updated one can simply tap on it and the issue creation block will reappear.

**Issue update** - after tapping on the issue that needs to be updated the issue creation block reappears loaded with all the details from that issue. \
The "create issue" button is disabled and the "update issue" one is enabled. \
After tapping on it, the issue creation block will be hidden and the user needs to access the project overview again to see the changes that have been made;
	

