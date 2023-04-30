const doorElements = document.querySelectorAll(".door");
const tableroElement = document.getElementById("tablero");
const gameContainerElement = document.getElementById("game-container");

//Elementos html
let selectedDoorElement;
let openedDoorElement;
let prizeDoorElement;

//Objetos js
let selectedDoorObject;
let openedDoorObject;
let prizeDoorObject;

const doors = [];

assignDoorContent();
gameContainerElement.addEventListener("click", onDoorClick);

function assignDoorContent() {
  const randomNumber = Math.floor(Math.random() * 3);

  for (let i = 0; i <= 2; i++) {
    let hasPrize = false;

    if (i === randomNumber) {
      hasPrize = true;
      prizeDoorElement = document.querySelector(`[data-door="${i}"]`);
    }
    const door = {
      number: i,
      opened: false,
      selected: false,
      prize: hasPrize,
      avaiable: true,
    };

    doors.push(door);
  }

  prizeDoorObject = doors[randomNumber];

  console.group("----ASIGNACION INICIAL DE PUERTAS----");
  console.log("NUMERO ALEATORIO:");
  console.log(randomNumber);
  console.log("ELEMENTO GANADOR:");
  console.log(prizeDoorElement);
  console.log("OBJETO GANADOR:");
  console.log(prizeDoorObject);
  console.groupEnd();
}

function onDoorClick(evet) {
  if (event.target.classList.contains("door")) {
    const doorIndex = parseInt(event.target.dataset.door);

    selectedDoorObject = doors[doorIndex];

    selectedDoorObject.selected = true;
    selectedDoorObject.avaiable = false;

    event.target.classList.add("selected");
    selectedDoorElement = event.target;

    const p = document.createElement("p");
    p.innerText = "Puerta seleccionada : " + (selectedDoorObject.number + 1);
    tableroElement.appendChild(p);

    console.group("----SELECCION DE PUERTA INICIAL----");
    console.log("PUERTA SELECCIONADA EN ELEMENTO HTML:");
    console.log(selectedDoorElement);
    console.log("PUERTA SELECCIONADA EN OBJETO JS:");
    console.log(selectedDoorObject);
    console.groupEnd();

    secondInstance(selectedDoorObject);
  }
}

function secondInstance(selectedDoor) {
  const openableDoors = doors.filter(
    (door) => door.number !== selectedDoor.number
  );
  let openableDoorIndex;

  const noPrizeDoors = openableDoors.every((door) => !door.prize);

  if (noPrizeDoors) {
    openableDoorIndex = Math.floor(Math.random() * 2);
  } else {
    openableDoorIndex = openableDoors.findIndex((door) => !door.prize);
  }

  openedDoorElement = document.querySelector(
    `[data-door="${openableDoors[openableDoorIndex].number}"]`
  );
  openedDoorObject = openableDoors[openableDoorIndex];

  let p = document.createElement("p");
  p.innerText =
    "El Presentador a continuacion abre la puerta numero : " +
    (openableDoors[openableDoorIndex].number + 1);
  tableroElement.appendChild(p);

  p = document.createElement("p");
  p.innerText = "Quieres cambiar la puerta o mantienes la elegida?";

  const changeButton = document.createElement("button");
  changeButton.innerText = "Cambiar";
  const keepButton = document.createElement("button");
  keepButton.innerText = "Mantener";

  tableroElement.appendChild(p);

  tableroElement.appendChild(changeButton);
  changeButton.addEventListener("click", () => thirdInstance(true));

  tableroElement.appendChild(keepButton);
  keepButton.addEventListener("click", () => thirdInstance(false));

  console.group("----SELECCION DE PUERTA A ABRIR----");
  console.log("PUERTAS RESTANTES PARA ABRIR:");
  console.log(openableDoors);
  console.log("PUERTA SELECCIONADA PARA ABRIR EN ELEMENTO HTML:");
  console.log(openedDoorElement);
  console.log("PUERTA SELECCIONADA PARA ABRIR EN OBJETO JS:");
  console.log(openedDoorObject);
  console.groupEnd();
}

function thirdInstance(withChange) {
  if (withChange) {
    const targetDoorToChange = doors.find((door) => door.avaiable);
    selectedDoorElement = document.querySelector(
      `[data-door="${targetDoorToChange.number}"]`
    );
    selectedDoorObject = targetDoorToChange;
  }

  if (selectedDoorObject.prize) {
    let p = document.createElement("p");
    p.innerText = "Has Ganado!";
    tableroElement.appendChild(p);
  } else {
    let p = document.createElement("p");
    p.innerText = "Has Perdido!";
    tableroElement.appendChild(p);
  }
}
