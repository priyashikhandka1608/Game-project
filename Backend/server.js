const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

let highScores = [];

app.post("/save-score", (req, res) => {
    const { player, score } = req.body;
    if (!player || score === undefined) {
        return res.status(400).json({ message: "Invalid data" });
    }
    
    highScores.push({ player, score });
    highScores.sort((a, b) => b.score - a.score);
    
    console.log("Updated High Scores:", highScores);
    res.json({ message: "Score saved!", highScores });
});

app.get("/high-scores", (req, res) => {
    res.json(highScores);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
