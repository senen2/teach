# -*- coding: utf-8 -*-
'''
Created on 10/07/2013

@author: Carlos Botello
'''
from bottle import route, run, template, response, hook
from bottle import get, post, request, ServerAdapter

from apiweb import GetServer, PostServer, NodoRuta, GetUrl
import os
from apiDB import DB

@hook('after_request')
def enable_cors():
    response.headers['Access-Control-Allow-Origin'] = '*'
    
@route('/function/:funcion', method='GET')
def GetFunction(funcion):
    resp = GetServer(funcion)
    # print('oooooooo', funcion)

    par = request.query.decode()
    if "pagina" in par:
        pagina = par["pagina"]
    else:
        pagina = ""    
    NodoRuta(funcion, request, pagina)
    
    if request.query.callback:
        return request.query.callback + "(" + resp.decode('iso-8859-1')  + ")"
    else:
        return resp 

@route('/functiond/:funcion', method='POST')
def PostFunction(funcion):
    datos = request.body
    resp = PostServer(funcion, datos.buf)

    par = request.query.decode()
    if "pagina" in par:
        pagina = par["pagina"]
    else:
        pagina = ""
    if funcion!="RegistraUsuarioPorPagina()":  
        NodoRuta(funcion, request, pagina)

    if request.POST.get('callback'):
        return request.POST.get('callback') + "(" + resp.decode('iso-8859-1')  + ")"
    else:
        return resp

@route('/')
@route('/hello/:name')
def index(name='World'):
    return template('<b>Hello {{name}}</b>!', name=name)

# para https
# class SSLWSGIRefServer(ServerAdapter):
#     def run(self, handler):
#         from wsgiref.simple_server import make_server, WSGIRequestHandler
#         import ssl
#         if self.quiet:
#             class QuietHandler(WSGIRequestHandler):
#                 def log_request(*args, **kw): pass
#             self.options['handler_class'] = QuietHandler
#         srv = make_server(self.host, self.port, handler, **self.options)
#         srv.socket = ssl.wrap_socket (
#          srv.socket,
#          certfile='server.pem',  # path to certificate
#          server_side=True)
#         srv.serve_forever()
        
from time import sleep

@route('/stream')
def stream():
    yield 'START '
    sleep(3)
    yield 'MIDDLE '
    sleep(5)
    yield 'END '
    
#from gevent import monkey; monkey.patch_all()
# run(host='myfinan.com', port=8085, debug=True, server="cherrypy")
run(host='142.93.52.198', port=8085, debug=True)

# esto con class SSLWSGIRefServer para https
# srv = SSLWSGIRefServer(host="192.168.1.112", port=8084)
# run(server=srv)
