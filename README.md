# 🔐 Identity and Access Management (IAM) System

[![Deployed on Railway](https://img.shields.io/badge/Deployed_on-Railway-0B0D0E?style=for-the-badge&logo=railway)](https://identity-and-access-management-production.up.railway.app)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](#)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](#)


## 📌 Problem Statement & Motivation
Managing digital tool access across modern organizations can be complex and error-prone. This project addresses that challenge by offering a centralized Identity and Access Management (IAM) API. It ensures proper authorization, tracking, and authentication across internal systems, significantly reducing administrative overhead and potential security vulnerabilities.

🚀 **Live Prototype API:** `https://identity-and-access-management-production.up.railway.app`

---

## 🎯 Core Features (Implemented)
This application was developed exclusively as a backend API prototype:

* **🔑 Authentication System:** Allows users to securely register and log in, utilizing `bcrypt` for password protection.
* **🛡️ Access Control (RBAC):** Grants specific privileges based on assigned user roles like Administrator or Manager.
* **🔐 Stateless Security:** Implements JSON Web Tokens (JWT) for safe API interactions.
* **📊 Activity Logging:** Tracks important events such as logins and role updates for monitoring purposes.
* **👥 Account Management:** Provides administrative endpoints to handle user profiles and access levels.

*(Note: Advanced features such as graphical user interfaces, SSO, and MFA are not included in this phase.)*

---

## 🏗️ System Architecture
The backend consists of specialized services routed through an Express API:
1. **Auth Service:** Manages logins and issues JWTs.
2. **User Service:** Manages CRUD operations and role designations.
3. **Audit Service:** Records actions to maintain an activity trail.
4. **Database:** A PostgreSQL instance storing user data, roles, and logs.

---

## 📡 API Endpoints

The following endpoints are available for testing via Postman or cURL. Protected routes require a valid JWT in the `Authorization: Bearer <token>` header.

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
