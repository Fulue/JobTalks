![Скриншот JobTalks](main.png)

## Установка

### Локальная установка

1. Клонируйте репозиторий:
   ```bash
   git clone https://github.com/Fulue/JobTalks.git
   cd JobTalks
   ```

2. Установите зависимости для **PHP** (Laravel):
   Убедитесь, что у вас установлен **Composer**. Если его нет, установите [Composer](https://getcomposer.org/).

   После этого выполните команду для установки зависимостей:
   ```bash
   composer install
   ```

3. Установите зависимости для **JavaScript** (React и Inertia.js):
   Убедитесь, что у вас установлен **Node.js** и **npm**. Если их нет, установите [Node.js](https://nodejs.org/).

   Затем выполните команду:
   ```bash
   npm install
   ```

4. Создайте файл `.env` на основе `.env.example`:
   ```bash
   cp .env.example .env
   ```

5. Генерируйте ключ приложения:
   ```bash
   php artisan key:generate
   ```

6. Настройте SQLite:
   В файле `.env` измените параметры подключения к базе данных на SQLite. Для этого измените строки:

   ```ini
   DB_CONNECTION=sqlite
   DB_DATABASE=database/database.sqlite
   ```

7. Выполните миграции базы данных:
   ```bash
   php artisan migrate
   ```

8. Генерация тестовых данных (необязательно):
   ```bash
   php artisan db:seed
   ```

9. Запустите сервер для фронтенда (React):
   Для этого используйте команду:
   ```bash
   npm run dev
   ```

10. Запустите локальный сервер Laravel:
    Если у вас установлен **PHP** и **Composer**, вы можете запустить встроенный сервер Laravel:
   ```bash
   php artisan serve
   ```

По умолчанию сервер будет доступен по адресу [http://localhost:8000](http://localhost:8000).

### Использование Docker (по желанию)

Если вы предпочитаете использовать Docker для развертывания проекта, вы можете выполнить следующие шаги:

1. Запустите проект с помощью Docker Compose:
   ```bash
   docker-compose up --build
   ```
   
2. Установка зависимостей:
   ```bash
   docker exec -it job-talks-php sh -c "composer install && php artisan key:generate && npm install && npm run build"
   ```

   После этого проект будет доступен по адресу [http://localhost:8000](http://localhost:8000).
