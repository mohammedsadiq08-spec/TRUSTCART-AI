# TRUSTCART AI — Security Policy & Hardening Specifications

## 1. Security Architecture Summary

TRUSTCART AI employs defense-in-depth principles across its full-stack architecture:

### 1.1 Secret Key & Environment Safety
* **No Hardcoded Secrets**: Real production secrets, private keys, database passwords, and tokens are strictly prohibited in source code and git repositories.
* **Fail-Safe Startup Validation**: In `production` and `staging` environments, the FastAPI backend checks for `SECRET_KEY` integrity and terminates execution immediately if a missing or default key is detected.
* **Zero Secret Exposure**: Frontend client builds contain only public endpoints (`VITE_API_BASE_URL`).

### 1.2 CORS Isolation
* **Explicit Origins**: Wildcard `*` is forbidden in production. Allowed origins must be specified explicitly via `BACKEND_CORS_ORIGINS`.
* **Credentials Security**: Secure handling of cross-origin requests.

### 1.3 Authentication & Authorization
* **Password Hashing**: Passwords hashed using bcrypt with salt rounds (12).
* **JWT Access Tokens**: Time-bounded stateless JSON Web Tokens signed with HS256 algorithm.
* **No Email Enumeration**: Login failures return generic responses (`401: Invalid email or password`).
* **User Data Isolation (IDOR Protection)**: Every user-scoped query (saved products, analysis history, preference profiles) is bound strictly to `current_user.id` resolved from verified JWT signatures. User A cannot view or alter User B’s data.

### 1.4 Rate Limiting & Abuse Prevention
* **SlowAPI Middleware**: Sensitive endpoints (`/api/auth/register`, `/api/auth/login`, `/api/analysis/product`, `/api/social/analyze`) are rate-limited per client IP to mitigate brute force attacks and denial of service.

### 1.5 Input Sanitization & SSRF Defense
* **Schema Validation**: Strict Pydantic models enforce character limits, regex formats, and type boundaries.
* **URL Scheme Validation**: Prohibits dangerous URI schemes (`javascript:`, `file:`, `data:`, `vbscript:`).

### 1.6 HTTP Security Headers
All responses include:
* `X-Content-Type-Options: nosniff`
* `X-Frame-Options: DENY`
* `X-XSS-Protection: 1; mode=block`
* `Referrer-Policy: strict-origin-when-cross-origin`
* `Permissions-Policy: geolocation=(), camera=(), microphone=()`
* `X-Request-ID: <uuid>`

---

## 2. Reporting Security Vulnerabilities

If you discover a potential security vulnerability within TRUSTCART AI, please report it via security disclosure channels. Do not open public issues for sensitive vulnerabilities.
