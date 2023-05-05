export default Default;
// Default load page functionallity to display playername, games played,
// total fantasy points, rank by POS, passing stats, rushing stats, 
// receiving stats

var playerList;

function getPlayerNames() {
  return new Promise((resolve, reject) => {
    fetch('https://www.fantasyfootballdatapros.com/api/players/2019/all')
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
