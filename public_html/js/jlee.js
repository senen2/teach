/**
 * @author botpi
 */

function inicioLee()
{
	// encabezado = getCookie("encabezado");
	encabezado = localStorage.getItem("encabezado");
	IDlector = 1;
	if (encabezado==null || encabezado=="")
		encabezado="'',''";
	leeServidor();
	refrescar();
}

function refrescar()
{
	$("#texto").val("");
	$("#pregunta").val("");
	$("#opciones").val("");
	$("#respuesta").val("");	
	$("#pregunta").focus();
	LeeTextoA(1, dibujaTexto);
}

function dibujaTexto(datos)
{
	if (!datos) {
		document.cookie = "pagpend=" + document.URL;			
		window.location.assign("index.html");		
	}
	gdatos = datos;
	$('#usuario').html("Bienvenido(a) " + gdatos.usuario.nombre);
	var userLang = navigator.language || navigator.userLanguage; 

	idpregunta = 0
	texto = gdatos.textos[0]
	pregunta = gdatos.preguntas[0]
	gdatos.opcion = 0;
	$("#texto").val(texto.texto);
	armaPreguntas(gdatos.preguntas, 0, "#preguntas")
	//$("#preguntas").val(pregunta.texto);
	armaOpciones(pregunta.posibles, pregunta.respuesta.id, "#opciones");
	$("#pregunta").focus();

}

function armaPreguntas(preguntas, idsel, tag)
{
	var cad = "";
	$.each(preguntas, function(i,item) {
		cad = cad + '<textarea id="pregunta-' + i + 
				'"class="pregunta" style="overflow-y:auto;"' +
				((item.id==idsel) ? ' checked ' : '') + '>' +
		 		item.texto + '</textarea>';
	});
	$(tag).html(cad);
	//armaOpciones(pregunta.posibles, pregunta.respuesta.id, "#opciones");
}

function armaOpciones(lista, idsel, tag)
{
	var cad = "";
	$.each(lista, function(i,item) {
		cad = cad + '<input type="radio" name="opciones" value="' + i + '"' +
				((item.id==idsel) ? ' checked ' : '') + '>' +
		 		item.texto + '<br>';
	});
	$(tag).html(cad);
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
