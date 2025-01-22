let searchbtn = document.getElementById("searchbtn");
let clearbtn = document.getElementById("clearbtn");
let result = document.getElementById("resultContainer");
let mydiv = document.getElementById("dropdown");
let close = document.getElementById("close-btn");
let query = document.getElementById("searchinput");

const clearsearch = () => {
  query.value = "";
  mydiv.style.display = "none";
  console.log("Clearing");
};

clearbtn.addEventListener("click", clearsearch);

const showResult = (name, img, info) => {
  if (mydiv.style.display === "none" || mydiv.style.display === "") {
    mydiv.style.display = "block";
  } else {
    mydiv.style.display = "none";
  }
  result.innerHTML = `
    <h2 class="title">${name}</h2>
    <img class="search-img" src=${img} alt="sofia">
    <p class="description">${info}</p>
  `;
};

const closeDropdown = () => {
  mydiv.style.display = "none";
  query.value = "";
};

close.addEventListener("click", closeDropdown);

const searchError = () => {
  if (mydiv.style.display === "none" || mydiv.style.display === "") {
    mydiv.style.display = "block";
  } else {
    mydiv.style.display = "none";
  }

  result.innerHTML = `<p class="notfound">Sorry we can't find your search</p>`;
};

fetch("travel_recommendation_api.json")
  .then((res) => res.json())
  .then((data) => {
    const search = () => {
      let searchQuery = query.value.toLowerCase();
      let notfound = true;

      data.countries.map((country) => {
        if (country.name.toLowerCase().includes(searchQuery)) {
          showResult(
            country.name,
            country.cities[0]?.imageUrl || "",
            `Explore amazing cities in ${country.name}.`
          );
          notfound = false;
        } else {
          country.cities.map((city) => {
            if (city.name.toLowerCase().includes(searchQuery)) {
              showResult(city.name, city.imageUrl, city.description);
              notfound = false;
            }
          });
        }
      });

      data.temples.map((temple) => {
        if (temple.name.toLowerCase().includes(searchQuery)) {
          showResult(temple.name, temple.imageUrl, temple.description);
          notfound = false;
        }
      });

      data.beaches.map((beach) => {
        if (beach.name.toLowerCase().includes(searchQuery)) {
          showResult(beach.name, beach.imageUrl, beach.description);
          notfound = false;
        }
      });

      if (notfound) {
        searchError();
      }
    };
    searchbtn.addEventListener("click", search);
  });
  const options = { timeZone: 'America/New_York', hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
  const newYorkTime = new Date().toLocaleTimeString('en-US', options);
  console.log("Current time in New York:", newYorkTime);
