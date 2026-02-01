const express = require('express');
const path = require('path');
const app = express();

// إعداد المحرك
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// كود توثيق جوجل (خطي أحمر)
app.get('/googlef2bedd81991940c6.html', (req, res) => {
    res.send('google-site-verification: googlef2bedd81991940c6.html');
});

// الصفحة الرئيسية
app.get('/', (req, res) => {
    try {
        const products = [
            { id: 1, name: "منتج 1", price: 100 },
            { id: 2, name: "منتج 2", price: 200 }
        ];
        res.render('index', { products: products });
    } catch (err) {
        res.status(500).send("خطأ في تحميل الصفحة: " + err.message);
    }
});

// تصدير التطبيق لـ Vercel
module.exports = app;
