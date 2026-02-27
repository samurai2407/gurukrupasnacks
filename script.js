// ============================================
// GURUKRUPA SNACKS - JAVASCRIPT
// ============================================

// ============================================
// 1. CONFIGURATION & DATA
// ============================================

const CONFIG = {
  scrollDuration: 800,
  filterTransitionDuration: 400,
  hoverTransitionDuration: 300
};

// Menu Data
const menuData = [
  // The Legends Category
  {
    id: 1,
    name: "Vada Pav",
    price: 20,
    description: "The OG Mumbai burger that puts Big Macs to shame! Spicy potato fritter sandwiched in soft pav with chutneys.",
    funnyFact: "💡 Sold every 2 seconds in Mumbai!",
    category: "legends",
    imageSrc: "https://placehold.co/600x400/FDB913/333333?text=Vada+Pav"
  },
  {
    id: 2,
    name: "Misal Pav",
    price: 40,
    description: "Spicy sprout curry that'll wake up your taste buds and your neighbors! Topped with farsan and served with pav.",
    funnyFact: "🌶️ The spicier, the better - it's a Maharashtrian rule!",
    category: "legends",
    imageSrc: "https://placehold.co/600x400/E53935/FAFAFA?text=Misal+Pav"
  },
  
  // The Golden Triangles Category
  {
    id: 3,
    name: "Samosa",
    price: 15,
    description: "Crispy pyramids of potato perfection! Golden-fried pastry filled with spiced potatoes and peas.",
    funnyFact: "🌍 Originated in the Middle East, perfected in India!",
    category: "triangles",
    imageSrc: "https://placehold.co/600x400/FDB913/333333?text=Samosa"
  },
  {
    id: 4,
    name: "Kachori",
    price: 18,
    description: "Flaky, spicy, and dangerously addictive! Round puffed pastry with spiced lentil filling.",
    funnyFact: "😎 The round cousin of samosa with more attitude!",
    category: "triangles",
    imageSrc: "https://placehold.co/600x400/7CB342/FAFAFA?text=Kachori"
  },
  
  // The Crisp Cartel Category
  {
    id: 5,
    name: "Onion Bhajiya",
    price: 25,
    description: "Crispy onion fritters that crunch louder than your thoughts! Perfect with chai on a rainy day.",
    funnyFact: "☔ Best enjoyed during Mumbai's monsoon season!",
    category: "crisp",
    imageSrc: "https://placehold.co/600x400/FDB913/333333?text=Onion+Bhajiya"
  },
  {
    id: 6,
    name: "Mixed Pakoda",
    price: 30,
    description: "A crispy medley of vegetables in chickpea batter! Every bite is a surprise party in your mouth.",
    funnyFact: "🤫 Every household has their own secret pakoda recipe!",
    category: "crisp",
    imageSrc: "https://placehold.co/600x400/7CB342/FAFAFA?text=Mixed+Pakoda"
  },
  {
    id: 7,
    name: "Bread Pakoda",
    price: 22,
    description: "Bread slices stuffed with spicy potato filling, dipped in gram flour batter and deep-fried to golden perfection!",
    funnyFact: "🍞 The ultimate comfort food that makes bread exciting again!",
    category: "crisp",
    imageSrc: "https://placehold.co/600x400/E53935/FAFAFA?text=Bread+Pakoda"
  },
  {
    id: 8,
    name: "Pav Bhaji",
    price: 50,
    description: "Buttery mashed vegetables served with soft pav bread. A Mumbai street food icon that's basically a hug in a plate!",
    funnyFact: "🧈 The more butter, the better - that's the golden rule!",
    category: "legends",
    imageSrc: "https://placehold.co/600x400/FDB913/333333?text=Pav+Bhaji"
  }
];

// Fun Facts Data
const funFacts = [
  "Vada Pav was invented in 1966 by Ashok Vaidya near Dadar station!",
  "Mumbai sells over 2 million Vada Pavs every single day!",
  "Samosas were originally called 'Sambosa' in the Middle East!",
  "The perfect Bhajiya requires exactly 7 minutes of frying!",
  "Misal Pav spice levels range from 'tourist-friendly' to 'fire-breathing dragon'!",
  "Street food vendors in Mumbai serve over 20 million people daily!",
  "Pav Bhaji was invented as a quick lunch for textile mill workers!",
  "The word 'Pakoda' comes from the Sanskrit word 'pakvavata'!"
];

// ============================================
// 2. UTILITY FUNCTIONS
// ============================================

const Utils = {
  // Smooth scroll to element
  smoothScrollTo(elementId, duration = 800) {
    const targetElement = document.getElementById(elementId);
    
    if (!targetElement) {
      console.warn(`Target element ${elementId} not found`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    targetElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  },
  
  // Debounce function for performance
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },
  
  // Check if mobile viewport
  isMobile() {
    return window.innerWidth < 768;
  },
  
  // Check if tablet viewport
  isTablet() {
    return window.innerWidth >= 768 && window.innerWidth < 1024;
  },
  
  // Check if desktop viewport
  isDesktop() {
    return window.innerWidth >= 1024;
  }
};

// ============================================
// 3. NAVIGATION MODULE
// ============================================

const Navigation = {
  mobileMenuOpen: false,
  
  init() {
    this.bindEvents();
  },
  
  bindEvents() {
    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    if (mobileMenuToggle) {
      mobileMenuToggle.addEventListener('click', () => this.toggleMobileMenu());
    }
    
    // Navigation link clicks
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => this.handleNavClick(e));
    });
    
    // Close mobile menu on window resize to desktop
    window.addEventListener('resize', Utils.debounce(() => {
      if (!Utils.isMobile() && this.mobileMenuOpen) {
        this.toggleMobileMenu();
      }
    }, 250));
    
    // Close mobile menu on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.mobileMenuOpen) {
        this.toggleMobileMenu();
      }
    });
  },
  
  toggleMobileMenu() {
    const navMenu = document.getElementById('nav-links');
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    
    if (!navMenu || !mobileMenuToggle) return;
    
    this.mobileMenuOpen = !this.mobileMenuOpen;
    
    if (this.mobileMenuOpen) {
      navMenu.classList.remove('hidden');
      navMenu.classList.add('show');
      mobileMenuToggle.setAttribute('aria-expanded', 'true');
      mobileMenuToggle.textContent = '✕';
    } else {
      navMenu.classList.add('hidden');
      navMenu.classList.remove('show');
      mobileMenuToggle.setAttribute('aria-expanded', 'false');
      mobileMenuToggle.textContent = '☰';
    }
  },
  
  handleNavClick(event) {
    event.preventDefault();
    
    const href = event.target.getAttribute('href');
    if (!href || !href.startsWith('#')) return;
    
    const targetId = href.substring(1);
    Utils.smoothScrollTo(targetId, CONFIG.scrollDuration);
    
    // Close mobile menu after navigation
    if (this.mobileMenuOpen) {
      this.toggleMobileMenu();
    }
  }
};

// ============================================
// 4. HERO SECTION MODULE
// ============================================

const HeroSection = {
  init() {
    this.bindEvents();
  },
  
  bindEvents() {
    const ctaButton = document.getElementById('cta-button');
    if (ctaButton) {
      ctaButton.addEventListener('click', () => this.scrollToMenu());
    }
  },
  
  scrollToMenu() {
    Utils.smoothScrollTo('menu', CONFIG.scrollDuration);
  }
};

// ============================================
// 5. MENU SYSTEM MODULE
// ============================================

const MenuSystem = {
  currentFilter: 'all',
  menuData: [],
  
  init(data) {
    this.menuData = data;
    this.renderMenuItems('all');
  },
  
  renderMenuItems(category) {
    const menuGrid = document.getElementById('menu-grid');
    
    if (!menuGrid) {
      console.error('Menu grid element not found');
      return;
    }
    
    if (!this.menuData || this.menuData.length === 0) {
      menuGrid.innerHTML = '<p class="col-span-full text-center text-xl text-charcoal">Menu items coming soon! 🍽️</p>';
      return;
    }
    
    // Add filtering class for transition
    menuGrid.classList.add('filtering');
    
    // Filter items
    const filteredItems = category === 'all' 
      ? this.menuData 
      : this.menuData.filter(item => item.category === category);
    
    // Render after a short delay for smooth transition
    setTimeout(() => {
      menuGrid.innerHTML = '';
      
      filteredItems.forEach(item => {
        const card = this.createMenuCard(item);
        menuGrid.appendChild(card);
      });
      
      menuGrid.classList.remove('filtering');
    }, CONFIG.filterTransitionDuration / 2);
  },
  
  createMenuCard(item) {
    const card = document.createElement('div');
    card.className = 'menu-card';
    card.setAttribute('data-category', item.category);
    
    card.innerHTML = `
      <img src="${item.imageSrc}" alt="${item.name}" class="item-image" loading="lazy">
      <div class="item-content">
        <h3 class="item-name">${item.name}</h3>
        <p class="item-price">₹${item.price}</p>
        <p class="item-description">${item.description}</p>
        <p class="item-fact">${item.funnyFact}</p>
      </div>
    `;
    
    return card;
  },
  
  filterItems(category) {
    this.currentFilter = category;
    this.renderMenuItems(category);
  }
};

// ============================================
// 6. CATEGORY FILTER MODULE
// ============================================

const CategoryFilter = {
  activeFilter: 'all',
  
  init() {
    this.bindEvents();
  },
  
  bindEvents() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
      button.addEventListener('click', (e) => this.handleFilterClick(e));
    });
  },
  
  handleFilterClick(event) {
    const button = event.target;
    const category = button.getAttribute('data-category');
    
    if (!category) return;
    
    // Update active button
    this.setActiveButton(button);
    
    // Filter menu items
    MenuSystem.filterItems(category);
    
    this.activeFilter = category;
  },
  
  setActiveButton(activeButton) {
    const allButtons = document.querySelectorAll('.filter-btn');
    
    allButtons.forEach(button => {
      button.classList.remove('active');
    });
    
    activeButton.classList.add('active');
  }
};

// ============================================
// 7. FACTS SECTION MODULE
// ============================================

const FactsSection = {
  facts: [],
  
  init(factsData) {
    this.facts = factsData;
    this.createFactElements();
  },
  
  createFactElements() {
    const marqueeContainer = document.querySelector('.facts-marquee');
    
    if (!marqueeContainer) {
      console.error('Facts marquee container not found');
      return;
    }
    
    // Create facts twice for seamless loop
    const allFacts = [...this.facts, ...this.facts];
    
    marqueeContainer.innerHTML = '';
    
    allFacts.forEach(fact => {
      const factCard = document.createElement('div');
      factCard.className = 'fact-card';
      
      const factText = document.createElement('p');
      factText.className = 'fact-text';
      factText.textContent = fact;
      
      factCard.appendChild(factText);
      marqueeContainer.appendChild(factCard);
    });
  }
};

// ============================================
// 8. FOOTER MODULE
// ============================================

const Footer = {
  init() {
    this.bindEvents();
  },
  
  bindEvents() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        // Track social link clicks (for analytics)
        const platform = link.getAttribute('aria-label');
        console.log(`Social link clicked: ${platform}`);
      });
    });
  }
};

// ============================================
// 9. APPLICATION INITIALIZATION
// ============================================

const App = {
  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.start());
    } else {
      this.start();
    }
  },
  
  start() {
    console.log('🎉 Initializing Gurukrupa Snacks website...');
    
    try {
      // Initialize all modules
      Navigation.init();
      console.log('✓ Navigation initialized');
      
      HeroSection.init();
      console.log('✓ Hero section initialized');
      
      MenuSystem.init(menuData);
      console.log('✓ Menu system initialized');
      
      CategoryFilter.init();
      console.log('✓ Category filters initialized');
      
      FactsSection.init(funFacts);
      console.log('✓ Facts section initialized');
      
      Footer.init();
      console.log('✓ Footer initialized');
      
      console.log('🎊 Gurukrupa Snacks website ready! Enjoy the chaos and crunch!');
    } catch (error) {
      console.error('❌ Error initializing website:', error);
    }
  }
};

// Start the application
App.init();
