// --- DOMANDE ---
const questions = [
  "Controlli il telefono appena sveglio/a?",
  "Ti capita di perdere la cognizione del tempo mentre sei al telefono?",
  "Interrompi attività importanti (studio, lavoro) per controllare notifiche?",
  "Usi lo smartphone durante i pasti o mentre sei con altre persone?",
  "Ti senti irritato/a o ansioso/a quando non puoi usare il telefono?",
  "Hai provato a ridurre l'uso dello smartphone senza riuscirci?",
  "Usi il telefono oltre l’orario previsto prima di dormire?",
  "Le tue relazioni hanno risentito dell’uso del telefono?",
  "Ti capita di usare il telefono mentre cammini, guidi o fai attività rischiose?",
  "Controlli spesso il telefono anche senza notifiche reali?",
  "Ti distrai frequentemente a causa di social, giochi o chat?",
  "Ti senti in colpa per il tempo passato sullo smartphone?",
  "Metti lo smartphone in modalità silenziosa per 'isolarti'?",
  "Ti capita di preferire lo smartphone a un’attività sociale dal vivo?",
  "Hai ricevuto feedback negativi da familiari/amici sul tuo uso del telefono?",
  "Usi lo smartphone per sfuggire a emozioni spiacevoli (noia, stress, tristezza)?",
  "Ti capita di spendere soldi in app/abbonamenti impulsivamente?",
  "Hai disturbi del sonno legati all’uso serale del telefono?",
  "Ti senti agitato/a se ti separi dal telefono per alcune ore?",
  "Pensi spesso al telefono anche quando non lo stai usando?"
];
const choices = [
  { label: "Mai", value: 0 },
  { label: "Raramente", value: 1 },
  { label: "Spesso", value: 2 },
  { label: "Quasi sempre / Sempre", value: 3 }
];

// --- GENERAZIONE QUIZ ---
const form = document.getElementById("quizForm");
questions.forEach((q, idx) => {
  const qWrap = document.createElement("div");
  qWrap.className = "question";
  qWrap.innerHTML = `<h3>${idx + 1}. ${q}</h3>`;

  const opts = document.createElement("div");
  opts.className = "options";
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

// --- CALCOLO E PAYWALL ---
const calcBtn = document.getElementById("calculateBtn");
const resetBtn = document.getElementById("resetBtn");
const paywall = document.getElementById("paywall");
const userNameEl = document.getElementById("userName");

let resultData = null; // salveremo qui risultato e distribuzione
let pdfChartInstance = null;

calcBtn.addEventListener("click", () => {
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
    name: (userNameEl.value || "").trim(),
    total, maxScore, percentage, level, answered,
    distribution,
    dateStr: new Date().toLocaleDateString("it-IT")
  };

  // Mostra paywall e render PayPal button
  paywall.classList.remove("hidden");
  renderPaypal();
});

resetBtn.addEventListener("click", () => {
  document.querySelectorAll('input[type="radio"]').forEach(i => i.checked = false);
  paywall.classList.add("hidden");
  resultData = null;
});

// --- PAYPAL ---
function renderPaypal() {
  // Evita di renderizzare due volte i pulsanti
  const container = document.getElementById("paypal-button-container");
  container.innerHTML = "";

  if (!window.paypal || !paypal.Buttons) {
    container.innerHTML = "<p>Impossibile caricare PayPal. Riprova tra poco.</p>";
    return;
  }

  paypal.Buttons({
    style: { layout: 'vertical', color: 'gold', shape: 'rect', label: 'paypal' },
    createOrder: (data, actions) => {
      return actions.order.create({
        purchase_units: [{
          amount: { currency_code: "EUR", value: "1.99" },
          description: "Report Premium – Dipendenza Digitale"
        }]
      });
    },
    onApprove: (data, actions) => {
      return actions.order.capture().then(function(details) {
        // Pagamento riuscito → genera PDF
        generatePDF();
      });
    },
    onError: (err) => {
      alert("Pagamento non completato. Riprova.");
      console.error(err);
    }
  }).render('#paypal-button-container');
}

// --- PDF ---
async function generatePDF() {
  if (!resultData) return;
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 40;
  let y = margin;

  // Copertina
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(18);
  doc.text("Report personalizzato – Dipendenza Digitale", margin, y);
  y += 26;
  doc.setFont("Helvetica", "normal");
  const who = resultData.name ? `per ${resultData.name}` : "";
  doc.text(`${who}`.trim(), margin, y);
  y += 18;
  doc.text(`Data: ${resultData.dateStr}`, margin, y);
  y += 20;
  doc.setDrawColor(200);
  doc.line(margin, y, pageWidth - margin, y);
  y += 20;

  // Risultato
  doc.setFont("Helvetica", "bold");
  doc.text("Risultato", margin, y);
  y += 18;
  doc.setFont("Helvetica", "normal");
  doc.text(`Punteggio: ${resultData.total}/${resultData.maxScore}`, margin, y); y += 16;
  doc.text(`Rischio: ${resultData.percentage}% (${resultData.level})`, margin, y); y += 22;

  // Grafico a torta su canvas nascosto
  const chartCanvas = document.getElementById("pdfChart");
  const ctx = chartCanvas.getContext("2d");
  if (pdfChartInstance) pdfChartInstance.destroy();
  pdfChartInstance = new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Basso (0–1)", "Medio (2)", "Alto (3)"],
      datasets: [{
        data: [resultData.distribution.low, resultData.distribution.mid, resultData.distribution.high],
        backgroundColor: ["#1e40af", "#60a5fa", "#ef4444"]
      }]
    },
    options: { animation: false, responsive: false }
  });
  await new Promise(r => setTimeout(r, 200));
  const imgData = chartCanvas.toDataURL("image/png", 1.0);
  doc.addImage(imgData, "PNG", margin, y, pageWidth - margin*2, 180);
  y += 200;

  // Helpers
  const wrap = (text, x, startY, lineHeight=16) => {
    const maxWidth = pageWidth - margin*2;
    const lines = doc.splitTextToSize(text, maxWidth);
    lines.forEach(line => { doc.text(line, x, startY); startY += lineHeight; });
    return startY;
  };

  const analysisTexts = {
    "Basso rischio":
      "Il tuo rapporto con lo smartphone appare generalmente equilibrato. Continua a preservare momenti senza telefono (pasti, relazioni, lavoro profondo) e monitora il tempo sulle app più usate. Usa timer, modalità non disturbare serale e mantieni una routine di sonno regolare. Mantieni alta l’attenzione nei periodi di stress, quando l’uso potrebbe crescere.",
    "Rischio medio":
      "Mostri alcuni segnali di dipendenza digitale che meritano attenzione. Definisci zone e orari liberi da smartphone (es. camera da letto, tavola). Imposta limiti giornalieri per social e chat, e programma fasce senza notifiche. Coltiva hobby offline che ti diano soddisfazione. Monitora l’andamento settimanale e coinvolgi una persona di fiducia se serve.",
    "Rischio alto":
      "Il tuo utilizzo dello smartphone mostra tratti problematici. Programma sessioni di digital detox (anche brevi) e valuta app che bloccano temporaneamente le app più distraenti. Se il sonno, il lavoro o le relazioni sono compromessi, considera un confronto con uno specialista. Coinvolgi familiari/amici come supporto e stabilisci obiettivi concreti e misurabili."
  };

  const checklist = [
    "Spegni le notifiche non essenziali per alcune ore al giorno.",
    "Stabilisci zone senza telefono (camera da letto, tavola).",
    "Usa timer per limitare social e intrattenimento.",
    "Stacca dallo schermo almeno 60 minuti prima di dormire.",
    "Organizza attività offline che ti piacciono (sport, lettura, amici)."
  ];

  const plan7 = [
    "Giorno 1 – Monitora: annota il tempo speso per app.",
    "Giorno 2 – Notifiche: disattiva quelle non essenziali.",
    "Giorno 3 – Zona libera: scegli un’area di casa senza smartphone.",
    "Giorno 4 – Sonno: stop telefono 60’ prima di dormire.",
    "Giorno 5 – Socialità: 2 ore con amici/famiglia senza telefono.",
    "Giorno 6 – Movimento: camminata o sport senza telefono.",
    "Giorno 7 – Revisione: valuta come ti senti e cosa migliorare."
  ];

  const resources = [
    "App di benessere digitale integrate (iOS Screen Time / Android Digital Wellbeing).",
    "Libri: 'Digital Minimalism' (Cal Newport), 'How to Break Up with Your Phone' (Catherine Price).",
    "Tecniche: Pomodoro, blocchi Deep Work, journaling serale."
  ];

  doc.setFont("Helvetica", "bold");
  doc.text("Analisi e consigli personalizzati", margin, y);
  y += 18;
  doc.setFont("Helvetica", "normal");
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

  y += 22;
  doc.setDrawColor(200);
  doc.line(40, y, pageWidth - 40, y);
  y += 16;
  doc.setFontSize(10);
  doc.text("Disclaimer: questo report ha scopo informativo e non sostituisce un consulto professionale.", 40, y);

  doc.save("Report_Dipendenza_Digitale.pdf");
}

// Debug helpers
window.__DD__ = { generatePDF: () => generatePDF(), debugData: () => resultData };
