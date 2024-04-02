const elevator = document.getElementById('elevator');
const elevatorDoor = document.querySelector('.elevator-door');


const floorHeights = [0, 120, 220, 330]; 
let currentFloor = 0;
let targetFloor = null;
let isMoving = false;

function moveElevator() {
  if (targetFloor === null) return;
  
  isMoving = true;
  
  elevatorDoor.style.backgroundColor = '#00f';

  setTimeout(() => {
    currentFloor = targetFloor;
    elevator.style.bottom = `${floorHeights[currentFloor]}px`; 
    elevatorDoor.style.backgroundColor = '#fff'; 
    isMoving = false;
    targetFloor = null;
  }, 1000 * Math.abs(targetFloor - currentFloor));
}

function requestFloor(floor) {
  if (isMoving || floor === currentFloor) return;
  
  targetFloor = floor;
  moveElevator();
}
