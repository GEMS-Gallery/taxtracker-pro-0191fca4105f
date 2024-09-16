import { backend } from 'declarations/backend';

// Function to add a new TaxPayer
async function addTaxPayer(event) {
    event.preventDefault();
    const tid = document.getElementById('tid').value;
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const address = document.getElementById('address').value;

    const taxPayer = { tid, firstName, lastName, address };

    try {
        await backend.addTaxPayer(taxPayer);
        alert('TaxPayer added successfully');
        document.getElementById('addTaxPayerForm').reset();
        displayAllTaxPayers();
    } catch (error) {
        console.error('Error adding TaxPayer:', error);
        alert('Failed to add TaxPayer');
    }
}

// Function to search for a TaxPayer by TID
async function searchTaxPayer() {
    const tid = document.getElementById('searchTid').value;
    const resultDiv = document.getElementById('searchResult');

    try {
        const taxPayer = await backend.getTaxPayer(tid);
        if (taxPayer) {
            resultDiv.innerHTML = `
                <h3>TaxPayer Found:</h3>
                <p>TID: ${taxPayer.tid}</p>
                <p>Name: ${taxPayer.firstName} ${taxPayer.lastName}</p>
                <p>Address: ${taxPayer.address}</p>
            `;
        } else {
            resultDiv.innerHTML = '<p>No TaxPayer found with this TID.</p>';
        }
    } catch (error) {
        console.error('Error searching for TaxPayer:', error);
        resultDiv.innerHTML = '<p>Error searching for TaxPayer.</p>';
    }
}

// Function to display all TaxPayers
async function displayAllTaxPayers() {
    const listDiv = document.getElementById('taxPayerList');

    try {
        const taxPayers = await backend.getAllTaxPayers();
        listDiv.innerHTML = '<h3>All TaxPayers:</h3>';
        taxPayers.forEach(tp => {
            listDiv.innerHTML += `
                <div>
                    <p>TID: ${tp.tid}</p>
                    <p>Name: ${tp.firstName} ${tp.lastName}</p>
                    <p>Address: ${tp.address}</p>
                    <hr>
                </div>
            `;
        });
    } catch (error) {
        console.error('Error fetching TaxPayers:', error);
        listDiv.innerHTML = '<p>Error fetching TaxPayers.</p>';
    }
}

// Event listeners
document.getElementById('addTaxPayerForm').addEventListener('submit', addTaxPayer);
document.getElementById('searchButton').addEventListener('click', searchTaxPayer);

// Initial display of all TaxPayers
displayAllTaxPayers();