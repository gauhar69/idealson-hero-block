# 🎯 IdealSon Premium Hero Block - Инструкция по установке

## 📋 Комплектация

В данном пакете вы получаете:

1. **`idealson-hero-elementor.json`** - Готовый шаблон для импорта в Elementor Pro
2. **`idealson-hero-custom.css`** - Премиальные стили CSS
3. **`idealson-hero-premium.css`** - Дополнительные премиальные стили (будет создан автоматически)
4. **`installation-guide.md`** - Данная инструкция

## 🚀 Быстрая установка (5 минут)

### Шаг 1: Импорт JSON шаблона

1. Войдите в админ-панель WordPress
2. Перейдите в **Elementor > My Templates**
3. Нажмите **Import Templates**
4. Выберите файл `idealson-hero-elementor.json`
5. Нажмите **Import Now**

### Шаг 2: Установка премиальных стилей

1. Перейдите в **Внешний вид > Настройка > Дополнительный CSS**
2. Скопируйте содержимое файла `idealson-hero-custom.css`
3. Вставьте в поле **Дополнительный CSS**
4. Нажмите **Опубликовать**

### Шаг 3: Добавление блока на страницу

1. Редактируйте нужную страницу в Elementor
2. Нажмите **+ Добавить шаблон**
3. Найдите **IdealSon Premium Hero Block**
4. Нажмите **Вставить**

## ⚙️ Настройка Global Widget для акций

### Создание Global Widget для 4-го слайда

1. В Elementor перейдите в **My Templates > Saved Templates**
2. Создайте **Global Widget** с именем "IdealSon Promo"
3. Добавьте следующие поля:

```php
// В functions.php вашей темы
function idealson_register_acf_fields() {
    if( function_exists('acf_add_local_field_group') ):
        acf_add_local_field_group(array(
            'key' => 'group_idealson_promo',
            'title' => 'IdealSon Промо настройки',
            'fields' => array(
                array(
                    'key' => 'field_promo_text',
                    'label' => 'Текст акции',
                    'name' => 'promo_text',
                    'type' => 'select',
                    'choices' => array(
                        'offer1' => '1+1=3: При заказе 2 банок натурального коллагена — ТРЕТЬЯ В ПОДАРОК',
                        'offer2' => '20 % СКИДКА НА НАТУРАЛЬНЫЙ КОЛЛАГЕН',
                        'offer3' => 'Магний B6 в подарок: При покупке 1 кг банки натурального коллагена — МАГНИЙ B6 В ПОДАРОК'
                    ),
                    'default_value' => 'offer3'
                ),
                array(
                    'key' => 'field_promo_button',
                    'label' => 'Текст кнопки',
                    'name' => 'promo_button',
                    'type' => 'select',
                    'choices' => array(
                        'btn1' => '3-я банка в подарок',
                        'btn2' => 'Скидка 20 % в корзине',
                        'btn3' => 'Магний B6 в подарок'
                    ),
                    'default_value' => 'btn3'
                ),
                array(
                    'key' => 'field_promo_link',
                    'label' => 'Ссылка кнопки',
                    'name' => 'promo_link',
                    'type' => 'select',
                    'choices' => array(
                        'whatsapp' => 'https://wa.me/79999999999',
                        'cart' => '/cart/?apply_coupon=WEEKDEAL',
                        'whatsapp2' => 'https://wa.me/79999999999'
                    ),
                    'default_value' => 'whatsapp2'
                )
            ),
            'location' => array(
                array(
                    array(
                        'param' => 'options_page',
                        'operator' => '==',
                        'value' => 'idealson-settings',
                    ),
                ),
            ),
        ));
    endif;
}
add_action('acf/init', 'idealson_register_acf_fields');

// Создание страницы настроек
function idealson_admin_menu() {
    acf_add_options_page(array(
        'page_title' => 'IdealSon Настройки',
        'menu_title' => 'IdealSon',
        'menu_slug' => 'idealson-settings',
        'capability' => 'edit_posts',
    ));
}
add_action('acf/init', 'idealson_admin_menu');
```

### Обновление HTML для Dynamic Tags

Замените статический текст в 4-м слайде на Dynamic Tags:

```html
<!-- В HTML виджете 4-го слайда -->
<p class="idealson-premium-description idealson-promo-text">
    {{dcf:acf field="promo_text"}}
</p>

<a href="{{dcf:acf field="promo_link"}}" class="idealson-premium-btn btn-premium-outline idealson-promo-button">
    <span class="idealson-btn-content">
        <span class="idealson-btn-text">{{dcf:acf field="promo_button"}}</span>
        <span class="idealson-btn-arrow">→</span>
    </span>
    <div class="idealson-btn-bg"></div>
    <div class="idealson-btn-shine"></div>
</a>
```

## 🛍️ Настройка информеров каталога (ACF)

### Добавление поля promo_text к товарам

```php
// В functions.php
function idealson_product_acf_fields() {
    if( function_exists('acf_add_local_field_group') ):
        acf_add_local_field_group(array(
            'key' => 'group_product_promo',
            'title' => 'Промо информация товара',
            'fields' => array(
                array(
                    'key' => 'field_product_promo_text',
                    'label' => 'Промо текст',
                    'name' => 'promo_text',
                    'type' => 'select',
                    'choices' => array(
                        'promo1' => '1+1=3: При заказе 2 банок — 3-я в подарок',
                        'promo2' => '20% скидка на натуральный коллаген',
                        'promo3' => 'Магний B6 в подарок: При покупке 1 кг банки натурального коллагена — МАГНИЙ B6 В ПОДАРОК',
                        'none' => 'Без промо'
                    ),
                    'allow_null' => 1,
                    'default_value' => 'none'
                )
            ),
            'location' => array(
                array(
                    array(
                        'param' => 'post_type',
                        'operator' => '==',
                        'value' => 'product',
                    ),
                ),
            ),
        ));
    endif;
}
add_action('acf/init', 'idealson_product_acf_fields');
```

### Вывод информера в карточке товара

```php
// В шаблоне товара (single-product.php или archive-product.php)
<?php
$promo_text = get_field('promo_text');
if ($promo_text && $promo_text !== 'none') {
    $promo_messages = array(
        'promo1' => '1+1=3: При заказе 2 банок — 3-я в подарок',
        'promo2' => '20% скидка на натуральный коллаген',
        'promo3' => 'Магний B6 в подарок: При покупке 1 кг банки натурального коллагена — МАГНИЙ B6 В ПОДАРОК'
    );
    
    if (isset($promo_messages[$promo_text])) {
        echo '<div class="idealson-product-promo">';
        echo '<span class="idealson-promo-icon">🎁</span>';
        echo '<span class="idealson-promo-text">' . $promo_messages[$promo_text] . '</span>';
        echo '</div>';
    }
}
?>
```

## 🎨 Кастомизация стилей

### Изменение цветов бренда

В файле CSS найдите и измените переменные:

```css
:root {
  --premium-primary: #325a55;    /* Основной цвет */
  --premium-accent: #aec958;     /* Акцентный цвет */
  --premium-secondary: #f7f7f7;  /* Вторичный цвет */
}
```

### Изменение шрифтов

```css
:root {
  --font-primary: 'Manrope', sans-serif;  /* Основной шрифт */
  --font-secondary: 'Inter', sans-serif;   /* Дополнительный шрифт */
}
```

### Изменение размеров

```css
:root {
  --idealson-title-size: 32px;    /* Размер заголовков */
  --idealson-desc-size: 20px;     /* Размер описания */
  --idealson-btn-size: 18px;      /* Размер текста кнопок */
}
```

## 📱 Адаптивность

Блок полностью адаптивен и корректно отображается на:

- **Desktop**: 1920px+ (полный функционал)
- **Laptop**: 1024px-1919px (оптимизированная сетка)
- **Tablet**: 768px-1023px (одноколоночная сетка)
- **Mobile**: до 767px (мобильная оптимизация)

## 🔧 Расширенные настройки

### Изменение скорости автопрокрутки

В JavaScript коде найдите и измените:

```javascript
// Изменить с 6000 на нужное значение (в миллисекундах)
let idealsonAutoPlay = setInterval(idealsonPremiumNextSlide, 6000);
```

### Отключение автопрокрутки

```javascript
// Закомментировать эти строки:
// let idealsonAutoPlay = setInterval(idealsonPremiumNextSlide, 6000);
```

### Добавление новых слайдов

1. Скопируйте структуру любого слайда
2. Измените `data-slide` на новый номер
3. Обновите JavaScript счетчики
4. Добавьте новую точку навигации

## ⚡ Оптимизация производительности

### Lazy Loading для изображений

```html
<img src="placeholder.jpg" data-src="real-image.jpg" class="idealson-lazy" loading="lazy" alt="Описание">
```

### Минификация CSS

Используйте плагины минификации или онлайн-инструменты для сжатия CSS.

### Кэширование

Убедитесь, что у вас настроено кэширование статических файлов.

## 🐛 Устранение неполадок

### Слайдер не работает

1. Проверьте, что JavaScript не заблокирован
2. Убедитесь, что нет конфликтов с другими скриптами
3. Проверьте консоль браузера на ошибки

### Стили не применяются

1. Убедитесь, что CSS файл подключен
2. Проверьте приоритет стилей (используйте `!important` при необходимости)
3. Очистите кэш сайта и браузера

### Проблемы с адаптивностью

1. Проверьте viewport meta тег: `<meta name="viewport" content="width=device-width, initial-scale=1">`
2. Убедитесь, что нет CSS конфликтов с темой

## 📞 Поддержка

Для получения поддержки обращайтесь:

- **Email**: support@idealson.ru
- **Документация**: https://idealson.ru/docs/hero-block
- **Telegram**: @idealson_support

## 📄 Лицензия

Данный продукт является собственностью IdealSon и предназначен исключительно для использования в проектах компании.

---

**Версия**: 1.0  
**Дата**: 22.03.2025  
**Автор**: IdealSon Development Team