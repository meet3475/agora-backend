const express = require("express");
const dataBase = require("./config/database");
const videoRoutes = require('./routes/videoRoutes');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/videos', videoRoutes);


app.listen(9000, (err) => {
    if (err) console.log(err);
    else dataBase();
    console.log("start server port 9000");
})
