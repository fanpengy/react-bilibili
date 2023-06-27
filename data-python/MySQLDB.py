import pymysql
# from ProcessEntity import ProcessEntity
class MySQLDB():
    def __init__(self, host, port, user, passwd, db):
        self.conn = pymysql.connect(
            host=host,
            port=port,
            user=user,
            passwd=passwd,
            db=db
        )
        self.cur = self.conn.cursor(cursor=pymysql.cursors.DictCursor)

    def __del__(self): 
        print('db del')
        self.cur.close()
        self.conn.close()

    def select_db(self, sql):
        """查询"""
        self.cur.execute(sql)
        data = self.cur.fetchall()
        return data

    def insert_db(self, sql):
        """更新"""
        try:  
            self.cur.execute(sql)
            last_id = self.cur.lastrowid
            self.conn.commit()
            return last_id
        except Exception as e:
            print("操作出现错误：{}".format(e))
            self.conn.rollback()

    def execute_db(self, sql):
        """更新/删除"""
        try:  
            self.cur.execute(sql)
            rowcount = self.cur.rowcount
            self.conn.commit()
            return rowcount
        except Exception as e:
            print("操作出现错误：{}".format(e))
            self.conn.rollback()

    # def combine(self, entity_list:list[ProcessEntity]):
    #     max_package = entity_list[len(entity_list) -1].package
    #     package_result = []
    #     package_result.append(0)
    #     for i in range(max_package):
    #         package_result.append(0)
    #     try:  
    #         for i in range(max_package):
    #             pac_num = i + 1
    #             pac_list = list(filter(lambda e:e.package == pac_num, entity_list))
    #             index_result = []
    #             index_result.append(0)
    #             for i in range(len(pac_list)):
    #                 index_result.append(0)
    #             for entity in pac_list:
    #                 proceed = True
    #                 if(entity.pre_index > 0):
    #                     # get pre_index_result
    #                     result = index_result[entity.pre_index]
    #                     if(result > 0):
    #                         proceed = False
                    
    #                 # print(proceed)
    #                 if(proceed):
    #                     args = []
    #                     if(len(entity.args) > 0):
    #                         for arg in entity.args:
    #                             args.append(package_result[arg])
    #                     id = 0
    #                     sql = entity.sql.format(*args)
    #                     print(sql)
    #                     if(entity.type == 0):
    #                         # 执行sql select
    #                         self.cur.execute(sql)
    #                         data = self.cur.fetchall()
    #                         # data = [{'id': '0'}]
    #                         if(len(data) > 0):
    #                             id = int(data[0]['id'])
    #                     elif(entity.type == 1):
    #                         # 执行sql insert
    #                         self.cur.execute(sql)
    #                         id = self.cur.lastrowid
    #                         # id = 2
    #                     else:
    #                         # 执行sql other
    #                         self.cur.execute(sql)
    #                         print()
                        
    #                     if(entity.saved):
    #                         package_result[entity.package] = id
    #                     index_result[entity.index] = id
    #         print(package_result)
    #         self.conn.commit()
    #     except Exception as e:
    #         print("操作出现错误：{}".format(e))
    #         self.conn.rollback()

        
    def a(self):
        # sql type package index
        #0 select from collection                   select   -    id
        #1 insert into collection                   insert   0    id
        #2 select from actress                      select   -    id
        #3 insert into actress                      insert   2    id
        #4 select from collection_actress           select   p1p2 id
        #5 insert into collection_actress           select   4    id
        #6 select from actress                      select   -    id
        #7 insert into actress                      insert   6    id
        print()

# MYSQL_HOST="mysql.sqlpub.com"
# MYSQL_USER="fanpengy"
# MYSQL_PASSWORD="0934d1011fc8f0a7"
# MYSQL_DATABASE="sanxingdui"