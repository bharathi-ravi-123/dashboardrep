// dashboard.js

// Bar Chart: Department
const departmentCanvas = document.getElementById('departmentChart');
if (departmentCanvas) {
  const deptEntries = Object.entries(departmentData).sort((a, b) => b[1] - a[1]);
  const deptLabels = deptEntries.map(([k]) => k);
  const deptValues = deptEntries.map(([, v]) => v);

  new Chart(departmentCanvas.getContext('2d'), {
    type: 'bar',
    data: {
      labels: deptLabels,
      datasets: [{
        label: 'Employees per Department',
        data: deptValues,
        backgroundColor: '#f2994a',
        borderRadius: 5
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.label}: ${context.raw}`;
            }
          }
        }
      },
      scales: {
        x: {
          ticks: {
            font: { size: 12 },
            maxRotation: 60,
            minRotation: 45
          }
        },
        y: {
          beginAtZero: true,
          ticks: {
            font: { size: 12 }
          }
        }
      }
    }
  });
}

// Bar Chart: Designation
const designationCanvas = document.getElementById('designationChart');
if (designationCanvas) {
  const desigEntries = Object.entries(designationData).sort((a, b) => b[1] - a[1]);
  const desigLabels = desigEntries.map(([k]) => k);
  const desigValues = desigEntries.map(([, v]) => v);

  new Chart(designationCanvas.getContext('2d'), {
    type: 'bar',
    data: {
      labels: desigLabels,
      datasets: [{
        label: 'Employees per Designation',
        data: desigValues,
        backgroundColor: '#56ccf2',
        borderRadius: 5
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.label}: ${context.raw}`;
            }
          }
        }
      },
      scales: {
        x: {
          ticks: {
            font: { size: 12 },
            maxRotation: 60,
            minRotation: 45
          }
        },
        y: {
          beginAtZero: true,
          ticks: {
            font: { size: 12 }
          }
        }
      }
    }
  });
}

// Pie Chart: Activation
const activationCanvas = document.getElementById('activationChart');
if (activationCanvas) {
  const labels = Object.keys(activationData);
  const values = Object.values(activationData);

  new Chart(activationCanvas.getContext('2d'), {
    type: 'pie',
    data: {
      labels: labels,
      datasets: [{
        label: 'Account Status',
        data: values,
        backgroundColor: ['#2ecc71', '#e74c3c']
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            font: {
              size: 14
            }
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.label}: ${context.raw}`;
            }
          }
        }
      }
    }
  });
}
