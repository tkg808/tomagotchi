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
      image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/009.png"
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
  image: ""
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

const updateDisplay = function ()
{
  ageInterval();

  $image.attr("src", currentPet.image);
  $nameDisplay.text(`Name: ${currentPet.name}`);
  $ageDisplay.text(`Age: ${currentPet.age}`)
  $hungryDisplay.text(currentPet.hungry);
  $sleepyDisplay.text(currentPet.sleepy);
  $boredDisplay.text(currentPet.bored);
}

const ageInterval = function ()
{
  if (!intervalId)
  {
    intervalId = setInterval(increaseAge, 2000);
  }
}

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

const evolvePet = function ()
{
  if (currentPet.age >= 20)
  {
    currentPet.image = pets[index + 2].image;

    if (currentPet.name === pets[index + 1].name)
    {
      currentPet.name = pets[index + 2].name;
    }
  }
  else if (currentPet.age >= 10)
  {
    currentPet.image = pets[index + 1].image;

    if (currentPet.name === pets[index].name)
    {
      currentPet.name = pets[index + 1].name;
    }
  }
}

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

const increaseAge = function ()
{
  if (currentPet.age === 30 ||
    currentPet.hungry === 10 || currentPet.sleepy === 10 || currentPet.bored === 10)
  {
    clearInterval(intervalId);

    intervalId = null;

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
  // const index = Math.floor(Math.random() * 3) * 3;
  currentPet = pets[index];

  // let user see their pet before deciding to name it
  $image.attr("src", currentPet.image);

  setTimeout(() => (prompt("What would you like to name your new pet?", currentPet.name)), 500);

  isAlive = true;

  updateDisplay();
}

/* === Event Functions === */

const checkPet = function ()
{
  if (isAlive === false)
  {
    $image.attr("src", egg);

    // the arrow function is required to delay the invokation of updateDisplay
    setTimeout(() => (generateNewPet()), 3000);
  }
  else
  {
    updateDisplay();
  }
}

const feedPet = function ()
{
  if ($image.attr("src") !== logo)
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
  if ($image.attr("src") !== logo)
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
  if ($image.attr("src") !== logo)
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

/* === Invoked Functions === */

$image.attr("src", logo);

