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
  // Aamchi Classics (Vada & Misal)
  {
    id: 1,
    name: "Single Vada",
    price: 15,
    description: "The classic batata vada — crispy on the outside, fluffy spiced potato on the inside. Pure Maharashtrian soul food.",
    funnyFact: "🔥 The foundation of every great Vada Pav starts here!",
    category: "legends",
    imageSrc: "https://placehold.co/600x400/FDB913/333333?text=Single+Vada"
  },
  {
    id: 2,
    name: "Vada Pav",
    price: 20,
    description: "Gurukrupa's signature Thecha Vada Pav! Spicy potato fritter in soft pav with fiery thecha chutney that packs a punch.",
    funnyFact: "💡 Our Thecha Vada Pav is what Kalyan dreams about!",
    category: "legends",
    imageSrc: "https://placehold.co/600x400/8B0000/FFF9E6?text=Vada+Pav"
  },
  {
    id: 3,
    name: "Vada Usal Pav",
    price: 60,
    description: "Crispy vada topped with spicy usal curry and served with buttery pav. A hearty combo that fills your belly and soul.",
    funnyFact: "🍛 The ultimate power combo — vada meets usal!",
    category: "legends",
    imageSrc: "https://placehold.co/600x400/FDB913/333333?text=Vada+Usal+Pav"
  },
  {
    id: 4,
    name: "Misal Pav",
    price: 60,
    description: "Spicy sprouted moth curry loaded with farsan, onions, and lemon. Served with soft pav to tame the heat.",
    funnyFact: "🌶️ Kalyan's misal hits different — ask any local!",
    category: "legends",
    imageSrc: "https://placehold.co/600x400/8B0000/FFF9E6?text=Misal+Pav"
  },
  {
    id: 5,
    name: "Misal",
    price: 50,
    description: "The fiery sprouted moth curry on its own — no pav, just pure spicy goodness topped with crunchy farsan.",
    funnyFact: "😤 For those who don't need pav to handle the heat!",
    category: "legends",
    imageSrc: "https://placehold.co/600x400/FDB913/333333?text=Misal"
  },
  {
    id: 6,
    name: "Kanda Pohe",
    price: 20,
    description: "Fluffy flattened rice tempered with mustard seeds, curry leaves, and topped with fresh onions and coriander. A Maharashtrian breakfast staple.",
    funnyFact: "☀️ No Maharashtrian morning is complete without pohe!",
    category: "legends",
    imageSrc: "https://placehold.co/600x400/7CB342/FFF9E6?text=Kanda+Pohe"
  },
  {
    id: 7,
    name: "Idli",
    price: 30,
    description: "Soft, fluffy steamed rice cakes served with coconut chutney and sambar. Light, healthy, and utterly satisfying.",
    funnyFact: "🫧 Perfectly steamed — soft as clouds, every single time!",
    category: "legends",
    imageSrc: "https://placehold.co/600x400/FFF9E6/333333?text=Idli"
  },

  // Garama Garam (Samosa & Kachori)
  {
    id: 8,
    name: "Samosa",
    price: 15,
    description: "Crispy golden pyramids stuffed with spiced potatoes and peas. The OG Indian snack that never disappoints.",
    funnyFact: "🌍 Originated in the Middle East, perfected in India!",
    category: "triangles",
    imageSrc: "https://placehold.co/600x400/FDB913/333333?text=Samosa"
  },
  {
    id: 9,
    name: "Samosa Pav",
    price: 20,
    description: "A whole samosa tucked inside soft pav with tangy chutneys. The street food sandwich that started a revolution.",
    funnyFact: "🥪 When samosa met pav, magic happened!",
    category: "triangles",
    imageSrc: "https://placehold.co/600x400/8B0000/FFF9E6?text=Samosa+Pav"
  },
  {
    id: 10,
    name: "Bread Cutlet",
    price: 20,
    description: "Crispy bread slices stuffed with spiced potato filling, coated in breadcrumbs and fried to golden perfection.",
    funnyFact: "🍞 The snack that makes plain bread exciting!",
    category: "triangles",
    imageSrc: "https://placehold.co/600x400/FDB913/333333?text=Bread+Cutlet"
  },
  {
    id: 11,
    name: "Sadhi Kachori",
    price: 20,
    description: "Flaky, crispy pastry shell filled with a spiced moong dal mixture. Simple, classic, and dangerously addictive.",
    funnyFact: "😎 The round cousin of samosa with more attitude!",
    category: "triangles",
    imageSrc: "https://placehold.co/600x400/7CB342/FFF9E6?text=Sadhi+Kachori"
  },
  {
    id: 12,
    name: "Dahi Kachori",
    price: 30,
    description: "Crispy kachori topped with cool yogurt, tangy tamarind chutney, and spicy green chutney. Sweet, sour, and crunchy all at once.",
    funnyFact: "🎭 Sweet, sour, spicy, crunchy — all in one bite!",
    category: "triangles",
    imageSrc: "https://placehold.co/600x400/8B0000/FFF9E6?text=Dahi+Kachori"
  },

  // Kadak Items (Bhajji)
  {
    id: 13,
    name: "Moong Bhajji",
    price: 35,
    description: "Crispy moong dal fritters seasoned with green chillies and spices. Crunchy, protein-packed, and perfect with chai.",
    funnyFact: "💪 Protein-packed crunch — guilt-free snacking!",
    category: "crisp",
    imageSrc: "https://placehold.co/600x400/FDB913/333333?text=Moong+Bhajji"
  },
  {
    id: 14,
    name: "Batata Bhajji",
    price: 30,
    description: "Thin potato slices dipped in spiced gram flour batter and fried until golden and crispy. Simple yet irresistible.",
    funnyFact: "🥔 Thin, crispy, and gone before you know it!",
    category: "crisp",
    imageSrc: "https://placehold.co/600x400/7CB342/FFF9E6?text=Batata+Bhajji"
  },
  {
    id: 15,
    name: "Kanda Bhajji",
    price: 30,
    description: "Crispy onion fritters that crunch louder than your thoughts. The ultimate monsoon companion with a hot cup of chai.",
    funnyFact: "☔ Best enjoyed during Maharashtra's monsoon season!",
    category: "crisp",
    imageSrc: "https://placehold.co/600x400/FDB913/333333?text=Kanda+Bhajji"
  },

  // Sweets & Farsan
  {
    id: 16,
    name: "Gulachi Jalebi",
    price: 240,
    description: "Crispy, syrup-soaked spirals of pure joy. Made fresh with traditional jaggery syrup for that authentic Maharashtrian sweetness.",
    funnyFact: "🍯 Jaggery jalebi — the real desi way to satisfy your sweet tooth!",
    category: "sweets",
    imageSrc: "https://placehold.co/600x400/FDB913/333333?text=Gulachi+Jalebi"
  },
  {
    id: 17,
    name: "Fafda",
    price: 280,
    description: "Crispy, crunchy gram flour strips seasoned with ajwain and black pepper. A beloved Gujarati-Maharashtrian farsan staple.",
    funnyFact: "📐 The crunchier the fafda, the happier the snacker!",
    category: "sweets",
    imageSrc: "https://placehold.co/600x400/7CB342/FFF9E6?text=Fafda"
  },
  {
    id: 18,
    name: "Dhokla",
    price: 240,
    description: "Soft, spongy steamed gram flour cake tempered with mustard seeds and curry leaves. Light, tangy, and utterly moreish.",
    funnyFact: "🧽 So soft and spongy, it practically melts in your mouth!",
    category: "sweets",
    imageSrc: "https://placehold.co/600x400/FDB913/333333?text=Dhokla"
  }
];

// Fun Facts Data
const funFacts = [
  "Fact: Gurukrupa Snacks has been serving Kalyan's favorite Kadak items and Aamchi Classics since 2014!",
  "Fact: The iconic Vada Pav was born right here in Maharashtra in 1966 outside Dadar Station!",
  "Fact: Misal Pav from Maharashtra was once recognized globally as the world's tastiest vegetarian dish.",
  "Samosas were originally called 'Sambosa' in the Middle East!",
  "The perfect Bhajiya requires exactly 7 minutes of frying!",
  "Street food vendors in Mumbai serve over 20 million people daily!",
  "Pav Bhaji was invented as a quick lunch for textile mill workers!",
  "Mumbai sells over 2 million Vada Pavs every single day!"
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
