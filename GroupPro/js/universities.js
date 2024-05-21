document.addEventListener('DOMContentLoaded', () => {
            const universityCardsContainer = document.getElementById('universityCards');
            const itemsPerPage = 6;
            let currentPage = 1;
            let universities = [];

            // Function to render universities on the page
            function renderUniversities(page) {
                universityCardsContainer.innerHTML = '';
                const start = (page - 1) * itemsPerPage;
                const end = start + itemsPerPage;
                const paginatedUniversities = universities.slice(start, end);

                paginatedUniversities.forEach(university => {
                    const card = document.createElement('div');
                    card.className = 'card';

                    // Fetch university picture
                    fetch('http://127.0.0.1:8000/univ/get_univ_picture', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ name: university.name }),
                    })
                    .then(response => response.json())
                    .then(pictureData => {
                        let universityPicture = 'images/universitylogo.png'; // Default picture
                        if (pictureData.answer === 'success') {
                            universityPicture = pictureData.profile_picture || universityPicture;
                        }
                        card.innerHTML = `
                            <img src="${universityPicture}" alt="${university.name}">
                            <div class="card-title">${university.name}</div>
                        `;
                        card.addEventListener('click', () => {
                            // Redirect to the university detail page with university name in the URL
                            const encodedUniversityName = encodeURIComponent(university.name);
                            window.location.href = `university.html?name=${encodedUniversityName}`;
                        });
                        universityCardsContainer.appendChild(card);
                    })
                    .catch(error => {
                        console.error('Error fetching university picture:', error);
                        card.innerHTML = `
                            <img src="images/universitylogo.png" alt="${university.name}">
                            <div class="card-title">${university.name}</div>
                        `;
                        card.addEventListener('click', () => {
                            const encodedUniversityName = encodeURIComponent(university.name);
                            window.location.href = `university.html?name=${encodedUniversityName}`;
                        });
                        universityCardsContainer.appendChild(card);
                    });
                });

                renderPagination();
            }

            // Function to render pagination controls
            function renderPagination() {
                const paginationContainer = document.getElementById('pagination');
                paginationContainer.innerHTML = '';
                const totalPages = Math.ceil(universities.length / itemsPerPage);

                for (let i = 1; i <= totalPages; i++) {
                    const pageLink = document.createElement('button');
                    pageLink.textContent = i;
                    pageLink.className = 'page-link';
                    if (i === currentPage) {
                        pageLink.classList.add('active');
                    }
                    pageLink.addEventListener('click', () => {
                        currentPage = i;
                        renderUniversities(currentPage);
                    });
                    paginationContainer.appendChild(pageLink);
                }
            }

            // Fetch the list of universities
            fetch('http://127.0.0.1:5500/univ/get_univs')
                .then(response => response.json())
                .then(data => {
                    if (data.answer === 'success') {
                        universities = data.universities;
                        renderUniversities(currentPage);
                    } else {
                        console.error('Error fetching universities:', data.error_message);
                    }
                })
                .catch(error => console.error('Error fetching universities:', error));
        });
