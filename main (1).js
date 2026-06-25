// Seleção de elementos do DOM
const displayBtn = document.getElementById('password-display');
const generateBtn = document.getElementById('generate-btn');
const copyBtn = document.getElementById('copy-btn');

const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');

// Elementos dos novos filtros
const noRepeatEl = document.getElementById('no-repeat');
const startLetterEl = document.getElementById('start-letter');
const spacesEl = document.getElementById('spaces');

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

    // Configura o banco de caracteres com base nas seleções
    let lettersOnly = lowercaseChars;
    if (uppercaseEl.checked) lettersOnly += uppercaseChars;

    let allowedChars = lettersOnly;
    if (numbersEl.checked) allowedChars += numberChars;
    if (symbolsEl.checked) allowedChars += symbolChars;
    if (spacesEl.checked) allowedChars += " ";

    let password = "";

    for (let i = 0; i < length; i++) {
        // Regra: Começar obrigatoriamente com letra
        if (i === 0 && startLetterEl.checked) {
            const randomIndex = Math.floor(Math.random() * lettersOnly.length);
            password += lettersOnly[randomIndex];
            continue;
        }

        let nextChar = "";
        let attempts = 0;

        // Regra: Evitar repetição consecutiva (ex: "aa")
        do {
            const randomIndex = Math.floor(Math.random() * allowedChars.length);
            nextChar = allowedChars[randomIndex];
            attempts++;
        } while (noRepeatEl.checked && nextChar === password.slice(-1) && attempts < 20);

        password += nextChar;
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

// Eventos
generateBtn.addEventListener('click', generatePassword);
copyBtn.addEventListener('click', copyToClipboard);

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
