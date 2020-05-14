/**
 * @author botpi
 */

/*-------------------- index
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

function nada() {}

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

function AgregaPreguntaA(idtexto, funcion)
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

function GrabaPreguntaA(texto, idpregunta, funcion)
{
	var datos = new FormData();
	datos.append('idpregunta', idpregunta);
	datos.append('texto', texto);
	sendPost(datos, "GrabaPreguntaA", funcion);
}

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

function OrdenaPreguntaA(idorigen, iddestino, funcionret)
{
	var p = "," + idorigen + "," + iddestino
	sendGet(p, 'OrdenaPreguntaA', funcionret); 
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


function GrabaPosibleA(texto, idpregunta)
{
	var datos = {}
	datos['idpregunta'] = idpregunta;
	datos['texto'] = texto;
    $.post( 'http://' + servidor + '/functiond/GrabaPosibleA(' + encabezado + ')?pagina=' + pagina, JSON.stringify(datos))
        .always(function(){
            nada();
        }); 
}

function GrabaRespuestaA(idrespuesta, idpregunta)
{
	var datos = {}
	datos['idpregunta'] = idpregunta;
	datos['idrespuesta'] = idrespuesta;
    $.post( 'http://' + servidor + '/functiond/GrabaRespuestaA(' + encabezado + ')?pagina=' + pagina, JSON.stringify(datos))
        .always(function(){
            nada();
        }); 
}