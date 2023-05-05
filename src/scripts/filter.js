


var playerStats;

// function getPlayerNames(week) {
//   return new Promise((resolve, reject) => {
//     fetch(`https://www.fantasyfootballdatapros.com/api/players/2019/${week}`)
//       .then(response => response.json())
//       .then(data => {
//         if (!data) {
//           reject(new Error('Unable to fetch player data'));
//         }
//         playerStats = data;
//         resolve(data);
//       })
//       .catch(error => reject(error));
//   });
// }

function getPlayerNames(week) {
    return new Promise((resolve, reject) => {
      fetch(`https://www.fantasyfootballdatapros.com/api/players/2019/${week}`)
        .then(response => response.json())
        .then(data => {
          if (!data) {
            reject(new Error('Unable to fetch player data'));
          }
          resolve(data);
        })
        .catch(error => reject(error));
    });
  }

// getPlayerNames(week).then(() => {
// //   displayPlayerStats(playerStats);
//   const qbSort = sortAndFilterByPosition("QB");
//   displayPlayerStats(qbSort)
// });

function displayPlayerStats(filteredPlayers) {
    filteredPlayers.forEach(player => {
        console.log(player.player_name); 
        console.log(player.position); 
        console.log(player.fantasy_points.ppr); 
        console.log(player.stats.passing.passing_yds); 
        console.log(player.stats.passing.passing_td); 
        console.log(player.stats.passing.int); 
        console.log(player.stats.rushing.rushing_att); 
        console.log(player.stats.rushing.rushing_yds); 
        console.log(player.stats.rushing.rushing_td); 
        console.log(player.stats.receiving.receptions); 
        console.log(player.stats.receiving.receiving_yds); 
        console.log(player.stats.receiving.receiving_td); 
    });
}

// function sortAndFilterByPosition(position) {
//   return playerStats.sort((a, b) => {
//     return a.fantasy_points.ppr < b.fantasy_points.ppr ? 1 : a.fantasy_points.ppr > b.fantasy_points.ppr ? -1 : 0;
//   }).filter(f => f.position === position);
// //   .map(f => (displayPlayerStats(position)));
// }

function sortAndFilterByPosition(playerData, position) {
    return playerData.sort((a, b) => {
      return a.fantasy_points.ppr < b.fantasy_points.ppr ? 1 : a.fantasy_points.ppr > b.fantasy_points.ppr ? -1 : 0;
    }).filter(f => f.position === position);
}


document.getElementById('filter-btn').addEventListener('click', () => {
    const weekSelect = document.getElementById('filter-by-week');
    const positionSelect = document.getElementById('filter-by-position');
  
    const selectedWeek = weekSelect.value;
    const selectedPosition = positionSelect.value;
  
    getPlayerNames(selectedWeek).then(playerData => {
      const filteredPlayers = sortAndFilterByPosition(playerData, selectedPosition);
      displayPlayerStats(filteredPlayers);
    });
  });




