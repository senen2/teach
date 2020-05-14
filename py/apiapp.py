# -*- coding: utf-8 -*-
'''
Created on 12/04/2020

@author: Botpi
'''
from apiDB import DB
from subapp import *
from comun import *

def Login(email, clave):
    bd = DB(nombrebd="aprende")
    usuario = login(email, clave, bd)
    if usuario:
        bd.cierra()
        return usuario
    
    bd.cierra()
    return None

def LeeTextoA(email, clave, idtexto):
    bd = DB(nombrebd="aprende")
    usuario = login(email, clave, bd)
    if usuario:
        response = {}
        response['usuario'] = usuario
        response["textos"] = bd.Ejecuta("select * from textos where id=%s" % (idtexto))
        response['preguntas'] = leePreguntas(idtexto, bd)
        bd.cierra()
        return response
    bd.cierra()
    return None

def GrabaTextoA(request):
    bd = DB(nombrebd="aprende")
    email = request.forms.get('email')
    clave = request.forms.get('clave')
    usuario = login(email, clave, bd)
    if usuario:
        idtexto = request.forms.get('idtexto')
        if duenoTexto(idtexto, bd) == usuario['ID']:
            upload = request.files.get('texto')
            texto = upload.file.read().decode()
            bd.Ejecuta("update textos set texto='%s' where id=%s" % (texto, idtexto))

    bd.cierra()
    return None

def GrabaPreguntaA(request):
    bd = DB(nombrebd="aprende")
    email = request.forms.get('email')
    clave = request.forms.get('clave')
    usuario = login(email, clave, bd)
    if usuario:
        idpregunta = request.forms.get('idpregunta')
        if duenoPregunta(idpregunta, bd) == usuario['ID']:
            texto = request.forms.get('texto')
            bd.Ejecuta("update preguntas set texto='%s' where id=%s"%(texto, idpregunta))

    bd.cierra()
    return None

def GrabaPreguntaA1(email, clave, idtexto, texto, idpreguntaDespues):
    bd = DB(nombrebd="aprende")
    usuario = login(email, clave, bd)
    if usuario:
        if duenoTexto(idtexto, bd) == usuario['ID']:
            if idpreguntaDespues:
                orden = rows[0]['orden'] - 0.01
            else:
                orden = 1
            bd.Ejecuta("insert into preguntas (idtexto, texto, orden) values(%s, '%s', %s)"%(idtexto, texto, orden))

    bd.cierra()
    return None

def GrabaPosibleA(email, clave, idpregunta, texto):
    bd = DB(nombrebd="aprende")
    usuario = login(email, clave, bd)
    if usuario:
        if duenoPregunta(idpregunta, bd) == usuario['ID']:
            bd.Ejecuta("insert into posibles (idpregunta, texto) values(%s, '%s')"%(idpregunta, texto))

    bd.cierra()
    return None

def GrabaRespuestaA(email, clave, idpregunta, idrespuesta):
    bd = DB(nombrebd="aprende")
    usuario = login(email, clave, bd)
    if usuario:
        if duenoPregunta(idpregunta, bd) == usuario['ID']:
            bd.Ejecuta("update preguntas set idrespuesta=%s where id=%s"%(idrespuesta, idpregunta))
    bd.cierra()
    return None

def AgregaPreguntaA(email, clave, idtexto):
    bd = DB(nombrebd="aprende")
    usuario = login(email, clave, bd)
    if usuario:
        if duenoTexto(idtexto, bd) == usuario['ID']:
            bd.Ejecuta("insert into preguntas (idtexto) values(%s)"%(idtexto))
            id = bd.UltimoID()

    bd.cierra()
    return id

def OrdenaPreguntaA(email, clave, idorigen, iddestino):
    bd = DB(nombrebd="aprende")
    resp = None
    usuario = login(email, clave, bd)
    if usuario:
        if duenoPregunta(idorigen, bd) == usuario['ID']:
            rows = bd.Ejecuta("select orden, idtexto from preguntas where id=%s"%iddestino)
            if rows:
                rows = rows[0]
                orden = rows['orden'] - 0.01
                bd.Ejecuta("update preguntas set orden=%s where id=%s"%(orden, idorigen))
                resp = leePreguntas(rows['idtexto'], bd)
    
    bd.cierra()
    return resp
