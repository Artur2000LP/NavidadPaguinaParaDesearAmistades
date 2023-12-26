document.addEventListener('DOMContentLoaded', function () {
    initializePage();
});

var videoIndex = 0;
var videoSources = ["./video/videoDeFondo.mp4", "./video/INTRONAVIDAD.mp4"];

function playNextVideo() {
    var video = document.getElementById('background-video');
    if (video) {
        videoIndex = (videoIndex + 1) % videoSources.length;
        video.src = videoSources[videoIndex];
        video.load();
        video.play();
    }
}

function playMusic() {
    var music = document.getElementById('music');
    if (music) {
        music.play();

        var gift = document.getElementById('gift');
        var footer = document.querySelector('.footertext');
        if (gift) {
            gift.style.display = 'none';
            footer.style.display = 'none';
            
        }

        var messageContainer = document.getElementById('message-container');
        if (messageContainer) {
            messageContainer.classList.remove('hidden');

            var message = document.getElementById('message');
            if (message) {
                var storedName = getStoredName();
                if (storedName) {
                    message.innerHTML = 'Que la Navidad traiga consigo momentos mágicos y sonrisas a tu rostro, ¡Te deseo un Feliz Navidad, Atte: '+ storedName + '!';
                } else {
                    message.innerHTML = '¡Feliz Navidad!';
                }

                var nameInput = document.getElementById('nameInput');
                if (nameInput) {
                    nameInput.addEventListener('input', function () {
                        message.innerHTML = '¡Feliz Navidad de Parte de, ' + nameInput.value + '!';
                    });
                }
            }
        }
    }
}

function animateGift() {
    var gift = document.getElementById('gift');
    if (gift) {
        gift.style.transform = 'rotate(10deg)';
        setTimeout(function () {
            gift.style.transform = 'rotate(0deg)';
        }, 500);
    }
}

// Función para obtener el nombre almacenado en localStorage
function getStoredName() {
    return localStorage.getItem('storedName') || '';
}

// Función para inicializar la página
function initializePage() {
    // Obtener el nombre almacenado
    var storedName = getStoredName();

    // Si hay un nombre almacenado, mostrarlo en el mensaje
    var message = document.getElementById('message');
    if (message && storedName) {
        message.innerHTML = '¡Feliz Navidad, ' + storedName + '!';
    }
}

// Función para cambiar el nombre
function changeName() {
    var nameInput = document.getElementById('nameInput');
    var newName = nameInput.value;

    // Guardar el nombre en localStorage
    localStorage.setItem('storedName', newName);

    // Actualizar el mensaje
    var message = document.getElementById('message');
    if (message) {
        message.innerHTML = '¡Feliz Navidad, ' + newName + '!';
    }
    // Copiar el URL al portapapeles
    copyURLToClipboard();
}

// Función para copiar el URL al portapapeles
function copyURLToClipboard() {
    var url = window.location.href;
    
    // Utilizar el nuevo API de Clipboard
    navigator.clipboard.writeText(url)
        .then(function() {
            alert('URL copiado y listo para Compartir: \n' + url);
        })
        .catch(function(err) {
            console.error('Error al copiar El URL: \n', err);
        });
}

/*salir del sitio */


function stopMusicAndClose() {
    var music = document.getElementById('music');
    music.pause();
    music.currentTime = 0;
    
    // Cerrar la ventana actual
    window.close();
}