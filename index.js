const express = require('express')
const app = express();
const db = require('./db');
console.log(db);
require('dotenv').config();

const port = process.env.PORT || 8080;

const POSTGRES_DB = process.env.POSTGRES_ACCESS;

app.use(express.json());

app.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM recipe ORDER BY timestamp DESC LIMIT 3');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/recipes', async (req, res) => {
  try {
    console.log(req);
    const { title, content } = req.body;

    // Insert data into PostgreSQL
    const result = await db.query('INSERT INTO recipe (title, content, timestamp) VALUES ($1, $2, $3) RETURNING *', [title, content, new Date()]);

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.patch('/recipes', async (req, res) => {
  try {
    console.log(req);
    const { title, id } = req.body;

    // Insert data into PostgreSQL
    const result = await db.query('UPDATE recipe SET title = $1 where id = $2', [title, id]);

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/recipes', async (req, res) => {
  try {
    console.log(req);
    const { id } = req.body;

    // Insert data into PostgreSQL
    const result = await db.query('DELETE FROM recipe where id = $1', [id]);

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.listen(port, () => {
  console.log('App is running at port: ', port);
});
