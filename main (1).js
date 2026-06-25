// Seleção de elementos do DOM
const displayBtn = document.getElementById('password-display');
const generateBtn = document.getElementById('generate-btn');
const copyBtn = document.getElementById('copy-btn');

const mixCasesEl = document.getElementById('mix-cases');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');

const noRepeatEl = document.getElementById('no-repeat');
const startLetterEl = document.getElementById('start-letter');
const spacesEl = document.getElementById('spaces');

// Novo elemento de entropia avançada
const shufflePassEl = document.getElementById('shuffle-pass');

const strengthText = document.getElementById('strength-text');
const strengthBarFill = document.getElementById('strength-bar-fill');

const lengthDisplay = document.getElementById('length-display');
const btnMinus = document.getElementById('btn-minus');
const btnPlus = document.getElementById('btn-plus');

// Começamos com tamanho base de 16 caracteres para segurança aprimorada
let currentLength = 16; 

// Dicionários de caracteres
const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numberChars = "0123456789";
const symbolChars = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

// Função do algoritmo Fisher-Yates para misturar estruturas e quebrar previsibilidade linear
function shuffleString(str) {
    let arr = str.split('');
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]]; // Inversão de posições em array
    }
    return arr.join('');
}

function verificarLimiteTamanho() {
    lengthDisplay.textContent = currentLength;
    if (currentLength < 6) {
        generateBtn.disabled = true;
    } else {
        generateBtn.disabled = false;
    }
}

function aumentarTamanho() {
    // DESAFIO: Ampliado limite máximo para 64 caracteres aumentando drasticamente a entropia
    if (currentLength < 64) {
        currentLength++;
        verificarLimiteTamanho();
    }
}

function diminuirTamanho() {
    if (currentLength > 1) {
        currentLength--;
        verificarLimiteTamanho();
    }
}

function updateStrengthMeter(password, length) {
    let score = 0;

    // Regras de cálculo baseadas em comprimento bruto (fator principal contra supercomputadores)
    if (length >= 8) score++;
    if (length >= 14) score += 2;
    if (length >= 24) score += 2; // Bônus para senhas hiperlongas
    if (mixCasesEl.checked) score++;
    if (numbersEl.checked) score++;
    if (symbolsEl.checked) score++;
    if (shufflePassEl.checked) score++; // Bônus de entropia pelo algoritmo matemático ativo

    strengthBarFill.className = "strength-bar-fill";
    strengthText.className = "strength-state";

    if (password === "" || password === "Clique em Gerar...") {
        strengthText.textContent = "Inexistente";
        strengthBarFill.style.width = "0%";
    } else if (score <= 3) {
        strengthText.textContent = "Baixa Entropia ⚠️";
        strengthBarFill.style.width = "25%";
        strengthBarFill.classList.add("state-fraca");
        strengthText.classList.add("state-fraca");
    } else if (score === 4 || score === 5) {
        strengthText.textContent = "Média Entropia 🛡️";
        strengthBarFill.style.width = "50%";
        strengthBarFill.classList.add("state-media");
        strengthText.classList.add("state-media");
    } else if (score === 6 || score === 7) {
        strengthText.textContent = "Alta Entropia 🔥";
        strengthBarFill.style.width = "85%";
        strengthBarFill.classList.add("state-forte");
        strengthText.classList.add("state-forte");
    } else {
        strengthText.textContent = "Militar / Inquebrável 🌌";
        strengthBarFill.style.width = "100%";
        strengthBarFill.classList.add("state-imbativel");
        strengthText.classList.add("state-imbativel");
    }
}

function generatePassword() {
    if (currentLength < 6) return;

    let lettersOnly = lowercaseChars;
    if (mixCasesEl.checked) lettersOnly += uppercaseChars;

    let allowedChars = lettersOnly;
    if (numbersEl.checked) allowedChars += numberChars;
    if (symbolsEl.checked) allowedChars += symbolChars;
    if (spacesEl.checked) allowedChars += " ";

    let password = "";

    for (let i = 0; i < currentLength; i++) {
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

    // APLICAÇÃO DO ALGORITMO DE EMBARALHAMENTO DO DESAFIO
    if (shufflePassEl.checked) {
        password = shuffleString(password);
    }

    displayBtn.textContent = password;
    copyBtn.textContent = "Copiar";
    
    updateStrengthMeter(password, currentLength);
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
btnPlus.addEventListener('click', aumentarTamanho);
btnMinus.addEventListener('click', diminuirTamanho);

verificarLimiteTamanho();
