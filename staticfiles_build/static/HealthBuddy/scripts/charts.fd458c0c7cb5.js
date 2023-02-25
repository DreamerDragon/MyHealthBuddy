var userReport = JSON.parse(document.getElementById('userReport').textContent);
const user_id = JSON.parse(document.getElementById('user_id').textContent);

const constructDate = (num) => {
    if (num < 10) {
        return '0' + num;
    } else {
        return num.toString()
    }
}

userReport.sort((a, b) => {
    const dateA = '' + a.year + constructDate(a.month) + constructDate(a.date);
    const dateB = '' + b.year + constructDate(b.month) + constructDate(b.date);
    return dateA > dateB ? 1 : -1;
})

const progress = userReport ? userReport.length : 0;

document.querySelector('#report-progress').innerHTML = progress;

let totalFruitCal = 0;
let totalVegsCal = 0;
let totalMeatCal = 0;
let totalDairyCal = 0;
let totalGrainCal = 0;
let totalOthersCal = 0;

const calories = [];
const weightData = [];
const calData = [];

userReport.forEach(item => {
    // date
    const date = '' + item.year + constructDate(item.month) + constructDate(item.date);
    // weight
    weightData.push({ x: date, y: item.weight });

    // cal portions
    totalFruitCal += item.fruits;
    totalVegsCal += item.vegs;
    totalMeatCal += item.meat;
    totalDairyCal += item.dairy;
    totalGrainCal += item.grain;
    totalOthersCal += item.others;

    const totalDailyCal = item.fruits + item.vegs + item.meat + item.dairy + item.grain + item.others;
    calData.push({
            x: date,
            y: totalDailyCal
        })
        //
});

const totalCal = totalFruitCal + totalVegsCal + totalMeatCal + totalDairyCal + totalGrainCal + totalOthersCal;
const avgTotalCal = progress > 0 ? totalCal / progress : 0;
document.querySelector('#report-daily-cal').innerHTML = parseInt(avgTotalCal) + ' Cal';

const calMap = {
    'fruit': totalFruitCal,
    'vegetable': totalVegsCal,
    'meat': totalMeatCal,
    'dairy': totalDairyCal,
    'grain': totalGrainCal,
    'others': totalOthersCal
}

let maxCal = 0;
let maxCalEl = 'None';
for (var key in calMap) {
    if (calMap[key] > maxCal) {
        maxCalEl = key;
        maxCal = calMap[key]
    }
}

document.querySelector('#report-dominant-cal').innerHTML = maxCalEl + ' (' + parseInt(maxCal) + ' Cal' + ')';

let weightChange = 0;

if (weightData.length > 1) {
    weightChange = weightData.slice(-1)[0].y - weightData[0].y;
}

document.querySelector('#report-weight-change').innerHTML = parseFloat(weightChange).toFixed(1) + ' kg';


// handle diary state toggle
var isEditingWeight = false;

const weightBtn = document.querySelector("#report-weight-goal-btn");
const weightInput = document.querySelector("#report-weight-goal-input");
const weightDisplay = document.querySelector("#report-weight-goal");

const renderInputs = () => {
    if (!isEditingWeight) {
        weightInput.style.display = 'none';
        weightDisplay.style.display = 'inline';
    } else {
        weightInput.style.display = 'inline';
        weightDisplay.style.display = 'none';
    }
}

renderInputs();

let currWeight = 0;
if (weightData.length > 0) {
    currWeight = weightData.slice(-1)[0].y;
}

const compareWeightGoal = () => {
    const successIcon = document.getElementById('report-weight-success');
    if (currWeight <= parseFloat(weightDisplay.innerHTML)) {
        successIcon.style.display = 'inline';
    } else {
        successIcon.style.display = 'none';
    }
}
compareWeightGoal();

document.querySelector('#report-current-weight').innerHTML = parseFloat(currWeight).toFixed(1) + ' kg';

// submit request
const getCookie = (token) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${token}=`);
    if (parts.length == 2) {
        return parts.pop().split(';').shift();
    }
}

const submitWeightGoal = () => {
    let weightVal = 0;
    if (isNaN(parseFloat(weightInput.value)) || parseFloat(weightInput.value) < 0) {
        weightVal = 0;
    } else {
        weightVal = parseFloat(weightInput.value).toFixed(1);
    }
    fetch(`/create_weight_goal`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "X-CSRFToken": getCookie("csrftoken")
        },
        body: JSON.stringify({
            weight: weightVal,
        })
    }).then(response => response.json()).then(
        weightDisplay.innerHTML = weightVal + ' kg'
    ).then(compareWeightGoal());
}

weightBtn.addEventListener('click', () => {
    if (!isEditingWeight) {
        isEditingWeight = true;
        weightBtn.innerHTML = 'Save';
    } else {
        submitWeightGoal();
        isEditingWeight = false;
        weightBtn.innerHTML = 'Edit';
    }
    renderInputs();
})

// data
const weightChartElement = document.getElementById('lineWeightChart');
const calChartElement = document.getElementById('lineCalChart');
const pieChartElement = document.getElementById('pieChart');

let calPortions = [totalVegsCal, totalFruitCal, totalMeatCal, totalDairyCal, totalGrainCal, totalOthersCal];

if (totalVegsCal == 0 && totalFruitCal == 0 && totalMeatCal == 0 && totalGrainCal == 0 && totalDairyCal == 0 && totalOthersCal == 0) {
    calPortions = [1, 1, 1, 1, 1, 1];
}

const barColors = [
    "#FFB48F",
    "#FCCD04",
    "#41B3A3",
    "#5680E9",
    '#A64AC9',
    "#84CEEB"
];

const weightChartData = {
    datasets: [{
        label: 'My Weight',
        data: weightData,
        borderWidth: 1.5,
        borderColor: "#5680E9",
        fill: false
    }]
}

const calChartData = {
    datasets: [{
        label: 'My Calories',
        data: calData,
        borderWidth: 1.5,
        borderColor: "#5680E9",
        fill: false
    }]
}

const pieChartData = {
    labels: ["Vegetable", "Fruits", "Meat", "Dairy", "Grains", "Others"],
    datasets: [{
        label: 'Calorie Portions',
        backgroundColor: barColors,
        data: calPortions,
    }]
}

const weightChartOptions = {
    scales: {
        x: {
            type: 'time',
            time: {
                unit: 'day'
            }
        }
    }
}

const weightChart = new Chart(weightChartElement, {
    type: 'line',
    data: weightChartData,
    options: weightChartOptions
});

const calChart = new Chart(calChartElement, {
    type: 'line',
    data: calChartData,
    options: weightChartOptions
});

const pieChart = new Chart(pieChartElement, {
    type: 'pie',
    data: pieChartData,
    options: {
        title: {
            display: true,
            text: "Calorie Portions"
        }
    }
});