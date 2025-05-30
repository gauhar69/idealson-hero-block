import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedOffer, setSelectedOffer] = useState(0);

  const offers = [
    {
      text: "1+1=3: При заказе 2 банок натурального коллагена — ТРЕТЬЯ В ПОДАРОК",
      button: "3-я банка в подарок",
      link: "https://wa.me/79999999999"
    },
    {
      text: "20 % СКИДКА НА НАТУРАЛЬНЫЙ КОЛЛАГЕН",
      button: "Скидка 20 % в корзине", 
      link: "/cart/?apply_coupon=WEEKDEAL"
    },
    {
      text: "Магний B6 в подарок: При покупке 1 кг банки натурального коллагена — МАГНИЙ B6 В ПОДАРОК",
      button: "Магний B6 в подарок",
      link: "https://wa.me/79999999999"
    }
  ];

  const slides = [
    {
      id: 1,
      title: "Просыпайся и сияй с Somnium!",
      description: "Глубокий сон — лёгкое утро. Попробуй заботу и комфорт!",
      button: "Узнать больше о подушках",
      link: "#pillows",
      bgColor: "#325a55",
      buttonClass: "btn-primary"
    },
    {
      id: 2, 
      title: "Естественная красота — твой выбор",
      description: "Коллаген работает изнутри: кожа сияет, волосы крепче, ногти не ломаются",
      button: "Выбрать вкус",
      link: "#collagen",
      bgColor: "#f7f7f7",
      buttonClass: "btn-primary"
    },
    {
      id: 3,
      title: "Не знаете, какую подушку выбрать?",
      description: "Пройдите короткий тест и получите персональную рекомендацию",
      button: "Пройти тест", 
      link: "#quiz-block",
      bgColor: "#f7f7f7",
      buttonClass: "btn-primary"
    },
    {
      id: 4,
      title: "Акция недели",
      description: offers[selectedOffer].text,
      button: offers[selectedOffer].button,
      link: offers[selectedOffer].link,
      bgColor: "#aec958",
      buttonClass: "btn-outline",
      isPromo: true
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="App">
      {/* Hero Slider Block */}
      <section className="hero-slider-section">
        <div className="hero-slider-container">
          <div 
            className="hero-slider-wrapper"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide, index) => (
              <div 
                key={slide.id}
                className="hero-slide"
                style={{ backgroundColor: slide.bgColor }}
              >
                <div className="hero-slide-content">
                  <div className="hero-slide-grid">
                    {/* Image Column */}
                    <div className="hero-slide-image">
                      <div className="product-placeholder">
                        <span>Заменить на реальное фото товара</span>
                      </div>
                    </div>
                    
                    {/* Content Column */}
                    <div className="hero-slide-text">
                      <h2 className="hero-title">{slide.title}</h2>
                      <p className="hero-description">{slide.description}</p>
                      
                      {slide.isPromo && (
                        <div className="promo-date">
                          Только с 28 мая по 1 июня
                        </div>
                      )}
                      
                      <a 
                        href={slide.link}
                        className={`hero-button ${slide.buttonClass}`}
                      >
                        {slide.button}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Navigation */}
          <div className="hero-navigation">
            <button 
              className="hero-nav-btn prev"
              onClick={prevSlide}
              aria-label="Предыдущий слайд"
            >
              ←
            </button>
            
            <div className="hero-dots">
              {slides.map((_, index) => (
                <button
                  key={index}
                  className={`hero-dot ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Перейти к слайду ${index + 1}`}
                />
              ))}
            </div>
            
            <button 
              className="hero-nav-btn next"
              onClick={nextSlide}
              aria-label="Следующий слайд"
            >
              →
            </button>
          </div>
          
          {/* Slide Counter */}
          <div className="hero-counter">
            <span>{String(currentSlide + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}</span>
          </div>
        </div>
      </section>

      {/* Offer Selector (For Admin Demo) */}
      {slides[3].isPromo && (
        <section className="admin-demo-section">
          <div className="admin-demo-container">
            <h3>Демо панели админа - Выбор оффера для 4-го слайда:</h3>
            <div className="offer-selector">
              {offers.map((offer, index) => (
                <label key={index} className="offer-option">
                  <input 
                    type="radio"
                    name="offer"
                    value={index}
                    checked={selectedOffer === index}
                    onChange={() => setSelectedOffer(index)}
                  />
                  <span>{offer.text}</span>
                </label>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Product Catalog Demo with ACF Promo */}
      <section className="catalog-demo-section">
        <div className="catalog-demo-container">
          <h3>Демо каталога с ACF promo_text информерами:</h3>
          <div className="product-grid">
            {[1, 2, 3].map((product, index) => (
              <div key={product} className="product-card">
                <div className="product-image">
                  <span>Фото товара {product}</span>
                </div>
                <h4>Товар {product}</h4>
                <div className="product-price">2990 ₽</div>
                <div className="product-promo">
                  {offers[index] ? offers[index].text : "Специальное предложение"}
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