document.addEventListener('DOMContentLoaded', () => {
  const specialtiesCardsContainer = document.getElementById('specialtiesCards');
  const paginationContainer = document.getElementById('pagination');
  const itemsPerPage = 6;
  let currentPage = 1;
  let specialties = [];

  function showPage(page) {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    // Hide all cards
    document.querySelectorAll('.card').forEach(card => card.style.display = 'none');

    // Show only the cards for the current page
    specialties.slice(start, end).forEach(card => card.style.display = 'block');

    // Update pagination controls
    updatePaginationControls(page);
  }

  function updatePaginationControls(page) {
    const totalPages = Math.ceil(specialties.length / itemsPerPage);
    paginationContainer.innerHTML = '';

    const createPageLink = (pageNum, isActive = false) => {
      const link = document.createElement('a');
      link.href = '#';
      link.textContent = pageNum;
      link.className = isActive ? 'active' : '';
      link.addEventListener('click', (e) => {
        e.preventDefault();
        currentPage = pageNum;
        showPage(currentPage);
      });
      return link;
    };

    if (page > 1) {
      const prevLink = document.createElement('a');
      prevLink.href = '#';
      prevLink.textContent = '«';
      prevLink.addEventListener('click', (e) => {
        e.preventDefault();
        currentPage--;
        showPage(currentPage);
      });
      paginationContainer.appendChild(prevLink);
    }

    for (let i = 1; i <= totalPages; i++) {
      paginationContainer.appendChild(createPageLink(i, i === page));
    }

    if (page < totalPages) {
      const nextLink = document.createElement('a');
      nextLink.href = '#';
      nextLink.textContent = '»';
      nextLink.addEventListener('click', (e) => {
        e.preventDefault();
        currentPage++;
        showPage(currentPage);
      });
      paginationContainer.appendChild(nextLink);
    }
  }

  // Fetch the list of specialties
  fetch('http://127.0.0.1:8000/univ/get_specialties')
    .then(response => response.json())
    .then(data => {
      if (data.answer === 'success') {
        const defaultImage = "images/universitylogo.png"; 

        data.Specialties.forEach(specialty => {
          const card = document.createElement('div');
          card.className = 'card';

          card.innerHTML = `
            <img src="${defaultImage}" alt="${specialty.name}">
            <div class="card-title">${specialty.name}</div>
            <div class="card-description">${specialty.description}</div>
          `;

          card.addEventListener('click', () => {
            // Redirect to the specialty detail page with specialty name in the URL
            const encodedSpecialtyName = encodeURIComponent(specialty.name);
            window.location.href = `specialtyDetails.html?name=${encodedSpecialtyName}`;
          });

          specialtiesCardsContainer.appendChild(card);
          specialties.push(card);
        });

        // Initialize pagination
        showPage(currentPage);
      } else {
        console.error('Error fetching specialties:', data.error_message);
      }
    })
    .catch(error => console.error('Error fetching specialties:', error));
});
