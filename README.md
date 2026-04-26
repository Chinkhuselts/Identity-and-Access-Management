# 🔐 Identity and Access Management (IAM) System

[![Deployed on Railway](https://img.shields.io/badge/Deployed_on-Railway-0B0D0E?style=for-the-badge&logo=railway)](https://identity-and-access-management-production.up.railway.app)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](#)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](#)


## 📌 Problem Statement & Motivation
[cite_start]In modern organizations, managing access to multiple digital tools (e.g., Slack, payroll, internal databases) can become complicated and error-prone as employees join, change roles, or leave[cite: 167, 168, 171]. [cite_start]When access is handled manually, outdated permissions can lead to severe security risks[cite: 174, 176, 200]. 

[cite_start]This project solves this by providing a centralized Identity and Access Management (IAM) system that ensures proper authentication, authorization, and auditing across all internal systems, reducing security risks and administrative overhead[cite: 179, 233].

🚀 **Live Prototype API:** `https://identity-and-access-management-production.up.railway.app`

---

## 🎯 In-Scope Features (Implemented)
[cite_start]This system was built strictly as a backend prototype focusing on core IAM API capabilities[cite: 159, 164]:

* [cite_start]**🔑 User Authentication:** Secure login and registration using `bcrypt` for secure password hashing[cite: 122, 124, 241].
* [cite_start]**🛡️ Role-Based Access Control (RBAC):** Assignment of specific roles (Administrator, Manager, Employee) to manage system permissions[cite: 126, 127].
* [cite_start]**🔐 Token-Based Security (JWT):** Stateless, secure API communication using JSON Web Tokens[cite: 132, 133].
* [cite_start]**📊 Audit Logging:** Automatic recording of critical actions (login attempts, role assignments) for security compliance[cite: 135, 136, 216].
* [cite_start]**👥 User Management:** Programmatic interface allowing administrators to manage accounts and access rights[cite: 129, 130].

[cite_start]*(Note: Per project constraints, features like a Full Web Interface, Single Sign-On (SSO), and Multi-Factor Authentication (MFA) are explicitly out of scope[cite: 144, 147, 149].)*

---

## 🏗️ System Architecture
[cite_start]The backend is structured into specialized services running through an Express API Gateway[cite: 5]:
1. [cite_start]**Auth Service:** Handles logins and JWT issuance[cite: 6, 7, 8].
2. [cite_start]**User Service:** Handles CRUD operations and RBAC role assignments[cite: 9, 10, 11].
3. [cite_start]**Audit Service:** Logs actions and ensures compliance[cite: 12, 13].
4. [cite_start]**Database:** PostgreSQL storing users, roles, and audit trails[cite: 14, 15].

---

## 📡 API Endpoints (For Testing via Postman/cURL)

[cite_start]The system assumes administrators will manage users directly through API requests[cite: 161]. Use Postman or cURL to interact with the live endpoints. 

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | Health check to verify the API Gateway is running | No |
| `POST` | `/auth/register` | Creates a new user in the database | No |
| `POST` | `/auth/login` | Authenticates user and returns a JWT | No |
| `GET` | `/users` | Lists all registered users and their roles | Yes (JWT + Admin) |
| `POST` | `/users/:id/roles` | Assigns a specific role to a user | Yes (JWT + Admin) |
| `DELETE` | `/users/:id` | Deactivates a user account | Yes (JWT + Admin) |
| `GET` | `/audit` | Retrieves system security logs | Yes (JWT + Admin) |

### Testing Example (cURL)
To test user registration programmatically:
```bash
curl -X POST [https://identity-and-access-management-production.up.railway.app/auth/register](https://identity-and-access-management-production.up.railway.app/auth/register) \
-H "Content-Type: application/json" \
-d '{"username": "demo_user", "email": "demo@vizja.pl", "password": "securepassword123"}'
```
