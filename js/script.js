fetch(window.location.href + "/data.json")
.then(response => response.json())
.then(data => 
{
    createChartsBasedOnData(data);
});

function createChartsBasedOnData(data)
{
    const highestAmount = findHighestAmount(data);

    data.forEach(element => 
    {
        const chartsContainer = document.querySelector('.charts-container');

        const amount = element.amount;
        const day = element.day;

        const currentDay = new Date().getDay();
        const currentDayName = getCurrentDayName(currentDay);

        const item = document.createElement('div');
        item.className = 'item flex-column';
    
        const chart = document.createElement('div');
        chart.className = 'chart';
        
        if(currentDayName == day)
        {
            chart.classList.toggle("current");
        }

        const moneySpentPanel = document.createElement('div');
        moneySpentPanel.className = 'money-spent-panel';

        const moneySpent = document.createElement('p');
        moneySpent.className = 'lead';
        moneySpent.textContent = `$${amount}`;
        moneySpentPanel.appendChild(moneySpent);

        chart.appendChild(moneySpentPanel);

        const title = document.createElement('h3');
        title.className = 'title';
        title.textContent = day;    

        item.appendChild(chart);
        item.appendChild(title);
    
        chartsContainer.appendChild(item);

        
        const percentage = (amount / highestAmount) * 100;
        console.log(percentage);

        chart.style.height = `${percentage}%`;
    });


}

function getCurrentDayName(currentDay)
{
    let dayName;

    switch(currentDay)
    {
        case 1:
            dayName = 'mon';
            break;
        case 2:
            dayName = 'tue';
            break;
        case 3:
            dayName = 'wed';
            break;
        case 4:
            dayName = 'thu';
            break;
        case 5:
            dayName = 'fri';
            break;
        case 6:
            dayName = 'sat';
        break;
            case 7:
            dayName = 'sun';
        break;
    }

    return dayName;
}

function findHighestAmount(data)
{
    const array = data.map(a => a.amount);
    const highestAmount = Math.max(...array);

    return highestAmount;
}