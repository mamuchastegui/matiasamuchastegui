# Mi Portfolio

Un portfolio moderno creado con React, TypeScript y Vite, con efectos acrílicos y animaciones avanzadas.

## Formulario de contacto

El formulario de contacto utiliza [EmailJS](https://www.emailjs.com/) para enviar mensajes sin necesidad de un backend.

✅ **Ya está configurado y funcional** con las siguientes características:

- Envío de correos electrónicos sin backend
- Cambio automático de plantilla según el idioma (español/inglés)
- Efecto acrílico y validación de campos
- Animaciones y mensajes de feedback

Para más detalles sobre la configuración, consulta la documentación en `src/docs/EmailJSSetup.md`.

## Desarrollo

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

## Compilación

```bash
# Construir para producción
npm run build
```

## PWA y Cache Management

Este proyecto incluye configuración avanzada de PWA con `vite-plugin-pwa` para:

- **Service Worker automático**: Se genera automáticamente en cada build
- **Cache busting**: Utiliza `VITE_APP_VERSION` para invalidar caché antigua
- **Actualización automática**: El SW se actualiza automáticamente sin intervención del usuario

### Variables de Entorno

Para producción, configurá estas variables:

```bash
# Cache busting (se configura automáticamente en CI/CD)
VITE_APP_VERSION=$(git rev-parse --short HEAD)

# Webhook de n8n para producción
VITE_N8N_WEBHOOK_URL=tu_webhook_url
```

### Despliegue en Vercel

Consultá `vercel-deploy.md` para instrucciones detalladas de configuración en Vercel.

## Solución de Problemas de Caché

Si experimentás errores 404 o problemas de caché:

1. **Limpiá la caché del navegador**: Ctrl+Shift+R
2. **Verificá la versión**: Revisá que la meta tag `version` tenga el hash correcto
3. **Service Worker**: El SW se actualiza automáticamente con cada despliegue
4. **Variables de entorno**: Asegurate de que `VITE_APP_VERSION` esté configurada
