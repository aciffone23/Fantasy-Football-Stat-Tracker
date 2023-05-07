document.addEventListener('DOMContentLoaded', () => {
    const infoModal = document.getElementById('info-modal');
    infoModal.addEventListener('click', () => {
      const modal = document.createElement('div');
      modal.classList.add('modal', 'show');
      modal.innerHTML = `
        <div class="modal-content">
          <h2>How to use Fantasy Football Stat Tracker</h2>
          <p>1. Use the search bar to find a player by name.</p>
          <p>2. Use the filter dropdowns to get a search by week and position.</p>
          <p>3. Click the Filter button to see the results sorted by fantasy points.</p>
          <p>4. The results will be displayed below the filter dropdowns.</p>
          <button id="close-modal" class="close">&times;</button>
        </div>
      `;
      document.body.appendChild(modal);
  
      const closeModalBtn = document.getElementById('close-modal');
      closeModalBtn.addEventListener('click', () => {
        modal.classList.remove('show');
        modal.remove();
      });
    });
  });









    