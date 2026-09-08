# Integración completa con Mercado Pago (backend)

Esta guía es para cuando quieras pasar de **links de pago estáticos** a un **checkout dinámico** donde el precio se calcula en el servidor (más seguro, más profesional).

## ¿Por qué hace falta backend?

El `access_token` de Mercado Pago **nunca** debe ir en el frontend. Si lo ponés en `script.js`, cualquiera puede verlo y hacer compras en tu nombre.

## Opción recomendada: Node.js + Express

### 1. Estructura

```
cruda-librera/
├── index.html
├── styles.css
├── script.js
├── server/
│   ├── package.json
│   ├── server.js
│   └── .env
```

### 2. `server/package.json`

```json
{
  "name": "cruda-librera-backend",
  "version": "1.0.0",
  "scripts": { "start": "node server.js" },
  "dependencies": {
    "express": "^4.18.2",
    "mercadopago": "^2.0.0",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1"
  }
}
```

### 3. `server/.env`

```
MP_ACCESS_TOKEN=APP_USR-xxxxxxx...
FRONTEND_URL=https://tu-usuario.github.io/cruda-librera
PORT=3000
```

### 4. `server/server.js`

```javascript
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MercadoPagoConfig, Preference } = require("mercadopago");

const app = express();
app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});
const preferenceClient = new Preference(client);

app.post("/api/create-preference", async (req, res) => {
  try {
    const { items } = req.body; // [{ title, quantity, unit_price, currency_id }]
    const preference = await preferenceClient.create({
      body: {
        items,
        back_urls: {
          success: `${process.env.FRONTEND_URL}/?status=success`,
          failure: `${process.env.FRONTEND_URL}/?status=failure`,
          pending: `${process.env.FRONTEND_URL}/?status=pending`,
        },
        auto_return: "approved",
      },
    });
    res.json({ init_point: preference.init_point, id: preference.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error creando preferencia" });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Servidor MP en puerto ${process.env.PORT}`);
});
```

### 5. Ajuste en `script.js` (frontend)

Reemplazá la función `openMPModal` por:

```javascript
async function openMPModal() {
  if (cart.length === 0) return;

  const items = cart.map(it => ({
    title: it.title,
    quantity: 1,
    unit_price: it.price,
    currency_id: "ARS",
  }));

  try {
    const res = await fetch("https://TU-SERVIDOR.com/api/create-preference", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items }),
    });
    const data = await res.json();
    if (data.init_point) {
      window.open(data.init_point, "_blank");
      return;
    }
  } catch (err) {
    console.error(err);
  }
  // fallback a modal estático...
}
```

### 6. Deploy del backend

Opciones gratuitas/baratas:
- **Railway** (fácil, tiene plan gratis)
- **Render** (plan gratis con cold-start)
- **Fly.io** (generoso)
- **Vercel** (serverless, requiere adaptar a funciones)

## Webhooks (opcional pero recomendado)

Para confirmar pagos automáticamente, configurá un webhook en tu panel de MP que apunte a `/api/webhook` en tu servidor. Así sabés cuándo un pago fue aprobado sin que el cliente te avise.

## Recursos

- [Documentación oficial de Mercado Pago](https://www.mercadopago.com.ar/developers/es/docs)
- [SDK de Node](https://github.com/mercadopago/sdk-node)