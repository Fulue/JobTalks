FROM php:8.3-fpm

# Устанавливаем зависимости
RUN apt-get update && apt-get install -y \
    build-essential \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    zip \
    curl \
    unzip \
    git \
    libicu-dev \
    libpq-dev \
    gnupg \
    libssl-dev

# Устанавливаем расширения PHP
RUN docker-php-ext-configure gd --with-freetype --with-jpeg
RUN docker-php-ext-install pdo pdo_mysql mbstring exif pcntl bcmath gd zip intl

# Устанавливаем Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Устанавливаем Node.js и npm
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs

# Проверяем установку Node.js и npm
RUN node -v
RUN npm -v

# Копируем файлы приложения
COPY . /var/www/html/

# Копируем php.ini
COPY docker/php/php.ini /usr/local/etc/php/conf.d/

# Устанавливаем рабочую директорию
WORKDIR /var/www/html

# Удаляем старые зависимости
RUN rm -rf node_modules package-lock.json vendor composer.lock

# Устанавливаем зависимости Composer
RUN composer install --no-interaction --prefer-dist --optimize-autoloader --no-dev

# Генерируем ключ приложения
RUN php artisan key:generate

# Собираем ассеты
RUN npm install
RUN npm run build

# Устанавливаем права на директории
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

ENTRYPOINT ["php-fpm"]
