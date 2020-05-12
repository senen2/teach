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

def LeeTextoA(email, clave, IDtexto):
    bd = DB(nombrebd="aprende")
    usuario = login(email, clave, bd)
    if usuario:
        response = {}
        response['usuario'] = usuario
        response["textos"] = bd.Ejecuta("select * from textos where id=%s" % (IDtexto))
        response["preguntas"] = bd.Ejecuta("select * from preguntas where idtexto=%s" % (IDtexto))
        for pregunta in response['preguntas']:
            pregunta['posibles'] = bd.Ejecuta("select * from posibles where idpregunta=%s" % pregunta['id'])
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

def GrabaPreguntaA(email, clave, idtexto, texto, idpreguntaSel):
    bd = DB(nombrebd="aprende")
    usuario = login(email, clave, bd)
    if usuario:
        if duenoTexto(idtexto, bd) == usuario['ID']:
            if idpreguntaSel:
                orden = rows[0]['orden'] + 1
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

