const express = require('express');
const path = require('path');
const app = express();

// كود التحقق من جوجل (السطر اللي يهمنا)
app.get('/google40843657689849.html', (req, res) => {
    res.send('google-site-verification: google40843657689849.html');
});

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index', { products: [], cartCount: 0 }); // هيفتح صفحة index اللي في فولدر views
});

module.exports = app;
const port = process.env.PORT || 3000;
app.listen(port);
