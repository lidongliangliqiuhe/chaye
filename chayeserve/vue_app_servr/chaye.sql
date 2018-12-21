#vue_app_server/db.sql
#1:进入库  xz
USE xz;
#2:创建表 xz_news
#技巧1:库名;表名;列表;全英文小写字母
CREATE TABLE xz_login(
  id                INT PRIMARY KEY AUTO_INCREMENT,
  uname             VARCHAR(25) NOT NULL DEFAULT '', #评论的
  upwd              VARCHAR(32) NOT NULL DEFAULT ''
);
INSERT INTO xz_login VALUES(null,"dd",md5('123'));
INSERT INTO xz_login VALUES(null,"tom",md5('123'));
INSERT INTO xz_login VALUES(null,"jerry",md5('123'));