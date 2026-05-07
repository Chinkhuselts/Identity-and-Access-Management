# IAM System: Team Testing Guide

This guide explains how to test our Identity and Access Management system using the production API link.

**API Base URL:** `https://identity-and-access-management-production.up.railway.app`

---

## Phase 1: Creating your Identity (Registration)

Every team member needs to register first. This creates your user in the system, but you will have zero permissions by default (Security First approach).

**Command:**
```bash
curl -X POST https://identity-and-access-management-production.up.railway.app/auth/register \
-H "Content-Type: application/json" \
-d '{
 "username": "your_name",
 "email": "your_email@vizja.pl",
 "password": "your_password"
}'
```

**Action for Team:** Send your registered email to me (the Admin) so I can grant you permissions in the database.

---

## Phase 2: Obtaining your Digital ID (Login)

Once I have assigned you a role, you need to log in to receive your JWT (JSON Web Token). This token proves who you are to the server.

**Command:**
```bash
curl -X POST https://identity-and-access-management-production.up.railway.app/auth/login \
-H "Content-Type: application/json" \
-d '{
 "email": "your_email@vizja.pl",
 "password": "your_password"
}'
```

**What to look for:**
*   Copy the long string starting with `eyJ...` inside the `"token"` field.
*   Check the `"role"` field. If I haven't promoted you yet, it will say `null`.

---

## Phase 3: Testing the Security Guard (Authorization)

We have a protected endpoint `/users` that only Admins can see. This is where we test if our Role-Based Access Control (RBAC) works.

**Command:**
```bash
curl -X GET https://identity-and-access-management-production.up.railway.app/users \
-H "Authorization: Bearer PASTE_TOKEN"
```

**Expected Results for your Report:**
1.  **If you have no role (`null`):** You will see `{"error": "Access denied. Requires admin role"}`. This proves our security middleware is working!
2.  **If I promoted you to Admin:** You will see a JSON list of all users in the system.
3.  **If you use a fake/expired token:** You will see an "Unauthorized" or "Invalid token" error.

---

### Fast-Track: Testing as an "Admin"

Use this account to verify that the system grants full access to authorized administrators.

**Admin Credentials:**
*   **Email:** `demo1@vizja.pl`
*   **Password:** `securepassword1123`

**Step A: Login to get the Admin JWT**
```bash
curl -X POST https://identity-and-access-management-production.up.railway.app/auth/login \
-H "Content-Type: application/json" \
-d '{"email": "demo1@vizja.pl", "password": "securepassword1123"}'
```
*   **Result:** You will receive a JSON response. Copy the long `"token"` string.

**Step B: Access Protected User List**
```bash
curl -X GET https://identity-and-access-management-production.up.railway.app/users \
-H "Authorization: Bearer <PASTE_TOKEN>"
```
*   **Expected Result:** A full JSON list of all registered users. This proves Authorization is working.

---

## Phase 4: Accountability (Audit Logs)

Every time you run one of the commands above, the system automatically records your IP address, the action, and the timestamp.

Even if you get an "Access Denied" error, the system logs the attempt. This satisfies our project requirement for Full Auditing.

---

## Summary of what we are proving:

*   **Statelessness:** The server doesn't "remember" you; it only trusts the JWT you send.
*   **Integrity:** Passwords are never stored as plain text (we use bcrypt).
*   **RBAC:** Access is strictly controlled by roles, not just by being logged in.
