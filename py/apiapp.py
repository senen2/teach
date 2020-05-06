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
            rows = bd.Ejecuta("""
                SELECT posibles.* FROM respuestas 
                    INNER JOIN posibles ON posibles.idpregunta=respuestas.idpregunta
                WHERE respuestas.idpregunta=%s 
                    AND posibles.id=respuestas.idposibles
                """ % pregunta['id'])
            if rows:
                pregunta['respuesta'] = rows[0]
        bd.cierra()
        return response
    bd.cierra()
    return None

def GrabaTextoA1(email, clave, datos): #idtexto, texto):
    bd = DB(nombrebd="aprende")
    usuario = login(email, clave, bd)
    if usuario:
        # text = bd.escape_string(texto.encode("UTF-8"))
        # text = texto.decode("utf8").encode("utf8")
        texto = datos['texto']
        idtexto = datos['idtexto']
        rows = bd.Ejecuta("select * from textos where id=%s and idusuario=%s" % (idtexto, usuario['ID']))
        if rows:
            #bd.Ejecuta("update textos set texto='%s' where id=%s" % (text.decode("UTF-8"), idtexto))
            # print("update textos set texto='%s' where id=%s" % (texto.decode("UTF-8"), idtexto))
            bd.Ejecuta("update textos set texto='%s' where id=%s" % (texto, idtexto))

    bd.cierra()
    return None

def GrabaTextoA(request): #idtexto, texto):
    bd = DB(nombrebd="aprende")
    email = request.forms.get('email')
    clave = request.forms.get('clave')
    usuario = login(email, clave, bd)
    if usuario:
        upload = request.files.get('texto')
        texto = upload.file.read().decode()
        idtexto = request.forms.get('idtexto')
        rows = bd.Ejecuta("select * from textos where id=%s and idusuario=%s" % (idtexto, usuario['ID']))
        if rows:
            bd.Ejecuta("update textos set texto='%s' where id=%s" % (texto, idtexto))

    bd.cierra()
    return None
