const express =  require('express');
const bodyParser = require('body-parser');
const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bcrypt = require("bcrypt");
const app = express();
const PORT = 3000;
const config = require('./config');

const salt = 10;
const db = mysql.createConnection(config)

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database');
});

app.use(bodyParser.json());

app.post('/',(req, res) => {
    console.log(req.body);
    res.send('Journal Backend server started');
});

//create
app.post('/journal', (req, res) => {
  const { title, content, category } = req.body;
  console.log('data',)
  
  const query = 'INSERT INTO journal_list (title, content, category) VALUES (?, ?, ?)';
  const values = [title, content, category];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).send('Error inserting data');
      return;
    }
    console.log('Data inserted:', result);
    res.send('Journal entry added');
  });
});

// Endpoint to get all journal entries
app.get('/journals/list', (req, res) => {
  const query = 'SELECT * FROM journal_list';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).send('Error fetching data');
      return;
    }
    res.json(results);
  });
});

// Endpoint to get summarized journal entries
app.get('/journals/summary', (req, res) => {
  const { period } = req.query;

  let query;
  switch (period) {
    case 'daily':
      query = `
        SELECT title, content, category, DATE(cdate) as cdate
        FROM journal_list
        ORDER BY DATE(cdate) DESC
      `;
      break;
    case 'weekly':
      query = `
        SELECT title, content, category, YEARWEEK(cdate) as cdate
        FROM journal_list
        ORDER BY YEARWEEK(cdate) DESC
      `;
      break;
    case 'monthly':
      query = `
        SELECT title, content, category, DATE_FORMAT(cdate, '%Y-%m') as cdate
        FROM journal_list
        ORDER BY DATE_FORMAT(cdate, '%Y-%m') DESC
      `;
      break;
    default:
      res.status(400).send('Invalid period');
      return;
  }

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching summary data:', err);
      res.status(500).send('Error fetching summary data');
      return;
    }
    res.json(results);
  });
});

// Endpoint to delete a journal entry
app.delete('/delete/journal/:id', (req, res) => {
  // http://127.0.0.1:3000/delete/journal/1 (call this in frontend)
  const { id } = req.params;
  const query = 'DELETE FROM journal_list WHERE id = ?';
  
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting data:', err);
      res.status(500).send('Error deleting data');
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).send('No entry found with the given ID');
      return;
    }
    console.log('Data deleted:', result);
    res.send('Journal entry deleted');
  });
});

// Endpoint to update a journal entry
app.put('/update/journal/:id', (req, res) => {
  // http://127.0.0.1:3000/update/journal/1 (call this in frontend)
  const { id } = req.params;
  console.log('id',id);
  const { title, content, category, cdate } = req.body;

  const query = 'UPDATE journal_list SET title = ?, content = ?, category = ?, cdate = ? WHERE id = ?';
  const values = [title, content, category, cdate, id];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error updating data:', err);
      res.status(500).send('Error updating data');
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).send('No entry found with the given ID');
      return;
    }
    console.log('Data updated:', result);
    res.send('Journal entry updated');
  });
});

// Endpoint to update user information
app.put('/updateUser', (req, res) => {
  const token = req.headers['authorization'];
  const { username, password } = req.body;

  if (!token) {
    return res.status(401).json({ error: 'Access denied, no token provided.' });
  }

  try {
    const decoded = jwt.verify(token, 'jwt-secret-key');
    const currentUsername = decoded.username;

    // Fetch existing user data
    const fetchUserSql = 'SELECT * FROM login WHERE username = ?';
    db.query(fetchUserSql, [currentUsername], (err, result) => {
      if (err) return res.status(500).json({ error: 'Database error during user fetch' });

      if (result.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Update user data
      const updateUserSql = 'UPDATE login SET username = ?, password = ? WHERE username = ?';
      bcrypt.hash(password.toString(), salt, (err, hash) => {
        if (err) return res.status(500).json({ error: 'Error hashing password' });

        const values = [username, hash, currentUsername];

        db.query(updateUserSql, values, (err, result) => {
          if (err) return res.status(500).json({ error: 'Updating data error in server' });
          return res.json({ status: 'Success' });
        });
      });
    });
  } catch (err) {
    return res.status(400).json({ error: 'Invalid token' });
  }
});


// POST API for register
app.post("/register", (req, res) => {
  const { username, password } = req.body;
console.log('data', username, password);
  // Check if the username already exists
  const checkUserSql = "SELECT * FROM login WHERE username = ?";
  db.query(checkUserSql, [username], (err, result) => {
    if (err) return res.json({ error: "Database error during username check" });

    if (result.length > 0) {
      // Username already exists
      return res.json({ error: "User has already been registered. Try another username." });
    }

    // If username does not exist, proceed with registration
    const insertUserSql = "INSERT INTO login (`username`, `password`) VALUES (?)";
    bcrypt.hash(password.toString(), salt, (err, hash) => {
      if (err) return res.json({ error: "Error hashing password" });

      const values = [
        username,
        hash,
      ];

      db.query(insertUserSql, [values], (err, result) => {
        if (err) return res.json({ error: "Inserting data error in server" });
        return res.json({ status: "Success" });
      });
    });
  });
});


//Post API for login
app.post("/login", (req, res) => {
  const sql = "SELECT * FROM login WHERE username = ?";
  db.query(sql, [req.body.username], (err, data) => {
    if (err) return res.json({ error: "Login error in server" });
    if (data.length > 0) {
      bcrypt.compare(
        req.body.password.toString(),
        data[0].password,
        (err, response) => {
          if (err) return res.json({ error: "Password hash error" });
          if (response) {
            const username = data[0].username;
            //jwt-secret-key will be chenged with real secret key
            const token = jwt.sign({ username }, "jwt-secret-key", {
              expiresIn: "1d",
            });
            res.cookie("token", token);
            return res.json({
              data: { token, status: "Login Success", username, ...data[0]},
            });
          } else {
            return res.json({ Error: "Password not matched" });
          }
        }
      );
    } else {
      return res.json({ error: "No user existed kindly register" });
    }
  });
});

app.listen(PORT,() => {
    console.log('Server is running on port ' + PORT);
})