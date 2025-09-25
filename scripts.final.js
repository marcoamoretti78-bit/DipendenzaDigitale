// scripts.js - Dipendenza Digitale (final test mode)
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("quizForm");
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
  calcBtn?.addEventListener("click", () => {
    let total = 0;
    let answered = 0;
    const distribution = { low: 0, mid: 0, high: 0 };

    questions.forEach((_, idx) => {
      const checked = document.querySelector(`input[name="q${idx}"]:checked`);
      if (checked) {
        const val = parseInt(checked.value, 10);
        total += val;
        answered += 1;
        if (val <= 1) distribution.low += 1;
        else if (val === 2) distribution.mid += 1;
        else distribution.high += 1;
      }
    });

    if (answered < questions.length) {
      alert(`Hai tralasciato ${questions.length - answered} domanda/e. Completa il quiz.`);
      return;
    }

    const maxScore = questions.length * 3;
    const percentage = Math.round((total / maxScore) * 100);
    let level = "";
    if (percentage < 33) level = "Basso rischio";
    else if (percentage < 67) level = "Rischio medio";
    else level = "Rischio alto";

    resultData = {
      name: (userNameEl?.value || "").trim(),
      total, maxScore, percentage, level, answered,
      distribution,
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
        alert("⚡ Modalità test attiva – generazione report senza pagamento.");
        generatePDF();
      });
      container.appendChild(fakeBtn);
    }

    // scroll al paywall
    if (paywall) window.scrollTo({ top: paywall.offsetTop, behavior: "smooth" });
  });

  // ----- Reset -----
  resetBtn?.addEventListener("click", () => {
    document.querySelectorAll('input[type="radio"]').forEach(i => (i.checked = false));
    paywall?.classList.add("hidden");
    const container = document.getElementById("paypal-button-container");
    if (container) container.innerHTML = "";
    resultData = null;
  });

  // ----- PDF -----
  // ----- PDF -----
async function generatePDF() {
  if (!resultData) return;
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 40;
  let y = margin;

  // Branding: titolo + versione + nome
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(28);
  doc.text("Report personalizzato", margin, y);
doc.setFont("Helvetica", "normal");
doc.setFontSize(10);
doc.text("Build v6", pageWidth - margin - 60, margin);
y += 36;

// 🔴 Debug temporaneo
doc.setFont("Helvetica", "italic");
doc.setFontSize(14);
doc.text("TEST FRASE NUOVA - vFinal", margin, y);
y += 20;


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

  // Risultato
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(14);
  doc.text("Risultato", margin, y);
  y += 18;

  doc.setFont("Helvetica", "normal");
  doc.text(`Punteggio: ${resultData.total}/${resultData.maxScore}`, margin, y);
  y += 16;
  doc.text(`Rischio: ${resultData.percentage}% (${resultData.level})`, margin, y);
  y += 22;

  // Grafico a torta
  const chartCanvas = document.getElementById("pdfChart");
  const ctx = chartCanvas.getContext("2d");
  if (window.__chart) window.__chart.destroy();
  window.__chart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Basso (0–1)", "Medio (2)", "Alto (3)"],
      datasets: [{
        data: [resultData.distribution.low, resultData.distribution.mid, resultData.distribution.high]
      }]
    },
    options: { animation: false, responsive: false }
  });

  await new Promise(r => setTimeout(r, 200));
  const imgData = chartCanvas.toDataURL("image/png", 1.0);
  const maxWidth = pageWidth - margin * 2;
  doc.addImage(imgData, "PNG", margin, y, maxWidth, 0);
  y += maxWidth + 30;

  // Helper testo a capo
  const wrap = (text, x, startY, lineHeight = 16) => {
    const maxWidth = pageWidth - margin * 2;
    const paragraphs = String(text).split(/\n\n/);
    paragraphs.forEach((p, i) => {
      const lines = doc.splitTextToSize(p, maxWidth);
      lines.forEach(line => { doc.text(line, x, startY); startY += lineHeight; });
      if (i < paragraphs.length - 1) startY += lineHeight;
    });
    return startY;
  };

  // --- Frasi nuove ---
  const analysisTexts = {
    "Basso rischio":
      "✅ Il tuo rapporto con lo smartphone appare equilibrato e sotto controllo.\n\n" +
      "Mantenere questa consapevolezza è fondamentale: stabilisci momenti “offline” durante la giornata (pasti, lavoro profondo, pre-sonno) e proteggi gli spazi di qualità con le persone.\n\n" +
      "Coltiva attività alternative – lettura, sport, tempo con amici e famiglia – per rinforzare le buone abitudini.",

    "Rischio medio":
      "⚠️ Il tuo comportamento digitale mostra alcuni segnali di potenziale dipendenza.\n\n" +
      "Probabilmente lo smartphone tende a entrare in momenti poco opportuni, influenzando concentrazione, sonno o relazioni.\n\n" +
      "È il momento giusto per intervenire: imposta zone/orari liberi da telefono, limita social e chat con timer e monitora l’uso settimanale.",

    "Rischio alto":
      "🚨 Il punteggio indica una dipendenza digitale significativa.\n\n" +
      "L’uso dello smartphone sta impattando sonno, attenzione, produttività o relazioni.\n\n" +
      "Agisci subito: programma finestre di disconnessione totale (30–60 minuti al giorno), disattiva notifiche non essenziali e applica regole chiare per la sera.\n\n" +
      "Se noti che lavoro, studio o legami personali ne risentono, valuta il supporto di uno specialista."
  };

  const checklist = [
    "Spegni le notifiche non essenziali per alcune ore al giorno.",
    "Stabilisci zone senza telefono (camera da letto, tavola).",
    "Usa timer per limitare social e intrattenimento.",
    "Stacca dallo schermo almeno 60 minuti prima di dormire.",
    "Organizza attività offline che ti piacciono (sport, lettura, amici)."
  ];  window.__analysisTexts = analysisTexts;


  const plan7 = [
    "Giorno 1 – Monitora: annota il tempo per app.",
    "Giorno 2 – Notifiche: disattiva quelle non essenziali.",
    "Giorno 3 – Zona libera: scegli un’area di casa senza smartphone.",
    "Giorno 4 – Sonno: stop telefono 60’ prima di dormire.",
    "Giorno 5 – Socialità: 2 ore con amici/famiglia senza telefono.",
    "Giorno 6 – Movimento: camminata o sport senza telefono.",
    "Giorno 7 – Revisione: valuta progressi e prossimi passi."
  ];

  const resources = [
    "Screen Time (iOS) / Digital Wellbeing (Android).",
    "Libri: 'Digital Minimalism' (Cal Newport), 'How to Break Up with Your Phone' (C. Price).",
    "Tecniche: Pomodoro, blocchi Deep Work, journaling serale."
  ];

  // Analisi personalizzata
  doc.setFont("Helvetica", "bold");
  doc.text("Analisi e consigli personalizzati", margin, y);
  y += 18;
  doc.setFont("Helvetica", "normal");
  console.log("DEBUG livello:", resultData.level);
console.log("DEBUG testo:", analysisTexts[resultData.level]);
 y = wrap(analysisTexts[resultData.level], margin, y);

  y += 12;
  doc.setFont("Helvetica", "bold");
  doc.text("Checklist pratica", margin, y);
  y += 18;
  doc.setFont("Helvetica", "normal");
  y = wrap(checklist.map(i => "• " + i).join("\n"), margin, y);

  if (y > 680) { doc.addPage(); y = 40; }
  doc.setFont("Helvetica", "bold");
  doc.text("Piano 7 giorni di Digital Detox", margin, y);
  y += 18;
  doc.setFont("Helvetica", "normal");
  y = wrap(plan7.map(i => "• " + i).join("\n"), margin, y);

  y += 12;
  doc.setFont("Helvetica", "bold");
  doc.text("Risorse consigliate", margin, y);
  y += 18;
  doc.setFont("Helvetica", "normal");
  y = wrap(resources.map(i => "• " + i).join("\n"), margin, y);

  // Footer
  if (y > 750) { doc.addPage(); y = 40; }
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

  

          


 

   
