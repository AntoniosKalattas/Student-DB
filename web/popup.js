// Get elements
const studyHoursBtn = document.getElementById('studyHoursBtn');
const breakHoursBtn = document.getElementById('breakHoursBtn');
const sleepHoursBtn = document.getElementById('sleepHoursBtn');
const submitNumber = document.getElementById('submitNumber');
const numberInput = document.getElementById('numberInput');
const errorMessage = document.getElementById('errorMessage');
const numberInputModal = new bootstrap.Modal(document.getElementById('numberInputModal'));

// Track which button was clicked
let currentAction = '';

// Open modal when buttons are clicked
studyHoursBtn.addEventListener('click', () => {
  currentAction = 'studyHours';
  document.getElementById('numberInputModalLabel').textContent = 'Enter Study Hours';
  numberInputModal.show(); // Open modal
});

breakHoursBtn.addEventListener('click', () => {
  currentAction = 'breakHours';
  document.getElementById('numberInputModalLabel').textContent = 'Enter Break Hours';
  numberInputModal.show(); // Open modal
});

sleepHoursBtn.addEventListener('click', () =>{
    currentAction = 'sleepHours';
    document.getElementById('numberInputModalLabel').textContent = 'Enter Sleep hours';
    numberInputModal.show(); // Open modal
    
});

// Handle submit button click
submitNumber.addEventListener('click', () => {
  const number = numberInput.value;

  // Validate input
  if(number === '' || isNaN(number)){
    errorMessage.textContent = 'Please enter a valid number.';
  } 
  else{
    // Perform different actions based on the button clicked
    if(currentAction === 'studyHours'){
      alert(`Study Hours Entered: ${number}`); 
    }
    else if (currentAction === 'breakHours'){
      alert(`Break Hours Entered: ${number}`); 
    }
    else if(currentAction ==='sleepHours'){
        alert(`Sleep Hours Entered: ${number}`); 

    }

    // Close modal and clear inputs
    numberInputModal.hide();
    errorMessage.textContent = '';
    numberInput.value = '';
  }
});
