const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json()); // Para interpretar o corpo das requisições como JSON

// Caminhos para os arquivos SSL
const sslDir = path.join(__dirname, 'ssl');
const certPath = path.join(sslDir, 'cert.pem');
const keyPath = path.join(sslDir, 'key.pem');

// Verifica se os certificados SSL estão presentes
if (!fs.existsSync(certPath) || !fs.existsSync(keyPath)) {
  console.log('Certificados SSL não encontrados! Verifique se os arquivos cert.pem e key.pem estão presentes na pasta "ssl".');
  process.exit(1); // Encerra o servidor se não encontrar os certificados
}

// Servindo o index.html
app.use(express.static(path.join(__dirname, 'public')));

// Rota para gerar vídeo (substitua pelo seu processamento de vídeo)
app.post('/generate-video', (req, res) => {
  console.log('Gerando vídeo com chave:', req.body.key);
  
  // Aqui você pode adicionar a lógica de geração de vídeo

  // Respondendo com uma URL fictícia para o vídeo gerado
  res.json({ url: 'https://example.com/video.mp4' });
});

// Inicia o servidor HTTPS
https.createServer({
  key: fs.readFileSync(keyPath),
  cert: fs.readFileSync(certPath)
}, app).listen(3000, () => {
  console.log('Servidor HTTPS rodando em https://localhost:3000');
});
