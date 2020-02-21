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
  /*   let catButton = document.querySelector("[data-filter=cat]");
  let dogButton = document.querySelector("[data-filter=dog]");
  let allButton = document.querySelector("[data-filter=all]");

  catButton.addEventListener("click", showCats);
  dogButton.addEventListener("click", showDogs);
  allButton.addEventListener("click", showAll); */

  /*   let buttons = document.querySelectorAll("[data-action='filter']");

  buttons.forEach(button => {
    button.addEventListener("click", filterbutton);
  }); */

  document.querySelector("[data-filter='cat").addEventListener("click", filterCats);
  document.querySelector("[data-filter='dog").addEventListener("click", filterDogs);
  document.querySelector("[data-filter='all").addEventListener("click", showAll);

  loadJSON();
}

/* function filterbutton() {
  console.log("filter button");
  console.log(this);

  const filter = this.dataset.filter;
  setFilter(filter);
}

function setFilter(filter) {} */

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
