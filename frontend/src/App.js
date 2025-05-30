import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedOffer, setSelectedOffer] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sliderRef = useRef(null);

  const offers = [
    {
      text: "1+1=3: При заказе 2 банок натурального коллагена — ТРЕТЬЯ В ПОДАРОК",
      button: "3-я банка в подарок",
      link: "https://wa.me/79999999999",
      icon: "🎁"
    },
    {
      text: "20 % СКИДКА НА НАТУРАЛЬНЫЙ КОЛЛАГЕН",
      button: "Скидка 20 % в корзине", 
      link: "/cart/?apply_coupon=WEEKDEAL",
      icon: "💰"
    },
    {
      text: "Магний B6 в подарок: При покупке 1 кг банки натурального коллагена — МАГНИЙ B6 В ПОДАРОК",
      button: "Магний B6 в подарок",
      link: "https://wa.me/79999999999",
      icon: "✨"
    }
  ];

  const slides = [
    {
      id: 1,
      title: "Просыпайся и сияй с Somnium!",
      description: "Глубокий сон — лёгкое утро. Попробуй заботу и комфорт!",
      button: "Узнать больше о подушках",
      link: "#pillows",
      bgGradient: "linear-gradient(135deg, #325a55 0%, #2a4a45 50%, #1e3530 100%)",
      buttonClass: "btn-premium-primary",
      particles: true,
      accent: "🌙"
    },
    {
      id: 2, 
      title: "Естественная красота — твой выбор",
      description: "Коллаген работает изнутри: кожа сияет, волосы крепче, ногти не ломаются",
      button: "Выбрать вкус",
      link: "#collagen",
      bgGradient: "linear-gradient(135deg, #f7f7f7 0%, #ffffff 50%, #f0f4f8 100%)",
      buttonClass: "btn-premium-primary",
      isLight: true,
      accent: "✨"
    },
    {
      id: 3,
      title: "Не знаете, какую подушку выбрать?",
      description: "Пройдите короткий тест и получите персональную рекомендацию",
      button: "Пройти тест", 
      link: "#quiz-block",
      bgGradient: "linear-gradient(135deg, #f7f7f7 0%, #ffffff 50%, #e8f2f7 100%)",
      buttonClass: "btn-premium-accent",
      isLight: true,
      accent: "🎯"
    },
    {
      id: 4,
      title: "Акция недели",
      description: offers[selectedOffer].text,
      button: offers[selectedOffer].button,
      link: offers[selectedOffer].link,
      bgGradient: "linear-gradient(135deg, #aec958 0%, #9bb247 50%, #87a03c 100%)",
      buttonClass: "btn-premium-outline",
      isPromo: true,
      accent: offers[selectedOffer].icon,
      particles: true
    }
  ];

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    if (isTransitioning || index === currentSlide) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [currentSlide]);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (sliderRef.current) {
        const rect = sliderRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height
        });
      }
    };

    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener('mousemove', handleMouseMove);
      return () => slider.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return (
    <div className="App">
      {/* Premium Hero Slider Block */}
      <section 
        className="premium-hero-slider-section"
        ref={sliderRef}
        style={{
          '--mouse-x': mousePosition.x,
          '--mouse-y': mousePosition.y
        }}
      >
        <div className="premium-hero-slider-container">
          
          {/* Background Particles */}
          <div className="premium-particles">
            {Array.from({ length: 50 }).map((_, i) => (
              <div 
                key={i} 
                className="premium-particle"
                style={{
                  '--delay': `${i * 0.1}s`,
                  '--duration': `${3 + Math.random() * 4}s`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              />
            ))}
          </div>

          {/* Main Slider */}
          <div className="premium-hero-slider-wrapper">
            {slides.map((slide, index) => (
              <div 
                key={slide.id}
                className={`premium-hero-slide ${index === currentSlide ? 'active' : ''} ${slide.isLight ? 'light-theme' : ''}`}
                style={{ 
                  background: slide.bgGradient,
                  zIndex: index === currentSlide ? 10 : 1
                }}
              >
                {/* Slide Background Effects */}
                <div className="premium-slide-bg-effects">
                  <div className="premium-gradient-overlay"></div>
                  <div className="premium-noise-overlay"></div>
                  {slide.particles && <div className="premium-slide-particles"></div>}
                </div>

                <div className="premium-slide-content">
                  <div className="premium-slide-grid">
                    
                    {/* Enhanced Image Column */}
                    <div className="premium-slide-image">
                      <div className="premium-image-container">
                        <div className="premium-product-card">
                          <div className="premium-product-glow"></div>
                          <div className="premium-product-placeholder">
                            <span className="premium-accent-icon">{slide.accent}</span>
                            <span className="premium-placeholder-text">Заменить на реальное фото товара</span>
                            <div className="premium-placeholder-shine"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Enhanced Content Column */}
                    <div className="premium-slide-text">
                      <div className="premium-content-wrapper">
                        <div className="premium-title-wrapper">
                          <h2 className="premium-hero-title">
                            <span className="premium-title-main">{slide.title}</span>
                            <div className="premium-title-underline"></div>
                          </h2>
                        </div>
                        
                        <p className="premium-hero-description">
                          {slide.description}
                        </p>
                        
                        {slide.isPromo && (
                          <div className="premium-promo-badge">
                            <span className="premium-promo-icon">{slide.accent}</span>
                            <span className="premium-promo-text">Только с 28 мая по 1 июня</span>
                          </div>
                        )}
                        
                        <div className="premium-button-wrapper">
                          <a 
                            href={slide.link}
                            className={`premium-hero-button ${slide.buttonClass}`}
                          >
                            <span className="premium-button-content">
                              <span className="premium-button-text">{slide.button}</span>
                              <span className="premium-button-arrow">→</span>
                            </span>
                            <div className="premium-button-bg"></div>
                            <div className="premium-button-shine"></div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Premium Navigation */}
          <div className="premium-hero-navigation">
            <button 
              className="premium-nav-btn prev"
              onClick={prevSlide}
              disabled={isTransitioning}
              aria-label="Предыдущий слайд"
            >
              <span className="premium-nav-icon">←</span>
              <div className="premium-nav-ripple"></div>
            </button>
            
            <div className="premium-hero-dots">
              {slides.map((_, index) => (
                <button
                  key={index}
                  className={`premium-hero-dot ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => goToSlide(index)}
                  disabled={isTransitioning}
                  aria-label={`Перейти к слайду ${index + 1}`}
                >
                  <div className="premium-dot-inner"></div>
                  <div className="premium-dot-ripple"></div>
                </button>
              ))}
            </div>
            
            <button 
              className="premium-nav-btn next"
              onClick={nextSlide}
              disabled={isTransitioning}
              aria-label="Следующий слайд"
            >
              <span className="premium-nav-icon">→</span>
              <div className="premium-nav-ripple"></div>
            </button>
          </div>
          
          {/* Enhanced Slide Counter */}
          <div className="premium-hero-counter">
            <div className="premium-counter-content">
              <span className="premium-counter-current">
                {String(currentSlide + 1).padStart(2, '0')}
              </span>
              <span className="premium-counter-separator">/</span>
              <span className="premium-counter-total">
                {String(slides.length).padStart(2, '0')}
              </span>
            </div>
            <div className="premium-counter-progress">
              <div 
                className="premium-counter-progress-bar"
                style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Offer Selector (Admin Demo) */}
      <section className="premium-admin-demo-section">
        <div className="premium-admin-demo-container">
          <div className="premium-demo-header">
            <h3>Демо панели админа - Выбор оффера для 4-го слайда</h3>
            <p>Выберите активную акцию, которая будет отображаться в слайдере</p>
          </div>
          
          <div className="premium-offer-selector">
            {offers.map((offer, index) => (
              <label key={index} className={`premium-offer-option ${selectedOffer === index ? 'active' : ''}`}>
                <input 
                  type="radio"
                  name="offer"
                  value={index}
                  checked={selectedOffer === index}
                  onChange={() => setSelectedOffer(index)}
                />
                <div className="premium-offer-content">
                  <span className="premium-offer-icon">{offer.icon}</span>
                  <span className="premium-offer-text">{offer.text}</span>
                </div>
                <div className="premium-option-indicator"></div>
              </label>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Product Catalog Demo */}
      <section className="premium-catalog-demo-section">
        <div className="premium-catalog-demo-container">
          <div className="premium-catalog-header">
            <h3>Демо каталога с ACF promo_text информерами</h3>
            <p>Примеры отображения промо-информации в карточках товаров</p>
          </div>
          
          <div className="premium-product-grid">
            {[1, 2, 3].map((product, index) => (
              <div key={product} className="premium-product-card">
                <div className="premium-product-image-wrapper">
                  <div className="premium-product-image">
                    <span>Фото товара {product}</span>
                    <div className="premium-product-overlay">
                      <button className="premium-quick-view">Быстрый просмотр</button>
                    </div>
                  </div>
                </div>
                
                <div className="premium-product-info">
                  <h4 className="premium-product-title">Премиальный товар {product}</h4>
                  <div className="premium-product-price">
                    <span className="premium-price-current">2990 ₽</span>
                    <span className="premium-price-old">3490 ₽</span>
                  </div>
                  
                  <div className="premium-product-promo">
                    <span className="premium-promo-icon">{offers[index]?.icon || "🎁"}</span>
                    <span className="premium-promo-text">
                      {offers[index]?.text || "Специальное предложение"}
                    </span>
                  </div>
                  
                  <button className="premium-add-to-cart">
                    <span>Добавить в корзину</span>
                    <span className="premium-cart-icon">🛒</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;