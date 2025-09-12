// 20 domande: punteggio 0-3 (da comportamento sano a critico)
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

// Opzioni comuni per tutte le domande
const choices = [
  { label: "Mai", value: 0 },
  { label: "Raramente", value: 1 },
  { label: "Spesso", value: 2 },
  { label: "Quasi sempre / Sempre", value: 3 }
];

// Genera il form
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

// Calcolo risultato
const calcBtn = document.getElementById("calculateBtn");
const resetBtn = document.getElementById("resetBtn");
const resultsEl = document.getElementById("results");
const scoreText = document.getElementById("scoreText");
let chartRef = null;

calcBtn.addEventListener("click", () => {
  let total = 0;
  let answered = 0;

  // Conta la distribuzione per la torta
  const distribution = { low: 0, mid: 0, high: 0, max: 0 };

  questions.forEach((_, idx) => {
    const checked = document.querySelector(`input[name="q${idx}"]:checked`);
    if (checked) {
      const val = parseInt(checked.value, 10);
      total += val;
      answered += 1;
      // Distribuzione: 0-1 = basso; 2 = medio; 3 = alto
      if (val <= 1) distribution.low += 1;
      else if (val === 2) distribution.mid += 1;
      else distribution.high += 1;
    }
  });

  if (answered < questions.length) {
    const missing = questions.length - answered;
    alert(`Hai tralasciato ${missing} domanda/e. Completa il quiz per un risultato accurato.`);
    return;
  }

  const maxScore = questions.length * 3; // max 3 punti per domanda
  const percentage = Math.round((total / maxScore) * 100);

  let level = "";
  if (percentage < 33) level = "Basso rischio";
  else if (percentage < 67) level = "Rischio medio";
  else level = "Rischio alto";

  scoreText.textContent = `Punteggio: ${total}/${maxScore} — Rischio: ${percentage}% (${level})`;
  resultsEl.classList.remove("hidden");

  // Disegna/aggiorna il grafico
  const ctx = document.getElementById("resultsChart").getContext("2d");
  if (chartRef) chartRef.destroy();
  chartRef = new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Basso (0–1)", "Medio (2)", "Alto (3)"],
      datasets: [{
        data: [distribution.low, distribution.mid, distribution.high],
        backgroundColor: ["#1e40af", "#60a5fa", "#ef4444"]
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: "bottom" },
        title: { display: true, text: "Distribuzione delle risposte per livello" }
      }
    }
  });
});

resetBtn.addEventListener("click", () => {
  document.querySelectorAll('input[type="radio"]').forEach(i => i.checked = false);
  if (chartRef) chartRef.destroy();
  resultsEl.classList.add("hidden");
});
