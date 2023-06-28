from MySQLDB import MySQLDB
import json
class Test:
    def __init__(self):
        self.db = MySQLDB("mysql.sqlpub.com", 3306, "fanpengy", "0934d1011fc8f0a7", "sanxingdui")
        print('init')
    def parse(self, tid, tname, reid, toptype):
        with open('/Users/fanpengy/Desktop/list/{}-{}'.format(tid,reid), 'r', encoding = 'utf-8') as fp:
            data = json.load(fp)
            print(type(data.get('data').get('medias')))
            medias = data.get('data').get('medias')
            select_sql = 'select aId from video where aId = {}'
            insert_sql = 'insert into video values({},"{}","{}","{}",{},{},{},{},{},"{}",{},"{}",{},"{}","{}",{})'
            for i in range(len(medias)):
                # select
                results = self.db.select_db(select_sql.format(medias[i]['id']))
                if(len(results) == 0 and medias[i]['title'] != '已失效视频'):
                    debug = insert_sql.format(medias[i]['id'],medias[i]['title'],medias[i]['cover'],medias[i]['intro'],
                        medias[i]['cnt_info']['play'],medias[i]['page'],medias[i]['cnt_info']['danmaku'],medias[i]['pubtime'],
                        tid, tname,reid,toptype,
                        medias[i]['upper']['mid'],medias[i]['upper']['name'],medias[i]['upper']['face'],
                        medias[i]['duration'])
                    # print(debug)
                    self.db.insert_db(insert_sql.format(medias[i]['id'],medias[i]['title'],medias[i]['cover'],medias[i]['intro'],
                        medias[i]['cnt_info']['play'],medias[i]['page'],medias[i]['cnt_info']['danmaku'],medias[i]['pubtime'],
                        tid, tname,reid,toptype,
                        medias[i]['upper']['mid'],medias[i]['upper']['name'],medias[i]['upper']['face'],
                        medias[i]['duration']))
                print(medias[i]['id'])
                
c = Test()
c.parse(1,'互联网',11,'数据库')
c.parse(1,'互联网',12,'后端开发')
c.parse(1,'互联网',13,'前端开发')
c.parse(1,'互联网',14,'运维')
c.parse(1,'互联网',15,'网络')
c.parse(1,'互联网',16,'操作系统')
c.parse(2,'社科',21,'法律')
c.parse(2,'社科',22,'心理学')
c.parse(2,'社科',23,'社会学')

c.parse(3,'经济',31,'理财')
c.parse(3,'经济',32,'股票')
c.parse(3,'经济',33,'商业')

c.parse(4,'音乐',41,'乐理')
c.parse(4,'音乐',42,'乐器')
c.parse(4,'音乐',43,'音乐制作')

c.parse(5,'生活',51,'美食')
c.parse(5,'生活',52,'健身')
c.parse(5,'生活',53,'运动')
