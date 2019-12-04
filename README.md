# Team 32 - Book Exchange
Hosted on https://aqueous-plateau-50919.herokuapp.com
To run locally enter the command ```npm run-script build-run``` in the root folder

## Testing Accounts
#### Users
Username: user  
Password: user

#### Admin
Username: admin  
Password: admin

## Usage
The descriptions below describe website usage for a regular user. Admins will have access to the same features as a regular user in addition to being able to delete posts.

SIGN UP:
- Sign up by clicking on register button on the navigation bar, automatically logs in upon successful creation

SIGN IN:
- Log in by clicking on sign in button on the navigation bar

HOME PAGE:
- Landing page of the website, can also click on the navbar logo to navigate here
- View and search for textbook listings
- Can click on a specific textbook posting for more details of the posting

TEXTBOOK PAGE:
- Get to textbook page by clicking on one of the textbook postings in the home page
- More details of the textbook including picture and description and option to message seller 
- Can message seller by clicking on contact button at the bottom of page, but must be signed in

PROFILE POPUP:
- Must be signed in
- Get to profile by clicking on user dropdown on header and selecting profile
- Displays username and profile image
- Can change password or delete account by selecting button accordingly 

HISTORY PAGE:
- Must be signed in
- Get to history by clicking on user dropdown on header and selecting history
- List of user posts and past exchange history
- Can edit or delete post, delete past history

MESSAGES PAGE:
- Must be signed in
- Get to messages page by clicking on user dropdown on header and selecting messages
- Displays messages received or sent by clicking on option accordingly, has option to reply or delete a message

POST POPUP
- Must be signed in
- Get to post popup by clicking on post button on header
- User can post a new textbook posting
- Posting must include title, author and price but optional picture url and description

## Routes
Below are the different routes used to help manipulate resources and providing functionality of the app

#### Users - used for signup, login/logout, update user
- GET  /users/ - returns all users in database
- GET  /users/current - returns current user of session
- GET  /users/:id - returns user associated with id
- POST  /users - creates/add a new user to the database and a session
- POST  /users/login - login a user and creates a session
- POST  /users/logout - logouts a user and destroys session
- PATCH /users/:id/change-password - updates password of user associated with id
- DELETE /users/:id - deletes user associated with id

#### Textbooks - used for displaying textbooks, specific textbook and post/delete a textbook
- GET  /textbooks/ - returns all textbooks in database
- GET  /textbooks/:id - returns textbook associated with id
- POST  /textbooks/ - creates/add a new textbook to the database
- POST /textbooks/update/:id - updates a textbook associated with id
- DELETE  /textbooks/:id - deletes a textbook associated with id 

#### Messages - used for displaying user messages sent and received, ability to send and delete message
- GET  /messages/ - returns all messages in database
- GET /messages/:id - returns message associated with id
- POST /messages/ - creates/add a new message to the database
- POST  /messages/update/:id - updates a message associated with id
- DELETE  /messages/:id - deletes message associated with id

#### Exchanges - used for displaying user exchanges, adding and deleting them 
- GET  /exchanges/ - returns all exchanges in database
- GET /exchanges/:id - returns exchange associated with id
- POST /exchanges/ - creates/add a new exchange to the database
- POST  /exchanges/update/:id - updates a exchange associated with id
- DELETE  /exchanges/:id - deletes exchange associated with id
