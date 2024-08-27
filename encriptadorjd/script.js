// Definir las letras que deseas cambiar
const encryptionMap = {
    "a": "ai",
    "e": "enter",
    "i": "imes",
    "o": "ober",
    "u": "ufat",
};

// Crear un objeto inverso para desencriptar
const decryptionMap = {
    "ai": "a",
    "enter": "e",
    "imes": "i",
    "ober": "o",
    "ufat": "u",
};

// Función para encriptar el texto
function encryptText() {
    let inputText = document.getElementById("inputText").value.trim();
    let encryptedText = "";

    if (inputText === "") {
        showNotification("Por favor, ingresa un texto para encriptar.", false);
        showOutputNotification("Debes ingresar texto para encriptar.");
        return;
    }

    for (let i = 0; i < inputText.length; i++) {
        let char = inputText[i];
        encryptedText += encryptionMap[char] || char;
    }

    document.getElementById("outputText").value = encryptedText;
}

// Función para desencriptar el texto
function decryptText() {
    let inputText = document.getElementById("inputText").value.trim();
    let decryptedText = "";
    let i = 0;

    if (inputText === "") {
        showNotification("Por favor, ingresa un texto .", false);
        showOutputNotification("Debes ingresar texto para desencriptar.");
        return;
    }

    while (i < inputText.length) {
        let found = false;

        for (let key in decryptionMap) {
            if (inputText.substr(i, key.length) === key) {
                decryptedText += decryptionMap[key];
                i += key.length;
                found = true;
                break;
            }
        }

        if (!found) {
            decryptedText += inputText[i];
            i++;
        }
    }

    document.getElementById("outputText").value = decryptedText;
}

// Función para copiar el texto encriptado al portapapeles
function copyText() {
    let outputText = document.getElementById("outputText").value;

    if (outputText === "") {
        showNotification("No hay texto encriptado para copiar.", false);
        showOutputNotification("No hay texto para copiar.");
        return;
    }

    navigator.clipboard.writeText(outputText)
        .then(() => {
            showNotification("Texto copiado ", true);
        })
        .catch(err => {
            console.error("Error al copiar al portapapeles: ", err);
        });
}

// Función para mostrar la notificación global
function showNotification(message, success) {
    const notification = document.createElement("div");
    notification.className = "notification";
    notification.textContent = message;

    if (success) {
        notification.classList.add("success");
    } else {
        notification.classList.add("error");
    }

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add("fade-out");
        setTimeout(() => {
            notification.remove();
        }, 1000);
    }, 2000);
}

// Función para mostrar la notificación en el área de texto encriptado
function showOutputNotification(message) {
    const outputNotification = document.getElementById("outputNotification");
    outputNotification.textContent = message;
    outputNotification.style.display = "block";

    setTimeout(() => {
        outputNotification.style.display = "none";
    }, 3000);
}
