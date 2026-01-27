#!/bin/bash
# Script de auto-configuración para el VPS de Inser Salud

echo "🚀 Iniciando configuración del servidor de Santi..."

# 1. Instalar Node.js y npm si no existen
if ! command -v node &> /dev/null
then
    echo "📦 Instalando Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi

# 2. Instalar dependencias
echo "🛠️ Instalando dependencias..."
npm install

# 3. Instalar PM2 para que el servidor nunca se apague
if ! command -v pm2 &> /dev/null
then
    echo "⚙️ Instalando PM2..."
    sudo npm install -g pm2
fi

# 4. Iniciar el servidor
echo "🟢 Activando a Santi..."
pm2 stop santi-api || true
pm2 start index.js --name "santi-api"

# 5. Configurar para que inicie con el VPS
pm2 startup
pm2 save

echo "✅ ¡TODO LISTO! Santi está corriendo en el puerto 3000."
echo "🔗 Link para la web: http://TU_IP_DEL_VPS:3000/api/chat"
