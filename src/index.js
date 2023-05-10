import filterData from '../src/scripts/filter.js';
import { lineChart } from "../src/scripts/lineChart.js";

const { searchedPlayers, topPlayerWeeklyData, searchPlayerByName, getPlayerNames, displayPlayerStats, sortAndFilterByPosition } = filterData;
 
function getAndDisplayPlayerNames(selectedWeek, selectedPosition, playerNamesFilter = null) {
    getPlayerNames(selectedWeek).then(playerData => {
        let filteredPlayerData = playerData;
        if (playerNamesFilter) {
            filteredPlayerData = playerData.filter(f => playerNamesFilter.includes(f.player_name));
        }
        const filteredPlayers = sortAndFilterByPosition(filteredPlayerData, selectedPosition);
        displayPlayerStats(filteredPlayers);
    });
}

function filterButtonEventListener() {
    const weekSelect = document.getElementById('filter-by-week');
    const positionSelect = document.getElementById('filter-by-position');
    const selectedWeek = weekSelect.value;
    const selectedPosition = positionSelect.value;

    if (searchedPlayers.length === 0) {
        getAndDisplayPlayerNames(selectedWeek, selectedPosition);
    } else {
        const searchedNames = searchedPlayers.map(f => f.player_name);
        getAndDisplayPlayerNames(selectedWeek, selectedPosition, searchedNames);
        
    }
}

function submitSearchEventListener(event) {
    event.preventDefault();
    const searchInput = document.getElementById("search-player-input");
    const playerName = searchInput.value;

    getPlayerNames("total").then((playerData) => {
        let searchedPlayers = searchPlayerByName(playerData, playerName);
        displayPlayerStats(searchedPlayers);
        
    });
    searchInput.value = playerName;
}

function resetSearchEventListener() {
    const searchInput = document.getElementById("search-player-input");
    searchInput.value = '';
    getPlayerNames("total").then((playerData) => {
        displayPlayerStats(playerData);
    });
}

function showModalInfo() {
    const modal = document.createElement('div');
    modal.classList.add('modal', 'show');
    modal.innerHTML = `
        <div class="modal-content">
            <h2>How to use Performance Playbook</h2>
            <p>1. Use the search bar to find a player by name.</p>
            <p>2. Use the filter dropdowns to get a search by week and position.</p>
            <p>3. Click the Filter button to see the results sorted by fantasy points.</p>
            <p>4. The results will be displayed below the filter dropdowns.</p>
            <p>5. The reset button clears the search to reload the data. </p>
            <p>6. Click on a players name to get a more detailed view of his stats. </p>
            <button id="close-modal" class="close">&times;</button>
        </div>
    `;
    document.body.appendChild(modal);

    const closeModalBtn = document.getElementById('close-modal');
    closeModalBtn.addEventListener('click', () => {
        modal.classList.remove('show');
        modal.remove();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    filterButtonEventListener();
    document.getElementById('filter-button').addEventListener('click', filterButtonEventListener);
    document.getElementById("search-player").addEventListener("submit", submitSearchEventListener);
    document.getElementById("reset-button").addEventListener("click", resetSearchEventListener);
    document.getElementById("info-modal").addEventListener("click", showModalInfo);
});


function playerModal(player) {
    const modal = document.getElementById("player-modal");
    modal.classList.add('player-modal');
    const modalContent = modal.querySelector(".modal-content");
    debugger
    let categoryHTML = ''
    
    const topPlayerPositionData = topPlayerWeeklyData.map((weekData) => {
      return {
        week: weekData[player.position].week,
        value: weekData[player.position].value,
      };
    });
    
    const dataset = player.weekData
    
    if (player.position === 'QB') {
    categoryHTML = `
        <tr>
            <th colspan="3">Passing</th>
        </tr>
        <tr>
            <th>Yds</th>
            <th>Tds</th>
            <th>Ints</th>
        </tr>
        <tr>
            <td>${player.stats.passing.passing_yds}</td>
            <td>${player.stats.passing.passing_td}</td>
            <td>${player.stats.passing.int}</td>
        </tr>
        <tr>
            <th colspan="3">Rushing</th>
        </tr>
        <tr>
            <th>Atts</th>
            <th>Yds</th>
            <th>Tds</th>
        </tr>
        <tr>
            <td>${player.stats.rushing.rushing_att}</td>
            <td>${player.stats.rushing.rushing_yds}</td>
            <td>${player.stats.rushing.rushing_td}</td>
        </tr>`;
    } else if (['WR', 'RB', 'TE'].includes(player.position)) {
      categoryHTML = `
        <tr>
            <th colspan="3">Rushing</th>
        </tr>
        <tr>
            <th>Atts</th>
            <th>Yds</th>
            <th>Tds</th>
        </tr>
        <tr>
            <td>${player.stats.rushing.rushing_att}</td>
            <td>${player.stats.rushing.rushing_yds}</td>
            <td>${player.stats.rushing.rushing_td}</td>
        </tr>
        <tr>
            <th colspan="3">Receiving</th>
        </tr>
        <tr>
            <th>Rec</th>
            <th>Yds</th>
            <th>Tds</th>
        </tr>
        <tr>
            <td>${player.stats.receiving.receptions}</td>
            <td>${player.stats.receiving.receiving_yds}</td>
            <td>${player.stats.receiving.receiving_td}</td>
        </tr>`;
    }
    
    modalContent.innerHTML = `
    <span class="close">&times;</span>
    <div class="modal-player-info">
        <div>
            <strong>Player Name:</strong><span> ${player.player_name}</span>
            <br>
            <strong>Position:</strong> <span>${player.position}</span>
            <br>
            <strong>Fantasy Points:</strong> <span>${player.fantasy_points.ppr.toFixed(2)}</span>
        </div>
        <div>
        </div>
    </div>
    <h2 class="season-stats-heading">Season Stats</h2>
    <div id="line-chart-container"></div>
    <div class="stat-container">
        <table class="modal-stats-table">
            ${categoryHTML}
        </table>
    </div>
    `;
    
    const lineChartContainer = document.getElementById("line-chart-container");
    lineChart(dataset, topPlayerPositionData);

    modal.style.display = "block";
    
    const closeButton = modal.querySelector(".close");
    closeButton.onclick = function () {
      modal.style.display = "none";
    };
    
    window.onclick = function (event) {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    };
}

export { playerModal };


