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

// Rute API untuk dashboard
app.get('/api/dashboardData', (req, res) => {
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;

    // Periksa parameter yang diterima
    if (!startDate || !endDate) {
        return res.status(400).json({ error: 'Parameter startDate dan endDate diperlukan.' });
    }

    // Kueri database MySQL
    const sql = "SELECT `Condition` FROM `asset` WHERE `Input Date` BETWEEN ? AND ? AND `Condition` IN ('New', 'Old', 'Repaired', 'Bad', 'Moved')";

    global.connection.query(sql, [startDate, endDate], (err, results) => {
        if (err) {
            console.error('Terjadi kesalahan saat mengambil data dashboard:', err);
            return res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data dashboard.' });
        }

        res.json(results);
    });
});

//api untuk tabel report
app.get('/api/reportData', (req, res) => {
    const { category, location, condition, purchaseDateFilter, adjustmentDateFilter } = req.query;

    // Buat kueri database MySQL berdasarkan filter yang diterima
    let sql = 'SELECT * FROM asset WHERE 1=1';

    const params = [];

    if (category) {
        sql += ' AND category = ?';
        params.push(category);
    }

    if (location) {
        sql += ' AND location = ?';
        params.push(location);
    }

    if (condition) {
        sql += ' AND `Condition` = ?';
        params.push(condition);
    }

    if (purchaseDateFilter) {
        sql += ' AND `Date of Purchase` = ?';
        params.push(purchaseDateFilter);
    }

    if (adjustmentDateFilter) {
        sql += ' AND `Adjustment Date` = ?';
        params.push(adjustmentDateFilter);
    }

    global.connection.query(sql, params, (err, results) => {
        if (err) {
            console.error('Terjadi kesalahan saat mengambil data laporan:', err);
            return res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data laporan.' });
        }

        res.json(results);
    });
});

// Rute API untuk mengedit data berdasarkan ID
app.put('/api/editData/:id', (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;

    // Lakukan validasi dan kueri database MySQL untuk mengupdate data dengan ID yang sesuai
    const sql = 'UPDATE asset SET ? WHERE id = ?';
    global.connection.query(sql, [updatedData, id], (err, result) => {
        if (err) {
            console.error('Terjadi kesalahan saat mengupdate data:', err);
            return res.status(500).json({ error: 'Terjadi kesalahan saat mengupdate data.' });
        }

        res.json({ message: 'Data berhasil diupdate' });
    });
});

//api untuk delete pada tabel asset
app.delete('/api/deleteData/:id', (req, res) => {
    const id = req.params.id;

    // Lakukan kueri database MySQL untuk menghapus data dengan ID yang sesuai
    const sql = 'DELETE FROM asset WHERE id = ?';
    global.connection.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Terjadi kesalahan saat menghapus data:', err);
            return res.status(500).json({ error: 'Terjadi kesalahan saat menghapus data.' });
        }

        res.json({ message: 'Data berhasil dihapus' });
    });
});

//api untuk add data pada tabel asset
app.post('/api/addData', (req, res) => {
    const newData = req.body;

    // Lakukan validasi dan kueri database MySQL untuk menambahkan data baru
    const sql = 'INSERT INTO asset SET ?';
    global.connection.query(sql, newData, (err, result) => {
        if (err) {
            console.error('Terjadi kesalahan saat menambahkan data:', err);
            return res.status(500).json({ error: 'Terjadi kesalahan saat menambahkan data.' });
        }

        res.json({ message: 'Data berhasil ditambahkan', id: result.insertId });
    });
});


// Rute API untuk menerapkan filter pada data
app.get('/api/filterData', (req, res) => {
    const { category, location, condition, purchaseDateFilter, adjustmentDateFilter } = req.query;

    // Buat kueri database MySQL berdasarkan filter yang diterima
    let sql = 'SELECT * FROM asset WHERE 1=1';

    const params = [];

    if (category) {
        sql += ' AND category = ?';
        params.push(category);
    }

    if (location) {
        sql += ' AND location = ?';
        params.push(location);
    }

    if (condition) {
        sql += ' AND `Condition` = ?';
        params.push(condition);
    }

    if (purchaseDateFilter) {
        sql += ' AND `Date of Purchase` = ?';
        params.push(purchaseDateFilter);
    }

    if (adjustmentDateFilter) {
        sql += ' AND `Adjustment Date` = ?';
        params.push(adjustmentDateFilter);
    }

    global.connection.query(sql, params, (err, results) => {
        if (err) {
            console.error('Terjadi kesalahan saat mengambil data dengan filter:', err);
            return res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data dengan filter.' });
        }

        res.json(results);
    });
});


app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
