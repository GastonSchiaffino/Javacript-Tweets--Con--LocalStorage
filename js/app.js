//Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];
//EventListeners
eventListeners();

function eventListeners() {
    //cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet);

    //Cuando el documento esta listo
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];
        console.log(tweets);
        crearHTML();
    })
}
//Funciones
function agregarTweet(e) {
    e.preventDefault();

    //Textare donde el usuario escribe
    const tweet = document.querySelector('#tweet').value;
    //Validacion para que no se introduzcan textos vacios
    if (tweet === '') {
        mostrarError('El mensaje no puede ir vacio');
        return; //Evita que se ejecuten líneas de código
    }

    //Ante la falta de uso de una base de datos para diferenciar entre entradas iguales usamos DateNow
    const tweetObj = {
            id: Date.now(),
            tweet // es igual a poner tweet: tweet. En las nuevas versiones de javascript dentro de un object colocar una sola palabra crea la llave y el valor con el mismo nombre. 
        }
        //Añadir al arreglo de tweets
    tweets = [...tweets, tweetObj];

    //Una vez agregado creamos el html
    crearHTML();

    //Reiniciar el formulario
    formulario.reset();
}

function mostrarError(error) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    //Insertarlo en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    //Elimina el mensaje de error pasados 3 segundos
    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
}

//Muestra el listado de los tweets
function crearHTML() {
    limpiarHTML()
    if (tweets.length > 0) {
        tweets.forEach(tweet => {

            //Agregar un boton de eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X';

            //añdir funcionalidad de eliminado
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }

            //Crear el html
            const li = document.createElement('li');

            //Añadir el texto
            li.innerText = tweet.tweet;

            //Asignar el botón
            li.appendChild(btnEliminar);

            //Insertar los tweet en el html
            listaTweets.appendChild(li);
        })
    }

    sincronizarStorage();
}
//Agrega los tweets actuales al local storage
function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

//Elminar un tweet
function borrarTweet(id) {
    tweets = tweets.filter(tweet => tweet.id !== id);
    crearHTML();
}

//Limpiar HTML
function limpiarHTML() {
    while (listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}