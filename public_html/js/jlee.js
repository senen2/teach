/**
 * @author botpi
 */

function inicioLee()
{
	encabezado = localStorage.getItem("encabezado");
	if (encabezado==null || encabezado=="")
		encabezado="'',''";
	leeServidor();
	refrescar();
	LeeTextosA(dibujaTextos);
}

function refrescar()
{
	$("#texto").val("");
	$("#titulo").val("");
	$("#preguntas").html("");
	$("#opciones").html("");
}

function dibujaTextos(datos)
{
	if (datos) {		
		$('#usuario').html("&nbsp;" + datos.usuario.nombre + "&nbsp;&nbsp;&nbsp;");
		modo = datos.usuario.modo;
		llenaSelector(datos.textos, "textos");
		llenaSelector(datos.niveles, "niveles");
		if (modo=="E") {
			$("#botones").show();
			$("#titulo").show();
			$("#cambiaTitulo").show();
			$("#creaTexto").show();
			$('#niveles').removeAttr('disabled');
		}
		else {
			$("#botones").hide();	
			$("#titulo").hide();
			$("#cambiaTitulo").hide();
			$("#creaTexto").hide();
			$("#niveles").prop('disabled', 'disabled');
		}
	}
	else
		logout();

}

function selTexto()
{
	gidtexto = $('#textos').val();
	LeeTextoA(gidtexto, dibujaTexto);	
}

function dibujaTexto(datos)
{
	if (!datos) {
		document.cookie = "pagpend=" + document.URL;			
		window.location.assign("index.html");		
	}
	refrescar();
	gtexto = datos;
	$('#titulo').val(gtexto.texto.titulo);
	poneSelectorxID(datos.texto.idnivel, "niveles");
	var userLang = navigator.language || navigator.userLanguage; 

	$("#texto").val(gtexto.texto.texto);
	if (gtexto.preguntas.length)
		armaPreguntas(gtexto.preguntas, gtexto.preguntas[0].id, "#preguntas")
}

function grabaTexto()
{
	GrabaTextoA(gidtexto, $('#texto').val());
}

function creaTexto(datos)
{
	gidtexto = datos.id;
	llenaSelector(datos.textos, "textos");
	poneSelectorxID(gidtexto, "textos");
	LeeTextoA(gidtexto, dibujaTexto);	
}

function modificaNivel()
{
	ModificaNivelA(gidtexto, $("#niveles").val());
}

function modificaTitulo()
{
	ModificaTituloA(gidtexto, $("#titulo").val(), dibTitulos);
}

function dibTitulos(titulos)
{
	var id = $("#textos").val();
	llenaSelector(titulos, "textos");
	poneSelectorxID(id, "textos");
}

// preguntas --------------------------------------

function dibPreguntas(preguntas)
{
	gtexto.preguntas = preguntas;
	armaPreguntas(preguntas, gidorigen, "#preguntas");
}

function armaPreguntas(preguntas, idsel, tag)
{
	var cad = "", pregunta;
	$("#preguntas").html("");
	$("#opciones").html("");

	$.each(preguntas, function(i,item) {
		cad = cad + armaPregunta(item.id, item.texto);
		 if (item.id==idsel)
		 	pregunta = item;
	});
	$(tag).html(cad);
	idpreguntaSel = idsel;
	armaPosibles(pregunta.posibles, pregunta.idrespuesta, "#opciones");
	selPregunta(idsel);
}

function armaPregunta(id, texto)
{
	var m1 = '', m2 = '';

	if (modo=='E') {
		m1 = ' onchange="modificaPregunta(this, ' + id + ');"';
		m2 = '<img id="imgEli-' + id + '" class="elimina DN" src="../images/delete.png"' + 
		 		' width="16px" onclick="eliPregunta(' + id + ');" />';
	}

	return '<div id="divPregunta-' + id + '" style="position: relative;">' +
			' <textarea class="pregunta" id="pregunta-' + id + '"' + 
				' draggable="true"' +
				' onmouseover="selPregunta(' + id + ');"' + 
				' onmouseout="deselPregunta(' + id + ');"' + 
				m1 +
				' ondrag="drag(event);"' + 
				'>' +
		 		texto + '</textarea>' +
		 		m2 +
		 		'</div>';
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
	armaPosibles(pregunta.posibles, pregunta.idrespuesta, "#opciones");
}

function deselPregunta(idpregunta)
{
	idpreguntaSel = idpregunta;
}

function agregaPregunta(datos)
{
	gidorigen = datos.id;
	dibPreguntas(datos.preguntas);
	$('#preguntas').scrollTop(800);
}

function modificaPregunta(elem, id)
{
	ModificaPreguntaA(elem.value, id, nada);
}

function eliPregunta(id)
{
	if (window.confirm("seguro de borrar esta pregunta")) {
		EliminaPreguntaA(id, dibPreguntas);
		gidorigen = id;
	}
}

function grabaRespuesta(id)
{
	var preg = buscaxid(gtexto.preguntas, idpreguntaSel);
	preg.idrespuesta = id;
	GrabaRespuestaA(idpreguntaSel, id);
}

// posibles ----------------------------------------

function armaPosibles(lista, idsel, tag)
{
	$("#opciones").html("");
	if (typeof lista != 'undefined') {
		var cad = "";
		$.each(lista, function(i,item) {
			if (modo=="E") {
				cad = cad + '<div style="display: table">' +
					'<input type="text" id="posible-' + item.id + '"' + 
						' value="' + item.texto + '" style="display: table-cell;"' +
						' onchange="modificaPosible(this, ' + item.id + ');"/>' +
			 		'<img id="elipos-' + item.id + '" src="../images/delete.png"' + 
				 		' width="16px" onclick="eliPosible(' + item.id + ');" />' +
					'<input type="checkbox" style="display: table-cell;" ' +
						((item.id==idsel) ? ' checked ' : '') + 
						' onchange="grabaRespuesta(' + item.id + ');"/>' +
					'</div>';
			}
			else {
				cad = cad + '<input type="radio" name="opciones" value="' + item.id + '"' +
						((item.id==idsel) ? ' checked ' : '') + '>' +
				 		item.texto + '<br>';
			}
		});
		$(tag).html(cad);		
	}
}

function agregaPosible(datos)
{
	gidorigen = idpreguntaSel;
	dibPreguntas(datos);
};

function modificaPosible(elem, id)
{
	ModificaDatoA('posibles', elem.value, id, nada);
	var preg = buscaxid(gtexto.preguntas, idpreguntaSel);
	var posible = buscaxid(preg.posibles, id);
	posible.texto = elem.value;
}

function eliPosible(id)
{
	if (window.confirm("seguro de borrar esta respuesta posible")) {
		gidorigen = idpreguntaSel;
		EliminaPosibleA(id, dibPreguntas);
	}
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

// varias ------------------------------------------

function cancelar()
{

}
