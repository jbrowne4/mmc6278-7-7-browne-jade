# Managing Passwords

(**NOTE:** View a rendered version of this file in VS Code with `ctrl-shift-v` or `cmd-shift-v`)

&nbsp;
## Security Concerns with Passwords

Any kind of sensitive information like passwords, credit cards, social security numbers, etc. should never be stored as plain text in a database, and ideally should be encrypted.

Hackers have been able to acquire entire databases of sensitive data through SQL injection and social engineering attacks. If this data is obtained, we could be held liable for the damages of exposing such sensitive information.

As far as passwords are concerned, we should one-way hash them so that even if our data is compromised, attackers would have a list of encrypted passwords that cannot be decrypted.

**NOTE:** This is part of the reason why if you call tech support they are unable to tell you your password and can only reset it or provide a temporary password. The value has (hopefully) been encrypted and is not available to even the administrators.

&nbsp;
## Bcrypt

The [bcrypt](https://github.com/kelektiv/node.bcrypt.js#usage) module provides a fairly simple API to allow us to hash our passwords relatively easily:

```js
const bcrypt = require('bcrypt')

// ...creating and comparing a hash inside an async function
const hash = await bcrypt.hash('myplainpassword', 10)
const isCorrectPass = await bcrypt.compare('myplainpassword', hash)
// isCorrectPass should be true
```
&nbsp;

This allows us to hash our password before storing it and then compare the hashed value with a submitted password when the user logs in. In this way, we never store the actual password in our database. Even if a hacker obtained the hashed value, it would not provide access to the application assuming we implement the rest of the app correctly.