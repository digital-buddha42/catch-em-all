let db = new sqlite3.Database('./pokemon.sqlite', (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the pokemon database.');
  });

// Charts
function buildStatsChart(id) {

    console.log(id);
  
    d3.json(`api/stats/${id}`).then((data) => {
  
      var trace1 = {
        type: 'bar',
        x: data['rating'],
        y: data['votes'],
        marker: {
            color: '#C8A2C8',
        }
      };
      
      var data = [ trace1 ];
      
      var layout = { 
        title: 'Stats',
      };
      
      var config = {responsive: true}
      
      Plotly.newPlot('bar', data, layout, config );
    
    })
  }