import { data } from "./data";
import { addMarker, zoomOn } from "./map";

// ***** variables *****
const dreamsContent = document.querySelector("#dreams-container");

// ***** functions *****

// create all dreams
function buildAllDreams() {
    // clear data if data not empty
    while (dreamsContent.hasChildNodes()) {
        dreamsContent.removeChild(dreamsContent.lastChild);
    }

    // create dreams
    data.forEach(buildOneDream);
    // events on click for all dreams (button 'visit')
    addDreamsListener();
}

// create one dream in the html
function buildOneDream(dream) {
    const dreamElement = document.createElement("div");
    dreamElement.innerHTML = `<div class="card my-5" style="width: 100%" id="${
        dream.id
    }">
                                <h5 class="card-title text-center my-3">
                                    ${dream.title}
                                </h5>
                                <img src="${
                                    dream.imagePath
                                }" class="card-img-top" alt="image ${
        dream.title
    }" />
                                <a href="https://www.booking.com/index.fr.html" id="actionBtn" target='_blank' class="btn btn-${
                                    dream.done
                                        ? 'secondary mx-5 my-2"> Je le refait !'
                                        : 'success mx-5 my-2"> Je me lance !'
                                }</a>
                                   
                                </a>
                                <div class="card-body d-md-flex justify-content-md-end">
                                    <a href="#" id="visitBtn" class="btn btn-outline-secondary btn-sm m-1">Visiter</a>
                                    <a href="${
                                        dream.info
                                    }" class="btn btn-outline-secondary btn-sm m-1" target='_blanck'>Plus d'info's</a>
                                </div>
                            </div>`;

    dreamsContent.appendChild(dreamElement);

    addMarker(dream);
}

// event for all dreams (button 'visit')
function addDreamsListener() {
    document.querySelectorAll("#visitBtn").forEach((item) => {
        item.addEventListener("click", (e) => {
            const dreamId = item.parentElement.parentElement.getAttribute("id");
            visitDream(dreamId);
        });
    });
}

function visitDream(dreamId) {
    const center = data.filter((item) => item.id == dreamId)[0].coords;
    zoomOn(center, 20, "satellite");
}

// ***** exports *****
export { buildAllDreams };
