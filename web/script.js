const { spawn } = require('child_process');

let UserData = {};  

var sleepChart;

async function runProcess(executable, args) {
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
      UserData.generalData= catString(await runProcess('./BackEnd/readWriteData', ['./BackEnd/data.txt', '1']));  // Execute C code

      // Read Sleep.
    if(option ==1 || option ==2)
      UserData.sleepData = catString(await runProcess('./BackEnd/readWriteData', ['./BackEnd/sleepData.txt', 'rSleep']));                 // Execute C code
    return UserData;
}

async function writeData(){
  await runProcess('./BackEnd/readWriteData', ['./BackEnd/data1.txt',UserData.generalData[0], UserData.generalData[1], UserData.generalData[2], UserData.generalData[3], UserData.generalData[4],UserData.generalData[5],'0']);                 // Execute C code  
}

async function writeSleep(sleepHours){
  await runProcess('./BackEnd/readWriteData', ['./BackEnd/sleepData.txt', sleepHours, "wSleep"]);
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

//showAsideBtn.addEventListener('click', function () {
//  $(`#${this.dataset.show}`).classList.toggle('show-sidebar')
//  wrapper.classList.toggle('fullwidth')
//})

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
Chart.defaults.global.responsive = true
Chart.defaults.global.maintainAspectRatio = false





//GradePerformance chart
var chart = new Chart(document.getElementById('GradePerformance'), {
  type: 'line',
  data: {
    labels: ["January", "February", "March", "April", 'May', 'June', 'August', 'September'],
    datasets: [{
      label: "My First dataset",
      data: [4, 20, 5, 20, 5, 25, 9, 18],
      backgroundColor: 'transparent',
      borderColor: '#0d6efd',
      lineTension: .4,
      borderWidth: 1.5,
    }, {
      label: "Month",
      data: [11, 25, 10, 25, 10, 30, 14, 23],
      backgroundColor: 'transparent',
      borderColor: '#dc3545',
      lineTension: .4,
      borderWidth: 1.5,
    }, {
      label: "Month",
      data: [16, 30, 16, 30, 16, 36, 21, 35],
      backgroundColor: 'transparent',
      borderColor: '#f0ad4e',
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
          stepSize: 12,
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

var grindChart = document.getElementById('grindChart');
var myChart = new Chart(grindChart, {
  type: 'line',
  data: {
    labels: ["January", "February", "March", "April", 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [{
      label: "Lost",
      lineTension: 0.2,
      borderColor: '#d9534f',
      borderWidth: 1.5,
      showLine: true,
      data: [3, 30, 16, 30, 16, 36, 21, 40, 20, 30],
      backgroundColor: 'transparent'
    }, {
      label: "Lost",
      lineTension: 0.2,
      borderColor: '#5cb85c',
      borderWidth: 1.5,
      data: [6, 20, 5, 20, 5, 25, 9, 18, 20, 15],
      backgroundColor: 'transparent'
    },{
      label: "Lost",
      lineTension: 0.2,
      borderColor: '#f0ad4e',
      borderWidth: 1.5,
      data: [12, 20, 15, 20, 5, 35, 10, 15, 35, 25],
      backgroundColor: 'transparent'
    },{
      label: "Lost",
      lineTension: 0.2,
      borderColor: '#337ab7',
      borderWidth: 1.5,
      data: [16, 25, 10, 25, 10, 30, 14, 23, 14, 29],
      backgroundColor: 'transparent'
    }]
  },
  options: {
    scales: {
      yAxes: [{
        gridLines: {
          drawBorder: false
        },
        ticks: {
          stepSize: 12
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

async function fillPageFirstTime(){
  UserData = await readData(2);
  const userName = "Antonios Kalattas"
  const status = "UCY student"

  const StudyHours = UserData.generalData[0];
  const chillHours = UserData.generalData[1];

  const numberOfActiveProjects = UserData.generalData[2];
  const numberOfActiveAssignments = UserData.generalData[3];

  const numberOfCompletedProject = UserData.generalData[4];
  const numberOfCompletedAssignments = UserData.generalData[5];

  document.getElementById('UserName').innerHTML = userName;
  document.getElementById('Status').innerHTML = status;

  // yyyy-mm-dd
  const today = new Date();
  const targetDate = new Date("2024-12-31");
  if(today.getMonth()+1>6)  // turn month into 1 base.
  var season;
    else
    season = "Christmas";

    season = "Summer"
  const difference = Math.ceil((targetDate - today)/86400000);
  document.getElementById('DaysForBreak').innerHTML = difference;

  document.getElementById('nextBreak').innerHTML = season;

  document.getElementById('activeProjects').innerHTML = numberOfActiveProjects;

  document.getElementById('numberOfAssignments').innerHTML = numberOfActiveAssignments;

  document.getElementById('completedAssignments').innerHTML = numberOfCompletedAssignments;

  document.getElementById('completedProjects').innerHTML = numberOfCompletedProject;

  document.getElementById("grindTime").innerHTML = StudyHours;

  document.getElementById("chillTime").innerHTML = chillHours;
  
  document.getElementById("grindScore").innerHTML = (StudyHours*10.25)-(chillHours*0.427);


      /// Sleep Chart//
    sleepChart = new Chart(document.getElementById('SleepChart'), {
    type: 'bar',
    data: {
      labels: ["January", "February", "March", "April", 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [{
        label: "AvgSleep",
        data: [UserData.sleepData[0], UserData.sleepData[1], UserData.sleepData[2], UserData.sleepData[3], UserData.sleepData[4], UserData.sleepData[5], UserData.sleepData[6], UserData.sleepData[7], UserData.sleepData[8], UserData.sleepData[9], UserData.sleepData[10], UserData.sleepData[11]],
        backgroundColor: [
          UserData.sleepData[0] < 8 ? "red" : "green", // Conditional check
          UserData.sleepData[1] < 8 ? "red" : "green",
          UserData.sleepData[2] < 8 ? "red" : "green",
          UserData.sleepData[3] < 8 ? "red" : "green",
          UserData.sleepData[4] < 8 ? "red" : "green",
          UserData.sleepData[5] < 8 ? "red" : "green",
          UserData.sleepData[6] < 8 ? "red" : "green",
          UserData.sleepData[7] < 8 ? "red" : "green",
          UserData.sleepData[8] < 8 ? "red" : "green",
          UserData.sleepData[9] < 8 ? "red" : "green",
          UserData.sleepData[10] < 8 ? "red" : "green",
          UserData.sleepData[11] < 8 ? "red" : "green"
        ],
        borderColor: 'transparent',
        borderWidth: 2.5,
        barPercentage: 0.4,
      }]
    },
    options: {
      scales: {
        yAxes: [{
          gridLines: {},
          ticks: {
            stepSize: 2,
          },
        }],
        xAxes: [{
          gridLines: {
            display: false,
          }
        }]
      }
    }
  })  
}
fillPageFirstTime();

async function refreshPage(){
  UserData = await readData(1);
  const userName = "Antonios Kalattas"
  const status = "UCY student"

  const StudyHours = UserData.generalData[0];
  const chillHours = UserData.generalData[1];

  const numberOfActiveProjects = UserData.generalData[2];
  const numberOfActiveAssignments = UserData.generalData[3];

  const numberOfCompletedProject = UserData.generalData[4];
  const numberOfCompletedAssignments = UserData.generalData[5];

  document.getElementById('UserName').innerHTML = userName;
  document.getElementById('Status').innerHTML = status;

  // yyyy-mm-dd
  const today = new Date();
  const targetDate = new Date("2024-12-31");
  if(today.getMonth()+1>6)
  var season;
    else
    season = "Christmas";

    season = "Summer"
  const difference = Math.ceil((targetDate - today)/86400000);
  document.getElementById('DaysForBreak').innerHTML = difference;

  document.getElementById('nextBreak').innerHTML = season;

  document.getElementById('activeProjects').innerHTML = numberOfActiveProjects;

  document.getElementById('numberOfAssignments').innerHTML = numberOfActiveAssignments;

  document.getElementById('completedAssignments').innerHTML = numberOfCompletedAssignments;

  document.getElementById('completedProjects').innerHTML = numberOfCompletedProject;

  document.getElementById("grindTime").innerHTML = StudyHours;

  document.getElementById("chillTime").innerHTML = chillHours;
  
  document.getElementById("grindScore").innerHTML = ((StudyHours*10.25)-(chillHours*0.427)).toFixed(2);

  sleepChart.data.datasets[0].data = UserData.sleepData;

  sleepChart.update();
}