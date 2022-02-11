/* === Variables === */

const pets =
  [
    {
      name: "Bulbasaur",
      age: 1,
      hungry: 1,
      sleepy: 1,
      bored: 1,
      image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png"
    },
    {
      name: "Ivysaur",
      age: 1,
      hungry: 1,
      sleepy: 1,
      bored: 1,
      image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/002.png"
    },
    {
      name: "Venusaur",
      age: 1,
      hungry: 1,
      sleepy: 1,
      bored: 1,
      image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/003.png"
    },
    {
      name: "Charmander",
      age: 1,
      hungry: 1,
      sleepy: 1,
      bored: 1,
      image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png"
    },
    {
      name: "Charmeleon",
      age: 1,
      hungry: 1,
      sleepy: 1,
      bored: 1,
      image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/005.png"
    },
    {
      name: "Charizard",
      age: 1,
      hungry: 1,
      sleepy: 1,
      bored: 1,
      image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/006.png"
    },
    {
      name: "Squirtle",
      age: 1,
      hungry: 1,
      sleepy: 1,
      bored: 1,
      image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png"
    },
    {
      name: "Wartortle",
      age: 1,
      hungry: 1,
      sleepy: 1,
      bored: 1,
      image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/008.png"
    },
    {
      name: "Blastoise",
      age: 1,
      hungry: 1,
      sleepy: 1,
      bored: 1,
      image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/009.png",
    },
  ];

const logo = "http://4.bp.blogspot.com/-oH465XaJjpY/T8yZVJsteTI/AAAAAAAAADs/LwFrlgaVVv0/s1600/dog_paw_print_black.png";

const egg = "https://www.pinclipart.com/picdir/big/89-892298_pokemon-egg-pokemon-go-egg-png-clipart.png";

const grave = "https://tinyimg.io/i/rxVYoCD.png";

let currentPet =
{
  name: "",
  age: 0,
  hungry: 0,
  sleepy: 0,
  bored: 0,
  image: "",
};

let index = Math.floor(Math.random() * 3) * 3;

let isAlive = false;

let intervalId;

/* === DOM Elements === */

// pet info displays
const $image = $(".pet__image");
const $nameDisplay = $(".info__name");
const $ageDisplay = $(".info__age");

// stat displays
const $hungryDisplay = $(".stat__hungry");
const $sleepyDisplay = $(".stat__sleepy");
const $boredDisplay = $(".stat__bored");

// buttons
const $feed = $(".interact__feed");
const $sleep = $(".interact__sleep");
const $play = $(".interact__play");
const $active = $(".button__active");

/* === Functions === */

// sets an interval if there isn't one already
const ageInterval = function ()
{
  if (!intervalId)
  {
    intervalId = setInterval(increaseAge, 2000);
  }
}

// gets a name for pet from user or uses default names
const getName = function ()
{
  currentPet.name = prompt("What would you like to name your new pet?", pets[index].name);

  if (currentPet.name === null)
  {
    currentPet.name = pets[index].name;
  }
}

// updates the UI with current pet info/stats
const updateDisplay = function ()
{
  $image.attr("src", currentPet.image);
  $nameDisplay.text(`Name: ${currentPet.name}`);
  $ageDisplay.text(`Age: ${currentPet.age}`)
  $hungryDisplay.text(currentPet.hungry);
  $sleepyDisplay.text(currentPet.sleepy);
  $boredDisplay.text(currentPet.bored);
}

// randomly increases a stat by one
const increaseStats = function ()
{
  if (Math.random() < 0.5)
  {
    currentPet.hungry += 1;
  }

  if (Math.random() < 0.5)
  {
    currentPet.sleepy += 1;
  }

  if (Math.random() < 0.5)
  {
    currentPet.bored += 1;
  }
}

// transforms the pet at certain ages and changes it's name if necessary
const evolvePet = function ()
{
  if (currentPet.age === 20)
  {
    currentPet.image = pets[index + 2].image;

    if (currentPet.name === pets[index + 1].name)
    {
      currentPet.name = pets[index + 2].name;
    }

    alert(`Whoa! ${currentPet.name} is transforming!`);

    evolveAnimation(); // evolve animation here
  }
  else if (currentPet.age === 10)
  {
    currentPet.image = pets[index + 1].image;

    if (currentPet.name === pets[index].name)
    {
      currentPet.name = pets[index + 1].name;
    }

    alert(`Whoa! ${currentPet.name} is transforming!`);

    evolveAnimation(); // evolve animation here
  }
}

// invokes when age reaches a specified number or if a stat reaches 10
const buryPet = function ()
{
  $image.attr("src", grave);

  if (currentPet.age === 30)
  {
    alert(`${currentPet.name} lived a happy life and died of old age`);
  }
  else if (currentPet.hungry === 10)
  {
    alert(`${currentPet.name} died from starvation!`);
  }
  else if (currentPet.sleepy === 10)
  {
    alert(`${currentPet.name} died from exhaustion!`);
  }
  else if (currentPet.bored === 10)
  {
    alert(`${currentPet.name} died from boredom!`);
  }
}

// stops the interval if criteria is met, or continues to accrue age/stats
const increaseAge = function ()
{
  if (currentPet.age === 30 ||
    currentPet.hungry === 10 || currentPet.sleepy === 10 || currentPet.bored === 10)
  {
    clearInterval(intervalId);
    intervalId = null;

    isAlive = false;
    buryPet();
  }
  else
  {
    currentPet.age += 1;

    increaseStats();
    evolvePet();

    updateDisplay();
  }
}

const generateNewPet = function ()
{
  // spread operator clones the object
  currentPet = { ...pets[index] };

  // let user see their pet before deciding to name it
  $image.attr("src", currentPet.image);

  // asks user for pet's name after delay
  setTimeout(() => (getName()), 500);

  isAlive = true;

  updateDisplay();

  ageInterval();
}

/* === Event Functions === */

const checkPet = function ()
{
  if (isAlive === false)
  {
    $image.attr("src", egg);

    eggAnimation();

    // the arrow function is required to delay the invokation of updateDisplay
    setTimeout(() => (generateNewPet()), 4000);
  }
  else
  {
    updateDisplay();
  }
}

const feedPet = function ()
{
  if (isAlive === true)
  {
    if (currentPet.hungry === 1)
    {
      alert(`${currentPet.name} is not hungry!`)
    }
    else
    {
      currentPet.hungry -= 1;
    }
  }

  updateDisplay();
}

const sleepPet = function ()
{
  if (isAlive === true)
  {
    if (currentPet.sleepy === 1)
    {
      alert(`${currentPet.name} doesn't want to nap!`);
    }
    else
    {
      currentPet.sleepy -= 1;
    }
  }

  updateDisplay();
}

const playPet = function ()
{
  if (isAlive === true)
  {
    if (currentPet.bored === 1)
    {
      alert(`${currentPet.name} is done playing!`);
    }
    else
    {
      currentPet.bored -= 1;
    }
  }

  updateDisplay();
}

/* === Event Listeners === */

$active.on("click", checkPet)

$feed.on("click", feedPet);

$sleep.on("click", sleepPet);

$play.on("click", playPet);

/* === Animation Functions === */

const eggAnimation = function ()
{
  setTimeout(() => ($image.shake()), 1500);
  setTimeout(() => ($image.shake()), 2500);
  setTimeout(() => ($image.shake()), 3000);
}

$.fn.shake = function (interval = 100)
{
  this.addClass('shaking');

  this.css('transition', 'all ' + (interval / 100).toString() + 's');

  setTimeout(() =>
  {
    this.css('transform', 'translateX(-50%)');
  }, interval * 0);

  setTimeout(() =>
  {
    this.css('transform', 'translateX(50%)');
  }, interval * 1);

  setTimeout(() =>
  {
    this.css('transform', 'translateX(-25%)');
  }, interval * 2);

  setTimeout(() =>
  {
    this.css('transform', 'translateX(25%)');
  }, interval * 3);

  setTimeout(() =>
  {
    this.css('transform', 'translateX(-7%)');
  }, interval * 4);

  setTimeout(() =>
  {
    this.css('transform', 'translateX(0%)');
  }, interval * 5);

  this.removeClass('shaking');
}

// alternate images of two pets with varying opacity until the evolved is fully visible
const evolveAnimation = function () 
{
  setTimeout(() => ($image.evolve()), 1000);
}

$.fn.evolve = function (interval = 100, currentIndex)
{
  this.addClass('evolving');

  this.css('transition', 'all ' + (interval / 50).toString() + 's');



  // this.removeClass('evolving');
}

console.log(`😋`);