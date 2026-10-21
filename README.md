# Library Books API

A RESTful API for managing books in a small library, built with Express.js for ITPE101 (Integrative Programming & Technology) Laboratory Activity.

## Technologies Used
- Node.js
- Express.js
- Postman (testing)
- GitHub (source control)
- Render (deployment)

## Installation and Local Execution
```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd library-api
npm install
npm start        # or: node server.js
```
The server runs at `http://localhost:3000` (or the port in `process.env.PORT`).

## Endpoints
| Method | Route | Purpose | Success Code |
|--------|-------|---------|--------------|
| GET | `/` | API status check | 200 |
| GET | `/api/books` | Retrieve all books (optional `?author=` filter) | 200 |
| GET | `/api/books/:id` | Retrieve one book | 200 / 404 |
| POST | `/api/books` | Create a book | 201 / 400 |
| PUT | `/api/books/:id` | Replace a book's fields (all required) | 200 / 400 / 404 |
| PATCH | `/api/books/:id` | Partially update a book | 200 / 400 / 404 |
| DELETE | `/api/books/:id` | Delete a book | 200 / 404 |

## Book Fields
| Field | Type | Rules |
|-------|------|-------|
| id | number | auto-generated, unique |
| title | string | required, non-empty |
| author | string | required, non-empty |
| year | integer | required, not in the future |

## Example Request Body (POST /api/books)
```json
{
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "year": 2008
}
```

## Example Error Response (400)
```json
{
  "error": "Validation failed",
  "details": ["title is required and must be a non-empty string"]
}
```

## Links
- GitHub Repository: https://github.com/your-username/your-repository
- Render Deployment: https://your-service-name.onrender.com

## Known Limitations
- Data is stored in an in-memory array, so it is temporary: records reset when the server restarts or the Render instance is replaced or spins down.
- No authentication or database.
- Render's free tier may take ~30–60 seconds to wake up on the first request.
