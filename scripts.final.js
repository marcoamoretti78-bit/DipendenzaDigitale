// scripts.final.js - Dipendenza Digitale (final test mode) - VERSIONE 4.0 (PDF Grafico e Testi Completi)
document.addEventListener("DOMContentLoaded", () => {
    // --- Variabili Globali e Link Handler ---
    const link = document.getElementById('linkScopri');
    if (link) {
        link.addEventListener('click', function(e){
            e.preventDefault();
            console.log("Navigazione a /scopri.html simulata.");
        });
    }

    const form = document.getElementById("quizForm");
    const calcBtn = document.getElementById("calculateBtn");
    const resetBtn = document.getElementById("resetBtn");
    const paywall = document.getElementById("paywall");
    const userNameEl = document.getElementById("userName");

    // Definizioni di domande e opzioni
    const questions = [
        "Controlli il telefono appena sveglio/a?", "Perdi la cognizione del tempo mentre scorri social o video?", "Interrompi attività importanti per controllare notifiche?", "Usi lo smartphone durante i pasti o in conversazioni dal vivo?", "Ti senti irritato/a o ansioso/a quando non puoi usare il telefono?", "Hai provato a ridurre l'uso dello smartphone senza riuscirci?", "Usi il telefono oltre l’orario previsto prima di dormire?", "Le tue relazioni hanno risentito dell’uso del telefono?", "Usi il telefono mentre cammini, guidi o fai attività rischiose?", "Controlli spesso il telefono anche senza notifiche reali?", "Ti distrai frequentemente a causa di social, giochi o chat?", "Ti senti in colpa per il tempo passato sullo smartphone?", "Metti lo smartphone in modalità silenziosa per 'isolarti'?", "Preferisci spesso lo smartphone ad attività sociali dal vivo?", "Ricevi feedback negativi da familiari/amici sul tuo uso del telefono?", "Usi lo smartphone per sfuggire a noia, stress o tristezza?", "Spendi soldi in app/abbonamenti in modo impulsivo?", "Hai disturbi del sonno legati all’uso serale del telefono?", "Ti agiti se ti separi dal telefono per alcune ore?", "Pensi spesso al telefono anche quando non lo stai usando?"
    ];
    const choices = [
        { label: "Mai", value: 0 },
        { label: "Raramente", value: 1 },
        { label: "Spesso", value: 2 },
        { label: "Quasi sempre / Sempre", value: 3 }
    ];

    // Costruzione dinamica del quiz
    if (form) {
        form.innerHTML = "";
        questions.forEach((q, idx) => {
            const qWrap = document.createElement("div");
            qWrap.className = "question";
            qWrap.innerHTML = `<p>${idx + 1}. ${q}</p>`;
            const opts = document.createElement("div");
            opts.className = "options"; 
            choices.forEach((c, cidx) => {
                const id = `q${idx}_c${cidx}`;
                const row = document.createElement("label");
                row.innerHTML = `<input type="radio" name="q${idx}" id="${id}" value="${c.value}"><span>${c.label}</span>`;
                opts.appendChild(row);
            });
            qWrap.appendChild(opts);
            form.appendChild(qWrap);
        });
    }

    let resultData = null;

    // Utility: ottieni/crea un canvas per il grafico PDF
    function getPdfCanvas() {
        let c = document.getElementById("pdfChart");
        if (!c) {
            c = document.createElement("canvas");
            c.id = "pdfChart";
            c.width = 400; c.height = 400;
            c.style.position = "fixed"; c.style.left = "-99999px"; c.style.top = "-99999px";
            document.body.appendChild(c);
        }
        return c;
    }

    // ----- Calcolo quiz (LOGICA COMPLETA) -----

    calcBtn?.addEventListener("click", () => {
        if (calcBtn) calcBtn.disabled = true;

        let total = 0;
        let answered = 0;

        const maxScoresAxes = {
            'Sonno e Rituali': 0,
            'Fuga ed Emozioni': 0,
            'Attenzione e Produttività': 0,
            'Relazioni e Socialità': 0,
            'Controllo e Tempo': 0,
        };

        const finalAxisMap = {
            0: 'Sonno e Rituali', 1: 'Attenzione e Produttività', 2: 'Attenzione e Produttività', 3: 'Relazioni e Socialità',
            4: 'Relazioni e Socialità', 5: 'Fuga ed Emozioni', 6: 'Sonno e Rituali', 7: 'Sonno e Rituali',
            8: 'Relazioni e Socialità', 9: 'Attenzione e Produttività', 10: 'Controllo e Tempo', 11: 'Fuga ed Emozioni',
            12: 'Fuga ed Emozioni', 13: 'Relazioni e Socialità', 14: 'Relazioni e Socialità', 15: 'Fuga ed Emozioni',
            16: 'Attenzione e Produttività', 17: 'Controllo e Tempo', 18: 'Controllo e Tempo', 19: 'Controllo e Tempo',
        };
        const finalAxes = {
            'Sonno e Rituali': [],
            'Fuga ed Emozioni': [],
            'Attenzione e Produttività': [],
            'Relazioni e Socialità': [],
            'Controllo e Tempo': [],
        };

        questions.forEach((_, idx) => {
            const checked = document.querySelector(`input[name="q${idx}"]:checked`);
            const axisName = finalAxisMap[idx];

            if (maxScoresAxes[axisName] !== undefined) {
                 maxScoresAxes[axisName] += 3;
            }

            if (checked) {
                const val = parseInt(checked.value, 10);
                total += val;
                answered += 1;

                if (finalAxes[axisName]) {
                    finalAxes[axisName].push(val);
                }
            }
        });

        if (answered < questions.length) {
            alert(`Hai tralasciato ${questions.length - answered} domanda/e. Completa il quiz.`);
            if (calcBtn) calcBtn.disabled = false;
            return;
        }

        const radarScores = {};
        const impactScores = {};
        let topScores = [];

        for (const [axis, scores] of Object.entries(finalAxes)) {
            const average = scores.reduce((sum, val) => sum + val, 0) / scores.length;
            radarScores[axis] = parseFloat(average.toFixed(2));

            const totalAxisScore = scores.reduce((sum, val) => sum + val, 0);
            const maxAxisScore = maxScoresAxes[axis];
            const impactPercentage = Math.round((totalAxisScore / maxAxisScore) * 100);
            impactScores[axis] = impactPercentage; 

            const maxVal = scores.reduce((max, val) => Math.max(max, val), 0);
            if (maxVal > 1) { 
                 topScores.push({ axis, score: average, maxResponse: maxVal });
            }
        }

        topScores.sort((a, b) => b.score - a.score);
        const top3Priorities = topScores.slice(0, 3);

        const maxScore = questions.length * 3;
        const percentage = Math.round((total / maxScore) * 100);
        let level = "";
        if (percentage < 33) level = "Basso rischio";
        else if (percentage < 67) level = "Rischio medio";
        else level = "Rischio alto";

        resultData = {
            name: (userNameEl?.value || "").trim(),
            total, maxScore, percentage, level, answered,
            radarScores,
            impactScores, 
            top3Priorities,
            dateStr: new Date().toLocaleDateString("it-IT")
           };


        // Mostra paywall + pulsanti di scelta/upsell
        paywall?.classList.remove("hidden");
        const container = document.getElementById("paypal-button-container");

        if (container) {
            container.innerHTML = ""; // Pulisci il container

            // 1. BLOCCO UPSELL PREMIUM (7,99 €)
            const premiumWrap = document.createElement("div");
            premiumWrap.className = "upsell-option premium"; 
            premiumWrap.innerHTML = `
                <h3>Sblocca l'Upgrade Premium (7,99 €)</h3>
                <p>Ricevi il Report Dettagliato, il Piano d'Azione esteso a 30 giorni e il Kit di Strumenti di Monitoraggio.</p>
            `;
            const premiumBtn = document.createElement("button");
            premiumBtn.type = "button";
            premiumBtn.className = "btn primary large"; // CLASSE VERDE (primary) e grande
            premiumBtn.textContent = "Acquista Upgrade Completo (TEST 7,99 €)";
            premiumBtn.addEventListener("click", () => {
                 alert("Modalità test attiva – Prodotto: Upgrade 30 Giorni (7,99 €).");
                 // Esecuzione della funzione PDF al click del 7,99€
                 generatePDF(); 
            });
            premiumWrap.appendChild(premiumBtn);
            container.appendChild(premiumWrap);
            
            // 2. BLOCCO REPORT STANDARD (1,99 €)
            const standardWrap = document.createElement("div");
            standardWrap.className = "upsell-option standard";
            standardWrap.innerHTML = `
                <p>O scegli di scaricare solo la versione standard del report (1,99 €).</p>
            `;
            const standardBtn = document.createElement("button");
            standardBtn.type = "button";
            standardBtn.className = "btn primary small"; // CLASSE VERDE (primary) e piccola
            standardBtn.textContent = "Scarica Report Standard (TEST 1,99 €)";
            standardBtn.addEventListener("click", () => {
                alert("Modalità test attiva – Prodotto: Report Base (1,99 €).");
                // Esecuzione della funzione PDF al click del 1,99€
                generatePDF();
            });
            standardWrap.appendChild(standardBtn);
            container.appendChild(standardWrap);
        }
        
        if (paywall) window.scrollTo({ top: paywall.offsetTop, behavior: "smooth" });
    });


    // ----- Reset (LOGICA COMPLETA) -----
    resetBtn?.addEventListener("click", () => {
        document.querySelectorAll('input[type="radio"]').forEach(i => (i.checked = false));
        paywall?.classList.add("hidden");
        const container = document.getElementById("paypal-button-container");
        if (container) container.innerHTML = "";
        resultData = null;
        if (calcBtn) calcBtn.disabled = false; // Riattiva il pulsante
    });

    // ----- PDF (Logica COMPLETA per Grafico e Testi) -----
    async function generatePDF() {
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

        // Disegna il grafico sul canvas nascosto
        window.__chart = new window.Chart(ctx, {
            type: 'radar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Punteggio Rischio',
                    data: dataPoints,
                    backgroundColor: 'rgba(34, 197, 94, 0.2)', // Verde tenue
                    borderColor: 'rgba(34, 197, 94, 1)',
                    pointBackgroundColor: 'rgba(34, 197, 94, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(34, 197, 94, 1)'
                }]
            },
            options: {
                scales: {
                    r: {
                        angleLines: { display: false },
                        suggestedMin: 0,
                        suggestedMax: 3, // Punteggio massimo per domanda
                        pointLabels: { font: { size: 10 } },
                        ticks: { display: false }
                    }
                },
                plugins: {
                    legend: { display: false }
                }
            }
        });

        // Attendi che Chart.js abbia finito il disegno (importante!)
        await new Promise(resolve => setTimeout(resolve, 500));

        // Converte il canvas in immagine e la aggiunge al PDF
        const imgData = radarCanvas.toDataURL('image/png');
        const radarSize = 350;
        const xOffset = (pageWidth - radarSize) / 2;
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

        // --- Analisi e consigli personalizzati (TESTI COMPLETI)
        const analysisTexts = {
            "Basso rischio": "Il tuo rapporto con lo smartphone appare equilibrato. Sei un **utente consapevole** che utilizza la tecnologia come strumento senza esserne schiavo. La tua sfida non è eliminare l'uso, ma mantenere alta la guardia e continuare a migliorare l'efficienza d'uso per sfruttare la disconnessione come un vantaggio competitivo. **Consiglio:** Continua a monitorare i tuoi comportamenti, specialmente in momenti di stress, e utilizza le tue ore libere per attività profondamente rigeneranti (es. lettura, sport, hobby manuali).",
            "Rischio medio": "Il tuo comportamento digitale mostra **segnali chiari di potenziale dipendenza**. Hai sviluppato abitudini che stanno erodendo la tua concentrazione, la qualità del sonno e il tempo libero speso in modo significativo. Sei nel momento perfetto per agire con un piano mirato prima di scivolare nell'alto rischio e subire conseguenze più serie su sonno e relazioni. **La tua priorità è ristabilire i confini chiari** e applicare immediatamente le tecniche di disconnessione intenzionale che troverai nel piano d'azione. Agisci subito per riprendere il controllo del tuo tempo.",
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
        // --- Risorse
        doc.setFont("Helvetica", "bold");
        doc.setFontSize(14);
        doc.text("Risorse consigliate", margin, y);
        y += 18;

        doc.setFont("Helvetica", "normal");
        const resources = [
            "Screen Time (iOS) / Digital Wellbeing (Android) per limitare le app.",
            "Libri: 'Digital Minimalism' (Cal Newport), 'How to Break Up with Your Phone' (C. Price).",
            "Tecniche: Pomodoro per il focus, blocchi Deep Work, journaling serale per l'ansia.",
            "Strumento: Sveglia tradizionale e orologio da polso per non dover guardare il telefono."
        ];
        writeParagraphs(resources.map(i => "• " + i).join("\n"));

        // --- Footer
        if (y > pageHeight - 60) { doc.addPage(); y = margin; }
        doc.setDrawColor(200);
        doc.line(margin, y, pageWidth - margin, y);
        y += 16;
        doc.setFontSize(10);
        doc.text("Disclaimer: questo report ha scopo informativo e non sostituisce un consulto professionale.", margin, y);

        doc.save("Report_Dipendenza_Digitale.pdf");
    }

    window.__DD__ = { generatePDF, getResult: () => resultData };
});
    
