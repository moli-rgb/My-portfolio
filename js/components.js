// Header and Footer Component Manager
document.addEventListener('DOMContentLoaded', function() {
  // Header HTML template
  const headerHTML = `
    <nav class="navbar-custom fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-md border-b border-white/10">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="./index.html" class="flex items-center space-x-3 rtl:space-x-reverse">
          <span class="self-center text-2xl font-bold whitespace-nowrap gradient-text cyber-text glitch" data-text="Mostafa">Mostafa</span>
        </a>
        <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-400 rounded-lg md:hidden hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
          <span class="sr-only">Open main menu</span>
          <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
          </svg>
        </button>
        <div class="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-700 rounded-lg bg-gray-800 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-transparent">
            <li>
              <a href="./index.html" class="block py-2 px-3 text-white rounded hover:bg-gray-700 md:hover:bg-transparent md:border-0 md:hover:text-cyber md:p-0 transition duration-300 neon-glow">Home</a>
            </li>
            <li>
              <a href="./index (proj).html" class="block py-2 px-3 text-white rounded hover:bg-gray-700 md:hover:bg-transparent md:border-0 md:hover:text-cyber md:p-0 transition duration-300 neon-glow">Projects</a>
            </li>
            <li>
              <a href="./index (abt).html" class="block py-2 px-3 text-white rounded hover:bg-gray-700 md:hover:bg-transparent md:border-0 md:hover:text-cyber md:p-0 transition duration-300 neon-glow">About</a>
            </li>
            <li>
              <a href="./index (con).html" class="block py-2 px-3 text-white rounded hover:bg-gray-700 md:hover:bg-transparent md:border-0 md:hover:text-cyber md:p-0 transition duration-300 neon-glow">Contact</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `;

  // Footer HTML template
  const footerHTML = `
    <footer class="footer-custom mt-16">
      <div class="container mx-auto px-4">
        <div class="text-center mb-6">
          <p class="text-lg">© 2025 Mostafa. All rights reserved.</p>
        </div>
        <div class="flex justify-center space-x-6">
          <a href="https://www.instagram.com/_mo_s_ta_fa?igsh=amx1MXJveWdiaDMw" target="_blank" class="hover:text-secondary transition duration-300 pulse">
            <i class="fab fa-instagram text-3xl"></i>
          </a>
          <a href="https://www.facebook.com/share/1AfRUZkiwo/" target="_blank" class="hover:text-secondary transition duration-300 pulse">
            <i class="fab fa-facebook text-3xl"></i>
          </a>
        </div>
      </div>
    </footer>
  `;

  // Insert header
  const headerContainer = document.getElementById('header-container');
  if (headerContainer) {
    headerContainer.innerHTML = headerHTML;
  }

  // Insert footer
  const footerContainer = document.getElementById('footer-container');
  if (footerContainer) {
    footerContainer.innerHTML = footerHTML;
  }

  // Initialize Flowbite components if available
  if (typeof initFlowbite !== 'undefined') {
    initFlowbite();
  }
});