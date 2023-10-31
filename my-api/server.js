const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:3000' }));

// Konfigurasi koneksi ke database MySQL
const db_config = {
    host: 'localhost',
    user: 'root',
    password: '', 
    database: 'item_management_system', 
};

// Fungsi untuk mengatur ulang koneksi ke database
function handleDisconnect() {
    global.connection = mysql.createConnection(db_config);

    global.connection.connect((err) => {
        if (err) {
            console.error('Koneksi database gagal:', err);
            setTimeout(handleDisconnect, 2000);
        } else {
            console.log('Koneksi database berhasil');
        }
    });

    global.connection.on('error', (err) => {
        console.error('Koneksi database terputus:', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleDisconnect();
        } else {
            throw err;
        }
    });
}

handleDisconnect();

// Kunci rahasia untuk pembuatan dan verifikasi token
const secretKey = 'rahasia-super-rahasia'; 

// Rute API untuk login
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    // Periksa informasi login di database MySQL
    const sql = 'SELECT * FROM user WHERE username = ? AND password = ?';
    global.connection.query(sql, [username, password], (err, result) => {
        if (err) {
            console.error('Terjadi kesalahan saat mengambil data pengguna:', err);
            res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data pengguna.' });
            return;
        }

        if (result.length > 0) {
            const token = jwt.sign({ userId: result[0].id }, secretKey, { expiresIn: '3h' });

            res.json({ message: 'Login berhasil', token });
        } else {
            res.status(401).json({ message: 'Username/Password salah' });
        }
    });
});


// Rute API untuk detaildata
app.get('/api/detailData', (req, res) => {
    let sql = 'SELECT `Condition`, SUM(`Amount`) AS total_amount FROM `asset` WHERE `Condition` IN (\'New\', \'Old\', \'Repaired\', \'Bad\', \'Moved\') GROUP BY `Condition`';
    global.connection.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data.' });
        } else {
            res.send(result);
        }
    });
});

// Rute API untuk Grafik & Filter
app.get('/api/graph', (req, res) => {
    let startDate = req.query.startDate;
    let endDate = req.query.endDate;
    let sql = 'SELECT `Condition`, SUM(`Amount`) AS total_amount FROM `asset` WHERE `Input_Date` BETWEEN ? AND ? AND `Condition` IN (\'New\', \'Old\', \'Repaired\', \'Bad\', \'Moved\') GROUP BY `Condition`';
    global.connection.query(sql, [startDate, endDate], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data.' });
        } else {
            res.send(result);
        }
    });
});

 
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
