var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
const searchForm = document.getElementById("searchForm");
const countryInput = document.getElementById("countryInput");
const resultDiv = document.getElementById("result");
const loadingDiv = document.getElementById("loading");
const errorDiv = document.getElementById("error");
searchForm.addEventListener("submit", (e) =>
  __awaiter(this, void 0, void 0, function* () {
    e.preventDefault();
    const countryName = countryInput.value.trim();
    if (!countryName) return;
    resetUI();
    showLoading();
    try {
      const response = yield fetch(
        `https://restcountries.com/v3.1/name/${countryName}`
      );
      if (!response.ok) {
        throw new Error("País não encontrado");
      }
      const data = yield response.json();
      if (data.length === 0) {
        throw new Error("País não encontrado");
      }
      displayCountry(data[0]);
    } catch (error) {
      showError();
    } finally {
      hideLoading();
    }
  })
);
function resetUI() {
  resultDiv.innerHTML = "";
  errorDiv.classList.add("hidden");
}
function showLoading() {
  loadingDiv.classList.remove("hidden");
}
function hideLoading() {
  loadingDiv.classList.add("hidden");
}
function showError() {
  errorDiv.classList.remove("hidden");
}
function displayCountry(country) {
  const card = document.createElement("div");
  card.className = "country-card";
  const flagImg = document.createElement("img");
  flagImg.src = country.flags.svg;
  flagImg.alt = `Bandeira de ${country.name.common}`;
  const name = document.createElement("h2");
  name.textContent = country.name.common;
  const capital = document.createElement("p");
  capital.textContent = `Capital: ${country.capital.join(", ") || "N/A"}`;
  const population = document.createElement("p");
  population.textContent = `População: ${country.population.toLocaleString()}`;
  card.append(flagImg, name, capital, population);
  resultDiv.appendChild(card);
}
