// Seleção de elementos do DOM
const displayBtn = document.getElementById('password-display');
const generateBtn = document.getElementById('generate-btn');
const copyBtn = document.getElementById('copy-btn');

const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');

// Dicionários de caracteres
const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numberChars = "0123456789";
const symbolChars = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

// Função para gerar a senha aleatória
function generatePassword() {
    let length = parseInt(lengthEl.value);
    
    // Validação de segurança para o tamanho
    if (length < 4) length = 4;
    if (length > 32) length = 32;
    lengthEl.value = length;

    let allowedChars = lowercaseChars; // Minúsculas sempre inclusas
    
    if (uppercaseEl.checked) allowedChars += uppercaseChars;
    if (numbersEl.checked) allowedChars += numberChars;
    if (symbolsEl.checked) allowedChars += symbolChars;

    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * allowedChars.length);
        password += allowedChars[randomIndex];
    }

    displayBtn.textContent = password;
    copyBtn.textContent = "Copiar"; // Reseta o texto do botão de cópia
}

// Função para copiar a senha para a área de transferência
function copyToClipboard() {
    const password = displayBtn.textContent;
    if (password === "Clique em Gerar..." || password === "") return;

    navigator.clipboard.writeText(password).then(() => {
        copyBtn.textContent = "Copiado!";
        setTimeout(() => {
            copyBtn.textContent = "Copiar";
        }, 2000);
    });
}

// Eventos que disparam as funções ao clicar nos botões
generateBtn.addEventListener('click', generatePassword);
copyBtn.addEventListener('click', copyToClipboard);