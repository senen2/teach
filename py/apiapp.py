# -*- coding: utf-8 -*-
'''
Created on 12/04/2020

@author: Botpi
'''
from apiDB import DB
from apisub import *
from comun import *

def Login(email, clave):
    bd = DB(nombrebd="aprende")
    usuario = login(email, clave, bd)
    if usuario:
        bd.cierra()
        return usuario
    
    bd.cierra()
    return None

def CreaUsuarioA(email, clave, nombre, modo, lang):
    bd = DB(nombrebd="aprende")
    rows = bd.Ejecuta("select * from usuarios where email='%s'"%email)
    resp = "x"
    if not rows:
        bd.Ejecuta("insert into usuarios (nombre, email, clave, modo, lang) values ('%s','%s','%s','%s','%s')"%(nombre, email, clave, modo, lang))
        resp = "ok"

    bd.cierra()
    return resp

# def CreaUsuarioA(request):
#     bd = DB(nombrebd="aprende")
#     email = request.forms.get('email')
#     rows = bd.Ejecuta("select * from usuarios where email='%s'"%email)
#     resp = "x"
#     if not rows:
#         clave = request.forms.get('clave')
#         nombre = request.forms.get('nombre')
#         modo = request.forms.get('modo')
#         lang = request.forms.get('lang')
#         bd.Ejecuta("insert into usuarios (nombre, email, clave, modo, lang) values ('%s','%s','%s','%s','%s')"%(nombre, email, clave, modo, lang))
#         resp = "ok"

#     bd.cierra()
#     return resp

# texto ----------------------------------

def LeeTextosA(email, clave):
    bd = DB(nombrebd="aprende")
    usuario = login(email, clave, bd)
    if usuario:
        response = {}
        response['usuario'] = usuario
        response["niveles"] = bd.Ejecuta("select *, id as ID from niveles")
        if usuario['modo']=='E':
            response["textos"] = bd.Ejecuta("select *, id as ID, titulo as nombre from textos where idusuario=%s order by nombre"%usuario['ID'] )
        else:
            response["textos"] = bd.Ejecuta("select *, id as ID, titulo as nombre from textos order by nombre" )
        bd.cierra()
        return response
    bd.cierra()
    return None

def LeeTextoA(email, clave, idtexto):
    bd = DB(nombrebd="aprende")
    usuario = login(email, clave, bd)
    if usuario:
        response = {}
        # response['usuario'] = usuario
        response["texto"] = bd.Ejecuta("select * from textos where id=%s" % (idtexto))[0]
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

def CreaTextoA(email, clave):
    bd = DB(nombrebd="aprende")
    usuario = login(email, clave, bd)
    resp = {}
    if usuario:
        bd.Ejecuta("insert into textos (idusuario, texto) values (%s, '')"%usuario['ID'])
        resp['id'] = bd.UltimoID()
        resp["textos"] = bd.Ejecuta("select *, id as ID, titulo as nombre from textos where idusuario=%s"%usuario['ID'] )

    bd.cierra()
    return resp

def ModificaNivelA(email, clave, idtexto, nivel):
    bd = DB(nombrebd="aprende")
    usuario = login(email, clave, bd)
    if usuario:
        if duenoTexto(idtexto, bd) == usuario['ID']:
            bd.Ejecuta("update textos set idnivel=%s where id=%s" % (nivel, idtexto))

    bd.cierra()
    return None

def ModificaTituloA(email, clave, idtexto, titulo):
    bd = DB(nombrebd="aprende")
    usuario = login(email, clave, bd)
    resp = None
    if usuario:
        if duenoTexto(idtexto, bd) == usuario['ID']:
            bd.Ejecuta("update textos set titulo='%s' where id=%s" % (titulo, idtexto))
            resp = bd.Ejecuta("select *, id as ID, titulo as nombre from textos where idusuario=%s"%usuario['ID'] )
    bd.cierra()
    return resp

# preguntas--------------------------

def AgregaPreguntaA(email, clave, idtexto):
    bd = DB(nombrebd="aprende")
    usuario = login(email, clave, bd)
    resp = {}
    if usuario:
        if duenoTexto(idtexto, bd) == usuario['ID']:
            rows = bd.Ejecuta("select orden from preguntas where idtexto=%s order by orden desc limit 1"%idtexto)
            
            orden = 1
            if rows:
                orden = rows[0]['orden'] + 1
            
            bd.Ejecuta("insert into preguntas (idtexto, orden) values(%s, %s)"%(idtexto, orden))
            idpregunta = bd.UltimoID()
            bd.Ejecuta("insert into posibles (idpregunta, texto) values(%s, 'A')"%idpregunta)
            bd.Ejecuta("insert into posibles (idpregunta, texto) values(%s, 'B')"%idpregunta)
            bd.Ejecuta("insert into posibles (idpregunta, texto) values(%s, 'C')"%idpregunta)

            resp['id'] = idpregunta
            resp['preguntas'] = leePreguntas(idtexto, bd)

    bd.cierra()
    return resp

def ModificaPreguntaA(request):
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

def EliminaPreguntaA(email, clave, idpregunta):
    bd = DB(nombrebd="aprende")
    resp = None
    usuario = login(email, clave, bd)
    if usuario:
        if duenoPregunta(idpregunta, bd) == usuario['ID']:
            rows = bd.Ejecuta("select orden, idtexto from preguntas where id=%s"%idpregunta)
            if rows:
                bd.Ejecuta("delete from posibles where idpregunta=%s"%idpregunta)
                bd.Ejecuta("delete from preguntas where id=%s"%idpregunta)
                resp = leePreguntas(rows[0]['idtexto'], bd)

    bd.cierra()
    return resp

def GrabaRespuestaA(request):
    bd = DB(nombrebd="aprende")
    email = request.forms.get('email')
    clave = request.forms.get('clave')
    usuario = login(email, clave, bd)
    if usuario:
        idpregunta = request.forms.get('idpregunta')
        idrespuesta = request.forms.get('idrespuesta')
        # print("update preguntas set idrespuesta=%s where id=%s"%(idrespuesta, idpregunta))
        if duenoPregunta(idpregunta, bd) == usuario['ID']:
            bd.Ejecuta("update preguntas set idrespuesta=%s where id=%s"%(idrespuesta, idpregunta))
    bd.cierra()
    return None

# posibles --------------------------

def AgregaPosibleA(email, clave, idpregunta):
    bd = DB(nombrebd="aprende")
    resp = None
    usuario = login(email, clave, bd)
    if usuario:
        rows = bd.Ejecuta("select idtexto from preguntas where id=%s"%idpregunta)
        if rows:
            idtexto = rows[0]['idtexto']
            if duenoPregunta(idpregunta, bd) == usuario['ID']:
                bd.Ejecuta("insert into posibles (idpregunta, texto) values(%s, 'X')"%idpregunta)
                resp = leePreguntas(idtexto, bd)
    
    bd.cierra()
    return resp

def ModificaDatoA(request):
    bd = DB(nombrebd="aprende")
    email = request.forms.get('email')
    clave = request.forms.get('clave')
    usuario = login(email, clave, bd)
    if usuario:
        id = request.forms.get('id')
        tabla = request.forms.get('tabla')
        if tabla=="preguntas":
            idpregunta = id
        else:
            rows = bd.Ejecuta("select idpregunta from posibles where id=%s"%id)
            idpregunta = rows[0]['idpregunta']
        
        if duenoPregunta(idpregunta, bd) == usuario['ID']:
            texto = request.forms.get('texto')
            bd.Ejecuta("update %s set texto='%s' where id=%s"%(tabla, texto, id))

    bd.cierra()
    return None

# def GrabaPosibleA(email, clave, idpregunta, texto):
#     bd = DB(nombrebd="aprende")
#     usuario = login(email, clave, bd)
#     if usuario:
#         if duenoPregunta(idpregunta, bd) == usuario['ID']:
#             bd.Ejecuta("insert into posibles (idpregunta, texto) values(%s, '%s')"%(idpregunta, texto))

#     bd.cierra()
#     return None

def EliminaPosibleA(email, clave, idposible):
    bd = DB(nombrebd="aprende")
    resp = None
    usuario = login(email, clave, bd)
    if usuario:
        idtexto, idpregunta = idtexto_idpregunta(idposible, bd)
        if idtexto:
            if duenoPregunta(idpregunta, bd) == usuario['ID']:
                bd.Ejecuta("delete from posibles where id=%s"%idposible)
                resp = leePreguntas(idtexto, bd)
    
    bd.cierra()
    return resp
