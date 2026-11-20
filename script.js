
const templates = [
    {
        name: "Surprised Cat",
        category: "Animals",
        image: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=800",
        top: "WHEN WIFI STOPS",
        bottom: "DURING ONLINE EXAM"
    },
    {
        name: "Student Life",
        category: "Student",
        image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800",
        top: "EXAMS TOMORROW",
        bottom: "STARTING STUDY TODAY"
    },
    {
        name: "Coding Problems",
        category: "Work",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800",
        top: "CODE WORKS PERFECTLY",
        bottom: "UNTIL YOU PRESENT IT"
    },
    {
        name: "Cute Dog",
        category: "Animals",
        image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=800",
        top: "ME WAITING",
        bottom: "FOR THE WEEKEND"
    },
    {
        name: "Coffee Mood",
        category: "Funny",
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800",
        top: "BEFORE COFFEE",
        bottom: "AFTER COFFEE"
    },
    {
        name: "Friends Forever",
        category: "Funny",
        image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800",
        top: "BEST FRIENDS",
        bottom: "SAME CRAZY ENERGY"
    },
    {
        name: "Office Life",
        category: "Work",
        image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800",
        top: "MONDAY MORNING",
        bottom: "WAITING FOR FRIDAY"
    },
    {
        name: "Pizza Lover",
        category: "Funny",
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800",
        top: "ONE SLICE ONLY",
        bottom: "FINISHED THE WHOLE PIZZA"
    },
    {
        name: "Books",
        category: "Student",
        image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800",
        top: "OPENING THE BOOK",
        bottom: "SUDDENLY FEELING SLEEPY"
    },
    {
        name: "Technology",
        category: "Work",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800",
        top: "FUTURE IS HERE",
        bottom: "BUT MY WIFI IS NOT"
    },
    {
        name: "Nature Mood",
        category: "Funny",
        image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800",
        top: "MY WEEKEND PLAN",
        bottom: "DO ABSOLUTELY NOTHING"
    },
    {
        name: "Study Time",
        category: "Student",
        image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800",
        top: "JUST ONE MORE CHAPTER",
        bottom: "SAYS ME EVERY NIGHT"
    }
];

const container =
    document.getElementById("templateContainer");

const canvas =
    document.getElementById("memeCanvas");

const ctx = canvas.getContext("2d");

let memeImage = new Image();

function showTemplates(list) {

    container.innerHTML = "";

    list.forEach(template => {

        const card = document.createElement("div");

        card.className = "template-card";

        card.innerHTML = `
            <img src="${template.image}"
                 alt="${template.name}">
            <h3>${template.name}</h3>
            <p>${template.category}</p>
        `;

        card.onclick = () => {

            document.getElementById("topText").value =
                template.top;

            document.getElementById("bottomText").value =
                template.bottom;

            loadImage(template.image);

            document.getElementById("editor")
                .scrollIntoView({ behavior: "smooth" });
        };

        container.appendChild(card);

    });
}

function filterTemplates(category) {

    if (category === "All") {
        showTemplates(templates);
    } else {
        const filtered = templates.filter(
            item => item.category === category
        );

        showTemplates(filtered);
    }
}

function loadImage(source) {

    memeImage = new Image();

    memeImage.crossOrigin = "anonymous";

    memeImage.onload = drawMeme;

    memeImage.onerror = () => {
        alert("Image could not load. Please try another template.");
    };

    memeImage.src = source;
}

function drawMeme() {

    if (!memeImage.complete || !memeImage.naturalWidth) {
        return;
    }

    const width = canvas.width;
    const height = canvas.height;

    const scale = Math.max(
        width / memeImage.width,
        height / memeImage.height
    );

    const imageWidth = memeImage.width * scale;
    const imageHeight = memeImage.height * scale;

    ctx.clearRect(0, 0, width, height);

    ctx.drawImage(
        memeImage,
        (width - imageWidth) / 2,
        (height - imageHeight) / 2,
        imageWidth,
        imageHeight
    );

    const topText =
        document.getElementById("topText").value.toUpperCase();

    const bottomText =
        document.getElementById("bottomText").value.toUpperCase();

    const color =
        document.getElementById("textColor").value;

    const size =
        document.getElementById("textSize").value;

    const font =
        document.getElementById("fontStyle").value;

    ctx.font = `bold ${size}px "${font}", Impact, sans-serif`;

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillStyle = color;
    ctx.strokeStyle = "black";
    ctx.lineWidth = 7;
    ctx.lineJoin = "round";

    ctx.strokeText(topText, width / 2, 75, width - 60);
    ctx.fillText(topText, width / 2, 75, width - 60);

    ctx.strokeText(bottomText, width / 2, height - 75, width - 60);
    ctx.fillText(bottomText, width / 2, height - 75, width - 60);
}

function downloadMeme() {

    try {
        const link = document.createElement("a");

        link.download = "My-Meme.png";

        link.href = canvas.toDataURL("image/png");

        link.click();

    } catch (error) {

        alert("Download failed. Try uploading your own image or selecting another template.");

    }
}

function goToTemplates() {

    document.getElementById("templates")
        .scrollIntoView({ behavior: "smooth" });

}

// Upload custom image

document.getElementById("uploadImage")
.addEventListener("change", function(event) {

    const file = event.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
        alert("Please select an image.");
        return;
    }

    const reader = new FileReader();

    reader.onload = function(e) {
        loadImage(e.target.result);
    };

    reader.readAsDataURL(file);

});

// Update meme whenever settings change

[
    "topText",
    "bottomText",
    "textColor",
    "textSize",
    "fontStyle"
].forEach(id => {

    document.getElementById(id)
        .addEventListener("input", drawMeme);

});

// Initial display

showTemplates(templates);

loadImage(templates[0].image);
