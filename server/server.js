const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const util = require("util");
const { stat } = require('fs');

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'fastfurious'
})

const query = util.promisify(db.query).bind(db);

app.get('/', (req, res) => {
    return res.json("from server")
})

/**
 * task 1: insert game result into player table
 * task 2: update player table with wins&losses
 */ 
app.post('/insertgame', async (req, res) => {
    try {
        const insertQuery = await db.query(`INSERT into gameresult (Winner, Loser) VALUES (${req.body.winner}, ${req.body.loser})`) 
        const updateWinner = await db.query(`UPDATE player p JOIN(SELECT winner as player_id, COUNT(*) AS wins FROM gameresult GROUP BY winner) AS winner_stats ON p.player_id = winner_stats.player_id SET p.wins = winner_stats.wins`)
        const updateLoser = await db.query(`UPDATE player p JOIN(SELECT loser as player_id, COUNT(*) AS losses FROM gameresult GROUP BY loser) AS loser_stats ON p.player_id = loser_stats.player_id SET p.losses = loser_stats.losses`)
        return res.json("done")
    } catch (err) {
        console.error("error", err)
        if (err) return res.json(err)
    }
})

app.get('/fetchStats', async (req, res) => {
    try {
        // const statsQuery = await db.query(`SELECT * from player`, (err, result, field) => {
        //     console.log("result", result)
        //     return res.json(JSON.stringify(result))
        // }) 
        const statsQuery = await query(`SELECT * from player`)
        console.log("stats", statsQuery)
        return res.json(statsQuery)
    } catch (err) {
        console.error("error", err)
        if (err) return res.json(err)
    }
})

app.listen(8081, () => {
    console.log("listening on port 8081")
})