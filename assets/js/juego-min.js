const miModulo = (() => {
  'use strict'
  let e = [],
    f = ['C', 'D', 'H', 'S'],
    g = ['A', 'J', 'Q', 'K'],
    h = [],
    a = document.querySelector('#btnDetener'),
    b = document.querySelector('#btnNuevo'),
    c = document.querySelector('#btnPedir'),
    i = document.querySelectorAll('.divCartas'),
    j = document.querySelectorAll('small'),
    d = (d = 2) => {
      ;(e = k()), (h = [])
      for (let b = 0; b < d; b++)
        h.push(0), (j[b].innerHTML = 0), (i[b].innerHTML = '')
      ;(c.disabled = !1), (a.disabled = !1)
    },
    k = () => {
      e = []
      for (let a = 2; a <= 10; a++) for (let b of f) e.push(a + b)
      for (let c of f) for (let d of g) e.push(d + c)
      return _.shuffle(e)
    },
    l = () => {
      if (0 === e.length) throw 'No hay cartas en la baraja'
      return e.pop()
    },
    m = (b) => {
      let a = b.substring(0, b.length - 1)
      return isNaN(a) ? ('A' === a ? 11 : 10) : 1 * a
    },
    n = (b, a) => ((h[a] += m(b)), (j[a].innerText = h[a]), h[a]),
    o = (b, c) => {
      let a = document.createElement('img')
      ;(a.src = `assets/cartas/${b}.png`),
        a.classList.add('carta'),
        i[c].append(a)
    },
    p = () => {
      let [a, b] = h
      setTimeout(() => {
        b === a
          ? alert('Empate')
          : a > 21
          ? alert('Perdiste')
          : b > 21
          ? alert('Ganaste')
          : alert('Perdiste')
      }, 100)
    },
    q = (a) => {
      let b = 0
      do {
        let c = l()
        ;(b = n(c, h.length - 1)), o(c, h.length - 1)
      } while (b < a && a <= 21)
      p()
    }
  return (
    c.addEventListener('click', () => {
      let d = l(),
        b = n(d, 0)
      o(d, 0),
        b > 21
          ? (console.warn('Perdiste'),
            (c.disabled = !0),
            (a.disabled = !0),
            q(b))
          : 21 === b &&
            (console.warn('\xa121!'),
            (c.disabled = !0),
            (a.disabled = !0),
            q(b))
    }),
    a.addEventListener('click', () => {
      ;(c.disabled = !0), (a.disabled = !0), q(h[0])
    }),
    b.addEventListener('click', () => {
      d()
    }),
    { nuevoJuego: d }
  )
})()
