// Get the context of the canvas element
var ctx = document.getElementById('myChart').getContext('2d');

// Define the data for the chart
var data = {
    labels: ['United States', 'China', 'Japan', 'Brazil', 'France', 'India'],
    datasets: [{
        label: 'Inflation rate Amongst Global Economies',
        backgroundColor: 'rgba(255, 99, 132, 0.2)', // Red
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        data: [ 2.8, 1, 2.2, 4.1, 2.4, 4.6]
    }]
};


var options = {
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true
            }
        }]
    }
};

// Create the bar chart
var myChart = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: options
});
