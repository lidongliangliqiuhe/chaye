SET NAMES UTF8;
DROP DATABASE IF EXISTS cy;
CREATE DATABASE cy CHARSET=UTF8;
USE cy;

#1:进入库  zc
USE xz;
/**用户信息**/  #u
CREATE TABLE cy_user(
  uid										INT PRIMARY KEY AUTO_INCREMENT,	#用户id
  uname									VARCHAR(32),										#用户名
  upwd									VARCHAR(32),										#用户密码
  uemail								VARCHAR(64),										#用户邮箱
  uphone								VARCHAR(16),										#用户手机
  uavatar								VARCHAR(128),										#头像图片路径
  u_name								VARCHAR(32),										#用户名，如王小明
  ugender								INT															#性别  0-女  1-男
);
/*添加用户数据*/
INSERT INTO cy_user VALUES
(NULL, 'dingding', '123456', 'li@qq.com', '13501234567', 'img/avatar/default.png', '李迪昂', '1'),
(NULL, 'dangdang', '123456', 'dang@qq.com', '13501234568', 'img/avatar/default.png', '林当', '1'),
(NULL, 'doudou', '123456', 'qi@qq.com', '13501234569', 'img/avatar/default.png', '齐世聪', '1'),
(NULL, 'yaya', '123456', 'ma@qq.com', '13501234560', 'img/avatar/default.png', '马薇薇', '0');


/**茶叶商品列表**/ #c
CREATE TABLE cy_laptop(
  cid										INT PRIMARY KEY AUTO_INCREMENT,	#茶叶id
	cname									VARCHAR(12),										#茶叶名称
	cleibie								INT,															#茶叶类别 1-龙井 2-普洱 3-礼茶 4-茶具 5-铁观音 6-金骏眉 7-碧螺春 8-大红袍 9-菊花茶 10-正山小种 11-茉莉花茶 12-福鼎白茶 13-其他
	cimg									VARCHAR(128),										#茶叶图片路径
  ctitle								VARCHAR(128),										#主标题
  csubtitle							VARCHAR(128),										#副标题
  cprice								DECIMAL(10,2),									#价格
  csold_count						INT,														#已售出的数量
  cis_onsale						INT,												#是否促销中 1-是 0-否
	cis_tuijian						INT													#是否是推荐商品 1-是 0-否
);

/*添加商品*/
INSERT INTO cy_laptop VALUES
(NULL,'取舍龙井',1,'http://192.168.43.93:3000/img/product_img/lvcha1.jpg','新茶龙井春茶绿茶明前龙井茶叶礼盒装罐装买一送一共500克','全国多仓发货',198,213,1,1),
(NULL,'明前龙井',1,'http://192.168.43.93:3000/img/product_img/lvcha2.jpg','正宗明前龙井茶2018新茶200g盒装浓香耐泡一杯香茶叶绿茶明前散装','全国多仓发货',58,102,1,0),
(NULL,'西湖牌龙井',1,'http://192.168.43.93:3000/img/product_img/lvcha3.jpg','2018新茶 西湖牌龙井茶叶正宗雨前西湖龙井茶250g纸包春茶绿茶','老茶客 口粮茶',108,653,1,0),
(NULL,'艺福堂龙井',1,'http://192.168.43.93:3000/img/product_img/lvcha4.jpg','艺福堂茶叶 绿茶正宗雨前靠谱茶2018新茶上市西湖龙井茶春茶250g','买2领券减10加送杯',88,393,1,0),
(NULL,'花间一壶龙井',1,'http://192.168.43.93:3000/img/product_img/lvcha5.jpg','花间一壶新茶龙井春茶绿茶雨前龙井茶叶礼盒装买一送一共500克','买2领券减10加送杯',208,45,1,0),
(NULL,'大益普洱',2,'http://192.168.43.93:3000/img/product_img/puer1.jpg','大益普洱茶镇店之宝熟茶经典醇品357g（1801）云南勐海七子饼茶','镇店之宝 陈香醇韵',95,37,1,1),
(NULL,'新益号普洱',2,'http://192.168.43.93:3000/img/product_img/puer2.jpg','7片整提购划算2499g 新益号 普洱茶 熟茶 如意 云南七子饼茶 茶叶','7片整提购2499g约5斤，好喝又实惠！',98,153,1,0),
(NULL,'小青柑普洱',2,'http://192.168.43.93:3000/img/product_img/puer3.jpg','小青柑普洱茶宫廷普洱熟茶新会陈皮普洱茶小柑橘桔普茶礼盒装茶叶','正品新会小青柑，大气美观的铁罐，500克',239,1620,1,0),
(NULL,'老曼娥古树普洱',2,'http://192.168.43.93:3000/img/product_img/puer4.jpg','茗星号一元拍卖 2016年老曼娥古树茶 普洱生茶叶 七子饼茶 357克','买2领券减10加送杯',30,393,1,0),
(NULL,'小茶匠礼茶',3,'http://192.168.43.93:3000/img/product_img/licha1.jpg','【进店必抢】小茶匠小金罐茶茶叶金骏眉大红袍西湖龙井茶叶礼盒装','真空充氮 顺丰包邮',228,41,1,1),
(NULL,'八卿王2018礼盒',3,'http://192.168.43.93:3000/img/product_img/licha2.jpg','八卿王2018安溪浓香型铁观音新茶高山茶叶500g礼盒装送茶具 礼茶','铁观音茶叶500g+青瓷茶具一套，口感醇厚',68,123,1,0),
(NULL,'老同志礼茶',3,'http://192.168.43.93:3000/img/product_img/licha3.jpg','【预定】老同志普洱茶2019年新春贺岁礼茶200克生200克熟欢年套装','新春贺岁礼茶 生熟组合',230,60,1,0),
(NULL,'特级国宾礼茶',3,'http://192.168.43.93:3000/img/product_img/licha4.jpg','绿茶2018新茶 安徽岳西翠兰 特级国宾礼茶茶叶 高档礼盒装250g','生熟组合',198,13,1,0),
(NULL,'美阁紫砂功夫茶具套装',4,'http://192.168.43.93:3000/img/product_img/chaju1.jpg','美阁紫砂功夫茶具套装家用简约陶瓷茶杯电热磁炉茶台茶道实木茶盘','实木套装 茶具茶盘（电器质保一年）',618,4001,1,1),
(NULL,'陶瓷干泡茶盘托套装',4,'http://192.168.43.93:3000/img/product_img/chaju2.jpg','瓷神家用汝窑功夫茶具茶杯陶瓷干泡茶盘托套装日式简约小茶台茶海','新颖泡茶方式 个性随意简约办公的茶具',219,5816,1,0),
(NULL,'万道紫砂茶具套装',4,'http://192.168.43.93:3000/img/product_img/chaju3.jpg','万道紫砂茶具套装家用整套功夫陶瓷简约现代喝茶台实木茶盘全自动','新款全自动电器，送废水桶，送主人杯',498,15350,1,0),
(NULL,'全自动功夫茶具套装',4,'http://192.168.43.93:3000/img/product_img/chaju4.jpg','全自动功夫茶具套装家用简约现代茶道喝茶实木茶盘一体茶海四合一','送废水桶',319,42,1,0),
(NULL,'浓香型铁观音',5,'http://192.168.43.93:3000/img/product_img/tieguanyin1.jpg','2018新茶安溪浓香型铁观音茶叶散装袋装礼盒装500g秋茶乌龙茶','2018新茶 热销47万件 365天包邮退换',99,1301,1,1),
(NULL,'安溪铁观音',5,'http://192.168.43.93:3000/img/product_img/tieguanyin2.jpg','特级安溪铁观音茶叶浓香型兰花香2018新茶秋乌龙茶散装礼盒装500g','2018秋茶上市 安溪原产 传统兰香 口感独特',128,216,1,0),
(NULL,'八马茶叶铁观音',5,'http://192.168.43.93:3000/img/product_img/tieguanyin3.jpg','八马茶叶 铁观音茶叶安溪乌龙茶新茶清香浓香型组合礼盒装504克','爆款茶搭档 清浓香铁观音组合',98,350,1,0),
(NULL,'正山王铁观音',5,'http://192.168.43.93:3000/img/product_img/tieguanyin4.jpg','正山王特级浓香型铁观音茶叶乌龙茶安溪铁观音高档礼盒装新茶512g','正宗安溪铁观音原产地发货',238,684,1,0),
(NULL,'五虎金俊眉',6,'http://192.168.43.93:3000/img/product_img/jinjunmei1.jpg','金骏眉茶叶特级正宗红茶茶叶五虎金俊眉浓香型红茶500g散装礼盒装','买2件送茶具检测合格无色素自然味假一赔十',149,356,1,1),
(NULL,'正山王金骏眉',6,'http://192.168.43.93:3000/img/product_img/jinjunmei2.jpg','正山王 金骏眉红茶 特级新茶武夷山春茶桐木关散装金俊眉茶叶500g','桐木关原产，大份量2罐装',238,698,1,0),
(NULL,'旗泓金俊眉',6,'http://192.168.43.93:3000/img/product_img/jinjunmei3.jpg','金骏眉茶叶特级正宗红茶茶叶旗泓金俊眉浓香型福建红茶散装礼盒装','武夷原产地 高山金俊眉 升级加量装500克',268,312,1,0),
(NULL,'武夷山蜜香金俊眉',6,'http://192.168.43.93:3000/img/product_img/jinjunmei4.jpg','金骏眉红茶新茶武夷山蜜香金俊眉黄芽散装礼盒罐装茶叶大分量500g','升级加量装500克',226,186,1,0),
(NULL,'乐品乐茶碧螺春',7,'http://192.168.43.93:3000/img/product_img/biluochun1.jpg','乐品乐茶碧螺春绿茶2018新茶茶叶特级明前散装苏州春茶嫩芽125g*2','镇店之宝 热销52万 明前花果香',99,622,1,1),
(NULL,'散装碧螺春',7,'http://192.168.43.93:3000/img/product_img/biluochun2.jpg','【买1发2】茶叶绿茶2018新茶碧螺春茶明前散装毛尖苏州嫩芽共500g','镇店之宝！2018新茶！共一斤',99,98,1,0),
(NULL,'碧螺春洞庭湖',7,'http://192.168.43.93:3000/img/product_img/biluochun3.jpg','碧螺春洞庭湖绿茶 新茶叶明前春茶特一级一芽 碧螺春礼盒125g*2罐','热销52万 明前花果香',38888,2,1,0),
(NULL,'沁爱碧螺春',7,'http://192.168.43.93:3000/img/product_img/biluochuni4.jpg','碧螺春 2018春茶500g木桶装 沁爱 滇绿茶 散茶叶 绿茶 鲜爽耐泡','超值口粮茶 不要木桶共发700克',55,215,1,0),
(NULL,'武夷山特级大红袍',8,'http://192.168.43.93:3000/img/product_img/dahongpao1.jpg','大红袍茶叶 正宗武夷山特级大红袍茶叶礼盒装浓香型散装 五虎茶叶','香气高、口感重、滋味醇正、品质保证',199,72,1,0),
(NULL,'小罐茶大红袍',8,'http://192.168.43.93:3000/img/product_img/dahongpao2.jpg','小罐茶银罐拼装茶礼 四款大师茶拼装礼盒装 顺丰包邮80g','2018新茶！',500,457,1,1),
(NULL,'武夷大红袍岩茶',8,'http://192.168.43.93:3000/img/product_img/dahongpao3.jpg','八马茶叶 武夷大红袍岩茶 乌龙茶私享系列大红袍盒装自饮160克','烘焙高香 买1送1同款',89,233,1,0),
(NULL,'大红袍肉桂茶叶',8,'http://192.168.43.93:3000/img/product_img/dahongpao4.jpg','大红袍茶叶 武夷山岩茶大红袍肉桂茶叶礼盒装浓香型散装茶叶400g','超值口粮茶 不要木桶共发700克',158,787,1,0),
(NULL,'西湖牌菊花茶',9,'http://192.168.43.93:3000/img/product_img/juhua1.jpg','西湖牌菊花茶花草茶 正宗桐乡杭白菊胎菊50g*3','桐乡特级头采 花蕾饱满 花香浓郁',58,23,1,1),
(NULL,'桐乡菊花茶',9,'http://192.168.43.93:3000/img/product_img/juhua2.jpg','西湖牌花草茶桐乡菊花茶特级杭白菊120g*3茶叶老字号','正宗桐乡原产',90,47,1,0),
(NULL,'大黄山黄菊花茶',9,'http://192.168.43.93:3000/img/product_img/juhua3.jpg','菊花茶金丝皇菊一朵一杯花草茶大黄山黄菊花茶叶枸杞胎菊婺源贡菊','买一送一买2发5',36,3177,1,0),
(NULL,'罐装花茶',9,'http://192.168.43.93:3000/img/product_img/juhua4.jpg','【5罐装】玫瑰花茶菊花枸杞荷叶金银花蒲公英茉莉花柠檬片花草茶','精品罐装花茶 任意选5种哦',32,4979,1,0),
(NULL,'浓香型红茶',10,'http://192.168.43.93:3000/img/product_img/zhengshan1.jpg','正山小种茶叶红茶茶叶特级浓香型红茶散装600g 五虎红茶礼盒装','掌柜推荐 超量600克 无色素 自然味',68,6407,1,0),
(NULL,'福康韵正山小种',10,'http://192.168.43.93:3000/img/product_img/zhengshan2.jpg','福康韵正山小种 武夷山茶叶散装 红茶 茶叶礼盒装350g克','陶罐礼盒装 正山小种红茶 过节送礼',158,357,1,1),
(NULL,'旗泓正山小种',10,'http://192.168.43.93:3000/img/product_img/zhengshan3.jpg','正山小种茶叶红茶茶叶特级浓香型红茶散装500g旗泓福建红茶礼盒装','烘焙高香 买1送1同款',189,3472,1,0),
(NULL,'桐木关正山小种',10,'http://192.168.43.93:3000/img/product_img/zhengshan4.jpg','送礼新茶罐装茶武夷山桐木关 正山小种茶叶红茶 蜜香型茶叶礼盒装','罐装茶 精美礼盒 送礼佳选',108,6587,1,0),
(NULL,'散装茉莉花茶',11,'http://192.168.43.93:3000/img/product_img/moli1.jpg','【买1发2】浓香型茉莉花茶2018新茶特级散装茉莉花茶叶罐装共500g','镇店之宝 2018新茶新花 共一斤',79,7105,1,0),
(NULL,'艺福堂茉莉花茶',11,'http://192.168.43.93:3000/img/product_img/moli2.jpg','艺福堂茶叶茉莉香珠茉莉花茶2018新茶散装特级茉莉龙珠浓香型200g','买就送小熊杯 买2领券减10 特级浓香',76,94,1,1),
(NULL,'正山王茉莉花茶',11,'http://192.168.43.93:3000/img/product_img/moli3.jpg','正山王 茉莉花茶 茉莉龙珠浓香型 茉莉香珠 2018新茶茶叶散装500g','2018新茶新花',238,465,1,0),
(NULL,'取舍茉莉花茶',11,'http://192.168.43.93:3000/img/product_img/moli4.jpg','茉莉花茶 茉莉龙珠浓香型茉莉香珠 2018新茶茶叶散装罐装礼盒500g','送礼佳选',228,4557,1,0),
(NULL,'太姥山福鼎白茶',12,'http://192.168.43.93:3000/img/product_img/fuding1.jpg','太姥山福鼎白茶2013陈年老白茶饼寿眉贡眉 福建方家山春茶叶盒装','太姥山脉 方家山产区',85,577,1,0),
(NULL,'丽皇香福鼎白茶',12,'http://192.168.43.93:3000/img/product_img/fuding2.jpg','丽皇香福鼎白茶老白茶寿眉龙珠高山贡眉小茶饼福建小沱茶叶礼盒装','过节送礼',188,1191,1,1),
(NULL,'馨胜福鼎白茶',12,'http://192.168.43.93:3000/img/product_img/fuding3.jpg','馨胜 福鼎白茶 老白茶 2006年寿眉散茶罐装11年陈香老白茶叶250g','干仓存放，枣香浓郁！好茶好滋味',350,342,1,0),
(NULL,'天福茗茶福鼎',12,'http://192.168.43.93:3000/img/product_img/fuding4.jpg','天福茗茶匠心茶 福鼎白茶紧压贡眉茶饼 收藏茶叶340g','给年轻人的茶',1000,27,1,0);



/**购物车条目**/  #g
CREATE TABLE cy_shoppingcart_item(
  gid									INT PRIMARY KEY AUTO_INCREMENT,		#购物车id
  guser_id						INT,													#购买此商品的用户编号
  gproduct_id					INT,											#购买的商品id
  gcount							INT,														#购买的数量
  gis_checked					BOOLEAN										#是否已付款1-是 0-否
);

/*添加购物车条目*/
INSERT INTO cy_shoppingcart_item VALUES
(NULL,1,30,30,0),
(NULL,2,30,30,1);


/**用户订单**/ #d
CREATE TABLE cy_order(
  did							INT PRIMARY KEY AUTO_INCREMENT,		#订单id
  duser_id				INT,													#对应此订单的用户id
  daddress_id			INT,											#此订单对应地址的id
  dstatus					INT,							#订单状态  1-等待付款  2-等待发货  3-运输中  4-已签收  5-已取消
  dorder_time			DATETIME,										#下单时间
  dpay_time				DATETIME,											#付款时间
  ddeliver_time		DATETIME,									#发货时间
  dreceived_time	DATETIME									#签收时间
);

/*添加订单*/
INSERT INTO cy_order VALUES
(NULL,1,1,1,'2018-11-26 15:35:28',NULL,NULL,NULL),
(NULL,2,2,2,'2018-11-18 10:15:30','2018-11-18 10:19:10',NULL,NULL);

/**用户订单**/ #e
CREATE TABLE cy_order_detail(
  eid INT PRIMARY KEY AUTO_INCREMENT,
  eorder_id INT,           #订单编号
  eproduct_id INT,         #产品编号
  ecount INT               #购买数量
);
INSERT INTO cy_order_detail VALUES
(NULL,1,30,30),
(NULL,2,30,30);