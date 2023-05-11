import { playerModal } from '../index.js';

var allSeasonData = []

export var topPlayerWeeklyData = [];


//filter players by name and return array
function searchPlayerByName(playerData, playerName) {
    return playerData.filter(player => {
        let fullName = player.player_name.toLowerCase();
        return fullName.includes(playerName.toLowerCase());
    });
}

//fetch all data from season
async function getSeasonData() {
    // let topPlayerWeeklyData = [];
    let position = ["QB", "RB", "WR", "TE"];
    const seasonData = [];
    for (let w = 1; w <= 17; w++) {
        let topPlayersByWeek = {
            QB: { week: w, value: 0 },
            RB: { week: w, value: 0 },
            WR: { week: w, value: 0 },
            TE: { week: w, value: 0 }
        };
      const weekApiUrl = `https://www.fantasyfootballdatapros.com/api/players/2019/${w}`;
      const weekData = await fetch(weekApiUrl).then(response => response.json());
    
        weekData.forEach(weekPlayer => {
            //check if player is already in season data if so add stats to exist data
            const seasonPlayer = seasonData.find(p => p.player_name === weekPlayer.player_name);
            let currentPlayerPts = weekPlayer.fantasy_points.ppr
            let fixedPts = weekPlayer.fantasy_points.ppr.toFixed(2);
            const weekData = {
                week: w,
                value: fixedPts
            };
            
            if (position.includes(weekPlayer.position) && currentPlayerPts >= topPlayersByWeek[weekPlayer.position].value) {
                
                topPlayersByWeek[weekPlayer.position].value = fixedPts;
            }

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
        topPlayerWeeklyData.push(topPlayersByWeek);
    }

    allSeasonData = seasonData;
    topPlayerWeeklyData = topPlayerWeeklyData;
    return seasonData;
}
  
  //fetch data for week or season
async function getPlayerNames(week) {
  if (week === 'total') {
    const seasonData = await getSeasonData();
    topPlayerWeeklyData = [];
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
        row.cells[0].addEventListener("click", () => playerModal(allSeasonData.find(f => 
            f.player_name === player.player_name)));

        let currentFantasy = Number(row.cells[2].textContent);
        if( currentFantasy > 350){
            row.cells[2].classList.add("best")
        }else if( currentFantasy > 310 && currentFantasy < 350){
            row.cells[2].classList.add("vgood")
        }else if( currentFantasy > 270 && currentFantasy < 310){
            row.cells[2].classList.add("pgood")
        }else if( currentFantasy > 230 && currentFantasy < 270){
            row.cells[2].classList.add("good")
        }else if( currentFantasy > 190 && currentFantasy < 230){
            row.cells[2].classList.add("alright")
        }else if( currentFantasy > 150 && currentFantasy < 190){
            row.cells[2].classList.add("okay")
        }else if( currentFantasy > 110 && currentFantasy < 150){
            row.cells[2].classList.add("notgood")
        }else if( currentFantasy > 70 && currentFantasy < 110){
            row.cells[2].classList.add("bad")
        }
        let currentPassingYds = Number(row.cells[3].textContent);
        if( currentPassingYds > 5000){
            row.cells[3].classList.add("best")
        }else if( currentPassingYds > 4650 && currentPassingYds < 5000){
            row.cells[3].classList.add("vgood")
        }else if( currentPassingYds > 4300 && currentPassingYds < 4650){
            row.cells[3].classList.add("pgood")
        }else if( currentPassingYds > 3950 && currentPassingYds < 4300){
            row.cells[3].classList.add("good")
        }else if( currentPassingYds > 3600 && currentPassingYds < 3950){
            row.cells[3].classList.add("alright")
        }else if( currentPassingYds > 3250 && currentPassingYds < 3600){
            row.cells[3].classList.add("okay")
        }else if( currentPassingYds > 2900 && currentPassingYds < 3250){
            row.cells[3].classList.add("notgood")
        }else if( currentPassingYds > 2490 && currentPassingYds < 2900){
            row.cells[3].classList.add("bad")
        }

        let currentPassingTds = Number(row.cells[4].textContent);
        if( currentPassingTds >= 36){
            row.cells[4].classList.add("best")
        }else if( currentPassingTds >= 13 && currentPassingTds < 36){
            row.cells[4].classList.add("vgood")
        }else if( currentPassingTds >= 30 && currentPassingTds < 13){
            row.cells[4].classList.add("pgood")
        }else if( currentPassingTds >= 27 && currentPassingTds < 30){
            row.cells[4].classList.add("good")
        }else if( currentPassingTds >= 24 && currentPassingTds < 27){
            row.cells[4].classList.add("alright")
        }else if( currentPassingTds >= 21 && currentPassingTds < 24){
            row.cells[4].classList.add("okay")
        }else if( currentPassingTds >= 18 && currentPassingTds < 21){
            row.cells[4].classList.add("notgood")
        }else if( currentPassingTds >= 15 && currentPassingTds < 18){
            row.cells[4].classList.add("bad")
        }

        let currrentPlayerInts = Number(row.cells[5].textContent);
        console.log(player.player_name, currrentPlayerInts)
        if( currrentPlayerInts >= 4 && currrentPlayerInts < 6){
            row.cells[5].classList.add("best")
        }else if( currrentPlayerInts >= 6 && currrentPlayerInts < 8){
            row.cells[5].classList.add("vgood")
        }else if( currrentPlayerInts >= 8 && currrentPlayerInts < 10){
            row.cells[5].classList.add("pgood")
        }else if( currrentPlayerInts >= 10 && currrentPlayerInts < 12){
            row.cells[5].classList.add("good")
        }else if( currrentPlayerInts >= 12 && currrentPlayerInts < 14){
            row.cells[5].classList.add("alright")
        }else if( currrentPlayerInts >= 14 && currrentPlayerInts < 16){
            row.cells[5].classList.add("okay")
        }else if( currrentPlayerInts >= 16 && currrentPlayerInts < 18){
            row.cells[5].classList.add("notgood")
        }else if( currrentPlayerInts >= 18){
            row.cells[5].classList.add("bad")
        }

        let currentPlayerRushAtt = Number(row.cells[6].textContent);
        console.log(player.player_name, currentPlayerRushAtt)
        if( currentPlayerRushAtt >= 300){
            row.cells[6].classList.add("best")
        }else if( currentPlayerRushAtt >= 270 && currentPlayerRushAtt < 300){
            row.cells[6].classList.add("vgood")
        }else if( currentPlayerRushAtt >= 240 && currentPlayerRushAtt < 270){
            row.cells[6].classList.add("pgood")
        }else if( currentPlayerRushAtt >= 210 && currentPlayerRushAtt < 240){
            row.cells[6].classList.add("good")
        }else if( currentPlayerRushAtt >= 180 && currentPlayerRushAtt < 210){
            row.cells[6].classList.add("alright")
        }else if( currentPlayerRushAtt >= 150 && currentPlayerRushAtt < 180){
            row.cells[6].classList.add("okay")
        }else if( currentPlayerRushAtt >= 100 && currentPlayerRushAtt < 150){
            row.cells[6].classList.add("notgood")
        }else if( currentPlayerRushAtt >= 35 && currentPlayerRushAtt < 100){
            row.cells[6].classList.add("bad")
        }

        let currentPlayerRushingYds = Number(row.cells[7].textContent);
        console.log(player.player_name, currentPlayerRushingYds)
        if( currentPlayerRushingYds >= 1500){
            row.cells[7].classList.add("best")
        }else if( currentPlayerRushingYds >= 1350 && currentPlayerRushingYds < 1500){
            row.cells[7].classList.add("vgood")
        }else if( currentPlayerRushingYds >= 1225 && currentPlayerRushingYds < 1350){
            row.cells[7].classList.add("pgood")
        }else if( currentPlayerRushingYds >= 1100 && currentPlayerRushingYds < 1225){
            row.cells[7].classList.add("good")
        }else if( currentPlayerRushingYds >= 975 && currentPlayerRushingYds < 1100){
            row.cells[7].classList.add("alright")
        }else if( currentPlayerRushingYds >= 850 && currentPlayerRushingYds < 975){
            row.cells[7].classList.add("okay")
        }else if( currentPlayerRushingYds >= 550 && currentPlayerRushingYds < 850){
            row.cells[7].classList.add("notgood")
        }else if( currentPlayerRushingYds >= 250 && currentPlayerRushingYds < 550){
            row.cells[7].classList.add("bad")
        }

        let currentPlayerRushingTds = Number(row.cells[8].textContent);
        console.log(player.player_name, currentPlayerRushingTds)
        if( currentPlayerRushingTds >= 16){
            row.cells[8].classList.add("best")
        }else if( currentPlayerRushingTds >= 14 && currentPlayerRushingTds < 16){
            row.cells[8].classList.add("vgood")
        }else if( currentPlayerRushingTds >= 12 && currentPlayerRushingTds < 14){
            row.cells[8].classList.add("pgood")
        }else if( currentPlayerRushingTds >= 10 && currentPlayerRushingTds < 12){
            row.cells[8].classList.add("good")
        }else if( currentPlayerRushingTds >= 8 && currentPlayerRushingTds < 10){
            row.cells[8].classList.add("alright")
        }else if( currentPlayerRushingTds >= 6 && currentPlayerRushingTds < 8){
            row.cells[8].classList.add("okay")
        }else if( currentPlayerRushingTds >= 4 && currentPlayerRushingTds < 6){
            row.cells[8].classList.add("notgood")
        }else if( currentPlayerRushingTds > 2 && currentPlayerRushingTds < 4){
            row.cells[8].classList.add("bad")
        }

        let currentPlayerRec = Number(row.cells[9].textContent);
        console.log(player.player_name, currentPlayerRec)
        if( currentPlayerRec >= 125){
            row.cells[9].classList.add("best")
        }else if( currentPlayerRec >= 100 && currentPlayerRec < 125){
            row.cells[9].classList.add("vgood")
        }else if( currentPlayerRec >= 90 && currentPlayerRec < 100){
            row.cells[9].classList.add("pgood")
        }else if( currentPlayerRec >= 80 && currentPlayerRec < 90){
            row.cells[9].classList.add("good")
        }else if( currentPlayerRec >= 70 && currentPlayerRec < 80){
            row.cells[9].classList.add("alright")
        }else if( currentPlayerRec >= 55 && currentPlayerRec < 70){
            row.cells[9].classList.add("okay")
        }else if( currentPlayerRec >= 40 && currentPlayerRec < 55){
            row.cells[9].classList.add("notgood")
        }else if( currentPlayerRec >= 18 && currentPlayerRec < 40){
            row.cells[9].classList.add("bad")
        }

        let currentPlayerRecYds = Number(row.cells[10].textContent);
        console.log(player.player_name, currentPlayerRecYds)
        if( currentPlayerRecYds >= 1500){
            row.cells[10].classList.add("best")
        }else if( currentPlayerRecYds >= 1250 && currentPlayerRecYds < 1500){
            row.cells[10].classList.add("vgood")
        }else if( currentPlayerRecYds >= 1050 && currentPlayerRecYds < 1250){
            row.cells[10].classList.add("pgood")
        }else if( currentPlayerRecYds >= 900 && currentPlayerRecYds < 1050){
            row.cells[10].classList.add("good")
        }else if( currentPlayerRecYds >= 750 && currentPlayerRecYds < 900){
            row.cells[10].classList.add("alright")
        }else if( currentPlayerRecYds >= 600 && currentPlayerRecYds < 750){
            row.cells[10].classList.add("okay")
        }else if( currentPlayerRecYds >= 450 && currentPlayerRecYds < 600){
            row.cells[10].classList.add("notgood")
        }else if( currentPlayerRecYds >= 200 && currentPlayerRecYds < 450){
            row.cells[10].classList.add("bad")
        }

        let currentPlayerRecTds = Number(row.cells[11].textContent);
        console.log(player.player_name, currentPlayerRecTds)
        if( currentPlayerRecTds >= 11){
            row.cells[11].classList.add("best")
        }else if( currentPlayerRecTds >= 10 && currentPlayerRecTds < 11){
            row.cells[11].classList.add("vgood")
        }else if( currentPlayerRecTds >= 9 && currentPlayerRecTds < 10){
            row.cells[11].classList.add("pgood")
        }else if( currentPlayerRecTds >= 8 && currentPlayerRecTds < 9){
            row.cells[11].classList.add("good")
        }else if( currentPlayerRecTds >= 7 && currentPlayerRecTds < 8){
            row.cells[7].classList.add("alright")
        }else if( currentPlayerRecTds >= 6 && currentPlayerRecTds < 7){
            row.cells[11].classList.add("okay")
        }else if( currentPlayerRecTds >= 5 && currentPlayerRecTds < 6){
            row.cells[11].classList.add("notgood")
        }else if( currentPlayerRecTds >= 3 && currentPlayerRecTds < 5){
            row.cells[11].classList.add("bad")
        }
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

const exports = {
    topPlayerWeeklyData,
    searchPlayerByName,
    getPlayerNames,
    displayPlayerStats,
    sortAndFilterByPosition,
  };
  
  export default exports;






