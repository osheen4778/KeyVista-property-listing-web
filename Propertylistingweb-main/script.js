document.addEventListener('DOMContentLoaded', function() {
    // Property type options configuration
    const propertyOptions = {
        flat: ['1 Bhk', '2 Bhk', '3 Bhk', '4 Bhk', '5 Bhk', '5+ Bhk'],
        house: ['3 BHK', '4 BHK', '5+ BHK', 'Independent', 'Duplex'],
    };
  
    // Dropdown functionality
    function setupDropdowns() {
        const dropdowns = document.querySelectorAll('.dropdown');
        
        dropdowns.forEach(dropdown => {
            const btn = dropdown.querySelector('.dropdown-btn');
            const content = dropdown.querySelector('.dropdown-content');
            
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                document.querySelectorAll('.dropdown-content').forEach(dd => {
                    if (dd !== content) dd.style.display = 'none';
                });
                content.style.display = content.style.display === 'block' ? 'none' : 'block';
            });
        });
        
        window.addEventListener('click', function() {
            document.querySelectorAll('.dropdown-content').forEach(dd => {
                dd.style.display = 'none';
            });
        });
    }

    // Property type selection
    function setupPropertySelection() {
        const propertyTypeLinks = document.querySelectorAll('.property-type .dropdown-content a');
        const bhkDropdown = document.querySelector('.bhk-dropdown');
        const bhkDropdownBtn = bhkDropdown.querySelector('.dropdown-btn');
        const bhkOptionsContainer = document.getElementById('bhk-options');
        
        propertyTypeLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const type = this.getAttribute('data-type');
                const displayText = this.textContent;
                
                document.querySelector('.property-type .dropdown-btn').textContent = displayText + ' ▼';
                bhkOptionsContainer.innerHTML = '';
                
                propertyOptions[type].forEach(option => {
                    const optionElement = document.createElement('a');
                    optionElement.href = '#';
                    optionElement.textContent = option;
                    bhkOptionsContainer.appendChild(optionElement);
                });
                
                bhkDropdownBtn.textContent = 'Select ' + (type === 'flat' ? 'BHK' : 'Type') + ' ▼';
                bhkDropdown.style.display = 'block';
                
                document.querySelectorAll('.dropdown-content').forEach(dd => {
                    dd.style.display = 'none';
                });
            });
        });
        
        bhkOptionsContainer.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                e.preventDefault();
                bhkDropdownBtn.textContent = e.target.textContent + ' ▼';
            }
        });
    }

    // Tab switching
    function setupTabs() {
        // Search tabs
        const searchTabs = document.querySelectorAll('.search-tab');
        searchTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                searchTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
            });
        });
        
       
    // Navigation tabs
    const navTabs = document.querySelectorAll('.nav-tabs a');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // First reset all tabs
    navTabs.forEach(tab => tab.classList.remove('active'));
    
    // Then set the correct active tab
    navTabs.forEach(tab => {
        const tabHref = tab.getAttribute('href');
        
        if (currentPage === 'index.html') {
            if (tabHref === '#') {
                tab.classList.add('active');
            }
        } else if (tabHref === currentPage) {
            tab.classList.add('active');
        }
        
        tab.addEventListener('click', function(e) {
            if (tabHref === '#') {
                e.preventDefault();
            }
            navTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

    // Testimonial Swiper
    function initTestimonialSwiper() {
        try {
            return new Swiper('.testimonialSwiper', {
                direction: 'horizontal',
                loop: true,
                centeredSlides: true,
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false,
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                breakpoints: {
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                        centeredSlides: true
                    },
                    768: {
                        slidesPerView: 1.5,
                        spaceBetween: 25,
                        centeredSlides: true
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                        centeredSlides: false
                    }
                },
                on: {
                    init: function() {
                        console.log('Swiper initialized');
                    },
                    error: function(e) {
                        console.error('Swiper error:', e);
                    }
                }
            });
        } catch (error) {
            console.error('Swiper init error:', error);
            return null;
        }
    }

    // Initialize all components
    setupDropdowns();
    setupPropertySelection();
    setupTabs();
    
    // Initialize Swiper with fallback
    let testimonialSwiper = typeof Swiper !== 'undefined' 
        ? initTestimonialSwiper() 
        : null;

    if (!testimonialSwiper) {
        const swiperScript = document.createElement('script');
        swiperScript.src = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js';
        swiperScript.onload = function() {
            testimonialSwiper = initTestimonialSwiper();
        };
        document.body.appendChild(swiperScript);
    }

    // Handle window resize
    window.addEventListener('resize', function() {
        if (testimonialSwiper) {
            testimonialSwiper.update();
        }
    });
});

import { auth } from "./firebase-config.js";
import{onAuthStateChanged} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js"; 
onAuthStateChanged(auth,(user)=>{
    if(!user){
        setTimeout(()=>{
            window.location.href="signup.html";
        },5000)
    }
    else{
        let username = document.getElementById('usernameappend');
        const email = user.email;
        const name = email.split("@")[0];
        username.innerText= name;


    }
})

