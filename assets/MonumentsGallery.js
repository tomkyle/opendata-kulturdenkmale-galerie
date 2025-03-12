export class MonumentsGallery {

    // Modified constructor to accept options object for itemSelector.
    constructor(containerSelector, options = {}) {
        this.options = Object.assign({
            geoJson: false,
            itemTemplateId: 'monument-template',
            itemSelector: '> div',
            filterInputSelector: 'input[type="search"]',
        }, options);

        this.galleryContainer = document.querySelector(containerSelector);
        this.itemSelector = this.options.itemSelector;
        this.itemTemplateId = this.options.itemTemplateId;
        this.collectedMunicipalities = new Set();
        this.collectedMonumentTypes = new Set();
    }

    async init(jsonSourceUrl) {
        this.emptyGallery();
        document.documentElement.classList.add('loading');
        console.info(`Load monuments from ${jsonSourceUrl}`);
        try {
            const response = await fetch(jsonSourceUrl);
            const data = await response.json();
            document.documentElement.classList.remove('loading');
            const features = this.options.geoJson ? data.features : data;

            this.collectedMunicipalities = new Set();
            this.collectedMonumentTypes = new Set();

            // Loop over each feature in the GeoJSON
            let itemIndex = 0;
            features.forEach(feature => {
                // Repair missing optional fields in the GeoJSON or JSON source
                feature = Object.assign({
                  'Adresse-Lage': null,
                  'Schutzumfang': [],
                  'Begründung': [],
                  'FotoURL' : null
                }, feature);

                // Add a new DOM element for each feature in index.html’s div.monuments
                const template = document.getElementById(this.itemTemplateId);  // <template id="monument-template">
                const clone = template.content.cloneNode(true);
                let figure = clone.querySelector(this.itemSelector);


                // Examinate the feature’s properties
                this.collectedMonumentTypes.add(feature.Kulturdenkmaltyp);
                let featureIsLegacy =
                    feature.Beschreibung === 'Alteintragung (Aktualisierung vorgesehen)'
                 || feature.Beschreibung === 'Aktualisierung vorgesehen';

                // Opionated: Remove "Stadt" from the municipality name
                let featureGemeinde = feature.Gemeinde.replace(", Stadt", "");
                this.collectedMunicipalities.add(featureGemeinde);


                // Populate the template with the feature’s properties
                figure.id = `objektnummer-${feature.Objektnummer}`;
                figure.dataset.monumentType = feature.Kulturdenkmaltyp;
                figure.dataset.monumentMunicipalityName = feature.Gemeinde;
                if (featureIsLegacy) {
                    figure.dataset.monumentIsLegacy = true;
                }

                clone.querySelector('.monument-title').textContent = feature.Bezeichnung;
                clone.querySelector('.monument-type').textContent = feature.Kulturdenkmaltyp;
                clone.querySelector('.monument-id').textContent = feature.Objektnummer;
                clone.querySelector('.monument-description').textContent = feature.Beschreibung;
                clone.querySelector('.monument-reasons').innerHTML = feature['Begründung'].join('<br>');
                clone.querySelector('.monument-protection').textContent = feature.Schutzumfang.join(', ');

                clone.querySelector('.monument-address').innerHTML = [
                    [ feature['Adresse-Lage'], featureGemeinde].filter(i => i !== null).join(', '),
                    feature.Kreis
                ].filter(i => i !== null).join('<br>');


                let featureImage = clone.querySelector('.monument-image');
                if (itemIndex < 6 ) {
                    featureImage.removeAttribute('loading');
                }
                featureImage.alt = feature.Bezeichnung;
                featureImage.title = feature.Bezeichnung + " in " + featureGemeinde;
                featureImage.src = feature.FotoURL || 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';

                if (feature.FotoURL) {
                    featureImage.alt = `Foto von ${feature.Kulturdenkmaltyp} »${feature.Bezeichnung}« in ${featureGemeinde}`;
                    featureImage.title = `${feature.Bezeichnung} in ${featureGemeinde}`;
                }
                else {
                    featureImage.removeAttribute('loading');
                }

                // Finas steps: Add the clone to the DOM, increment counter
                this.galleryContainer.appendChild(clone);
                itemIndex++;
            });
        } catch (error) {
            console.error('Error loading GeoJSON:', error);
        }




        // Loop over all collected municipalities and add each to #municipalities datalist element
        const filterValueInput = document.querySelector(this.options.filterInputSelector);
        const form = filterValueInput.closest('form');
        const municipalitiesDatalist = form.querySelector('datalist');

        municipalitiesDatalist.innerHTML = '';
        this.collectedMonumentTypes.forEach(monumentType => {
            const option = document.createElement('option');
            option.value = monumentType;
            municipalitiesDatalist.appendChild(option);
        });
        this.collectedMunicipalities.forEach(municipality => {
            const option = document.createElement('option');
            option.value = municipality;
            municipalitiesDatalist.appendChild(option);
        });


        filterValueInput.removeEventListener('input', (e) => this.applyFilter(e.target.value));
        filterValueInput.addEventListener('input', (e) => this.applyFilter(e.target.value));

        // Add reset handler to clear the filter for surrounding form
        form.addEventListener('reset', (e) => {
            e.preventDefault();
            filterValueInput.value = '';
            this.applyFilter('');
        });
    }

    emptyGallery() {
        this.galleryContainer.innerHTML = '';
    }

    applyFilter = (filterValue) => {
        // Skip if the filter value is not in the collected municipalities or monument types
        if (filterValue && !this.collectedMonumentTypes.has(filterValue) && !this.collectedMunicipalities.has(filterValue)) {
            return;
        }

        this.galleryContainer.querySelectorAll(this.itemSelector).forEach(item => {
            let filterOut = filterValue !== "" ? !item.dataset.monumentMunicipalityName.includes(filterValue) && !item.dataset.monumentType.includes(filterValue) : false;

            if (filterOut) {
                return item.classList.add('toBeRemoved');
            }

            item.hidden = false;
            item.classList.remove('toBeRemoved');
        });

        setTimeout(() => {
            this.galleryContainer.querySelectorAll(this.itemSelector + '.toBeRemoved').forEach(item => {
                item.hidden = true;
            });
        }, 350);
    }
}
