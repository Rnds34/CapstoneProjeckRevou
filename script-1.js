document.addEventListener('DOMContentLoaded', function() {
  fetch('analisis_total_income_perbulan.csv')
      .then(response => response.text())
      .then(text => {
          const data = parseCSV(text);
          displayChart(data);
      });
});

function parseCSV(csv) {
  const lines = csv.split('\n');
  const headers = lines[0].split(',').map(header => header.trim());
  const rows = lines.slice(1).map(line => line.split(',').map(cell => cell.trim()));

  const data = {};
  headers.forEach(header => {
      data[header] = [];
  });

  rows.forEach(row => {
      row.forEach((cell, index) => {
          data[headers[index]].push(cell);
      });
  });

  return data;
}

function displayChart(data) {
  const ctx = document.getElementById('chart-1').getContext('2d');
  const chart = new Chart(ctx, {
      type: 'bar', // Change this to 'bar', 'pie', etc. for different chart types
      data: {
          labels: data[Object.keys(data)[0]], // Assuming the first column is the labels (e.g., dates or categories)
          datasets: [{
              label: 'Total Income', // You can customize the label based on your data
              data: data[Object.keys(data)[1]], // Assuming the second column is the data to plot
              borderColor: 'rgba(255, 165, 0, 1)',
              backgroundColor: 'rgba(255, 165, 0, 0.6)',
              borderWidth: 1
          }]
      },
      options: {
          responsive: true,
          scales: {
              x: {
                  beginAtZero: true,
                  barPercentage: 500, // Ukuran lebar bar
                  categoryPercentage: 10 // Ukuran lebar kategori
              },
              y: {
                  beginAtZero: true
              }
          }
      }
  });
}
