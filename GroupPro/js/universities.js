document.addEventListener('DOMContentLoaded', () => {
  const universityCardsContainer = document.getElementById('universityCards');
  const paginationContainer = document.getElementById('pagination');

  // Fetch the list of universities
  fetch('http://127.0.0.1:8000/univ/get_univs')
    .then(response => response.json())
    .then(data => {
      if (data.answer === 'success') {
        const universities = data.universities;
        let currentPage = 1;
        const universitiesPerPage = 6;

        function showUniversities(page) {
          universityCardsContainer.innerHTML = '';
          const startIndex = (page - 1) * universitiesPerPage;
          const endIndex = Math.min(page * universitiesPerPage, universities.length);
          universities.slice(startIndex, endIndex).forEach(university => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
              <img src="http://127.0.0.1:8000${university.university_picture}" alt="${university.name}">
              <div class="card-title">${university.name}</div>
            `;
            card.addEventListener('click', () => {
              // Redirect to the university detail page with university name in the URL
              const encodedUniversityName = encodeURIComponent(university.name);
              window.location.href = `universityDetails.html?name=${encodedUniversityName}`;
            });
            universityCardsContainer.appendChild(card);
          });

          updatePagination(currentPage, Math.ceil(universities.length / universitiesPerPage));
        }

        function updatePagination(currentPage, totalPages
