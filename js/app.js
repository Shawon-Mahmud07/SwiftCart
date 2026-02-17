/**
 * Fetches trending products from FakeStoreAPI and renders them in the UI
 */
async function fetchTrendingProducts() {
  try {
    // Fetch data from API (Limited to 3 items)
    const response = await fetch("https://fakestoreapi.com/products?limit=3");
    const products = await response.json();

    // Select container and clear existing content
    const container = document.getElementById("trending-products");
    container.innerHTML = "";

    // Loop through products to create cards
    products.forEach((product) => {
      const cardElement = document.createElement("div");

      // Set card layout styles
      cardElement.className =
        "bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm flex flex-col h-full";

      // Inject HTML with dynamic product data
      cardElement.innerHTML = `
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
                            Details
                        </button>
                        <button class="flex-1 bg-[#4F46E5] hover:bg-[#4338CA] text-white py-2 rounded-lg flex items-center justify-center gap-2 text-sm font-bold transition-all shadow-md">
                            Add
                        </button>
                    </div>
                </div>
            `;

      container.appendChild(cardElement);
    });
  } catch (error) {
    // Basic error handling for failed API calls
    console.error("API Fetch Error:", error);
  }
}

// Initial call to load products on page load
fetchTrendingProducts();
