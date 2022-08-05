// Patrón módulo:
// (() => {

// })()

const miModulo = (() => {
  'use strict'

  let deck = []
  const tipos = ['C', 'D', 'H', 'S'],
    especiales = ['A', 'J', 'Q', 'K']
  let puntosJugadores = []

  // Referencias HTML
  // querySelector(string):
  // string = tag: seleccionar por etiqueta HTML
  // string = #id: seleccionar por id
  // string = .class: seleccionar por clase
  const btnDetener = document.querySelector('#btnDetener'),
    btnNuevo = document.querySelector('#btnNuevo'),
    btnPedir = document.querySelector('#btnPedir'),
    divCartasJugadores = document.querySelectorAll('.divCartas'),
    puntosHTML = document.querySelectorAll('small')

  const inicializarJuego = (numJugadores = 2) => {
    deck = crearDeck()
    puntosJugadores = []
    for (let i = 0; i < numJugadores; i++) {
      puntosJugadores.push(0)
      puntosHTML[i].innerHTML = 0
      divCartasJugadores[i].innerHTML = ''
    }
    btnPedir.disabled = false
    btnDetener.disabled = false
  }

  // Crear una baraja de cartas en orden aleatorio
  const crearDeck = () => {
    deck = []
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
    return _.shuffle(deck)
  }

  // Función para pedir una carta
  const pedirCarta = () => {
    if (deck.length === 0) {
      throw 'No hay cartas en la baraja'
    }
    return deck.pop()
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

  // Turno 0: jugador 1, turno 1: jugador 2, ..., último turno: computador
  const acumularPuntos = (carta, turno) => {
    puntosJugadores[turno] += valorCarta(carta)
    puntosHTML[turno].innerText = puntosJugadores[turno]
    return puntosJugadores[turno]
  }

  const crearCarta = (carta, turno) => {
    const imgCarta = document.createElement('img')
    imgCarta.src = `assets/cartas/${carta}.png`
    imgCarta.classList.add('carta')
    divCartasJugadores[turno].append(imgCarta)
  }

  const determinarGanador = () => {
    const [puntosMinimos, puntosComputador] = puntosJugadores
    // El setTimeout es para que se alcance a ejecutar todo el código antes de que se ejecute la alerta
    setTimeout(() => {
      if (puntosComputador === puntosMinimos) {
        alert('Empate')
      } else if (puntosMinimos > 21) {
        alert('Perdiste')
      } else if (puntosComputador > 21) {
        alert('Ganaste')
      } else {
        alert('Perdiste')
      }
    }, 100)
  }

  // Turno del computador
  const turnoComputador = (puntosMinimos) => {
    let puntosComputador = 0
    do {
      const carta = pedirCarta()
      puntosComputador = acumularPuntos(carta, puntosJugadores.length - 1)
      crearCarta(carta, puntosJugadores.length - 1)
    } while (puntosComputador < puntosMinimos && puntosMinimos <= 21)

    determinarGanador()
  }

  // Eventos
  btnPedir.addEventListener('click', () => {
    const carta = pedirCarta()
    const puntosJugador = acumularPuntos(carta, 0)
    crearCarta(carta, 0)

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
    turnoComputador(puntosJugadores[0])
  })

  btnNuevo.addEventListener('click', () => {
    inicializarJuego()
  })

  return {
    nuevoJuego: inicializarJuego,
  }
})()
