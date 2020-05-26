/**
 * @author botpi
 */

function login()
{
	if (IsEmail($("#emaillogin").val()) & $("#passwdlogin").val()!="") {
		encabezado = "'" + $("#emaillogin").val() + "','" + $("#passwdlogin").val() + "'";
		Login(verUsuario);
	}
}

function verUsuario(datos)
{
	if (datos) {
		localStorage.setItem("encabezado", encabezado);
		localStorage.setItem("email", $("#emaillogin").val());
		window.location.assign("lee.html");
	}
	else
		alert("nombre de usuario o clave incorrectos");
}

function inicioIndex() {
	if (localStorage.getItem("encabezado")) {
		window.location.assign("lee.html");
	}
}

function creaUsuario()
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
	CreaUsuarioA($("#nombre").val(), $("#modo").val(), 'es', verCreacion);
}

function verCreacion(datos)
{
	if (datos=="ok")
		Login(verUsuario);
	else	
		alert("ya existe una cuenta con este email");
}
