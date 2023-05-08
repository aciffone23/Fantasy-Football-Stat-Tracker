import { lineChart } from "./lineChart.js";
//info modal 
document.addEventListener('DOMContentLoaded', () => {
    const infoModal = document.getElementById('info-modal');
    infoModal.addEventListener('click', () => {
      //creates new div called modal
      const modal = document.createElement('div');
      //makes new classes for modal and show, show is needed because it is hidden by default
      modal.classList.add('modal', 'show');
      modal.innerHTML = `
        <div class="modal-content">
          <h2>How to use Fantasy Football Stat Tracker</h2>
          <p>1. Use the search bar to find a player by name.</p>
          <p>2. Use the filter dropdowns to get a search by week and position.</p>
          <p>3. Click the Filter button to see the results sorted by fantasy points.</p>
          <p>4. The results will be displayed below the filter dropdowns.</p>
          <p>5. Clear the search text if needed to reset the search parameters.</p>
          <button id="close-modal" class="close">&times;</button>
        </div>
      `;
      document.body.appendChild(modal);
      //creating a close button, to remove show if clicked
      const closeModalBtn = document.getElementById('close-modal');
      closeModalBtn.addEventListener('click', () => {
        modal.classList.remove('show');
        modal.remove();
      });
    });
  });

    function playerModal(player) {
    const modal = document.getElementById("player-modal");
    const modalContent = modal.querySelector(".modal-content");
    debugger
    let categoryHTML = ''

    const dataset = player.weekData
    if (player.position === 'QB') {
    categoryHTML = `
      <tr>
        <th colspan="2">Passing</th>
      </tr>
      <tr>
        <td>Yds</td>
        <td>${player.stats.passing.passing_yds}</td>
      </tr>
      <tr>
        <td>Tds</td>
        <td>${player.stats.passing.passing_td}</td>
      </tr>
      <tr>
        <td>Ints</td>
        <td>${player.stats.passing.int}</td>
      </tr>
      <tr>
        <th colspan="2">Rushing</th>
      </tr>
      <tr>
        <td>Atts</td>
        <td>${player.stats.rushing.rushing_att}</td>
      </tr>
      <tr>
        <td>Yds</td>
        <td>${player.stats.rushing.rushing_yds}</td>
      </tr>
      <tr>
        <td>Tds</td>
        <td>${player.stats.rushing.rushing_td}</td>
      </tr>`;
    } else if (['WR', 'RB', 'TE'].includes(player.position)) {
      categoryHTML = `
        <tr>
          <th colspan="2">Rushing</th>
        </tr>
        <tr>
          <td>Atts</td>
          <td>${player.stats.rushing.rushing_att}</td>
        </tr>
        <tr>
          <td>Yds</td>
          <td>${player.stats.rushing.rushing_yds}</td>
        </tr>
        <tr>
          <td>Tds</td>
          <td>${player.stats.rushing.rushing_td}</td>
        </tr>
        <tr>
          <th colspan="2">Receiving</th>
        </tr>
        <tr>
          <td>Rec</td>
          <td>${player.stats.receiving.receptions}</td>
        </tr>
        <tr>
          <td>Yds</td>
          <td>${player.stats.receiving.receiving_yds}</td>
        </tr>
        <tr>
          <td>Tds</td>
          <td>${player.stats.receiving.receiving_td}</td>
        </tr>`;
    }

    modalContent.innerHTML = `
      <span class="close">&times;</span>
      <h2>Player Name:${player.player_name} 
      <br>
      Position: ${player.position}
      <br>
      Fantasy Points:${player.fantasy_points.ppr.toFixed(2)}</h2>
      <table class="modal-stats-table">
        ${categoryHTML}
      </table>
    `;

  
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

    const lineChartContainer = document.createElement("div");
    lineChartContainer.id = "line-chart-container";
    modalContent.appendChild(lineChartContainer);
    lineChart(dataset);

  }

  export { playerModal };

  
  

 
  









    