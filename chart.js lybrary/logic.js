var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Alamo Square',
        'Bayview Hunters Point',
        'Bernal Heights',
        'Castro/Upper Market',
        'Excelsior',
        'Financial District/South Beach',
        'Glen Park',
        'Haight Ashbury',
        'Hayes Valley',
        'Inner Richmond',
        'Inner Sunset',
        'Lakeshore',
        'Lone Mountain/USF',
        'Marina',
        'Mission',
        'Mission Bay',
        'Nob Hill',
        'Noe Valley',
        'North Beach',
        'Oceanview/Merced/Ingleside',
        'Outer Mission',
        'Outer Richmond',
        'Pacific Heights',
        'Portola',
        'Potrero Hill',
        'Presidio Heights',
        'Russian Hill',
        'South of Market',
        'Sunset/Parkside',
        'Tenderloin',
        'Twin Peaks',
        'Visitacion Valley',
        'West of Twin Peaks',
        'Western Addition'],
        datasets: [{
            label: '# Properties by Neighborhood',
            data: [1,
                9,
                7,
                16,
                5,
                3,
                13,
                11,
                9,
                3,
                4,
                5,
                7,
                7,
                11,
                15,
                15,
                20,
                7,
                8,
                2,
                9,
                20,
                2,
                11,
                5,
                5,
                53,
                12,
                1,
                17,
                1,
                2,
                5],
            backgroundColor: [ 
              
              'rgba(255, 99, 132, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(255, 99, 132, 1)', 'rgba(255, 99, 132, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(255, 99, 132, 1)', 'rgba(255, 99, 132, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(255, 99, 132, 1)', 'rgba(255, 99, 132, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(128, 0, 128, 1)', 'rgba(255, 99, 132, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(128, 0, 128, 1)', 'rgba(255, 255, 0, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(255, 99, 132, 1)', 'rgba(255, 99, 132, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(255, 99, 132, 1)', 'rgba(255, 99, 132, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(255, 99, 132, 1)', 'rgba(255, 99, 132, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(255, 99, 132, 1)','rgba(255, 99, 132, 1)',
              'rgba(128, 0, 128, 1)', 'rgba(255, 99, 132, 1)',
              'rgba(255, 99, 132, 1)','rgba(255, 99, 132, 1)',
              'rgba(255, 99, 132, 1)'

              
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
              fontSize: 20
            }
          }],
            yAxes: [{
              ticks: {
                    beginAtZero: true,
                    fontSize: 20
                }
            }]
        }
    }
});