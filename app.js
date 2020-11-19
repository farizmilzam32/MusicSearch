const express = require("express");
const app = express();
const port = 3000
const axios = require("axios");
const { query } = require("express");



app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    res.render('index');
});

app.get("/list", (req, res) => {
    const query = req.query.search;
    axios.get(`https://itunes.apple.com/search?term=${query}`)
        .then(function (response) {
            // handle success
            const jsonData = response.data.results;
            res.render("list", { jsonData: jsonData });
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})