# -*- coding: utf-8 -*-
'''
Created on 02/01/2015

@author: Botpi
'''
from apiDB import DB
from subinv import *
from comun import *

def LoginI(email, clave):
    bd = DB(nombrebd="inv")
    usuario = logini(email, clave, bd)
    if usuario:
        bd.cierra()
        return usuario
    
    bd.cierra()
    return None

def PoneModoI(email, clave, IDlector, modo):
    bd = DB(nombrebd="inv")
    usuario = logini(email, clave, bd)
    if usuario:
        bd.Ejecuta("update lectores set modo='%s' where ID=%s" % (modo, IDlector))
        bd.Ejecuta("delete from lecturasp where IDlector=%s" % IDlector)

    bd.cierra()
    return None

def TomaLecturaI(email, clave, IDlector, cb, fecha):
    bd = DB(nombrebd="inv")
    usuario = logini(email, clave, bd)
    if usuario:
        lector = bd.Ejecuta("select * from lectores where ID=%s" % IDlector)[0]
        if lector['modo'] in 'ce':
        	rows = bd.Ejecuta("select IDlector from lecturasp where IDlector=%s" % IDlector)
        	if rows:
        		bd.Ejecuta("delete from lecturasp where IDlector=%s" % IDlector)
        	bd.Ejecuta("insert into lecturasp (IDlector, cb) values (%s, '%s')" % (IDlector, cb))
        
        elif lector['modo'] == 's':
            producto = bd.Ejecuta("select * from productos where IDcliente=%s and cb='%s'" % 
                (usuario['IDcliente'], cb))[0]            
            bd.Ejecuta('''insert into movimientos 
                (IDlector, IDbodega, IDusuario, IDproducto, fecha, concepto, cantidad, valor) 
                 values (%s, %s, %s, %s, %s, '%s', %s, %s)
                ''' % (IDlector, lector['IDbodega'], usuario['ID'], producto['ID'], 'now()', 's', 1, producto['preciov']))     

    bd.cierra()
    return None

def BuscaLecturaI(email, clave, IDlector):
    bd = DB(nombrebd="inv")
    usuario = logini(email, clave, bd)
    if usuario:
        response = {}
        rows = bd.Ejecuta("select * from lecturasp where IDlector=%s" % IDlector)
        if rows:
            cb = rows[0]['cb']
            bd.Ejecuta("delete from lecturasp where IDlector=%s" % IDlector)
            lector = bd.Ejecuta("select * from lectores where ID=%s" % IDlector)[0]
            if lector['modo'] in 'ce':
                rows = bd.Ejecuta("select * from productos where IDcliente=%s and cb='%s'" % 
                    (usuario['IDcliente'], cb))
                if rows:
                    rows1 = bd.Ejecuta("""
                        SELECT SUM(if(concepto='s', -cantidad, cantidad)) AS saldoant
                        FROM movimientos
                        WHERE IDbodega=%s and IDproducto=%s
                        """ % (lector['IDbodega'], rows[0]['ID']))
                    if rows1:
                        rows[0]['cantidad'] = rows1[0]['saldoant']
                    else:
                        rows[0]['cantidad'] = 0
                    
                    bd.Ejecuta("update lectores set modo='s' where ID=%s" % IDlector)
                    bd.cierra()                
                    return rows[0]
                else:
                    rows = bd.Ejecuta("select * from productos where IDcliente=%s limit 1" % 
                        (usuario['IDcliente']))[0]
                    rows['nombre'] = '*'
                    rows['cb'] = cb
                    rows['cantidad'] = 0
                    bd.cierra()
                    return rows
        bd.cierra()
        return None
    
    bd.cierra()
    return None

def LeeProductoI(email, clave, IDlector, IDproducto):
    bd = DB(nombrebd="inv")
    usuario = logini(email, clave, bd)
    if usuario:
        lector = bd.Ejecuta("select * from lectores where ID=%s" % IDlector)[0]
        rows = bd.Ejecuta("select * from productos where ID=%s" % IDproducto)
        if rows:
            rows1 = bd.Ejecuta("""
                SELECT SUM(if(concepto='s', -cantidad, cantidad)) AS saldoant
                FROM movimientos
                WHERE IDbodega=%s and IDproducto=%s
                """ % (lector['IDbodega'], rows[0]['ID']))
            if rows1:
                rows[0]['cantidad'] = rows1[0]['saldoant']
            else:
                rows[0]['cantidad'] = 0
            
            bd.cierra()                
            return rows[0]
        bd.cierra()
        return None

def AgregaLecturaI(email, clave, IDlector, concepto, cb, cantidad, precioc, preciov, fecha):
    bd = DB(nombrebd="inv")
    usuario = logini(email, clave, bd)
    if usuario:
        lector = bd.Ejecuta("select * from lectores where ID=%s" % IDlector)[0]
        producto = bd.Ejecuta("select * from productos where IDcliente=%s and cb='%s'" % 
            (usuario['IDcliente'], cb))[0]
        bd.Ejecuta("update productos set preciov=%s, precioc=%s where ID=%s" % (preciov, precioc, producto['ID']))
        producto = bd.Ejecuta("select * from productos where IDcliente=%s and cb='%s'" % 
            (usuario['IDcliente'], cb))[0]

        precio = producto['preciov'] if concepto=='s' else producto['precioc']
        bd.Ejecuta('''insert into movimientos 
            (IDlector, IDbodega, IDusuario, IDproducto, fecha, concepto, cantidad, valor) 
             values (%s, %s, %s, %s, %s, '%s', %s, %s)
            ''' % (IDlector, lector['IDbodega'], usuario['ID'], producto['ID'], 'now()', concepto, cantidad, precio))
        bd.cierra()
        return 0
    
    bd.cierra()
    return None

def AgregaProductoI(email, clave, IDlector, cb, nombre, precioc, preciov, cantidad):
    bd = DB(nombrebd="inv")
    usuario = logini(email, clave, bd)
    if usuario:
        lector = bd.Ejecuta("select * from lectores where ID=%s" % IDlector)[0]
        rows = bd.Ejecuta("select * from productos where IDcliente=%s and cb='%s'" % (lector['IDcliente'], cb))
        if not rows:
            bd.Ejecuta('''insert into productos 
                (IDcliente, cb, nombre, precioc, preciov) 
                 values (%s, '%s', '%s', %s, %s)
                ''' % (lector['IDcliente'], cb, nombre, precioc, preciov))
            ID = bd.UltimoID()
            producto = bd.Ejecuta("select * from productos where ID=%s" % ID)[0]
            agregaMovimiento(usuario, lector, producto, 'e', cantidad, precioc, bd)
        bd.cierra()
        return 0
    
    bd.cierra()
    return None

def ModificaProductoI(email, clave, IDlector, cb, nombre, precioc, preciov):
    bd = DB(nombrebd="inv")
    usuario = logini(email, clave, bd)
    if usuario:
        lector = bd.Ejecuta("select * from lectores where ID=%s" % IDlector)[0]
        rows = bd.Ejecuta("select * from productos where IDcliente=%s and cb='%s'" % (lector['IDcliente'], cb))
        if rows:
        	bd.Ejecuta("update productos set nombre='%s', preciov=%s, precioc=%s where ID=%s" % (nombre, precioc, preciov, rows[0]['ID']))
        bd.cierra()
        return 0
    
    bd.cierra()
    return None

def EliminaMovimientoI(email, clave, IDmovimiento):
    bd = DB(nombrebd="inv")
    usuario = logini(email, clave, bd)
    print("llega", IDmovimiento)
    if usuario:
        bd.Ejecuta("delete from movimientos where ID=%s" % IDmovimiento)
    
    bd.cierra()

# ----------------------------------------

def MovimientosI(email, clave, IDlector, fecha, periodo):
	bd = DB(nombrebd="inv")
	usuario = logini(email, clave, bd)
	if usuario:
		if periodo=='m':
			desde, hasta = month(fecha)
		elif periodo=='y':
			desde, hasta = year(fecha)
		else:
			desde, hasta = day(fecha)

		response = {}
		lector = bd.Ejecuta("select * from lectores where ID=%s" % IDlector)[0]
		response["datos"] = Movimientos(usuario, lector, desde, hasta, bd)
		response["usuario"]=usuario        

	bd.cierra()
	return response

	bd.cierra()
	return None

def MovimientosDetalleI(email, clave, IDlector, fecha, periodo, IDproducto):
    bd = DB(nombrebd="inv")
    usuario = logini(email, clave, bd)
    if usuario:
        if periodo=='m':
            desde, hasta = month(fecha)
        elif periodo=='y':
            desde, hasta = year(fecha)
        else:
            desde, hasta = day(fecha)

        response = {}
        lector = bd.Ejecuta("select * from lectores where ID=%s" % IDlector)[0]
        response["datos"] = MovimientosDetalle(usuario, lector, desde, hasta, IDproducto, bd)
        response["usuario"]=usuario        

    bd.cierra()
    return response

def ReadLikesI(email, clave, IDlector, values):
    bd = DB(nombrebd="inv")
    usuario = logini(email, clave, bd)
    if usuario:
        lector = bd.Ejecuta("select * from lectores where ID=%s" % IDlector)[0]
        v = values.strip()
        if v:
            v = v.split()
            s = "like '%" + v[0] + "%'"
            s = s + ''.join([" and nombre like '%" + x + "%'" for x in v[1:]])
            response = bd.Ejecuta("select ID, nombre, cb from productos where nombre %s and IDcliente=%s limit 8" % (s, lector['IDcliente']))
        else:
            response = bd.Ejecuta("select ID, nombre, cb from productos where 1=2")
    bd.cierra()
    return response

