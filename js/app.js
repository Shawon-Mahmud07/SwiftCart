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
    <button onclick="showProductDetails(${product.id})" class="flex-1 border border-gray-300 py-2 rounded-lg flex items-center justify-center gap-2 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors">
        <i class="fa-regular fa-eye"></i>
        Details
    </button>
    
    <button class="flex-1 bg-[#4F46E5] hover:bg-[#4338CA] text-white py-2 rounded-lg flex items-center justify-center gap-2 text-sm font-bold transition-all shadow-md active:scale-95">
        <i class="fa-solid fa-cart-shopping text-xs"></i>
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

/**
 * Fetches single product data and displays it in a stylized modal
 */
async function showProductDetails(id) {
  const modal = document.getElementById("product-modal");
  const modalBox = document.getElementById("modal-box");
  const modalContent = document.getElementById("modal-content");

  // Open modal and apply scale-in animation
  modal.classList.remove("hidden");
  setTimeout(() => modalBox.classList.remove("scale-95"), 10);

  // Loading state
  modalContent.innerHTML = `<div class="p-20 text-center"><span class="loading loading-spinner loading-lg text-indigo-600"></span></div>`;

  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    const product = await res.json();

    // Inject dynamic product details into modal body
    modalContent.innerHTML = `
            <div class="flex flex-col md:flex-row gap-8 p-8 text-left">
                <div class="md:w-1/2 bg-gray-100 rounded-2xl p-6 flex items-center justify-center">
                    <img src="${product.image}" class="max-h-72 object-contain">
                </div>
                <div class="md:w-1/2 flex flex-col">
                    <span class="text-indigo-600 font-bold text-xs uppercase tracking-widest mb-2">${product.category}</span>
                    <h2 class="text-2xl font-bold text-gray-800 mb-4">${product.title}</h2>
                    <div class="flex items-center gap-2 mb-4">
                        <div class="flex text-yellow-400"><i class="fa-solid fa-star"></i></div>
                        <span class="font-bold text-gray-700">${product.rating.rate}</span>
                        <span class="text-gray-400 text-sm">(${product.rating.count} reviews)</span>
                    </div>
                    <p class="text-gray-600 text-sm leading-relaxed mb-6">${product.description}</p>
                    <div class="mt-auto">
                        <p class="text-3xl font-black text-gray-900 mb-6">$${product.price}</p>
                        <div class="flex gap-4">
                            <button class="flex-1 bg-[#4F46E5] text-white py-4 rounded-xl font-bold hover:bg-[#4338CA] transition-all shadow-lg active:scale-95">
                                Buy Now
                            </button>
                            <button class="px-6 py-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                                <i class="fa-solid fa-cart-plus text-gray-700 text-lg"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
  } catch (error) {
    modalContent.innerHTML = `<p class="p-10 text-center text-red-500">Something went wrong!</p>`;
  }
}

/**
 * Hides the product details modal
 */
function closeModal() {
  const modal = document.getElementById("product-modal");
  modal.classList.add("hidden");
}
