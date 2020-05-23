/*
 * @author botpi
 */
    
function Login(funcion)
{
	$.ajax({
		url: "http://" + servidor + "/function/Login(" + encabezado + ")?pagina=" + pagina,
		jsonp: "callback",
		dataType: "jsonp",
		success: function( response ) {
			funcion(response);
		}
	});	
}

// texto --------------------------------------

function LeeTextoA(idtexto, funcion)
{
	$.ajax({
		url: "http://" + servidor + "/function/LeeTextoA(" + encabezado + "," + idtexto + ")?pagina=" + pagina,
		jsonp: "callback",
		dataType: "jsonp",
		success: function( response ) {
			funcion(response);
		}
	});	
}

function GrabaTextoA(texto)
{
	var datos = new FormData();
	var btexto = new Blob([texto], { type: "text/xml"});
	datos.append('idtexto', gtexto.textos[0].id);
	datos.append('texto', btexto);
	var enc = encabezado.split("'").join('').split(',');
	datos.append('email', enc[0]);
	datos.append('clave', enc[1]);
	datos.append('pagina', pagina);

	var xhr = new XMLHttpRequest();
	xhr.open("POST", 'http://' + servidor + '/functionh/GrabaTextoA', true);

	xhr.onreadystatechange = function() {
	    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
	        nada();
	    }
	}
	xhr.send(datos);
}

// preguntas ---------------------------------

/*function AgregaPreguntaA(idtexto, funcion)
{
	$.ajax({
		url: "http://" + servidor + "/function/AgregaPreguntaA(" + encabezado + "," + idtexto + ")?pagina=" + pagina,
		jsonp: "callback",
		dataType: "jsonp",
		success: function( response ) {
			funcion(response);
		}
	});	
}
*/

function AgregaPreguntaA(idtexto, funcionret)
{
	var p = "," + idtexto;
	sendGet(p, 'AgregaPreguntaA', funcionret); 
}

function ModificaPreguntaA(texto, idpregunta, funcion)
{
	var datos = new FormData();
	datos.append('idpregunta', idpregunta);
	datos.append('texto', texto);
	sendPost(datos, "ModificaPreguntaA", funcion);
}

function EliminaPreguntaA(idpregunta, funcionret)
{
	var p = "," + idpregunta;
	sendGet(p, 'EliminaPreguntaA', funcionret); 
}

function OrdenaPreguntaA(idorigen, iddestino, funcionret)
{
	var p = "," + idorigen + "," + iddestino;
	sendGet(p, 'OrdenaPreguntaA', funcionret); 
}

function GrabaRespuestaA(idpregunta, idrespuesta)
{
	var datos = new FormData();
	datos.append('idpregunta', idpregunta);
	datos.append('idrespuesta', idrespuesta);
	sendPost(datos, "GrabaRespuestaA", nada);
}

// posibles -----------------------------------

function AgregaPosibleA(idpregunta, funcionret)
{
	var p = "," + idpregunta;
	sendGet(p, 'AgregaPosibleA', funcionret); 
}

function ModificaDatoA(tabla, texto, id, funcion)
{
	var datos = new FormData();
	datos.append('tabla', tabla);
	datos.append('id', id);
	datos.append('texto', texto);
	sendPost(datos, "ModificaDatoA", funcion);
}

function EliminaPosibleA(idposible, funcionret)
{
	var p = "," + idposible;
	sendGet(p, 'EliminaPosibleA', funcionret); 
}

// genericos ----------------------

function nada() {}

function sendPost(datos, funcionh, funcionret)
{
	var enc = encabezado.split("'").join('').split(',');
	datos.append('email', enc[0]);
	datos.append('clave', enc[1]);
	datos.append('pagina', pagina);

	var xhr = new XMLHttpRequest();
	xhr.open("POST", 'http://' + servidor + '/functionh/' + funcionh, true);

	xhr.onreadystatechange = function() {
	    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
	        funcionret();
	    }
	}
	xhr.send(datos);	
}

function sendGet(params, funcion, funcionret)
{
	$.ajax({
		url: "http://" + servidor + "/function/" + funcion + "(" + encabezado + params + ")?pagina=" + pagina,
		jsonp: "callback",
		dataType: "jsonp",
		success: function( response ) {
			funcionret(response);
		}
	});	
}
