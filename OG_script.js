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
// Define a function to calculate and display the summary information
const updateSummary = () => {
  // Get the number of donations from the number of rows in the results table
  const numberOfDonations = document.querySelectorAll('#results tr').length; // subtract 1 to exclude the header row

  const totalAmount = Array.from(document.querySelectorAll('#results td:nth-child(4)')) // get the values in the fourth column
  .map(td => parseInt(td.innerText))
  .filter(amount => !isNaN(amount)) // filter out NaN values
  .reduce((acc, amount) => acc + amount, 0);



  // Display the number of donations and the total amount in the summary box
  const numberOfDonationsElement = document.querySelector('#number-of-donations span');
  numberOfDonationsElement.innerText = numberOfDonations;

  const totalAmountElement = document.querySelector('#total-amount span');
  totalAmountElement.innerText = totalAmount;

  // Show the summary box
  const summaryBox = document.querySelector('#summary-box');
  summaryBox.style.display = 'block';
};


// Call the updateSummary function after the results table has been updated with the search results
input.addEventListener('keyup', () => {
  // Code to search the CSV data and display the results...

  // Call the updateSummary function after the results table has been updated only if there are search results
  if (results.length > 0) {
    updateSummary();
  }
});

  });
  


  
});



