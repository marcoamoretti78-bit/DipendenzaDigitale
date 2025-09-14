// scripts.js aggiornato - Dipendenza Digitale
document.addEventListener("DOMContentLoaded", () => {
  const quizForm = document.getElementById("quizForm");
  const calculateBtn = document.getElementById("calculateBtn");
  const resetBtn = document.getElementById("resetBtn");
  const paywall = document.getElementById("paywall");
  const userNameInput = document.getElementById("userName");
  const questions = [...Array(20).keys()].map(i => `Domanda ${i+1}?`);
  questions.forEach((q, i) => {
    const div = document.createElement("div");
    div.className = "question";
    div.innerHTML = `<p>${i + 1}. ${q}</p>
      <div class="options">
        <label><input type="radio" name="q${i}" value="0"> Mai</label>
        <label><input type="radio" name="q${i}" value="1"> Raramente</label>
        <label><input type="radio" name="q${i}" value="2"> Spesso</label>
        <label><input type="radio" name="q${i}" value="3"> Sempre</label>
      </div>`;
    quizForm.appendChild(div);
  });
  calculateBtn.addEventListener("click", () => {
    let total = 0, answered = 0;
    questions.forEach((_, i) => {
      const val = document.querySelector(`input[name="q${i}"]:checked`);
      if (val) { total += parseInt(val.value); answered++; }
    });
    if (answered < questions.length) { alert("Completa tutte le domande."); return; }
    const percentage = Math.round((total / (questions.length * 3)) * 100);
    window.resultData = { total, percentage, name: userNameInput.value.trim(), dateStr: new Date().toLocaleDateString("it-IT") };
    paywall.classList.remove("hidden");
    window.scrollTo({ top: paywall.offsetTop, behavior: "smooth" });
  });
  resetBtn.addEventListener("click", () => { quizForm.reset(); paywall.classList.add("hidden"); });
  if (document.getElementById("paypal-button-container")) {
    paypal.Buttons({
      createOrder: (data, actions) => actions.order.create({ purchase_units: [{ amount: { value: "1.99", currency_code: "EUR" } }] }),
      onApprove: (data, actions) => actions.order.capture().then(() => { generatePDF(window.resultData); })
    }).render("#paypal-button-container");
  }
  async function generatePDF(resultData) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    let y = 20;
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(32);
    const who = resultData.name ? `Report per ${resultData.name}` : "Report personalizzato";
    doc.text(who, 20, y);
    y += 36;
    doc.setFontSize(14);
    doc.setFont("Helvetica", "normal");
    doc.text(`Data: ${resultData.dateStr}`, 20, y);
    y += 16;
    doc.text(`Punteggio totale: ${resultData.total}`, 20, y);
    y += 10;
    doc.text(`Percentuale: ${resultData.percentage}%`, 20, y);
    y += 20;
    doc.save("Report_DipendenzaDigitale.pdf");
  }
});