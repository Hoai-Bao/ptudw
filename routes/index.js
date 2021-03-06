var express = require('express');
var router = express.Router();
const mProduct = require('../models/product_manage');
const User = require('../models/User');
const Category = require('../models/category');
const passport = require('passport');
const islog = require('../models/isAuth');
const gb = require('../config/globalF-V');
//function variable
//sản phẩm nổi bật
products = [];
oneproduct = function (src, title, cp, op, dp, bidder, time) {
  this.src = "images/" + src + ".jpg";
  this.title = title;
  this.cp = cp + "USD";
  this.op = op + "USD";
  this.dp = dp;
  this.bidder = "***" + bidder;
  this.time = time;
}
glob = [];

function addProduct(productRoot, src, title, cp, op, dp, bidder, time) {
  temp = new oneproduct(src, title, cp, op, dp, bidder, time);
  productRoot.push(temp);
  glob.push(temp);
}
phone = [];
addProduct(phone, "iphone11", "iphone 11", "2500", "1000", "20/11/2019", "GD", "05:06:07");
addProduct(phone, "nokia7.2", "nokia 7.2", "1000", "800", "21/11/2018", "GD", "06:08:09");
addProduct(phone, "s10", "samsung galaxy s10", "2000", "1500", "22/12/2011", "GD", "02:01:03");
addProduct(phone, "vertu", "Vertu Limited Edition", "15000", "10000", "23/11/2019", "GD", "08:09:01");
addProduct(phone, "rogphone", "Asus ROG Phone", "1920", "1000", "11/08/1211", "GD", "06:09:10");

laptop = [];
addProduct(laptop, "macpro2019", "Macbook Pro 2019", "8000", "7000", "22/11/2018", "GD", "05:03:11");
addProduct(laptop, "lggram", "LG gram 14", "5000", "4000", "23/10/1222", "GD", "05:11:59");
addProduct(laptop, "prox", "Suface Pro X", "99999", "9999", "02/12/1999", "GD", "12:22:35");
addProduct(laptop, "alien42", "Alien Ware", "99299", "2999", "02/12/2799", "GD", "12:22:11");
addProduct(laptop, "acernitro2019", "Acer Nitro 2019", "1000", "800", "03/08/2000", "GD", "11:11:11");

hotproduct = phone;
exPrice = laptop;
products = phone;
global.data = glob;
router.get('/', async(req, res, next)=> {
  const pByTime = await mProduct.productByTime();
  const pByPrice = await mProduct.productByPrice();
  res.render('pages/index', {
    title: 'Home',
    time: Object.values(pByTime),
    price:pByPrice,
    gb:(values)=> gb.getDate(values),
    cate: req.session.cate
  });
  
});


//contact
router.get('/contact', (req, res, next) => {
  console.log(req.session.cate);
  res.render('pages/contact', {
    title: 'Contact'
  });
});
//about
router.get('/about', (req, res, next) => {
  res.render('pages/about', {
    title: 'About Us'
  });
});

//notification



module.exports = router;