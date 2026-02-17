const categoryContainer = document.getElementById("category-container");
const productsGrid = document.getElementById("all-products-grid");

/**
 * Fetches categories from API and creates filter buttons
 */
async function loadCategories() {
  try {
    const res = await fetch("https://fakestoreapi.com/products/categories");
    const categories = await res.json();

    categories.forEach((category) => {
      const btn = document.createElement("button");

      btn.className =
        "px-6 py-2 rounded-full border border-gray-200 bg-white text-gray-700 text-sm font-medium shadow-sm hover:bg-gray-50 transition-all capitalize";
      btn.innerText = category;

      // Handle category filtering on click
      btn.onclick = () => filterByCategory(category, btn);
      categoryContainer.appendChild(btn);
    });
  } catch (error) {
    console.error("Error loading categories:", error);
  }
}

/**
 * Handles button active states and updates the API URL based on selection
 */
async function filterByCategory(category, btn) {
  // Reset all buttons to default styling
  const allBtns = categoryContainer.querySelectorAll("button");
  allBtns.forEach((b) => {
    b.className =
      "px-6 py-2 rounded-full border border-gray-200 bg-white text-gray-700 text-sm font-medium shadow-sm hover:bg-gray-50 transition-all capitalize";
  });

  // Apply active styling to the clicked button
  btn.className =
    "px-6 py-2 rounded-full bg-indigo-600 text-white text-sm font-medium shadow-sm transition-all capitalize";

  // Build API URL: Fetch all or filter by specific category
  const url =
    category === "all"
      ? "https://fakestoreapi.com/products"
      : `https://fakestoreapi.com/products/category/${category}`;

  fetchAndDisplayProducts(url);
}

/**
 * Fetches product data and renders cards into the grid
 */
async function fetchAndDisplayProducts(url) {
  // Show loading spinner before fetching
  productsGrid.innerHTML =
    '<div class="h-screen col-span-full text-center py-10"><span class="loading loading-bars loading-lg"></span></div>';

  try {
    const res = await fetch(url);
    const products = await res.json();

    productsGrid.innerHTML = ""; // Clear loader

    products.forEach((product) => {
      const card = document.createElement("div");
      card.className =
        "bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm flex flex-col h-full text-left";

      // Dynamic template for product cards
      card.innerHTML = `
            <div class="bg-[#F3F4F6] p-8 relative flex items-center justify-center h-64">
                    <img src="${product.image}" alt="${product.title}" class="h-full object-contain">
                </div>
                <div class="p-5 flex flex-col flex-grow">
                    <div class="flex justify-between items-center mb-3">
                        <span class="bg-[#E0E7FF] text-[#4F46E5] text-[10px] font-bold px-2 py-1 rounded-full capitalize tracking-wide">
                            ${product.category}
                        </span>
                        <div class="flex items-center gap-1">
                            <span class="text-yellow-400 text-sm">★</span>
                            <span class="text-sm text-gray-700">${product.rating.rate}</span>
                            <span class="text-xs text-gray-400">(${product.rating.count})</span>
                        </div>
                    </div>
                    <h3 class="text-gray-800 font-semibold text-base mb-2 line-clamp-1">${product.title}</h3>
                    <p class="text-gray-900 font-extrabold text-xl mb-5">$${product.price}</p>
                    <div class="flex gap-3 mt-auto">
                        <button class="flex-1 border border-gray-300 py-2 rounded-lg flex items-center justify-center gap-2 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors">
                            <i class="fa-regular fa-eye"></i> Details
                        </button>
                        <button class="flex-1 bg-[#4F46E5] hover:bg-[#4338CA] text-white py-2 rounded-lg flex items-center justify-center gap-2 text-sm font-bold transition-all shadow-md active:scale-95">
                            <i class="fa-solid fa-cart-shopping text-xs"></i> Add
                        </button>
                    </div>
                </div>
        `;
      productsGrid.appendChild(card);
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    productsGrid.innerHTML =
      '<p class="col-span-full text-red-500">Failed to load products.</p>';
  }
}

// Initialization
loadCategories();
fetchAndDisplayProducts("https://fakestoreapi.com/products");
