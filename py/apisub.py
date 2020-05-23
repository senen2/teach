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
            where preguntas.id=%s"""%idpregunta)
        )

def duenoTexto(idtexto, bd):
    return valUsuario(bd.Ejecuta("select * from textos where id=%s"%idtexto))

def valUsuario(rows):
    if rows:
        return rows[0]['idusuario']
    else:
        return 0

def leePreguntas(idtexto, bd):
    resp = bd.Ejecuta("select * from preguntas where idtexto=%s order by orden" % (idtexto))
    for pregunta in resp:
        pregunta['posibles'] = bd.Ejecuta("select * from posibles where idpregunta=%s" % pregunta['id'])
    return resp

def idtexto_idpregunta(idposible, bd):
    rows = bd.Ejecuta("select idpregunta from posibles where id=%s"%idposible)
    if rows:
        idpregunta = rows[0]['idpregunta']
        rows = bd.Ejecuta("select idtexto from preguntas where id=%s"%idpregunta)
        if rows:
            idtexto = rows[0]['idtexto']
            return idtexto, idpregunta

    return 0, 0

