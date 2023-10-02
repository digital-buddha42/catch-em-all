// Data table
d3.json("api/stats").then((data) => {

    console.log(data)
  
    // $(document).ready(function() {
    $('#example').DataTable( {
        data: data['table'],
        columns: [
            { title: "Name" },
            { title: "Abilities" },
           
        ]
    } );
  
  })

// // Charts
// function buildBoxChart(data) {

//     console.log(data);
  
//     d3.json("api/box").then((data) => {

//       console.log(data)
  
//       var trace1 = {
//         type: 'bar',
//         x: data['labels'],
//         y: data['scores'],
//         marker: {
//             color: '#C8A2C8',
//         }
//       };
      
//       var data = [ trace1 ];
      
//       var layout = { 
//         title: 'Box',
//       };
      
//       var config = {responsive: true}
      
//       Plotly.newPlot('bar', data, layout, config );
    
//     })
//   }

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
      title: 'Boxes',
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
      title: 'Pokemon',
    };
    
    var config2 = {responsive: true}
    
    Plotly.newPlot('v-bar2', data2, layout2, config2 );
  
  })
}

// Charts
function buildPokemonPanel(pokemon) {

  console.log(pokemon);

  d3.json(`/api/pokemons/${pokemon}`).then((data) => {

    console.log(data)

    // Pokemon summary panel
    summary_info = data.summary_info;
    // let selectedInfo = summary_info.filter(m => m.id == id);

    let panel = d3.select(".panel panel-primary");

    panel.attr("class", "table table-striped");

    // Use D3 to select the panel body
    let pbody = d3.select("#sample-metadata");

    // Reset html so I can select new IDs
    //pbody.html("");

    // Append row `tr` to the panel body for each key value pair
    let prow = pbody.append("tr");

    for (const [key, value] of Object.entries(summary_info[0])) {
        prow.append("tr").text(`${key}: ${value}`);
    }
  
  })
}

function optionPokemonChanged(newPokemon) {
  buildPokemonChart(newPokemon);
}

buildBoxChart("normal")

buildPokemonChart("bulbasaur")

buildPokemonPanel("bulbasaur")


// TESTING INIT BELOW
// function init() {

// d3.json("api/box").then(function(data) {

//     console.log(data);
    
//     // Fill the dropdown menu with all the IDs
//     let dropdownMenu = d3.select("#selDataset");

//     console.log(data.ID);

//     let ids = data.ID;

//     for (let i=0; i<ids.length; i++) {

//         dropdownMenu.append("option").text(ids[i]).property("value", ids[i]);

//     }

//     first = ids[0];

//     // Display the charts and panel with the first ID

//     buildBoxChart(first);

// });

// }

// init()