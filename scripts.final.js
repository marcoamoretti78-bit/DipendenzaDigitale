// scripts.final.js - Dipendenza Digitale (final test mode)
document.addEventListener("DOMContentLoaded", () => {
   // --- INIZIO CODICE SPOSTATO DA HTML ---
    const link = document.getElementById('linkScopri');
    if (link) {
      link.addEventListener('click', function(e){
        e.preventDefault();
        window.location.assign('/scopri.html');
      });
    }
    // --- FINE CODICE SPOSTATO DA HTML ---
    
  const calcBtn = document.getElementById("calculateBtn");
  const resetBtn = document.getElementById("resetBtn");
  const paywall = document.getElementById("paywall");
  const userNameEl = document.getElementById("userName");

  // ----- Domande & Opzioni -----
  const questions = [
    "Controlli il telefono appena sveglio/a?",
    "Perdi la cognizione del tempo mentre scorri social o video?",
    "Interrompi attività importanti per controllare notifiche?",
    "Usi lo smartphone durante i pasti o in conversazioni dal vivo?",
    "Ti senti irritato/a o ansioso/a quando non puoi usare il telefono?",
    "Hai provato a ridurre l'uso dello smartphone senza riuscirci?",
    "Usi il telefono oltre l’orario previsto prima di dormire?",
    "Le tue relazioni hanno risentito dell’uso del telefono?",
    "Usi il telefono mentre cammini, guidi o fai attività rischiose?",
    "Controlli spesso il telefono anche senza notifiche reali?",
    "Ti distrai frequentemente a causa di social, giochi o chat?",
    "Ti senti in colpa per il tempo passato sullo smartphone?",
    "Metti lo smartphone in modalità silenziosa per 'isolarti'?",
    "Preferisci spesso lo smartphone ad attività sociali dal vivo?",
    "Ricevi feedback negativi da familiari/amici sul tuo uso del telefono?",
    "Usi lo smartphone per sfuggire a noia, stress o tristezza?",
    "Spendi soldi in app/abbonamenti in modo impulsivo?",
    "Hai disturbi del sonno legati all’uso serale del telefono?",
    "Ti agiti se ti separi dal telefono per alcune ore?",
    "Pensi spesso al telefono anche quando non lo stai usando?"
  ];
  const choices = [   
    { label: "Mai", value: 0 },
    { label: "Raramente", value: 1 },
    { label: "Spesso", value: 2 },
    { label: "Quasi sempre / Sempre", value: 3 }
  ];

  // Costruzione dinamica del quiz (evita duplicati)
  if (form) {
    form.innerHTML = "";
    questions.forEach((q, idx) => {
      const qWrap = document.createElement("div");
      qWrap.className = "question";
      qWrap.innerHTML = `<p>${idx + 1}. ${q}</p>`;

      const opts = document.createElement("div");
      opts.className = "options"; // stile verticale gestito da CSS

      choices.forEach((c, cidx) => {
        const id = `q${idx}_c${cidx}`;
        const row = document.createElement("label");
        row.innerHTML = `
          <input type="radio" name="q${idx}" id="${id}" value="${c.value}">
          <span>${c.label}</span>
        `;
        opts.appendChild(row);
      });

      qWrap.appendChild(opts);
      form.appendChild(qWrap);
    });
  }

  // ----- Stato risultato -----
  let resultData = null;

  // Utility: ottieni/crea un canvas per il grafico PDF
  function getPdfCanvas() {
    let c = document.getElementById("pdfChart");
    if (!c) {
      c = document.createElement("canvas");
      c.id = "pdfChart";
      c.width = 400;
      c.height = 400;
      c.style.position = "fixed";
      c.style.left = "-99999px";
      c.style.top = "-99999px";
      document.body.appendChild(c);
    }
    return c;
  }

  // ----- Calcolo quiz -----

// Sostituisci con (AGGIUNGI LA RIGA IN GRASSETTO):
calcBtn?.addEventListener("click", () => {
    // 1. Disabilita immediatamente il pulsante per prevenire doppi click/conflitti scroll
    if (calcBtn) calcBtn.disabled = true; // <-- AGGIUNTA

    // Inizia la logica del quiz
    let total = 0;
    // ... (il resto del codice)
        

        // Mappa da indice di domanda (0-19) al nome dell'asse del radar
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
            if (checked) {
                const val = parseInt(checked.value, 10);
                total += val;
                answered += 1;
                
                // Distribuzione dei punteggi per l'Asse Radar
                const axisName = finalAxisMap[idx];
                if (finalAxes[axisName]) {
                    finalAxes[axisName].push(val);
                }
            }
        });

        // Sostituisci con (AGGIUNGI LA RIGA IN GRASSETTO):
        if (answered < questions.length) {
            alert(`Hai tralasciato ${questions.length - answered} domanda/e. Completa il quiz.`);
            if (calcBtn) calcBtn.disabled = false; // <-- RIATTIVA qui
            return;
        }
        
        // Calcola la media per ogni Asse Radar (il valore da 0 a 3)
        const radarScores = {};
        let topScores = [];

        for (const [axis, scores] of Object.entries(finalAxes)) {
            // Calcola la media (risultato da 0 a 3)
            const average = scores.reduce((sum, val) => sum + val, 0) / scores.length;
            radarScores[axis] = parseFloat(average.toFixed(2));
            
            // Per identificare le priorità (TOP 3)
            const maxVal = scores.reduce((max, val) => Math.max(max, val), 0);
            if (maxVal > 1) { // Considera solo gli assi con punteggio 'Spesso' o 'Sempre'
                 topScores.push({ axis, score: average, maxResponse: maxVal });
            }
        }
        
        // Ordina e seleziona le 3 aree con il punteggio più alto
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
            top3Priorities,
            dateStr: new Date().toLocaleDateString("it-IT")
         };

       
         
    // Mostra paywall + bottone TEST (senza PayPal)
    paywall?.classList.remove("hidden");
    const container = document.getElementById("paypal-button-container");
    if (container) {
      container.innerHTML = "";
      const fakeBtn = document.createElement("button");
      fakeBtn.type = "button";
      fakeBtn.className = "btn primary";
      fakeBtn.textContent = "Scarica Report Premium (TEST)";
      fakeBtn.addEventListener("click", () => {
        alert(" Modalità test attiva – generazione report senza pagamento.");
        generatePDF();
      });
      container.appendChild(fakeBtn);
    }
    });
  
    // scroll al paywall
    if (paywall) window.scrollTo({ top: paywall.offsetTop, behavior: "smooth" });
  

  // ----- Reset -----
  resetBtn?.addEventListener("click", () => {
    document.querySelectorAll('input[type="radio"]').forEach(i => (i.checked = false));
    paywall?.classList.add("hidden");
    const container = document.getElementById("paypal-button-container");
    if (container) container.innerHTML = "";
    resultData = null;
  });

  // ----- PDF -----
  async function generatePDF() {
  if (!resultData) return;

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

  // ... (Continua dal blocco Risultato)

  doc.setFont("Helvetica", "normal");
  doc.setFontSize(12);
  doc.text(`Punteggio: ${resultData.total}/${resultData.maxScore}`, margin, y);
  y += 16;
  doc.text(`Rischio: ${resultData.percentage}% (${resultData.level})`, margin, y);
  y += 22;

// >>> INIZIO DEL NUOVO BLOCCO PROFILO UTENTE <<<
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
    "Rischio alto": "Sei un **utente dipendente**. Lo smartphone ha il controllo su sonno, relazioni e stati d'animo, e probabilmente è diventato la tua via di fuga primaria da noia o ansia. Questo report segna l'inizio della ripresa del controllo. Richiede un impegno serio e l'applicazione immediata delle priorità definite, concentrandoti sulla sostituzione delle abitudini digitali con alternative offline che migliorino il tuo benessere.",
  };

  const userProfile = profileTexts[resultData.level] || profileTexts["Rischio medio"];
  writeParagraphs(userProfile);
  y += 20;

// >>> INSERIMENTO DELLA LINEA DIVISORIA CHE TI MANCA <<<
  doc.setDrawColor(200);
  doc.line(margin, y, pageWidth - margin, y);
  y += 20;

  // --- Grafico a Radar (NUOVO)
        doc.setFont("Helvetica", "bold");
        doc.setFontSize(14);
        doc.text("Analisi dettagliata per Asse di Rischio", margin, y);
// ...
   y += 20; 
        const radarCanvas = getPdfCanvas(); // NOTA: Ho cambiato qui in getPdfCanvas()
        const ctx = radarCanvas.getContext("2d");
        if (window.__chart) window.__chart.destroy();
        
        // Raccogli i dati
        const labels = Object.keys(resultData.radarScores);
        const dataValues = Object.values(resultData.radarScores);
        const maxScoreAxis = 3;

        window.__chart = new Chart(ctx, {
            type: "radar",
            data: {
                labels: labels,
                datasets: [{
                    label: "Il Tuo Punteggio (Max 3)",
                    data: dataValues,
                    backgroundColor: 'rgba(0, 51, 102, 0.4)', // Colore tema
                    borderColor: '#003366',
                    borderWidth: 2,
                    pointBackgroundColor: '#22c55e' // Colore accento
                }]
            },
            options: { 
                animation: false, 
                responsive: false, 
                maintainAspectRatio: false,
                scales: {
                    r: {
                        angleLines: { display: true },
                        suggestedMin: 0,
                        suggestedMax: maxScoreAxis,
                        ticks: { stepSize: 1, display: false },
                        pointLabels: { font: { size: 10, weight: 'bold' } }
                    }
                },
                plugins: {
                    legend: { display: true, position: 'bottom' }
                }
            }
        });
        
        await new Promise(r => setTimeout(r, 200)); // Attendi il rendering
        
        const radarImgData = radarCanvas.toDataURL("image/png", 1.0);
        
        // Dimensione e centratura
        const radarSize = 350; 
        const radarX = (pageWidth - radarSize) / 2;
        doc.addImage(radarImgData, "PNG", radarX, y, radarSize, radarSize);

        y += radarSize + 30; // Spazio dopo il grafico
         // FORZIAMO NUOVA PAGINA DOPO IL GRAFICO
        doc.addPage();
        y = margin;

  // --- Helper per testo multi-paragrafo con gestione pagina
  const writeParagraphs = (text) => {
    // Imposta la dimensione font esplicitamente per aiutare splitTextToSize
    doc.setFontSize(12); 
    const maxTextWidth = pageWidth - margin * 2;
    const lineHeight   = 18;
    // Usa qualsiasi salto di riga (o doppio salto di riga) come separatore logico di blocco.
    const paragraphs   = String(text).split(/\n+/);
    paragraphs.forEach((p, i) => {
      const lines = doc.splitTextToSize(p, maxTextWidth);
      lines.forEach(line => {
        if (y + lineHeight > pageHeight - margin) { // Logica corretta
          doc.addPage();
          y = margin;
        }
        doc.text(line, margin, y);
        y += lineHeight;
      });
      // Spazio ridotto tra i paragrafi di analisi per non interferire col word-wrap
      if (i < paragraphs.length - 1) y += 8; 
    });
  };

  // --- Testi NUOVI (ESPANSIONE)
  const analysisTexts = {
    "Basso rischio":
      "Il tuo rapporto con lo smartphone appare equilibrato e sotto controllo. Le tue risposte indicano una **consapevolezza digitale matura** e una buona capacità di auto-regolazione. Mantieni questa consapevolezza come un patrimonio prezioso.\n\n" +
      "È fondamentale stabilire momenti “offline” durante la giornata (pasti, lavoro profondo, pre-sonno) e proteggere gli spazi di qualità con le persone care. **La prevenzione è la tua migliore strategia.** Continua a coltivare attività alternative – lettura, sport, tempo con amici e famiglia – per rinforzare le buone abitudini e assicurarti che la tecnologia resti un **utile strumento**, e non diventi mai un padrone. Evita soprattutto le 'zone grigie' come lo scrolling per noia o l'uso del telefono come primo e ultimo gesto della giornata.",

    "Rischio medio":
      "Il tuo comportamento digitale mostra **segnali chiari di potenziale dipendenza**, specialmente nelle aree più colpite nel tuo grafico radar. Lo smartphone sta iniziando a invadere momenti e spazi che dovrebbero essere dedicati ad altro.\n\n" +
      "Noti probabilmente che il telefono entra in momenti poco opportuni, influenzando concentrazione, sonno o relazioni. **Questo è il momento ideale per intervenire** prima che la situazione diventi critica e richieda supporto esterno. Devi impostare confini netti: definisci zone e orari liberi da telefono, limita l'uso di social e chat con timer e monitora l'uso settimanale con le app integrate nel tuo sistema operativo. Il tuo obiettivo deve essere la **disconnessione intenzionale** e non solo reattiva.",

    "Rischio alto":
      "Il tuo punteggio indica una **dipendenza digitale significativa**. L'uso dello smartphone sta impattando negativamente sul sonno, l'attenzione, la produttività e le relazioni. Il telefono è diventato il tuo **meccanismo principale di fuga** da noia, stress o ansia, creando un circolo vizioso dannoso.\n\n" +
      "È necessario un intervento immediato e rigoroso: programma finestre di **disconnessione totale** (30–60 minuti al giorno), disattiva *tutte* le notifiche non essenziali e applica regole chiare e non negoziabili per la sera. Se noti che il tuo lavoro, studio o i legami personali ne risentono gravemente, considera seriamente di valutare il supporto di uno specialista in dipendenze comportamentali. La priorità è **riprendere il controllo della tua vita**.",
  };
  // --- Analisi (TITOLO una sola volta + testo NUOVO)
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(14);
  doc.text("Analisi e consigli personalizzati", margin, y);
  y += 18;

  doc.setFont("Helvetica", "normal");
  doc.setFontSize(12);
  const testoCorrente = analysisTexts[resultData.level];
  writeParagraphs(testoCorrente);
        y += 12;

        // FORZIAMO NUOVA PAGINA DOPO L'ANALISI TESTUALE (PAGINA 3 -> 4)
        doc.addPage();
        y = margin;
        // --- SEZIONE: LE TUE 3 PRIORITÀ (SOSTITUISCE CHECKLIST)
        
        // Controllo pagina prima della nuova sezione

        doc.setFont("Helvetica", "bold");
        doc.setFontSize(16);
        doc.setTextColor("#003366"); // Usa il colore primario
        doc.text("Il Tuo Piano di Azione Prioritario", margin, y);
        y += 20;

        doc.setFont("Helvetica", "normal");
        doc.setFontSize(12);
        doc.setTextColor(0); // Colore nero
        
        const priorityDescriptions = {
            'Sonno e Rituali': 'Attiva la modalità "Non Disturbare" alle 22:00 e lascia il telefono fuori dalla camera da letto. La qualità del sonno è la tua priorità assoluta.',
            'Fuga ed Emozioni': 'Non usare il telefono per fuggire dalla noia. Quando senti l\'impulso, fai 5 respiri profondi e trova un\'alternativa offline (libro, camminata).',
            'Attenzione e Produttività': 'Usa l\'app Digital Wellbeing (o Screen Time) per limitare le app che rubano la tua attenzione (es. 30 minuti al giorno). Disattiva tutte le notifiche non essenziali.',
            'Relazioni e Socialità': 'Istituisci "Zone senza Telefono" chiare: a tavola e durante le conversazioni faccia a faccia. Dai la priorità al tuo ambiente sociale reale.',
            'Controllo e Tempo': 'Utilizza timer di 30 minuti (Tecnica Pomodoro) per l\'uso dei social media. Monitora il tuo tempo totale settimanale e imponiti un obiettivo di riduzione del 15%.'
        };
        
        if (resultData.top3Priorities.length === 0) {
             writeParagraphs("Non sono state identificate priorità di rischio " +
                 "specifiche (punteggio basso). Passa direttamente al Piano 7 giorni.");
        } else {
            resultData.top3Priorities.forEach((p, index) => {
                const title = `PRIORITÀ #${index + 1}: ${p.axis}`;
                const description = priorityDescriptions[p.axis] || "Azioni specifiche non definite. Controlla la sezione Piano 7 giorni.";
                
                // Titolo della priorità
                doc.setFont("Helvetica", "bold");
                doc.setFontSize(13);
                doc.text(title, margin, y);
                y += 16;
                
                // Descrizione azione
                doc.setFont("Helvetica", "normal");
                doc.setFontSize(12);
                writeParagraphs(description);
                y += 12; 
            });
        }
        
        // NOTA: il blocco 'Piano 7 giorni di Digital Detox' DEVE SEGUIRE QUI.
 
  // --- Piano 7 giorni
  
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(14);
  doc.text("Piano 7 giorni di Digital Detox", margin, y);
  y += 18;

  doc.setFont("Helvetica", "normal");
  const plan7 = [
    "Giorno 1 – Monitora: annota il tempo per app.",
    "Giorno 2 – Notifiche: disattiva quelle non essenziali.",
    "Giorno 3 – Zona libera: scegli un’area di casa senza smartphone.",
    "Giorno 4 – Sonno: stop telefono 60’ prima di dormire.",
    "Giorno 5 – Socialità: 2 ore con amici/famiglia senza telefono.",
    "Giorno 6 – Movimento: camminata o sport senza telefono.",
    "Giorno 7 – Revisione: valuta progressi e prossimi passi."
  ];
  writeParagraphs(plan7.map(i => "• " + i).join("\n"));
  y += 12;
  // --- Risorse
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(14);
  doc.text("Risorse consigliate", margin, y);
  y += 18;

  doc.setFont("Helvetica", "normal");
  const resources = [
    "Screen Time (iOS) / Digital Wellbeing (Android).",
    "Libri: 'Digital Minimalism' (Cal Newport), 'How to Break Up with Your Phone' (C. Price).",
    "Tecniche: Pomodoro, blocchi Deep Work, journaling serale."
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
  
  // Esport per debugging
  window.__DD__ = { generatePDF, getResult: () => resultData };
  
});

  

          


 

   
