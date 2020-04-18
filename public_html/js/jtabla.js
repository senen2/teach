/**
 * @author Botpi
 */

function dibujaTabla(tabla, tag, tagID, fundetalle)
{
	$('#' + tag).html(cadTabla(tabla, tagID, fundetalle));	
	// ajustaTabla(tag);	
}

function cadTabla(tabla, tagID, fundetalle)
{
	var cad = "", tit="", tot="", estado="", f="", finput, val;
	
	$.each(tabla.titulos, function(i,item) {
		tit = tit + '<th class="encabezado" style="text-align:' + item.alinea + ';width:' + item.ancho + 'px">' + item.titulo + '</th>';
	});

	var f;
	$.each(tabla.datos, function(i,item) {	
		f="";
		if (fundetalle)
			f = ' onclick="'+ fundetalle + "('" + item.ID + "');" + '"';
			
		cad += '<tr id="' + tagID + '-' + item.ID + '" ' +  f + '>' + dibujaRenglon(item, tabla.titulos) + '</tr>';
	});

	$.each(tabla.totales, function(i,item) {
		$.each(tabla.titulos, function(t,itemtit) {
			tot = tot + '<th>' + item[itemtit.campo] + '</th>';
		});
	});

	return '<tr>' + tit + '</tr>' + cad + '<tr>' + tot + '</tr>';	
}

function dibujaRenglon(item, titulos)
{
	var cad="";
	$.each(titulos, function(t,itemtit) {
		cad += dibujaCelda(item, itemtit);
	});
	return cad;
}

function dibujaCelda(item, itemtit)
{
	var finput="", funcion="", aviso="", cad=""
		, td = '<td style="text-align:' + itemtit.alinea + '">';
	if ("aviso" in itemtit)
		aviso = ' title="' + itemtit.aviso + '"" ';	
	
	if ("link" in itemtit) {
		val = "";
		if (itemtit.link!="")
			val = item[itemtit.link];
		funcion = "";
		if (itemtit.funcion!="")
			funcion=item[itemtit.funcion];
		return td + '<a class="normal" style="font-weight: 700" href="'
			  + itemtit.linktext + val + '" ' + funcion + aviso + '>' 
			  + item[itemtit.campo] + '</a></td>';								
	}
	else if ("funcion" in itemtit)
		return td + '<a href="#" onclick="' + itemtit.funcion + '(' + item.ID + ');">' + itemtit.titulo + '</a></td>';
	else if ("input" in itemtit) {
		finput = "";
		if ("funcioninput" in itemtit)
			finput = ' onchange="' + itemtit.funcioninput + '(' + item.ID + ');"';
		
		if (itemtit.input=="normal")
			return td + '<input id="' + itemtit.campo + '-' + item.ID +'" ' + finput + ' value="' + item[itemtit.campo] + '"></td>';
		else if (itemtit.input=="select") {
			cad = td + '<select id="' + itemtit.campo + '-' + item.ID +'" ' + finput + '>';
			$.each(itemtit.datos, function(i,itemsel) {
				cad = cad + '<option value="' + itemsel.ID +'"' + (itemsel.nombre==item[itemtit.campo] ? ' selected': '') + '>' + itemsel.nombre + '</option>';
			});
			return cad + '</select></td>';
		}
		else
			return td + '<input id="' + itemtit.campo + '-' + item.ID + '" ' 
				+ ' type="checkbox"' + (item[itemtit.campo]==0 ? '':' checked') + finput + aviso  + '>' + '</td>';	
	}
	else if ("img" in itemtit)
		return '<td><a href="' + itemtit.img + item[itemtit.imgcampo] + '"><img width="' + (itemtit.ancho-4) + 'px" src="' + item[itemtit.campo] + '"/></a></td>';
	else
		return td + '<label>' + item[itemtit.campo] + '</label></td>';
	
	return "";
}

function seleccionaRenglon(tabla, tag, ID)
{
	$.each(tabla.datos, function(i,item) {
		$('#' + tag + "-" + item.ID).removeClass("seleccionada");
	});
	$('#' + tag + "-" + ID).addClass("seleccionada");	
}

function ajustaTabla(tabla)
{
	var $table = $('#' + tabla),
	    $bodyCells = $table.find('tbody tr:first').children(),
	    colWidth;

    colWidth = $bodyCells.map(function() {
        return $(this).width();
    }).get();
    
    $table.find('thead tr').children().each(function(i, v) {
        $(v).width(colWidth[i]);
    });    	
}
