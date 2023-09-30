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

buildBoxChart("normal")


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