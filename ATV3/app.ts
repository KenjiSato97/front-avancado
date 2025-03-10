interface Country {
    name: {
        common: string;
    };
    capital: string[];
    population: number;
    flags: {
        svg: string;
    };
}

const searchForm = document.getElementById('searchForm') as HTMLFormElement;
const countryInput = document.getElementById('countryInput') as HTMLInputElement;
const resultDiv = document.getElementById('result') as HTMLDivElement;
const loadingDiv = document.getElementById('loading') as HTMLDivElement;
const errorDiv = document.getElementById('error') as HTMLDivElement;

searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const countryName = countryInput.value.trim();
    if (!countryName) return;

    resetUI();
    showLoading();

    try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
        
        if (!response.ok) {
            throw new Error('País não encontrado');
        }

        const data: Country[] = await response.json();
        
        if (data.length === 0) {
            throw new Error('País não encontrado');
        }

        displayCountry(data[0]);
    } catch (error) {
        showError();
    } finally {
        hideLoading();
    }
});

function resetUI() {
    resultDiv.innerHTML = '';
    errorDiv.classList.add('hidden');
}

function showLoading() {
    loadingDiv.classList.remove('hidden');
}

function hideLoading() {
    loadingDiv.classList.add('hidden');
}

function showError() {
    errorDiv.classList.remove('hidden');
}

function displayCountry(country: Country) {
    const card = document.createElement('div');
    card.className = 'country-card';

    const flagImg = document.createElement('img');
    flagImg.src = country.flags.svg;
    flagImg.alt = `Bandeira de ${country.name.common}`;

    const name = document.createElement('h2');
    name.textContent = country.name.common;

    const capital = document.createElement('p');
    capital.textContent = `Capital: ${country.capital.join(', ') || 'N/A'}`;

    const population = document.createElement('p');
    population.textContent = `População: ${country.population.toLocaleString()}`;

    card.append(flagImg, name, capital, population);
    resultDiv.appendChild(card);
}