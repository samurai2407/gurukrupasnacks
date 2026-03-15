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
  // आमची क्लासिक्स (वडा आणि मिसळ)
  {
    id: 1,
    name: "सिंगल वडा",
    price: 15,
    description: "अस्सल बटाटा वडा — बाहेरून कुरकुरीत, आतून मसालेदार बटाट्याचा भरणा. खरा महाराष्ट्रीयन स्वाद.",
    funnyFact: "🔥 प्रत्येक भन्नाट वडा पावची सुरुवात इथूनच होते!",
    category: "legends",
    imageSrc: "https://placehold.co/600x400/FDB913/333333?text=सिंगल+वडा"
  },
  {
    id: 2,
    name: "वडा पाव",
    price: 20,
    description: "गुरुकृपाचा स्पेशल ठेचा वडा पाव! मसालेदार बटाटा वडा मऊ पावमध्ये, झणझणीत ठेचा चटणीसोबत.",
    funnyFact: "💡 कल्याणचा आवडता ठेचा वडा पाव!",
    category: "legends",
    imageSrc: "https://placehold.co/600x400/8B0000/FFF9E6?text=वडा+पाव"
  },
  {
    id: 3,
    name: "वडा उसळ पाव",
    price: 60,
    description: "कुरकुरीत वडा, त्यावर झणझणीत उसळ आणि मऊ पाव. पोट आणि मन दोन्ही भरणारा कॉम्बो.",
    funnyFact: "🍛 वडा आणि उसळ — एकत्र आले की जादू होते!",
    category: "legends",
    imageSrc: "https://placehold.co/600x400/FDB913/333333?text=वडा+उसळ+पाव"
  },
  {
    id: 4,
    name: "मिसळ पाव",
    price: 60,
    description: "तिखट मटकीची उसळ, त्यावर फरसाण, कांदा आणि लिंबू. मऊ पावसोबत सर्व्ह केली जाते.",
    funnyFact: "🌶️ कल्याणची मिसळ वेगळीच लागते — कोणत्याही स्थानिकाला विचारा!",
    category: "legends",
    imageSrc: "https://placehold.co/600x400/8B0000/FFF9E6?text=मिसळ+पाव"
  },
  {
    id: 5,
    name: "मिसळ",
    price: 50,
    description: "फक्त झणझणीत मटकीची उसळ — पाव नाही, फक्त तिखट मजा. वरून कुरकुरीत फरसाण.",
    funnyFact: "😤 ज्यांना तिखट सहन होतं त्यांना पावची गरज नाही!",
    category: "legends",
    imageSrc: "https://placehold.co/600x400/FDB913/333333?text=मिसळ"
  },
  {
    id: 6,
    name: "कांदा पोहे",
    price: 20,
    description: "मोहरी, कढीपत्ता, कांदा आणि कोथिंबीर घालून फोडणी दिलेले मऊ पोहे. महाराष्ट्रीयन नाश्त्याचा राजा.",
    funnyFact: "☀️ पोहे नाही तर महाराष्ट्रीयन सकाळ नाही!",
    category: "legends",
    imageSrc: "https://placehold.co/600x400/7CB342/FFF9E6?text=कांदा+पोहे"
  },
  {
    id: 7,
    name: "इडली",
    price: 30,
    description: "मऊ, फुलकी वाफवलेली इडली, नारळ चटणी आणि सांबार सोबत. हलकी, आरोग्यदायी आणि चविष्ट.",
    funnyFact: "🫧 ढगासारखी मऊ — प्रत्येक वेळी परफेक्ट!",
    category: "legends",
    imageSrc: "https://placehold.co/600x400/FFF9E6/333333?text=इडली"
  },

  // गरमा गरम (समोसा आणि कचोरी)
  {
    id: 8,
    name: "समोसा",
    price: 15,
    description: "कुरकुरीत सोनेरी समोसा, आतमध्ये मसालेदार बटाटा आणि मटार. भारताचा सर्वात लोकप्रिय नाश्ता.",
    funnyFact: "🌍 मध्य पूर्वेत जन्मला, भारतात परिपूर्ण झाला!",
    category: "triangles",
    imageSrc: "https://placehold.co/600x400/FDB913/333333?text=समोसा"
  },
  {
    id: 9,
    name: "समोसा पाव",
    price: 20,
    description: "मऊ पावमध्ये पूर्ण समोसा, चटपटीत चटणीसोबत. स्ट्रीट फूडचा अनोखा सँडविच.",
    funnyFact: "🥪 समोसा आणि पाव भेटले तेव्हा जादू झाली!",
    category: "triangles",
    imageSrc: "https://placehold.co/600x400/8B0000/FFF9E6?text=समोसा+पाव"
  },
  {
    id: 10,
    name: "ब्रेड कटलेट",
    price: 20,
    description: "मसालेदार बटाट्याचा भरणा भरलेले ब्रेड, ब्रेडक्रम्ब्स लावून सोनेरी तळलेले. कुरकुरीत आणि चविष्ट.",
    funnyFact: "🍞 साध्या ब्रेडला मजेदार बनवणारा नाश्ता!",
    category: "triangles",
    imageSrc: "https://placehold.co/600x400/FDB913/333333?text=ब्रेड+कटलेट"
  },
  {
    id: 11,
    name: "साधी कचोरी",
    price: 20,
    description: "कुरकुरीत, खुसखुशीत कचोरी, आतमध्ये मसालेदार मूग डाळीचा भरणा. साधी, क्लासिक आणि व्यसन लावणारी.",
    funnyFact: "😎 समोसाचा गोल भाऊ — जास्त ऍटिट्यूड वाला!",
    category: "triangles",
    imageSrc: "https://placehold.co/600x400/7CB342/FFF9E6?text=साधी+कचोरी"
  },
  {
    id: 12,
    name: "दही कचोरी",
    price: 30,
    description: "कुरकुरीत कचोरीवर थंड दही, चिंचेची आंबट चटणी आणि हिरवी तिखट चटणी. गोड, आंबट आणि कुरकुरीत एकत्र.",
    funnyFact: "🎭 गोड, आंबट, तिखट, कुरकुरीत — सगळं एका घासात!",
    category: "triangles",
    imageSrc: "https://placehold.co/600x400/8B0000/FFF9E6?text=दही+कचोरी"
  },

  // कडक आयटम्स (भज्जी)
  {
    id: 13,
    name: "मूग भज्जी",
    price: 35,
    description: "कुरकुरीत मूग डाळीची भज्जी, हिरवी मिरची आणि मसाल्यांसोबत. चहासोबत परफेक्ट कुरकुरीत नाश्ता.",
    funnyFact: "💪 प्रोटीनयुक्त कुरकुरीत नाश्ता — बिनधास्त खा!",
    category: "crisp",
    imageSrc: "https://placehold.co/600x400/FDB913/333333?text=मूग+भज्जी"
  },
  {
    id: 14,
    name: "बटाटा भज्जी",
    price: 30,
    description: "पातळ बटाट्याच्या कापा, मसालेदार बेसन पिठात बुडवून सोनेरी तळलेल्या. साधी पण अप्रतिम.",
    funnyFact: "🥔 पातळ, कुरकुरीत आणि कळायच्या आत संपतात!",
    category: "crisp",
    imageSrc: "https://placehold.co/600x400/7CB342/FFF9E6?text=बटाटा+भज्जी"
  },
  {
    id: 15,
    name: "कांदा भज्जी",
    price: 30,
    description: "कुरकुरीत कांदा भज्जी — पावसाळ्यात गरम चहासोबत खाण्याची मजा काही वेगळीच.",
    funnyFact: "☔ महाराष्ट्राच्या पावसाळ्यात सर्वात जास्त खाल्ली जाते!",
    category: "crisp",
    imageSrc: "https://placehold.co/600x400/FDB913/333333?text=कांदा+भज्जी"
  },

  // गोड आणि फरसाण
  {
    id: 16,
    name: "गुळाची जिलबी",
    price: 240,
    description: "कुरकुरीत, गुळाच्या पाकात भिजवलेली जिलबी. अस्सल महाराष्ट्रीयन गोडवा — ताजी आणि चविष्ट.",
    funnyFact: "🍯 गुळाची जिलबी — गोड खाण्याचा खरा देशी मार्ग!",
    category: "sweets",
    imageSrc: "https://placehold.co/600x400/FDB913/333333?text=गुळाची+जिलबी"
  },
  {
    id: 17,
    name: "फाफडा",
    price: 280,
    description: "कुरकुरीत बेसनाच्या पट्ट्या, ओवा आणि मिरपूड घालून बनवलेल्या. आवडता गुजराती-महाराष्ट्रीयन फरसाण.",
    funnyFact: "📐 जितका कुरकुरीत फाफडा, तितका जास्त आनंद!",
    category: "sweets",
    imageSrc: "https://placehold.co/600x400/7CB342/FFF9E6?text=फाफडा"
  },
  {
    id: 18,
    name: "ढोकळा",
    price: 240,
    description: "मऊ, स्पंजी वाफवलेला ढोकळा, मोहरी आणि कढीपत्त्याची फोडणी. हलका, आंबट-गोड आणि चविष्ट.",
    funnyFact: "🧽 इतका मऊ की तोंडात विरघळतो!",
    category: "sweets",
    imageSrc: "https://placehold.co/600x400/FDB913/333333?text=ढोकळा"
  }
];

// Fun Facts Data
const funFacts = [
  "गुरुकृपा स्नॅक्स २०१४ पासून कल्याणचे आवडते कडक आयटम्स आणि आमची क्लासिक्स सर्व्ह करत आहे!",
  "प्रसिद्ध वडा पाव १९६६ मध्ये दादर स्टेशनबाहेर महाराष्ट्रातच जन्मला!",
  "महाराष्ट्राची मिसळ पाव जगातील सर्वात चविष्ट शाकाहारी पदार्थ म्हणून ओळखली गेली!",
  "समोसा मूळचा मध्य पूर्वेतील — तिथे त्याला 'संबोसा' म्हणत!",
  "परफेक्ट भज्जी तळायला अगदी ७ मिनिटे लागतात!",
  "मुंबईतील स्ट्रीट फूड विक्रेते दररोज २ कोटींहून अधिक लोकांना खाऊ घालतात!",
  "पाव भाजी मूळची कापड गिरणी कामगारांसाठी झटपट जेवण म्हणून बनवली गेली!",
  "मुंबईत दररोज २० लाखांहून अधिक वडा पाव विकले जातात!"
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
      menuGrid.innerHTML = '<p class="col-span-full text-center text-xl text-charcoal">मेनू आयटम्स लवकरच येत आहेत! 🍽️</p>';
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
