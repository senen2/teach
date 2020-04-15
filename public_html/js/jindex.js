/**
 * @author botpi
 */

function login()
{
	if (IsEmail($("#emaillogin").val()) & $("#passwdlogin").val()!="") {
		encabezado = "'" + $("#emaillogin").val() + "','" + $("#passwdlogin").val() + "'";
		LoginI(verUsuario);
	}
}

function verUsuario(datos)
{
	if (datos) {
		// document.cookie = "encabezado=" + encabezado;
		localStorage.setItem("encabezado", encabezado);
		localStorage.setItem("email", $("#emaillogin").val());
		window.location.assign("mov.html");
	}
	else
		alert("nombre de usuario o clave incorrectos");
}

function registrar()
{
	if ($("#nombre").val()=="" | $("#email").val()=="" | $("#clave").val()=="") {
		alert("los campos no pueden estar en blanco");
		return;
	}
	if (!IsEmail($("#email").val())) {
		alert("el email está mal escrito");
		return;
	}
	encabezado = "'" + $("#email").val() + "','" + $("#clave").val() + "'";
	AgregaClienteF($("#nombre").val(), verCreacion);
}

function verCreacion(datos)
{
	if (datos=='"ok"')
		LoginF(verUsuario);
	else	
		alert("ya existe una cuenta con este email");
}
function inicioIndex() {
	if (localStorage.getItem("encabezado")) {
		window.location.assign("mov.html");
	}
}
