let apiData = {};
fetch('./travel_recommendation_api.json')
    .then(r => r.json())
    .then(r => {
        console.log(r);
        apiData = r;
})

document.querySelector('form[role="search"]').addEventListener('submit', e => {
    e.preventDefault();
    const searchWords = e.currentTarget.querySelector('input[type="search"').value;
    const beachesResults = apiData.beaches.filter(beach => beach.name.toLowerCase().includes(searchWords.toLowerCase()));
    const countriesResults = apiData.countries.filter(beach => beach.name.toLowerCase().includes(searchWords.toLowerCase()));
    const templesResults = apiData.temples.filter(beach => beach.name.toLowerCase().includes(searchWords.toLowerCase()));

    [
        [beachesResults, '.beaches'],
        [countriesResults, '.countries'],
        [templesResults, '.temples'],
    ].forEach(el => {
        const [arr, selector] = el;
        const parentEl = document.querySelector(selector).querySelector('.row')
        parentEl.innerHTML = '';

        arr.forEach(entry => {
            const entryCol = document.createElement('div');
            entryCol.classList.add('col-md-3', 'd-flex', 'flex-column');
            entryCol.setAttribute('data-entryid', entry.id)
    
            if (entry.imageUrl) {
                const entryImg = document.createElement('img');
                entryImg.src = entry.imageUrl;
                entryCol.appendChild(entryImg);
            }
    
            const entryName = document.createElement('span');
            entryName.classList.add('h4');
            entryName.innerHTML = entry.name;
    
            const entryDescription = document.createElement('p');
            entryDescription.innerHTML = entry.description ?? '';
    
            entryCol.appendChild(entryName);
            entryCol.appendChild(entryDescription);

            if (entry.cities) {
                const entryUl = document.createElement('ul');
                entry.cities.forEach(city => {
                    const entryLi = document.createElement('li');
                    entryLi.innerHTML = city.name;
                    entryUl.append(entryLi);
                })
                entryCol.appendChild(entryUl);
            }

            parentEl.appendChild(entryCol);
        });
    })

    console.log(beachesResults, countriesResults, templesResults)
})