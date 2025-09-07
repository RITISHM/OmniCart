document.addEventListener("DOMContentLoaded", async function () {
  const urlParams = new URLSearchParams(window.location.search);
  const collection = urlParams.get("collection"); // "shirts" or "polo"
  const id = parseInt(urlParams.get("id"), 10); // product index

  try {
    // ✅ Correct file path
    const res = await fetch("./assets/json/products.json");
    const data = await res.json();

    if (
      !data.products[collection] ||
      isNaN(id) ||
      !data.products[collection][id]
    ) {
      document.querySelector(
        ".product-section"
      ).innerHTML = `<p>⚠️ Product not found. Please go back to collections.</p>`;
      return;
    }

    const product = data.products[collection][id];

    // ✅ Breadcrumb
    const breadcrumb = document.querySelector(".breadcrumb");

    breadcrumb.innerHTML = `
        <a href="index.html">Home</a> /
        <a href="index.html#collections">Collections</a> /
        <a href="product-grid.html?collection=${collection}">${
      collection.charAt(0).toUpperCase() + collection.slice(1) + " Collection"
    }</a> /
        ${product.name}
      `;

    // ✅ Title & Price
    document.querySelector(".product-title").textContent = product.name;
    document.querySelector(".product-price").textContent = `₹${product.price}`;

    // ✅ Description (full, not small_description)
    document.querySelector(".product-description").textContent =
      product.description || "No description available.";

    // ✅ Rating
    document.querySelector(
      ".rating-text"
    ).textContent = `${product.rating} (${product.reviews} reviews)`;
    document.querySelector(".stars").textContent =
      "★".repeat(Math.floor(product.rating)) +
      "⯪".repeat(product.rating % 1 >= 0.5 ? 1 : 0) +
      "☆".repeat(
        5 - Math.floor(product.rating) - (product.rating % 1 >= 0.5 ? 1 : 0)
      );

    // ✅ Tags
    const tagsContainer = document.querySelector(".product-tags");
    tagsContainer.innerHTML = "";
    if (product.tags) {
      product.tags.forEach((tag) => {
        const span = document.createElement("span");
        span.classList.add("tag");
        span.textContent = tag;
        tagsContainer.appendChild(span);
      });
    }

    // ✅ Features
    const featuresList = document.querySelector(".features-list");
    if (featuresList) {
      featuresList.innerHTML = "";
      if (product.material) {
        featuresList.innerHTML += `<li><strong>Material:</strong> ${product.material}</li>`;
      }
      if (product.fit) {
        featuresList.innerHTML += `<li><strong>Fit:</strong> ${product.fit}</li>`;
      }
      if (product.care) {
        featuresList.innerHTML += `<li><strong>Care:</strong> ${product.care}</li>`;
      }
      if (product.key_feature) {
        featuresList.innerHTML += `<li><strong>Key Feature:</strong> ${product.key_feature}</li>`;
      }
      featuresList.innerHTML += `<li><strong>Origin:</strong> Ethically Sourced</li>`;
    }

    // ✅ Images (image_main, image-2, image-3, image-4)
    const mainImage = document.getElementById("mainImage");
    const thumbnails = document.querySelectorAll(".thumbnail");
    const imgKeys = ["image_main", "image-2", "image-3", "image-4"];
    const imgUrls = imgKeys.map((key) => product[key]).filter(Boolean);

    if (imgUrls.length > 0) {
      // main image
      mainImage.src = imgUrls[0];
      mainImage.alt = product.name;

      // thumbnails
      thumbnails.forEach((thumb, index) => {
        if (imgUrls[index]) {
          thumb.src = imgUrls[index];
          thumb.alt = `${product.name} thumbnail ${index + 1}`;
          thumb.style.display = "block";
          thumb.addEventListener("click", () => {
            mainImage.innerHTML = `<img class="main-image" src="${imgUrls[index]}" alt="${product.name}"style="width:auto; height:100%; object-fit:cover;" />`;
            thumbnails.forEach((t) => t.classList.remove("active"));
            thumb.classList.add("active");
          });
        } else {
          thumb.style.display = "none"; // hide extra thumbnail slots
        }
      });
    }

    // ✅ Related Products (3 random from same collection)
    const relatedContainer = document.querySelector(".related-grid");
    if (relatedContainer) {
      relatedContainer.innerHTML = "";

      let related = data.products[collection].filter((_, idx) => idx !== id);
      related = related.sort(() => 0.5 - Math.random()).slice(0, 3);

      related.forEach((relProd) => {
        const item = document.createElement("div");
        item.classList.add("related-item");
        item.innerHTML = ` 
      
            <img class="related-image" src="${
              relProd["image_main"] || "placeholder.jpg"
            }" alt="${
          relProd.name
        }" style="width:100%; height:auto; object-fit:cover;" />
          
          <div class="related-info">
            <h3 class="related-title">${relProd.name}</h3>
            <div class="related-price">₹${relProd.price}</div>
            <button class="related-item-btn" onclick="window.location.href='products.html?collection=${collection}&id=${
          relProd.id - 1
        }';">
          View
        </button>
          </div>
        `;
        relatedContainer.appendChild(item);
      });
    }
  } catch (err) {
    console.error("Error loading product:", err);
    document.querySelector(
      ".product-section"
    ).innerHTML = `<p>⚠️ Error loading product details. Please try again later.</p>`;
  }
});

// ✅ Quantity handling
function updateQuantity(change) {
  const quantityEl = document.getElementById("quantity");
  let current = parseInt(quantityEl.textContent, 10);
  current = Math.max(1, current + change);
  quantityEl.textContent = current;
}

// ✅ Cart + Wishlist
function addToCart() {
  const productTitle = document.querySelector(".product-title").textContent;
  const qty = document.getElementById("quantity").textContent;
  alert(`${productTitle} (x${qty}) added to cart!`);
}

function addToWishlist() {
  const productTitle = document.querySelector(".product-title").textContent;
  alert(`${productTitle} added to wishlist!`);
}
function onActiveThumbnailChange(newActiveElement, previousActiveElement) {
  console.log("Active changed to:", newActiveElement.src);
  // You can update main image, trigger animations, etc.
}

const observer = new MutationObserver((mutationsList) => {
  for (const mutation of mutationsList) {
    if (
      mutation.type === "attributes" &&
      mutation.attributeName === "class" &&
      mutation.target.classList.contains("thumbnail")
    ) {
      if (mutation.target.classList.contains("active")) {
        onActiveThumbnailChange(mutation.target);
      }
    }
  }
});

document.querySelectorAll(".thumbnail").forEach((thumb) => {
  observer.observe(thumb, { attributes: true });
});

function onActiveThumbnailChange(newActiveElement) {
  const mainImage = document.getElementById("mainImage");
  mainImage.src = newActiveElement.src;
  // Add your logic here — update preview, trigger animation, etc.
}
