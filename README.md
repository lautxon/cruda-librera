# Cruda Librera 📚

Web app para una librería pequeña con curaduría propia. Hecha con HTML, CSS y JavaScript vanilla (sin frameworks, sin build).

## Características

- **Catálogo** de novedades con tapas estilizadas en CSS.
- **Modo oscuro** con persistencia en `localStorage`.
- **Carrito de consultas** lateral con total acumulado.
- **Calculadora de usados** con 5 niveles de estado.
- **Formulario de contacto** funcional (mailto como fallback, o Formspree/Web3Forms).
- **Pago con Mercado Pago**:
  - Modo inmediato: link de pago estático (configurable).
  - Modo avanzado: checkout dinámico con backend Node.js (ver `backend-mp.md`).
- **Responsive** (mobile-first).
- Tipografías: **Merriweather** + **DM Sans**.

## Estructura

```
index.html
styles.css
script.js
backend-mp.md      ← integración completa con backend Node
README.md
```

## Configuración rápida

Abrí `script.js` y editá el objeto `CONFIG` al inicio:

```javascript
const CONFIG = {
  whatsapp: "5491100000000",        // tu WhatsApp
  email: "hola@crudalibrera.com",   // tu email
  mpPaymentLink: "",                // link de pago de Mercado Pago
  formEndpoint: "",                 // endpoint de Formspree/Web3Forms
};
```

### Cómo generar el link de pago de Mercado Pago

1. Entrá a [Mercado Pago](https://www.mercadopago.com.ar/) → **Actividad** → **Link de pago**.
2. Creá un link por el monto total del carrito (podés actualizarlo cada vez).
3. Copiá la URL (ej: `https://mpago.la/2AbCdEf`) y pegala en `CONFIG.mpPaymentLink`.

### Cómo conectar el formulario

**Opción A — Formspree (gratis, 50 envíos/mes):**
1. Creá cuenta en [formspree.io](https://formspree.io).
2. Creá un form y copiá tu endpoint (ej: `https://formspree.io/f/xxxxxx`).
3. Pegalo en `CONFIG.formEndpoint`.

**Opción B — Web3Forms (gratis, ilimitado):**
1. Entrá a [web3forms.com](https://web3forms.com).
2. Generá tu access key.
3. Usá el endpoint que te dan.

**Opción C — Sin backend:**
Dejá `formEndpoint` vacío. El formulario abrirá el cliente de correo del visitante.

## Integración avanzada con Mercado Pago

Para un checkout dinámico (sin links estáticos), seguí la guía en [`backend-mp.md`](./backend-mp.md). Incluye código Node.js listo para deploy.

## Subir a GitHub

```bash
git init
git add .
git commit -m "v2: contacto + Mercado Pago"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/cruda-librera.git
git push -u origin main
```

Luego activá **GitHub Pages** desde Settings → Pages.

## Licencia

Uso libre para Cruda Librera.
