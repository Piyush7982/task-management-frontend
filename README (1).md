`Installation`

Before you begin, ensure you have the following prerequisites:
-run backend first

Follow these steps to set up the frontend:
1. Create an empty folder on your local machine.

2. Open this folder in your favorite code editor.


3. Open the terminal within your code editor.
4. Initialize a new Git repository by running the command
`git init`

5. Clone the project repository by running the command:
git clone 
`https://github.com/Piyush7982/task-management-frontend.git`

6. Navigate into the cloned repository by running the 
command:
`cd task-management-frontend`

7. Install the necessary dependencies by running the 
command:
`npm i`

8. Go to `src\helper\axios.instance.js` and change 
the base URL if required.

9. Start the application by running the command:
`npm run dev`

You have now successfully set up the frontend of the 
TaskManager application on your local machine




`CodeFlow`
The frontend of the TaskManager application is structured as 
follows:

Home Page (“/”): The application’s landing page. It contains 
two buttons that navigate to the User page.

User Page (“/user”): This page is authentication-protected and 
displays the user’s tasks. New users are redirected to the Login 
page.
 After successful signup, a cookie is created, and the user 
is navigated to the User page. Here, users can create, read, 
update, and delete tasks.

In the TaskManager application, user authentication is handled 
through cookies. After a successful login or signup on the 
backend, a cookie is created and sent to the frontend.
 This 
cookie is essential for user authentication - users can only log 
in to the application once they have this cookie.

On the User page, there is a pencil icon that users can use to 
create new tasks. By clicking on this icon, users can write and 
add new tasks to their list, enhancing their task management 
experience.

Profile (“/user/profile”): Accessible from the left navbar, this 
page displays the user’s profile information. Users can read, 
update, and delete their account information here.

Logout: A button on the left navbar allows users to log out, 
clearing all cookies in the process.

Error Handling: The application includes a 404 Not Found page 
at the “/*” route for handling unknown routes, and an Internal 
Server Error page at the “/500” route for handling server errors.

This flow provides a comprehensive user experience, allowing 
users to manage their tasks and account information 
efficiently