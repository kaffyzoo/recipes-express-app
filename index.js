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
    const { pageNo = 1, itemsPerPage = 2 } = req.params;
    const result = await db.query('SELECT * FROM recipe ORDER BY timestamp DESC LIMIT $1 OFFSET $2', [itemsPerPage, (pageNo - 1) * itemsPerPage]);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/recipes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query('SELECT * FROM recipe WHERE id = $1', [id]);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});


app.route('/recipes')
  .post(async (req, res) => {
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
  })
  .patch(async (req, res) => {
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
  })
  .delete(async (req, res) => {
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
