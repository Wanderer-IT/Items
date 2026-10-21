const express = require('express');

const app = express();
app.use(express.json()); // enable JSON request-body parsing

const PORT = process.env.PORT || 3000; // Render supplies PORT

// In-memory storage (temporary)
let books = [
  { id: 1, title: 'Noli Me Tangere', author: 'Jose Rizal', year: 1887 },
  { id: 2, title: 'El Filibusterismo', author: 'Jose Rizal', year: 1891 },
];
let nextId = 3;

// Validate book data. When `partial` is true (PATCH), only validate fields present.
function validateBook(body, partial = false) {
  const errors = [];
  const { title, author, year } = body || {};

  if (!partial || title !== undefined) {
    if (typeof title !== 'string' || title.trim() === '') {
      errors.push('title is required and must be a non-empty string');
    }
  }
  if (!partial || author !== undefined) {
    if (typeof author !== 'string' || author.trim() === '') {
      errors.push('author is required and must be a non-empty string');
    }
  }
  if (!partial || year !== undefined) {
    if (!Number.isInteger(year) || year < 0 || year > new Date().getFullYear()) {
      errors.push('year is required and must be a valid integer (not in the future)');
    }
  }
  return errors;
}

function findBook(req) {
  const id = Number(req.params.id);
  return books.find((b) => b.id === id);
}

// Root route - API status
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Library Books API is running', endpoints: '/api/books' });
});

// READ all (optional ?author= filter)
app.get('/api/books', (req, res) => {
  const { author } = req.query;
  const result = author
    ? books.filter((b) => b.author.toLowerCase().includes(String(author).toLowerCase()))
    : books;
  res.status(200).json({ count: result.length, data: result });
});

// READ one
app.get('/api/books/:id', (req, res) => {
  const book = findBook(req);
  if (!book) return res.status(404).json({ error: `Book with id ${req.params.id} not found` });
  res.status(200).json(book);
});

// CREATE
app.post('/api/books', (req, res) => {
  const errors = validateBook(req.body);
  if (errors.length) return res.status(400).json({ error: 'Validation failed', details: errors });

  const { title, author, year } = req.body;
  const book = { id: nextId++, title: title.trim(), author: author.trim(), year };
  books.push(book);
  res.status(201).json(book);
});

// UPDATE (full replacement of editable fields)
app.put('/api/books/:id', (req, res) => {
  const book = findBook(req);
  if (!book) return res.status(404).json({ error: `Book with id ${req.params.id} not found` });

  const errors = validateBook(req.body);
  if (errors.length) return res.status(400).json({ error: 'Validation failed', details: errors });

  const { title, author, year } = req.body;
  book.title = title.trim();
  book.author = author.trim();
  book.year = year;
  res.status(200).json(book);
});

// UPDATE (partial)
app.patch('/api/books/:id', (req, res) => {
  const book = findBook(req);
  if (!book) return res.status(404).json({ error: `Book with id ${req.params.id} not found` });

  const errors = validateBook(req.body, true);
  if (errors.length) return res.status(400).json({ error: 'Validation failed', details: errors });

  const { title, author, year } = req.body;
  if (title !== undefined) book.title = title.trim();
  if (author !== undefined) book.author = author.trim();
  if (year !== undefined) book.year = year;
  res.status(200).json(book);
});

// DELETE
app.delete('/api/books/:id', (req, res) => {
  const book = findBook(req);
  if (!book) return res.status(404).json({ error: `Book with id ${req.params.id} not found` });

  books = books.filter((b) => b.id !== book.id);
  res.status(200).json({ message: `Book with id ${book.id} deleted`, deleted: book });
});

// Unknown route handler
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.method} ${req.originalUrl} not found` });
});

// Malformed JSON / unexpected errors
app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'Invalid JSON in request body' });
  }
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
