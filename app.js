const allSections = document.querySelectorAll(".section");
const allContents = document.querySelectorAll(".content");
const allAnchorTags = document.querySelectorAll("a");

// Store all live intersecting element id
let intersectingIdList = [];

// Store sequence of all sections ids
let allSequenceIds = [];

// PUSH all section ids
allSections.forEach((sectionElement) => {
    allSequenceIds.push(sectionElement.id);
});

// Observe element that at least 10% visible
const observeElement = (element) => {
    const obsCallback = function (entries, observer) {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                intersectingIdList.push(entry.target.id);
            } else {
                intersectingIdList = intersectingIdList.filter((id) => {
                    if (id !== entry.target.id) return id;
                });
            }

            let isFirstElementKnown = true;
            let index = 0;
            while (isFirstElementKnown && index < allSequenceIds.length) {
                if (intersectingIdList.includes(allSequenceIds[index])) {
                    setActiveContent(allSequenceIds[index]);
                    isFirstElementKnown = false;
                }
                index++;
            }
        });
    };

    const obsOptions = {
        root: null,
        threshold: 0.1,
    };

    const observer = new IntersectionObserver(obsCallback, obsOptions);
    observer.observe(element);
};

// Start observing all section elements
allSections.forEach((section) => {
    observeElement(section);
});

function setActiveContent(id) {
    allContents.forEach((content) => {
        if (id === content.children[0].href.split("#")[1]) {
            content.classList.add("active");
        } else {
            content.classList.remove("active");
        }
    });
}

// Handle click of anchor tags
allAnchorTags.forEach((element) => {
    element.addEventListener("click", (e) => {
        e.preventDefault();
        const hash = element.href.split("#")[1];
        document
            .querySelector("#" + hash)
            .scrollIntoView({ behavior: "smooth" });
    });
});
