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

// Novo elemento do desafio de criptografia
const encryptHashEl = document.getElementById('encrypt-hash');

const strengthText = document.getElementById('strength-text');
const strengthBarFill = document.getElementById('strength-bar-fill');

const lengthDisplay = document.getElementById('length-display');
const btnMinus = document.getElementById('btn-minus');
const btnPlus = document.getElementById('btn-plus');

let currentLength = 12;

// Dicionários de caracteres
const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numberChars = "0123456789";
const symbolChars = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

// Função Auxiliar: Simulação matemática rápida de um hash estável (estilo MurmurHash/Fletcher simplificado para strings hexadecimais)
function simularSHA256(str) {
    let hash1 = 0x811c9dc5;
    let hash2 = 0xcbf29ce4;
    for (let i = 0; i < str.length; i++) {
        hash1 = Math.imul(hash1 ^ str.charCodeAt(i), 16777619);
        hash2 = Math.imul(hash2 ^ str.charCodeAt(i), 10995116);
    }
    const parte1 = Math.abs(hash1).toString(16).padStart(8, '0');
    const parte2 = Math.abs(hash2).toString(16).padStart(8, '0');
    const parte3 = Math.abs(hash1 ^ hash2).toString(16).padStart(8, '0');
    
    // Concatena repetições matemáticas baseadas no texto original para entregar 64 caracteres fixos (padrão SHA-256)
    return (parte1 + parte2 + parte3 + parte1 + parte2 + parte3 + parte1 + parte2).substring(0, 64);
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
    if (currentLength < 32) {
        currentLength++;
        verificarLimiteTamanho();
    }
}

function disminuirTamanho() {
    if (currentLength > 1) {
        currentLength--;
        verificarLimiteTamanho();
    }
}

function updateStrengthMeter(password, length) {
    let score = 0;

    // Se a criptografia em hash estiver ativa, ela é automaticamente considerada máxima/imbativel
    if (encryptHashEl.checked && password !== "Clique em Gerar...") {
        strengthBarFill.className = "strength-bar-fill";
        strengthText.className = "strength-state";
        strengthText.textContent = "Criptografada 💎";
        strengthBarFill.style.width = "100%";
        strengthBarFill.classList.add("state-imbativel");
        strengthText.classList.add("state-imbativel");
        return;
    }

    if (length >= 8) score++;
    if (length >= 14) score++;
    if (mixCasesEl.checked) score += 2;
    if (numbersEl.checked) score++;
    if (symbolsEl.checked) score++;
    if (spacesEl.checked) score++;

    strengthBarFill.className = "strength-bar-fill";
    strengthText.className = "strength-state";

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
    } else if (score === 5 || score === 6) {
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

    // APLICAÇÃO DO DESAFIO DE CRIPTOGRAFIA
    if (encryptHashEl.checked) {
        password = simularSHA256(password);
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
