document.addEventListener("DOMContentLoaded", () => {
    setFooterContent();
    setHeaderContent();
});

function setFooterContent() {
    const footer = document.getElementById("footer");
    footer.innerHTML = `
        <p>Website source code and details available on
            <a href="https://github.com/Owen-3456/owen3456.xyz" target="_blank">GitHub</a>
        </p>`;
}

function setHeaderContent() {
    const header = document.getElementById("header");
    header.innerHTML = `
        <nav>
            <a class="nav-title" href="/">Owen3456</a>
            <ul class="nav-links">
                <li><a href="/">Home</a></li>
                <li><a href="contact.html">Contact</a></li>
                <li><a href="projects.html">Projects</a></li>
            </ul>
            <ul class="nav-social">
                ${getSocialLink("https://github.com/Owen-3456", getGithubSVG())}
                ${getSocialLink("https://discord.com/users/374960413583998977", getDiscordSVG())}
                ${getSocialLink("https://steamcommunity.com/id/owen3456/", getSteamSVG())}
                ${getSocialLink("https://wakatime.com/@Owen3456", getWakatimeSVG())}
            </ul>
        </nav>`;
}

function getSocialLink(url, svg) {
    return `
        <li>
            <a href="${url}" target="_blank">
                ${svg}
            </a>
        </li>`;
}

function getGithubSVG() {
    return `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"></path>
        </svg>`;
}

function getDiscordSVG() {
    return `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.24 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08-.01-.11c.11-.08.22-.17.33-.25c.02-.02.05-.02.07-.01c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07.01c.11.09.22.17.33.26c.04.03.04.09-.01.11c-.52.31-1.07.56-1.64.78c-.04.01-.05.06-.04.09c.32.61.68 1.19 1.07 1.74c.03.01.06.02.09.01c1.72-.53 3.45-1.33 5.25-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95c-.01-.01-.02-.02-.04-.02M8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.84 2.12-1.89 2.12m6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.83 2.12-1.89 2.12"></path>
        </svg>`;
}

function getSteamSVG() {
    return `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M12 2a10 10 0 0 1 10 10a10 10 0 0 1-10 10c-4.6 0-8.45-3.08-9.64-7.27l3.83 1.58a2.84 2.84 0 0 0 2.78 2.27c1.56 0 2.83-1.27 2.83-2.83v-.13l3.4-2.43h.08c2.08 0 3.77-1.69 3.77-3.77s-1.69-3.77-3.77-3.77s-3.78 1.69-3.78 3.77v.05l-2.37 3.46l-.16-.01c-.59 0-1.14.18-1.59.49L2 11.2C2.43 6.05 6.73 2 12 2M8.28 17.17c.8.33 1.72-.04 2.05-.84s-.05-1.71-.83-2.04l-1.28-.53c.49-.18 1.04-.19 1.56.03c.53.21.94.62 1.15 1.15c.22.52.22 1.1 0 1.62c-.43 1.08-1.7 1.6-2.78 1.15c-.5-.21-.88-.59-1.09-1.04zm9.52-7.75c0 1.39-1.13 2.52-2.52 2.52a2.52 2.52 0 0 1-2.51-2.52a2.5 2.5 0 0 1 2.51-2.51a2.52 2.52 0 0 1 2.52 2.51m-4.4 0c0 1.04.84 1.89 1.89 1.89c1.04 0 1.88-.85 1.88-1.89s-.84-1.89-1.88-1.89c-1.05 0-1.89.85-1.89 1.89"></path>
        </svg>`;
}

function getWakatimeSVG() {
    return `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path fill="white" d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12s12-5.373 12-12S18.627 0 12 0m0 2.824a9.176 9.176 0 1 1 0 18.352a9.176 9.176 0 0 1 0-18.352m5.097 5.058c-.327 0-.61.19-.764.45c-1.025 1.463-2.21 3.162-3.288 4.706l-.387-.636a.9.9 0 0 0-.759-.439a.9.9 0 0 0-.788.492l-.357.581l-1.992-2.943a.9.9 0 0 0-.761-.446c-.514 0-.903.452-.903.96a1 1 0 0 0 .207.61l2.719 3.96c.152.272.44.47.776.47a.91.91 0 0 0 .787-.483c.046-.071.23-.368.314-.504l.324.52c-.035-.047.076.113.087.13c.024.031.054.059.078.085l.058.052c.036.033.08.056.115.08q.039.023.076.04q.045.02.088.035c.058.025.122.027.18.04c.031.004.064.003.092.005c.29 0 .546-.149.707-.36c1.4-2 2.842-4.055 4.099-5.849A1 1 0 0 0 18 8.842c0-.508-.389-.96-.903-.96"></path>
        </svg>`;
}