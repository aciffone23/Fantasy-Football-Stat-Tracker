import { playerModal } from './modals.js';
//player stats variable
var playerStats;

//array to store searched players
var searchedPlayers = [];

//filter players by name and return array
function searchPlayerByName(playerData, playerName) {
    return playerData.filter(player => {
        let fullName = player.player_name.toLowerCase();
        return fullName.includes(playerName.toLowerCase());
    });
}

//fetch all data from season
async function getSeasonData() {
    const seasonData = [];
    for (let w = 1; w <= 17; w++) {
      const weekApiUrl = `https://www.fantasyfootballdatapros.com/api/players/2019/${w}`;
      const weekData = await fetch(weekApiUrl).then(response => response.json());
    
      weekData.forEach(weekPlayer => {
        //check if player is already in season data if so add stats to exist data
        const seasonPlayer = seasonData.find(p => p.player_name === weekPlayer.player_name);
        const currentPlayerPts = weekPlayer.fantasy_points.ppr.toFixed(2);
        
        const weekData = {
            week: w,
            value: currentPlayerPts
        };

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
            seasonPlayer.weekData.push(weekData);

        } else {
            weekPlayer.weekData = [weekData];
            seasonData.push(weekPlayer);
        }
      });
    }
    
    return seasonData;
  }
  
  //fetch data for week or season
  async function getPlayerNames(week) {
  if (week === 'total') {
    const seasonData = await getSeasonData();
    return sortAndFilterByPosition(seasonData, 'All');
  } else {
    const apiUrl = `https://www.fantasyfootballdatapros.com/api/players/2019/${week}`;
    return fetch(apiUrl).then(response => response.json());
  }
}
//display stats in table
function displayPlayerStats(filteredPlayers) {
    //create table add class player-stats-table
    const table = document.createElement('table');
    table.classList.add('player-stats-table');
    const tableHeader = table.createTHead();
    const tableHeaderRow = tableHeader.insertRow();
    const tableHeaderCells = ['Player Name', 'Position', 'Fantasy Points (PPR)', 'Passing Yards', 'Passing TDs', 'Interceptions', 'Rushing Attempts', 'Rushing Yards', 'Rushing TDs', 'Receptions', 'Receiving Yards', 'Receiving TDs'];
    for (let i = 0; i < tableHeaderCells.length; i++) {
        const cell = document.createElement('th');
        cell.textContent = tableHeaderCells[i];
        tableHeaderRow.appendChild(cell);
    }
    //create body for the table with player stats
    const tableBody = table.createTBody();
    filteredPlayers.forEach(player => {
        const row = tableBody.insertRow();
        const cells = [player.player_name, player.position, player.fantasy_points.ppr.toFixed(2), player.stats.passing.passing_yds, player.stats.passing.passing_td, player.stats.passing.int, player.stats.rushing.rushing_att, player.stats.rushing.rushing_yds, player.stats.rushing.rushing_td, player.stats.receiving.receptions, player.stats.receiving.receiving_yds, player.stats.receiving.receiving_td];
        for (let i = 0; i < cells.length; i++) {
            const cell = row.insertCell();
            cell.textContent = cells[i];
        }
        row.cells[0].classList.add("player-name-cell");
        row.cells[0].style.cursor = "pointer";
        row.cells[0].addEventListener("click", () => playerModal(player));
    });
    
    const container = document.getElementById('player-stats-container');
    container.innerHTML = '';
    container.appendChild(table);
}

//filter data by position sort by ppr
function sortAndFilterByPosition(playerData, position) {
    const validPositions = ["RB", "TE", "QB", "WR"];
    const sortedPlayerData = playerData
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

function filterbuttonEventListener(){
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
        getPlayerNames(selectedWeek).then(playerData => {
            var searchedNames = searchedPlayers.map(f => f.player_name);
            var searchedPlayerObjects = playerData.filter(f => searchedNames.includes(f.player_name));
            const filteredPlayers = sortAndFilterByPosition(searchedPlayerObjects, selectedPosition);
            displayPlayerStats(filteredPlayers);
        });
    }
}
//setup event listeners
window.onload = () => {
    filterbuttonEventListener();
    document.getElementById('filter-button').addEventListener('click', filterbuttonEventListener);
    document.getElementById("search-player").addEventListener("submit", (event) => {
        event.preventDefault();
        const searchInput = document.getElementById("search-player-input");
        const playerName = searchInput.value;

        getPlayerNames("total").then((playerData) => {
            searchedPlayers = searchPlayerByName(playerData, playerName);
            displayPlayerStats(searchedPlayers);
        });

        searchInput.value = playerName;
    });
};






