const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

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

app.get('/', (req, res) => {
    return res.json("from server")
})

/**
 * task 1: insert game result into player table
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

//     db.query(sql, async (err, data) => {
//         const updateLuke = 
//         const updateDom = 
//         db.query(updateLuke, async (err, data)=> {
//             if (err) return res.json(err);
//             // return res.json(data);
//             db.query(updateDom, async (err, data) => {
//                 if (err) return res.json(err)
//             })
//         })
//         console.log("err", err, "data", data)
//         if (err) return res.json(err);
//         return res.json(data);
//     })
// })

/**
 * task 2: update player table with wins&losses

 */


app.listen(8081, () => {
    console.log("listening on port 8081")
})