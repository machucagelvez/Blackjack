/**
 * 2C = Two of Clubs
 * 2D = Two of Diamonds
 * 2H = Two of Hearts
 * 2S = Two of Spades
 */

let deck = []
const tipos = ['C', 'D', 'H', 'S']
const especiales = ['A', 'J', 'Q', 'K']
let puntosJugador = 0
let puntosComputador = 0

// Referencias HTML
// querySelector(string):
// string = tag: seleccionar por etiqueta HTML
// string = #id: seleccionar por id
// string = .class: seleccionar por clase
const btnDetener = document.querySelector('#btnDetener')
const btnPedir = document.querySelector('#btnPedir')
const divCartasJugador = document.querySelector('#jugador-cartas')
const divCartasComputador = document.querySelector('#computador-cartas')
const puntosHTML = document.querySelectorAll('small')

// Crear una baraja de cartas en orden aleatorio
const crearDeck = () => {
  for (let i = 2; i <= 10; i++) {
    for (const tipo of tipos) {
      deck.push(i + tipo)
    }
  }

  for (const tipo of tipos) {
    for (const esp of especiales) {
      deck.push(esp + tipo)
    }
  }
  deck = _.shuffle(deck)
  console.log(deck)
  return deck
}

crearDeck()

// Función para pedir una carta
const pedirCarta = () => {
  if (deck.length === 0) {
    throw 'No hay cartas en la baraja'
  }
  const carta = deck.pop()
  return carta
}

const valorCarta = (carta) => {
  const valor = carta.substring(0, carta.length - 1)
  return isNaN(valor) ? (valor === 'A' ? 11 : 10) : valor * 1 // * 1 para convertir a number. También se puede usar parseInt(valor)
  // let puntos = 0
  // if (isNaN(valor)) {
  //   puntos = valor === 'A' ? 11 : 10
  // } else {
  //   puntos = valor * 1
  // }
}

// Turno del computador
const turnoComputador = (puntosMinimos) => {
  do {
    const carta = pedirCarta()
    puntosComputador += valorCarta(carta)
    puntosHTML[1].innerText = puntosComputador
    const imgCarta = document.createElement('img')
    imgCarta.src = `assets/cartas/${carta}.png`
    imgCarta.classList.add('carta')
    divCartasComputador.append(imgCarta)

    if (puntosMinimos > 21) {
      break
    }
  } while (puntosComputador < puntosMinimos && puntosMinimos <= 21)
}

// Eventos
btnPedir.addEventListener('click', () => {
  const carta = pedirCarta()
  puntosJugador += valorCarta(carta)
  puntosHTML[0].innerText = puntosJugador
  const imgCarta = document.createElement('img')
  imgCarta.src = `assets/cartas/${carta}.png`
  imgCarta.classList.add('carta')
  divCartasJugador.append(imgCarta)

  if (puntosJugador > 21) {
    console.warn('Perdiste')
    btnPedir.disabled = true
    btnDetener.disabled = true
    turnoComputador(puntosJugador)
  } else if (puntosJugador === 21) {
    console.warn('¡21!')
    btnPedir.disabled = true
    btnDetener.disabled = true
    turnoComputador(puntosJugador)
  }
})

btnDetener.addEventListener('click', () => {
  btnPedir.disabled = true
  btnDetener.disabled = true
  turnoComputador(puntosJugador)
})
