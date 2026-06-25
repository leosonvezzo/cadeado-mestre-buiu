// Seleção de elementos do DOM
const displayBtn = document.getElementById('password-display');
const generateBtn = document.getElementById('generate-btn');
const copyBtn = document.getElementById('copy-btn');

const mixCasesEl = document.getElementById('mix-cases'); // Elemento ajustado no desafio
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');

const noRepeatEl = document.getElementById('no-repeat');
const startLetterEl = document.getElementById('start-letter');
const spacesEl = document.getElementById('spaces');

const strengthText = document.getElementById('strength-text');
const strengthBarFill = document.getElementById('strength-bar-fill');

const lengthDisplay = document.getElementById('length-display');
const btnMinus = document.getElementById('btn-minus');
const btnPlus = document.getElementById('btn-plus');

let currentLength = 12;

// Dicionários de caracteres separados
const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numberChars = "0123456789";
const symbolChars = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

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

function diminuirTamanho() {
    if (currentLength > 1) {
        currentLength--;
        verificarLimiteTamanho();
    }
}

function updateStrengthMeter(password, length) {
    let score = 0;

    if (length >= 8) score++;
    if (length >= 14) score++;
    if (mixCasesEl.checked) score += 2; // Misturar letras aumenta bastante o score
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

// LÓGICA ATUALIZADA DO GERADOR
function generatePassword() {
    if (currentLength < 6) return;

    // Constrói a base de letras de acordo com o checkbox
    let lettersOnly = lowercaseChars;
    if (mixCasesEl.checked) {
        // SOLUÇÃO DO DESAFIO: Combina minúsculas e maiúsculas na mesma string base
        lettersOnly += uppercaseChars;
    }

    let allowedChars = lettersOnly;
    if (numbersEl.checked) allowedChars += numberChars;
    if (symbolsEl.checked) allowedChars += symbolChars;
    if (spacesEl.checked) allowedChars += " ";

    let password = "";

    for (let i = 0; i < currentLength; i++) {
        // Regra de segurança: Garantir início por letra se ativado
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
