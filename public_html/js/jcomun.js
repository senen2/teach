/**
 * @author Botpi
 */

function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
}

function logout()
{
	// document.cookie = "encabezado='',''";
	localStorage.setItem("encabezado", "");
	window.location.assign("index.html");
}

/*-----------------------------
*/
function getCookie(c_name)
{
	var c_value, c_start, c_end;
	 c_value = document.cookie;
	c_start = c_value.indexOf(" " + c_name + "=");
	if (c_start == -1) {
		c_start = c_value.indexOf(c_name + "="); }
	if (c_start == -1) {
		c_value = null; }
	else  {
		c_start = c_value.indexOf("=", c_start) + 1;
		c_end = c_value.indexOf(";", c_start);
		if (c_end == -1)  {
			c_end = c_value.length;  }
		c_value = unescape(c_value.substring(c_start,c_end));}
	
	return c_value;
}

function IsEmail(email) 
{
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}

function buscaObjetoxID(datos, ID)
{
	for (var i=0; i<datos.length; i++)
		if (datos[i]["ID"]==ID)
			break;
	if (i<datos.length)
		return datos[i];
	return null;
}

function buscaxid(lista, id)
{
	resp = null;
	$.each(lista, function(i,item) {
		 if (item.id==id)
		 	return resp = item;
	});
	return resp;
}


function esUsuario(datos)
{
	return  datos.cuenta!=null && datos.cuentaCat!=null && datos.cuentaCat.ID==datos.cuenta.ID;
}

function isOwner(datos)
{
	return  datos.cuenta!=null && datos.cuentaCat!=null && datos.cuentaCat.IDowner==datos.cuenta.ID;
}

function logueado()
{
	var d = encabezado.split(",");
	return d[0]!="''" & d[2].trim()!="''";
}

function ymd(date)
{
	return date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
}

function extraeNombre(lista, campo)
{
	var l=[];
	$.each(lista, function(i, item) {
		l.push(item[campo]);
	});	
	return l;	
}

/*------------------------------- Selectores
*/
function llenaSelector(datos, control)
{
	var cad = '<option value="0">Seleccione</option>';
	$.each(datos, function(i,item) {
		cad = cad + '<option value="' + item.ID +'">' + item.nombre + '</option>';
	});
	$("#" + control).html(cad);	
}

function llenaSelectorxCampo(datos, control,campo)
{
	var cad = "";
	$.each(datos, function(i,item) {
		cad = cad + '<option value="' + item.ID +'">' + item[campo] + '</option>';
	});
	$("#" + control).html(cad);	
}

function poneSelector(val, control)
{
	var sel = document.getElementById(control);
	sel.value = val;
/*
    for(var i = 0, j = sel.options.length; i < j; ++i) {
        if(sel.options[i].innerHTML === val) {
           sel.selectedIndex = i;
           break;
        }
    }
    */
}

function poneSelectorxID(ID, control)
{
	var sel = document.getElementById(control);
    for(var i = 0, j = sel.options.length; i < j; ++i) {
        if(sel.options[i].value === ID.toString()) {
           sel.selectedIndex = i;
           break;
        }
    }
}

/*----------------- formatos
*/
Number.prototype.formatMoney = function(c, d, t){
var n = this, 
    c = isNaN(c = Math.abs(c)) ? 2 : c, 
    d = d == undefined ? "." : d, 
    t = t == undefined ? "," : t, 
    s = n < 0 ? "-" : "", 
    i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", 
    j = (j = i.length) > 3 ? j % 3 : 0;
   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
 };
 
/*-------------------------datepicker*/
function poneDatePicker(selector, formato, fecha)
{
	$(selector).datepicker();
	$(selector).datepicker( "option", "dayNamesMin", [ "Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa" ]);
	$(selector).datepicker( "option", "monthNamesShort", [ "Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic" ]);
	$(selector).datepicker( "option", "monthNames", [ "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio"
													, "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre" ]);
	if (formato!="")
		$(selector).datepicker( "option", "dateFormat", formato);
	$(selector).datepicker( "setDate", fecha);
	
}

function tomaDatePicker(valor)
{
	var t = $("#fecha").val().replace("Ene","Jan").replace("Abr","Apr").replace("Ago","Aug").replace("Dic","Dec");
	return new Date(t);
	
}

function menuPop(state)
{
	if (state==1) {
    	$("#menu").addClass("out");
    	$("#mask2").removeClass("DN");
    	$('#mask2').css({'width':$(window).width(),'height':$(document).height()});
   }
   else {
    	$("#mask2").addClass("DN");
    	$("#menu").removeClass("out");
	}
}
function showLogin(state)
{
	if (state==1) {
    	$("#btnshow").addClass("DN");
    	$("#btnshow").removeClass("yes-cell");
    	$("#btnlogin").removeClass("no-cell");
   		$("#passwdlogin").removeClass("no-cell");
    	$("#emaillogin").removeClass("no-cell");
   }
}

function today()
{
	var d = new Date();
	var strDate = d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate();
	return strDate;
}

// cuadros ----------------------------------------

function dibujaCuadro(nrows, ncols, control, width, height, padding_left, padding_top, trows, tcols)
{
	var cad=''
		,h = parseInt((height - control.position().top - padding_top)/nrows)
		,w = parseInt((width - control.position().left - padding_left)/ncols)
		,st = 'width:' + w + 'px; max-width:' + w + 'px; height:' + h + 'px; min-height: 50px; padding-top: 5px;';

	var ncontrol = control.selector;
	if (ncontrol.substr(0,1)=="#")
		ncontrol = ncontrol.substr(1);

	var row, col;
	for (col=0; col<ncols; col++) {
		cad += 
			'<div style="display: table-cell; width: ' + w + 'px; text-align: center;">' 
				+ tcols[col] 
			+ '</div>';
	}

	for (row=0; row<nrows; row++) {	
		cad += '<div class="col">&nbsp;' + trows[row];

		for (col=0; col<ncols; col++) {
			cad += '<div id="' + ncontrol + '-' + row + '-' + col + '"'
				+ ' class="node col" style="' + st + '"'
				+ ' onclick="click_' + ncontrol + '(' + row + ',' + col + ')"'
				+ '">' 
				+ '</div>';
		}
		cad += '</div>'
	}
	control.html(cad);
}

function coorCuadro(val, rows, cols, nrow, ncol)
{
	var row, col;
	for (row=0; row<rows.length; row++) {	
		if (val[nrow] == rows[row][nrow])
			break;
	}
	for (col=0; col<cols.length; col++) {
		if (val[ncol] == cols[col][ncol])
			break;
	}
	return [row, col];
}
