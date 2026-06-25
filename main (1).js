// Seleção de elementos do DOM
const ageDisplay = document.getElementById('age-display');
const btnMinus = document.getElementById('btn-minus');
const btnPlus = document.getElementById('btn-plus');

const classificationtext = document.getElementById('classification-text');
const strengthBarFill = document.getElementById('strength-bar-fill');

// Começamos com a idade padrão igual a 12 anos
let currentAge = 12;

// Função que aplica a regra condicional do desafio e atualiza a barra colorida
function atualizarClassificacao() {
    // Atualiza o número da idade na tela
    ageDisplay.textContent = currentAge;

    // Reseta as classes de cores anteriores da barra e do texto
    strengthBarFill.className = "strength-bar-fill";
    classificationtext.className = "strength-state";

    // Condicional para verificar a faixa etária
    if (currentAge < 12) {
        // Criança: menor que 12 anos
        classificationtext.textContent = "Criança 🎈";
        strengthBarFill.style.width = "33%";
        strengthBarFill.classList.add("color-crianca");
        classificationtext.classList.add("color-crianca");

    } else if (currentAge >= 12 && currentAge < 18) {
        // Adolescente: maior ou igual a 12 e menor que 18
        classificationtext.textContent = "Adolescente ⚡";
        strengthBarFill.style.width = "66%";
        strengthBarFill.classList.add("color-adolescente");
        classificationtext.classList.add("color-adolescente");

    } else {
        // Adulta: maior ou igual a 18 anos
        classificationtext.textContent = "Adulta 💼";
        strengthBarFill.style.width = "100%";
        strengthBarFill.classList.add("color-adulta");
        classificationtext.classList.add("color-adulta");
    }
}

// Função para incrementar a idade (+)
function aumentarIdade() {
    if (currentAge < 100) { // Limite máximo para não crescer infinitamente
        currentAge++;
        atualizarClassificacao();
    }
}

// Função para decrementar a idade (-)
function diminuirIdade() {
    if (currentAge > 0) { // Impede idades negativas
        currentAge--;
        atualizarClassificacao();
    }
}

// Escutadores de eventos de clique nos botões
btnPlus.addEventListener('click', aumentarIdade);
btnMinus.addEventListener('click', diminuirIdade);

// Inicializa a tela com as regras aplicadas na primeira carga
atualizarClassificacao();
