/**
 * @author botpi
 */

function inicioEntradas(modo)
{
	// encabezado = getCookie("encabezado");
	encabezado = localStorage.getItem("encabezado");
	IDlector = 1;
	if (encabezado==null || encabezado=="")
		encabezado="'',''";
	leeServidor();

	if (modo=='L')
		pideLectura();
	else
		pideTexto();
}

function pideLectura()
{
	$("#aviso").show();
	$("#formulario").hide();
	PoneModoI('c', revisaLectura);
}

function revisaLectura(datos)
{
	if (datos) {
		dibujaFormulario(datos);
	} else {
		BuscaLecturaI(revisaLectura);
	}
}

function pideTexto()
{
	$("#aviso").show();
	$("#formulario").hide();
	$("#tags").val("");
	$("#tags").focus();
	$('#posibles tbody').empty("");
}

function dibujaPosibles(posibles)
{
	var titulos = [];
	var userLang = navigator.language || navigator.userLanguage; 
	if (userLang.indexOf("es") >= 0) {
	    titulos.push({"titulo":"", "ancho":400, "alinea":"left", "campo":"nombre"});
	}
	else {
	    titulos.push({"titulo":"", "ancho":400, "alinea":"left", "campo":"nombre"});
	}
	
	var datos = {};
	datos["titulos"] = titulos;
	datos["datos"] = posibles;
	datos["totales"] = [];
	
	dibujaTabla(datos, "posibles", "posibles", "tomaOpcion");
}

function tomaOpcion(ID)
{
	LeeProductoI(ID, dibujaFormulario);
}

function dibujaFormulario(datos)
{
	$("#formulario").show();
	$("#aviso").hide();
	$("#nombre").val(datos['nombre']);
	$("#cb").val(datos['cb']);
	$("#precioc").val(datos['precioc']);
	$("#preciov").val(datos['preciov']);	
	$("#cantidad").val(datos['cantidad']);
	$("#cantidad").focus()
	$("#cantidad").select()
}

function grabar(funcion)
{
	GrabaMovimientoI('e', $("#cb").val(), $("#cantidad").val(), $("#precioc").val(), $("#preciov").val(), funcion);
}

function cerrar()
{
	window.location.replace("mov.html");
}