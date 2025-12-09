# Minimalist Portfolio

A unique, minimalist portfolio built with **Gatsby**, **React**, **Node.js**, and **styled-components**. Features a modern design with smooth animations, gradient accents, and a fully functional contact form.

## ✨ Features

- 🎨 **Unique Minimalist Design** - Clean, professional aesthetic with gradient accents
- 🌊 **Smooth Animations** - Framer Motion powered animations and transitions
- 📱 **Fully Responsive** - Optimized for all devices and screen sizes
- 🎭 **Styled Components** - Component-scoped styling with theme support
- 📧 **Contact Form** - Working contact form with email notifications
- ⚡ **Fast Performance** - Built with Gatsby for optimal loading speeds
- 🎯 **SEO Optimized** - Meta tags and structured data included

## 🚀 Tech Stack

### Frontend

- **Gatsby** - Static site generator
- **React** - UI library
- **Styled Components** - CSS-in-JS styling
- **Framer Motion** - Animation library
- **React Intersection Observer** - Scroll animations

### Backend

- **Node.js** - Runtime environment
- **Express** - Web framework
- **Nodemailer** - Email sending
- **Express Validator** - Input validation
- **Helmet** - Security headers

## 📦 Installation

### Prerequisites

- Node.js 16+ installed
- npm or yarn package manager

### Frontend Setup

```bash
cd frontend
npm install
npm run develop
```

The site will be available at `http://localhost:8000`

### Backend Setup

```bash
cd backend
npm install

# Create .env file from example
cp .env.example .env

# Edit .env with your email credentials
# Then start the server
npm run dev
```

The API will be available at `http://localhost:5000`

## ⚙️ Configuration

### Email Setup (Backend)

1. Edit `backend/.env` file
2. Add your email credentials:

```env
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

**For Gmail:**

- Enable 2-Step Verification
- Generate an App Password at https://myaccount.google.com/apppasswords
- Use the app password in the `.env` file

### Customization

#### Update Personal Information

Edit the following files to customize with your information:

- `frontend/src/components/Hero.js` - Name, tagline, description
- `frontend/src/components/About.js` - About text, skills
- `frontend/src/components/Projects.js` - Project showcase
- `frontend/src/components/Contact.js` - Contact information
- `frontend/gatsby-config.js` - Site metadata

#### Color Theme

Modify colors in `frontend/src/styles/theme.js`:

```javascript
colors: {
  primary: '#00d4ff',      // Cyan
  secondary: '#ff006e',     // Pink
  accent: '#8338ec',        // Purple
  // ... customize all colors
}
```

## 📝 Project Structure

```
Portfolio/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Layout.js
│   │   │   ├── Navigation.js
│   │   │   ├── Hero.js
│   │   │   ├── About.js
│   │   │   ├── Projects.js
│   │   │   ├── Contact.js
│   │   │   └── Footer.js
│   │   ├── pages/
│   │   │   └── index.js
│   │   └── styles/
│   │       ├── theme.js
│   │       └── GlobalStyles.js
│   ├── gatsby-config.js
│   ├── gatsby-browser.js
│   └── package.json
└── backend/
    ├── server.js
    ├── package.json
    └── .env.example
```

## 🎨 Design Features

- **Animated gradient backgrounds**
- **Smooth scroll behavior**
- **Hover effects on all interactive elements**
- **Mobile-friendly navigation menu**
- **Scroll-triggered animations**
- **Custom styled scrollbar**
- **Glassmorphism effects**
- **Floating geometric shapes**

## 🚀 Deployment

### Frontend (Gatsby)

Deploy to Netlify, Vercel, or Gatsby Cloud:

```bash
cd frontend
npm run build
```

### Backend (Node.js)

Deploy to Heroku, Railway, or any Node.js hosting:

```bash
cd backend
npm start
```

Remember to set environment variables on your hosting platform.

## 📄 License

MIT License - feel free to use this for your own portfolio!

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👤 Author

**Jayaram Uday**

- GitHub: [@jayaramuday](https://github.com/jayaramuday)
- Email: jayaram@example.com

---

Built with ❤️ using Gatsby, React, and Node.js
