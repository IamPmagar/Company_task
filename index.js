const express = require('express');
const app = express();

function findChair(need, room) {
    const Chair = [];
    for (const rooms of room) {
        const totalCount = rooms[0].split('').filter(char => char === 'X').length;
        const chairs = rooms[1];
        const presentChair = Math.max(0, chairs - totalCount);
        if (need === 0) {
            break;
        }
        if (presentChair >= need) {
            Chair.push(need);
            need = 0;
        } else {
            Chair.push(presentChair);
            need -= presentChair;
        }
    }
    return Chair;
}

app.get('/', (req, res) => {
    const room = [['XXX', 3], ['XXXXX', 6], ['XXXXXX', 9], ['XXX', 2]];
    const Chair = parseInt(req.query.Chair);
    const result = findChair(Chair, room);
    res.json({ chairsTaken: result });
});

app.listen(1000);
