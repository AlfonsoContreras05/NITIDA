# Nítida — Demo de tienda de productos de limpieza

Web estática inspirada en la arquitectura aprobada para KPILAR, pero con identidad propia.

## Incluye
- Landing comercial (`index.html`)
- Catálogo separado (`catalogo.html`)
- Categorías, buscador y ordenamiento
- Productos destacados y promociones
- Carrito persistente con `localStorage`
- Pedido automático por WhatsApp
- Diseño responsive

## Configuración rápida
En `app.js`, cambia:
```js
const STORE = {
  name: 'Nítida',
  whatsapp: '56900000000',
  currency: 'CLP'
};
```

También puedes editar el arreglo `products` para reemplazar productos, precios, categorías e imágenes.

## Ejecutar
Abre `index.html` directamente o usa Live Server en VS Code.

## Publicar en Netlify
Arrastra la carpeta completa a Netlify Drop, o súbela a GitHub y conecta el repositorio. No requiere comando de build.
