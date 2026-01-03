const express = require("express");
const router = express.Router();
const db = require("../config/db");

// READ -> menampilkan semua user
router.get("/", (req, res) => {
  const sql = "SELECT * FROM users";

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Gagal mengambil data" });
    }
    res.json(results);
  });
});

// CREATE -> menambah user baru
router.post("/", (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Name wajib diisi" });
  }

  const sql = "INSERT INTO users (name) VALUES (?)";

  db.query(sql, [name], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Gagal menambahkan user" });
    }

    res.json({
      message: "User berhasil ditambahkan",
      data: {
        id: result.insertId,
        name,
      },
    });
  });
});

// UPDATE -> mengubah user berdasarkan ID
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Name wajib diisi" });
  }

  const sql = "UPDATE users SET name = ? WHERE id = ?";

  db.query(sql, [name, id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Gagal update user" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    res.json({ message: "User berhasil diupdate" });
  });
});

// DELETE -> menghapus user berdasarkan ID
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  const sql = "DELETE FROM users WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Gagal menghapus user" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    res.json({ message: "User berhasil dihapus" });
  });
});

module.exports = router;
