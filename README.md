# Cerberus Auth Template

**Cerberus** is a robust NestJS authentication template built using **Hexagonal Architecture**, **TypeORM**, **Role-Based Access Control**, and **Multi-Factor Authentication** — designed to protect your app’s core like a true gatekeeper.

---

## 📊 Resources

- [Database diagram (Auth)](https://dbdesigner.page.link/uFMNCMAJ2JCUsJko7)

## 🚀 Project Setup

### 1. Clone the repository

```bash
git clone https://github.com/griego-stack/cerberus-auth-template.git
cd cerberus-auth-template
```

Or use it as a template:
**`https://github.com/griego-stack/cerberus-auth-template`**

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Create the databases

Make sure you have the following MySQL databases:

- Main database: `cerbeus`
- Logs database: `cerbeus-logs`

---

### 4. Configure environment variables

Create a `.env` file at the root and define your environment variables:

```env
# App Configuration
PORT=8000

# Secrets
JWT_SECRET_KEY=your-secret-key
COOKIE_SECRET=your-secret

# Client Configuration
CLIENT_1_URL=http://localhost:3000

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=465
EMAIL_SECURE=true
EMAIL_HOST_USER=your-host-user
EMAIL_HOST_PASSWORD=your-host-password

# Social
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# Database Configuration
MAIN_DATABASE_NAME=cerbeus
MAIN_DATABASE_USER=your-user
MAIN_DATABASE_PASSWORD=your-password
```

---

### 5. Customize the application

Go to
`src/global/services/app-config.service.ts`
and feel free to customize it to fit your project.

---

### 6. Seed the database with initial values

Edit the seed files located in the `seed/` directory as needed, then run:

```bash
npm run seed
```

This will populate the `provider` and `role` tables with the initial values required by the system.
