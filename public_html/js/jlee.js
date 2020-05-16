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
	return '<div id="divPregunta-' + id + '" style="position: relative;">' +
			' <textarea class="pregunta" id="pregunta-' + id + '"' + 
				' draggable="true"' +
				' onmouseover="selPregunta(' + id + ');"' + 
				' onmouseout="deselPregunta(' + id + ');"' + 
				' onchange="grabaPregunta(this, ' + id + ');"' + 
				' ondrag="drag(event);"' + 
				'>' +
		 		texto + '</textarea>' +
		 		'<img id="imgEli-' + id + '" class="elimina DN" src="../images/delete.png"' + 
		 		' width="16px" onclick="eliPregunta(' + id + ');" /></div>';
} 

function sobrePreguntas(e)
{
	var pos = $("#xxx").position();
	x=e.clientX;
	y=e.clientY;
	$("#imgEli").css("top", y - pos.top - 10);
	$("#imgEli").css("left", x - pos.left);
	$("#imgEli").show();
/*	$("#imgEli").css("top", pos.top);
	$("#imgEli").css("left", pos.left);
*/
}

function selPregunta(idpregunta)
{
	if (idpreguntaSel) {
		$('#divPregunta-' + idpreguntaSel).css("background-color", "white");
		$('#pregunta-' + idpreguntaSel).css("background-color", "white");
		$('#imgEli-' + idpreguntaSel).hide();
	}

	$('#divPregunta-' + idpregunta).css("background-color", "lightblue");
	$('#pregunta-' + idpregunta).css("background-color", "lightblue");
	$('#imgEli-' + idpregunta).show();

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
	$('#preguntas').scrollTop(800);
	selPregunta(id);
}

function grabaPregunta(elem, id)
{
	GrabaPreguntaA(elem.value, id, nada);
}

function eliPregunta(id)
{
	if (window.confirm("seguro de borrar esta pregunta")) {
		EliminaPreguntaA(id, dibPreguntas);
		gidorigen = id;
	}
}

function dibPreguntas(preguntas)
{
	gtexto.preguntas = preguntas;
	armaPreguntas(preguntas, gidorigen, "#preguntas");
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
