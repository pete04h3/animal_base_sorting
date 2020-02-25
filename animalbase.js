"use strict";

window.addEventListener("DOMContentLoaded", start);

let allAnimals = [];
let currentList = [];
let winners = [];

// The prototype for all animals:
const Animal = {
  name: "",
  desc: "-unknown animal-",
  type: "",
  age: 0,
  star: false,
  winner: false
};

function start() {
  console.log("ready");

  // TODO: Add event-listeners to filter and sort buttons

  document.querySelector("[data-filter='cat']").addEventListener("click", filterCats);
  document.querySelector("[data-filter='dog']").addEventListener("click", filterDogs);
  document.querySelector("[data-filter='all']").addEventListener("click", showAll);

  document.querySelector("[data-sort='name']").addEventListener("click", sortingName);
  document.querySelector("[data-sort='type']").addEventListener("click", sortingType);
  document.querySelector("[data-sort='desc']").addEventListener("click", sortingDesc);
  document.querySelector("[data-sort='age']").addEventListener("click", sortingAge);

  loadJSON();
}

//STJERNER

function setStar(animal) {
  if (animal.star === true) {
    animal.star = false;
  } else {
    animal.star = true;
  }
  console.log(animal.star);
  displayList(currentList);
}

//Winner
//first make new array with animals set to be winners
//Checks if animal.type and winner.type are the same and store in variable
//if they are the same animal.winner is false
//if the animal types are the same you cannot choose that as a winner
//only one type of animal can be a

function checkWinner(animal) {
  winners = currentList.filter(animal => animal.winner === true);
  const winnerType = winners.some(winner => {
    return winner.type === animal.type;
  });
  if (animal.winner === true) {
    animal.winner = false;
  } else {
    if (winnerType) {
      //calling oneWinnerOfEachType function
      oneWinnerOfEachType();
      animal.winner = false;
    } else if (winners.length == 2) {
      //calling removeOneToAddAnother function
      removeOneToAddAnother();
      animal.winner = false;
    } else {
      animal.winner = true;
    }
  }

  console.log(winners);
  console.log(animal.winner);
  displayList(currentList);
}

//Eventslisterners on buttons in dialog popups
//Printing the correct text string into dialog popups

function oneWinnerOfEachType() {
  document.querySelector("#onlyonekind").classList.add("show");
  document.querySelector("#onlyonekind .closebutton").addEventListener("click", closeDialog);
  document.querySelector("#onlyonekind .removebutton1").addEventListener("click", () => {
    closeDialog();
  });
  console.log(oneWinnerOfEachType);
  document.querySelector("#onlyonekind .animal1").textContent = winners[0].name + " " + winners[0].type;
}

function removeOneToAddAnother() {
  document.querySelector("#onlytwowinners").classList.add("show");
  document.querySelector("#onlytwowinners .closebutton").addEventListener("click", closeDialog);
  document.querySelector("#onlytwowinners .removebutton1").addEventListener("click", () => {
    removeOneAnimal();
  });
  console.log(removeOneToAddAnother);
  document.querySelector("#onlytwowinners .animal1").textContent = winners[0].name + " " + winners[0].type;
  document.querySelector("#onlytwowinners .animal2").textContent = winners[1].name + " " + winners[1].type;
}

//DIALOG BOX

function closeDialog() {
  document.querySelector("#onlytwowinners").classList.remove("show");
  document.querySelector("#onlyonekind").classList.remove("show");
  start();
}

function removeOneAnimal() {
  document.querySelector("#onlytwowinners").classList.remove("show");
  // TODO: Remove winner icon and make the selected animal being removed
  // to false again. NEED HELP!
}

//Filtering

function filterCats() {
  currentList = allAnimals.filter(isCat);
  displayList(currentList);
}

function filterDogs() {
  currentList = allAnimals.filter(isDog);
  displayList(currentList);
}
function showAll() {
  currentList = allAnimals.filter(isAll);
  displayList(currentList);
}

function isCat(animal) {
  return animal.type === "cat";
}

function isDog(animal) {
  return animal.type === "dog";
}

function isAll(animal) {
  return animal;
}

async function loadJSON() {
  const response = await fetch("animals.json");
  const jsonData = await response.json();

  // when loaded, prepare data objects
  prepareObjects(jsonData);
}

function prepareObjects(jsonData) {
  allAnimals = jsonData.map(preapareObject);

  showAll();
}

function preapareObject(jsonObject) {
  const animal = Object.create(Animal);

  const texts = jsonObject.fullname.split(" ");
  animal.name = texts[0];
  animal.desc = texts[2];
  animal.type = texts[3];
  animal.age = jsonObject.age;

  return animal;
}

function displayList(animals) {
  // clear the list
  document.querySelector("#list tbody").innerHTML = "";

  // build a new list
  animals.forEach(displayAnimal);
}

function displayAnimal(animal) {
  // create clone
  const clone = document.querySelector("template#animal").content.cloneNode(true);

  //setstar

  let animalStar = clone.querySelector("[data-field=star]");

  if (animal.star === true) {
    animalStar.textContent = "⭐";
  } else {
    animalStar.textContent = "☆";
  }

  //setwinner

  let animalWinner = clone.querySelector("[data-field=winner]");

  if (animal.winner === true) {
    clone.querySelector("[data-field=winner]").classList.remove("grayout");
  } else {
    clone.querySelector("[data-field=winner]").classList.add("grayout");
  }

  //star click function

  clone.querySelector("[data-field=star]").addEventListener("click", function() {
    setStar(animal);
  });

  //winner click function
  clone.querySelector("[data-field=winner]").addEventListener("click", function() {
    checkWinner(animal);
  });

  // set clone data
  clone.querySelector("[data-field=name]").textContent = animal.name;
  clone.querySelector("[data-field=desc]").textContent = animal.desc;
  clone.querySelector("[data-field=type]").textContent = animal.type;
  clone.querySelector("[data-field=age]").textContent = animal.age;

  // append clone to list
  document.querySelector("#list tbody").appendChild(clone);
}

//sorting

function sortingName() {
  const sortName = currentList.sort(compareName);
  displayList(currentList);

  console.log(sortingName);
}
function sortingType() {
  const sortType = currentList.sort(compareType);
  displayList(currentList);

  console.log(sortingType);
}
function sortingDesc() {
  const sortDesc = currentList.sort(compareDesc);
  displayList(currentList);

  console.log(sortingDesc);
}
function sortingAge() {
  const sortAge = currentList.sort(compareAge);
  displayList(currentList);

  console.log(sortingAge);
}

function compareName(a, b) {
  if (a.name < b.name) {
    return -1;
  } else if (a.name > b.name) {
    return -1;
  } else {
    return 1;
  }
}

function compareType(a, b) {
  if (a.type < b.type) {
    return -1;
  } else if (a.type > b.type) {
    return -1;
  } else {
    return 1;
  }
}

function compareDesc(a, b) {
  if (a.desc < b.desc) {
    return -1;
  } else if (a.desc > b.desc) {
    return -1;
  } else {
    return 1;
  }
}

function compareAge(a, b) {
  if (a.age < b.age) {
    return -1;
  } else if (a.age > b.age) {
    return -1;
  } else {
    return 1;
  }
}

currentList.sort(compareName);
console.log(compareName);
