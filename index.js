const { json } = require('express');
const express = require('express');
const request = require('request');
const db = require('./db/index');
const app = express();
const expressIp = require('express-ip');

app.use(expressIp().getIpInfoMiddleware);

app.get('/', (req, res) => {
  let ip = req.ipInfo;
	//ip = JSON.parse(ip);
	ip = ip.ip;
	console.log(ip);
	ip = String(ip);
	ip = ip.replace("::ffff:","");
	console.log(ip);
  request(`https://ip.useragentinfo.com/json?ip=`+ip, (error, response, body) => {
    console.log(body);
    body = JSON.parse(body);
    sql = "insert into ip_list (ip,country,province,city,area,isp) values(?,?,?,?,?,?);";
    db.query(sql,[ip,body.country,body.province,body.city,body.area,body.isp],(err,result)=>{
        if(err) {
            console.log(err);
        }
        else {
                res.send(`要注意网络安全呀，陌生的链接不要点哦，坏人会获取你的信息，你的i
                    p是:${ip},你所在的国家是${body.country},省份是:${body.province},城市是:${body.city},区域是:${
                    body.area},网络代理商是:${body.isp},再多的信息我就不解析啦~~~~~`);
        }
    });
    })
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
