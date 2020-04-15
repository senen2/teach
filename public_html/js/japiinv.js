/**
 * @author botpi
 */

function LeeProductoI(IDproducto, funcion)
{
	$.ajax({
		url: "http://" + servidor + "/function/LeeProductoI(" + encabezado + "," + IDlector + "," + IDproducto + ")?pagina=" + pagina,
		jsonp: "callback",
		dataType: "jsonp",
		success: function( response ) {
			funcion(response);
		}
	});	
}

function ReadLikesI(ventrada, funcion)
{
	//ventrada = $('tagsx').val();
	var xx = "http://" + servidor + "/function/ReadLikesI(" + encabezado + "," + IDlector + ",'" + ventrada + "'" + ")?pagina=" + pagina;
	$.ajax({
		url: "http://" + servidor + "/function/ReadLikesI(" + encabezado + "," + IDlector + ",'" + ventrada + "'" + ")?pagina=" + pagina,
		jsonp: "callback",
		dataType: "jsonp",
		success: function( response ) {
			funcion(response);
		}
	});	
}

/*-------------------- index
*/    
function LoginI(funcion)
{
	$.ajax({
		url: "http://" + servidor + "/function/LoginI(" + encabezado + ")?pagina=" + pagina,
		jsonp: "callback",
		dataType: "jsonp",
		success: function( response ) {
			funcion(response);
		}
	});	
}

function nada() {}

function PoneModoI(modo, funcion)
{
	temp = "http://" + servidor + "/function/PoneModoI(" + encabezado + "," + IDlector + ",'" + modo + "')?pagina=" + pagina;
	$.ajax({
		url: "http://" + servidor + "/function/PoneModoI(" + encabezado + "," + IDlector + ",'" + modo + "')?pagina=" + pagina,
		jsonp: "callback",
		dataType: "jsonp",
		success: function( response ) {
			funcion(response);
		}
	});	
}

function BuscaLecturaI(funcion)
{
	$.ajax({
		url: "http://" + servidor + "/function/BuscaLecturaI(" + encabezado + "," + IDlector + ")?pagina=" + pagina,
		jsonp: "callback",
		dataType: "jsonp",
		success: function( response ) {
			funcion(response);
		}
	});	
}

function GrabaMovimientoI(concepto, cb, cantidad, precioc, preciov, funcion)
{
	var f = today();
	var temp = "http://" + servidor + "/function/AgregaLecturaI(" + encabezado + "," + IDlector + ",'" + concepto + "','" + cb + "'," + cantidad + "," + precioc + "," + preciov + ",'" + f + "')?pagina=" + pagina;
	$.ajax({
		url: "http://" + servidor + "/function/AgregaLecturaI(" + encabezado + "," + IDlector + ",'" + concepto + "','" + cb + "'," + cantidad + "," + precioc + "," + preciov + ",'" + f + "')?pagina=" + pagina,
		jsonp: "callback",
		dataType: "jsonp",
		success: function( response ) {
			funcion(response);
		}
	});	
}

function AgregaProductoI(cb, nombre, precioc, preciov, cantidad, funcion)
{
	$.ajax({
		url: "http://" + servidor + "/function/AgregaProductoI(" + encabezado + "," + IDlector + ",'" + cb + "','" + nombre + "'," + precioc + "," + preciov + "," + cantidad + ")?pagina=" + pagina,
		jsonp: "callback",
		dataType: "jsonp",
		success: function( response ) {
			funcion(response);
		}
	});	
}

function ModificaProductoI(cb, nombre, precioc, preciov, funcion)
{
	$.ajax({
		url: "http://" + servidor + "/function/ModificaProductoI(" + encabezado + "," + IDlector + ",'" + cb + "','" + nombre + "'," + precioc + "," + preciov + ")?pagina=" + pagina,
		jsonp: "callback",
		dataType: "jsonp",
		success: function( response ) {
			funcion(response);
		}
	});	
}
    
function EliminaMovimientoI(ID, funcion)
{
	$.ajax({
		url: "http://" + servidor + "/function/EliminaMovimientoI(" + encabezado + "," + ID + ")?pagina=" + pagina,
		jsonp: "callback",
		dataType: "jsonp",
		success: function( response ) {
			funcion(response);
		}
	});	
}

function MovimientosI(fecha, periodo, funcion)
{
	var f = $.datepicker.formatDate("yy-mm-dd", fecha);
	var a = "http://" + servidor + "/function/MovimientosI(" + encabezado + "," + IDlector + ",'" + f + "','" + periodo + "')?pagina=" + pagina;
	$.ajax({
		url: "http://" + servidor + "/function/MovimientosI(" + encabezado + "," + IDlector + ",'" + f + "','" + periodo + "')?pagina=" + pagina,
		jsonp: "callback",
		dataType: "jsonp",
		success: function( response ) {
			funcion(response);
		}
	});	
}

function MovimientosDetalleI(fecha, periodo, IDproducto, funcion)
{
	var f = $.datepicker.formatDate("yy-mm-dd", fecha);
	var temp = "http://" + servidor + "/function/MovimientosDetalleI(" + encabezado + "," + IDlector + ",'" + f + "','" + periodo + "'," + IDproducto + ")?pagina=" + pagina;
	$.ajax({
		url: "http://" + servidor + "/function/MovimientosDetalleI(" + encabezado + "," + IDlector + ",'" + f + "','" + periodo + "'," + IDproducto + ")?pagina=" + pagina,
		jsonp: "callback",
		dataType: "jsonp",
		success: function( response ) {
			funcion(response);
		}
	});	
}
