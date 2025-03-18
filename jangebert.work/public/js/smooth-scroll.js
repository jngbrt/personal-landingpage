;(() => {
  function C() {
    if (!D && document.body) {
      D = !0
      var a = document.body,
        b = document.documentElement,
        d = window.innerHeight,
        c = a.scrollHeight
      k = 0 <= document.compatMode.indexOf("CSS") ? b : a
      m = a
      f.keyboardSupport && window.addEventListener("keydown", M, !1)
      if (top != self) v = !0
      else if (ca && c > d && (a.offsetHeight <= d || b.offsetHeight <= d)) {
        var e = document.createElement("div")
        e.style.cssText = "position:absolute; z-index:-10000; top:0; left:0; right:0; height:" + k.scrollHeight + "px"
        document.body.appendChild(e)
        var h
        w = () => {
          h ||
            (h = setTimeout(() => {
              e.style.height = "0"
              e.style.height = k.scrollHeight + "px"
              h = null
            }, 500))
        }
        setTimeout(w, 10)
        window.addEventListener("resize", w, !1)
        z = new da(w)
        z.observe(a, { attributes: !0, childList: !0, characterData: !1 })
        k.offsetHeight <= d && ((d = document.createElement("div")), (d.style.clear = "both"), a.appendChild(d))
      }
      f.fixedBackground || ((a.style.backgroundAttachment = "scroll"), (b.style.backgroundAttachment = "scroll"))
    }
  }
  function N(a, b, d) {
    ea(b, d)
    if (1 != f.accelerationMax) {
      var c = Date.now() - E
      c < f.accelerationDelta &&
        ((c = (1 + 50 / c) / 2), 1 < c && ((c = Math.min(c, f.accelerationMax)), (b *= c), (d *= c)))
      E = Date.now()
    }
    t.push({ x: b, y: d, lastX: 0 > b ? 0.99 : -0.99, lastY: 0 > d ? 0.99 : -0.99, start: Date.now() })
    if (!F) {
      var c = O(),
        e = a === c || a === document.body
      null == a.$scrollBehavior &&
        fa(a) &&
        ((a.$scrollBehavior = a.style.scrollBehavior), (a.style.scrollBehavior = "auto"))
      var h = (c) => {
        c = Date.now()
        for (var g = 0, k = 0, l = 0; l < t.length; l++) {
          var n = t[l],
            p = c - n.start,
            m = p >= f.animationTime,
            q = m ? 1 : p / f.animationTime
          f.pulseAlgorithm &&
            ((p = q),
            1 <= p ? (q = 1) : 0 >= p ? (q = 0) : (1 == f.pulseNormalize && (f.pulseNormalize /= aa(1)), (q = aa(p))))
          p = (n.x * q - n.lastX) >> 0
          q = (n.y * q - n.lastY) >> 0
          g += p
          k += q
          n.lastX += p
          n.lastY += q
          m && (t.splice(l, 1), l--)
        }
        e ? window.scrollBy(g, k) : (g && (a.scrollLeft += g), k && (a.scrollTop += k))
        b || d || (t = [])
        t.length
          ? P(h, a, 1e3 / f.frameRate + 1)
          : ((F = !1),
            null != a.$scrollBehavior && ((a.style.scrollBehavior = a.$scrollBehavior), (a.$scrollBehavior = null)))
      }
      P(h, a, 0)
      F = !0
    }
  }
  function Q(a) {
    D || C()
    var b = a.target
    if (
      a.defaultPrevented ||
      a.ctrlKey ||
      r(m, "embed") ||
      (r(b, "embed") && /\.pdf/i.test(b.src)) ||
      r(m, "object") ||
      b.shadowRoot
    )
      return !0
    var d = -a.wheelDeltaX || a.deltaX || 0,
      c = -a.wheelDeltaY || a.deltaY || 0
    ba &&
      (a.wheelDeltaX && x(a.wheelDeltaX, 120) && (d = (a.wheelDeltaX / Math.abs(a.wheelDeltaX)) * -120),
      a.wheelDeltaY && x(a.wheelDeltaY, 120) && (c = (a.wheelDeltaY / Math.abs(a.wheelDeltaY)) * -120))
    d || c || (c = -a.wheelDelta || 0)
    1 === a.deltaMode && ((d *= 40), (c *= 40))
    b = R(b)
    if (!b) return v && G ? (Object.defineProperty(a, "target", { value: window.frameElement }), parent.wheel(a)) : !0
    if (ca(c)) return !0
    1.2 < Math.abs(d) && (d *= f.stepSize / 120)
    1.2 < Math.abs(c) && (c *= f.stepSize / 120)
    N(b, d, c)
    a.preventDefault()
    S()
  }
  function M(a) {
    var b = a.target,
      d = a.ctrlKey || a.altKey || a.metaKey || (a.shiftKey && a.keyCode !== h.spacebar)
    document.body.contains(m) || (m = document.activeElement)
    var c = /^(textarea|select|embed|object)$/i,
      e = /^(button|submit|radio|checkbox|file|color|image)$/i
    if (
      !(
        c.test(b.nodeName) ||
        (r(b, "input") && !e.test(b.type)) ||
        r(m, "video") ||
        y(a) ||
        b.isContentEditable ||
        a.defaultPrevented ||
        d
      )
    ) {
      var c = a.target,
        g = !1
      if (-1 != document.URL.indexOf("www.youtube.com/watch")) {
        do if ((g = c.classList && c.classList.contains("html5-video-controls"))) break
        while ((c = c.parentNode))
      }
      c = g
    }
    if (c || b.readOnly) return !0
    var l = !0
    if ((c = a.target))
      do {
        var k = c.classList
        if (k && k.contains("_no_mousewheel")) return !0
      } while ((c = c.parentNode))
    if (a.keyCode === h.spacebar) {
      c = a.target
      g = c.tagName.toLowerCase()
      if ("button" === g || ("input" === g && c.type && -1 !== T.indexOf(c.type))) return !0
      if (r(c, "input")) return !0
    }
    if (a.keyCode === h.home || a.keyCode === h.end || a.keyCode === h.pageup || a.keyCode === h.pagedown)
      (c = a.target),
        (g = c.tagName.toLowerCase()),
        ("input" === g || "textarea" === g) &&
          (a.target.selectionStart !== a.target.selectionEnd ||
            a.target.selectionStart !== ("input" === g ? c.value.length : c.textLength)) &&
          (l = !1)
    if (l) {
      switch (a.keyCode) {
        case h.up:
          c = -f.arrowScroll
          break
        case h.down:
          c = f.arrowScroll
          break
        case h.spacebar:
          c = a.shiftKey ? 1 : -1
          c = -c * window.innerHeight
          break
        case h.pageup:
          c = -window.innerHeight
          break
        case h.pagedown:
          c = window.innerHeight
          break
        case h.home:
          c = -document.documentElement.scrollTop
          break
        case h.end:
          g = document.documentElement.scrollHeight - document.documentElement.clientHeight
          c = Math.max(g, 0)
          break
        case h.left:
          g = -f.arrowScroll
          break
        case h.right:
          g = f.arrowScroll
          break
        default:
          return !0
      }
      N(document.documentElement, g, c)
      a.preventDefault()
      S()
    }
  }
  function U(a) {
    m = a.target
  }
  function S() {
    clearTimeout(V)
    V = setInterval(() => {
      W = H = A = {}
    }, 1e3)
  }
  function I(a, b, d) {
    d = d ? d : 0
    for (var c = a.length; d < c; d++) W[J(a[d])] = b
    return b
  }
  function R(a) {
    var b = [],
      d = document.body,
      c = k.scrollHeight
    do {
      var e = W[J(a)]
      if (e) return I(b, e)
      b.push(a)
      if (c === a.scrollHeight) {
        if (((e = (X(k) && X(d)) || Y(k)), (v && k.clientHeight + 10 < k.scrollHeight) || (!v && e))) return I(b, O())
      } else if (a.clientHeight + 10 < a.scrollHeight && Y(a)) return I(b, a)
    } while ((a = a.parentElement))
  }
  function X(a) {
    return "hidden" !== getComputedStyle(a, "").getPropertyValue("overflow-y")
  }
  function Y(a) {
    a = getComputedStyle(a, "").getPropertyValue("overflow-y")
    return "scroll" === a || "auto" === a
  }
  function fa(a) {
    var b = J(a)
    null == A[b] && ((a = getComputedStyle(a, "")["scroll-behavior"]), (A[b] = "smooth" == a))
    return A[b]
  }
  function r(a, b) {
    return a && (a.nodeName || "").toLowerCase() === b.toLowerCase()
  }
  function ea(a, b) {
    a = 0 < a ? 1 : -1
    b = 0 < b ? 1 : -1
    if (B.x !== a || B.y !== b) (B.x = a), (B.y = b), (t = []), (E = 0)
  }
  function ca(a) {
    if (a)
      return (
        l.length || (l = [a, a, a]),
        (a = Math.abs(a)),
        l.push(a),
        l.shift(),
        clearTimeout(Z),
        (Z = setTimeout(() => {
          try {
            localStorage.SS_deltaBuffer = l.join(",")
          } catch (a) {}
        }, 1e3)),
        (a = 120 < a && !K(a)),
        !K(120) && !K(100) && !a
      )
  }
  function x(a, b) {
    return Math.floor(a / b) == a / b
  }
  function K(a) {
    return x(l[0], a) && x(l[1], a) && x(l[2], a)
  }
  function y(a) {
    var b = a.target,
      d = !1
    if (-1 != document.URL.indexOf("www.youtube.com/watch"))
      do if ((d = b.classList && b.classList.contains("html5-video-controls"))) break
      while ((b = b.parentNode))
    return d
  }
  function aa(a) {
    var b
    a *= f.pulseScale
    1 > a ? (b = a - (1 - Math.exp(-a))) : ((b = Math.exp(-1)), (a = 1 - Math.exp(-(a - 1))), (b += a * (1 - b)))
    return b * f.pulseNormalize
  }
  function u(a) {
    for (var b in a) L.hasOwnProperty(b) && (f[b] = a[b])
  }
  var L = {
      frameRate: 150,
      animationTime: 400,
      stepSize: 100,
      pulseAlgorithm: !0,
      pulseScale: 4,
      pulseNormalize: 1,
      accelerationDelta: 50,
      accelerationMax: 3,
      keyboardSupport: !0,
      arrowScroll: 50,
      fixedBackground: !0,
      excluded: "",
    },
    f = L,
    v = !1,
    B = { x: 0, y: 0 },
    D = !1,
    k = document.documentElement,
    m,
    z,
    w,
    l = [],
    Z,
    h = { left: 37, up: 38, right: 39, down: 40, spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36 },
    T = ["text", "search", "url", "tel", "email", "password", "number", "date"],
    t = [],
    F = !1,
    E = Date.now(),
    J = (() => {
      var a = 0
      return (b) => b.uniqueID || (b.uniqueID = a++)
    })(),
    W = {},
    H = {},
    V,
    A = {}
  if (window.localStorage && localStorage.SS_deltaBuffer)
    try {
      l = localStorage.SS_deltaBuffer.split(",")
    } catch (la) {}
  var P = (() =>
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      ((a, b, d) => {
        window.setTimeout(a, d || 1e3 / 60)
      }))(),
    da = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver,
    O = (() => {
      var a = document.scrollingElement
      return () => {
        if (!a) {
          var b = document.createElement("div")
          b.style.cssText = "height:10000px;width:1px;"
          document.body.appendChild(b)
          var d = document.body.scrollTop
          window.scrollBy(0, 3)
          a = document.body.scrollTop != d ? document.body : document.documentElement
          window.scrollBy(0, -3)
          document.body.removeChild(b)
        }
        return a
      }
    })(),
    g = window.navigator.userAgent,
    isEdge = /Edge/.test(g),
    isChrome = /chrome/i.test(g) && !isEdge,
    isSafari = /safari/i.test(g) && !isEdge,
    isMobile = /mobile/i.test(g),
    isIE11 = /Windows NT 6.1/i.test(g) && /rv:11/i.test(g),
    isSafari8or9 = isSafari && (/Version\/8/i.test(g) || /Version\/9/i.test(g)),
    isDesktop = (isChrome || isSafari || isIE11) && !isMobile,
    mousewheelEvent = "onwheel" in document.createElement("div") ? "wheel" : "mousewheel"
  var G
  mousewheelEvent &&
    isDesktop &&
    (window.addEventListener(mousewheelEvent, Q, { passive: !1 }),
    window.addEventListener("keydown", M, !1),
    window.addEventListener("load", C, !1))
  "function" === typeof define && define.amd
    ? define(() => N)
    : "object" == typeof exports
      ? (module.exports = N)
      : (window.SmoothScroll = N)
})()

