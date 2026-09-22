const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user:     process.env.DB_USER     || 'postgres',
  host:     process.env.DB_HOST     || 'localhost',
  database: process.env.DB_NAME     || 'bugdb',
  password: process.env.DB_PASSWORD || 'bugpassword',
  port:     parseInt(process.env.DB_PORT) || 5432,
});

// ── Health ──────────────────────────────────────────────────────────────────
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', version: '1.0.0' });
});

// ── GET /api/bugs ────────────────────────────────────────────────────────────
// Returns all bugs, newest first.
// OPTIONAL CHALLENGE: support ?search=<query> to filter by title.
//   Example: GET /api/bugs?search=docker  → bugs whose title contains "docker" (case-insensitive)
//   Hint: Use a SQL WHERE clause with ILIKE.
// OPTIONAL CHALLENGE: support ?status=open to filter by status.
app.get('/api/bugs', async (req, res) => {
  try {
    // STUDENT TODO (optional): read req.query.search / req.query.status
    // and add WHERE clauses when they are provided
    const result = await pool.query('SELECT * FROM bugs ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── POST /api/bugs ───────────────────────────────────────────────────────────
// BUG #2: No validation — empty / whitespace-only titles are accepted.
// STUDENT FIX: Check that title is a non-empty, non-whitespace string.
//   Return HTTP 400 with { error: "Title is required" } when invalid.
app.post('/api/bugs', async (req, res) => {
  try {
    const { title, status = 'open' } = req.body;

    if (typeof title !== 'string' || !title.trim()) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const result = await pool.query(
      'INSERT INTO bugs (title, status) VALUES ($1, $2) RETURNING *',
      [title, status]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/bugs/:id', async (req, res) => {
  try {
    const result = await pool.query(
      'DELETE FROM bugs WHERE id = $1 RETURNING *',
      [req.params.id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Bug not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/bugs/:id', async (req, res) => {
  try {
    const { title, status } = req.body;
    const validStatuses = ['open', 'in_progress', 'closed'];

    if (typeof title !== 'string' || !title.trim()) {
      return res.status(400).json({ error: 'Title is required' });
    }
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const result = await pool.query(
      'UPDATE bugs SET title = $1, status = $2 WHERE id = $3 RETURNING *',
      [title, status, req.params.id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Bug not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── Server startup ───────────────────────────────────────────────────────────
const port = process.env.PORT || 8080;
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Bug Tracker backend running on port ${port}`);
  });
}

module.exports = app;
