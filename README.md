# Cruda Librera 📚

Web app para una librería pequeña con curaduría propia. Hecha con HTML, CSS y JavaScript vanilla (sin frameworks, sin build).

## Características

- **Catálogo** de novedades con tapas estilizadas en CSS (ordenadas según la lista provista).
- **Modo oscuro** con persistencia en `localStorage`.
- **Carrito de consultas** lateral: acumula libros y permite enviar el pedido por **WhatsApp** o **email**.
- **Calculadora de usados** con 5 niveles de estado (90%, 80%, 70%, 60%, 50%).
- **Responsive** (mobile-first breakpoints en 860px y 520px).
- Tipografías: **Merriweather** (texto) + **DM Sans** (títulos).

## Estructura

```
index.html
styles.css
script.js
README.md
```

## Personalización rápida

1. **Número de WhatsApp**: en `script.js`, línea del handler de `btnWA`, reemplazar `5491100000000`.
2. **Email**: buscar `hola@crudalibrera.com` en `index.html` y `script.js`.
3. **Imágenes reales de tapas**: reemplazar el `<div class="book-cover">` generado en `script.js` por un `<img src="...">` cuando tengas las fotos.
4. **Agregar libros**: editar el array `BOOKS` en `script.js`.

## Subir a GitHub

```bash
git init
git add .
git commit -m "Primer commit: Cruda Librera"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/cruda-librera.git
git push -u origin main
```

Luego podés activar **GitHub Pages** desde Settings → Pages para tenerla online gratis.

## Licencia

Uso libre para Cruda Librera.