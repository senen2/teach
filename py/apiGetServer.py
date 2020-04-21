# -*- coding: utf-8 -*-
'''
Created on 04/07/2013

@author: Carlos Botello
'''
from apiDB import DB
    
def GrabaNodoRuta(email, ip, funcion, pag):
    bd = DB()
    usuario = bd.Ejecuta("select * from usuarios where email=%s" % email)
    if usuario:
        usuario = usuario[0]
    else:
        usuario = dict()
        usuario["ID"]=0
    funcion = funcion.decode("utf8").encode("utf8")
    print(funcion)
    bd.Ejecuta("insert into rutas (IDusuario, ip, funcion, pag, fecha) values (%s,'%s','%s','%s',sysdate())" % (usuario["ID"], ip, "probando", pag))
    # idusuario = usuario['ID']
    # bd.c.execute("""insert into rutas (IDusuario, ip, funcion, pag, fecha) values (%s,'%s','%s','%s',sysdate())""",
    # 		 (idusuario, ip, funcion, pag))
    bd.cierra()
