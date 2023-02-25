var userDiaries = JSON.parse(document.getElementById('userDiaries').textContent);
const user_id = JSON.parse(document.getElementById('user_id').textContent);

// handle dates
const daysTag = document.querySelector(".days"),
    currentDate = document.querySelector(".current-date"),
    currentDiaryDate = document.querySelector(".diary__header-date"),
    prevNextIcon = document.querySelectorAll(".icons h5");

// getting new date, current year and month
let date = new Date(),
    currDate = date.getDate(),
    currYear = date.getFullYear(),
    currMonth = date.getMonth(),
    selectedMonth = currMonth,
    selectedYear = currYear;

// storing full name of all months in array
const months = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
];
const monthsMap = {
    '1': "January",
    '2': "February",
    '3': "March",
    '4': "April",
    '5': "May",
    '6': "June",
    '7': "July",
    '8': "August",
    '9': "September",
    '10': "October",
    '11': "November",
    '12': "December"
}

const totalWeight = document.getElementsByName('weight');
const totalCal = document.getElementById('total-calorie');
const fruits = document.getElementsByName('fruits');
const vegs = document.getElementsByName('vegs');
const meat = document.getElementsByName('meat')
const dairy = document.getElementsByName('dairy')
const grain = document.getElementsByName('grain')
const others = document.getElementsByName('others')
const notes = document.getElementsByName('notes');

const calVals = {
    fruits: fruits[0],
    vegs: vegs[0],
    meat: meat[0],
    dairy: dairy[0],
    grain: grain[0],
    others: others[0]
};

const calInputs = document.querySelectorAll(".diary__body-portions input");

var totalCalVal = parseInt(totalCal.innerHTML);


const toNum = (val) => {
    if (val && !isNaN(parseFloat(val))) {
        return parseFloat(val);
    } else {
        return 0;
    }
}

const calculateTotalCal = () => {
    let sum = 0;
    for (const [key, value] of Object.entries(calVals)) {
        sum += toNum(value.innerHTML);
    }
    totalCalVal = sum;
    totalCal.innerHTML = totalCalVal;
}

const filterDiary = (diaryItem) => {
    return "" + diaryItem.year + (diaryItem.month - 1) + diaryItem.date == "" + selectedYear + selectedMonth + currDate;
}

const renderDiary = () => {
    const filtered = userDiaries.find(diaryItem => filterDiary(diaryItem));
    if (filtered) {
        totalWeight[0].innerHTML = filtered.weight;
        totalWeight[1].value = filtered.weight;
        fruits[0].innerHTML = filtered.fruits;
        fruits[1].value = filtered.fruits;
        vegs[0].innerHTML = filtered.vegs;
        vegs[1].value = filtered.vegs;
        meat[0].innerHTML = filtered.meat;
        meat[1].value = filtered.meat;
        dairy[0].innerHTML = filtered.dairy;
        dairy[1].value = filtered.dairy;
        grain[0].innerHTML = filtered.grain;
        grain[1].value = filtered.grain;
        others[0].innerHTML = filtered.others;
        others[1].value = filtered.others;
        notes[0].innerHTML = filtered.notes;
        notes[1].value = filtered.notes;
        calculateTotalCal()
    } else {
        totalWeight[0].innerHTML = 0;
        totalWeight[1].value = 0;
        for (const [key, value] of Object.entries(calVals)) {
            value.innerHTML = 0;
        }
        for (const [key, value] of Object.entries(calInputs)) {
            value.value = 0;
        }
        notes[0].innerHTML = '';
        notes[1].value = '';
        totalCal.innerHTML = 0;
        totalCal.value = 0;
    }
}

renderDiary();

const renderCalendar = () => {
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), // getting first day of month
        lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // getting last date of month
        lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // getting last day of month
        lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month
    let liTag = "";
    for (let i = firstDayofMonth; i > 0; i--) { // creating li of previous month last days
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}`;
    }
    for (let i = 1; i <= lastDateofMonth; i++) { // creating li of all days of current month
        // adding active class to li if the current day, month, and year matched
        let isToday = i.toString() === currDate.toString() && currMonth === selectedMonth &&
            currYear === selectedYear ? "active" : "";
        if (userDiaries.find(diaryItem => "" + diaryItem.year + (diaryItem.month - 1) + diaryItem.date === "" + currYear + currMonth + i)) {
            liTag += `<li style='position: relative' class="${isToday}"><span>${i}</span><span style='position: absolute; right: 10%; bottom: 0; color: #41B3A3' class="bi bi-check-lg"></span></li>`;
        } else {
            liTag += `<li class="${isToday}"><span>${i}</span></li>`;
        }
    }
    for (let i = lastDayofMonth; i < 6; i++) { // creating li of next month first days
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}`
    }
    currentDate.innerText = `${monthsMap[currMonth + 1]} ${currYear}`;
    currentDiaryDate.innerText = `Diary (${currDate} ${monthsMap[selectedMonth + 1]} ${selectedYear})`;
    daysTag.innerHTML = liTag;
    const resetActive = () => {
        daysTag.childNodes.forEach(element => {
            if (element.className === 'active') {
                element.className = ''
            }
        })
    }
    daysTag.childNodes.forEach(element => {
        element.addEventListener("click", () => {
            if (element.className !== 'inactive') {
                resetActive();
                element.className = 'active';
                currDate = element.firstChild.innerHTML;
                selectedMonth = currMonth;
                selectedYear = currYear;
                currentDiaryDate.innerText = `Diary (${currDate} ${months[currMonth]} ${currYear})`;
                renderDiary();
            }
        })
    })
}

renderCalendar();
prevNextIcon.forEach(icon => { // getting prev and next icons
    icon.addEventListener("click", () => { // adding click event on both icons
        // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;
        if (currMonth < 0 || currMonth > 11) { // if current month is less than 0 or greater than 11
            // creating a new date of current year & month and pass it as date value
            date = new Date(currYear, currMonth, new Date().getDate());
            currYear = date.getFullYear(); // updating current year with new date year
            currMonth = date.getMonth(); // updating current month with new date month
        } else {
            date = new Date(); // pass the current date as date value
        }
        renderCalendar(); // calling renderCalendar function
    });
});

// For edit weight, calories, notes

var totalWeightValue = 0;

totalWeight[1].addEventListener('change', (event) => {
    totalWeightValue = toNum(event.target.value);
    totalWeight[0].innerHTML = totalWeightValue
})

calInputs.forEach(calInput => {
    calInput.addEventListener('change', (event) => {
        const name = calInput.name;
        const inputVal = toNum(event.target.value);
        document.getElementsByName(name)[0].innerHTML = inputVal;
        calculateTotalCal();
    })
})

notes[1].addEventListener('change', (event) => {
    notes[0].innerHTML = event.target.value;
})

// submit request
const getCookie = (token) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${token}=`);
    if (parts.length == 2) {
        return parts.pop().split(';').shift();
    }
}

const submitChanges = () => {
    const newDiaryItem = {
        year: selectedYear,
        month: selectedMonth + 1,
        date: currDate,
        weight: totalWeightValue,
        fruits: toNum(fruits[0].innerHTML),
        vegs: toNum(vegs[0].innerHTML),
        meat: toNum(meat[0].innerHTML),
        dairy: toNum(dairy[0].innerHTML),
        grain: toNum(grain[0].innerHTML),
        others: toNum(others[0].innerHTML),
        notes: notes[0].innerHTML
    };
    const filtered = userDiaries.find(diaryItem => filterDiary(diaryItem));
    fetch(`/create_diary_item`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "X-CSRFToken": getCookie("csrftoken")
        },
        body: JSON.stringify({
            year: selectedYear,
            month: selectedMonth + 1,
            date: currDate,
            weight: totalWeightValue,
            fruits: toNum(fruits[0].innerHTML),
            vegs: toNum(vegs[0].innerHTML),
            meat: toNum(meat[0].innerHTML),
            dairy: toNum(dairy[0].innerHTML),
            grain: toNum(grain[0].innerHTML),
            others: toNum(others[0].innerHTML),
            notes: notes[0].innerHTML
        })
    }).then(response => response.json()).then(
        filtered ?
        userDiaries = userDiaries.map(diaryItem => filterDiary(diaryItem) ? newDiaryItem : diaryItem) :
        userDiaries.push(newDiaryItem)
    ).then(
        renderCalendar()
    )
}

// handle diary state toggle
var isEditing = false;
const diaryForm = document.getElementById("diary-form");
const diaryBtn = document.querySelector(".diary__header-button");

const renderInputs = () => {
    const inputs = document.querySelectorAll("#diary-input");
    const display = document.querySelectorAll("#diary-display");
    if (!isEditing) {
        inputs.forEach(element => {
            element.style.display = 'none';
        })
        display.forEach(element => {
            element.style.display = 'inline';
        })
    } else {
        inputs.forEach(element => {
            element.style.display = 'inline';
        })
        display.forEach(element => {
            element.style.display = 'none';
        })
    }
}

renderInputs();

diaryBtn.addEventListener('click', () => {
    if (!isEditing) {
        isEditing = true;
        diaryBtn.innerHTML = 'Save';
    } else {
        if (user_id) {
            submitChanges();
        }
        isEditing = false;
        diaryBtn.innerHTML = 'Edit';
    }
    renderInputs();
})