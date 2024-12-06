// script.js

// Variável para armazenar a chave da API
let apiKey = "";

// Formulário para configurar a chave da API
document.getElementById('api-key-form').addEventListener('submit', (e) => {
  e.preventDefault();

  // Obtém a chave da API inserida pelo usuário
  apiKey = document.getElementById('api-key').value;

  // Exibe uma mensagem de sucesso
  alert("API Key set successfully!");
});

// Formulário para gerar o vídeo
document.getElementById('video-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  // Verifica se a chave da API foi definida
  if (!apiKey) {
    alert("Please set the API Key first!");
    return;
  }

  // Captura os dados do formulário
  const prompt = document.getElementById('prompt').value;
  const style = document.getElementById('style').value;

  // Mostra uma mensagem de carregamento
  const resultDiv = document.getElementById('result');
  resultDiv.style.display = 'block';
  resultDiv.innerHTML = '<p>Generating video... Please wait.</p>';

  try {
    // Faz a chamada à API
    const response = await fetch(`https://intl.minimaxi.com/document/video_generation?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: prompt,
        style: style,
      }),
    });

    // Verifica se a resposta foi bem-sucedida
    if (!response.ok) {
      throw new Error('Failed to generate video. Please try again.');
    }

    const data = await response.json();
    const videoUrl = data.video_url; // Substitua conforme a resposta real da API

    // Atualiza o player de vídeo com o link gerado
    const videoElement = document.getElementById('video-output');
    videoElement.src = videoUrl;
    videoElement.style.display = 'block';
  } catch (error) {
    // Exibe mensagens de erro
    resultDiv.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
  }
});
