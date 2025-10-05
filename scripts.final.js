// scripts.final.js - Dipendenza Digitale (final test mode) - VERSIONE 4.0 (PDF Grafico e Testi Completi)
document.addEventListener("DOMContentLoaded", () => {
    // --- Variabili Globali e Link Handler (Non modificate) ---
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

    // Definizioni di domande e opzioni (non modificate)
    const questions = [
        "Controlli il telefono appena sveglio/a?", "Perdi la cognizione del tempo mentre scorri social o video?", "Interrompi attività importanti per controllare notifiche?", "Usi lo smartphone durante i pasti o in conversazioni dal vivo?", "Ti senti irritato/a o ansioso/a quando non puoi usare il telefono?", "Hai provato a ridurre l'uso dello smartphone senza riuscirci?", "Usi il telefono oltre l’orario previsto prima di dormire?", "Le tue relazioni hanno risentito dell’uso del telefono?", "Usi il telefono mentre cammini, guidi o fai attività rischiose?", "Controlli spesso il telefono anche senza notifiche reali?", "Ti distrai frequentemente a causa di social, giochi o chat?", "Ti senti in colpa per il tempo passato sullo smartphone?", "Metti lo smartphone in modalità silenziosa per 'isolarti'?", "Preferisci spesso lo smartphone ad attività sociali dal vivo?", "Ricevi feedback negativi da familiari/amici sul tuo uso del telefono?", "Usi lo smartphone per sfuggire a noia, stress o tristezza?", "Spendi soldi in app/abbonamenti in modo impulsivo?", "Hai disturbi del sonno legati all’uso serale del telefono?", "Ti agiti se ti separi dal telefono per alcune ore?", "Pensi spesso al telefono anche quando non lo stai usando?"
    ];
    const choices = [
        { label: "Mai", value: 0 },
        { label: "Raramente", value: 1 },
        { label: "Spesso", value: 2 },
        { label: "Quasi sempre / Sempre", value: 3 }
    ];

    // Costruzione dinamica del quiz (non modificata)
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

    // Utility: ottieni/crea un canvas per il grafico PDF (non modificata)
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

    // ----- Calcolo quiz (non modificato) -----
    calcBtn?.addEventListener("click", () => {
        // ... Logica di calcolo (omessa per brevità, è nel tuo file)
        
        // ... (Logica di calcolo dei punteggi e risultato finale in resultData) ...

        // ... (Mostra Paywall e pulsanti di acquisto - non modificato) ...
    });

    // ----- Reset (non modificato) -----
    resetBtn?.addEventListener("click", () => {
        // ... Logica di reset (omessa per brevità)
    });

    // ----- PDF (Logica COMPLETA e Corretta) -----
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

        // --- Logica PDF (Header, Risultato, Benchmark, Profilo...) (non modificata) ---
        // ... (Il codice che hai incollato e che funzionava è qui) ...
        
        // --- Header e Risultato (omesso per brevità, è corretto nel tuo file) ---

        // --- Profilo Utente (corretto nel tuo file) ---
        
        // **********************************************
        // ******* INIZIO LOGICA GRAFICO RADAR **********
        // **********************************************
        
        doc.setDrawColor(200);
        doc.line(margin, y, pageWidth - margin, y);
        y += 20;

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

        // --- Riepilogo Punteggi di Impatto Dettagliati (corretto nel tuo file) ---

        // **********************************************
        // ******* INIZIO LOGICA TESTI CORRETTI *********
        // **********************************************
        
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

        // --- Continuazione Logica PDF (Piano di Azione, Piano 7 giorni, Risorse...) (non modificata) ---
        // ... (Il resto è come nel tuo file e non richiede modifiche) ...

        doc.save("Report_Dipendenza_Digitale.pdf");
    }

    window.__DD__ = { generatePDF, getResult: () => resultData };
});
