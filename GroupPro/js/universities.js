document.addEventListener('DOMContentLoaded', () => {
  const universityCardsContainer = document.getElementById('universityCards');
  const paginationContainer = document.getElementById('pagination');
  const itemsPerPage = 6;
  let currentPage = 1;
  let universities = [];

  function showPage(page) {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    // Hide all cards
    document.querySelectorAll('.card').forEach(card => card.style.display = 'none');

    // Show only the cards for the current page
    universities.slice(start, end).forEach(card => card.style.display = 'block');

    // Update pagination controls
    updatePaginationControls(page);
  }

  function updatePaginationControls(page) {
    const totalPages = Math.ceil(universities.length / itemsPerPage);
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

  // Fetch the list of universities
  fetch('http://127.0.0.1:8000/univ/get_univs')
    .then(response => response.json())
    .then(data => {
      if (data.answer === 'success') {
        const defaultImage = "images/logo.png"; 

        data.universities.forEach(university => {
          const card = document.createElement('div');
          card.className = 'card';

          const imageSrc = university.university_picture ? `http://127.0.0.1:8000${university.university_picture}` : defaultImage;

          card.innerHTML = `
            <img src="${imageSrc}" alt="${university.name}">
            <div class="card-title">${university.name}</div>
          `;

          card.addEventListener('click', () => {
            // Redirect to the university detail page with university name in the URL
            const encodedUniversityName = encodeURIComponent(university.name);
            window.location.href = `universityDetails.html?name=${encodedUniversityName}`;
          });

          universityCardsContainer.appendChild(card);
          universities.push(card);
        });

        // Initialize pagination
        showPage(currentPage);
      } else {
        console.error('Error fetching universities:', data.error_message);
      }
    })
    .catch(error => console.error('Error fetching universities:', error));
});
