const quizData = [
    {question: "Quanto tempo passi sul telefono ogni giorno?", answers: ["<1h","1-3h","3-5h",">5h"], score: [1,2,3,4]},
    {question: "Controlli il telefono appena sveglio?", answers: ["Mai","A volte","Spesso","Sempre"], score: [1,2,3,4]},
    {question: "Usi lo smartphone durante i pasti?", answers: ["Mai","A volte","Spesso","Sempre"], score: [1,2,3,4]},
    {question: "Ti senti ansioso senza telefono?", answers: ["Mai","A volte","Spesso","Sempre"], score: [1,2,3,4]},
    {question: "Usi app social più di 2h al giorno?", answers: ["Mai","A volte","Spesso","Sempre"], score: [1,2,3,4]},
    {question: "Ti capita di perdere sonno per usare il telefono?", answers: ["Mai","A volte","Spesso","Sempre"], score: [1,2,3,4]},
    {question: "Hai provato a ridurre l’uso del telefono?", answers: ["No","Sì, ma senza successo","Sì, con successo","Non necessario"], score: [1,2,3,1]},
    {question: "Ti distrai facilmente dal lavoro per controllare il telefono?", answers: ["Mai","A volte","Spesso","Sempre"], score: [1,2,3,4]},
    {question: "Usi il telefono in bagno?", answers: ["Mai","A volte","Spesso","Sempre"], score: [1,2,3,4]},
    {question: "Ti senti nervoso quando il telefono non funziona?", answers: ["Mai","A volte","Spesso","Sempre"], score: [1,2,3,4]},
    {question: "Invii messaggi mentre cammini?", answers: ["Mai","A volte","Spesso","Sempre"], score: [1,2,3,4]},
    {question: "Usi il telefono a tavola con amici/famiglia?", answers: ["Mai","A volte","Spesso","Sempre"], score: [1,2,3,4]},
    {question: "Usi il telefono prima di dormire?", answers: ["Mai","A volte","Spesso","Sempre"], score: [1,2,3,4]},
    {question: "Ti senti dipendente dai social?", answers: ["Mai","A volte","Spesso","Sempre"], score: [1,2,3,4]},
    {question: "Controlli notifiche anche senza suono?", answers: ["Mai","A volte","Spesso","Sempre"], score: [1,2,3,4]},
    {question: "Hai provato a disinstallare app per ridurre l’uso?", answers: ["Mai","A volte","Spesso","Sempre"], score: [1,2,3,4]},
    {question: "Ti annoi senza il telefono?", answers: ["Mai","A volte","Spesso","Sempre"], score: [1,2,3,4]},
    {question: "Usi il telefono mentre guidi?", answers: ["Mai","A volte","Spesso","Sempre"], score: [1,2,3,4]},
    {question: "Ti capita di ignorare persone per guardare il telefono?", answers: ["Mai","A volte","Spesso","Sempre"], score: [1,2,3,4]},
    {question: "Ti senti meglio dopo aver ridotto l’uso del telefono?", answers: ["Mai","A volte","Spesso","Sempre"], score: [1,2,3,4]}
];

let currentQuestion = 0;
let totalScore = 0;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("next-btn");
const resultContainer = document.getElementById("result-container");
const scoreEl = document.getElementById("score");
const resultChart = document.getElementById("resultChart");
const downloadPdfBtn = document.getElementById("download-pdf");

function loadQuestion() {
    questionEl.innerText = quizData[currentQuestion].question;
    answersEl.innerHTML = "";
    quizData[currentQuestion].answers.forEach((ans, idx) => {
        const btn = document.createElement("button");
        btn.innerText = ans;
        btn.onclick = () => {
            totalScore += quizData[currentQuestion].score[idx];
            currentQuestion++;
            if(currentQuestion < quizData.length) {
                loadQuestion();
            } else {
                showResult();
            }
        };
        answersEl.appendChild(btn);
    });
}

function showResult() {
    document.getElementById("quiz-container").style.display = "none";
    resultContainer.style.display = "block";
    scoreEl.innerText = totalScore;

    new Chart(resultChart, {
        type: 'bar',
        data: {
            labels: ["Dipendenza"],
            datasets: [{
                label: 'Punteggio',
                data: [totalScore],
                backgroundColor: ['#007BFF']
            }]
        }
    });
}

downloadPdfBtn.onclick = () => {
    alert("Funzione PDF da implementare (puoi usare jsPDF o simili)");
};

loadQuestion();
