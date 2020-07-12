var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Lakeshore','Mission','Tenderloin','Mission Bay','Japantown','Seacliff' ],
        datasets: [{
            label: '# Properties by Neighborhood',
            data: [5, 11, 1, 15, 0, 0],
            backgroundColor: [ 
              
              'rgba(255, 99, 132, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(255, 99, 132, 1',
                'rgba(153, 102, 255, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(153, 102, 255, 1)'
            ],
            borderColor: [
            ],
            borderWidth: 2
        }]
    },
    options: { 
      legend: {
        labels: {
            // This more specific font property overrides the global property
            fontColor: 'black',
            fontSize: 30

        }},
        scales: {
          xAxes:[{ 
            ticks:{
              fontSize: 30
            }
          }],
            yAxes: [{
              ticks: {
                    beginAtZero: true,
                    fontSize: 30
                }
            }]
        }
    }
});