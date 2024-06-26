// TOTAL INCOME
var jsonDataIncome = null;
var monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
var barChart1 = null;

function fetchDataAndInitTotal1() {
  fetch("assets/json/analisis_total_income.json")
    .then((response) => response.json())
    .then((data) => {
      jsonDataIncome = data;
      filterFunctionTotal1();
    })
    .catch((error) => console.error("Error fetching months data:", error));
}

fetchDataAndInitTotal1();

function toggleDropdown(dropdownId) {
  var dropdownContent = document.getElementById(dropdownId);
  dropdownContent.classList.toggle("show");

  if (dropdownId === "myDropdown" || dropdownId === "myDropdown1") {
    filterFunctionTotal1();
  }
}

function filterFunctionTotal1() {
  var monthCheckboxes = document.querySelectorAll(".monthCheckbox:checked");
  var checkedMonths = Array.from(monthCheckboxes).map((checkbox) => checkbox.value);

  var pizzaCheckboxes = document.querySelectorAll("#myDropdown1 input[type='checkbox']:checked");
  var checkedPizzas = Array.from(pizzaCheckboxes).map((checkbox) => checkbox.value);

  var totalIncomes = Array(monthNames.length).fill(0);

  jsonDataIncome.forEach((item) => {
    var monthIndex = monthNames.indexOf(item.month);
    var isMonthChecked = checkedMonths.length === 0 || checkedMonths.includes(item.month);
    var isPizzaChecked = checkedPizzas.length === 0 || checkedPizzas.includes(item.pizza_id.toString());

    if (isMonthChecked && isPizzaChecked) {
      totalIncomes[monthIndex] += parseInt(item.total_income);
    }
  });

  var totalIncome = totalIncomes.reduce((acc, curr) => acc + curr, 0);
  document.getElementById("total-income").textContent = formatCurrency(totalIncome);

  updateBarChart(totalIncomes);
}

function formatCurrency(amount) {
  return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

function updateBarChart(data) {
  var ctx = document.getElementById("chart-1").getContext("2d");

  if (barChart1) {
    barChart1.destroy();
  }

  barChart1 = new Chart(ctx, {
    type: "bar",
    data: {
      labels: monthNames,
      datasets: [{
        label: "Total Income Per Month",
        data: data,
        borderColor: "rgba(213, 98, 25, 1)",
        backgroundColor: "rgba(213, 98, 25, 1)",
        borderWidth: 1,
      }],
    },
    options: {
      responsive: true,
      scales: {
        x: {
          beginAtZero: true,
          barPercentage: 0.5,
          categoryPercentage: 0.1,
        },
        y: {
          beginAtZero: true,
          ticks: {
            callback: function (value) {
              return formatCurrency(value);
            },
          },
        },
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function (context) {
              var label = context.dataset.label || '';
              if (label) {
                label += ': ';
              }
              label += formatCurrency(context.parsed.y);
              return label;
            },
          },
        },
      },
    },
  });
}

var checkboxes = document.getElementsByClassName("monthCheckbox");
for (var i = 0; i < checkboxes.length; i++) {
  checkboxes[i].addEventListener("change", filterFunctionTotal1);
}

var pizzaCheckboxes = document.querySelectorAll("#myDropdown1 input[type='checkbox']");
for (var i = 0; i < pizzaCheckboxes.length; i++) {
  pizzaCheckboxes[i].addEventListener("change", filterFunctionTotal1);
}

window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    for (var i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

function filterFunction(inputId, dropdownId) {
  var input, filter, div, labels, i;
  input = document.getElementById(inputId);
  filter = input.value.toUpperCase();
  div = document.getElementById(dropdownId);
  labels = div.getElementsByTagName("label");
  for (i = 0; i < labels.length; i++) {
    var txtValue = labels[i].textContent || labels[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      labels[i].parentNode.style.display = "";
    } else {
      labels[i].parentNode.style.display = "none";
    }
  }
}






// ---------------------------------------------------------------------------------------------------------
// TOTAL ORDER
var jsonDataOrder = null;

function fetchDataAndInitTotal2() {
  fetch("assets/json/analisis_total_order.json")
    .then((response) => response.json())
    .then((data) => {
      jsonDataOrder = data;
      filterFunctionTotal2();
    })
    .catch((error) => console.error("Error fetching months data:", error));
}

fetchDataAndInitTotal2();

function toggleDropdown(dropdownId) {
  var dropdownContent = document.getElementById(dropdownId);
  dropdownContent.classList.toggle("show");

  if (dropdownId === "myDropdown" || dropdownId === "myDropdown1") {
    filterFunctionTotal2();
  }
}

function filterFunctionTotal2() {
  var monthCheckboxes = document.querySelectorAll(".monthCheckbox:checked");
  var checkedMonths = Array.from(monthCheckboxes).map((checkbox) => checkbox.value);

  var pizzaCheckboxes = document.querySelectorAll("#myDropdown1 input[type='checkbox']:checked");
  var checkedPizzas = Array.from(pizzaCheckboxes).map((checkbox) => checkbox.value);

  var totalOrders = Array(monthNames.length).fill(0);

  jsonDataOrder.forEach((item) => {
    var monthIndex = monthNames.indexOf(item.month);
    var isMonthChecked = checkedMonths.length === 0 || checkedMonths.includes(item.month);
    var isPizzaChecked = checkedPizzas.length === 0 || checkedPizzas.includes(item.pizza_id.toString());

    if (isMonthChecked && isPizzaChecked) {
      totalOrders[monthIndex] += parseInt(item.total_orders);
    }
  });

  var totalOrder = totalOrders.reduce((acc, curr) => acc + curr, 0);
  document.getElementById("total-order").textContent = totalOrder;

  updateBarChart(totalOrders);
}

var checkboxes = document.getElementsByClassName("monthCheckbox");
for (var i = 0; i < checkboxes.length; i++) {
  checkboxes[i].addEventListener("change", filterFunctionTotal2);
}

var pizzaCheckboxes = document.querySelectorAll("#myDropdown1 input[type='checkbox']");
for (var i = 0; i < pizzaCheckboxes.length; i++) {
  pizzaCheckboxes[i].addEventListener("change", filterFunctionTotal2);
}

window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    for (var i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

function filterFunction(inputId, dropdownId) {
  var input, filter, div, labels, i;
  input = document.getElementById(inputId);
  filter = input.value.toUpperCase();
  div = document.getElementById(dropdownId);
  labels = div.getElementsByTagName("label");
  for (i = 0; i < labels.length; i++) {
    var txtValue = labels[i].textContent || labels[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      labels[i].parentNode.style.display = "";
    } else {
      labels[i].parentNode.style.display = "none";
    }
  }
}


// ---------------------------------------------------------------------------------------------------------
// BAR CHART 3 - Total Order Per Month
var jsonDataBar3 = null;
var barChart3 = null;
var monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

document.addEventListener("DOMContentLoaded", function () {
  fetch("assets/json/analisis_total_order.json")
    .then((response) => response.json())
    .then((data) => {
      jsonDataBar3 = data;
      filterFunctionBar3();
    })
    .catch((error) => console.error("Error fetching JSON:", error));
});

function filterFunctionBar3() {
  var monthCheckboxes = document.querySelectorAll(".monthCheckbox:checked");
  var checkedMonths = Array.from(monthCheckboxes).map((checkbox) => checkbox.value);

  var pizzaCheckboxes = document.querySelectorAll("#myDropdown1 input[type='checkbox']:checked");
  var checkedPizzas = Array.from(pizzaCheckboxes).map((checkbox) => checkbox.value);

  var totalOrdersPerMonth = Array(monthNames.length).fill(0);

  jsonDataBar3.forEach((item) => {
    var monthIndex = monthNames.indexOf(item.month);
    var isMonthChecked = checkedMonths.length === 0 || checkedMonths.includes(item.month);
    var isPizzaChecked = checkedPizzas.length === 0 || checkedPizzas.includes(item.pizza_id.toString());

    if (isMonthChecked && isPizzaChecked) {
      totalOrdersPerMonth[monthIndex] += parseInt(item.total_orders);
    }
  });

  displayChart3(totalOrdersPerMonth);
}

function displayChart3(totalOrdersPerMonth) {
  const ctx = document.getElementById("chart-3").getContext("2d");

  if (barChart3) {
    barChart3.destroy();
  }

  barChart3 = new Chart(ctx, {
    type: "bar",
    data: {
      labels: monthNames,
      datasets: [
        {
          label: "Total Orders Per Month",
          data: totalOrdersPerMonth,
          borderColor: "rgba(213, 98, 25, 1)",
          backgroundColor: "rgba(213, 98, 25, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        x: {
          beginAtZero: true,
          barPercentage: 0.5,
          categoryPercentage: 0.1,
        },
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

var monthCheckboxes = document.getElementsByClassName("monthCheckbox");
for (var i = 0; i < monthCheckboxes.length; i++) {
  monthCheckboxes[i].addEventListener("change", filterFunctionBar3);
}

var pizzaCheckboxes = document.querySelectorAll("#myDropdown1 input[type='checkbox']");
for (var i = 0; i < pizzaCheckboxes.length; i++) {
  pizzaCheckboxes[i].addEventListener("change", filterFunctionBar3);
}

window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    for (var i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};


// ---------------------------------------------------------------------------------------------------------
// BAR CHART 2 - Total Orders Per Pizza Type
var jsonDataBar2 = null;
var barChart2 = null;
var pizzaNames = [];

document.addEventListener("DOMContentLoaded", function () {
  fetch("assets/json/analisis_total_order.json")
    .then((response) => response.json())
    .then((data) => {
      jsonDataBar2 = data;
      pizzaNames = [...new Set(data.map((item) => item.pizza_name))];
      filterFunctionBar2();
    })
    .catch((error) => console.error("Error fetching JSON:", error));
});

function filterFunctionBar2() {
  var monthCheckboxes = document.querySelectorAll(".monthCheckbox:checked");
  var checkedMonths = Array.from(monthCheckboxes).map((checkbox) => checkbox.value);

  var pizzaCheckboxes = document.querySelectorAll("#myDropdown2 input[type='checkbox']:checked");
  var checkedPizzas = Array.from(pizzaCheckboxes).map((checkbox) => checkbox.value);

  var orderPerPizza = {};

  jsonDataBar2.forEach((item) => {
    var isMonthChecked = checkedMonths.length === 0 || checkedMonths.includes(item.month);
    var isPizzaChecked = checkedPizzas.length === 0 || checkedPizzas.includes(item.pizza_id.toString());

    if (isMonthChecked && isPizzaChecked) {
      if (!orderPerPizza[item.pizza_name]) {
        orderPerPizza[item.pizza_name] = 0;
      }
      orderPerPizza[item.pizza_name] += parseFloat(item.total_orders);
    }
  });

  var sortedPizzaNames = Object.keys(orderPerPizza);
  var sortedOrderPerPizza = sortedPizzaNames.map((pizza_name) => orderPerPizza[pizza_name]);

  displayChart2(sortedPizzaNames, sortedOrderPerPizza);
}

function displayChart2(sortedPizzaNames, sortedOrderPerPizza) {
  const ctx = document.getElementById("chart-2").getContext("2d");

  if (barChart2) {
    barChart2.destroy();
  }

  barChart2 = new Chart(ctx, {
    type: "bar",
    data: {
      labels: sortedPizzaNames,
      datasets: [
        {
          label: "Total Orders Per Pizza Type",
          data: sortedOrderPerPizza,
          borderColor: "rgba(213, 98, 25, 1)",
          backgroundColor: "rgba(213, 98, 25, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        x: {
          beginAtZero: true,
          barPercentage: 0.5,
          categoryPercentage: 0.1,
        },
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

var monthCheckboxes = document.getElementsByClassName("monthCheckbox");
for (var i = 0; i < monthCheckboxes.length; i++) {
  monthCheckboxes[i].addEventListener("change", filterFunctionBar2);
}

var pizzaCheckboxes = document.querySelectorAll("#myDropdown2 input[type='checkbox']");
for (var i = 0; i < pizzaCheckboxes.length; i++) {
  pizzaCheckboxes[i].addEventListener("change", filterFunctionBar2);
}

window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    for (var i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};





// ---------------------------------------------------------------------------------------------------------
// TABLE - Total Orders and Total Income Per Month
var jsonDataTable = null;
var monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

document.addEventListener("DOMContentLoaded", function () {
  fetch("assets/json/analisis_total_income_total_order.json")
    .then((response) => response.json())
    .then((data) => {
      jsonDataTable = data;
      filterFunctionTable();
    })
    .catch((error) => console.error("Error fetching JSON:", error));
});

function filterFunctionTable() {
  var monthCheckboxes = document.querySelectorAll(".monthCheckbox:checked");
  var checkedMonths = Array.from(monthCheckboxes).map((checkbox) => checkbox.value);

  var pizzaCheckboxes = document.querySelectorAll("#myDropdown1 input[type='checkbox']:checked");
  var checkedPizzas = Array.from(pizzaCheckboxes).map((checkbox) => checkbox.value);

  const groupedData = groupDataByMonthNames(jsonDataTable, checkedMonths, checkedPizzas);

  displayTable(groupedData);
}

function groupDataByMonthNames(data, checkedMonths, checkedPizzas) {
  const groupedData = {};
  monthNames.forEach((month) => {
    groupedData[month] = { total_order: 0, total_income: 0 };
  });

  data.forEach((item) => {
    var isMonthChecked = checkedMonths.length === 0 || checkedMonths.includes(item.month);
    var isPizzaChecked = checkedPizzas.length === 0 || checkedPizzas.includes(item.pizza_id.toString());

    if (isMonthChecked && isPizzaChecked) {
      groupedData[item.month].total_order += parseInt(item.total_order);
      groupedData[item.month].total_income += parseFloat(item.total_income);
    }
  });

  return groupedData;
}

function displayTable(data) {
  const tableContainer = document.getElementById("table-container");
  tableContainer.innerHTML = ""; // Clear existing table content

  const table = document.createElement("table");
  const tableHead = document.createElement("thead");
  const tableBody = document.createElement("tbody");

  const headerRow = document.createElement("tr");
  const labels = ["Month", "Total Orders", "Total Income"];
  labels.forEach((label) => {
    const headerCell = document.createElement("th");
    headerCell.textContent = label;
    headerRow.appendChild(headerCell);
  });
  tableHead.appendChild(headerRow);
  table.appendChild(tableHead);

  for (const [month, values] of Object.entries(data)) {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${month}</td>
      <td>${values.total_order}</td>
      <td>${formatCurrency(values.total_income)}</td>
    `;
    tableBody.appendChild(row);
  }

  table.appendChild(tableBody);
  tableContainer.appendChild(table);
}

function formatCurrency(amount) {
  return parseFloat(amount).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

var monthCheckboxes = document.getElementsByClassName("monthCheckbox");
for (var i = 0; i < monthCheckboxes.length; i++) {
  monthCheckboxes[i].addEventListener("change", filterFunctionTable);
}

var pizzaCheckboxes = document.querySelectorAll("#myDropdown1 input[type='checkbox']");
for (var i = 0; i < pizzaCheckboxes.length; i++) {
  pizzaCheckboxes[i].addEventListener("change", filterFunctionTable);
}

window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    for (var i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};




// ---------------------------------------------------------------------------------------------------------
// BAR CHART 1 - Total Income Per Month
var jsonDataBar1 = null;
var barChart1 = null;
var monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

document.addEventListener("DOMContentLoaded", function () {
  fetch("assets/json/analisis_total_income.json")
    .then((response) => response.json())
    .then((data) => {
      jsonDataBar1 = data;
      filterFunctionBar1();
    })
    .catch((error) => console.error("Error fetching JSON:", error));
});

function filterFunctionBar1() {
  var monthCheckboxes = document.querySelectorAll(".monthCheckbox:checked");
  var checkedMonths = Array.from(monthCheckboxes).map((checkbox) => checkbox.value);

  var pizzaCheckboxes = document.querySelectorAll("#myDropdown1 input[type='checkbox']:checked");
  var checkedPizzas = Array.from(pizzaCheckboxes).map((checkbox) => checkbox.value);

  var totalIncomePerMonth = Array(monthNames.length).fill(0);

  jsonDataBar1.forEach((item) => {
    var monthIndex = monthNames.indexOf(item.month);
    var isMonthChecked = checkedMonths.length === 0 || checkedMonths.includes(item.month);
    var isPizzaChecked = checkedPizzas.length === 0 || checkedPizzas.includes(item.pizza_id.toString());

    if (isMonthChecked && isPizzaChecked) {
      totalIncomePerMonth[monthIndex] += parseInt(item.total_income);
    }
  });

  displayChart1(totalIncomePerMonth);
}

function displayChart1(totalIncomePerMonth) {
  const ctx = document.getElementById("chart-1").getContext("2d");

  if (barChart1) {
    barChart1.destroy();
  }

  barChart1 = new Chart(ctx, {
    type: "bar",
    data: {
      labels: monthNames,
      datasets: [
        {
          label: "Total Income Per Month",
          data: totalIncomePerMonth,
          borderColor: "rgba(213, 98, 25, 1)",
          backgroundColor: "rgba(213, 98, 25, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        x: {
          beginAtZero: true,
          barPercentage: 0.5,
          categoryPercentage: 0.1,
        },
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value, index, values) {
              return '$' + value.toLocaleString('en-US', { minimumFractionDigits: 2 });
            }
          }
        },
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function(context) {
              let label = context.dataset.label || '';
              if (label) {
                label += ': ';
              }
              label += '$' + context.parsed.y.toLocaleString('en-US', { minimumFractionDigits: 2 });
              return label;
            }
          }
        }
      }
    },
  });
}

var monthCheckboxes = document.getElementsByClassName("monthCheckbox");
for (var i = 0; i < monthCheckboxes.length; i++) {
  monthCheckboxes[i].addEventListener("change", filterFunctionBar1);
}

var pizzaCheckboxes = document.querySelectorAll("#myDropdown1 input[type='checkbox']");
for (var i = 0; i < pizzaCheckboxes.length; i++) {
  pizzaCheckboxes[i].addEventListener("change", filterFunctionBar1);
}

window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    for (var i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};



// ---------------------------------------------------------------------------------------------------------
// PIE CHART 1 - Total Income Per Month
var jsonDataPie1 = null;
var pieChart1 = null;
var monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

document.addEventListener("DOMContentLoaded", function () {
  fetch("assets/json/analisis_total_income.json")
    .then((response) => response.json())
    .then((data) => {
      jsonDataPie1 = data;
      filterFunctionPieChart1();
    })
    .catch((error) => console.error("Error fetching JSON:", error));
});

function filterFunctionPieChart1() {
  var monthCheckboxes = document.querySelectorAll(".monthCheckbox:checked");
  var checkedMonths = Array.from(monthCheckboxes).map((checkbox) => checkbox.value);

  var pizzaCheckboxes = document.querySelectorAll("#myDropdown1 input[type='checkbox']:checked");
  var checkedPizzas = Array.from(pizzaCheckboxes).map((checkbox) => checkbox.value);

  var totalIncomePerMonth = Array(monthNames.length).fill(0);

  jsonDataPie1.forEach((item) => {
    var monthIndex = monthNames.indexOf(item.month);
    var isMonthChecked = checkedMonths.length === 0 || checkedMonths.includes(item.month);
    var isPizzaChecked = checkedPizzas.length === 0 || checkedPizzas.includes(item.pizza_id.toString());

    if (isMonthChecked && isPizzaChecked) {
      totalIncomePerMonth[monthIndex] += parseInt(item.total_income);
    }
  });

  displayPieChart1(totalIncomePerMonth);
}

function displayPieChart1(totalIncomePerMonth) {
  const ctx = document.getElementById("piechart-1").getContext("2d");

  if (pieChart1) {
    pieChart1.destroy();
  }

  pieChart1 = new Chart(ctx, {
    type: "pie",
    data: {
      labels: monthNames,
      datasets: [
        {
          label: "Total Income",
          data: totalIncomePerMonth,
          backgroundColor: [
            "rgba(213, 98, 25, 1)",
            "rgba(213, 98, 25, 0.9)",
            "rgba(213, 98, 25, 0.8)",
            "rgba(213, 98, 25, 0.7)",
            "rgba(213, 98, 25, 0.6)",
            "rgba(213, 98, 25, 0.5)",
            "rgba(213, 98, 25, 0.4)",
            "rgba(213, 98, 25, 0.3)",
            "rgba(213, 98, 25, 0.2)",
            "rgba(213, 98, 25, 0.1)",
            "rgba(213, 98, 25, 0.11)",
            "rgba(213, 98, 25, 0.12)",
          ],
          borderColor: "#d56219",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "right",
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              let label = context.label || '';
              if (label) {
                label += ': ';
              }
              label += '$' + context.raw.toLocaleString('en-US', { minimumFractionDigits: 2 });
              return label;
            }
          }
        }
      },
    },
  });
}

var monthCheckboxes = document.getElementsByClassName("monthCheckbox");
for (var i = 0; i < monthCheckboxes.length; i++) {
  monthCheckboxes[i].addEventListener("change", filterFunctionPieChart1);
}

var pizzaCheckboxes = document.querySelectorAll("#myDropdown1 input[type='checkbox']");
for (var i = 0; i < pizzaCheckboxes.length; i++) {
  pizzaCheckboxes[i].addEventListener("change", filterFunctionPieChart1);
}

window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    for (var i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};



// ---------------------------------------------------------------------------------------------------------
// PIE CHART 2 - Total Orders Per Month
var jsonDataPie2 = null;
var pieChart2 = null;
var monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

document.addEventListener("DOMContentLoaded", function () {
  fetch("assets/json/analisis_total_order.json")
    .then((response) => response.json())
    .then((data) => {
      jsonDataPie2 = data;
      filterFunctionPieChart2();
    })
    .catch((error) => console.error("Error fetching JSON:", error));
});

function filterFunctionPieChart2() {
  var monthCheckboxes = document.querySelectorAll(".monthCheckbox:checked");
  var checkedMonths = Array.from(monthCheckboxes).map((checkbox) => checkbox.value);

  var pizzaCheckboxes = document.querySelectorAll("#myDropdown1 input[type='checkbox']:checked");
  var checkedPizzas = Array.from(pizzaCheckboxes).map((checkbox) => checkbox.value);

  var totalOrdersPerMonth = Array(monthNames.length).fill(0);

  jsonDataPie2.forEach((item) => {
    var monthIndex = monthNames.indexOf(item.month);
    var isMonthChecked = checkedMonths.length === 0 || checkedMonths.includes(item.month);
    var isPizzaChecked = checkedPizzas.length === 0 || checkedPizzas.includes(item.pizza_id.toString());

    if (isMonthChecked && isPizzaChecked) {
      totalOrdersPerMonth[monthIndex] += parseInt(item.total_orders);
    }
  });

  displayPieChart2(totalOrdersPerMonth);
}

function displayPieChart2(totalOrdersPerMonth) {
  const ctx = document.getElementById("piechart-2").getContext("2d");

  if (pieChart2) {
    pieChart2.destroy();
  }

  pieChart2 = new Chart(ctx, {
    type: "pie",
    data: {
      labels: monthNames,
      datasets: [
        {
          label: "Total Orders",
          data: totalOrdersPerMonth,
          backgroundColor: [
            "rgba(213, 98, 25, 1)",
            "rgba(213, 98, 25, 0.9)",
            "rgba(213, 98, 25, 0.8)",
            "rgba(213, 98, 25, 0.7)",
            "rgba(213, 98, 25, 0.6)",
            "rgba(213, 98, 25, 0.5)",
            "rgba(213, 98, 25, 0.4)",
            "rgba(213, 98, 25, 0.3)",
            "rgba(213, 98, 25, 0.2)",
            "rgba(213, 98, 25, 0.1)",
            "rgba(213, 98, 25, 0.11)",
            "rgba(213, 98, 25, 0.12)",
          ],
          borderColor: "#d56219",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "right",
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              let label = context.label || '';
              if (label) {
                label += ': ';
              }
              label += context.raw.toLocaleString('en-US');
              return label;
            }
          }
        }
      },
    },
  });
}

var monthCheckboxes = document.getElementsByClassName("monthCheckbox");
for (var i = 0; i < monthCheckboxes.length; i++) {
  monthCheckboxes[i].addEventListener("change", filterFunctionPieChart2);
}

var pizzaCheckboxes = document.querySelectorAll("#myDropdown1 input[type='checkbox']");
for (var i = 0; i < pizzaCheckboxes.length; i++) {
  pizzaCheckboxes[i].addEventListener("change", filterFunctionPieChart2);
}

window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    for (var i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};




// ---------------------------------------------------------------------------------------------------------
// TIMESERIES CHART - Total Orders Per Month
var jsonDataLine = null;
var lineChart = null;
var monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

document.addEventListener("DOMContentLoaded", function () {
  fetch("assets/json/analisis_total_order.json")
    .then((response) => response.json())
    .then((data) => {
      jsonDataLine = data;
      filterFunctionLineChart();
    })
    .catch((error) => console.error("Error fetching JSON:", error));
});

function filterFunctionLineChart() {
  var monthCheckboxes = document.querySelectorAll(".monthCheckbox:checked");
  var checkedMonths = Array.from(monthCheckboxes).map((checkbox) => checkbox.value);

  var pizzaCheckboxes = document.querySelectorAll("#myDropdown1 input[type='checkbox']:checked");
  var checkedPizzas = Array.from(pizzaCheckboxes).map((checkbox) => checkbox.value);

  var totalOrdersPerMonth = Array(monthNames.length).fill(0);

  jsonDataLine.forEach((item) => {
    var monthIndex = monthNames.indexOf(item.month);
    var isMonthChecked = checkedMonths.length === 0 || checkedMonths.includes(item.month);
    var isPizzaChecked = checkedPizzas.length === 0 || checkedPizzas.includes(item.pizza_id.toString());

    if (isMonthChecked && isPizzaChecked) {
      totalOrdersPerMonth[monthIndex] += parseInt(item.total_orders);
    }
  });

  displayTimeseries(monthNames, totalOrdersPerMonth);
}

function displayTimeseries(labels, totalOrders) {
  const ctx = document.getElementById("timeseries").getContext("2d");

  if (lineChart) {
    lineChart.destroy();
  }

  lineChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Total Orders Per Month",
          data: totalOrders,
          borderColor: "rgba(213, 98, 25, 1)",
          backgroundColor: "rgba(213, 98, 25, 0.5)",
          borderWidth: 1,
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        x: {
          beginAtZero: true,
          type: "category",
          grid: {
            borderWidth: 2,
          },
        },
        y: {
          beginAtZero: true,
          grid: {
            borderWidth: 2,
          },
          ticks: {
            callback: function(value, index, values) {
              return value.toLocaleString('en-US');
            }
          }
        },
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function(context) {
              let label = context.dataset.label || '';
              if (label) {
                label += ': ';
              }
              label += context.raw.toLocaleString('en-US');
              return label;
            }
          }
        }
      }
    },
  });
}

var monthCheckboxes = document.getElementsByClassName("monthCheckbox");
for (var i = 0; i < monthCheckboxes.length; i++) {
  monthCheckboxes[i].addEventListener("change", filterFunctionLineChart);
}

var pizzaCheckboxes = document.querySelectorAll("#myDropdown1 input[type='checkbox']");
for (var i = 0; i < pizzaCheckboxes.length; i++) {
  pizzaCheckboxes[i].addEventListener("change", filterFunctionLineChart);
}

window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    for (var i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

