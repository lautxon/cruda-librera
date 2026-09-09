# Cruda Librera 📚

Web app multi-página para una **librería de usados** con curaduría propia. Hecha con HTML, CSS y JavaScript vanilla.

## Identidad

Cruda Librera es una librería de segunda mano. Nuestro stock proviene de una colección preexistente que estamos clasificando libro por libro. No compramos libros: solo vendemos los que ya forman parte de nuestro acervo.

## Arquitectura

```
index.html              → Home con destacados
catalogo.html           → Catálogo completo
blog.html               → Historias de libros y lectores
buscados.html           → Tablón colaborativo de libros buscados
manual-tasacion.html    → Guía educativa para tasar libros
nosotros.html           → Sobre la librería
contacto.html           → Formulario de contacto

data.js                 → Datos centralizados (libros, posts, buscados iniciales)
theme.js                → Modo oscuro compartido
cart.js                 → Carrito y modal de Mercado Pago
app.js                  → Lógica del home
catalogo.js             → Lógica del catálogo
blog.js                 → Render de posts
buscados.js             → Tablón de buscados (con localStorage)
contacto.js             → Formulario de contacto
styles.css              → Estilos globales
```

## Características

- **Catálogo de usados** con badge de estado por tapa.
- **Blog** con historias de libros y lectores.
- **Buscados**: tablón colaborativo donde los lectores publican lo que buscan y otros pueden contactarlos.
- **Manual de tasación**: guía educativa sobre cómo evaluar libros usados.
- **Carrito de reservas** con envío por WhatsApp/email.
- **Mercado Pago** (link de pago o checkout dinámico con backend).
- **Modo oscuro** persistente.
- **Responsive** mobile-first.
- Tipografías: **Merriweather** + **DM Sans**.

## Configuración

Editá `data.js` → `CONFIG`:

```javascript
const CONFIG = {
  whatsapp: "5491100000000",
  email: "hola@crudalibrera.com",
  mpPaymentLink: "",
  formEndpoint: "",
};
```

## Agregar contenido

- **Libros**: array `BOOKS` en `data.js`.
- **Posts del blog**: array `BLOG_POSTS` en `data.js`.
- **Buscados iniciales**: array `BUSCADOS_INICIALES` en `data.js` (los nuevos se guardan en localStorage).

## Deploy

```bash
git add .
git commit -m "v3: multi-página + blog + buscados + manual"
git push
```

Activá **GitHub Pages** desde Settings → Pages.

## Licencia

Uso libre para Cruda Librera.
