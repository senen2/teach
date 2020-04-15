/**
 * @author botpi
 */

function inicioMov()
{
	// encabezado = getCookie("encabezado");
	encabezado = localStorage.getItem("encabezado");
	IDlector = 1;
	if (encabezado==null || encabezado=="")
		encabezado="'',''";
	leeServidor();
	poneDatePicker("#fecha", "", new Date());
	$("#periodo").val("d");		
	refrescar();
}

function refrescar()
{
	cambios = [];
	$("#valor").val("");
	$("#concepto").val("");
	$("#valor2").val("");
	$("#concepto2").val("");	
	$("#concepto").focus();
	MovimientosI(new Date($("#fecha").val()), $("#periodo").val(), dibujaProductos);
}

function dibujaProductos(datos)
{
	if (!datos) {
		document.cookie = "pagpend=" + document.URL;			
		window.location.assign("index.html");		
	}
	gdatos = datos;
	$('#usuario').html("Bienvenido " + gdatos.usuario.nombre);
	var userLang = navigator.language || navigator.userLanguage; 
	// if (userLang.indexOf("es") >= 0) {
	// 	$('#usuario').html("Bienvenido " + gdatos.usuario.nombre);
	// }
	// else {
	// 	$('#usuario').html("Welcome " + gdatos.usuario.nombre);
	// }

	if (typeof gIDproducto=='undefined' || gIDproducto==null || gIDproducto==0)
		gIDproducto=gdatos.datos[0].ID;

	dibujaCuadroMovimientos();
	LeeDetalle(gIDproducto);

}

function dibujaCuadroMovimientos()
{
	var titulos = [];
	var userLang = navigator.language || navigator.userLanguage; 
	if (userLang.indexOf("es") >= 0) {
       	titulos.push({"titulo":"Producto", "ancho":200, "alinea":"left", "campo":"nombre"});
	    titulos.push({"titulo":"Saldo Anterior", "ancho":160, "alinea":"right", "campo":"saldoant"});
	    titulos.push({"titulo":"Entradas", "ancho":100, "alinea":"right", "campo":"entradas"});
	    titulos.push({"titulo":"Salidas", "ancho":100, "alinea":"right", "campo":"salidas"});
	    titulos.push({"titulo":"Saldo", "ancho":100, "alinea":"right", "campo":"saldo"});
	}
	else {
		titulos.push({"titulo":"Product", "ancho":200, "alinea":"left", "campo":"nombre"});
	    titulos.push({"titulo":"Previous balance", "ancho":160, "alinea":"right", "campo":"saldoant"});
	    titulos.push({"titulo":"Inputs", "ancho":100, "alinea":"right", "campo":"entradas"});
	    titulos.push({"titulo":"Outputs", "ancho":100, "alinea":"right", "campo":"salidas"});
	    titulos.push({"titulo":"Balance", "ancho":100, "alinea":"right", "campo":"saldo"});
	}
    	
	var datos = {};
	datos["titulos"] = titulos;
	datos["datos"] = gdatos.datos;
	datos["totales"] = [];
	
	dibujaTabla(datos, "cuentas", "cuentas", "LeeDetalle");
}

function LeeDetalle(IDproducto)
{
	if (IDproducto)
		gIDproducto=IDproducto;
	else
		IDproducto=gIDproducto;
		
	seleccionaRenglon(gdatos, "cuentas", IDproducto);
	MovimientosDetalleI(new Date($("#fecha").val()), $("#periodo").val(), IDproducto, dibujaMovimientosDetalle);	
}

function dibujaMovimientosDetalle(datos)
{
	if (datos) {
		gdatosmov = datos;
		dibujaCuadroDetalle();
	}
}

function dibujaCuadroDetalle()
{
	var titulos = [];
	var userLang = navigator.language || navigator.userLanguage; 
	if (userLang.indexOf("es") >= 0) {
	    titulos.push({"titulo":"Fecha", "ancho":400, "alinea":"left", "campo":"fecha"});
	    titulos.push({"titulo":"Entradas", "ancho":100, "alinea":"right", "campo":"entradas"});
	    titulos.push({"titulo":"Salidas", "ancho":100, "alinea":"right", "campo":"salidas"});
	    titulos.push({"titulo":"Saldo", "ancho":100, "alinea":"right", "campo":"saldo"});
	    titulos.push({"titulo":"", "ancho":70, "alinea":"center", "campo":"eliminar", "linktext": "#", "link": "", "funcion":"funcion"});
	}
	else {
	    titulos.push({"titulo":"Date", "ancho":300, "alinea":"left", "campo":"fecha"});
	    titulos.push({"titulo":"Inputs", "ancho":100, "alinea":"right", "campo":"entradas"});
	    titulos.push({"titulo":"Outputs", "ancho":100, "alinea":"right", "campo":"salidas"});
	    titulos.push({"titulo":"Balance", "ancho":100, "alinea":"right", "campo":"saldo"});
	    titulos.push({"titulo":"", "ancho":70, "alinea":"center", "campo":"eliminar", "linktext": "#", "link": "", "funcion":"funcion"});

	}
	// $.each(gdatos.datos, function(i,item) {
	// 	if (item.borrable==1) {
	// 		item["eliminar"] = "X";
	// 		item["funcion"] = 'onclick="eliminar('+ item.ID + ')"';
	// 	}
	// 	else
	// 		item["eliminar"] = "";
	// });	
	
	var datos = {};
	datos["titulos"] = titulos;
	datos["datos"] = gdatosmov.datos;
	datos["totales"] = [];
	
	dibujaTabla(datos, "entradas", "entradas", "");
}

// ------------------------

function agregar()
{
	if ($("#cuentaOrigen").val()==$("#cuentaDestino").val()) {
		alert("Las cuentas deben ser diferentes");
		return;		
	}
	if ($("#valor").val()=="") {
		alert("Debe introducir un valor");		
		return;		
	}
	if ($("#valor").val()<=0) {
		alert("El valor debe ser mayor que cero");		
		return;		
	}
	if ($("#concepto").val()=="") {
		alert("Debe escribir un concepto");		
		return;		
	}
	
	gIDcuentaOrigen=$("#cuentaOrigen").val();
	gIDcuentaDestino=$("#cuentaDestino").val();
	
	var valor = $("#valor").val().replace("$","").replace(",","").replace(",","");
	AgregaMovimientoF($("#cuentaOrigen").val(), $("#cuentaDestino").val(), $("#concepto").val(), valor, new Date($("#fecha").val()), refrescar);
}

function agregar2()
{
	if ($("#cuentaOrigen2").val()==$("#cuentaDestino2").val()) {
		alert("Las cuentas deben ser diferentes");
		return;		
	}
	if ($("#valor2").val()=="") {
		alert("Debe introducir un valor");		
		return;		
	}
	if ($("#valor2").val()<=0) {
		alert("El valor debe ser mayor que cero");		
		return;		
	}
	if ($("#concepto2").val()=="") {
		alert("Debe escribir un concepto");		
		return;		
	}
	
	gIDcuentaOrigen=$("#cuentaOrigen2").val();
	gIDcuentaDestino=$("#cuentaDestino2").val();
	
	var valor = $("#valor2").val().replace("$","").replace(",","").replace(",","");
	AgregaMovimientoF($("#cuentaOrigen2").val(), $("#cuentaDestino2").val(), $("#concepto2").val(), valor, new Date($("#fecha").val()), refrescar);
}

function eliminar(ID)
{
	EliminaMovimientoI(ID, refrescar);
}

function actualizar()
{
	$.each(cambios, function(i,item) {
		modificar(item);
	});
	refrescar();
}

function anotar(IDcuenta)
{
	var noesta=true;
	$.each(cambios, function(i,item) {
		if (item==IDcuenta)
			noesta=false;
	});
	if (noesta)
		cambios.push(IDcuenta);
}

function anotars(IDcuenta)
{
	var noesta=true;
	$.each(cambios, function(i,item) {
		if (item==-IDcuenta)
			noesta=false;
	});
	if (noesta)
		cambios.push(-IDcuenta);
}
