// Seleção de elementos do DOM
const displayBtn = document.getElementById('password-display');
const generateBtn = document.getElementById('generate-btn');
const copyBtn = document.getElementById('copy-btn');

const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');

const noRepeatEl = document.getElementById('no-repeat');
const startLetterEl = document.getElementById('start-letter');
const spacesEl = document.getElementById('spaces');

// Elementos novos da Barra de Força
const strengthText = document.getElementById('strength-text');
const strengthBarFill = document.getElementById('strength-bar-fill');

// Dicionários de caracteres
const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numberChars = "0123456789";
const symbolChars = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

// Função para calcular e estilizar a força da senha baseada em regras reais
function updateStrengthMeter(password, length) {
    let score = 0;

    // Critério 1: Comprimento da senha
    if (length >= 8) score++;
    if (length >= 14) score++;

    // Critério 2: Variabilidade de tipos de caracteres incluídos
    if (uppercaseEl.checked) score++;
    if (numbersEl.checked) score++;
    if (symbolsEl.checked) score++;
    if (spacesEl.checked) score++;

    // Remove classes anteriores
    strengthBarFill.className = "strength-bar-fill";
    strengthText.className = "strength-state";

    // Classificação e aplicação das novas cores customizadas
    if (password === "" || password === "Clique em Gerar...") {
        strengthText.textContent = "Inexistente";
        strengthBarFill.style.width = "0%";
    } else if (score <= 2) {
        strengthText.textContent = "Fraca ⚠️";
        strengthBarFill.style.width = "25%";
        strengthBarFill.classList.add("state-fraca");
        strengthText.classList.add("state-fraca");
    } else if (score === 3 || score === 4) {
        strengthText.textContent = "Razoável 🛡️";
        strengthBarFill.style.width = "50%";
        strengthBarFill.classList.add("state-media");
        strengthText.classList.add("state-media");
    } else if (score === 5) {
        strengthText.textContent = "Muito Forte 💪";
        strengthBarFill.style.width = "85%";
        strengthBarFill.classList.add("state-forte");
        strengthText.classList.add("state-forte");
    } else {
        strengthText.textContent = "Imbatível 💎";
        strengthBarFill.style.width = "100%";
        strengthBarFill.classList.add("state-imbativel");
        strengthText.classList.add("state-imbativel");
    }
}

// Função para gerar a senha aleatória
function generatePassword() {
    let length = parseInt(lengthEl.value);
    
    if (length < 4) length = 4;
    if (length > 32) length = 32;
    lengthEl.value = length;

    let lettersOnly = lowercaseChars;
    if (uppercaseEl.checked) lettersOnly += uppercaseChars;

    let allowedChars = lettersOnly;
    if (numbersEl.checked) allowedChars += numberChars;
    if (symbolsEl.checked) allowedChars += symbolChars;
    if (spacesEl.checked) allowedChars += " ";

    let password = "";

    for (let i = 0; i < length; i++) {
        if (i === 0 && startLetterEl.checked) {
            const randomIndex = Math.floor(Math.random() * lettersOnly.length);
            password += lettersOnly[randomIndex];
            continue;
        }

        let nextChar = "";
        let attempts = 0;

        do {
            const randomIndex = Math.floor(Math.random() * allowedChars.length);
            nextChar = allowedChars[randomIndex];
            attempts++;
        } while (noRepeatEl.checked && nextChar === password.slice(-1) && attempts < 20);

        password += nextChar;
    }

    displayBtn.textContent = password;
    copyBtn.textContent = "Copiar";
    
    // Dispara a atualização visual da barra de força
    updateStrengthMeter(password, length);
}

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

generateBtn.addEventListener('click', generatePassword);
copyBtn.addEventListener('click', copyToClipboard);
