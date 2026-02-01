const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session'); // ضروري عشان السلة تشتغل
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// 1. إعدادات السيرفر والسلة
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'alfursan_secret_2026',
    resave: false,
    saveUninitialized: true
}));

// 2. ملفات قاعدة البيانات (الفرسان)
const PRODUCTS_FILE = path.join(__dirname, 'alfursan_products.json');
const ORDERS_FILE = path.join(__dirname, 'alfursan_orders.json');

// التأكد من وجود الملفات عند التشغيل
if (!fs.existsSync(PRODUCTS_FILE)) fs.writeFileSync(PRODUCTS_FILE, JSON.stringify([]));
if (!fs.existsSync(ORDERS_FILE)) fs.writeFileSync(ORDERS_FILE, JSON.stringify([]));

// ================= الأوامر (Routes) =================

// [1] الصفحة الرئيسية مع البحث والخصم
app.get('/', (req, res) => {
    const products = JSON.parse(fs.readFileSync(PRODUCTS_FILE));
    const { q, size } = req.query;
    let filtered = products;

    if (q) filtered = filtered.filter(p => p.name.includes(q) || p.category.includes(q));
    if (size) filtered = filtered.filter(p => p.size == size);

    res.render('index', { 
        products: filtered, 
        cartCount: req.session.cart ? req.session.cart.length : 0 
    });
});

app.get('/add-to-cart/:id', (req, res) => {
    const products = JSON.parse(fs.readFileSync(PRODUCTS_FILE));
    const product = products.find(p => p.id == req.params.id);
    
    if (!req.session.cart) req.session.cart = [];
    if (product) {
        req.session.cart.push(product);
    }

    // الرد الجديد: بيبعت رقم السلة الجديد بدل ما يعمل ريفريش
    res.json({ cartCount: req.session.cart.length });
});
 
// 1. حل مشكلة الـ Checkout القديمة (عشان لو دوست اطلب الآن)
app.get('/checkout/:id', (req, res) => {
    const products = JSON.parse(fs.readFileSync(PRODUCTS_FILE));
    const product = products.find(p => p.id == req.params.id);
    
    if (!req.session.cart) req.session.cart = [];
    if (product) req.session.cart.push(product);
    
    // بديه للسلة بدل ما يديه صفحة خطأ
    res.redirect('/cart'); 
});

// 2. حل مشكلة الـ checkout-all (الزرار اللي في السلة)
app.get('/checkout-all', (req, res) => {
    const cart = req.session.cart || [];
    if (cart.length === 0) return res.redirect('/');
    
    let total = cart.reduce((sum, item) => sum + parseInt(item.price), 0);
    // هيوديه لصفحة البيانات اللي عملناها
    res.render('checkout_form', { total });
});

// [3] صفحة السلة (الزبون يشوف حاجته)
app.get('/cart', (req, res) => {
    const cart = req.session.cart || [];
    let total = cart.reduce((sum, item) => sum + parseInt(item.price), 0);
    res.render('cart', { cart, total });
});

// [4] لوحة الإدمن (تحديث تلقائي كل 5 ثواني من الـ EJS)
app.get('/admin-panel', (req, res) => {
    const products = JSON.parse(fs.readFileSync(PRODUCTS_FILE));
    const orders = JSON.parse(fs.readFileSync(ORDERS_FILE));
    res.render('admin', { products, orders });
});

// [5] إضافة منتج جديد (من الإدمن)
app.post('/add-product', (req, res) => {
    let products = JSON.parse(fs.readFileSync(PRODUCTS_FILE));
    const newProduct = {
        id: Date.now(),
        name: req.body.name,
        price: req.body.price,
        size: req.body.size,
        category: req.body.category,
        img: req.body.img || 'https://via.placeholder.com/200',
        desc: req.body.desc
    };
    products.push(newProduct);
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2));
    res.redirect('/admin-panel');
});

// [6] حذف منتج من المخزن
app.get('/delete-product/:id', (req, res) => {
    let products = JSON.parse(fs.readFileSync(PRODUCTS_FILE));
    products = products.filter(p => p.id != req.params.id);
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2));
    res.redirect('/admin-panel');
    
});


// [7] إتمام الطلب وتحويله للواتساب
app.post('/place-order', (req, res) => {
    let orders = JSON.parse(fs.readFileSync(ORDERS_FILE));
    const cart = req.session.cart || [];
    
    const newOrder = {
        id: Date.now(),
        name: req.body.name,
        phone: req.body.phone,
        address: req.body.address,
        items: cart,
        total: cart.reduce((sum, item) => sum + parseInt(item.price), 0),
        date: new Date().toLocaleString('ar-EG')
    };
    
    orders.push(newOrder);
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2));
    
    // تصفير السلة بعد نجاح الطلب
    req.session.cart = [];
    
    res.render('success', { order: newOrder });
});

app.listen(port, () => {
    console.log(`🏁 متجر الفرسان شغال على: http://localhost:${port}`);
    console.log(`📍 العنوان: بني سويف - شارع عبد السلام عارف`);
});