# ⚡ Comandos Rápidos - ALRO SUPREME v4.0

## 🚀 Setup Ultra Rápido (Copia y Pega)

### 1. Instalar todo (Primera vez)

```bash
# Instalar pnpm si no lo tienes
npm install -g pnpm

# Instalar dependencias del proyecto
pnpm install
```

---

### 2. Ejecutar el Proyecto

```bash
# Opción A: Solo desarrollo local
pnpm run dev

# Opción B: Con puerto específico
pnpm run dev --port 3000
```

**Abre:** http://localhost:5173 (o el puerto que hayas usado)

---

### 3. Compartir con ngrok (Para Jueces)

```bash
# Terminal 1: Mantén el servidor corriendo
pnpm run dev

# Terminal 2 (nueva terminal): Inicia ngrok
ngrok http 5173

# Si usaste puerto 3000:
ngrok http 3000
```

**Comparte la URL que aparece:** `https://abc-xyz-123.ngrok-free.app`

---

## 🔧 Solución de Problemas Rápida

### Error: "pnpm not found"

```bash
npm install -g pnpm
```

### Error: "Port already in use"

```bash
# Opción A: Usa otro puerto
pnpm run dev --port 3000

# Opción B: Mata el proceso
# Windows:
netstat -ano | findstr :5173
taskkill /PID [número] /F

# Mac/Linux:
lsof -ti:5173 | xargs kill -9
```

### Error: "Cannot find module"

```bash
# Reinstala todo
rm -rf node_modules
pnpm install
```

### Demo no carga en ngrok

```bash
# Reinicia ambos
Ctrl+C en ambas terminales

# Terminal 1:
pnpm run dev

# Terminal 2:
ngrok http 5173
```

---

## 🎯 Checklist Pre-Demo (30 segundos)

```bash
# 1. ¿Servidor corriendo?
curl http://localhost:5173
# Debe devolver HTML

# 2. ¿ngrok funcionando?
curl [TU_URL_NGROK]
# Debe devolver el mismo HTML

# 3. ¿Batería?
# Verifica que esté al 100%

# 4. ¿Notificaciones desactivadas?
# Activa "No molestar" en tu OS
```

---

## 📱 Testing Rápido

```bash
# Desktop (local)
http://localhost:5173

# Mobile (misma red WiFi)
http://[TU_IP]:5173

# Público (ngrok)
https://[TU_URL].ngrok-free.app
```

---

## 🔄 Reset Completo (Si algo explota)

```bash
# Para TODO
Ctrl+C (en ambas terminales)

# Limpia caché
rm -rf node_modules
rm -rf .vite

# Reinstala
pnpm install

# Reinicia
pnpm run dev
ngrok http 5173
```

---

## 📊 Comandos de Build (Post-Hackathon)

```bash
# Build de producción
pnpm run build

# Preview del build
pnpm run preview

# Ver tamaño del bundle
du -sh dist/
```

---

## 🎬 Durante la Presentación

### Antes de empezar:

```bash
# Verifica que ambos estén corriendo:
# Terminal 1: pnpm run dev
# Terminal 2: ngrok http 5173
```

### Si algo falla en vivo:

```bash
# Hard reload del navegador
Ctrl+Shift+R (Windows/Linux)
Cmd+Shift+R (Mac)

# O F5 varias veces
```

---

## 🔐 Comandos de Seguridad (No compartas)

```bash
# NO HAGAS ESTO en el hackathon:
git push origin main
# (Podrías exponer secrets)

# SÍ PUEDES:
# Guardar backup local
cp -r . ../backup-alro-supreme
```

---

## ⚡ Scripts Personalizados (Agrega al package.json)

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "demo": "vite --port 3000",
    "clean": "rm -rf node_modules .vite dist",
    "fresh": "pnpm run clean && pnpm install && pnpm run dev"
  }
}
```

Luego usa:

```bash
pnpm run demo    # Puerto 3000
pnpm run fresh   # Reinstala todo y corre
```

---

## 📞 Comandos de Emergencia

### El proyecto no arranca:

```bash
# Orden de intentos:
1. Ctrl+C y pnpm run dev
2. pnpm install && pnpm run dev
3. rm -rf node_modules && pnpm install && pnpm run dev
4. Reinicia tu laptop
5. Usa el backup
```

### ngrok muestra error:

```bash
# Re-autentica
ngrok config add-authtoken [TU_TOKEN]

# Reinicia ngrok
Ctrl+C
ngrok http 5173
```

### Laptop se congela:

```bash
# Opción nuclear (solo si es crítico):
# Fuerza cerrar Node.js desde Task Manager/Activity Monitor
# Luego: pnpm run dev
```

---

## 🎓 Aprende los Comandos (5 minutos)

```bash
# Practica esto hasta que lo hagas sin pensar:

# 1. Abrir proyecto
cd /ruta/al/proyecto

# 2. Instalar (solo primera vez)
pnpm install

# 3. Correr
pnpm run dev

# 4. Nueva terminal (Ctrl+Shift+` en VS Code)
ngrok http 5173

# 5. Copiar URL de ngrok
# (Ctrl+C en la terminal de ngrok te la da)

# 6. Pegar en navegador
# Verifica que funciona

# 7. Compartir con jueces
# "Aquí está la demo: [URL]"
```

**Tiempo total:** < 2 minutos

---

## 🏆 Comandos Post-Victoria

```bash
# Screenshot del proyecto
# (Usa tu herramienta de capturas)

# Guardar métricas de ngrok
# (Captura la salida de ngrok)

# Commit (después del hackathon)
git add .
git commit -m "🏆 ALRO SUPREME v4.0 - Hackathon Winner"
git push origin main

# Celebra 🎉
echo "¡Ganamos el Hackathon Salesforce 2026!"
```

---

## 📝 Notas Rápidas

### URLs importantes:

```
Local:    http://localhost:5173
ngrok:    https://[TU_URL].ngrok-free.app
Docs:     README.md
Setup:    SETUP_HACKATHON.md
Script:   PRESENTACION_HACKATHON.md
Resumen:  RESUMEN_EJECUTIVO.md
```

### Atajos de teclado útiles:

```
Ctrl+C          - Para servidor
Ctrl+Shift+`    - Nueva terminal (VS Code)
Ctrl+Shift+R    - Hard reload navegador
F11             - Pantalla completa
Esc             - Salir pantalla completa
```

---

## ✅ Checklist Final Simplificado

```bash
# Copia esto a un post-it:

[ ] pnpm install ✓
[ ] pnpm run dev ✓
[ ] http://localhost:5173 funciona ✓
[ ] ngrok http 5173 ✓
[ ] https://[URL].ngrok-free.app funciona ✓
[ ] Batería 100% ✓
[ ] Agua cerca ✓
[ ] Respirar ✓
[ ] ¡Ganar! 🏆
```

---

**Tiempo total de setup:** < 5 minutos  
**Comandos a memorizar:** 3 (install, dev, ngrok)  
**Probabilidad de ganar:** Alta con ALRO SUPREME 💪

---

**¡Éxito en el hackathon!**

_Inmunidad al vibe coding. Equivalencia funcional garantizada._
