##  Prerequisites

Before you begin, ensure you have the following installed on your system:

- **PHP 8.2+** with extensions:
- **Composer** (PHP dependency manager)
- **Node.js 18+** and **npm**
- **SQLite** (included with PHP, no additional setup required)

##  Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
```

### 2. Install PHP Dependencies

```bash
composer install
```

### 3. Install Node.js Dependencies

```bash
npm install
```

Run the migrations:

```bash
php artisan migrate
```

### 4. Seed the Database (Optional)

Populate the database with sample data:

```bash
php artisan db:seed
```

This will create:
- Sample users (including an admin user)
- Sample posts
- Sample comments

**Default Admin Credentials:**
- Email: `admin@example.com`
- Password: `password`
- Role: `admin`

**Other Test Users:**
- Email: `john@example.com` / Password: `password` (role: user)
- Email: `jane@example.com` / Password: `password` (role: user)

### 5. Build Frontend Assets

For development:

```bash
npm run dev
```

For production:

```bash
npm run build
```

### Manual Setup

Run services manually:

1. **Start Laravel Server**:
   ```bash
   php artisan serve
   ```

2. **Start Vite Development Server** (in a new terminal):
   ```bash
   npm run dev
   ```

The application will be available at:
- **Frontend**: http://localhost:8000
- **API**: http://localhost:8000/api
m

## API Documentation

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/register` | Register a new user | No |
| POST | `/api/login` | Login user | No |
| POST | `/api/logout` | Logout user | Yes |
| GET | `/api/user` | Get current user | Yes |

### Post Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/posts` | Get all posts | No |
| GET | `/api/posts/{id}` | Get specific post | No |
| POST | `/api/posts` | Create new post | Yes |
| PUT | `/api/posts/{id}` | Update post | Yes |
| DELETE | `/api/posts/{id}` | Delete post | Yes |

### Comment Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/posts/{postId}/comments` | Create authenticated comment | Yes |
| POST | `/api/posts/{postId}/guest-comments` | Create guest comment | No |
| DELETE | `/api/comments/{id}` | Delete comment | Yes |

### Admin Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/admin/posts` | Get all posts (admin view) | Yes (Admin) |
| GET | `/api/admin/comments` | Get all comments (admin view) | Yes (Admin) |
| GET | `/api/admin/users` | Get all users | Yes (Admin) |
| DELETE | `/api/admin/posts/{id}` | Force delete post | Yes (Admin) |
| DELETE | `/api/admin/comments/{id}` | Force delete comment | Yes (Admin) |
| PUT | `/api/admin/users/{id}/role` | Update user role | Yes (Admin) |

### Sample API Usage

#### Register a new user:
```bash
curl -X POST http://localhost:8000/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password",
    "password_confirmation": "password"
  }'
```

#### Login:
```bash
curl -X POST http://localhost:8000/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password"
  }'
```

#### Create a post (with authentication):
```bash
curl -X POST http://localhost:8000/api/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "My First Post",
    "content": "This is the content of my first post."
  }'
```

## User Roles

The application supports two user roles:

- **User**: Can create, edit, and delete their own posts and comments
- **Admin**: Can manage all posts, comments, and users; can force delete content

##  Docker

# Start the application
- docker-compose up --build

# Start in background
- docker-compose up -d

# Stop the application
- docker-compose down

# View logs
- docker-compose logs -f

##  Project Structure

```
├── app/
│   ├── Http/Controllers/API/     # API Controllers
│   ├── Models/                   # Eloquent Models
│   └── Policies/                 # Authorization Policies
├── database/
│   ├── migrations/               # Database migrations
│   └── seeders/                  # Database seeders
├── resources/
│   ├── js/                       # Vue.js frontend
│   │   ├── components/           # Vue components
│   │   ├── views/                # Vue pages
│   │   ├── services/             # API services
│   │   └── store/                # Pinia store
├── routes/
│   └── api.php                   # API routes
└── tests/                        # Test files
```



