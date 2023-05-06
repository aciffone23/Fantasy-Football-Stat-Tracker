
var playerStats;

let searchedPlayers = [];

function searchPlayerByName(playerData, playerName) {
    return playerData.filter(player => {
        const fullName = player.player_name.toLowerCase();
        return fullName.includes(playerName.toLowerCase());
    });
}

function getPlayerNames(week) {
    const apiUrl = week === 'total'
        ? `https://www.fantasyfootballdatapros.com/api/players/2019/all`
        : `https://www.fantasyfootballdatapros.com/api/players/2019/${week}`;
    return new Promise((resolve, reject) => {
      fetch(apiUrl)
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

function displayPlayerStats(filteredPlayers) {
    const ul = document.createElement('ul');
    filteredPlayers.forEach(player => {
        const li = document.createElement('li');
        li.innerHTML = `
        Player Name: ${player.player_name} <br>
        Position: ${player.position} <br>
        Fantasy Points (PPR): ${player.fantasy_points.ppr} <br>
        Passing Yards: ${player.stats.passing.passing_yds} <br>
        Passing TDs: ${player.stats.passing.passing_td} <br>
        Interceptions: ${player.stats.passing.int} <br>
        Rushing Attempts: ${player.stats.rushing.rushing_att} <br>
        Rushing Yards: ${player.stats.rushing.rushing_yds} <br>
        Rushing TDs: ${player.stats.rushing.rushing_td} <br>
        Receptions: ${player.stats.receiving.receptions} <br>
        Receiving Yards: ${player.stats.receiving.receiving_yds} <br>
        Receiving TDs: ${player.stats.receiving.receiving_td} <br>
      `; 
      ul.appendChild(li);

    });
    const container = document.getElementById('player-stats-container');
    container.innerHTML = '';
    container.appendChild(ul);

}



function sortAndFilterByPosition(playerData, position) {
    return playerData.sort((a, b) => {
      return a.fantasy_points.ppr < b.fantasy_points.ppr ? 1 : a.fantasy_points.ppr > b.fantasy_points.ppr ? -1 : 0;
    }).filter(f => f.position === position);
}


window.onload = (event) => {
    document.getElementById('filter-btn').addEventListener('click', () => {
        const weekSelect = document.getElementById('filter-by-week');
        const positionSelect = document.getElementById('filter-by-position');
      
        const selectedWeek = weekSelect.value;
        const selectedPosition = positionSelect.value;
      
        if (searchedPlayers.length === 0) {
            getPlayerNames(selectedWeek).then(playerData => {
                const filteredPlayers = sortAndFilterByPosition(playerData, selectedPosition);
                displayPlayerStats(filteredPlayers);
            });
        } else {
            const filteredPlayers = sortAndFilterByPosition(searchedPlayers, selectedPosition);
            displayPlayerStats(filteredPlayers);
        }
    });
    document.getElementById("search-player").addEventListener("submit", (event) => {
        event.preventDefault();

        const searchInput = document.getElementById("search-player-input");
        const playerName = searchInput.value;

        console.log("Player name:", playerName);

        getPlayerNames("total").then((playerData) => {
            searchedPlayers = searchPlayerByName(playerData, playerName);
            displayPlayerStats(searchedPlayers);
        });

        searchInput.value = playerName;
    });
};




