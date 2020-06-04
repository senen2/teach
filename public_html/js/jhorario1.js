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

	var cad = "", hora = '', dia = '', 
		ww = $(window).width(),
		dh = $(document).height(),
		t = $("#horario").position().top,
		l = $("#horario").position().left,
		h = parseInt((dh-t-40)/10),
		w = parseInt((ww-l-100)/7),
		st = 'width:' + w + 'px; max-width:' + w + 'px; height:' + h + 'px;',
		dias = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'];

	for (i=0; i<10; i++) {	
		for (j=0; j<7; j++) {

			hora = '', dia = '';
			if (gdatos.horas[i] && gdatos.dias[j]) {
				hora = gdatos.horas[i].hora;
				dia = dias[gdatos.dias[j].dia];
			}

			cad += '<div class="node col" onclick="verHora(' + i + ',' + j + ')"'
				+ ' style="' + st + '"'
				+ '">' 
				+ dia + '<br>' + hora
				+ '</div>';
		}
	}
	$("#horario").html(cad);
}

function buscaHora(lista, dia, hora)
{
	resp = null;
	$.each(lista, function(i,item) {
		 if (item.dia==dia && item.hora==hora)
		 	return resp = item;
	});
	return resp;

}

function verHora(dia, hora)
{

}