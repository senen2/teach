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
/*	selPregunta(gtexto.preguntas[0].id)
*/}

// preguntas --------------------------------------

function armaPreguntas(preguntas, idsel, tag)
{
	var cad = "", pregunta;
	$.each(preguntas, function(i,item) {
		cad = cad + armaPregunta(item.id, item.texto);
		 if (item.id==idsel)
		 	pregunta = item;
	});
	$(tag).html(cad);
	idpreguntaSel = idsel;
	armaOpciones(pregunta.posibles, pregunta.idrespuesta, "#opciones");
	selPregunta(idsel);
}

function armaPregunta(id, texto)
{
	return '<textarea id="pregunta-' + id + 
				'"class="pregunta" draggable="true"' +
				//((id==idsel) ? ' background-color: lightblue;' : '') + 
				' onmouseover="selPregunta(' + id + ');"' + 
				' onmouseout="deselPregunta(' + id + ');"' + 
				' onchange="grabaPregunta(this, ' + id + ');"' + 
				' ondrag="drag(event);"' + 
				'>' +
		 		texto + '</textarea>';
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

function agregaPregunta(id)
{
	var a = $(armaPregunta(id, 'funciona muy bien'));
	$("#preguntas").append(a);
	a.focus();
}

function grabaPregunta(elem, id)
{
	GrabaPreguntaA(elem.value, id, nada);
}

// opciones ----------------------------------------

function armaOpciones(lista, idsel, tag)
{
	if (typeof lista != 'undefined') {
		var cad = "";
		$.each(lista, function(i,item) {
			cad = cad + '<input type="radio" name="opciones" value="' + item.id + '"' +
					((item.id==idsel) ? ' checked ' : '') + '>' +
			 		item.texto + '<br>';
		});
		$(tag).html(cad);		
	}
}

function grabaTexto()
{
	GrabaTextoA($('#texto').val())
}

function agregaOpcion()
{
	$("#titPop").html("Nueva Opcion");
	$("#divPop").show();
};

function agregaRespuesta()
{
	
}

function cancelar()
{
	$("#divPop").hide();
}

// drag and drop -------------------------------------

function allowDrop(ev) 
{
	ev.preventDefault();
}

function drop(ev) 
{
	ev.preventDefault();
	var iddestino = ev.target.id.split('-')[1]; 
	OrdenaPreguntaA(gidorigen, iddestino, dibPreguntas)
}

function drag(ev) 
{
	ev.preventDefault();
	gidorigen = ev.target.id.split('-')[1];
}

function dibPreguntas(preguntas)
{
	gtexto.preguntas = preguntas;
	armaPreguntas(preguntas, gidorigen, "#preguntas");
}