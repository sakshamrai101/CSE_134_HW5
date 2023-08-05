const cardContainer = document.getElementById('cardContainer');
const loadLocalButton = document.getElementById('loadLocal');
const loadRemoteButton = document.getElementById('loadRemote');

loadLocalButton.addEventListener('click', () => {
    fetch('local_data.json')
        .then(response => response.json())
        .then(data => showCards(data));
});

loadRemoteButton.addEventListener('click', () => {
    fetch('https://api.jsonbin.io/v3/b/64ce617bb89b1e2299cbd592', {
        headers: {
            'secret-key': '$2b$10$SmG/lbXY4iFqadzP0yik.uGJwDApufd01TP/sCIs3FioZoA7ACxBO', // Replace with your actual JSON Bin API key
        },
    })
        .then(response => response.json())
        .then(data => showCards(data.record))
        .catch(error => console.error('Error fetching remote data:', error));
});

function showCards(data) {
    cardContainer.innerHTML = ''; 

    data.forEach(project => {
        const card = createCard(project);
        cardContainer.appendChild(card);
    });
}

function createCard(project) {
    const card = document.createElement('div');
    card.className = 'card';

    const heading = document.createElement('h2');
    heading.textContent = project.title;

    const logo = document.createElement('img');
    logo.src = project.logo;
    logo.alt = `${project.title} Logo`; 

    const description = document.createElement('p');
    description.textContent = project.description;

    const readMoreLink = document.createElement('a');
    readMoreLink.textContent = 'Read More';
    readMoreLink.href = project.readMoreURL;
    readMoreLink.target = '_blank';

    card.appendChild(heading);
    card.appendChild(logo);
    card.appendChild(description);
    card.appendChild(readMoreLink);

    return card;
}
