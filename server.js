const express = require("express");
const path = require("path");

const Database = require("better-sqlite3");

const db = new Database("shop.db");

db.prepare(`
    CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        items TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`).run();

const app = express();

app.use(express.json());

app.use(express.static(__dirname));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "test gpt.html"));
});

app.post("/api/orders", (req, res) => {
    const order = req.body;

    db.prepare(`
        INSERT INTO orders (items)
        VALUES (?)
    `).run(JSON.stringify(order.items));

    console.log("New order:", order);

    res.json({
        success: true,
        message: "سفارش با موفقیت ثبت شد"
    });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
