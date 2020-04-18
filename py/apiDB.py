# -*- coding: utf-8 -*-
'''
Created on 04/07/2013

@author: Carlos Botello
'''
import MySQLdb as mdb

class DB(object):

    def __init__(self, nombrebd="mopp", user="root", passwd=""):
#         self.db = mdb.connect(host="mysql.myprodu.com",user="carlos",passwd="siempre1",db=nombrebd)
#         self.db = mdb.connect(host="mysql.gtienda.com",user="carlos",passwd="siempre1",db=nombrebd)
        self.db = mdb.connect(host="142.93.52.198",user="carlos",passwd="siempre1",db=nombrebd)
        self.c = self.db.cursor(mdb.cursors.DictCursor)
        
    def cierra(self):
        self.commit()
        self.c.close()
        self.db.close()
        
    def commit(self):
        self.db.commit()

    def Ejecuta(self, sql):
        self.c.execute(sql)
        return [row for row in self.c.fetchall()]

    def Ejecuta1(self, sql):
        self.c.execute(sql)
        rows = self.c.fetchall()
        self.cierra()
        return [row for row in rows]

    def UltimoID(self):
        rows = self.Ejecuta("select last_insert_id() as ID")
        r = rows[0]["ID"]
        return r
    
    def escape_string(self, s):
        return mdb.escape_string(s)
