// Get elements
const studyHoursBtn = document.getElementById('studyHoursBtn');
const breakHoursBtn = document.getElementById('breakHoursBtn');
const sleepHoursBtn = document.getElementById('sleepHoursBtn');
const submitNumber = document.getElementById('submitNumber');
const numberInput = document.getElementById('numberInput');
const errorMessage = document.getElementById('errorMessage');
const addGrades = document.getElementById('addGradesBtn');
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

addGrades.addEventListener('click', () =>{
  currentAction = 'addGrades';
  document.getElementById('numberInputModalLabel').textContent = 'Enter Grade';
  numberInputModal.show(); // Open modal
  
});

// Handle submit button click
submitNumber.addEventListener('click', async () => {
  const number = numberInput.value;

  // Validate input
  if(number === '' || isNaN(number)){
    errorMessage.textContent = 'Please enter a valid number.';
  } 
  else{
    // Perform different actions based on the button clicked
    if(currentAction === 'studyHours'){
      alert(`Study Hours Entered: ${number}`); 
      UserData.generalData[0] =Number(UserData.generalData[0]);
      UserData.generalData[0]+=Number(number);
      console.log(UserData.generalData[0]);
      await writeData();
    }
    else if (currentAction === 'breakHours'){
      alert(`Break Hours Entered: ${number}`); 
      UserData.generalData[1] = Number(UserData.generalData[1]);
      UserData.generalData[1]+=Number(number);
      await writeData();
    }
    else if(currentAction ==='sleepHours'){
        alert(`Sleep Hours Entered: ${number}`); 
        await writeBack("sleepData.txt",number, "wSleep");   
    }
    else if(currentAction ==='addGrades'){
      alert(`Sleep Hours Entered: ${number}`); 
        await writeBack("gradesData.txt",number, "wGrade");
    }

    // Close modal and clear inputs
    numberInputModal.hide();
    errorMessage.textContent = '';
    numberInput.value = '';
    await refreshPage();
  }
});
