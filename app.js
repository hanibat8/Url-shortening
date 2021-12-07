const API_URL = `https://api.shrtco.de/v2/shorten?url=`;
const input = document.querySelector('.form__input');
const form = document.querySelector('.form');
const shortenBtn = document.querySelector('.shorten__btn');
const sectionStatisticLinks = document.querySelector('.section__statistic__links');
const sectionStatisticLinkShort = document.querySelector('.section__statistic__links__link__short');
let shortLinks = [];

form.addEventListener('submit', getLink);
shortenBtn.addEventListener('click', copyUrl);

async function getLink(e) {
    try {
        e.preventDefault();
        let url = input.value;
        console.log(url);
        const res = await fetch(`${API_URL}${url}`);
        const data = await res.json();
        let links = [data.result.original_link, data.result.full_short_link];
        // console.log(data.result);
        shortLinks.push(links);
        console.log(shortLinks);
        //console.log(data);

        let html = generateHTML(links);
        sectionStatisticLinks.insertAdjacentHTML('afterbegin', html);

    } catch (err) {
        console.error(err);
    }
}

async function copyUrl() {
    try {
        await navigator.clipboard.writeText(sectionStatisticLinkShort.innerText);
    } catch (err) {
        console.error(err);
    }
}


function generateHTML(links) {
    return `<div class="section__statistic__links__link">
    <p class="section__statistic__links__link__original">${links[0]}</p>
    <p class="section__statistic__links__link__short">${links[1]}</p>
    <button class="btn form__btn shorten__btn" type="submit">Copy</button>
  </div>`;
}