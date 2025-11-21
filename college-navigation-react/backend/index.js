   import express from 'express';
   import cors from 'cors';
   import mysql from 'mysql2/promise';

   const app = express();
   const PORT = 4000;

   const pool = mysql.createPool({
     host: 'localhost',
     user: 'root',
     password: 'raghav23@',
     database: 'bhhraman',
   });

   app.use(cors());
   app.use(express.json());

   // This endpoint now just records the user's details and lets them in.
   // It does NOT verify against existing credentials.
   app.post('/api/login', async (req, res) => {
     const { email, password, phone } = req.body || {};
     if (!email) return res.status(400).json({ message: 'Email is required.' });

     try {
       // Try to create a new user entry whenever someone enters the app
       const [result] = await pool.query(
         'INSERT INTO users (email, password_hash, phone) VALUES (?, ?, ?)',
         [email, password || null, phone || null],
       );

       return res.json({
         message: 'Entry successful',
         user: { id: result.insertId, email, phone: phone || null },
       });
     } catch (err) {
       // If the email already exists, just fetch that user and let them in
       if (err && err.code === 'ER_DUP_ENTRY') {
         try {
           const [rows] = await pool.query(
             'SELECT id, email, phone FROM users WHERE email = ?',
             [email],
           );

           if (rows.length) {
             const user = rows[0];
             return res.json({
               message: 'Entry successful',
               user: { id: user.id, email: user.email, phone: phone || user.phone },
             });
           }
         } catch (innerErr) {
           console.error('Error fetching existing user after duplicate entry:', innerErr);
           return res.status(500).json({ message: 'Server error. Please try again later.' });
         }
       }

       console.error('Entry error:', err);
       return res.status(500).json({ message: 'Server error. Please try again later.' });
     }
   });

   // Store feedback stars in the database
   app.post('/api/feedback', async (req, res) => {
     const { email, rating } = req.body || {};

     if (!email || typeof rating !== 'number') {
       return res.status(400).json({ message: 'Email and numeric rating are required.' });
     }

     try {
       await pool.query('INSERT INTO feedback (email, rating) VALUES (?, ?)', [email, rating]);
       return res.json({ message: 'Feedback saved.' });
     } catch (err) {
       console.error('Error saving feedback:', err);
       return res.status(500).json({ message: 'Server error while saving feedback.' });
     }
   });

   app.listen(PORT, () => {
     console.log(`Auth API running on http://localhost:${PORT}`);
   });
