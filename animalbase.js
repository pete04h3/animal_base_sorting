"use strict";

window.addEventListener("DOMContentLoaded", start);

let allAnimals = [];

// The prototype for all animals:
const Animal = {
  name: "",
  desc: "-unknown animal-",
  type: "",
  age: 0
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

function filterCats() {
  const onlyCats = allAnimals.filter(isCat);
  displayList(onlyCats);
}

function filterDogs() {
  const onlyDogs = allAnimals.filter(isDog);
  displayList(onlyDogs);
}
function showAll() {
  const onlyAll = allAnimals.filter(isAll);
  displayList(onlyAll);
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

  // TODO: This might not be the function we want to call first

  displayList(allAnimals);
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

  // set clone data
  clone.querySelector("[data-field=name]").textContent = animal.name;
  clone.querySelector("[data-field=desc]").textContent = animal.desc;
  clone.querySelector("[data-field=type]").textContent = animal.type;
  clone.querySelector("[data-field=age]").textContent = animal.age;

  // append clone to list
  document.querySelector("#list tbody").appendChild(clone);
}

//sort

const animals = [
  {
    name: "Mandu",
    type: "cat"
  },
  {
    name: "Mia",
    type: "cat"
  },
  {
    name: "LeeLoo",
    type: "dog"
  },
  {
    name: "Toothless",
    type: "dragon"
  },
  {
    name: "ScoobyDoo",
    type: "dog"
  },
  {
    name: "Horsey",
    type: "horse"
  }
];
function sortingName() {
  const sortName = allAnimals.sort(compareName);
  displayList(sortName);

  console.log(sortingName);
}
function sortingType() {
  const sortType = allAnimals.sort(compareType);
  displayList(sortType);

  console.log(sortingType);
}
function sortingDesc() {
  const sortDesc = allAnimals.sort(compareDesc);
  displayList(sortDesc);

  console.log(sortingDesc);
}
function sortingAge() {
  const sortAge = allAnimals.sort(compareAge);
  displayList(sortAge);

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

allAnimals.sort(compareName);
console.log(compareName);
