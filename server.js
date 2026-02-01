const express = require('express');
const path = require('path');
const app = express();

// كود جوجل - ده أهم حاجة عشان التوثيق
app.get('/googlef2bedd81991940c6.html', (req, res) => {
    res.send('google-site-verification: googlef2bedd81991940c6.html');
});
});

// عشان الموقع ميضربش لو الفولدرات تاهت
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.send('<h1>مركز الفرسان شغال بنجاح!</h1><p>جاري تحديث المنتجات...</p>');
});

module.exports = app;

