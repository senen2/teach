'''
Created on 04/07/2013

@author: Carlos Botello
'''
import urllib2
import json
import datetime, decimal

from apiapp import *
from apiGetServer import *
    
def GetLocal(funcion):
    x = GetServer(funcion)
#     x = urllib2.urlopen("http://localhost:8080/function/" + funcion).read()
#     x = urllib2.urlopen("http://www.myprodu.com:8080/function/" + funcion).read()
    b = unicode(x, 'iso-8859-1') # == 'latin-1'
    return json.loads(b)

def PostLocal(funcion, datos):
    jdatos = json.dumps(datos, default=convert, ensure_ascii = False)
    x = PostServer(funcion, jdatos)

    headers = {}
    headers['Content-Type'] = 'application/json'
#     x = urllib2.urlopen("http://localhost:8080/functiond/" + funcion, data=jdatos ).read()
#     x = urllib2.urlopen("http://myprodu.com:8080/functiond/" + funcion, data=jdatos).read()

    if x:
        b = unicode(x, 'iso-8859-1') # == 'latin-1'
        return json.loads(b)
    return []

def GetServer(funcion):
    # print('+++++++++', funcion)
    a = eval(funcion)
    
    return json.dumps(a, default=convert, ensure_ascii = False)

def PostServer(funcion, jdatos):
#     datos = json.loads(jdatos)
    b = unicode(jdatos, 'utf-8') # == 'latin-1'
    datos = json.loads(b)
    # print("***", datos)
    a = ""
    if "()" in funcion:
        a = eval(funcion[:-2] + "(datos)")
    else:
        funcion = funcion[:-1]
        a = eval(funcion + ",datos)")
    
    return json.dumps(a, default=convert, ensure_ascii = False)
    
def GetUrl(url):
    resp = dict()
    resp["html"] = urllib2.urlopen("http://" + url).read()
    return json.dumps(resp, default=convert, ensure_ascii = False)
        
def convert(obj):
    """Default JSON serializer."""

    try:
        if isinstance(obj, datetime.datetime):
            return obj.strftime("%Y-%m-%d %H:%M:%S")
    except:
        pass
    
    try:
        if isinstance(obj,  datetime):
            return obj.strftime("%Y-%m-%d %H:%M:%S")
    except:
        pass

    try:
        if isinstance(obj, datetime.date):
            return obj.strftime("%Y-%m-%d")
    except:
        pass
    
    try:
        if isinstance(obj, decimal.Decimal):
            return float(obj)
    except:
        pass

    return

def NodoRuta(funcion, request, pagina):
#     f = funcion.split("(")[0]
    f = funcion.replace("'",'"')
    email = funcion.split(",")[0].split("(")[1]
    ip = request.remote_addr
    GrabaNodoRuta(email, ip, f, pagina)