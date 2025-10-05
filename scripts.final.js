/* eslint-disable no-unused-vars */
(function (window) {
    let resultData = null;
    let canvasElement = null;

    // --- PARTE 1: Logica di Interazione e Caricamento Quiz (20 Domande) ---

    // Le 20 domande ripristinate
    const quizQuestions = [
        { text: "Appena sveglio, la prima cosa che fai è prendere lo smartphone?", name: "q1", category: "Sonno e Rituali" },
        { text: "Controlli il telefono immediatamente se non è a portata di mano?", name: "q2", category: "Fuga ed Emozioni" },
        { text: "Hai difficoltà a concentrarti su un compito senza controllare le notifiche?", name: "q3", category: "Attenzione e Produttività" },
        { text: "Interrompi conversazioni o pasti per rispondere a messaggi o guardare lo schermo?", name: "q4", category: "Relazioni e Socialità" },
        { text: "Ti senti ansioso o irritabile se devi stare senza telefono per ore?", name: "q5", category: "Fuga ed Emozioni" },
        { text: "Lo usi come unica fonte di intrattenimento (es. quando sei in fila, in bagno o sul divano)?", name: "q6", category: "Controllo e Tempo" },
        { text: "Guardare lo schermo è l'ultima cosa che fai prima di dormire?", name: "q7", category: "Sonno e Rituali" },
        { text: "Ti capita di sbloccare il telefono senza un motivo preciso?", name: "q8", category: "Attenzione e Produttività" },
        { text: "Ti senti obbligato a controllare i social network per paura di perderti qualcosa (FOMO)?", name: "q9", category: "Fuga ed Emozioni" },
        { text: "Hai difficoltà a stabilire limiti di tempo per l'uso delle app?", name: "q10", category: "Controllo e Tempo" },
        { text: "Hai mai avuto problemi a dormire o a svegliarti a causa dell'uso notturno?", name: "q11", category: "Sonno e Rituali" },
        { text: "I tuoi amici/familiari ti hanno criticato per l'uso eccessivo del telefono?", name: "q12", category: "Relazioni e Socialità" },
        { text: "Lo tieni a portata di mano anche quando lavori o studi su un PC?", name: "q13", category: "Attenzione e Produttività" },
        { text: "Ti accorgi di usare il telefono come meccanismo di fuga da emozioni negative (noia, ansia)?", name: "q14", category: "Fuga ed Emozioni" },
        { text: "Ti capita di usare il telefono in auto, anche se non strettamente necessario?", name: "q15", category: "Controllo e Tempo" },
        { text: "Controlli spesso il telefono anche quando non ricevi notifiche?", name: "q16", category: "Attenzione e Produttività" },
        { text: "Preferisci comunicare online piuttosto che di persona?", name: "q17", category: "Relazioni e Socialità" },
        { text: "Hai mai nascosto l'uso del telefono ad altre persone?", name: "q18", category: "Fuga ed Emozioni" },
        { text: "Ti addormenti con il telefono in mano o sul letto?", name: "q19", category: "Sonno e Rituali" },
        { text: "Ti senti spesso stanco a causa dell'uso prolungato dello schermo?", name: "q20", category: "Controllo e Tempo" },
    ];
    
    // Costanti per i prezzi
    const PRICE_STANDARD = "1,99 €";
    const PRICE_PREMIUM = "7,99 €";

    function renderQuiz() {
        const formElement = document.getElementById('quizForm');
        if (!formElement) return;

        let html = '';
        quizQuestions.forEach((q, index) => {
            const categoryClass = q.category.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            
            html += `
                <div class="question-block ${categoryClass}" data-category="${q.category}">
                    <h4>${index + 1}. ${q.text}</h4>
                    <div class="options">
                        <label><input type="radio" name="${q.name}" value="0" required> Mai/Raramente (0)</label>
                        <label><input type="radio" name="${q.name}" value="1" required> A volte (1)</label>
                        <label><input type="radio" name="${q.name}" value="2" required> Spesso (2)</label>
                        <label><input type="radio" name="${q.name}" value="3" required> Sempre (3)</label>
                    </div>
                </div>
            `;
        });
        formElement.innerHTML = html;
    }

    function getFormData() {
        const form = document.getElementById('quizForm');
        const formData = {};
        const inputs = form.querySelectorAll('input[type="radio"]:checked');

        inputs.forEach(input => {
            formData[input.name] = input.value;
        });

        formData.name = document.getElementById('userName').value.trim();
        return formData;
    }

    function handleCalculate() {
        const form = document.getElementById('quizForm');
        if (!form.checkValidity()) {
            alert("Per favore, rispondi a tutte le domande prima di calcolare il risultato.");
            form.reportValidity();
            return;
        }

        const formData = getFormData();
        
        window.calculateAndStoreResults(formData); 
        
        document.getElementById('paywall').classList.remove('hidden');
        document.getElementById('calculateBtn').classList.add('hidden');
        document.getElementById('resetBtn').classList.add('hidden');
        
        const paywall = document.getElementById('paywall');
        if (paywall && !document.getElementById('downloadStandard')) {
            // HTML del pulsante Report Premium ESATTAMENTE come richiesto
            paywall.innerHTML = `
                <h3>Il tuo risultato è pronto!</h3>
                <p>Per sbloccare il tuo report dettagliato, scegli l'opzione di acquisto qui sotto:</p>
                <div class="cta-buttons" style="margin-top: 20px;">
                    <button id="downloadStandard" class="btn outline" style="margin-right: 10px;">
                        Scarica Report Base (${PRICE_STANDARD} - Finto)
                    </button>
                    <button id="downloadPremium" class="btn primary">
                        Acquista Report Premium (${PRICE_PREMIUM} - Finto)
                        <br><span style="font-size: 10px; font-weight: normal;">(Include: Piano Azione, Priorità e Piano 7 Giorni)</span>
                    </button>
                </div>
            `;

            document.getElementById('downloadStandard').addEventListener('click', () => {
                alert(`Simulazione di acquisto completata. Generazione Report Base (${PRICE_STANDARD}).`);
                window.__DD__.generatePDF(false); 
            });

            document.getElementById('downloadPremium').addEventListener('click', () => {
                alert(`Simulazione di acquisto completata. Generazione Report Premium (${PRICE_PREMIUM}).`);
                window.__DD__.generatePDF(true); 
            });
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        renderQuiz();
        
        const calculateBtn = document.getElementById('calculateBtn');
        if (calculateBtn) {
            calculateBtn.addEventListener('click', handleCalculate);
        }
        
        const resetBtn = document.getElementById('resetBtn');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => window.location.reload());
        }
    });
    
    // --- FINE PARTE 1: Logica di Interazione ---
    
    // --------------------------------------------------------------------------------------
    
    /**
     * @returns {HTMLCanvasElement}
     */
    function getPdfCanvas() {
        if (canvasElement) return canvasElement;

        canvasElement = document.createElement('canvas');
        canvasElement.id = 'pdf-chart-canvas';
        canvasElement.width = 700;
        canvasElement.height = 700;
        
        return canvasElement;
    }

    // ----- LOGICA DI CALCOLO DEI RISULTATI (20 domande - Max 60) -----
    function calculateResults(formData) {
        // Punteggi per Asse
        const scores = {
            'Sonno e Rituali': 0, 
            'Fuga ed Emozioni': 0, 
            'Attenzione e Produttività': 0, 
            'Relazioni e Socialità': 0, 
            'Controllo e Tempo': 0, 
        };
        
        // Mappa delle domande verso gli assi
        const questionMap = {
            q1: 'Sonno e Rituali', q2: 'Fuga ed Emozioni', q3: 'Attenzione e Produttività',
            q4: 'Relazioni e Socialità', q5: 'Fuga ed Emozioni', q6: 'Controllo e Tempo',
            q7: 'Sonno e Rituali', q8: 'Attenzione e Produttività', q9: 'Fuga ed Emozioni',
            q10: 'Controllo e Tempo', q11: 'Sonno e Rituali', q12: 'Relazioni e Socialità',
            q13: 'Attenzione e Produttività', q14: 'Fuga ed Emozioni', q15: 'Controllo e Tempo',
            q16: 'Attenzione e Produttività', q17: 'Relazioni e Socialità', q18: 'Fuga ed Emozioni',
            q19: 'Sonno e Rituali', q20: 'Controllo e Tempo',
        };
        
        // Massimi punteggi per Asse
        const AXIS_MAX_SCORES = {
            'Sonno e Rituali': 12, // 4 domande
            'Fuga ed Emozioni': 15, // 5 domande
            'Attenzione e Produttività': 12, // 4 domande
            'Relazioni e Socialità': 9, // 3 domande
            'Controllo e Tempo': 12, // 4 domande
        };
        const MAX_TOTAL_SCORE = 60; // 20 Domande * 3

        let totalScore = 0;
        const quizDetails = []; 

        for (const [key, value] of Object.entries(formData)) {
            if (key.startsWith('q')) {
                const score = parseInt(value, 10);
                const questionNumber = key;
                const axis = questionMap[key];

                if (!isNaN(score) && axis) {
                    scores[axis] += score;
                    totalScore += score;
                    
                    const answerMap = {
                         '0': 'Mai/Raramente', '1': 'A volte', '2': 'Spesso', '3': 'Sempre' 
                    };
                    const answerText = answerMap[value] || 'Non risposto';

                    quizDetails.push({
                        question: `Q${questionNumber.substring(1)} (${axis})`, 
                        answer: answerText,
                        score: score
                    });
                }
            }
        }

        // Soglie per Max Score 60
        let level;
        if (totalScore <= 20) { 
            level = 'Basso rischio';
        } else if (totalScore <= 40) { 
            level = 'Rischio medio';
        } else {
            level = 'Rischio alto';
        }

        const percentage = Math.round((totalScore / MAX_TOTAL_SCORE) * 100);
        
        // Calcolo Score per Radar (Media per domanda sull'asse, max 3)
        const radarScores = {};
        for (const axis in scores) {
            const numQuestions = Object.values(questionMap).filter(a => a === axis).length;
            radarScores[axis] = scores[axis] / numQuestions; 
        }

        // Calcolo Impatto (Percentuale sul Max Score dell'Asse)
        const impactScores = {};
        for (const axis in scores) {
            impactScores[axis] = Math.round((scores[axis] / AXIS_MAX_SCORES[axis]) * 100);
        }

        const sortedImpacts = Object.entries(impactScores)
            .map(([axis, score]) => ({ axis, score }))
            .sort((a, b) => b.score - a.score);

        const top3Priorities = sortedImpacts
            .filter(p => p.score >= 50)
            .slice(0, 3);
        
        const today = new Date();
        const dateStr = today.toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit', year: 'numeric' });

        return {
            name: formData.name || 'Utente Anonimo',
            total: totalScore,
            maxScore: MAX_TOTAL_SCORE,
            percentage: percentage,
            level: level,
            radarScores: radarScores,
            impactScores: impactScores,
            top3Priorities: top3Priorities,
            dateStr: dateStr,
            quizDetails: quizDetails 
        };
    }

    window.calculateAndStoreResults = function (formData) {
        resultData = calculateResults(formData);
        console.log('Risultati calcolati:', resultData);
        return resultData;
    };
    
    // --- PARTE 2: Logica di Generazione PDF ---

    async function generatePDF(isPremium = false) { 
        if (!resultData) return;

        const writeParagraphs = (text) => {
            doc.setFontSize(12);
            const maxTextWidth = pageWidth - margin * 2;
            const lineHeight   = 18;
            const paragraphs   = String(text).split(/\n+/);
            paragraphs.forEach((p, i) => {
                const lines = doc.splitTextToSize(p, maxTextWidth);
                lines.forEach(line => {
                    if (y + lineHeight > pageHeight - margin) {
                        doc.addPage();
                        y = margin;
                    }
                    doc.text(line, margin, y);
                    y += lineHeight;
                });
                if (i < paragraphs.length - 1) y += 8;
            });
        };

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({ unit: "pt", format: "a4" });

        const pageWidth  = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const margin     = 40;
        let y            = margin;

        // --- Header
        doc.setFont("Helvetica", "bold");
        doc.setFontSize(28);
        doc.text("Report personalizzato", margin, y);

        doc.setFont("Helvetica", "normal");
        doc.setFontSize(10);
        doc.text("Build Final (20 Q)", pageWidth - margin - 60, margin);
        y += 36;

        if (resultData.name) {
            doc.setFont("Helvetica", "bold");
            doc.setFontSize(36);
            doc.text(resultData.name, margin, y);
            y += 40;
        }

        doc.setFont("Helvetica", "normal");
        doc.setFontSize(12);
        doc.text(`Data: ${resultData.dateStr}`, margin, y);
        y += 20;

        doc.setDrawColor(200);
        doc.line(margin, y, pageWidth - margin, y);
        y += 20;

        // --- Risultato
        doc.setFont("Helvetica", "bold");
        doc.setFontSize(14);
        doc.text("Risultato", margin, y);
        y += 18;

        doc.setFont("Helvetica", "normal");
        doc.setFontSize(12);
        doc.text(`Punteggio: ${resultData.total}/${resultData.maxScore}`, margin, y);
        y += 16;
        doc.text(`Rischio: ${resultData.percentage}% (${resultData.level})`, margin, y);
        y += 22;
        
        // BLOCCO: Confronto con l'Utente Medio (Benchmark - Aggiornato per 60)
        const AVERAGE_SCORE_BENCHMARK = 40; 

        doc.setFont("Helvetica", "bold");
        doc.setFontSize(13);
        doc.text("Il Tuo Confronto con l'Utente Medio: ", margin, y);
        
        if (resultData.total > AVERAGE_SCORE_BENCHMARK) {
            doc.setTextColor(200, 0, 0); 
            doc.text("INFERIORE ALLA MEDIA", margin + 250, y);
            y += 18;
            doc.setTextColor(0); 
            doc.setFont("Helvetica", "normal");
            doc.setFontSize(11);
            writeParagraphs(`Il tuo punteggio di ${resultData.total} è più alto della media di ${AVERAGE_SCORE_BENCHMARK} punti calcolata sui nostri utenti. Questo indica che le tue abitudini richiedono un'attenzione immediata.`);
        } else {
            doc.setTextColor(34, 197, 94);
            doc.text("SUPERIORE ALLA MEDIA", margin + 250, y);
            y += 18;
            doc.setTextColor(0); 
            doc.setFont("Helvetica", "normal");
            doc.setFontSize(11);
            writeParagraphs(`Il tuo punteggio di ${resultData.total} è più basso della media di ${AVERAGE_SCORE_BENCHMARK} punti calcolata sui nostri utenti. Hai una buona disciplina, ma è essenziale non abbassare la guardia.`);
        }
        y += 10;
        doc.setDrawColor(200);
        doc.line(margin, y, pageWidth - margin, y);
        y += 20;

        // --- Profilo Utente
        doc.setFont("Helvetica", "bold");
        doc.setFontSize(14);
        doc.text("Il tuo Profilo di Dipendenza Digitale", margin, y);
        y += 18;

        doc.setFont("Helvetica", "normal");
        doc.setFontSize(12);

        const profileTexts = {
            "Basso rischio": "Sei un **utente consapevole**. La tua tecnologia ti serve, non viceversa. Hai già una buona disciplina; concentrati sul mantenere alta la guardia e nell'usare la disconnessione come un vantaggio competitivo. Il tuo punteggio ti pone in una posizione ideale per la prevenzione e per sfruttare al meglio la tecnologia senza esserne schiavo.",
            "Rischio medio": "Sei un **utente a un bivio**. Hai sviluppato abitudini che stanno erodendo la tua concentrazione e il tuo tempo libero. Sei nel momento perfetto per agire con un piano mirato prima di scivolare nell'alto rischio e subire conseguenze più serie su sonno e relazioni. La tua priorità è ristabilire i confini e applicare le tecniche di disconnessione intenzionale che troverai nel piano d'azione.",
            "Rischio alto": "Sei un **utente dipendente**. Lo smartphone ha il controllo su sonno, relazioni e stati d'animo, e probabilmente è diventato la tua via di fuga primaria da noia o ansia. Questo report segna l'inizio della ripresa del controllo. Richiede un impegno serio e l'applicazione immediata delle priorità definite, concentrandoti sulla sostituzione delle abitudini digitali con alternative offline che migliorino il tuo benessere fisico e mentale.",
        };

        const userProfile = profileTexts[resultData.level] || profileTexts["Rischio medio"];
        writeParagraphs(userProfile);
        y += 20;

        doc.setDrawColor(200);
        doc.line(margin, y, pageWidth - margin, y);
        y += 20;

        // **********************************************
        // ******* LOGICA GRAFICO RADAR *****************
        // **********************************************
        
        doc.setFont("Helvetica", "bold");
        doc.setFontSize(14);
        doc.text("Analisi dettagliata per Asse di Rischio", margin, y);
        y += 20;

        const radarCanvas = getPdfCanvas();
        const ctx = radarCanvas.getContext("2d");
        if (window.__chart) window.__chart.destroy();

        const dataPoints = Object.values(resultData.radarScores);
        const labels = Object.keys(resultData.radarScores);
        
        const chartRendered = new Promise(resolve => {
            window.__chart = new window.Chart(ctx, {
                type: 'radar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Punteggio Rischio (Max 3)',
                        data: dataPoints,
                        backgroundColor: 'rgba(0, 51, 102, 0.2)', 
                        borderColor: 'rgba(0, 51, 102, 1)', 
                        pointBackgroundColor: 'rgba(0, 51, 102, 1)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgba(0, 51, 102, 1)'
                    }]
                },
                options: {
                    responsive: false,
                    maintainAspectRatio: true,
                    animation: {
                        onComplete: resolve 
                    },
                    scales: {
                        r: {
                            angleLines: { display: true },
                            suggestedMin: 0,
                            suggestedMax: 3, 
                            pointLabels: { font: { size: 10 } },
                            ticks: { 
                                 stepSize: 1, 
                                 display: false 
                            }
                        }
                    },
                    plugins: {
                        legend: { display: false } 
                    }
                }
            });
            setTimeout(resolve, 500); 
        });

        await chartRendered; 

        const imgData = radarCanvas.toDataURL('image/png', 1.0); 
        const radarSize = 350;
        const xOffset = (pageWidth - radarSize) / 2;
        
        if (y + radarSize + 30 > pageHeight - margin) {
            doc.addPage();
            y = margin;
        }
        
        doc.addImage(imgData, 'PNG', xOffset, y, radarSize, radarSize);

        y += radarSize + 30; 
        
        // **********************************************
        // ********* FINE LOGICA GRAFICO RADAR **********
        // **********************************************
                        
        doc.setDrawColor(200);
        doc.line(margin, y, pageWidth - margin, y);
        y += 20;

        // --- Riepilogo Punteggi di Impatto Dettagliati
        doc.setFont("Helvetica", "bold");
        doc.setFontSize(14);
        doc.text("Riepilogo Punteggi di Impatto Dettagliati", margin, y);
        y += 18;

        doc.setFont("Helvetica", "normal");
        doc.setFontSize(12);

        const impatti = Object.entries(resultData.impactScores)
            .sort(([, a], [, b]) => b - a) 
            .map(([axis, score]) => `• ${axis}: ${score}% (vicinanza al rischio massimo in quest'area)`);

        writeParagraphs(impatti.join("\n"));
        y += 20;

        doc.setDrawColor(200);
        doc.line(margin, y, pageWidth - margin, y);
        y += 20;

        // ************************************************************
        // ******* LOGICA QUIZ (SOLUZIONE DOC.TEXT) - FUNZIONANTE ********
        // ************************************************************
        
        doc.setFont("Helvetica", "bold");
        doc.setFontSize(14);
        doc.text("Le Tue Risposte Dettagliate al Quiz", margin, y);
        y += 18;
        
        doc.setFontSize(10);
        doc.setFont("Helvetica", "bold");
        
        const col1Pos = margin;
        const col2Pos = margin + 200;
        const col3Pos = pageWidth - margin - 50;
        const lineHeightQuiz = 16;
        
        // Intestazioni
        if (y + lineHeightQuiz > pageHeight - margin) { doc.addPage(); y = margin; }
        doc.setFillColor(200, 200, 200); 
        doc.rect(margin, y - 10, pageWidth - margin * 2, lineHeightQuiz + 4, 'F');
        doc.text("Domanda", col1Pos, y);
        doc.text("Risposta Fornita", col2Pos, y);
        doc.text("Punteggio", col3Pos, y, { align: 'center' });
        y += lineHeightQuiz + 4;
        
        doc.setFont("Helvetica", "normal");
        doc.setFontSize(10);

        resultData.quizDetails.forEach((item, index) => {
            if (y + lineHeightQuiz > pageHeight - margin) {
                doc.addPage();
                y = margin + 10; 
            }
            
            if (index % 2 === 0) {
                 doc.setFillColor(245, 245, 245); 
                 doc.rect(margin, y - 10, pageWidth - margin * 2, lineHeightQuiz, 'F');
            }

            doc.text(item.question, col1Pos, y);
            doc.text(item.answer, col2Pos, y);
            doc.text(String(item.score), col3Pos, y, { align: 'center' });
            y += lineHeightQuiz;
        });

        y += 10;
        doc.setDrawColor(200);
        doc.line(margin, y, pageWidth - margin, y);
        y += 20;

        // ************************************************************
        // ********* FINE LOGICA QUIZ (SOLUZIONE DOC.TEXT) ************
        // ************************************************************

        // --- Analisi e consigli personalizzati
        const analysisTexts = {
            "Basso rischio": "Il tuo rapporto con lo smartphone appare equilibrato. Sei un **utente consapevole** che utilizza la tecnologia come strumento senza esserne schiavo. La tua sfida non è eliminare l'uso, ma mantenere alta la guardia e continuare a migliorare l'efficienza d'uso per sfruttare la disconnessione come un vantaggio competitivo. **Consiglio:** Continua a monitorare i tuoi comportamenti, specialmente in momenti di stress, e utilizza le tue ore libere per attività profondamente rigeneranti (es. lettura, sport, hobby manuali).",
            "Rischio medio": "Il tuo comportamento digitale mostra **segnali chiari di potenziale dipendenza**. Hai sviluppato abitudini che stanno erodendo la tua concentrazione e il tuo tempo libero. Sei nel momento perfetto per agire con un piano mirato prima di scivolare nell'alto rischio e subire conseguenze più serie su sonno e relazioni. **La tua priorità è ristabilire i confini chiari** e applicare immediatamente le tecniche di disconnessione intenzionale che troverai nel piano d'azione. Agisci subito per riprendere il controllo del tuo tempo.",
            "Rischio alto": "Il tuo punteggio indica una **dipendenza digitale significativa**. Lo smartphone ha preso il controllo su sonno, relazioni e stati d'animo, ed è probabilmente diventato la tua via di fuga primaria da noia o ansia. Questo report segna l'inizio della ripresa del controllo. Richiede un **impegno serio** e l'applicazione immediata delle priorità definite, concentrandoti sulla sostituzione delle abitudini digitali con alternative offline che migliorino il tuo benessere fisico e mentale. Non sottovalutare l'impatto sul tuo benessere complessivo.",
        };

        doc.setFont("Helvetica", "bold");
        doc.setFontSize(14);
        
        if (y + 40 > pageHeight - margin) { doc.addPage(); y = margin; }
        doc.text("Analisi e consigli personalizzati", margin, y);
        y += 18;

        doc.setFont("Helvetica", "normal");
        const testoCorrente = analysisTexts[resultData.level];
        writeParagraphs(testoCorrente);
        y += 12;

        // ******************************************************
        // ***** SEZIONI EXTRA SOLO PER REPORT PREMIUM (7,99€) ** // ******************************************************
        if (isPremium) {
            if (y > pageHeight - 60) { doc.addPage(); y = margin; }
            doc.addPage();
            y = margin;

            // --- SEZIONE: LE TUE 3 PRIORITÀ
            doc.setFont("Helvetica", "bold");
            doc.setFontSize(16);
            doc.setTextColor("#003366");
            doc.text("Il Tuo Piano di Azione Prioritario", margin, y);
            y += 20;

            doc.setFont("Helvetica", "normal");
            doc.setFontSize(12);
            doc.setTextColor(0);

            const priorityDescriptions = {
                'Sonno e Rituali': 'Attiva la modalità "Non Disturbare" alle 22:00 e lascia il telefono fuori dalla camera da letto. Sostituisci lo scrolling serale con la lettura di un libro fisico.',
                'Fuga ed Emozioni': 'Non usare il telefono per fuggire dalla noia, dalla tristezza o dall\'ansia. Istituisci un "buffer" di 10 minuti: quando senti l\'impulso, aspetta 10 minuti e fai qualcosa di non digitale (es. breve camminata, bevanda calda).',
                'Attenzione e Produttività': 'Usa l\'app Digital Wellbeing (o Screen Time) per limitare in modo rigido l\'uso delle app più distraenti (es. social, giochi) durante le ore di lavoro/studio.',
                'Relazioni e Socialità': 'Istituisci "Zone senza Telefono" chiare: durante i pasti, conversazioni con partner/figli, e riunioni sociali. Metti il telefono in modalità aereo o in un\'altra stanza per disconnetterti completamente.',
                'Controllo e Tempo': 'Utilizza timer di 30 minuti (Tecnica Pomodoro) quando lavori e usa il telefono solo durante le pause. Tieni il telefono fuori dalla vista (in una borsa o cassetto) quando non è strettamente necessario.'
            };

            if (resultData.top3Priorities.length === 0) {
                writeParagraphs("Non sono state identificate priorità di rischio " +
                    "specifiche (punteggio basso). Passa direttamente al Piano 7 giorni.");
            } else {
                resultData.top3Priorities.forEach((p, index) => {
                    const title = `PRIORITÀ #${index + 1}: ${p.axis}`;
                    const description = priorityDescriptions[p.axis] || "Azioni specifiche non definite. Controlla la sezione Piano 7 giorni.";

                    doc.setFont("Helvetica", "bold");
                    doc.setFontSize(13);
                    
                    if (y + 40 > pageHeight - margin) { doc.addPage(); y = margin; }
                    doc.text(title, margin, y);
                    y += 16;

                    doc.setFont("Helvetica", "normal");
                    doc.setFontSize(12);
                    writeParagraphs(description);
                    y += 12;
                });
            }

            // --- Piano 7 giorni 
            if (y + 40 > pageHeight - margin) { doc.addPage(); y = margin; }
            doc.setFont("Helvetica", "bold");
            doc.setFontSize(14);
            doc.text("Piano 7 giorni di Digital Detox", margin, y);
            y += 18;

            doc.setFont("Helvetica", "normal");

            const allPlanSets = {
                "Basso rischio": [
                    "Giorno 1 – Monitoraggio Consapevole: Per un giorno, prendi nota ogni volta che sblocchi il telefono e annota cosa stavi cercando.",
                    "Giorno 2 – Notifiche Selettive: Disattiva tutte le notifiche tranne quelle essenziali per il lavoro o la famiglia. Mantieni attive solo 3 app di messaggistica.",
                    "Giorno 3 – Il Pasto Sacro: Durante tutti i pasti, il telefono va in modalità aereo e fuori dalla vista. Concentrati sul cibo e sulla conversazione.",
                    "Giorno 4 – Alternativa Offline: Scegli un'attività (es. leggere, disegnare, cucinare) che farai al posto di scorrere il telefono per 30 minuti al giorno.",
                    "Giorno 5 – Spazio di Lavoro: Rimuovi lo smartphone dal tuo campo visivo mentre lavori/studi. Tienilo in un cassetto o in un'altra stanza.",
                    "Giorno 6 – Serata Sociale: Esci con gli amici e comunica loro che terrai il telefono in borsa/tasca. Goditi l'interazione dal vivo.",
                    "Giorno 7 – Revisione e Mantenimento: Rivedi i tuoi progressi. Decidi quali nuove abitudini manterrai fisse per la prossima settimana."
                ],
                "Rischio medio": [
                    "Giorno 1 – Hard Limit: Imposta un limite di tempo (es. 60 minuti totali) sulle app che ti distraggono di più (es. Instagram, TikTok) usando le impostazioni di sistema.",
                    "Giorno 2 – Confine Notturno: Metti il telefono a caricare in una stanza diversa dalla tua camera da letto. Usa una sveglia tradizionale.",
                    "Giorno 3 – Disconnessione Attiva: Istituisci un blocco di 90 minuti di 'Deep Work' in cui il telefono è in modalità aereo e fuori dalla portata della mano.",
                    "Giorno 4 – Noia Produttiva: Quando provi noia, non prendere il telefono. Fai 5 minuti di stretching o pianifica i tuoi prossimi 3 obiettivi.",
                    "Giorno 5 – Conversazione: Durante le conversazioni uno-a-uno, metti il telefono a testa in giù o in borsa. Esercitati a non controllare per l'intera durata della conversazione.",
                    "Giorno 6 – Digital Detox di Mezza Giornata: Dalle 14:00 alla sera, spegni completamente il telefono e riaccendilo solo in caso di emergenza.",
                    "Giorno 7 – Revisione e Riflessione: Scrivi un riepilogo su come ti sei sentito questa settimana. Quali sono stati i benefici? Cosa è stato più difficile?"
                ],
                "Rischio alto": [
                    "Giorno 1 – Decontaminazione Visiva: Sposta tutte le app di social media, notizie e giochi in una cartella secondaria e nascondila. Metti solo app di utilità sulla schermata principale.",
                    "Giorno 2 – Disattivazione Totale: Disinstalla temporaneamente l'app più problematica (quella che usi compulsivamente).",
                    "Giorno 3 – La Regola delle 20:00: Alle 20:00, metti il telefono in modalità aereo e in un cassetto. Non riaccenderlo fino alla colazione del giorno dopo.",
                    "Giorno 4 – Ritorno al Corpo: Pratica 15 minuti di mindfulness o fai una passeggiata senza cuffie né telefono. Riconosci l'ansia da disconnessione senza cedere.",
                    "Giorno 5 – Riscopri la Voce: Invece di mandare messaggi o email per questioni che richiedono più di due scambi, chiama la persona.",
                    "Giorno 6 – Detox di un Giorno Intero: Spegni lo smartphone completamente e lascialo a casa per un'intera giornata, dedicandoti solo ad attività all'aperto o con le persone care.",
                    "Giorno 7 – Supporto Esterno: Condividi il tuo piano e i tuoi risultati con un amico o familiare. Chiedi loro di farti da 'responsabile' (accountability partner)."
                ]
            };

            const plan7 = allPlanSets[resultData.level];

            writeParagraphs(plan7.map(i => "• " + i).join("\n"));
            y += 12;

            // --- Risorse
            if (y + 150 > pageHeight - margin) { doc.addPage(); y = margin; }
            doc.setFont("Helvetica", "bold");
            doc.setFontSize(14);
            doc.text("Risorse consigliate", margin, y);
            y += 10; 

            // Risorse in HTML per un layout più complesso
            const resourcesHtml = `
                <p><strong>App:</strong> Screen Time (iOS) / Digital Wellbeing (Android) per limitare le app.</p>
                <p><strong>Libri:</strong> 'Digital Minimalism' (Cal Newport), 'How to Break Up with Your Phone' (C. Price).</p>
                <div style="margin-top: 15px;">
                    <p><strong>Tecniche:</strong></p>
                    <ul style="margin-left: 20px;">
                        <li>**Pomodoro per il focus:** Metodo per suddividere il lavoro in intervalli di 25 minuti seguiti da brevi pause.</li>
                        <li>**Blocchi Deep Work:** Dedicare lunghe sessioni (es. 90 min) di lavoro intensivo e senza distrazioni.</li>
                        <li>**Journaling serale per l'ansia:** Scrivere a mano pensieri e preoccupazioni prima di dormire.</li>
                    </ul>
                </div>
                <p><strong>Strumento:</strong> Sveglia tradizionale e orologio da polso per non dover guardare il telefono.</p>
            `;
            
            // LOGICA DI SALVATAGGIO POTENZIATA PER IL PREMIUM (Promise)
            const htmlToPdf = new Promise(resolve => {
                doc.setFontSize(10);
                doc.html(resourcesHtml, {
                    x: margin,
                    y: y,
                    width: pageWidth - (2 * margin),
                    callback: function (doc) {
                        y = doc.previousAutoTable.finalY || (y + 120); 
                        resolve(); 
                    }
                });
            });

            await htmlToPdf; 
            
            // --- Footer (Aggiunto DOPO l'attesa del rendering HTML)
            if (y > pageHeight - 60) { doc.addPage(); y = margin; }
            doc.setDrawColor(200);
            doc.line(margin, y, pageWidth - margin, y);
            y += 16;
            doc.setFontSize(10);
            doc.text("Disclaimer: questo report ha scopo informativo e non sostituisce un consulto professionale.", margin, y);
        
            // Salvataggio finale del REPORT PREMIUM
            doc.save(`Report_Dipendenza_Digitale_Premium.pdf`);
            return; 
        } 
        
        // ******************************************************
        // ***** SEZIONE PER REPORT STANDARD (1,99€) ************ // ******************************************************
        
        if (y + 100 > pageHeight - margin) { doc.addPage(); y = margin; }
        
        doc.setFont("Helvetica", "bold");
        doc.setFontSize(14);
        doc.setTextColor("#003366");
        doc.text("Upgrade a Premium", margin, y);
        y += 18;

        doc.setFont("Helvetica", "normal");
        doc.setFontSize(12);
        doc.setTextColor(0);
        writeParagraphs(`Hai scaricato la versione Base del report (${PRICE_STANDARD}). Per sbloccare le tue 3 Priorità di Azione, il Piano 7 Giorni di Digital Detox, e le Risorse Dettagliate per la Disconnessione, effettua l'upgrade alla versione Premium (${PRICE_PREMIUM}).`);
        y += 12;

        doc.setFont("Helvetica", "normal");

        // --- Footer
        if (y > pageHeight - 60) { doc.addPage(); y = margin; }
        doc.setDrawColor(200);
        doc.line(margin, y, pageWidth - margin, y);
        y += 16;
        doc.setFontSize(10);
        doc.text("Disclaimer: questo report ha scopo informativo e non sostituisce un consulto professionale.", margin, y);

        // Salvataggio per il report standard (NON PREMIUM)
        doc.save(`Report_Dipendenza_Digitale_Standard.pdf`);
    }

    // Esposizione delle funzioni all'oggetto globale
    window.__DD__ = { 
        generatePDF, 
        getResult: () => resultData 
    };

})(window);
   
                
                   
