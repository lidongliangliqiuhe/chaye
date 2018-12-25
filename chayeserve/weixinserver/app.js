//1:加载模块 express pool
const express = require("express");
const fs = require("fs")
const multer = require("multer")
const pool = require("./pool");
const session=require("express-session")
//2:创建express对象
var app = express();
//2.1:加载跨域访问组件
const cors = require("cors");
//2.2:配置允许脚手架访问程序
app.use(cors({
    origin:["http://127.0.0.1:8888",
    "http://localhost:8888"],
    credentials:true,
	cookie:{
		maxAge:1000*60*60*24
	}
}));
//2.3配置express-session 模块
app.use(session({
	secret:"128位随机字符串",  //安全字符串
	resave:false,              //请求保存
	saveUninitialized:true     //初始化保存
}))

//3:指定监听端口3000
app.listen(3000);
//4:指定静态目录 public
// __dirname 当前程序所属目录绝对路径 
//app.js vue_app_server
app.use(express.static(__dirname+"/public"))


//功能1:首页轮播图
app.get("/imagelist",(req,res)=>{
   var obj = [
	  { id: 1, img_url:"http://192.168.43.93:3000/img/lunbo_1.jpg"},
      { id: 2, img_url:"http://192.168.43.93:3000/img/lunbo_2.jpg"},
      { id: 3, img_url:"http://192.168.43.93:3000/img/lunbo_3.jpg"},
      { id: 4, img_url:"http://192.168.43.93:3000/img/lunbo_4.jpg"},
   ];
   res.send(obj);
});

app.get("/insert_user",(req,res)=>{
	var openid = req.query.openid;
	var nickName = req.query.nickName;
	var avatarUrl = req.query.avatarUrl;
	var province = req.query.province;
	var city = req.query.city;
	var sql = "INSERT INTO cy_user VALUES(NULL,?,?,?,?,?)"
	pool.query(sql,[openid,nickName,avatarUrl,province,city],(err,result)=>{
		if (err) throw err;
		if (result.affectedRows>0){
			res.send({code:1})	
		}
	})
})

app.get("/queryByOpenid",(req,res)=>{
	var openid = req.query.openid;
	var sql = "SELECT * FROM cy_user WHERE openid=?";
	pool.query(sql,[openid],(err,result)=>{
		if (err) throw err;
		if(result.length>0){
			res.send(result)
		}
	})
})

app.get("/jiugonggelist",(req,res)=>{
	var obj =[
		{ pid: 1, img_url:"http://192.168.43.93:3000/img/jiugongge1.jpg",msg:"全部商品"},
		{ pid: 2, img_url:"http://192.168.43.93:3000/img/jiugongge2.jpg",msg:"福鼎白茶"},
		{ pid: 3, img_url:"http://192.168.43.93:3000/img/jiugongge3.jpg",msg:"龙井"},
		{ pid: 4, img_url:"http://192.168.43.93:3000/img/jiugongge4.jpg",msg:"普洱"},
		{ pid: 5, img_url:"http://192.168.43.93:3000/img/jiugongge5.jpg",msg:"礼茶"},
		{ pid: 6, img_url:"http://192.168.43.93:3000/img/jiugongge6.jpg",msg:"茶具"}
	];
	res.send(obj);
})
app.get("/rementuijianlist",(req,res)=>{
	var sql="SELECT cid,cimg,ctitle,cprice FROM cy_laptop WHERE cis_tuijian=1"
	pool.query(sql,(err,result)=>{
		if(err)throw err;
		res.send(result)
	})
})
app.get("/getClassList",(req,res)=>{
	var sql="SELECT cleibie from cy_laptop GROUP BY cleibie ORDER BY cid"
	pool.query(sql,(err,result)=>{
		if(err){throw err}
		res.send(result)
	})
})
app.get("/gethomeproducts",(req,res)=>{
	var pid=req.query.pid;
	if(pid==1){
		var sql="SELECT cid,cimg,ctitle,cprice,csold_count FROM cy_laptop"
		pool.query(sql,(err,result)=>{
		if (err)throw err;
		res.send(result)
		})
	}else if(pid==2){
		var clei="福鼎白茶"
		var sql="SELECT cid,cimg,ctitle,cprice,csold_count FROM cy_laptop WHERE cleibie=? "
		pool.query(sql,[clei],(err,result)=>{
		if (err)throw err;
		res.send(result)
		})
	}else if(pid==3){
		var clei="龙井"
		var sql="SELECT cid,cimg,ctitle,cprice,csold_count FROM cy_laptop WHERE cleibie=? "
		pool.query(sql,[clei],(err,result)=>{
		if (err)throw err;
		res.send(result)
		})
	}else if(pid==4){
		var clei="普洱"
		var sql="SELECT cid,cimg,ctitle,cprice,csold_count FROM cy_laptop WHERE cleibie=? "
		pool.query(sql,[clei],(err,result)=>{
		if (err)throw err;
		res.send(result)
		})
	}else if(pid==5){
		var clei="礼茶"
		var sql="SELECT cid,cimg,ctitle,cprice,csold_count FROM cy_laptop WHERE cleibie=? "
		pool.query(sql,[clei],(err,result)=>{
		if (err)throw err;
		res.send(result)
		})
	}else if(pid==6){
		var clei="茶具"
		var sql="SELECT cid,cimg,ctitle,cprice,csold_count FROM cy_laptop WHERE cleibie=? "
		pool.query(sql,[clei],(err,result)=>{
		if (err)throw err;
		res.send(result)
		})
	}
})
app.get("/getproducts",(req,res)=>{
	var cleibie=req.query.cleibie;
	if(cleibie==1){
		cleibie="普洱";
	}else if(cleibie==2){
		cleibie="礼茶";
	}else if(cleibie==3){
		cleibie="茶具"
	}else if(cleibie==4){
		cleibie="铁观音"	
	}else if(cleibie==5){
		cleibie="金俊眉"	
	}else if(cleibie==6){
		cleibie="碧螺春"	
	}else if(cleibie==7){
		cleibie="大红袍";
	}else if(cleibie==8){
		cleibie="菊花茶";
	}else if(cleibie==9){
		cleibie="正山小种"
	}else if(cleibie==10){
		cleibie="茉莉花茶"	
	}else if(cleibie==11){
		cleibie="福鼎白茶"	
	}else if(cleibie==0){
		cleibie="龙井"	
	}
	var sql="SELECT * FROM cy_laptop WHERE cleibie=? "
	pool.query(sql,[cleibie],(err,result)=>{
		if (err)throw err;
		res.send(result)
	})
})
//上传用户头像
//创建multer对象指定上传文件目录
var upload = multer({dest:"upload/"})
app.post("/uploads",upload.single("mypic"),(req,res)=>{ //upload.single 是单个上传 增加req.file属性  req.file.size 单位字节 req.file.mimetype 上传文件类型 req.file.originalname 上传文件原名 req.file.path 临时文件路径
	//指定上床文件表单 name=“mypic”
	//需要express fs multer
	//创建multer对象指定上传文件目录
	//创建处理上传请求 /upload 上传单个文件
	//获取上传文件大小拒绝大于2M
	var size = req.file.size/1000/1000;
	if (size>2)
	{
		req.send({code:-1,msg:"上传图片过大 超过2MB"})
	}
	//获取文件类型 图片
	var type = req.file.mimetype;
	var i2 = type.indexOf("image")
	if(i2==-1){
		req.send({code:-2,msg:"只能上传图片文件"})
		return;
	}
	//创建新文件名  时间戳.jpg
	var src="req.file.originalname"
	var fTime = new Date().getTime();
	var fRand = Math.floor(Math.random()*9999)
	var i3 = src.lastIndexOf(".");
	var suff =src.substring(i3,src.length)
	var des = "./upload/"+fTime+fRand+suff;
	console.log(des)
	//将临时文件移动到upload目录下
	fs.renameSync(req.file.path,des)
	//返回上传成功的信息
	res.send({code:1,msg:"图片上传成功"})
})

app.get("/getCarts",(req,res)=>{
	var uid=1  //req.session.uid;
	var sql="SELECT c.gid,c.guser_id,c.gcount,p.cprice,p.cname,p.cimg FROM cy_laptop p,cy_shoppingcart_item c WHERE p.cid=c.gproduct_id AND c.guser_id = ?";
	uid=parseInt(uid)
	pool.query(sql,[uid],(err,result)=>{
		if (err) throw err;
		res.send({code:1,data:result})
	})
})

app.get("/getdetail",(req,res)=>{
	var cid=req.query.cid
	var sql="SELECT * FROM cy_laptop WHERE cid=?"
	pool.query(sql,[cid],(err,result)=>{
		if (err) throw err;
		res.send(result)
	})
})
