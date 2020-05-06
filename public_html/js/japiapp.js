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

function GrabaTextoA1(texto)
{
	var datos = {}
	datos['idtexto'] = gtexto.textos[0].id;
	datos['texto'] = texto;
    $.post( 'http://' + servidor + '/functiond/GrabaTextoA(' + encabezado + ')?pagina=' + pagina, JSON.stringify(datos))
        .always(function(){
            nada();
        }); 
}

function GrabaTextoA2(texto)
{
	var datos = {}
	datos['idtexto'] = gtexto.textos[0].id;
	datos['texto'] = texto;
	var enc = encabezado.split("'").join('').split(',');
	datos['email'] = enc[0];
	datos['clave'] = enc[1];
	datos['pagina'] = pagina;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", 'http://' + servidor + '/functionh/GrabaTextoA', true);
	xhr.setRequestHeader("Content-Type", "text/xml");
/*	xhr.setRequestHeader("Content-Type", "multipart/form-data");
*/
	xhr.onreadystatechange = function() { // Call a function when the state changes.
	    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
	        nada();
	    }
	}
	xhr.send(texto);
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