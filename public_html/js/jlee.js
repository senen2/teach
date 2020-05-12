/**
 * @author botpi
 */

function inicioLee()
{
	// encabezado = getCookie("encabezado");
	encabezado = localStorage.getItem("encabezado");
	idtexto = 1;
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
	LeeTextoA(idtexto, dibujaTexto);
}

function dibujaTexto(datos)
{
	if (!datos) {
		document.cookie = "pagpend=" + document.URL;			
		window.location.assign("index.html");		
	}
	gtexto = datos;
	$('#usuario').html("Bienvenido(a) " + gtexto.usuario.nombre);
	var userLang = navigator.language || navigator.userLanguage; 

	$("#texto").val(gtexto.textos[0].texto);
	armaPreguntas(gtexto.preguntas, gtexto.preguntas[0].id, "#preguntas")
	selPregunta(gtexto.preguntas[0].id)
}

function armaPreguntas(preguntas, idsel, tag)
{
	var cad = "", pregunta;
	$.each(preguntas, function(i,item) {
		cad = cad + '<textarea id="pregunta-' + item.id + 
				'"class="pregunta"' +
				//((item.id==idsel) ? ' background-color: lightblue;' : '') + 
				' onmouseover="selPregunta(' + item.id + ');"' + 
				' onmouseout="deselPregunta(' + item.id + ');"' + 
				'>' +
		 		item.texto + '</textarea>';
		 if (item.id==idsel)
		 	pregunta = item;
	});
	$(tag).html(cad);
	idpreguntaSel = 0;
	armaOpciones(pregunta.posibles, pregunta.idrespuesta, "#opciones");
}

function selPregunta(idpregunta)
{
	if (idpreguntaSel)
		$('#pregunta-' + idpreguntaSel).css("background-color", "white");
	
	if (idpregunta != gtexto.preguntas[0].id)
		$('#pregunta-' + gtexto.preguntas[0].id).css("background-color", "white");

	$('#pregunta-' + idpregunta).css("background-color", "lightblue");

	var pregunta = buscaxid(gtexto.preguntas, idpregunta);
	armaOpciones(pregunta.posibles, pregunta.idrespuesta, "#opciones");
}

function deselPregunta(idpregunta)
{
	idpreguntaSel = idpregunta;
}

function armaOpciones(lista, idsel, tag)
{
	var cad = "";
	$.each(lista, function(i,item) {
		cad = cad + '<input type="radio" name="opciones" value="' + item.id + '"' +
				((item.id==idsel) ? ' checked ' : '') + '>' +
		 		item.texto + '<br>';
	});
	$(tag).html(cad);
}

function grabaTexto()
{
	GrabaTextoA($('#texto').val())
}

function agregaPregunta()
{
	
}

function agregaOpcion()
{
	
}