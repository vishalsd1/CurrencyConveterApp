const amount = document.getElementById("amount")
const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const convertButton = document.getElementById("convertButton");
const result = document.getElementById("result");

// Add event listener to the convert button
convertButton.addEventListener("click", convertCurrency);

// Function to handle currency conversion
async function convertCurrency() {
  const amountValue = parseFloat(amount.value);
  const from = fromCurrency.value;
  const to = toCurrency.value;

  // Basic input validation
  if (isNaN(amountValue) || amountValue <= 0) {
    result.textContent = "Please enter a valid positive amount.";
    return;
  }

  result.textContent = `Converting ${amountValue} ${from} to ${to}...`;

  try {
   
    await new Promise(resolve => setTimeout(resolve, 1000));

    let convertedAmount;
    if (from === to) {
      convertedAmount = amountValue;
    } else {

      const simulatedRates = {
        "USD": { "EUR": 0.92, "GBP": 0.79, "JPY": 156.80 },
        "EUR": { "USD": 1.09, "GBP": 0.86, "JPY": 170.50 },
        "GBP": { "USD": 1.27, "EUR": 1.16, "JPY": 198.00 },
        "JPY": { "USD": 0.0064, "EUR": 0.0059, "GBP": 0.0051 }
      };

      const rate = simulatedRates[from]?.[to];

      if (rate) {
        convertedAmount = amountValue * rate;
      } else {
        result.textContent = `Exchange rate for ${from} to ${to} not available in simulation.`;
        return;
      }
    }

    result.textContent = `${amountValue} ${from} = ${convertedAmount.toFixed(2)} ${to}`;

  } catch (error) {
    console.error("Error during conversion:", error);
    result.textContent = "An error occurred during conversion. Please try again.";
  }
}
