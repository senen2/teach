/**
 * @author botpi
 */

function inicio()
{
	encabezado = localStorage.getItem("encabezado");
	if (encabezado==null || encabezado=="")
		encabezado="'',''";
	gdias = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'];
	ghoras = [8, 9, 10, 11, 12, 1, 2, 3, 4, 5]
	leeServidor();
	LeeHorarioA(1, dibujaHorario);
/*	dibujaHorario([1]);*/
}

function dibujaHorario(datos)
{
	if (!datos) 
		window.location.assign("index.html");
	
	if (datos!='*')
		gdatos = datos;

	dibujaCuadro(10, 7, $("#horario"), $(window).width(), $(document).height(), 100, 40, ghoras, gdias);

	var hora, dia;
	$.each(gdatos.horario, function(i,item) {
		/*[hora, dia] = coorCuadro(item, datos.ghoras, gdatos.dias, 'horac', 'dia');*/
		$("#horario-" + item.hora + '-' + item.dia).html(item.horac + ' / ' + item.duracion + 'min<br>' + item.nombre)
	});

}

function click_horario(hora, dia)
{
	var cad= gdias[dia] + ' a las ' + ghoras[hora];

	$("#editor").html(
		'<div class="sector v2" style=" z-index:9010;position: fixed;top:25%;left:40%;">'
			+ '<label class="item-name" align="center">' + cad + '</label><br><br>'
			+ '<div style="min-height:200px; font-size:12px" align="left">'
			+ '</div>'
		    + '<div class="col"><a id="titcerrar" class="btn v4" onclick="guardar();">Guardar</a></div>'
			+ '<div class="col">&nbsp;&nbsp;&nbsp;&nbsp;</div>'
		    + '<div class="col"><a id="titcerrar" class="btn v4" onclick="cerrar();">Cancelar</a></div>'
		+ '<br></div>');

	tapar();		
}

function tapar()
{
	$("#editor").show();
	$("#mask2").removeClass("DN");
	$('#mask2').css({'width':$(window).width(),'height':$(document).height()});	
}

function destapar()
{
	$("#editor").hide();
	$("#mask2").addClass("DN");
	$('#mask2').css({'width':0,'height':0});	
}

function cerrar()
{
	destapar();
}

function guardar()
{
	destapar();
}
