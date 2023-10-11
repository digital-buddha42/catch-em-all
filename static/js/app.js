// Data table
d3.json("api/stats").then((data) => {

    console.log(data)
  
    // $(document).ready(function() {
    $('#example').DataTable( {
        data: data['table'],
        columns: [
            { title: "Name" },
            { title: "Abilities" },
            { title: "Type 1"},
            { title: "Type 2"},
            { title : "Base Experience"},
            { title: "Height"},
            { title: "Weight"},
            { title : "HP"},
            { title : "Attack"},
            { title : "Defense"},
            { title : "Speed"},
            { title : "Base Pokemon"}
           
        ]
    } );
  
  })

   

// Test chart
function buildBoxChart(type) {

  console.log(type);

  d3.json(`api/box/${type}`).then((data) => {

    console.log(data)
  
    var trace1 = {
      type: 'bar',
      x: data['labels'],
      y: data['scores'],
      marker: {
          color: '#C8A2C8',
      }
    };
    
    var data = [ trace1 ];
    
    var layout = { 
      title: 'Average Stats by Type',
    };
    
    var config = {responsive: true}
    
    Plotly.newPlot('v-bar', data, layout, config );
  
  })
}

function optionTypeChanged(newType) {
  buildBoxChart(newType);
}

// Charts
function buildPokemonChart(pokemon) {

  console.log(pokemon);

  d3.json(`/api/pokemons/${pokemon}`).then((data) => {

    console.log(data)

    var trace2 = {
      type: 'bar',
      x: data['labels'],
      y: data['scores'][0],
      marker: {
          color: '#C8A2C8',
      }
    };
    
    var data2 = [ trace2 ];
    
    var layout2 = { 
      title: data['names'],
    };
    
    var config2 = {responsive: true}

    console.log(data['pictures'][0][0])

    var pokeimage = data['pictures'][0][0]
    document.getElementById('pokeimage').src=pokeimage

  //   img = go.Image(
  //     filename= pokeimage,
  //     width=400,
  //     height=400,
  // )
  // // # Create a figure
  //   fig = go.Figure(data=[img])
  // // # Show the figure
  //   fig.show()
    
    Plotly.newPlot('v-bar2', data2, layout2, config2 );
    Plotly.newPlot('pokeimage', pokeimage)
  
  })
}


/// Function to update the bar chart
function updateBarChart(pokemonName, data) {
  console.log(data)
 

  var trace3 = {
    type: 'bar',
    x: data['labels'],
    y: data['scores'][0],
    marker: {
        color: '#C8A2C8',
    }
  }

  
  var data3 = [ trace3 ];

  
  
  var layout3 = { 
    title: data['names'],
  }
  
  var config3 = {responsive: true}
  
  Plotly.newPlot('v-bar2', data3, layout3, config3 );

  var pokeimage = data['pictures'][0][0]
    document.getElementById('pokeimage').src=pokeimage

  Plotly.newPlot('pokeimage', pokeimage)

}
    

// Event listener for dropdown change
document.getElementById('pokemon-select').addEventListener('change', function () {

  var selectedPokemon = this.value; 
  console.log(selectedPokemon)
  // Get the selected Pokémon name
  // Make an AJAX request to your server to get stats for the selected Pokémon
  // You will need to implement a route in your Flask app to handle this request
  // Once you have the stats, call the updateBarChart function
  
  d3.json(`/api/pokemons/${selectedPokemon}`).then((data) => {
    console.log(data)
    updateBarChart(selectedPokemon, data)

  })

});

// Summary panel
// function buildPokemonPanel(pokemon) {

//   console.log(pokemon);

//   d3.json(`/api/pokemons/${pokemon}`).then((data) => {

//     console.log(data)

//     // Pokemon summary panel
//     summary_info = data.summary_info;
//     // let selectedInfo = summary_info.filter(m => m.id == id);

//     let panel = d3.select(".panel panel-primary");

//     panel.attr("class", "table table-striped");

//     // Use D3 to select the panel body
//     let pbody = d3.select("#sample-metadata");

//     // Reset html so I can select new IDs
//     //pbody.html("");

//     // Append row `tr` to the panel body for each key value pair
//     let prow = pbody.append("tr");

//     data.scores.forEach(([key, value]) => {
//         prow.append("tr").text(`${key}: ${value}`);
//   })
// })
// }

function optionPokemonChanged(newPokemon) {
  buildPokemonChart(newPokemon);
}

buildBoxChart("normal")

buildPokemonChart("bulbasaur")

// buildPokemonPanel("bulbasaur")
