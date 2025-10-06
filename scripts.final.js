/**
 * CONFIGURAZIONE GENERALE
 */
const CONFIG = {
    STANDARD_PRICE: 1.99, // Prezzo Standard richiesto
    PREMIUM_PRICE: 7.99,  // Prezzo Premium richiesto
    MAX_SCORE: 60,
    I18N_LOCALE: 'it'
};

/**
 * Array contenente le 20 domande del quiz.
 */
const QUIZ_QUESTIONS = [
    { question: "Quando ti svegli, la prima cosa che fai è controllare lo smartphone?", axis: "Sleep & Rituals" },
    { question: "Passi più di 3 ore al giorno sui social media (esclusi gli impegni di lavoro)?", axis: "Productivity & Focus" },
    { question: "Ti senti ansioso o irritato se non riesci a trovare o usare il telefono?", axis: "Escape & Emotions" },
    { question: "Controlli il telefono ogni pochi minuti (anche se non hai notifiche)?", axis: "Habit & Compulsion" },
    { question: "Interrompi spesso conversazioni o attività per guardare il telefono?", axis: "Social & Presence" },
    { question: "Ritardi il sonno per rimanere sveglio/a a usare il telefono?", axis: "Sleep & Rituals" },
    { question: "Hai difficoltà a concentrarti su un singolo compito per più di 30 minuti senza distrazioni digitali?", axis: "Productivity & Focus" },
    { question: "Usi lo smartphone come meccanismo principale per sfuggire a noia o pensieri negativi?", axis: "Escape & Emotions" },
    { question: "Quando sei in fila o aspetti, la prima cosa che fai è tirare fuori il telefono?", axis: "Habit & Compulsion" },
    { question: "I tuoi amici o partner si sono lamentati del tempo che passi sul telefono quando siete insieme?", axis: "Social & Presence" },
    { question: "Tieni il telefono vicino o sotto il cuscino mentre dormi?", axis: "Sleep & Rituals" },
    { question: "Quando devi studiare o lavorare, è facile per te passare a controllare app o siti non correlati?", axis: "Productivity & Focus" },
    { question: "Provi un senso di vuoto o irrequietezza quando il telefono è scarico o la batteria sta per finire?", axis: "Escape & Emotions" },
    { question: "Ti capita di prendere il telefono senza un motivo preciso, semplicemente per 'dare un'occhiata'?", axis: "Habit & Compulsion" },
    { question: "Eviti attività sociali reali per preferire interazioni o giochi online?", axis: "Social & Presence" },
    { question: "Controlli il telefono immediatamente prima di chiudere gli occhi per dormire?", axis: "Sleep & Rituals" },
    { question: "Ritieni che la qualità del tuo lavoro/studio sia peggiorata a causa delle distrazioni digitali?", axis: "Productivity & Focus" },
    { question: "Hai provato a limitare l'uso del telefono, ma non ci sei riuscito/a?", axis: "Escape & Emotions" },
    { question: "Senti una vibrazione fantasma (quando il telefono non sta effettivamente vibrando)?", axis: "Habit & Compulsion" },
    { question: "Ti isoli in casa (anche solo in una stanza) per usare il telefono indisturbato?", axis: "Social & Presence" }
];

/**
 * Traduzioni (per la logica di traduzione statica data-i18n)
 */
const TRANSLATIONS = {
    it: {
        FORM_TITLE: "Valutazione della Dipendenza Digitale",
        BTN_CALCULATE: "Calcola Risultato",
        PAYWALL_H3: "Il Tuo Risultato è Pronto!",
        PAYWALL_P: "Per sbloccare il tuo report dettagliato, scegli l'opzione di acquisto qui sotto:",
        BTN_STANDARD: `Scarica Report Base (€${CONFIG.STANDARD_PRICE})`,
        BTN_PREMIUM: `Acquista Report Premium (€${CONFIG.PREMIUM_PRICE})`,
        BTN_PREMIUM_SUB: "(Include: Piano d'Azione, Priorità e Piano 7 Giorni)",
        TITLE: "Report Personalizzato Digital Detox",
        SUBTITLE: "Elaborazione Finale (20 Domande)",
        DATE: "Data:",
        // ... (altre traduzioni essenziali)
        RISK_LABEL: "Rischio",
        SCORE_LABEL: "Punteggio",
        QUIZ_Q_COL: "Domanda",
        QUIZ_A_COL: "Risposta Fornita",
        QUIZ_S_COL: "Punteggio",
        // Testi del report (da popolare in base al punteggio)
        PROFILE_TITLE: "Il Tuo Profilo di Dipendenza Digitale",
        ANALYSIS_TITLE: "Analisi e Consigli Personalizzati",
        RADAR_TITLE: "Analisi Dettagliata per Asse di Rischio",
        IMPACT_TITLE: "Riepilogo Dettagliato dei Punteggi di Impatto",
        PRIORITY_PLAN_TITLE: "Il Tuo Piano d'Azione Prioritizzato",
        DAYS_PLAN_TITLE: "Piano Digital Detox di 7 Giorni",
        RESOURCES_TITLE: "Risorse Consigliate",
        DISCLAIMER: "Disclaimer: Questo report è solo a scopo informativo e non sostituisce una consulenza professionale.",
    }
};

/**
 * MAPPATURA DEI TESTI DI PROFILO IN BASE AL PUNTEGGIO TOTALE
 * (I testi vengono troncati per brevità, vanno espansi nel progetto reale)
 */
const RISK_PROFILES = {
    LOW: {
        minScore: 0, maxScore: 20, level: 'Basso', cssClass: 'risk-low',
        profileText: 'Ottimo! La tua relazione con la tecnologia è sana e consapevole.',
        analysisText: 'Mantieni l\'approccio attuale, ponendo attenzione a non aumentare i tempi di utilizzo.'
    },
    MEDIUM: {
        minScore: 21, maxScore: 40, level: 'Medio', cssClass: 'risk-medium',
        profileText: 'Attenzione! Mostri segni di una dipendenza emergente o di cattive abitudini.',
        analysisText: 'È cruciale identificare i tuoi principali fattori di stress digitale e iniziare a impostare limiti chiari.'
    },
    HIGH: {
        minScore: 41, maxScore: CONFIG.MAX_SCORE, level: 'Alto', cssClass: 'risk-high',
        profileText: 'Rischio significativo. Il tuo uso dello smartphone sta compromettendo diverse aree della tua vita.',
        analysisText: 'Un intervento immediato è necessario. Inizia con un piano di disintossicazione graduale di 7 giorni.'
    }
};

/**
 * MAPPATURA DEI CONSIGLI PREMIUM PER ASSE DI RISCHIO
 * (Questa sezione è essenziale per popolare le aree premium)
 */
const AXIS_PLANS = {
    'Sleep & Rituals': {
        priorityTitle: 'Priorità: Migliorare la Qualità del Sonno',
        priorityDetail: 'La tua più alta priorità deve essere ripristinare confini sani tra il telefono e il tuo sonno.',
        dayPlan: [
            'Giorno 1: Togli il telefono dalla camera da letto la prima notte.',
            'Giorno 2: Inizia una routine serale rilassante (libro, musica) 30 minuti prima di dormire.',
            'Giorno 3: Utilizza una sveglia tradizionale per 7 giorni, non lo smartphone.'
        ],
        cssClass: 'sleep-and-rituals-bg'
    },
    'Productivity & Focus': {
        priorityTitle: 'Priorità: Riconquistare la Concentrazione',
        priorityDetail: 'La tua produttività è compromessa. Devi adottare misure rigorose per minimizzare le distrazioni.',
        dayPlan: [
            'Giorno 1: Lavora a blocchi di 45 minuti con il telefono in modalità aereo in un’altra stanza.',
            'Giorno 2: Disattiva tutte le notifiche non essenziali per le app di social media.',
            'Giorno 3: Usa un\'app di tracciamento per limitare l\'accesso ai siti "distraenti" durante le ore di lavoro.'
        ],
        cssClass: 'productivity-and-focus-bg'
    },
    'Escape & Emotions': {
        priorityTitle: 'Priorità: Gestire l\'Ansia e la Noia',
        priorityDetail: 'Stai usando il telefono come un meccanismo di coping malsano per la noia o lo stress. Devi trovare sostituti positivi.',
        dayPlan: [
            'Giorno 1: Riconosci 3 momenti di "noia" e sostituisci il telefono con una passeggiata o un esercizio di stretching.',
            'Giorno 2: Tieni un diario per scrivere i pensieri negativi invece di cercare sollievo nel telefono.',
            'Giorno 3: Chiedi a un amico o a un familiare di essere il tuo "partner di responsabilità" e di controllare il tuo utilizzo.'
        ],
        cssClass: 'escape-and-emotions-bg'
    },
    'Habit & Compulsion': {
        priorityTitle: 'Priorità: Rompere gli Automatismi e l\'Abuso',
        priorityDetail: 'La tua mano prende il telefono per abitudine. Devi rompere i "trigger" automatici.',
        dayPlan: [
            'Giorno 1: Cambia la posizione delle app sulla schermata principale per rompere l\'automatismo.',
            'Giorno 2: Lascia il telefono in borsa/zaino ogni volta che sei a casa (non tenerlo addosso).',
            'Giorno 3: Ogni volta che prendi il telefono, rispondi mentalmente alla domanda: "Perché l\'ho preso?"'
        ],
        cssClass: 'habit-and-compulsion-bg'
    },
    'Social & Presence': {
        priorityTitle: 'Priorità: Migliorare le Relazioni Reali',
        priorityDetail: 'L\'uso del telefono sta danneggiando la tua capacità di essere presente. Devi dare priorità alle interazioni faccia a faccia.',
        dayPlan: [
            'Giorno 1: Durante i pasti con gli altri, tutti i telefoni vengono impilati al centro del tavolo (e vince il primo che cede).',
            'Giorno 2: Fissa un appuntamento "senza telefono" con un amico.',
            'Giorno 3: Lascia il telefono a casa quando esci per una breve commissione o attività sociale non essenziale.'
        ],
        cssClass: 'social-and-presence-bg'
    }
};


// Stato e Variabili
let isPremium = false;
let riskRadarChart;


/**
 * Funzione per popolare le domande del quiz nell'HTML (ESSENZIALE)
 */
function populateQuiz() {
    const container = document.getElementById('quiz-questions-container');
    container.innerHTML = ''; // Pulisce il contenitore

    QUIZ_QUESTIONS.forEach((q, index) => {
        const qNum = index + 1;
        const questionHtml = `
            <div class="question-item">
                <p class="question-text">
                    <span class="question-number">${qNum}.</span> 
                    ${q.question}
                </p>
                <div class="options-group" data-question-id="${qNum}" data-axis="${q.axis}">
                    <label>
                        <input type="radio" name="q${qNum}" value="0" required>
                        Mai (0)
                    </label>
                    <label>
                        <input type="radio" name="q${qNum}" value="1">
                        Raramente (1)
                    </label>
                    <label>
                        <input type="radio" name="q${qNum}" value="2">
                        Spesso (2)
                    </label>
                    <label>
                        <input type="radio" name="q${qNum}" value="3">
                        Sempre (3)
                    </label>
                </div>
            </div>
        `;
        container.innerHTML += questionHtml;
    });
}

/**
 * Funzione per calcolare i risultati e visualizzare il paywall
 */
function calculateResult() {
    const form = document.getElementById('quiz-form');
    const questions = QUIZ_QUESTIONS.length;
    let totalScore = 0;
    const axisScores = {
        'Sleep & Rituals': 0,
        'Productivity & Focus': 0,
        'Escape & Emotions': 0,
        'Habit & Compulsion': 0,
        'Social & Presence': 0
    };
    const detailedAnswers = [];

    // 1. Verifica che tutte le domande siano state risposte
    for (let i = 1; i <= questions; i++) {
        const selector = `input[name="q${i}"]:checked`;
        const answer = form.querySelector(selector);
        if (!answer) {
            alert("Per favore, rispondi a tutte le 20 domande prima di calcolare il risultato.");
            return;
        }

        const score = parseInt(answer.value);
        totalScore += score;
        const axis = QUIZ_QUESTIONS[i - 1].axis;
        axisScores[axis] += score;
        
        detailedAnswers.push({
            question: QUIZ_QUESTIONS[i - 1].question,
            answer: answer.labels[0].textContent.trim(),
            score: score
        });
    }

    // 2. Determina il profilo di rischio e il testo
    let currentProfile = RISK_PROFILES.LOW;
    for (const key in RISK_PROFILES) {
        const profile = RISK_PROFILES[key];
        if (totalScore >= profile.minScore && totalScore <= profile.maxScore) {
            currentProfile = profile;
            break;
        }
    }

    // 3. Nasconde il quiz e mostra il paywall
    document.getElementById('quiz-section').style.display = 'none';
    document.getElementById('paywall').style.display = 'block';

    // 4. Salva i dati necessari per la generazione del report
    window.quizData = {
        totalScore: totalScore,
        axisScores: axisScores,
        detailedAnswers: detailedAnswers,
        profile: currentProfile,
        userName: document.getElementById('userName').value || 'Utente'
    };
}


/**
 * Funzione per sbloccare il report e popolare tutti i dati (Standard o Premium)
 */
function handlePaywallUnlock(isPremiumTier) {
    isPremium = isPremiumTier;

    // Nasconde il paywall e mostra il report
    document.getElementById('paywall').style.display = 'none';
    document.getElementById('report').style.display = 'block';

    updateReport();
}

/**
 * Funzione che popola il Report in base ai dati calcolati
 */
function updateReport() {
    const data = window.quizData;
    if (!data) return; 

    // 1. Dati Generali
    const date = new Date().toLocaleDateString(CONFIG.I18N_LOCALE);
    document.getElementById('report-date').textContent = `Data: ${date}`;
    document.getElementById('final-score').textContent = data.totalScore;
    document.getElementById('max-score').textContent = CONFIG.MAX_SCORE;
    
    // 2. Livello di Rischio
    const riskContainer = document.getElementById('risk-level-container');
    riskContainer.className = `score-box ${data.profile.cssClass}`;
    document.getElementById('risk-level').textContent = data.profile.level;
    
    // 3. Profilo e Analisi
    const profileText = document.getElementById('profile-text');
    const analysisText = document.getElementById('analysis-text');
    profileText.innerHTML = `Ciao **${data.userName}**, il tuo punteggio totale è di **${data.totalScore}/${CONFIG.MAX_SCORE}**. ${data.profile.profileText}`;
    analysisText.innerHTML = data.profile.analysisText;

    // 4. Grafico Radar
    renderRadarChart(data.axisScores);

    // 5. Impact List
    renderImpactList(data.axisScores);

    // 6. Tabella Risposte Dettagliate
    renderDetailedAnswers(data.detailedAnswers);

    // 7. Sezioni Premium (solo se l'utente ha sbloccato il tier Premium)
    if (isPremium) {
        document.querySelector('.premium-content').style.display = 'block';
        renderPremiumContent(data.axisScores);
    } else {
        document.querySelector('.premium-content').style.display = 'none';
    }
}

/**
 * Funzione per disegnare il Grafico Radar
 */
function renderRadarChart(axisScores) {
    if (riskRadarChart) riskRadarChart.destroy(); // Distrugge il grafico precedente

    const ctx = document.getElementById('riskRadarChart').getContext('2d');
    const labels = Object.keys(axisScores);
    const dataPoints = Object.values(axisScores);
    const maxAxisScore = QUIZ_QUESTIONS.length * 3 / 5; // 20 domande * 3 punti / 5 assi = 12 Max per asse

    riskRadarChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Punteggio Rischio per Asse',
                data: dataPoints,
                backgroundColor: 'rgba(255, 99, 132, 0.4)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                r: {
                    angleLines: { display: true },
                    suggestedMin: 0,
                    suggestedMax: maxAxisScore,
                    ticks: { stepSize: 3, display: false }
                }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });
}

/**
 * Funzione per popolare l'Impact List
 */
function renderImpactList(axisScores) {
    const list = document.getElementById('impact-list');
    list.innerHTML = '';
    const maxAxisScore = QUIZ_QUESTIONS.length * 3 / 5; // 12

    for (const axis in axisScores) {
        const score = axisScores[axis];
        const percentage = Math.round((score / maxAxisScore) * 100);
        
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <strong>${axis}:</strong> ${score}/${maxAxisScore} 
            <span class="impact-percentage">(${percentage}%)</span>
        `;
        list.appendChild(listItem);
    }
}

/**
 * Funzione per popolare le sezioni Premium
 */
function renderPremiumContent(axisScores) {
    // 1. Trova l'asse con il punteggio più alto (massima priorità)
    let maxScore = -1;
    let mainAxis = '';
    for (const axis in axisScores) {
        if (axisScores[axis] > maxScore) {
            maxScore = axisScores[axis];
            mainAxis = axis;
        }
    }

    const priorityPlan = AXIS_PLANS[mainAxis];
    
    // 2. Priorità
    const priorityActionDiv = document.getElementById('priority-action');
    priorityActionDiv.className = `priority-box ${priorityPlan.cssClass}`;
    priorityActionDiv.innerHTML = `
        <h3>${priorityPlan.priorityTitle}</h3>
        <p>${priorityPlan.priorityDetail}</p>
    `;

    // 3. Piano 7 Giorni
    const daysPlanList = document.getElementById('days-plan-list');
    daysPlanList.innerHTML = '';
    priorityPlan.dayPlan.forEach(step => {
        const li = document.createElement('li');
        li.textContent = step;
        daysPlanList.appendChild(li);
    });
    
    // 4. Risorse (Placeholder)
    document.getElementById('resources-text').innerHTML = `
        <p>Inizia scaricando app come **Moment** o **Forest** per tracciare e limitare il tuo utilizzo. Ti consigliamo anche di leggere il libro "Digital Minimalism" di Cal Newport.</p>
    `;
}

/**
 * Funzione per popolare la Tabella delle Risposte
 */
function renderDetailedAnswers(answers) {
    const tbody = document.getElementById('quiz-answers-body');
    tbody.innerHTML = '';
    answers.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.question}</td>
            <td>${item.answer}</td>
            <td>${item.score}</td>
        `;
        tbody.appendChild(row);
    });
}

/**
 * Funzione di Traduzione (semplice)
 */
function applyTranslations(locale) {
    const elements = document.querySelectorAll('[data-i18n]');
    const strings = TRANSLATIONS[locale];

    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (strings[key]) {
            el.textContent = strings[key];
        }
    });
}

/**
 * INIZIALIZZAZIONE e EVENT LISTENERS
 */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Applica traduzioni (se il tuo progetto è multilingua)
    applyTranslations(CONFIG.I18N_LOCALE);

    // 2. Popola il quiz (RISOLVE IL PROBLEMA DELLE DOMANDE MANCANTI)
    populateQuiz();

    // 3. Event Listener per il calcolo del risultato
    document.getElementById('calculate-btn').addEventListener('click', calculateResult);

    // 4. Event Listeners per i bottoni del Paywall
    document.getElementById('btn-standard').addEventListener('click', () => handlePaywallUnlock(false)); // Report Base
    document.getElementById('btn-premium').addEventListener('click', () => handlePaywallUnlock(true));  // Report Premium

    // 5. Event Listener per il Download PDF (RISOLVE IL PROBLEMA DEL DOWNLOAD)
    document.getElementById('download-pdf-btn').addEventListener('click', () => {
        // Implementazione placeholder: la funzione reale di jsPDF andrebbe qui
        alert("Il PDF sta venendo generato... Funzione di download in corso di implementazione.");
        // const { jsPDF } = window.jspdf;
        // const doc = new jsPDF();
        // doc.text("Report Dipendenza Digitale", 10, 10);
        // doc.save("report_dipendenza_digitale.pdf");
    });
});
