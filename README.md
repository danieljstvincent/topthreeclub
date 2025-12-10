# 🎯 Top Three Club

> *Curate, share, and discover the best of everything*

**Top Three Club** is a social platform where users share and explore curated lists of their top three favorites in any category imaginable. Whether it's your top three movies, restaurants, books, travel destinations, or hidden gems in your city, Top Three Club makes it easy to share your recommendations and discover new favorites from a community of passionate curators.

## ✨ Why Top Three?

The magic of three is real. Research shows that three is the perfect number for decision-making and memory retention. Not too overwhelming, not too limiting - just right. Top Three Club leverages this principle to help you:

- 🎨 **Curate with Purpose** - Focus on what truly matters by choosing only your top three
- 🌍 **Discover New Favorites** - Explore curated recommendations from people with similar tastes
- 🤝 **Build Community** - Connect with others through shared interests and passions
- 📊 **Track Your Journey** - Keep a personal archive of your evolving tastes over time

<img width="1330" height="859" alt="Screenshot from 2025-12-10 11-09-15" src="https://github.com/user-attachments/assets/30c3a21f-17ef-4b72-84d7-bac1ede572d6" />

---

## 🚀 Tech Stack

### Frontend
- **[Next.js 14](https://nextjs.org/)** - React framework with server-side rendering
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Vitest](https://vitest.dev/)** - Lightning-fast unit testing

### Backend
- **[Django 4.2+](https://www.djangoproject.com/)** - High-level Python web framework
- **[Django REST Framework](https://www.django-rest-framework.org/)** - Powerful API toolkit
- **[Django Allauth](https://django-allauth.readthedocs.io/)** - Authentication with social login
- **[PostgreSQL](https://www.postgresql.org/)** - Robust relational database
- **[pytest](https://pytest.org/)** - Python testing framework

---

## 📁 Project Structure

```
topthreeclub/
│
├── 🎨 frontend/              # Next.js React application
│   ├── src/
│   │   ├── components/       # Reusable React components
│   │   │   ├── auth/        # Login, Register components
│   │   │   └── layout/      # Header, Footer, Navigation
│   │   ├── pages/           # Next.js page routes
│   │   ├── lib/             # API client & utilities
│   │   └── test/            # Frontend test suite
│   ├── public/              # Static assets
│   └── package.json         # Node dependencies
│
├── ⚙️  backend/               # Django REST API
│   ├── apps/
│   │   ├── users/           # User management & authentication
│   │   └── common/          # Shared utilities
│   ├── config/              # Django settings & configuration
│   └── requirements/        # Python dependencies
│
└── 📖 README.md              # You are here!
```

---

## 🛠️ Getting Started

### Prerequisites

Make sure you have the following installed:
- **Python 3.12+**
- **Node.js 18+**
- **npm 9+**

### ⚡ Quick Start

#### 1️⃣ Backend Setup (Django)

```bash
# Navigate to backend
cd backend

# Create virtual environment
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements/development.txt

# Run migrations
python manage.py migrate

# (Optional) Create admin superuser
python manage.py createsuperuser

# Start Django server
python manage.py runserver
```

✅ **Backend running at:** http://localhost:8000

#### 2️⃣ Frontend Setup (Next.js)

Open a new terminal:

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Start Next.js development server
npm run dev
```

✅ **Frontend running at:** http://localhost:3000

---

## 🔧 Environment Variables

### Backend (`backend/.env`)

```bash
DEBUG=True
SECRET_KEY=your-secret-key-for-development
DATABASE_URL=sqlite:///db.sqlite3
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:3000

# Google OAuth (Optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Facebook OAuth (Optional)
FACEBOOK_APP_ID=your-facebook-app-id
FACEBOOK_APP_SECRET=your-facebook-app-secret
```

### Frontend (`frontend/.env.local`)

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## 🧪 Running Tests

### Frontend Tests

```bash
cd frontend

# Run all tests
npm run test

# Run with UI
npm run test:ui

# Generate coverage report
npm run test:coverage
```

### Backend Tests

```bash
cd backend
source venv/bin/activate
pytest
```

---

## 📡 API Endpoints

### 🔐 Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/users/register/` | Create new user account |
| `POST` | `/api/users/login/` | User login |
| `POST` | `/api/users/logout/` | User logout |
| `GET` | `/api/users/me/` | Get current user info |
| `GET` | `/api/users/social-auth-urls/` | Get OAuth URLs |

### 📋 Quests

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/users/quests/today/` | Get today's quest |
| `POST` | `/api/users/quests/today/` | Save quest progress |
| `POST` | `/api/users/quests/submit/` | Submit completed quest |
| `GET` | `/api/users/quests/history/` | Get quest history |
| `GET` | `/api/users/quests/stats/` | Get user statistics |
| `POST` | `/api/users/quests/bulk-sync/` | Bulk sync quests |

---

## 🚀 Deployment

### Frontend → Vercel

1. Push your code to GitHub
2. Import repository in [Vercel](https://vercel.com)
3. Set **Root Directory** to `frontend`
4. Add environment variable:
   - `NEXT_PUBLIC_API_URL` = Your backend URL
5. Deploy! 🎉

### Backend → Heroku / Railway / Render

1. Set environment variables in your platform
2. Use `requirements/production.txt`
3. Run migrations: `python manage.py migrate`
4. Collect static files: `python manage.py collectstatic`
5. Deploy with Gunicorn

---

## ✨ Features

- ✅ **User Authentication** - Email/password and social login (Google, Facebook)
- ✅ **OAuth Integration** - Seamless Google and Facebook login
- ✅ **Daily Quests** - Engage users with daily challenges
- ✅ **Quest History** - Track completed quests over time
- ✅ **User Statistics** - View achievements and progress
- ✅ **Responsive Design** - Beautiful on all devices
- ✅ **Type-Safe API** - Full TypeScript support

---

## 🤝 Contributing

We welcome contributions! Here's how:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Write or update tests
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

Built with ❤️ by the Top Three Club team

- [Next.js](https://nextjs.org/) - The React Framework
- [Django](https://www.djangoproject.com/) - The Web Framework for Perfectionists
- [Vercel](https://vercel.com/) - Deployment Platform
- All our amazing contributors!

---

<div align="center">
  <strong>⭐ Star us on GitHub — it helps!</strong>
  <br>
  <sub>Made with ☕ and 💻</sub>
</div>
