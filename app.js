// ¡Bienvenidas y bienvenidos a nuestro primer desafío!
// Durante estas cuatro semanas, vamos a trabajar en una aplicación que encripta textos, así podrás intercambiar mensajes secretos con otras personas que sepan el secreto de la encriptación utilizada.
// Las "llaves" de encriptación que utilizaremos son las siguientes:

// La letra "e" es convertida para "enter"
// La letra "i" es convertida para "imes"
// La letra "a" es convertida para "ai"
// La letra "o" es convertida para "ober"
// La letra "u" es convertida para "ufat"

// Requisitos:

// Debe funcionar solo con letras minúsculas
// No deben ser utilizados letras con acentos ni caracteres especiales
// Debe ser posible convertir una palabra para la versión encriptada también devolver una palabra encriptada para su versión original.
// Por ejemplo:
// "gato" => "gaitober"
// gaitober" => "gato"

// La página debe tener campos para
// inserción del texto que será encriptado o desencriptado, y el usuario debe poder escoger entre as dos opciones.
// El resultado debe ser mostrado en la pantalla.
// Extras:
// Un botón que copie el texto encriptado/desencriptado para la sección de transferencia, o sea que tenga la misma funcionalidad del ctrl+C o de la opción "copiar" del menú de las aplicaciones.

let textArea = document.querySelector(".section__textarea");
let mensaje = document.querySelector(".section__textarea--mensaje");

// Añadiendo evento input al área de texto

textArea.addEventListener("input", verificarContenido);

function verificarContenido() {
    const texto = textArea.value;
    const letrasMayusculas = /[A-Z]/;
    const expresionNumeros = /[0-9]/;
    const caracteresEspeciales = /[^a-zA-Z0-9\s]/;

    if (letrasMayusculas.test(texto)) {
        alert("Se han ingresado letras mayúsculas. Por favor, usa solo letras minúsculas.");
    }

    if (expresionNumeros.test(texto)) {
        alert("Se han ingresado números. Por favor, usa solo letras.");
    }

    if (caracteresEspeciales.test(texto)) {
        alert("Se han ingresado caracteres especiales. Por favor, usa solo letras.");
    }
}

function botonEncriptar() {
    const textoEncriptado = encriptar(textArea.value);
    mensaje.value = textoEncriptado;
    textArea.value = "";
    mensaje.style.backgroundImage = "none";
}

function encriptar(cadenaTexto) {
    const listaMatriz = [["e", "enter"], ["i", "imes"], ["a", "ai"], ["o", "ober"], ["u", "ufat"]];
    cadenaTexto = cadenaTexto.toLowerCase();

    listaMatriz.forEach(([original, reemplazo]) => {
        cadenaTexto = cadenaTexto.replaceAll(original, reemplazo);
    });

    return cadenaTexto;
}

function botonDesencriptar() {
    const textoDesencriptado = desencriptar(textArea.value);
    mensaje.value = textoDesencriptado;
    textArea.value = "";
}

function desencriptar(cadenaTexto) {
    const listaMatriz = [["e", "enter"], ["i", "imes"], ["a", "ai"], ["o", "ober"], ["u", "ufat"]];
    cadenaTexto = cadenaTexto.toLowerCase();

    listaMatriz.forEach(([original, reemplazo]) => {
        cadenaTexto = cadenaTexto.replaceAll(reemplazo, original);
    });

    return cadenaTexto;
}

async function copiarTexto() {
    try {
        await navigator.clipboard.writeText(mensaje.value);
        // Cambiando visibilidad de los botones
        document.getElementById("copiarBtn").style.display = "none";
        document.getElementById("pegarBtn").style.display = "inline";
    } catch (err) {
        console.error("Error al copiar el texto: ", err);
    }
}

async function pegarTexto() {
    try {
        const textoCopiado = await navigator.clipboard.readText();
        textArea.value = textoCopiado;
        mensaje.value = "";
        // Cambiando visibilidad de los botones
        document.getElementById("pegarBtn").style.display = "none";
        document.getElementById("copiarBtn").style.display = "inline";
    } catch (err) {
        console.error("Error al pegar el texto: ", err);
    }
}



