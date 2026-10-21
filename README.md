# Items API

A simple RESTful API built with Express.js for managing a collection of game weapons (items). It supports full CRUD operations: create, read, update, and delete. This project was built for ITPE101 Laboratory Activity 9.

## Technologies Used

- Node.js
- Express.js
- Postman (API testing)
- Git and GitHub (version control)
- Render (deployment)

## Installation and Local Execution

1. Clone the repository:
   ```bash
   git clone YOUR_GITHUB_REPOSITORY_URL
   cd YOUR_REPOSITORY_NAME
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```
4. The server runs at `http://localhost:3000` by default. If the `PORT` environment variable is set, it uses that port instead.

## Endpoints

| Method | Endpoint         | Purpose                     |
|--------|------------------|-----------------------------|
| GET    | `/`              | API status check            |
| GET    | `/api/items`     | Retrieve all items          |
| GET    | `/api/items/:id` | Retrieve a single item by ID |
| POST   | `/api/items`     | Create a new item           |
| PUT    | `/api/items/:id` | Update an existing item     |
| DELETE | `/api/items/:id` | Delete an item              |

### Status Codes

| Code | Meaning                                         |
|------|-------------------------------------------------|
| 200  | Request succeeded                               |
| 201  | Item created successfully                       |
| 400  | Invalid or missing fields, or malformed JSON    |
| 404  | Item or route not found                         |

## Item Fields

| Field    | Type   | Description                     |
|----------|--------|---------------------------------|
| `id`     | Number | Unique ID, auto-generated       |
| `name`   | String | Name of the item (required)     |
| `type`   | String | Type of item (required)         |
| `damage` | String | Damage value (required)         |

## Example Request Body

`POST /api/items`

```json
{
  "name": "Uchigatana",
  "type": "Katana",
  "damage": "115 + 80"
}
```

Example response (`201 Created`):

```json
{
  "message": "Item created successfully",
  "item": {
    "id": 3,
    "name": "Uchigatana",
    "type": "Katana",
    "damage": "115 + 80"
  }
}
```

Example error response (`400 Bad Request`) when a field is missing:

```json
{
  "message": "Name, type, and damage are required and must be non-empty strings."
}
```

## Links

- **GitHub Repository:** [YOUR_GITHUB_REPOSITORY_URL](https://github.com/Wanderer-IT/Libray)
- **Render Deployment:** https://your-service-name.onrender.com

## Known Limitations

- Data is stored in an in-memory array, so it is temporary. All records created during use are lost when the server restarts or the Render instance is replaced.
- There is no authentication, so anyone with the URL can modify data.
- On Render's free tier, the service may take up to a minute to wake up after a period of inactivity.
