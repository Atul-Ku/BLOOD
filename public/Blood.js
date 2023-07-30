// Get the elements
// var decrementButton = document.getElementById("decrement");
// var incrementButton = document.getElementById("increment");
// var countSpan = document.getElementById("count");

// Initial count value
var count = 0;

// Function to update the count span
function updateCount() {
  countSpan.textContent = count;
}

// Event listener for the decrement button
decrementButton.addEventListener("click", function() {
  count--;
  updateCount();
});

// Event listener for the increment button
incrementButton.addEventListener("click", function() {
  count++;
  updateCount();
});
