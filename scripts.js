const ctx = document.getElementById('pieChart').getContext('2d');
new Chart(ctx, {
  type: 'pie',
  data: {
    labels: ['Tempo online', 'Vita sociale', 'Lavoro/Studio', 'Altro'],
    datasets: [{
      data: [40, 25, 20, 15],
      backgroundColor: ['#1e40af', '#2563eb', '#60a5fa', '#93c5fd']
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' },
      title: { display:true, text:'Distribuzione uso digitale (esempio)' }
    }
  }
});