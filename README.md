<h1>Performance Playbook</h1>

<a href="https://github.com/aciffone23/Performance-Playbook">Performance Playbook</a> revolves around tracking specific players' data and displaying their statistics in an intuitive pop-up window. Users can select their desired players, and the application will fetch the relevant data, presenting it in a visually engaging format. The interactive pop-up window showcases essential stats such as points scored, yards gained, touchdowns, and more, facilitating a deeper understanding of each player's contribution to their fantasy football team. By providing a comprehensive overview of individual player performance, this project empowers users to optimize their roster management and dominate their leagues.

<img width="1438" alt="Screen Shot 2023-05-11 at 9 46 16 AM" src="https://github.com/aciffone23/Performance-Playbook/assets/110213103/785b977b-3ecc-40be-b2fa-720a38af0a76">


<h1>Wireframe</h1>

<img width="1025" alt="Screen Shot 2023-05-11 at 9 50 52 AM" src="https://github.com/aciffone23/Performance-Playbook/assets/110213103/0ab1340d-d86d-4221-94b4-30a8a180379a">
<ul>
  <li>Info modal and nav bar with search and filter features.</li>
  <li>Detailed stats table on load</li>
</ul>

<h1>Functionality & MVPs</h1>
<h2>In Performance Playbook</h2>
<ul>
   <li>Users are able to search there favorite</li>
</ul>


In Performance Playbook, users will be able to:
<ul>
    <li> By default view all the players sorted by fantasy points (fetched from the Fantasy Football Data Pros api)</li>
    <li> Search a player using the search box and view the statistics of a given player in a tabular format 
      <br>
       <img width="1440" alt="Screen Shot 2023-05-11 at 10 05 33 AM" src="https://github.com/aciffone23/Performance-Playbook/assets/110213103/6c2f114e-3754-4abd-a16b-e0806db0428a">
   </li>
    <li> Filter players by position during a week or season 
      <br>
       <img width="513" alt="Screen Shot 2023-05-11 at 9 38 31 AM" src="https://github.com/aciffone23/Performance-Playbook/assets/110213103/b3d43823-f823-4ffd-b9b6-84c0de6c766f">
   </li>
   <li> View player statistics color coded, the best stats of a player by red, green, yellow etc. 
       <br>
      <img width="481" alt="Screen Shot 2023-05-11 at 9 26 57 AM" src="https://github.com/aciffone23/Performance-Playbook/assets/110213103/2fbd0a22-f334-4073-8c1b-71ad9b3fe52f">

   </li>
      
   
   <li> View more details of a player by clicking on the name of a player, opens up a pop up with more information on the player like their  team logo and individual stats 
       <br>
      <img width="865" alt="Screen Shot 2023-05-11 at 9 29 32 AM" src="https://github.com/aciffone23/Performance-Playbook/assets/110213103/daca6af1-90d4-4f45-a33d-47cbf1359521">
   </li>
   
   
   <li> weekly visualization graph of a player in a given position </li>
</ul>



<h1>Technologies, Libraries, APIs</h1>
<ul>
   <li>This project is being run with these following technologies
   <li>Fantasy Football Data Pros API - https://www.fantasyfootballdatapros.com/our_api</li>
   <li>d3 api - https://github.com/d3/d3/blob/main/API.md</li>
   <li>Using Webpack to bundle my code</li>
   <li>Runs with npm to manage project.</li>
</ul>

<h1>Implementation Timeline:</h1>
<ul>
   <li>Friday Afternoon & Weekend: Set up the project structure, including the frontend framework and API integration
      Implement the default view of players sorted by fantasy points</li>

   <li>Monday: Add the search box functionality for finding players and displaying their stats in a tabular format
      Implement the filtering feature to allow users to filter players by position during a week or season</li>

   <li>Tuesday: Start developing the pop-up window to display more detailed information about a player, 
      including their photo and team logo</li>

   <li>Wednesday: Work on the stretch goal of color-coding player statistics based on their performance
      Begin working on the stretch goal of displaying a weekly visualization graph for a player in a given position</li>
</ul>

<h1>Future Implementations</h1>
<ul>
   <li>Add player pictures to player modal</li>
   <li>Dynamically tracks players stats to have stats be color coded green, red, and yellow on week filter</li>
</ul>

