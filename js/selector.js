const urlBaseSelector = 'https://apisimpsons.fly.dev/api/personajes';
let personajesSelector = [];

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('selector-load-button').addEventListener('click', cargarListaSelector);
  document.getElementById('selector-personaje').addEventListener('change', mostrarSeleccionado);
});

async function cargarListaSelector() {
  const btn = document.getElementById('selector-load-button');
  const select = document.getElementById('selector-personaje');
  const info = document.getElementById('selector-info');

  btn.disabled = true;
  btn.innerText = 'Cargando...';

  try {
    personajesSelector = [];


    for (let pag = 1; pag <= 3; pag++) {
      const res = await fetch(`${urlBaseSelector}?limit=20&page=${pag}`);
      const data = await res.json();
      if (data.docs) {
        personajesSelector = personajesSelector.concat(data.docs);
      }
    }


    select.innerHTML = '<option value="">-- Elige tu personaje favorito --</option>';
    personajesSelector.forEach((p, i) => {
      const option = document.createElement('option');
      option.value = i;
      option.textContent = p.Nombre;
      select.appendChild(option);
    });

    info.innerHTML = '<p class="selector-placeholder">Selecciona un personaje de la lista.</p>';
  } catch (err) {
    console.log('error cargando el selector', err);
    info.innerHTML = '<p class="selector-placeholder">Error al cargar los personajes.</p>';
  }

  btn.disabled = false;
  btn.innerText = 'Cargar personajes';
}

function mostrarSeleccionado() {
  const select = document.getElementById('selector-personaje');
  const info = document.getElementById('selector-info');

  if (select.value === '') {
    info.innerHTML = '<p class="selector-placeholder">Selecciona un personaje de la lista.</p>';
    return;
  }

  const p = personajesSelector[select.value];

  info.innerHTML = `
    <div class="selector-card">
      <img src="${p.Imagen}" alt="${p.Nombre}">
      <h3>${p.Nombre}</h3>
      <p><b>Estado:</b> ${p.Estado}</p>
      <p><b>Género:</b> ${p.Genero}</p>
      <p><b>Ocupación:</b> ${p.Ocupacion}</p>
      <p>${p.Historia}</p>
    </div>
  `;
}