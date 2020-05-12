# -*- coding: utf-8 -*-
'''
Created on 02/01/2015

@author: Carlos Botello
'''
# import json
# import datetime, decimal

def login(email, clave, bd):
    rows = bd.Ejecuta("select * from usuarios where email='%s' and clave='%s'" % (email, clave))
    if rows:
        return rows[0]
    return None

def duenoPregunta(idpregunta, bd):
    return valUsuario(
        bd.Ejecuta("""
            select idusuario 
            from preguntas
                inner join textos on textos.id=preguntas.idtexto 
            where id=%s"""%idpregunta)
        )

def duenoTexto(idtexto, bd):
    return valUsuario(bd.Ejecuta("select * from textos where id=%s"%idtexto))

def valUsuario(rows):
    if rows:
        return rows[0]['idusuario']
    else:
        return 0
