// DOM Elements
const searchBar = document.getElementById('searchBar');
const sortSelect = document.getElementById('sortSelect');
const flashDealsContainer = document.getElementById('flashDeals');
const bestDealsContainer = document.getElementById('bestDeals');

// Deals Data - This will be our only source of data
const dealsData = [
  {
    title: "Sony WH-1000XM4 Headphones",
    price: 19999,
    oldPrice: 29999,
    category: "Electronics",
    image: "https://m.media-amazon.com/images/I/71o8Q5XJS5L._SX522_.jpg",
    link: "https://www.amazon.in/dp/B0863TXGM3"
  },
  {
    title: "Mi Smart Band 6",
    price: 2499,
    oldPrice: 3499,
    category: "Electronics",
    image: "https://m.media-amazon.com/images/I/41A3TVHeTPL._SX300_SY300_QL70_FMwebp_.jpg",
    link: "https://www.amazon.in/dp/B09B9QW1H8"
  },
  {
    title: "Realme Narzo 50A",
    price: 8999,
    oldPrice: 12999,
    category: "Electronics",
    image: "https://m.media-amazon.com/images/I/81xYrGV3-EL._SX679_.jpg",
    link: "https://www.amazon.in/dp/B09FLX8W4V"
  },
  {
    title: "OnePlus Nord CE 2",
    price: 22999,
    oldPrice: 24999,
    category: "Electronics",
    image: "https://m.media-amazon.com/images/I/61abLrCf3KL._SX679_.jpg",
    link: "https://www.amazon.in/dp/B09RM57V8S"
  },
  {
    title: "Philips Air Fryer",
    price: 7499,
    oldPrice: 9995,
    category: "Home",
    image: "https://m.media-amazon.com/images/I/61nUGJm8pWL._SX679_.jpg",
    link: "https://www.amazon.in/dp/B07T8V76QJ"
  },
  {
    title: "Samsung Galaxy M13",
    price: 10999,
    oldPrice: 14999,
    category: "Electronics",
    image: "https://m.media-amazon.com/images/I/81sFqNbzsxL._SX679_.jpg",
    link: "https://www.amazon.in/dp/B0B4F52BJF"
  },
  {
    title: "Lakme Lipstick Combo",
    price: 799,
    oldPrice: 1299,
    category: "Beauty",
    image: "https://m.media-amazon.com/images/I/51lgtK6zNJL._SX679_.jpg",
    link: "https://www.amazon.in/dp/B08L5TSH4Z"
  },
  {
    title: "Boat Rockerz 255",
    price: 999,
    oldPrice: 2499,
    category: "Electronics",
    image: "https://m.media-amazon.com/images/I/61l+n8sU5QL._SX679_.jpg",
    link: "https://www.amazon.in/dp/B07Q6ZWMLR"
  },
  { 
    title: "DENVER Hamilton Deo + Honour Deo - 165ML Each",
    price: 349,
    oldPrice: 460,
    category: "Beauty",
    image: "https://m.media-amazon.com/images/I/71YHjVXyR0L._SX679_.jpg", // Fixed image URL
    link: "https://www.amazon.in/dp/B0731G51VK"
  }
];

let currentCategory = '';

// Render Deals Function
function renderDeals() {
  const text = searchBar.value.toLowerCase();
  const category = currentCategory;
  const sort = sortSelect.value;

  flashDealsContainer.innerHTML = '';
  bestDealsContainer.innerHTML = '';

  let filteredDeals = dealsData.filter(deal => {
    const matchesText = deal.title.toLowerCase().includes(text);
    const matchesCategory = category ? deal.category === category : true;
    return matchesText && matchesCategory;
  });

  // Sort deals
  if (sort === 'lowToHigh') {
    filteredDeals.sort((a, b) => a.price - b.price);
  } else if (sort === 'highToLow') {
    filteredDeals.sort((a, b) => b.price - a.price);
  }

  // Render deals with image error handling
  filteredDeals.forEach((deal, index) => {
    const dealHTML = `
      <a href="${deal.link}" target="_blank" class="block">
        <div class="deal-card">
          <img src="${deal.image}" 
               alt="${deal.title}" 
               class="deal-image"
               onerror="this.onerror=null;this.src='https://via.placeholder.com/300?text=Image+Not+Available'">
          <h4 class="deal-title">${deal.title}</h4>
          <p class="deal-price">₹${deal.price.toLocaleString()} 
            <span class="old-price">₹${deal.oldPrice.toLocaleString()}</span>
          </p>
          <button class="deal-button">Get Deal</button>
        </div>
      </a>`;

    if (index < 4) {
      flashDealsContainer.innerHTML += dealHTML;
    } else {
      bestDealsContainer.innerHTML += dealHTML;
    }
  });
}

// Filter by Category
function filterCategory(category) {
  currentCategory = category === currentCategory ? '' : category;
  renderDeals();
}

// Event Listeners
searchBar.addEventListener('input', renderDeals);
sortSelect.addEventListener('change', renderDeals);

// Initial Render
document.addEventListener('DOMContentLoaded', renderDeals);