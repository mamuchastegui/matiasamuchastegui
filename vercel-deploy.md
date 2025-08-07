# Configuración de Despliegue en Vercel

## Variables de Entorno Requeridas

Para que el cache busting funcione correctamente, configurá estas variables en Vercel:

### 1. VITE_APP_VERSION
```bash
VITE_APP_VERSION=$(git rev-parse --short HEAD)
```

### 2. Otras variables de producción
```bash
VITE_N8N_WEBHOOK_URL=tu_webhook_url_de_produccion
```

## Configuración en Vercel Dashboard

1. Andá a tu proyecto en Vercel
2. Settings → Environment Variables
3. Agregá:
   - **Name**: `VITE_APP_VERSION`
   - **Value**: `$(git rev-parse --short HEAD)`
   - **Environments**: Production, Preview

## Verificación

Después del despliegue, verificá que:
1. La meta tag `<meta name="version" content="[hash]" />` tenga el hash correcto
2. El service worker se actualice automáticamente
3. No haya errores 404 de chunks antiguos
4. No aparezcan errores de WebSocket de desarrollo

## Solución de Problemas

Si seguís teniendo problemas de caché:
1. Limpiá la caché del navegador (Ctrl+Shift+R)
2. Verificá que VITE_APP_VERSION esté configurada correctamente
3. Revisá que el service worker se esté actualizando