**Message Board**
Message Board where users can write and read messages.
- Logged out users can only see messages but NOT the authors.
- Logged in users can see and write messages but NOT see the authors.
- Logged in users who are also CLUB MEMBERS can read and write messages and also see authors.
- Logged in admins can also delete messages.

**Technology**:
- psql
- express
- express-session
- passport
- bcrypt

**TODO:**
- create a DB called members_only [x]
- create tables for users, messages [x]
    - users fields: 
        - firstname, 
        - lastname, 
        - email, 
        - password, 
        - membership-status
        - isAdmin
    - messages fields: 
        - text
        - title
        - timestamp
        - author
- in express app make sure to gitignore the .env file [x]
- homepage should show the messages (but authors only visible for club-members)
- create a signup form [x]
    - sanitize inputs []
    - secure pw with bcrypt []
    - confirm pw field with custom validator []
- create new message form (only visible to logged in users) [x]
- create join-the-club page where users can join with a secret code [x]
- login form [x]
- create delete functionality for admins (set admin manually in db) []
- deploy []
- add css []


