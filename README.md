# 🚀 Page Pulse

Page Pulse is a full-stack web application that audits any publicly accessible website and provides key information such as HTTP status, response time, page title, meta description, first H1 heading, image count, and approximate word count. It is designed to help users quickly analyze the basic health and structure of a webpage.

---

## ✨ Features

- 🌐 Audit any valid website URL
- ⚡ Measure page response time
- 📄 Display HTTP status code
- 📝 Extract page title
- 📋 Extract meta description
- 🔠 Extract first H1 heading
- 🖼 Count total images
- 📖 Calculate approximate word count
- ❌ Handle invalid URLs gracefully
- ⏱ Handle timeout and connection errors
- 📱 Responsive user interface

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- Axios
- CSS

### Backend
- Node.js
- Express.js
- Axios
- Cheerio

### Testing
- Jest
- Supertest

---

## 📂 Project Structure

```
Page-Pulse/
│
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── tests/
│   ├── app.js
│   ├── index.js
│   └── package.json
│
└── README.md
```

---

## ⚙ Installation

### Clone the repository

```bash
git clone <repository-url>
```

---

### Backend Setup

```bash
cd server
npm install
npm run dev
```

Backend runs on:

```
http://localhost:3001
```

---

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## 📡 API Endpoint

### POST `/api/audit`

### Request

```json
{
  "url": "https://example.com"
}
```

### Successful Response

```json
{
  "success": true,
  "status": 200,
  "responseTime": 215,
  "title": "Example Domain",
  "description": "...",
  "h1": "Example Domain",
  "images": 1,
  "wordCount": 150
}
```

### Error Response

```json
{
  "success": false,
  "message": "Invalid URL"
}
```

---

## 🧪 Running Tests

```bash
cd server
npm test
```

---

## 🏗 Design Decisions

- Used **Express.js** to create a lightweight REST API.
- Used **Axios** to fetch webpage content and measure response time.
- Used **Cheerio** to efficiently parse HTML without a browser.
- Separated the project into **routes, controllers, services, and utilities** for better maintainability.
- Added server-side URL validation to prevent invalid requests.
- Implemented error handling for invalid URLs, connection failures, timeouts, and non-HTML responses.

---

## 🚀 Future Improvements

- SEO score analysis
- Accessibility checks
- Performance insights
- SSL certificate validation
- Export reports as PDF
- Audit history
- Lighthouse integration
- Authentication and user dashboard

---

## 👨‍💻 Author

**Rahul G**

GitHub: https://github.com/Rahul-G23

---

## 📄 License

This project was developed as part of the **Digital Heroes Software Development Assessment**.