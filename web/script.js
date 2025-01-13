const { spawn } = require('child_process');

let UserData = {};  

let sleepChart;
let gradesChart;
let grindChart;

async function runProcess(executable, args) {
  console.log(args[1]);
  return new Promise((resolve, reject) => {
    let output = '';

    const process = spawn(executable, args);

    // Capture stdout
    process.stdout.on('data', (data) => {
      
      output += data.toString();
      console.log(output);
    });

    // Capture stderr
    process.stderr.on('data', (data) => {
      console.error(`Error: ${data}`);
    });

    // Handle process completion
    process.on('close', (code) => {
      if (code !== 0) {
        reject(`Process failed with exit code ${code}`);
      } else {
        resolve(output); // Resolve with the output
      }
    });
  });

}
// Function to compile and execute the C program
async function readData(option) {
    await runProcess('gcc', ['./BackEnd/readWriteData.c', '-o', './BackEnd/readWriteData']);                    // Compile C code.
    if(option==2 || option ==3)
      UserData.generalData= catString(await runProcess('./BackEnd/readWriteData', ['./BackEnd/data.txt', 'rActiveAndComplete']));  // Execute C code

      // Read Sleep.
    if(option ==1 || option ==2)
      UserData.sleepData = catString(await runProcess('./BackEnd/readWriteData', ['./BackEnd/sleepData.txt', 'rSleep']));                 // Execute C code
    if(option ==3 || option ==2)
        UserData.grades = catString(await runProcess('./BackEnd/readWriteData', ['./BackEnd/gradesData.txt', 'rGrades']));        
    if(option == 4 || option ==2)
      UserData.grindData = catString(await runProcess('./BackEnd/readWriteData', ['./BackEnd/grindData.txt', 'rGrind']));
    if(option == 5 || option ==2)
      UserData.chillData = catString(await runProcess('./BackEnd/readWriteData', ['./BackEnd/chillData.txt', 'rChill']));
    if(option == 6 || option ==2)
      UserData.monthlyGrind = (await runProcess('./BackEnd/readWriteData', ['./BackEnd/grindData.txt', 'monthlyGrind']));
    if(option == 7 || option ==2)
      UserData.monthlyChill = (await runProcess('./BackEnd/readWriteData', ['./BackEnd/chillData.txt', 'monthlyChill']));
    console.log(UserData.sleepData);
    return UserData;
}

function catString(output){
    let values =[];
    let charr = '';
    let x=0;
    for(let i=0;i<output.length;i++){
      if(output.charAt(i)!=='\n')
        charr+=output.charAt(i);
      else{
        values[x] = charr;
        charr = "";
        x++;
      }
  }
  return values;
}

async function wrtieActiveAndComplete(){
  await runProcess('./BackEnd/readWriteData', ['./BackEnd/data.txt',UserData.generalData[0], UserData.generalData[1], UserData.generalData[2],UserData.generalData[3],'wActiveAndComplete']);                 // Execute C code  
}

async function writeBack(path,value, option){
  await runProcess('./BackEnd/readWriteData', ['./BackEnd/'+path, value, option]);
}


function $(selector) {
  return document.querySelector(selector)
}

function find(el, selector) {
  let finded
  return (finded = el.querySelector(selector)) ? finded : null
}

function siblings(el) {
  const siblings = []
  for (let sibling of el.parentNode.children) {
    if (sibling !== el) {
      siblings.push(sibling)
    }
  }
  return siblings
}

const showAsideBtn = $('.show-side-btn')
const sidebar = $('.sidebar')
const wrapper = $('#wrapper')

showAsideBtn.addEventListener('click', function () {
  $(`#${this.dataset.show}`).classList.toggle('show-sidebar')
  wrapper.classList.toggle('fullwidth')
})

if (window.innerWidth < 767) {
  sidebar.classList.add('show-sidebar');
}

window.addEventListener('resize', function () {
  if (window.innerWidth > 767) {
    sidebar.classList.remove('show-sidebar')
  }
})

// dropdown menu in the side nav
var slideNavDropdown = $('.sidebar-dropdown');

$('.sidebar .categories').addEventListener('click', function (event) {
  event.preventDefault()

  const item = event.target.closest('.has-dropdown')

  if (! item) {
    return
  }

  item.classList.toggle('opened')

  siblings(item).forEach(sibling => {
    sibling.classList.remove('opened')
  })

  if (item.classList.contains('opened')) {
    const toOpen = find(item, '.sidebar-dropdown')

    if (toOpen) {
      toOpen.classList.add('active')
    }

    siblings(item).forEach(sibling => {
      const toClose = find(sibling, '.sidebar-dropdown')

      if (toClose) {
        toClose.classList.remove('active')
      }
    })
  } else {
    find(item, '.sidebar-dropdown').classList.toggle('active')
  }
})

$('.sidebar .close-aside').addEventListener('click', function () {
  $(`#${this.dataset.close}`).classList.add('show-sidebar')
  wrapper.classList.remove('margin')
})


// Global defaults
Chart.defaults.global.animation.duration = 2000; // Animation duration
Chart.defaults.global.title.display = false; // Remove title
Chart.defaults.global.defaultFontColor = '#71748c'; // Font color
Chart.defaults.global.defaultFontSize = 13; // Font size for every label

// Tooltip global resets
Chart.defaults.global.tooltips.backgroundColor = '#111827'
Chart.defaults.global.tooltips.borderColor = 'blue'

// Gridlines global resets
Chart.defaults.scale.gridLines.zeroLineColor = '#3b3d56'
Chart.defaults.scale.gridLines.color = '#3b3d56'
Chart.defaults.scale.gridLines.drawBorder = false

// Legend global resets
Chart.defaults.global.legend.labels.padding = 0;
Chart.defaults.global.legend.display = false;

// Ticks global resets
Chart.defaults.scale.ticks.fontSize = 12
Chart.defaults.scale.ticks.fontColor = '#71748c'
Chart.defaults.scale.ticks.beginAtZero = false
Chart.defaults.scale.ticks.padding = 10

// Elements globals
Chart.defaults.global.elements.point.radius = 0

// Responsivess
Chart.defaults.global.responsive = true;
Chart.defaults.global.maintainAspectRatio = false

///////////////////////////////////////////////////////////////////////////////
/**     File Format
    0 :  study hours.
    1 :  chill hours.
    2 :  active projects.
    3 :  active assignments.
    4 :  completed projects.
    5 :  completed assignments.
    6 :  next break
*/

// Reusable function to update DOM elements
function updateElement(id, value) {
  document.getElementById(id).innerHTML = value;
}

// Function to calculate days until target date
function calculateDaysUntil(targetDate) {
  const today = new Date();
  return Math.ceil((targetDate - today) / 86400000); // Milliseconds to days
}

// Function to determine the season
function getSeason() {
  const month = new Date().getMonth() + 1; // 1-based month
  return month > 6 ? "Christmas" : "Summer";
}

// Function to calculate grind score
function calculateGrindScore(studyHours, chillHours) {
  return (((studyHours/1000) * 1.25) - ((chillHours/1000) * 0.0427)).toFixed(2);
}

// Function to create grades Chart.
function createGradesChart(data){
  return new Chart(document.getElementById('GradePerformance'), {
    type: 'line',
    data: {
      labels: ["January", "February", "March", "April", 'May', 'June', 'July',
                'August', 'September', 'October', 'November', 'December'],
      datasets: [{
        label: "AvgGrades",
        data: data,
        backgroundColor: 'transparent',
        borderColor: '#0d6efd',
        lineTension: .4,
        borderWidth: 1.5,
      }]
    },
    options: {
      scales: {
        yAxes: [{
          gridLines: {
            drawBorder: false
          },
          ticks: {
            stepSize: 25,
          }
        }],
        xAxes: [{
          gridLines: {
            display: false,
          },
        }]
      }
    }
  })
}


// Function to create sleep Chart.
function createSleepChart(data) {
  return new Chart(document.getElementById('SleepChart'), {
    type: 'bar',
    data: {
      labels: [
        "January", "February", "March", "April", 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ],
      datasets: [{
        label: "AvgSleep",
        data: data,
        backgroundColor: data.map(value => value < 8 ? "red" : "green"),
        borderColor: 'transparent',
        borderWidth: 2.5,
        barPercentage: 0.4,
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: { stepSize: 2 },
        }],
        xAxes: [{
          gridLines: { display: false }
        }]
      }
    }
  });
}
// Function to create the grind Chart.
function createGrindChart(sleepData, grindData, chillData){
  console.log("grind");
  console.log(sleepData,grindData, chillData);
  const grindHours = grindData.map(getHours);
  const chillHours = chillData.map(getHours);
  console.log(grindHours, chillHours);
  return new Chart(document.getElementById('grindChart'),{
    type: 'line',
    data: {
      labels: ["January", "February", "March", "April", 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [{
        label: "Sleep",
        lineTension: 0.2,
        borderColor: '#ffff00',
        borderWidth: 1.5,
        showLine: true,
        data: sleepData,
      }, {
        label: "Grind",
        lineTension: 0.2,
        borderColor: '#1e90ff',
        borderWidth: 1.5,
        data: grindHours,
      },{
        label: "Break",
        lineTension: 0.2,
        borderColor: '#ff0000',
        borderWidth: 1.5,
        data: chillHours,
      }]
    },
    options: {
      scales: {
        yAxes: [{
          gridLines: {
            drawBorder: false
          },
          ticks: {
            stepSize: 2
          }
        }],
        xAxes: [{
          gridLines: {
            display: false,
          },
        }],
      }
    }
  })
}

// Common function to populate the page
async function populatePage(userData) {
  const userName = "Antonios Kalattas";
  const status = "UCY student";

  const currentMonth = new Date().getMonth();
  console.log(currentMonth);
  const generalData = userData.generalData;
  const studyHours = userData.monthlyGrind;
  const chillHours = userData.monthlyChill;
  console.log("Study/Chill hours");
  console.log(studyHours);
  console.log(chillHours);


  const targetDate = new Date("2025-5-15");
  const daysForBreak = calculateDaysUntil(targetDate);
  const season = getSeason();

  // Update general information
  updateElement('UserName', userName);
  updateElement('Status', status);
  updateElement('DaysForBreak', daysForBreak);
  updateElement('nextBreak', season);

  // Update project and assignment data
  updateElement('numberOfAssignments', generalData[0]);
  updateElement('activeProjects', generalData[1]);
  updateElement('completedAssignments', generalData[2]);
  updateElement('completedProjects', generalData[3]);

  // Update grind data
  updateElement("grindTime", formatTime(studyHours));
  updateElement("chillTime", formatTime(chillHours));
  updateElement("grindScore", calculateGrindScore(studyHours, chillHours));

}

// Fill page the first time
async function fillPageFirstTime() {
  const userData = await readData(2);
  await populatePage(userData);

  // Create the sleep chart
  sleepChart =  createSleepChart(UserData.sleepData);
  gradesChart = createGradesChart(UserData.grades);
  grindChart =  createGrindChart(UserData.sleepData, UserData.grindData, UserData.chillData);
}

// Refresh the page with updated data --- Most of the times its better to manually change the html because its very expensive function.
async function refreshPage() {
  const userData = await readData(2);
  await populatePage(userData);


  // Update the sleep chart
  sleepChart.data.datasets[0].data = UserData.sleepData;
  sleepChart.data.datasets[0].backgroundColor = UserData.sleepData.map(value => value < 8 ? "red" : "green");
  sleepChart.update();

  // Update teh grades Chart.
  gradesChart.data.datasets[0].data = UserData.grades.map(Number); // Ensure grades are numeric
  gradesChart.update();                                            // Refresh the chart

  // Update the grindChart.
  grindChart.data.datasets[0].data = userData.sleepData;
  grindChart.data.datasets[1].data = userData.grindData.map(getHours);
  grindChart.data.datasets[2].data = userData.chillData.map(getHours);
  grindChart.update();
}

function increaseAssignments(){
  UserData.generalData[0] = Number(UserData.generalData[0]);
  UserData.generalData[0]++;
  document.getElementById('numberOfAssignments').innerHTML = UserData.generalData[0];
  wrtieActiveAndComplete();
}

function decreaseAssignments(){
  UserData.generalData[0] = Number(UserData.generalData[0]);
  if(UserData.generalData[0]>0){
    UserData.generalData[0]--;
    document.getElementById('numberOfAssignments').innerHTML = UserData.generalData[0];
    UserData.generalData[2] = Number(UserData.generalData[2]);
    UserData.generalData[2]++;
    document.getElementById('completedAssignments').innerHTML = UserData.generalData[2];
    wrtieActiveAndComplete();
  }
}

function increaseProjects(){
  UserData.generalData[1] = Number(UserData.generalData[1]);
  UserData.generalData[1]++;
  document.getElementById('activeProjects').innerHTML = UserData.generalData[1];
  wrtieActiveAndComplete();
}

function decreaseProjects(){
  UserData.generalData[1] = Number(UserData.generalData[1]);
  if(UserData.generalData[1]>0){
    UserData.generalData[1]--;
    document.getElementById('activeProjects').innerHTML = UserData.generalData[1];
    UserData.generalData[3] = Number(UserData.generalData[3]);
    UserData.generalData[3]++;
    document.getElementById('completedProjects').innerHTML = UserData.generalData[3];
    wrtieActiveAndComplete();
  }
}

// Initialize the page
fillPageFirstTime();

// Timer Variables
let timer;
let startTime;
let elapsedTime = 0;      // Tracks elapsed time in milliseconds
let isRunning = false;    // State to track if the timer is running
let activeTimer = null;   // Tracks the active timer ('study' or 'break')

// Toggle Start/Stop with Reset when Stopped
function toggleTimer(buttonId) {
    // Stop the active timer if switching between timers
    if (activeTimer && activeTimer !== buttonId) {
        stopTimer(activeTimer);                         // Stop and reset the previous timer
    }

    const button = document.getElementById(buttonId);   // Get the button by ID
    const label = button.querySelector('.label');       // Target the label for "Study" or "Break"

    if (isRunning && activeTimer === buttonId) {
        // Stop and Reset the timer if already running
        stopTimer(buttonId);
    } else {
        // Start timer
        startTime = Date.now() - elapsedTime;     // Adjust for paused time
        timer = setInterval(function () {
            elapsedTime = Date.now() - startTime; // Calculate elapsed time
            updateDisplay(buttonId);              // Update the display
        }, 1000);                                 // Update only every 1 second
        isRunning = true;                         // Update state
        activeTimer = buttonId;                   // Mark this timer as active

        // Update button design and text
        label.innerText = 'Stop';                 // Change label to Stop
        button.classList.remove('btn-success');   // Remove green style
        button.classList.add('btn-danger');       // Add red style
    }
}

// Stop Timer and Reset
async function stopTimer(buttonId) {
    const currentMonth = new Date().getMonth();   // get the current month.
    clearInterval(timer);                         // Stop the timer
    if(buttonId ==='startStudy'){
        console.log(elapsedTime);
        UserData.grindData[currentMonth] = Number(UserData.grindData[currentMonth]);      
        UserData.grindData[currentMonth] = Number(elapsedTime);   // save it to the study hours.
        writeBack("grindData.txt", UserData.grindData[currentMonth], "wGrind");
        UserData.monthlyGrind = Number(UserData.monthlyGrind);      
        UserData.monthlyGrind+=elapsedTime;
        document.getElementById('grindTime').innerHTML =formatTime(UserData.monthlyGrind);
    }
    else{
      console.log(elapsedTime);
      UserData.chillData[currentMonth] = Number(UserData.chillData[currentMonth]);      
      UserData.chillData[currentMonth] = Number(elapsedTime);     // save it to the chill hours.
      writeBack("chillData.txt", UserData.chillData[currentMonth], "wChill");
      UserData.monthlyChill = Number(UserData.monthlyChill);      
      UserData.monthlyChill+=elapsedTime;
      document.getElementById('chillTime').innerHTML = formatTime(UserData.monthlyChill);
    }
    updateElement("grindScore", calculateGrindScore(UserData.grindData[currentMonth], UserData.chillData[currentMonth]));
    timer = null;                                 // Clear the timer reference
    isRunning = false;                            // Update state
    elapsedTime = 0;                              // Reset elapsed time
    activeTimer = null;                           // Clear the active timer

    // Reset the button
    const button = document.getElementById(buttonId);
    const label = button.querySelector('.label'); // Target the label

    if (buttonId === 'startStudy') {
        label.innerText = 'Study';                // Reset text for Study
        button.classList.remove('btn-danger');    // Remove red style
        button.classList.add('btn-success');      // Add green style
    } else {
        label.innerText = 'Break';                // Reset text for Break
        button.classList.remove('btn-danger');    // Remove red style
        button.classList.add('btn-danger');       // Add green style
    }

    updateDisplay(buttonId);                      // Reset display
}

// Update Timer Display
function updateDisplay(buttonId) {
    const button = document.getElementById(buttonId);
    const timeDisplay = button.querySelector('.time');  // Target time span inside the button
    timeDisplay.innerText = formatTime(elapsedTime);    // Update only time, not label
}

// Format Time as HH:MM:SS
function formatTime(ms) {
  const hours = Math.floor(ms / 3600000);             // Convert to hours
  const minutes = Math.floor((ms % 3600000) / 60000); // Remaining minutes
  const seconds = Math.floor((ms % 60000) / 1000);    // Remaining seconds

  return `${padNumber(hours)}:${padNumber(minutes)}:${padNumber(seconds)}`;
}
function getHours(ms){
  return Math.floor(ms / 3600000);                    // return hours
    
}

// Pad Numbers with Leading Zeros
function padNumber(number, length = 2) {
    return String(number).padStart(length, '0');        // Pad number with leading zeros
}

// Attach Event Listener for Buttons
document.getElementById('startStudy').addEventListener('click', () => toggleTimer('startStudy'));
document.getElementById('startBreak').addEventListener('click', () => toggleTimer('startBreak'));
