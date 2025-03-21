const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

const recordsFilePath = path.join(__dirname, "records.json");

app.use(cors());
app.use(bodyParser.json());

function loadRecords() {
    if (fs.existsSync(recordsFilePath)) {
        const data = fs.readFileSync(recordsFilePath, "utf-8");
        return JSON.parse(data);
    }
    return [];
}

function saveRecords(records) {
    fs.writeFileSync(recordsFilePath, JSON.stringify(records, null, 2), "utf-8");
}

let records = loadRecords();

app.post("/save-score", (req, res) => {
    const { player1, score1, player2, score2 } = req.body;
    
    if (!player1 || !player2 || score1 === undefined || score2 === undefined) {
        return res.status(400).json({ message: "Invalid data" });
    }
    
    let winner = score1 > score2 ? player1 : player2;
    let winnerScore = Math.max(score1, score2);
    let scoreSummary = score1 > score2 ?  `${score1}/${score2}` :  `${score2}/${score1}`;
    
    
    records.push({ winner, score: scoreSummary});
    saveRecords(records);

    console.log("Updated Records:", records);
    res.json({ message: "Score saved!", records });
});

app.get("/records", (req, res) => {
    console.log("Sending records:", records);
    res.json(records);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
