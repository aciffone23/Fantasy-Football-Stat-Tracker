class Example {
    constructor(htmlElement) {
        this.htmlElement = htmlElement
        this.htmlElement.innerHTML = "<h1>It's ALIVE!!!</h1>"

        this.handleClick = this.handleClick.bind(this)
        this.htmlElement.addEventListener('click', this.handleClick)
    }

    handleClick() {
        this.htmlElement.children[0].innerText = "Ouch"
    }
}

export default Example;
// fetching the data for the players 
var playerList;

function getPlayerNames() {
  return new Promise((resolve, reject) => {
    fetch('https://www.fantasyfootballdatapros.com/api/players/2019/1')
      .then(response => response.json())
      .then(data => {
        if (!data) {
          reject(new Error('Unable to fetch player data'));
        }
        playerList = data;
        resolve(data);
      })
      .catch(error => reject(error));
  });
}

getPlayerNames()

// fetching stats for the player
playerList.find(f => f.player_name === "Lamar Jackson").stats

// fetching passing and passing yards for the player
playerList.find(f => f.player_name === "Lamar Jackson").stats.passing.passing_yds


playerList.sort(function(a, b){
    return a.fantasy_points.ppr < b.fantasy_points.ppr ? 1 : a.fantasy_points.ppr > b.fantasy_points.ppr ? -1: 0;
}).filter(f => f.position === "QB");


    
    
    // sorting 
    var dataSet =  playerList.sort(function(a, b){
    return a.fantasy_points.ppr < b.fantasy_points.ppr ? 1 : a.fantasy_points.ppr > b.fantasy_points.ppr ? -1: 0;
    }).filter(f => f.position === "QB").map(f => ({name: f.player_name, points: f.fantasy_points.ppr}))


//     <div>
//   <canvas id="myChart"></canvas>
// </div>

// <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

// <script>
  const ctx = document.getElementById('myChart');



var playerList;

function getPlayerNames() {
  return new Promise((resolve, reject) => {
    fetch('https://www.fantasyfootballdatapros.com/api/players/2019/1')
      .then(response => response.json())
      .then(data => {
        if (!data) {
          reject(new Error('Unable to fetch player data'));
        }
        playerList = data;
        resolve(data);
      })
      .then(function(){

            // var dataSet = playerList.sort(function(a, b){
            //     return a.fantasy_points.ppr < b.fantasy_points.ppr ? 1 : a.fantasy_points.ppr > b.fantasy_points.ppr ? -1: 0;
            // }).filter(f => f.position === "QB");


            var dataSet =  playerList.sort(function(a, b){
            return a.fantasy_points.ppr < b.fantasy_points.ppr ? 1 : a.fantasy_points.ppr > b.fantasy_points.ppr ? -1: 0;
            }).filter(f => f.position === "QB").map(f => ({name: f.player_name, points: f.fantasy_points.ppr}))
            
            new Chart(ctx, {
                type: 'bar',
                data: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [{
                    label: '# of Votes',
                    data: dataSet,
                    borderWidth: 1
                }]
                },
                options: {
                scales: {
                    y: {
                    beginAtZero: true
                    }
                }
                }
            });
      })
      .catch(error => reject(error));
  });
}

getPlayerNames()


// </script>
    