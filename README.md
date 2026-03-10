# SwiftCart

SwiftCart is a modern, responsive e-commerce front-end built with HTML, Tailwind CSS, and vanilla JavaScript. It focuses on clean UI, fast browsing, and a practical shopping-flow demo (catalog -> details -> cart) without requiring a backend.

## Features

- Responsive layout for mobile, tablet, and desktop
- Product catalog (trending section + full products page)
- Product details modal (quick view without leaving the page)
- Shopping cart UI (add-to-cart interactions + cart count)
- Modern UI using Tailwind CSS + DaisyUI components

## What This Project Is (and Isn't)

- Is: a front-end UI demo you can open in a browser and extend
- Isn't: a production store (no auth, payments, or real checkout)

## Tech Stack

- HTML5
- Tailwind CSS
- JavaScript (vanilla)
- DaisyUI (Tailwind component library)
- Font Awesome (icons)

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/Shawon-Mahmud07/SwiftCart.git
```

2. Open `index.html` in your browser.

Optional (recommended): run with a local static server (helps with relative paths and future API work).

- VS Code: install "Live Server" -> right click `index.html` -> "Open with Live Server"

## Project Structure

```text
SwiftCart/
|-- index.html          # Home page (hero, features, trending products)
|-- products.html       # Products catalog page
|-- tailwind.config.js  # Tailwind configuration (if you later build locally)
|-- styles/
|   `-- style.css       # Custom CSS overrides
|-- js/
|   |-- app.js          # Home page behaviors (trending + modal)
|   `-- products.js     # Product data and catalog logic
`-- Assets/
    `-- banner-image.png
```

## Pages

- Home (`index.html`): hero section, trust features, trending products, about, contact
- Products (`products.html`): full catalog browsing experience

## Common Customizations

- Theme/colors: update Tailwind utility classes in `index.html` and `products.html`
- Products: edit the data and rendering logic in `js/products.js`
- Layout: tweak `container`, `grid`, and `gap-*` classes for spacing and responsiveness

## Contributing

Contributions are welcome. Fork the repo and open a pull request with a clear description and screenshots when relevant.

## Demo

Live demo: <https://swiftcart-mart.netlify.app>
