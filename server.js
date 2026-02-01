const express = require('express');
const path = require('path');
const app = express();

// إعدادات المحرك لضمان الوصول للملفات في بيئة Vercel
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// ملف توثيق جوجل (ثابت ومضمون)
app.get('/googlef2bedd81991940c6.html', (req, res) => {
    res.send('google-site-verification: googlef2bedd81991940c6.html');
});

// الصفحة الرئيسية (Index)
app.get('/', (req, res) => {
    // مصفوفة المنتجات - دي اللي هتعدل فيها بعدين براحتك
    const products = [
        { id: 1, name: "منتج رقم 1", price: "100", image: "https://via.placeholder.com/150" },
        { id: 2, name: "منتج رقم 2", price: "250", image: "https://via.placeholder.com/150" }
    ];
    res.render('index', { products });
});

// تصدير التطبيق - الطريقة الأكيدة لبيئة الـ Serverless
module.exports = app;
