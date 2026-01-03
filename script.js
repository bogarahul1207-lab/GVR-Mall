// script.js
// Simple Mall functionality

const products = [
    { id: 1, name: "Classic T-Shirt", price: 8.99, discount: 0, rating: 4.2, img: "https://m.media-amazon.com/images/I/71SomKZ4f9L._AC_UY1100_.jpg", desc: "Comfortable cotton shirt." },
    { id: 2, name: "FoodStall", price: 4.99, discount: 15, rating: 4.6, img: "https://media-cdn.tripadvisor.com/media/photo-s/19/2d/b5/67/two-food-courts-are-in.jpg", desc: "FoodStall." },
    { id: 3, name: "Tattoo", price: 6.5, discount: 0, rating: 4.0, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmdVl_7TQQ21DK3hv8BwuiM4XIUjIsIj68Ew&s", desc: "Tattoo." },
    { id: 4, name: "Shoes", price: 5.0, discount: 10, rating: 4.4, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdBK0yOXEUEoqDtshaYl0p396mSxE6wNbGCg&s", desc: "Shoes" },
    { id: 5, name: "GamesZone", price: 4.99, discount: 20, rating: 4.1, img: "https://m.media-amazon.com/images/I/818jD1dGc0L._AC_UF1000,1000_QL80_.jpg", desc: "GamesZone" },
    { id: 6, name: "Electronics", price: 16.0, discount: 5, rating: 4.3, img: "https://media.istockphoto.com/id/515443264/photo/home-appliance-in-the-store.jpg?s=612x612&w=0&k=20&c=Zi69da3N5D31WXba7U9H2Rw4jWt_5IngnZAeZ3Kzix8=", desc: "Electronics" },
    { id: 7, name: "Clothes", price: 6.99, discount: 25, rating: 4.5, img: "https://usimg.sulekha.io/cdn/others/promotions/pamob4_2025-09-18-06-51-05-569.jpg", desc: "Clothes" },
    { id: 8, name: "Coffee Mug", price: 8.0, discount: 0, rating: 3.9, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTejBDwyxWYaR8Yw-HGtd1tkdVvx22puGPH5A&s", desc: "Ceramic mug, 350ml." }
];

function $(id) { return document.getElementById(id); }

function showPage(id) {
    ["page-home","page-mall","page-product"].forEach(p => {
        const el = $(p);
        if (!el) return;
        if (p === id) el.classList.remove("hidden");
        else el.classList.add("hidden");
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function formatPrice(n) {
    return `$${n.toFixed(2)}`;
}

function renderProducts() {
    const grid = $("product-grid");
    grid.innerHTML = "";
    products.forEach((p, idx) => {
        const card = document.createElement("div");
        card.className = "card";
        card.dataset.index = idx;
        card.innerHTML = `
            <img src="${p.img}" alt="${escapeHtml(p.name)}" onerror="this.style.objectFit='contain';this.style.background='#fff'">
            <div class="card-body">
                <div class="card-title">${escapeHtml(p.name)}</div>
                <div class="card-price">
                    <span class="price">${formatPrice(finalPrice(p))}</span>
                    ${p.discount ? `<span class="discount">-${p.discount}%</span>` : ""}
                </div>
                <div class="card-rating">${renderStars(p.rating)} <span class="muted">(${p.rating.toFixed(1)})</span></div>
            </div>
        `;
        card.addEventListener("click", () => openProduct(idx));
        grid.appendChild(card);
    });
}

function finalPrice(p) {
    if (!p.discount) return p.price;
    return p.price * (1 - p.discount / 100);
}

function renderStars(r) {
    const full = Math.floor(r);
    const half = r - full >= 0.5;
    let s = "★".repeat(full) + (half ? "½" : "") + "☆".repeat(Math.max(0, 5 - full - (half ? 1 : 0)));
    return `<span class="stars">${s}</span>`;
}

function openProduct(index) {
    const p = products[index];
    if (!p) return;
    $("prod-title").textContent = p.name;
    $("prod-img").src = p.img;
    $("prod-name").textContent = p.name;
    $("prod-price").textContent = formatPrice(finalPrice(p));
    $("prod-discount").textContent = p.discount ? ` (${p.discount}% off)` : "";
    $("prod-rating").innerHTML = `${renderStars(p.rating)} <span class="muted">(${p.rating.toFixed(1)})</span>`;
    $("prod-desc").textContent = p.desc;
    $("buy-now").onclick = () => { alert(`Purchased: ${p.name} for ${formatPrice(finalPrice(p))}`); };
    showPage("page-product");
}

/* small helper to avoid inserting raw HTML from names */
function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

document.addEventListener("DOMContentLoaded", () => {
    // nav
    $("nav-home").addEventListener("click", () => showPage("page-home"));
    $("nav-mall").addEventListener("click", () => { renderProducts(); showPage("page-mall"); });
    $("open-mall").addEventListener("click", () => { renderProducts(); showPage("page-mall"); });

    // back buttons
    $("back-home")?.addEventListener("click", () => showPage("page-home"));
    $("back-home-2")?.addEventListener("click", () => showPage("page-home"));
    $("back-mall")?.addEventListener("click", () => { renderProducts(); showPage("page-mall"); });

    // initial
    showPage("page-home");
});