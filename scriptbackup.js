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
columnNames.slice(0, 5).concat(columnNames.slice(6)).forEach(name => {
  const th = document.createElement('th');
  th.innerText = name;
  columnNamesRow.appendChild(th);

    // Add a click event listener to the header cell
    th.addEventListener('click', () => {
      sortTable(index);
    });

    
});

// Get all the table headers
const tableHeaders = document.querySelectorAll("th");

// Add click event listener to each header
tableHeaders.forEach((header) => {
  header.addEventListener("click", () => {
    const table = header.closest("table");
    const tbody = table.querySelector("tbody");
    const headerIndex = [...header.parentNode.children].indexOf(header);
    const rows = Array.from(tbody.querySelectorAll("tr"));
    const sortDirection = header.dataset.sortDirection === "asc" ? "desc" : "asc";

    // Sort the rows based on the clicked header
    const sortedRows = rows.sort((a, b) => {
      const aValue = a.querySelector(`td:nth-child(${headerIndex + 1})`).textContent.trim();
      const bValue = b.querySelector(`td:nth-child(${headerIndex + 1})`).textContent.trim();
      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    // Update the table with the sorted rows
    tbody.innerHTML = "";
    sortedRows.forEach((row) => tbody.appendChild(row));
    header.dataset.sortDirection = sortDirection;
  });
});





// Display the results in a table
const resultsTable = document.querySelector('#results');
resultsTable.innerHTML = '';
results.forEach(result => {
  const tr = document.createElement('tr');

  // Color the row blue if the fourth column contains "PC"
  if (result.split(',')[4] === "PC") {
    tr.style.backgroundColor = "#639ee0";
  }

    // Color the row red if the third column contains "Liberal"
    if (result.split(',')[4].includes("Liberal")) {
      tr.style.backgroundColor = "red";
    }

    if (result.split(',')[4].includes("NDP")) {
      tr.style.backgroundColor = "orange";
    }

    if (result.split(',')[4].includes("Green")) {
      tr.style.backgroundColor = "green";
    }
  
    if (result.split(',')[4].includes("Atlantica")) {
      tr.style.backgroundColor = "purple";
    }
  
  
  // Iterate over each column, skipping the 5th column but including the 6th column
  const columns = result.split(',');
  for (let i = 0; i < columns.length; i++) {
    if (i !== 5) {
      const td = document.createElement('td');
      td.innerText = columns[i];
      tr.appendChild(td);
    }
  }

  resultsTable.appendChild(tr);
});


      
      
    }
// Define a function to calculate and display the summary information
const updateSummary = () => {
  const numberOfDonations = document.querySelectorAll('#results tr').length;

  const pcTotal = Array.from(document.querySelectorAll('#results tr td:nth-child(5)'))
    .filter(td => td.innerText === 'PC')
    .map(td => parseInt(td.previousElementSibling.innerText))
    .reduce((total, amount) => total + amount, 0)
    .toLocaleString('en-US', { style: 'currency', currency: 'USD' });

  const ndpTotal = Array.from(document.querySelectorAll('#results tr td:nth-child(5)'))
    .filter(td => td.innerText === 'NDP')
    .map(td => parseInt(td.previousElementSibling.innerText))
    .reduce((total, amount) => total + amount, 0)
    .toLocaleString('en-US', { style: 'currency', currency: 'USD' });

  const liberalTotal = Array.from(document.querySelectorAll('#results tr td:nth-child(5)'))
    .filter(td => td.innerText === 'Liberal')
    .map(td => parseInt(td.previousElementSibling.innerText))
    .reduce((total, amount) => total + amount, 0)
    .toLocaleString('en-US', { style: 'currency', currency: 'USD' });

  document.querySelector('#number-of-donations').innerText = numberOfDonations;
  document.querySelector('#pc-total').innerText = pcTotal;
  document.querySelector('#ndp-total').innerText = ndpTotal;
  document.querySelector('#liberal-total').innerText = liberalTotal;

  const summaryBox = document.querySelector('#summary-box');
  summaryBox.style.display = 'block';
};

// Define a function to sort the table by a given column
const sortTable = (table, column, asc = true) => {
  // Code to sort the table...
};

// Add event listeners to the table headers to sort the table when clicked
const tableHeaders = document.querySelectorAll('#results th');
tableHeaders.forEach(header => {
  header.addEventListener('click', () => {
    const column = header.dataset.column;
    const asc = header.dataset.asc === 'true';

    sortTable(resultsTable, column, asc);

    header.dataset.asc = (!asc).toString();
  });
});



// Call the updateSummary function after the results table has been updated with the search results
input.addEventListener('keyup', () => {
  // Code to search the CSV data and display the results...

  // Call the updateSummary function after the results table has been updated only if there are search results
  if (results.length > 0) {
    updateSummary();

    
  }


  //I think this goes here but I'm not sure
  
});

  });
  


  
});





