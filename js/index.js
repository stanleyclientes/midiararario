const quizData = [
    {
        question: "Já fez parte da mídia em algum outro ministério?",
        a: {
            text: "Sim.",
            emoji: "😎",
        },
        b: {
            text: "Não",
            emoji: "😐"
        },
        correto: "a"
    },
    {
        question: "Possui experiência ou curso em áreas ligadas a som, vídeo, imagem ou cinegrafia? Se sim, qual seu grau de conhecimento?",
        a: {
            text: "Não possuo experiência ou curso",
            emoji: "😟" // Preocupado
        },
        b: {
            text: "Básico",
            emoji: "😐" // Confuso
        },
        c: {
            text: "Médio",
            emoji: "😄" // Sorridente
        },
        d: {
            text: "Avançado",
            emoji: "😜" // Brincalhão
        },
        correto: "b"
    },
    {
        question: "Possui curso ou afinidade em quais áreas da mídia?",
        a: {
            text: "Som",
            emoji: "🔊" // Triste
        },
        b: {
            text: "Projetor",
            emoji: "📽" // Neutro
        },
        c: {
            text: "Fotografia",
            emoji: "📷" // Satisfeito
        },
        d: {
            text: "Stories e Reels",
            emoji: "📱" // Descolado
        },
        e: {
            text: "Manutenção",
            emoji: "🛠" // Descolado
        },
        correto: "b"
    },
    {
        question: "Qual sua disponibilidade?",
        a: {
            text: "Todos os dias",
            emoji: "😎"
        },
        b: {
            text: "Somente as quartas",
            emoji: "😊"
        },
        c: {
            text: "Quartas-feiras (quinzenal)",
            emoji: "😄" // Satisfeito
        },
        d: {
            text: "Somente aos domingos",
            emoji: "👍" // Descolado
        },
        e: {
            text: "Domingos (quinzenal)",
            emoji: "🔥" // Descolado
        },
        correto: "b"
    },
    {
        question: "Em relação ao Projeto Avançai:",
        a: {
            text: "Concluído",
            emoji: "🚀"
        },
        b: {
            text: "Em andamento",
            emoji: "😐"
        },
        c: {
            text: "Ainda não iniciei",
            emoji: "😞" // Satisfeito
        },
        correto: "b"
    }, 
];

const startScreen = document.getElementById('start-screen');
const startBtn = document.getElementById('start-btn');
const quiz = document.getElementById('quiz');
const questionEl = document.getElementById('question');
const answerEls = document.querySelectorAll('.answer');

let currentQuiz = 0;
let score = 0;

// Variáveis para armazenar as respostas com o texto
let respostasSelecionadas = [];

// Função que salva a resposta selecionada (salva o valor de 'text')
function saveAnswer(selectedAnswerText, inputValue = '') {
    // Se houver um valor de input, adicionamos ao objeto de resposta
    const selectedAnswer = { text: selectedAnswerText, input: inputValue };
    respostasSelecionadas.push(selectedAnswer);
    
    // Exibe no console para acompanhar as respostas salvas
    console.log(respostasSelecionadas);
}

// Evento para iniciar o quiz
startBtn.addEventListener('click', () => {

    startScreen.style.display = 'none';
    quiz.style.display = 'block';
    loadQuiz();
});

function loadQuiz() {
    deselectAnswers();

    const currentQuizData = quizData[currentQuiz];

    questionEl.innerText = currentQuizData.question;

    // Cria um array para armazenar as respostas
    const answers = [];
    if (currentQuizData.a) answers.push(currentQuizData.a);
    if (currentQuizData.b) answers.push(currentQuizData.b);
    if (currentQuizData.c) answers.push(currentQuizData.c);
    if (currentQuizData.d) answers.push(currentQuizData.d);
    if (currentQuizData.e) answers.push(currentQuizData.e);

    // Limpa as respostas anteriores
    answerEls.forEach((answerEl, index) => {
        // Verifica se a resposta existe e atualiza o HTML
        if (answers[index]) {
            // Se a resposta for a com input, criamos o campo de texto
            if (answers[index].input !== undefined) {
                answerEl.innerHTML = `${answers[index].text} <span class="emoji">${answers[index].emoji}</span><input type="text" class="response-input" placeholder="Escreva sua resposta aqui..."  />`;
            } else {
                answerEl.innerHTML = `${answers[index].text} <span class="emoji">${answers[index].emoji}</span>`;
            }
            answerEl.style.display = 'block'; // Exibe a resposta
            answerEl.setAttribute('data-answer', Object.keys(currentQuizData)[index]); // Atualiza o atributo data-answer com o valor correto
        } else {
            answerEl.innerHTML = ''; // Limpa o conteúdo se não houver resposta
            answerEl.style.display = 'none'; // Esconde o card
        }
    });

    // Atualiza a barra de progresso
    const progressBar = document.getElementById('progress-bar');
    const progressPercentage = ((currentQuiz + 1) / quizData.length) * 100;
    progressBar.style.width = `${progressPercentage}%`;
}

function deselectAnswers() {
    answerEls.forEach(answerEl => answerEl.classList.remove('selected'));
}

answerEls.forEach(answerEl => {
    answerEl.addEventListener('click', () => {
        // Verifica se a resposta clicada possui um input
        const inputField = answerEl.querySelector('.response-input');
        let inputValue = '';
        if (inputField) {
            inputValue = inputField.value.trim(); // Pega o valor digitado no input
            if (inputValue === '') {
                alert('Por favor, preencha o campo antes de continuar!'); // Avise o usuário se o campo estiver vazio
                return; // Não avança para a próxima pergunta
            }
        }

        // Obtém a resposta clicada, que é o valor do 'text' da resposta
        const selectedAnswerText = answerEl.innerText.trim();

        // Salva a resposta com o texto e o valor do input (se houver)
        saveAnswer(selectedAnswerText, inputValue);

        // Verifica se a resposta selecionada está correta
        const selectedAnswer = answerEl.getAttribute('data-answer');
        if (selectedAnswer === quizData[currentQuiz].correto) {
            score++;
        }

        // Avança para a próxima pergunta
        currentQuiz++;

        // Carrega a próxima questão ou mostra o resultado final
        if (currentQuiz < quizData.length) {
            loadQuiz();
        } else {
            quiz.innerHTML = `
                <div>
                    <input type="text" placeholder="Nome">
                    <input type="text" placeholder="Whatsapp DDD + 00000-0000">
                    <input type="text" placeholder="Idade"> <br><br>
                    <p>Você foi indicado?</p>
                    <input type="radio" name="" id=""> Não <br>
                    <input type="radio" name="" id=""> Sim <br>
                    <input type="text" placeholder="Quem indicou?"> <br><br>
                    <button>Finalizar</button>
                </div>
            `;
        }
    });
});
