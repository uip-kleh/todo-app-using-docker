const express = require('express');
const { Pool } = require('pg');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.use(express.static(path.join(__dirname, 'public')));

// 1. TODO一覧を取得する（IDの昇順で並び替え）
app.get('/api/todos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM todos ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Database Error');
  }
});

// 2. TODOを追加する
app.post('/api/todos', async (req, res) => {
  const { title } = req.body;
  try {
    await pool.query('INSERT INTO todos (title) VALUES ($1)', [title]);
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Database Error');
  }
});

// 3. TODOの完了状態を更新するAPI 👈 【新しく追加】
app.put('/api/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { is_completed } = req.body;
  try {
    await pool.query('UPDATE todos SET is_completed = $1 WHERE id = $2', [is_completed, id]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).send('Database Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
