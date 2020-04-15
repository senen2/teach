# -*- coding: utf-8 -*-
'''
Created on 02/01/2015

@author: Carlos Botello
'''
# import json
# import datetime, decimal

def logini(email, clave, bd):
    rows = bd.Ejecuta("select * from usuarios where email='%s' and clave='%s'" % (email, clave))
    if rows:
        return rows[0]
    return None

def Movimientos(usuario, lector, desde, hasta, bd):
    bd.Ejecuta("""
    	create temporary table xsa
        SELECT IDproducto, SUM(if(concepto='s', -cantidad, cantidad)) AS saldoant
        FROM movimientos
        WHERE fecha<'%s' AND IDbodega=%s
        GROUP BY IDproducto
        """ % (desde, lector['IDbodega']))
    bd.Ejecuta("ALTER TABLE xsa ADD INDEX xsa (IDproducto)")
    bd.Ejecuta("""
        create temporary table xmov
        SELECT IDproducto, concepto, SUM(cantidad) AS gcantidad
        FROM movimientos
        WHERE fecha>='%s' AND fecha<'%s' AND IDbodega=%s
        GROUP BY IDproducto, concepto
        """ % (desde, hasta, lector['IDbodega']))
    bd.Ejecuta("""
        create temporary table x2
        SELECT productos.ID as ID, productos.nombre
	    , IF(xsa.saldoant IS NULL, 0, xsa.saldoant) AS saldoant
            , SUM(IF(concepto='e', gcantidad, 0)) AS entradas
            , SUM(IF(concepto='s', gcantidad, 0)) AS salidas
            , 0 AS saldo
        FROM productos
        	left join xsa on xsa.IDproducto=productos.ID
            LEFT JOIN xmov ON xmov.IDproducto=productos.ID
        GROUP BY productos.ID
        """)
    bd.Ejecuta("update x2 set saldo = saldoant+entradas-salidas")
    response = bd.Ejecuta("select * from x2")
    bd.Ejecuta("drop table xmov, xsa, x2")
    
    return response

def MovimientosDetalle(usuario, lector, desde, hasta, IDproducto, bd):
    rows = bd.Ejecuta("""
        SELECT SUM(if(concepto='s', -cantidad, cantidad)) AS saldoant
        FROM movimientos
        WHERE fecha<'%s' AND IDbodega=%s and IDproducto=%s
        """ % (desde, lector['IDbodega'], IDproducto))
    if rows:
        saldo = rows[0]['saldoant']
    else:
        saldo = 0

    response = []
    response.append(renglonMovDet(0, desde, saldo, 'e', 0))

    rows = bd.Ejecuta("""
        SELECT ID, fecha, concepto, cantidad
        FROM movimientos
        WHERE fecha>='%s' AND fecha<'%s' AND IDbodega=%s and IDproducto=%s
        order by fecha, concepto
        """ % (desde, hasta, lector['IDbodega'], IDproducto))

    for row in rows:
        r =renglonMovDet(row['ID'], row['fecha'], saldo, row['concepto'], int(row['cantidad']))
        saldo = r['saldo']
        response.append(r)
  
    # print(response)
    return response

def renglonMovDet(ID, fecha, saldo, concepto, cantidad):
    if saldo==None:
        saldo = 0
    if cantidad==None:
        cantidad = 0

    if concepto=='e':
        entrada = cantidad
        salida = 0
    else:
        entrada = 0
        salida = cantidad

    return {'fecha': fecha, 'entradas':entrada, 'salidas':salida, 'saldo': saldo + entrada - salida,
            'funcion': 'onclick="eliminar(%s)"' % ID, 'eliminar': 'X'}

def agregaMovimiento(usuario, lector, producto, concepto, cantidad, precio, bd):
    bd.Ejecuta('''insert into movimientos 
        (IDlector, IDbodega, IDusuario, IDproducto, fecha, concepto, cantidad, valor) 
         values (%s, %s, %s, %s, %s, '%s', %s, %s)
        ''' % (lector['ID'], lector['IDbodega'], usuario['ID'], producto['ID'], 'now()', concepto, cantidad, precio))
