/**
 * @author botpi
 */

function inicio()
{
	encabezado = localStorage.getItem("encabezado");
	if (encabezado==null || encabezado=="")
		encabezado="'',''";
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

	var cad='', hora='', dia='', horario='', clase='' 
		ww = $(window).width(),
		dh = $(document).height(),
		t = $("#horario").position().top,
		l = $("#horario").position().left,
		h = parseInt((dh-t-40)/10),
		w = parseInt((ww-l-100)/7),
		st = 'width:' + w + 'px; max-width:' + w + 'px; height:' + h + 'px; min-height: 50px; padding-top: 5px;',
		dias = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'];

	for (d=0; d<7; d++) {
		cad += '<div style="display: table-cell; width: ' + w + 'px; text-align: center;">' + dias[d] + '</div>';
	}

	for (h=0; h<10; h++) {	
		for (d=0; d<7; d++) {
	
			hora = '', dia = '', clase='';
			if (gdatos.horas[h] && gdatos.dias[d]) {
				horario = buscaHora(gdatos.horario, d, gdatos.horas[h].hora);
				hora = d + '-xxx-' + h;
				if (horario) {
					hora = horario.horac;
					dia = horario.dia;	
					clase = horario.nombre;				
				}
/*				hora = gdatos.horas[h].hora;
				dia = dias[gdatos.dias[d].dia];*/
			}

			cad += '<div class="node col" onclick="verHora(' + d + ',' + h + ')"'
				+ ' style="' + st + '"'
				+ '">' 
				+ hora + '<br>' + clase
				+ '</div>';
		}
	}
	$("#horario").html(cad);
}

function buscaHora(lista, dia, hora)
{
	resp = null;
	$.each(lista, function(i,item) {
		 if (item.dia==dia && item.horac==hora)
		 	return resp = item;
	});
	return resp;

}

function verHora(dia, hora)
{

}