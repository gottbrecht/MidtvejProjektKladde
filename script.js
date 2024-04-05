//Repræsenter selve elevatoren og døren på elevatoren
const elevator = document.getElementById('elevator');
const elevatorDoor = document.querySelector('.elevator-door');

//Dette array holder styr på hvilken højde de forskellige etager har.
const floorHeights = [0, 120, 220, 330, 440];

//Holder styr på anmodningerne fra brugeren
const floorRequests = [];
//Holder styr på elevatoren's bevægelses retning.
let direction = 1; 
//Den aktuelle position
let currentFloor = 0;
//Den ønskede etage.
let targetFloor = null;
//Indikerer om elevatoren bevæger sig.
let isMoving = false;

//Flytter elevatoren til ønskede etage
function moveElevator() {
  //Afslutter funktion hvis man ikke har valgt en etage
  if (targetFloor === null) return;
  
  isMoving = true;
  
  //Åbner døren og indiker at elevatoren bevæger sig.
  elevatorDoor.style.backgroundColor = '#00f';

  //Flytter elevatoren til etagen efter en forsinkelse.
  setTimeout(() => {
    //Sætter den aktuelle til at være slut etagen
    currentFloor = targetFloor;
    //Opdatere etagen til at være den ny position
    elevator.style.bottom = `${floorHeights[currentFloor]}px`; 
    elevatorDoor.style.backgroundColor = '#fff'; 
    isMoving = false;
    //Nulstiller mål-etagen
    targetFloor = null;
    //Behandler resterende anmodninger i køen
    handleFloorRequests();
  }, 1000 * Math.abs(targetFloor - currentFloor)); //Forsinkelse afhængig af afstanden til mål.
}

//Funktion til at håndtere anmodninger fra brugeren
function handleFloorRequests() {
  //Sorter anmodningerne i køen, i stigende eller faldende rækkefølge
  floorRequests.sort((a, b) => (direction === 1 ? a - b : b - a));

  //Afslut funktionen hvis der ikke er flere anmodninger i køen.
  if (floorRequests.length === 0) return;

  //Hent den første anmodning fra køen
  const floor = floorRequests.shift();

  //Behandl anmodningen
  requestFloor(floor);

  //Forsæt med at behandle resten af anmodningerne
  setTimeout(handleFloorRequests, 1000); //Vent 1 sekund før næste anmodning
}

//Funktion til at håndtere en etage anmodning
function requestFloor(floor) {
  //Tilføj anmodningen til køen hvis elevatoren er i bevægelse 
  //eller allerede på den ønskedet etage
  if (isMoving || floor === currentFloor) {
    floorRequests.push(floor); 
    return;
  }
  
  
  targetFloor = floor;
  moveElevator();
}

//Tilføjer eventListeners til knapper for hver etage
document.getElementById('floor4').addEventListener('click', function() {
  requestFloor(4);
});
document.getElementById('floor3').addEventListener('click', function() {
  requestFloor(3);
});
document.getElementById('floor2').addEventListener('click', function() {
  requestFloor(2);
});
document.getElementById('floor1').addEventListener('click', function() {
  requestFloor(1);
});
document.getElementById('floor0').addEventListener('click', function() {
  requestFloor(0);
});

