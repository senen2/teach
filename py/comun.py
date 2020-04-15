'''
Created on 16/03/2015

@author: BOTPI
'''
import datetime

def day(fecha):
    fechad = datetime.datetime.strptime(fecha,'%Y-%m-%d')
    desde = str(fechad).split(' ')[0]
    hasta = str((fechad + datetime.timedelta(days=1))).split(' ')[0]
    return desde, hasta

def month(fecha):
    fechad = datetime.datetime.strptime(fecha,'%Y-%m-%d')
    desde = datetime.datetime(fechad.year, fechad.month, 1)
    hasta = str(datetime.datetime(desde.year + int(desde.month / 12), ((desde.month % 12) + 1), 1)).split(' ')[0]
    desde = str(desde).split(' ')[0]
    return desde, hasta
    
def year(fecha):
    fechad = datetime.datetime.strptime(fecha,'%Y-%m-%d')
    desde = str(fechad.replace(month=1).replace(day=1)).split(' ')[0]
    hasta = str(fechad.replace(month=1).replace(day=1).replace(year=fechad.year+1)).split(' ')[0]
    return desde, hasta


# def day(fecha):
#     fechad = datetime.datetime.strptime(fecha,'%Y-%m-%d')
#     desde = fechad
#     desde = fechad.replace(day=desde.day+1)
#     if desde.month==12:
#         hasta = desde.replace(year=desde.year+1, month=1)
#     else:
#         hasta = desde.replace(month=desde.month+1)
#     desde = str(desde).split(' ')[0]
#     hasta = str(hasta).split(' ')[0]
#     return desde, hasta
        
# def month(fecha):
#     fechad = datetime.datetime.strptime(fecha,'%Y-%m-%d')
#     desde = fechad.replace(day=1)
#     if desde.month==12:
#         hasta = desde.replace(year=desde.year+1, month=1)
#     else:
#         hasta = desde.replace(month=desde.month+1)
#     desde = str(desde).split(' ')[0]
#     hasta = str(hasta).split(' ')[0]
#     return desde, hasta
        

# def year(fecha):
#     fechad = datetime.datetime.strptime(fecha,'%Y-%m-%d')
#     desde = str(fechad.replace(month=1).replace(day=1)).split(' ')[0]
#     hasta = str(fechad.replace(month=12).replace(day=31)).split(' ')[0]
#     return desde, hasta

