# Creating Users

(**NOTE:** View a rendered version of this file in VS Code with `ctrl-shift-v` or `cmd-shift-v`)

&nbsp;
## Use Bcrypt to Hash the User's Password

We never want to store a plain-text password in our database. Therefore, when the user is created, we'll first hash the password and then store it in the database.

We'll use Bcrypt's `hash` function, which creates a one-way hash. Install Bcrypt with `npm i bcrypt`.

Navigate to `index.js` inside of the `POST /user` route. Then write code to hash the user password and insert the user record into the `users` table.

Then, inside of the `POST /login` route, retrieve the user by username, compare the submitted password with bcrypt, and return the user object if the passwords match.