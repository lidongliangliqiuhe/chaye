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
app.get("/jiugonggelist",(req,res)=>{
	var obj =[
		{ pid: 1, img_url:"http://192.168.43.93:3000/img/jiugongge1.jpg",msg:"全部商品"},
		{ pid: 2, img_url:"http://192.168.43.93:3000/img/jiugongge2.jpg",msg:"福鼎白茶"},
		{ pid: 3, img_url:"http://192.168.43.93:3000/img/jiugongge3.jpg",msg:"龙井"},
		{ pid: 4, img_url:"http://192.168.43.93:3000/img/jiugongge4.jpg",msg:"花茶"},
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
app.get("/getproducts",(req,res)=>{
	var cleibie=req.query.cleibie;
	console.log(cleibie)
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
	//需要express fs multer
	//创建multer对象指定上传文件目录
	//创建处理上传请求 /upload 上传单个文件
	//获取上传文件大小拒绝大于2M
	//获取文件类型 图片
	//创建新文件名  时间戳.jpg
	//将临时文件移动到upload目录下
	//返回上传成功的信息
})

//功能2:新闻分页显示
app.get("/newslist",(req,res)=>{
 //1:获取参数
 var pno = req.query.pno;
 var pageSize = req.query.pageSize;
 //2:设置默认值 1 7
 if(!pno){pno = 1}
 if(!pageSize){pageSize=7}
 //3:创建正则表达式验证用户输入验证
 var reg = /^[0-9]{1,3}$/;
 //4:如果错出停止函数运行
 if(!reg.test(pno)){
    res.send({code:-1,msg:"页编格式不正确"});
    return;
 }
 if(!reg.test(pageSize)){
    res.send({code:-2,msg:"页大小格式不正确"});
    return;
 }

 var progress = 0;
 var obj = {code:1};
 //5:创建sql1 查询总记录数   严格区分大小写
 var sql = "SELECT count(id) AS c FROM xz_news";
 pool.query(sql,(err,result)=>{
   if(err)throw err;
   var pageCount = Math.ceil(result[0].c/pageSize);
   progress+=50;
   obj.pageCount = pageCount;
   if(progress==100){
     res.send(obj);
   }
 });
 //6:创建sql2 查询当前页内容 严格区分大小写
 var sql =" SELECT id,title,ctime,img_url,";
     sql+=" point,content";
     sql+=" FROM xz_news";
     sql+=" LIMIT ?,?";
 var offset = parseInt((pno-1)*pageSize);
     pageSize = parseInt(pageSize);
 pool.query(sql,[offset,pageSize],(err,result)=>{
   if(err)throw err;
   progress+=50;
   obj.data=result;
   if(progress==100){
     res.send(obj);
   }
 })
 //7:返回结果
});  


//功能3:查找一条新闻详细信息
app.get("/newsinfo",(req,res)=>{
   //1:参数 id 
   var id = req.query.id;
   var sql = " SELECT id,title,content,";
       sql +=" point,ctime";
       sql +=" FROM xz_news WHERE id = ?";
   //3:json {code:1,data:[{}]}
   pool.query(sql,[id],(err,result)=>{
       if(err)throw err;
       res.send({code:1,data:result});
   });
});


//功能4:分页查找指定新闻下评论列表
app.get("/getcomment",(req,res)=>{
 //1:获取参数
 var pno = req.query.pno;  //页码
 var pageSize = req.query.pageSize;//页大小
 var nid = req.query.nid; //新闻id
 //2:设置默认值 1 7
 if(!pno){pno = 1}
 if(!pageSize){pageSize=7}
 //3:创建正则表达式验证用户输入验证
 var reg = /^[0-9]{1,3}$/;
 //4:如果错出停止函数运行
 if(!reg.test(pno)){
    res.send({code:-1,msg:"页编格式不正确"});
    return;
 }
 if(!reg.test(pageSize)){
    res.send({code:-2,msg:"页大小格式不正确"});
    return;
 }

 var progress = 0;
 var obj = {code:1};
 obj.uname=req.session.uname
 //5:创建sql1 查询总记录数   严格区分大小写
 var sql = "SELECT count(id) AS c FROM xz_comment WHERE nid = ?";
 nid = parseInt(nid);
 pool.query(sql,[nid],(err,result)=>{
   if(err)throw err;
   var pageCount = Math.ceil(result[0].c/pageSize);
   progress+=50;
   obj.pageCount = pageCount;
   if(progress==100){
     res.send(obj);
   }
 });
 //6:创建sql2 查询当前页内容 严格区分大小写
 var sql =" SELECT id,niming_name,ctime,";
     sql+=" content";
     sql+=" FROM xz_comment";
     sql+=" WHERE nid = ?";
     sql+=" ORDER BY id DESC";
     sql+=" LIMIT ?,?";
 var offset = parseInt((pno-1)*pageSize);
     pageSize = parseInt(pageSize);
 pool.query(sql,[nid,offset,pageSize],(err,result)=>{
   if(err)throw err;
   progress+=50;
   obj.data=result;
   if(progress==100){
     res.send(obj);
   }
 })
});

//功能5  发表评论
//引入第三方模块:bodyParser 处理post请求
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
  extended:false
}));
app.post("/addComment",(req,res)=>{
  //1:获取3个参数
  //需要第三方模块支持 bodyParser
  var nid = req.body.nid;
  var content = req.body.content;
  var niming_name = req.body.niming_name;
  //console.log(nid+":"+content+":"+niming_name);
  //2:创建sql语句
  var sql  =" INSERT INTO `xz_comment`(`id`,";
      sql +=" `nid`, `niming_name`, `ctime`,";
      sql +=" `content`) VALUES";
      sql +=" (null,?,?,now(),?)";
  nid = parseInt(nid);
  pool.query(sql,[nid,niming_name,content],(err,result)=>{
       if(err)throw err;
       res.send({code:1,msg:"评论发表成功"});
  });
  //3:返回添加结果
})

//功能6：查询商品列表
app.get("/goodslist",(req,res)=>{
	var obj=[];
	obj.push({id:1,title:"小辣椒",old:999,now:99,img_url:"http://127.0.0.1:3000/img/banner1.png"});
	obj.push({id:2,title:"中辣椒",old:1999,now:199,img_url:"http://127.0.0.1:3000/img/banner2.png"});
	obj.push({id:3,title:"大辣椒",old:2999,now:299,img_url:"http://127.0.0.1:3000/img/banner3.png"});
	obj.push({id:4,title:"超大辣椒",old:3999,now:399,img_url:"http://127.0.0.1:3000/img/banner4.png"});
	res.send(obj)
})
//功能7 用户登录
app.post("/login",(req,res)=>{
	var uname=req.body.uname
	var upwd=req.body.upwd
	var sql="SELECT id FROM xz_login WHERE uname=? AND upwd=md5(?)";
	pool.query(sql,[uname,upwd],(err,result)=>{
		if (err) throw err;
		if(result.length>0){
			req.session.uname=uname
			req.session.uid=result[0].id;
			res.send({code:1,msg:"登录成功"})
		}else{
			res.send({code:0,msg:"用户名或密码有误"})
		}
	})
})
//功能8 用户注册
app.post("/reg",(req,res)=>{
	var uname=req.body.uname;
	var upwd=req.body.upwd;
	var sql="INSERT INTO xz_login(uname, upwd) VALUES (?,md5(?))";
	pool.query(sql,[uname,upwd],(err,result)=>{
		if (err) throw err;
		res.send({code:1,msg:"注册成功"})
	})
})
//功能9 添加购物车中物品
app.post("/addCart",(req,res)=>{
  //1:获取3个参数
  //需要第三方模块支持 bodyParser
  var uid = req.session.uid;
  var pid = req.body.pid;
  var c = req.body.count;
  // uname=req.session.uname
	
  //2:创建sql语句
  var sql  =" INSERT INTO `xz_shoppingcart_item`(`iid`, `user_id`, `product_id`, `count`, `is_checked`) VALUES (null,?,?,?,0)"
  pool.query(sql,[uid,pid,c],(err,result)=>{
       if(err)throw err;
       res.send({code:1,msg:"购物车添加成功"});
  });
  //3:返回添加结果
})
//功能10 查询购物信息
app.get("/getCarts",(req,res)=>{
	var uid=req.session.uid;
	console.log(req.session)
	var sql="SELECT c.iid,c.user_id,c.count,p.price,p.lname FROM xz_laptop p,xz_shoppingcart_item c WHERE p.lid=c.product_id AND c.user_id = ?";
	uid=parseInt(uid)
	pool.query(sql,[uid],(err,result)=>{
		if (err) throw err;
		res.send({code:1,data:result})
	})
})
//功能11 更新购物车中物品数量的接口
app.get("/updateCart",(req,res)=>{
	//参数  iid  数量  状态 opt 0 加 1 减
	//UPDATE xz_shoppingcart_item SET count=? WHERE iid=?
	var iid=req.query.iid;
	var count=req.query.count;
	console.log(req.session)
	var sql="UPDATE xz_shoppingcart_item SET count=? WHERE iid=?"
	pool.query(sql,[count,iid],(err,result)=>{
		if (err) throw err;
		//console.log(result)
		if (result.affectedRows > 0)
		{
			res.send({code:1,msg:"数量修改成功"})
		}else{
			res.send({code:0,msg:"修改失败"})
		}
		
	})
})
//功能12 搜索商品
app.get("/search",(req,res)=>{
	var keyword=req.query.keyword;
	var low = req.query.low;
	var high =req.query.high;
	var sql="SELECT lid,lname,price FROM xz_laptop WHERE lname LIKE ? AND price>=? AND price <=?";
	low=parseFloat(low);
	high=parseFloat(high);
	pool.query(sql,[`%${keyword}%`,low,high],(err,result)=>{
		if(err) throw err;
		if(result.length==0){
			res.send({code:-1,msg:"您搜索的商品不存在奥！"})
		}else{
			res.send({code:1,data:result})
		}
	})
})