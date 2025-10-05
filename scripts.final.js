     
 /* eslint-disable no-unused-vars */
(function (window) {
    let resultData = null;
    let canvasElement = null;

    /**
     * @returns {HTMLCanvasElement}
     */
    function getPdfCanvas() {
        if (canvasElement) return canvasElement;

        // Se l'elemento non esiste, crealo
        canvasElement = document.createElement('canvas');
        canvasElement.id = 'pdf-chart-canvas';
        canvasElement.width = 700;
        canvasElement.height = 700;
        
        return canvasElement;
    }

    // ----- LOGICA DI CALCOLO DEI RISULTATI (Corretta con Dettagli Quiz) -----
    function calculateResults(formData) {
        // Punteggi per asse
        const scores = {
            'Sonno e Rituali': 0,
            'Fuga ed Emozioni': 0,
            'Attenzione e Produttività': 0,
            'Relazioni e Socialità': 0,
            'Controllo e Tempo': 0,
        };
        // Punteggio massimo per asse (3 domande x 3 punti max)
        const MAX_AXIS_SCORE = 9;
        const MAX_TOTAL_SCORE = 45;

        // Mappatura domande -> asse
        const questionMap = {
            q1: 'Sonno e Rituali', q2: 'Sonno e Rituali', q3: 'Sonno e Rituali',
            q4: 'Fuga ed Emozioni', q5: 'Fuga ed Emozioni', q6: 'Fuga ed Emozioni',
            q7: 'Attenzione e Produttività', q8: 'Attenzione e Produttività', q9: 'Attenzione e Produttività',
            q10: 'Relazioni e Socialità', q11: 'Relazioni e Socialità', q12: 'Relazioni e Socialità',
            q13: 'Controllo e Tempo', q14: 'Controllo e Tempo', q15: 'Controllo e Tempo',
        };

        let totalScore = 0;
        const quizDetails = []; // ARRAY PER I DETTAGLI QUIZ

        for (const [key, value] of Object.entries(formData)) {
            if (key.startsWith('q')) {
                const score = parseInt(value, 10);
                const questionNumber = key;
                const axis = questionMap[key];

                if (!isNaN(score) && axis) {
                    scores[axis] += score;
                    totalScore += score;
                    
                    // Salva i dettagli per la tabella PDF
                    const answerText = value === '0' ? 'Mai/Raramente' : (value === '1' ? 'A volte' : (value === '2' ? 'Spesso' : 'Sempre'));

                    quizDetails.push({
                        question: `Q${questionNumber.substring(1)} (${axis})`, 
                        answer: answerText,
                        score: score
                    });
                }
            }
        }

        // Calcolo Livello e Descrizione
        let level;
        if (totalScore <= 15) {
            level = 'Basso rischio';
        } else if (totalScore <= 30) {
            level = 'Rischio medio';
        } else {
            level = 'Rischio alto';
        }

        // Calcolo Percentuale di Rischio
        const percentage = Math.round((totalScore / MAX_TOTAL_SCORE) * 100);

        // Calcolo Score per Grafico Radar (scala 0-3)
        const radarScores = {};
        for (const axis in scores) {
            // Normalizza 0-9 a 0-3
            radarScores[axis] = scores[axis] / 3;
        }

        // Calcolo Punteggi di Impatto (percentuale di rischio max per asse)
        const impactScores = {};
        for (const axis in scores) {
            // Normalizza 0-9 a 0-100%
            impactScores[axis] = Math.round((scores[axis] / MAX_AXIS_SCORE) * 100);
        }

        // Identifica le 3 Priorità Maggiori
        const sortedImpacts = Object.entries(impactScores)
            .map(([axis, score]) => ({ axis, score }))
            .sort((a, b) => b.score - a.score);

        // Filtra solo le priorità con un impatto superiore a un livello minimo (es. 50%)
        const top3Priorities = sortedImpacts
            .filter(p => p.score >= 50)
            .slice(0, 3);
        
        // Data di oggi per il report
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
            quizDetails: quizDetails // NUOVA PROPRIETÀ
        };
    }

    // Funzione esterna per calcolare e memorizzare i risultati
    window.calculateAndStoreResults = function (formData) {
        resultData = calculateResults(formData);
        console.log('Risultati calcolati:', resultData);
        return resultData;
    };

    // ----- PDF (Logica COMPLETA) -----
    async function generatePDF(isPremium = false) { 
        if (!resultData) return;

        // Implementazione COMPLETA di writeParagraphs
        const writeParagraphs = (text) => {
            doc.setFontSize(12);
            const maxTextWidth = pageWidth - margin * 2;
            const lineHeight   = 18;
            const paragraphs   = String(text).split(/\n+/);
            paragraphs.forEach((p, i) => {
                const lines = doc.splitTextToSize(p, maxTextWidth);
                lines.forEach(line => {
                    // Controllo di pagina prima di ogni riga
                    if (y + lineHeight > pageHeight - margin) {
                        doc.addPage();
                        y = margin;
                    }
                    doc.text(line, margin, y);
                    y += lineHeight;
                });
                // Spazio tra paragrafi
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
        doc.text("Build v7", pageWidth - margin - 60, margin);
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
        
        // BLOCCO: Confronto con l'Utente Medio (Benchmark)
        const AVERAGE_SCORE_BENCHMARK = 35;

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
        // Fine BLOCCO Benchmark

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
        // ******* INIZIO LOGICA GRAFICO RADAR **********
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
        
        // Creiamo una Promessa che si risolve quando Chart.js finisce di disegnare
        const chartRendered = new Promise(resolve => {
            window.__chart = new window.Chart(ctx, {
                type: 'radar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Punteggio Rischio',
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
            // Fallback se l'animazione non parte
            if (!window.__chart.options.animation) {
                 resolve();
            }
        });

        // Attendiamo che il grafico sia completato (la promessa si risolve)
        await chartRendered; 

        const imgData = radarCanvas.toDataURL('image/png', 1.0); 
        const radarSize = 350;
        const xOffset = (pageWidth - radarSize) / 2;
        
        // Controllo di pagina prima di disegnare il grafico
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

        // **********************************************
        // ******* INIZIO LOGICA QUIZ COMPLETA **********
        // **********************************************
        
        doc.setFont("Helvetica", "bold");
        doc.setFontSize(14);
        doc.text("Le Tue Risposte Dettagliate al Quiz", margin, y);
        y += 18;

        // Estrai le risposte fornite in un formato per la tabella
        const tableData = resultData.quizDetails.map(item => [
            item.question,
            item.answer,
            item.score
        ]);

        // Impostazioni per la tabella
        doc.autoTable({
            startY: y,
            head: [['Domanda', 'Risposta Fornita', 'Punteggio']],
            body: tableData,
            theme: 'striped',
            headStyles: { 
                fillColor: [0, 51, 102], // Blu scuro 
                textColor: 255, 
                fontStyle: 'bold' 
            },
            styles: { 
                fontSize: 10, 
                lineColor: 200, 
                lineWidth: 0.5 
            },
            columnStyles: {
                0: { cellWidth: 200 }, // Larghezza Domanda
                1: { cellWidth: 150 }, // Larghezza Risposta
                2: { cellWidth: 70, halign: 'center' } // Larghezza Punteggio centrato
            },
            didDrawPage: function(data) {
                // Aggiorna y per sapere dove riprendere dopo la tabella
                y = data.cursor.y + 20;
            }
        });

        // Dopo la tabella, devi aggiornare la variabile 'y' in base all'ultima posizione
        y = doc.autoTable.previous.finalY + 20;

        doc.setDrawColor(200);
        doc.line(margin, y, pageWidth - margin, y);
        y += 20;

        // **********************************************
        // ********* FINE LOGICA QUIZ COMPLETA **********
        // **********************************************

        // --- Analisi e consigli personalizzati
        const analysisTexts = {
            "Basso rischio": "Il tuo rapporto con lo smartphone appare equilibrato. Sei un **utente consapevole** che utilizza la tecnologia come strumento senza esserne schiavo. La tua sfida non è eliminare l'uso, ma mantenere alta la guardia e continuare a migliorare l'efficienza d'uso per sfruttare la disconnessione come un vantaggio competitivo. **Consiglio:** Continua a monitorare i tuoi comportamenti, specialmente in momenti di stress, e utilizza le tue ore libere per attività profondamente rigeneranti (es. lettura, sport, hobby manuali).",
            "Rischio medio": "Il tuo comportamento digitale mostra **segnali chiari di potenziale dipendenza**. Hai sviluppato abitudini che stanno erodendo la tua concentrazione e il tuo tempo libero. Sei nel momento perfetto per agire con un piano mirato prima di scivolare nell'alto rischio e subire conseguenze più serie su sonno e relazioni. **La tua priorità è ristabilire i confini chiari** e applicare immediatamente le tecniche di disconnessione intenzionale che troverai nel piano d'azione. Agisci subito per riprendere il controllo del tuo tempo.",
            "Rischio alto": "Il tuo punteggio indica una **dipendenza digitale significativa**. Lo smartphone ha preso il controllo su sonno, relazioni e stati d'animo, ed è probabilmente diventato la tua via di fuga primaria da noia o ansia. Questo report segna l'inizio della ripresa del controllo. Richiede un **impegno serio** e l'applicazione immediata delle priorità definite, concentrandoti sulla sostituzione delle abitudini digitali con alternative offline che migliorino il tuo benessere fisico e mentale. Non sottovalutare l'impatto sul tuo benessere complessivo.",
        };

        doc.setFont("Helvetica", "bold");
        doc.setFontSize(14);
        doc.text("Analisi e consigli personalizzati", margin, y);
        y += 18;

        doc.setFont("Helvetica", "normal");
        const testoCorrente = analysisTexts[resultData.level];
        writeParagraphs(testoCorrente);
        y += 12;

        // ******************************************************
        // ***** SEZIONI EXTRA SOLO PER REPORT PREMIUM (7,99€) ** // ******************************************************
        if (isPremium) {
            // Aggiungi una nuova pagina prima del Piano d'Azione
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
                    doc.text(title, margin, y);
                    y += 16;

                    doc.setFont("Helvetica", "normal");
                    doc.setFontSize(12);
                    writeParagraphs(description);
                    y += 12;
                });
            }

            // --- Piano 7 giorni 
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

            // --- Risorse (NUOVA VERSIONE CON SPIEGAZIONI E FOOTER INTEGRATO)
            doc.setFont("Helvetica", "bold");
            doc.setFontSize(14);
            doc.text("Risorse consigliate", margin, y);
            y += 10; // Ridotto a 10px per far spazio

            // Testo HTML con le spiegazioni dettagliate
            const resourcesText = `
                <p><strong>App:</strong> Screen Time (iOS) / Digital Wellbeing (Android) per limitare le app.</p>
                
                <p><strong>Libri:</strong> 'Digital Minimalism' (Cal Newport), 'How to Break Up with Your Phone' (C. Price).</p>

                <div style="margin-top: 15px;">
                    <p><strong>Tecniche:</strong></p>
                    <ul style="margin-left: 20px;">
                        <li>**Pomodoro per il focus:** Metodo per suddividere il lavoro in intervalli di 25 minuti seguiti da brevi pause, utile per allenare la concentrazione senza il telefono.</li>
                        <li>**Blocchi Deep Work:** Dedicare lunghe sessioni (es. 90 min) di lavoro intensivo e senza distrazioni per ricostruire l'attenzione.</li>
                        <li>**Journaling serale per l'ansia:** Scrivere a mano pensieri e preoccupazioni prima di dormire, evitando di usare lo smartphone per placare l'irrequietezza.</li>
                    </ul>
                </div>
                
                <p><strong>Strumento:</strong> Sveglia tradizionale e orologio da polso per non dover guardare il telefono.</p>
            `;

            // Aggiungiamo il testo formattato al PDF usando doc.html()
            doc.setFontSize(10);
            doc.html(resourcesText, {
                x: margin,
                y: y,
                width: pageWidth - (2 * margin),
                callback: function (doc) {
                    // *** IL FOOTER E LA CHIUSURA VENGONO ESEGUITI QUI! ***
                    y = doc.previousAutoTable.finalY + 12; 
                    
                    // --- Footer
                    if (y > pageHeight - 60) { doc.addPage(); y = margin; }
                    doc.setDrawColor(200);
                    doc.line(margin, y, pageWidth - margin, y);
                    y += 16;
                    doc.setFontSize(10);
                    doc.text("Disclaimer: questo report ha scopo informativo e non sostituisce un consulto professionale.", margin, y);
                
                    // Salvataggio finale del REPORT PREMIUM
                    doc.save(`Report_Dipendenza_Digitale_Premium.pdf`);
                }
            });
            // IMPORTANTE: Usciamo qui per non eseguire la logica del report standard
            return; 
        } 
        
        // ******************************************************
        // ***** SEZIONE PER REPORT STANDARD (1,99€) ************ // ******************************************************
        
        // Messaggio di upsell nel report standard (1,99€)
        if (y + 100 > pageHeight - margin) { doc.addPage(); y = margin; }
        
        doc.setFont("Helvetica", "bold");
        doc.setFontSize(14);
        doc.setTextColor("#003366");
        doc.text("Upgrade a Premium", margin, y);
        y += 18;

        doc.setFont("Helvetica", "normal");
        doc.setFontSize(12);
        doc.setTextColor(0);
        writeParagraphs("Per sbloccare le tue 3 Priorità di Azione, il Piano 7 Giorni di Digital Detox, e le Risorse Dettagliate per la Disconnessione, effettua l'upgrade alla versione Premium.");
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

    // Esposizione delle funzioni all'oggetto globale per essere accessibili da index.html
    window.__DD__ = { 
        generatePDF, 
        getResult: () => resultData 
    };

})(window);
