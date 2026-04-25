\# IAM System — API Test Results



\## Use Case 1 — Register User

POST /auth/register

Result: User registered successfully, id: 1



\## Use Case 2 — Assign Admin Role

pgAdmin: INSERT INTO user\_roles VALUES (1, 1)

Result: INSERT 0 1



\## Use Case 3 — Login and Get JWT

POST /auth/login

Result: Login successful, JWT token received



\## Use Case 4 — Admin Creates Another User

POST /auth/register

Result: employee1 created, id: 2



\## Use Case 5 — Admin Assigns Role

POST /users/2/roles

Result: Role 'employee' assigned to user 2



\## Use Case 6 — Admin Revokes User

DELETE /users/2

Result: User 2 has been deactivated



\## Use Case 7 — Admin Views Audit Logs

GET /audit

Result: 5 audit log entries returned showing all actions

