let fullData = {};
let currentFilter = 'pokemons';
let searchTerm = '';

async function loadData() {
  const res = await fetch('database.json');
  fullData = await res.json();
  render();
}

function render() {
  const grid = document.getElementById('cardsGrid');
  const items = fullData[currentFilter] || [];
  const filtered = items.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  grid.innerHTML = filtered.map(item => renderCard(item, currentFilter)).join('');
}

function renderCard(item, type) {
  if (type === 'pokemons') {
    return `
      <div class="card pokemon-card">
        <img src="${item.image}" alt="${item.name}">
        <h3>${item.name}</h3>
        <label>Perícias de Movimento</label>
        <p>${item.moveSet}</p>
      </div>
    `;
  }
  if (type === 'items' || type === 'berries') {
    return `
      <div class="card item-card">
        <img src="${item.image}" alt="${item.name}">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <span class="rarity ${item.rarity.toLowerCase()}">${item.rarity}</span>
      </div>
    `;
  }
  if (type === 'moves') {
    return `
      <div class="card move-card">
        <img src="${item.icon}" alt="${item.name}">
        <div>
          <h3>${item.name}</h3>
          <p>${item.description}</p>
        </div>
      </div>
    `;
  }
  return '';
}

// Eventos
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    render();
  });
});
document.getElementById('searchInput').addEventListener('input', e => {
  searchTerm = e.target.value;
  render();
});

loadData();
