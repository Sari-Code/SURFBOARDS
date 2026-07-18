
let surfboards = JSON.parse(localStorage.getItem('surfboards')) || [//מערך של מוצרים (שם, מזהה, מחיר, תמונה):
    { id: 1, name: "גלשן גלים קלאסי", description: "מושלם למתחילים ומתקדמים.", price: 1200, category: "classic", image: "../images/גלשן 1.png" },
    { id: 2, name: "גלשן מקצועי", description: "לביצועים גבוהים.", price: 2500, category: "pro", image: "../images/image (21).png" },
    { id: 3, name: "סאפ מתנפח", description: "קל לנשיאה ולאחסון.", price: 950, category: "sup", image: "../images/image (23).png" },
    { id: 4, name: "גלשן ילדים", description: "כיף וקל ללימוד.", price: 700, category: "kids", image: "../images/גלשן ילדים (2).png" },
    { id: 5, name: "לונגבורד רטרו", description: "גלישה חלקה ונוחה.", price: 1800, category: "classic", image: "../images/image (25).png" },
    { id: 6, name: "גלשן פאן-בורד", description: "ורסטילי וכיפי.", price: 1350, category: "pro", image: "../images/image (26).png" },
    { id: 7, name: "גלשן סאפ קשיח", description: "יציבות מירבית.", price: 2100, category: "sup", image: "../images/image (24).png" },
    { id: 8, name: "גלשן ווינדסרף", description: "למהירויות גבוהות.", price: 3000, category: "electric", image: "../images/image (28).png" },
    { id: 9, name: "גלשן סקי מים", description: "מתאים לגרירה בסירה.", price: 800, category: "misc", image: "../images/image (29).png" },
    { id: 10, name: "גלשן קייטסרף", description: "לגלישה עם עפיפון.", price: 2800, category: "misc", image: "../images/image (30).png" },
    { id: 11, name: "גלשן ביץ' ברד", description: "קל וקומפקטי.", price: 1000, category: "misc", image: "../images/image (31).png" },
    { id: 12, name: "גלשן רך למתחילים וילדים", description: "בטיחותי ונוח ללימוד.", price: 600, category: "kids", image: "../images/image (32).png" },
    { id: 13, name: "גלשן היברידי", description: "משלב יציבות וביצועים.", price: 1500, category: "pro", image: "../images/image (33).png" },
    { id: 14, name: "גלשן קטמרן", description: "חווית גלישה ייחודית.", price: 3500, category: "electric", image: "../images/גלשן 55.png" },
    { id: 15, name: "גלשן חשמלי", description: "לגלישה גם בלי גלים.", price: 5000, category: "electric", image: "../images/גלשן חשמלי.png" },
    { id: 16, name: "גלשן סופט-טופ לילדים", description: "נוח ובטוח לילדים.", price: 650, category: "kids", image: "../images/image (20).png" },
    { id: 17, name: "גלשן וינטג'", description: "עיצוב קלאסי עם איכות גבוהה.", price: 1900, category: "classic", image: "../images/image (36).png" },
    { id: 18, name: "גלשן ג'ט-סקי", description: "חוויה עוצמתית ומהירה.", price: 7000, category: "electric", image: "../images/צילום מסך 2025-06-12 162123.png" }
];

const imageGallery = document.querySelector(".image-gallery");
const selectCategory = document.querySelector("#categorySelect");

function createSurfboardCard(surfboard) {//הצגה דינאמית של המוצרים בדף (DOM):
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("image-item", surfboard.category || "unknown-category");

    itemDiv.innerHTML = `
        <img src="${surfboard.image}" alt="${surfboard.name}" loading="lazy"/>
        <div class="image-info">
            <h3>${surfboard.name}</h3>
            <p>${surfboard.description}</p>
            <span class="price">₪${surfboard.price.toLocaleString('he-IL')}</span>
            <button class="add-to-cart icon-only"
                    data-id="${surfboard.id}"
                    data-name="${surfboard.name}"
                    data-price="${surfboard.price}"
                    data-image="${surfboard.image}"
                    aria-label="הוסף את ${surfboard.name} לעגלה">
                <i class="fas fa-shopping-cart"></i>
            </button>
        </div>
    `;
    return itemDiv;
}
function loadSurfboards(category = "all") {//סינון לפי קטגוריה ע"י תיבת גלילה:
    imageGallery.innerHTML = "";

    const surfboardsToShow = category === "all"
        ? surfboards
        : surfboards.filter(board => board.category === category);

    if (surfboardsToShow.length === 0) {
        imageGallery.innerHTML = "<p>לא נמצאו גלשנים בקטגוריה זו.</p>";
        return;
    }

    surfboardsToShow.forEach(surfboard => {
        const card = createSurfboardCard(surfboard);
        imageGallery.appendChild(card);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    loadSurfboards();

    selectCategory.addEventListener("change", (event) => {
        loadSurfboards(event.target.value);
    });
});