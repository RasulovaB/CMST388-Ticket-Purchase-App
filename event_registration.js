/*
		Your Name: <Bakhora Rasulova>
		Last Modified Date: <12/05/2020>
		File: event_registration.js
		File Description: <Gets references from DOM | Calculates total cost of the tickets | 
		Completes Purchase | Starts and ends Timer | Resets the page>
*/

// Set the minimum and maximum number of tickets able to be purchased
var minTickets = 1;
var maxTickets = 3;
// Set variables for the ticket cost
var costPerTicket = 5.0;
var ticketSurcharge = 0.5;

/*** YOUR CODE STARTS BELOW HERE ***/

// assign input with id name numtickets to the input variable / get reference
let input = document.querySelector("#numTickets");
// assign span with id name msgtickets to the errorMsg variable / get reference
let errorMsg = document.querySelector("#msgTickets");
// assign input with id name totalCost to the displayValue variable / get reference
let displayValue = document.querySelector("#totalCost");
// assign div tag with id name contactInformation to the contactInfo variable / get reference
let contactInfo = document.querySelector("#contactInformation");
// assign input with id name to the userName variable / get reference
let userName = document.querySelector("#name");
// assign input with id name email to the userEmail variable / get reference
let userEmail = document.querySelector("#email");
// assign span with id name msgname to the errorName variable / get reference
let errorName = document.querySelector("#msgname");
// assign span with id name msgemail to the errorEmail variable / get reference
let errorEmail = document.querySelector("#msgemail");
// get reference of the form and assign to the formPage variable
let formPage = document.querySelector("#contact");
// Reg Exp for names to test user input
let names = /^[a-z]+$/i;
// reg Exp for email to test user input
let emailValidation = /^[a-z0-9._%+-]{1,64}@[a-z0-9.-]{1,252}\.[a-z]{2,3}$/i;
// assign span with id name timer to the timerSpan variable / get reference
let timerSpan = document.querySelector("#timer");
// declare countDown outside of the startTimer fn scope
let countDown;

// countdown timer function
function startTimer() {
  // set variable for 600 seconds i.e. 10:00 min
  let timeSec = 600;
  // call displayTime fn
  displayTime(timeSec);
  // setInterval to run function every second
  countDown = setInterval(() => {
    // decrease second starting from 600 (10:00 min)
    timeSec--;
    // pass new value to displayTime function and display new time
    displayTime(timeSec);
    // if timeSec lower than 0
    if (timeSec < 0) {
      // call endTime fn
      endTime();
      // stop count down
      clearInterval(countDown);
    }
  }, 1000);
} // end of startTimer

// invoke fn
startTimer();

// function to display time with passed parameter timeSec
function displayTime(second) {
  // devide into min and seconds
  // for min & sec we devide second with 60 and use math.floor to remove decimal numbers
  const min = Math.floor(second / 60);
  // after devision, count how much second left
  const sec = Math.floor(second % 60);
  // update the span tag in HTML with min and sec
  // if min & sec lower than 10, add 0 before the number, else, add empty string
  timerSpan.innerHTML = `${min < 10 ? "0" : ""}${min}:${
    sec < 10 ? "0" : ""
  }${sec}`;
} // end of displayTime()

// function to display alert message to the user when the time is up
function endTime() {
  // alert method to display msg to the user
  alert(
    "Sorry your time to complete the form has expired\nPlease try again if you still wish to purchase tickets"
  );
  // redirect user to the main page
  window.location.href = "event_registration.html";
} // end of endTime()

// function to calculate total purchased tickets
function calculateTotal() {
  // declare variables
  let totalCost, fixedTotalCost;
  // check if user entered number
  if (isNaN(input.value)) {
    // if not a number, display error message
    errorMsg.textContent = "You can only buy between 1 and 3 tickets";
    // call invalid fn and pass parameter (field id)
    invalid(input);
  } else {
    // if it is a number, check if number between 1 & 3
    if (input.value >= minTickets && input.value <= maxTickets) {
      // if yes, call valid fn and pass errorMsg and input to clear
      valid(errorMsg, input);
      // count and assign total value
      totalCost = input.value * (costPerTicket + ticketSurcharge);
      // fix to two decimal number
      fixedTotalCost = "$" + totalCost.toFixed(2);
      // change value to a current total cost
      displayValue.setAttribute("value", fixedTotalCost);
      // display contact information to the user
      contactInfo.style.display = "block";
    } else {
      // if  number not between 1 & 3, call invalid fn
      invalid(input);
      // hide contact information
      contactInfo.style.display = "none";
      // display error msg
      errorMsg.textContent = "You can only buy between 1 and 3 tickets";
      // change value to default state
      displayValue.setAttribute("value", "$0.00");
    }
  }
  // return value
  return fixedTotalCost;
} // end of calculateTotal()

// function to validate user inputs and complete purchase
function completePurchase() {
  // declare new variable to count errors
  let errors = 0;
  // assign fn to a new variable amount to get the total cost value
  let amount = calculateTotal();
  // if name pass validation
  if (names.test(userName.value)) {
    // call valid fn
    valid(errorName, userName);
  } else {
    // if does not pass, display error message
    errorName.textContent = "Please enter your name";
    //call invalid fn
    invalid(userName);
    // increment error
    errors++;
  }
  // if email pass validateion
  if (emailValidation.test(userEmail.value)) {
    // call valid fn
    valid(errorEmail, userEmail);
  } else {
    // if does not pass, display error msg to the user
    errorEmail.textContent = "Please enter valid e-mail";
    // call invalid fn
    invalid(userEmail);
    // increment error
    errors++;
  }
  // if 0 errors
  if (errors === 0) {
    // display alert msg to the user with total price of the tickets
    alert(
      `Thank you for your purchase\nYour total cost is ${amount}\nPlease allow 24 hours for electronic delivery`
    );
    // redirect user to the main page
    window.location.href = "event_registration.html";
    // return true
    return true;
  } else {
    // if there are erorrs, return false
    return false;
  } // end of if test
} // end of completePurchase()

// function to reset page
formPage.addEventListener("reset", () => {
  // stop the timer
  clearInterval(countDown);
  // restart the timer
  startTimer();
  // change total cost to a default value
  displayValue.setAttribute("value", "$0.00");
  // hide contact information
  contactInfo.style.display = "none";
  // if after user tried to make purchase and enetered not valid info
  // reset to default state all inputs
  // and clean error messages
  valid(errorName, userName);
  valid(errorEmail, userEmail);
}); // end of reset fn

// function to change input color if there an error
function invalid(element) {
  // change input to yellow color
  element.style.background = "yellow";
} // end of invalid()

// function to change input color to default color and remove error msg
function valid(elemOne, elemTwo) {
  // change error msg to empty string
  elemOne.textContent = "";
  // change input background color to default grey
  elemTwo.style.background = "#efefef";
} // end of valid()
