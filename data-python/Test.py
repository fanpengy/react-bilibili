from MySQLDB import MySQLDB
import json
class Test:
    def __init__(self):
        self.db = MySQLDB("mysql.sqlpub.com", 3306, "fanpengy", "0934d1011fc8f0a7", "sanxingdui")
        print('init')
    def parse(self, tid, tname, reid, toptype):
        with open('/Users/fanpengy/Desktop/list', 'r', encoding = 'utf-8') as fp:
            data = json.load(fp)
            print(type(data.get('data').get('medias')))
            medias = data.get('data').get('medias')
            select_sql = 'select aId from video where aId = {}'
            insert_sql = 'insert into video values({},"{}","{}","{}",{},{},{},{},{},"{}",{},"{}",{},"{}","{}")'
            for i in range(len(medias)):
                # select
                results = self.db.select_db(select_sql.format(medias[i]['id']))
                if(len(results) == 0 and medias[i]['title'] != '已失效视频'):
                    self.db.insert_db(insert_sql.format(medias[i]['id'],medias[i]['title'],medias[i]['cover'],medias[i]['intro'],
                        medias[i]['cnt_info']['play'],medias[i]['page'],medias[i]['cnt_info']['danmaku'],medias[i]['pubtime'],
                        tid, tname,reid,toptype,
                        medias[i]['upper']['mid'],medias[i]['upper']['name'],medias[i]['upper']['face']))
                print(medias[i]['id'])
                
c = Test()
c.parse(1,'计算机·网络',11,'前端开发')
