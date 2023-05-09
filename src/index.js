import filterData from '../src/scripts/filter.js';
import { lineChart } from "../src/scripts/lineChart.js";
import * as modals from "../src/scripts/modals.js";

const { playerStats, searchedPlayers, allSeasonData, topPlayerWeeklyData, searchPlayerByName, getSeasonData, getPlayerNames, displayPlayerStats, sortAndFilterByPosition, filterButtonEventListener } = filterData;
// const { playerModal } = modals;
// info modal 
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

