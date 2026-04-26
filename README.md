# 🔐 Identity and Access Management (IAM) System

[![Deployed on Railway](https://img.shields.io/badge/Deployed_on-Railway-0B0D0E?style=for-the-badge&logo=railway)](https://identity-and-access-management-production.up.railway.app)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](#)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](#)

## 📌 Project Description
This project is a fully functioning, cloud-deployed **Identity and Access Management (IAM) API** designed to provide secure authentication, role-based access control (RBAC), and session management for modern web applications. 

By centralizing user authentication and authorization, this system reduces security risks, minimizes administrative overhead, and provides a secure gateway for internal systems to verify user identities.

🚀 **Live API Base URL:** `https://identity-and-access-management-production.up.railway.app`

---

## 🎯 Core Features
* **☁️ Cloud-Native Deployment:** Fully hosted on Railway.app with a live provisioned PostgreSQL database.
* **🔑 Secure Authentication:** User registration and login utilizing `bcryptjs` for robust password hashing.
* **🛡️ Role-Based Access Control (RBAC):** Foundation for assigning specific access tiers (e.g., Admin, Manager, User) to restrict protected resources.
* **🔐 Stateless Security:** Utilizes JSON Web Tokens (JWT) for secure, scalable API communication without relying on server-side sessions.
* **📊 Automated Audit Logging:** System automatically tracks critical user actions (like `LOGIN` and `REGISTER`) in the database for compliance and security monitoring.

---

## 🛠️ Technology Stack
* **Backend Framework:** Node.js with Express.js
* **Database:** PostgreSQL (Hosted on Railway)
* **Authentication:** JSON Web Tokens (JWT)
* **Security:** bcryptjs (password hashing)
* **Environment Management:** dotenv

---

## 📡 API Endpoints

Use these endpoints to interact with the live IAM system. All POST requests require a JSON body.

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | Health check to verify the API is running | No |
| `POST` | `/auth/register` | Creates a new user in the database | No |
| `POST` | `/auth/login` | Authenticates user and returns a JWT | No |
| `GET` | `/users/*` | User management operations (in development) | Yes (JWT) |
| `GET` | `/audit/*` | Retrieves security logs (in development) | Yes (JWT) |

### Example Request (Registration)
```bash
curl -X POST [https://identity-and-access-management-production.up.railway.app/auth/register](https://identity-and-access-management-production.up.railway.app/auth/register) \
-H "Content-Type: application/json" \
-d '{"username": "test_user", "email": "test@example.com", "password": "securepassword123"}'
