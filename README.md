# Cruda Librera 📚

Web app para una **librería de usados** con curaduría propia. Hecha con HTML, CSS y JavaScript vanilla.

## Identidad

Cruda Librera es una librería de segunda mano. Cada libro del catálogo es un ejemplar único, revisado y puesto en mesa con oficio. Además de vender, **compramos libros** a quienes quieran desprenderse de los suyos.

## Características

- **Catálogo de usados** con badge de estado en cada tapa (excelente, muy bueno, bueno, aceptable, con marcas).
- **Calculadora "Vendé tus libros"**: el cliente ingresa precio de tapa + estado y ve cuánto le pagaríamos.
- **Carrito de reservas** lateral con total acumulado.
- **Pago con Mercado Pago** (link de pago o checkout dinámico con backend).
- **Formulario de contacto** funcional (mailto como fallback, o Formspree/Web3Forms).
- **Modo oscuro** con persistencia en `localStorage`.
- **Responsive** (mobile-first).
- Tipografías: **Merriweather** + **DM Sans**.

## Estructura

```
index.html
styles.css
script.js
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

## Agregar libros al catálogo

Editá el array `BOOKS` en `script.js`. Cada libro tiene:

```javascript
{
  title: "Título del libro",
  author: "Autor",
  publisher: "Editorial",
  price: 25000,                          // precio usado final
  state: "very-good",                    // excellent | very-good | good | fair | worn
  stateLabel: "Muy buen estado"          // texto visible
}
```

Los estados posibles y sus clases CSS:
- `excellent` → verde oscuro
- `very-good` → verde
- `good` → amarillo
- `fair` → naranja
- `worn` → rojo

## Subir a GitHub

```bash
git init
git add .
git commit -m "Cruda Librera — librería de usados"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/cruda-librera.git
git push -u origin main
```

Activá **GitHub Pages** desde Settings → Pages.

## Licencia

Uso libre para Cruda Librera.
