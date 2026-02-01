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
const express = require('express');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// 1. كود توثيق جوجل (عشان ميتشالش)
app.get('/googlef2bedd81991940c6.html', (req, res) => {
    res.send('google-site-verification: googlef2bedd81991940c6.html');
});

// 2. الصفحة الرئيسية (اللي فيها الكود بتاعك)
app.get('/', (req, res) => {
    // المنتجات لازم يكون فيها (img, name, desc, price, id) عشان كود الـ HTML يقرأها صح
    const products = [
        { 
            id: "1", 
            name: "كاوتش ميشلان R15", 
            desc: "أفضل جودة وأطول عمر افتراضي", 
            price: "4500", 
            img: "https://via.placeholder.com/200x150?text=Michelin" 
        },
        { 
            id: "2", 
            name: "بطارية كلورايد 70 أمبير", 
            desc: "ضمان سنة واستبدال فوري", 
            price: "3200", 
            img: "https://via.placeholder.com/200x150?text=Chloride" 
        }
    ];
    res.render('index', { products: products });
});

// 3. إضافة للسلة (عشان الـ Fetch اللي في كودك ميضربش)
app.get('/add-to-cart/:id', (req, res) => {
    // ده كود مؤقت عشان يشغل الزرار عندك
    res.json({ success: true, cartCount: 1 });
});

module.exports = app;

