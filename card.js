class DidiImageCard extends HTMLElement {

    config;
    content;

    setConfig(config) {
        if (!config.entity) {
            throw new Error('Please define an entity!');
        }
        this.config = config;
    }

    getHeader() {
        return this.config.header;
    }

    getUrl() {
        return this.config.url;
    }

    set hass(hass) {
        const header = this.getHeader();
        const url = this.getUrl();
        const now = Date.now();

        // done once
        if (!this.content) {
            // user makes sense here as every login gets it's own instance
            this.innerHTML = `
                <ha-card header="${header}">
                    <div class="card-content"></div>
                </ha-card>
            `;
            this.content = this.querySelector('div');
        }
        // done repeatedly
        this.content.innerHTML = `
            <img src="${url}?${now}" style="width: 100%" />
        `;
    }

    static getStubConfig() {
        return { entity: "sun.sun" }
    }

}

customElements.define('didi-image-card', DidiImageCard);

window.customCards = window.customCards || [];
window.customCards.push({
    type: "didi-image-card",
    name: "Image Card",
    description: "Display Image from Web and reload" // optional
});