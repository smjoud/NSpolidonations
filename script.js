fetch('data.csv')
.then(response => response.text())
.then(csvData => {
  // Store the data in a variable
  const data = csvData;

  // Split the data by new line characters
  const lines = data.split('\n');

  // Extract the first item from each line
  const firstColumn = lines.map(line => line.split(',')[0]);

  // Get the form element
  const form = document.querySelector('form');

  // Add an event listener to the input field in the form
  const input = form.querySelector('input');
  input.addEventListener('keyup', () => {
    // Get the search term and split it into words
    const searchTerm = input.value.toLowerCase();
    const words = searchTerm.split(' ');

    // Search the first and second column for the search terms
    let results;
    if (words.length === 2) {
      results = lines.filter(line =>
        line.split(',')[0].toLowerCase().startsWith(words[0]) &&
        line.split(',')[1].toLowerCase().startsWith(words[1])
      );
    } else {
      results = lines.filter(line =>
        line.split(',')[0].toLowerCase().startsWith(words[0])
      );
    }

    // Get the column names from the first line
    const columnNames = lines[0].split(',');

    // Check if the search input is empty
    if (searchTerm === '') {
      // Hide the table if the search input is empty
      document.querySelector('table').style.display = 'none';
    } else {
      // Show the table if the search input is not empty
      document.querySelector('table').style.display = 'inline-table';

      // Add the column names to the table
      const columnNamesRow = document.querySelector('#column-names');
      columnNamesRow.innerHTML = '';
      columnNames.forEach(name => {
        const th = document.createElement('th');
        th.innerText = name;
        columnNamesRow.appendChild(th);
      });



      // Display the results in a table
      const resultsTable = document.querySelector('#results');
      resultsTable.innerHTML = '';
      results.forEach(result => {
        const tr = document.createElement('tr');
        
        // Color the row blue if the fifth column contains "PC"
        if (result.split(',')[4] === "PC") {
          tr.style.backgroundColor = "#639ee0";
        }

        if (result.split(',')[4] === "NDP") {
          tr.style.backgroundColor = "orange";
        }

        if (result.split(',')[4] === "Liberal") {
          tr.style.backgroundColor = "red";
        }
        
        result.split(',').forEach(column => {
          const td = document.createElement('td');
          td.innerText = column;
          tr.appendChild(td);
        });
        resultsTable.appendChild(tr);

        
      });
    }
    if (searchTerm === '') {
      // Hide the summary box if the search input is empty
      document.querySelector('#summary-box').style.display = 'none';
    } else {
      // Show the summary box if the search input is not empty
      document.querySelector('#summary-box').style.display = 'block';

      // Calculate the sum of the values in the fourth column
      let sum = 0;
      results.forEach(result => {
        const value = result.split(',')[3];
        if (value) {
          sum += parseInt(value);
        }
      });

      // Update the summary box with the calculated sum
      const summaryBox = document.querySelector('#summary-box');
      summaryBox.innerHTML = '';
      const summaryElement = document.createElement('p');
      summaryElement.innerText = `Total: ${sum}`;
      summaryBox.appendChild(summaryElement);
    }

// Calculate the sum of the values in the fourth column
let sum = 0;
results.forEach(result => {
  const value = result.split(',')[3];
  if (value) {
    sum += parseInt(value);
  }
});

// Format the sum value using the toLocaleString() method
const sumString = sum.toLocaleString('en-CA', { style: 'currency', currency: 'CAD', minimumFractionDigits: 0, maximumFractionDigits: sum % 1 === 0 ? 0 : 2 });


// Update the summary box with the calculated sum
const summaryBox = document.querySelector('#summary-box');
summaryBox.innerHTML = '';
const summaryElement = document.createElement('p');
summaryElement.innerText = `Total: ${sumString}`;
summaryBox.appendChild(summaryElement);



  });
});

