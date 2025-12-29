# 1. Usamos a imagem oficial do Node (versão completa para ter dependências do sistema)
FROM node:18-bullseye

# 2. Instalar FFmpeg e dependências necessárias para o Chromium (Puppeteer)
# O Remotion precisa do Chrome e FFmpeg para renderizar o vídeo
RUN apt-get update && apt-get install -y \
    ffmpeg \
    chromium \
    libnss3 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libdrm2 \
    libxkbcommon0 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    libgbm1 \
    libasound2 \
    && rm -rf /var/lib/apt/lists/*

# 3. Definir variáveis de ambiente para o Puppeteer encontrar o Chromium instalado
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

# 4. Definir diretório de trabalho
WORKDIR /app

# 5. Copiar arquivos de dependências
COPY package*.json ./

# 6. Instalar dependências do Node (incluindo tsx)
RUN npm install

# 7. Copiar o restante da aplicação
COPY . .

# 8. Criar pastas necessárias e ajustar permissões (Importante para o Remotion escrever o vídeo)
RUN mkdir -p out && chmod 777 out
RUN mkdir -p public/assets && chmod 777 public/assets

# 9. Expor a porta
EXPOSE 3000

# 10. Iniciar a API com tsx (conforme configurado no package.json)
CMD ["npm", "run", "start:api"]
