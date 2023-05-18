function geometricDistribution(p) {
  let count = 1;
  while (Math.random() >= p) {
    count++;
  }
  return count;
}

function calculateFrequencyTable(results) {
  const frequencyTable = {};
  const totalCount = results.length;

  results.forEach((result) => {
    if (frequencyTable[result]) {
      frequencyTable[result]++;
    } else {
      frequencyTable[result] = 1;
    }
  });

  let cumulativeProbability = 0;
  for (let value in frequencyTable) {
    const count = frequencyTable[value];
    const probability = count / totalCount;
    cumulativeProbability += probability;
    frequencyTable[value] = {
      count,
      probability,
      cumulativeProbability,
    };
  }

  return frequencyTable;
}

function createTableRows(results, tableId) {
  const table = document.getElementById(tableId);

  const row1 = document.createElement("tr");
  const row2 = document.createElement("tr");

  for (let i = 0; i < results.length; i++) {
    const cell1 = document.createElement("td");
    const cell2 = document.createElement("td");
    if (i == 0) {
      cell1.textContent = "№ испытания ξ"; // Номер испытания
      cell2.textContent = "Результат"; // Результат розыгрыша
    } else {
      cell1.textContent = i + 1; // Номер испытания
      cell2.textContent = results[i]; // Результат розыгрыша
    }
    row1.appendChild(cell1);
    row2.appendChild(cell2);
  }

  table.appendChild(row1);
  table.appendChild(row2);
}

function createFrequencyTableRows(frequencyTable) {
  const table = document.getElementById("frequencyTable");

  for (let value in frequencyTable) {
    const count = frequencyTable[value].count;
    const probability = frequencyTable[value].probability;
    const cumulativeProbability = frequencyTable[value].cumulativeProbability;

    const row = document.createElement("tr");
    const valueCell = document.createElement("td");
    const countCell = document.createElement("td");
    const probabilityCell = document.createElement("td");
    const cumulativeProbabilityCell = document.createElement("td");

    valueCell.textContent = value;
    countCell.textContent = count;
    probabilityCell.textContent = probability.toFixed(2);
    cumulativeProbabilityCell.textContent = cumulativeProbability.toFixed(2);

    row.appendChild(valueCell);
    row.appendChild(countCell);
    row.appendChild(probabilityCell);
    row.appendChild(cumulativeProbabilityCell);

    table.appendChild(row);
  }
}

function createFrequencyHistogram(frequencyTable) {
  const labels = Object.keys(frequencyTable);
  const data = Object.values(frequencyTable).map((item) => item.probability);

  const ctx = document.getElementById("frequencyHistogram").getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          label: "Относительные частоты",
          data,
          backgroundColor: "blue",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          max: 1,
          grid: {
            color: "black",
          },
          ticks: {
            color: "black",
          },
        },
        x: {
          grid: {
            color: "black", // Цвет сетки по оси X
          },
          ticks: {
            color: "black",
          },
        },
      },
      plugins: {
        legend: {
          labels: {
            color: "black", // Цвет надписи "Относительные частоты"
          },
        },
      },
    },
  });
}

function main() {
  document.querySelector("#resultsTable").innerHTML = "";
  document.querySelector("#frequencyTable").innerHTML =
    "<tr><th>Случайная величина</th><th>Количество</th><th>Вероятность</th><th>Значение функции распределения</th></tr>";

  const p = 0.85;
  const numTrials = parseInt(document.querySelector(".count-input").value);

  const results = [];
  for (let i = 0; i < numTrials; i++) {
    const result = geometricDistribution(p);
    results.push(result);
  }

  const frequencyTable = calculateFrequencyTable(results);

  const resultsRow = document.createElement("tr");
  createTableRows(results, "resultsTable");
  document.getElementById("resultsTable").appendChild(resultsRow);

  createFrequencyTableRows(frequencyTable);
  createFrequencyHistogram(frequencyTable);
}

main();

document.querySelector(".count-button").addEventListener("click", () => {
  main();
});
