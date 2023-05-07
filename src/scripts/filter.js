
var playerStats;

var searchedPlayers = [];


function searchPlayerByName(playerData, playerName) {
    return playerData.filter(player => {
        const fullName = player.player_name.toLowerCase();
        return fullName.includes(playerName.toLowerCase());
    });
}

async function getSeasonData() {
    const seasonData = [];
    
    for (let w = 1; w <= 17; w++) {
      const weekApiUrl = `https://www.fantasyfootballdatapros.com/api/players/2019/${w}`;
      const weekData = await fetch(weekApiUrl).then(response => response.json());
    
      weekData.forEach(weekPlayer => {
        const seasonPlayer = seasonData.find(p => p.player_name === weekPlayer.player_name);
        if (seasonPlayer) {
          seasonPlayer.fantasy_points.ppr += weekPlayer.fantasy_points.ppr;
          seasonPlayer.stats.passing.passing_yds += weekPlayer.stats.passing.passing_yds;
          seasonPlayer.stats.passing.passing_td += weekPlayer.stats.passing.passing_td;
          seasonPlayer.stats.passing.int += weekPlayer.stats.passing.int;
          seasonPlayer.stats.rushing.rushing_att += weekPlayer.stats.rushing.rushing_att;
          seasonPlayer.stats.rushing.rushing_yds += weekPlayer.stats.rushing.rushing_yds;
          seasonPlayer.stats.rushing.rushing_td += weekPlayer.stats.rushing.rushing_td;
          seasonPlayer.stats.receiving.receptions += weekPlayer.stats.receiving.receptions;
          seasonPlayer.stats.receiving.receiving_yds += weekPlayer.stats.receiving.receiving_yds;
          seasonPlayer.stats.receiving.receiving_td += weekPlayer.stats.receiving.receiving_td;
        } else {
          seasonData.push(weekPlayer);
        }
      });
    }
    
    return seasonData;
  }
  

  async function getPlayerNames(week) {
  if (week === 'total') {
    const seasonData = await getSeasonData();
    const filteredPlayers = sortAndFilterByPosition(seasonData, 'All');
    return filteredPlayers;
  } else {
    const apiUrl = `https://www.fantasyfootballdatapros.com/api/players/2019/${week}`;
    return fetch(apiUrl).then(response => response.json());
  }
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
    const validPositions = ["RB", "TE", "QB", "WR"];

    let filteredData;

    if (searchedPlayers.length > 0) {
    filteredData = searchedPlayers;
    } else {
    filteredData = playerData;
    }
    const sortedPlayerData = filteredData
      .filter(player => validPositions.includes(player.position))
      .sort((a, b) => {
        return a.fantasy_points.ppr < b.fantasy_points.ppr
          ? 1
          : a.fantasy_points.ppr > b.fantasy_points.ppr
          ? -1
          : 0;
      });
  
    if (position === "All") { 
      return sortedPlayerData;
    }
  
    return sortedPlayerData.filter(f => f.position === position);
}

window.onload = (event) => {
    document.getElementById('filter-button').addEventListener('click', () => {
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




