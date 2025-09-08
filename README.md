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

## Start the application
- docker-compose up --build

## Start in background
- docker-compose up -d

## Stop the application
- docker-compose down

## View logs
- docker-compose logs -f

##  Project Structure

### Backend (`app/` directory)

#### Models (`app/Models/`)
- **`User.php`** - User model with authentication, role management, and relationships to posts/comments
- **`Post.php`** - Post model with relationships to users and comments
- **`Comment.php`** - Comment model with relationships to posts and users

#### Controllers (`app/Http/Controllers/API/`)
- **`AuthController.php`** - Handles user registration, login, logout, and authentication
- **`PostController.php`** - Manages CRUD operations for posts with authorization
- **`CommentController.php`** - Handles comment creation and deletion
- **`AdminController.php`** - Admin-specific operations for managing users, posts, and comments

#### Policies (`app/Policies/`)
- **`PostPolicy.php`** - Authorization rules for post operations (view, create, update, delete)
- **`CommentPolicy.php`** - Authorization rules for comment operations

#### Middleware (`app/Http/Middleware/`)
- **`AdminMiddleware.php`** - Ensures only admin users can access admin routes

#### Providers (`app/Providers/`)
- **`AppServiceProvider.php`** - Application service provider for bootstrapping services
- **`RouteServiceProvider.php`** - Route service provider for API route configuration

### Frontend (`resources/` directory)

#### Main Application Files
- **`resources/js/main.ts`** - Vue.js application entry point with Pinia store and router setup
- **`resources/js/App.vue`** - Root Vue component with layout and router view
- **`resources/js/app.js`** - Legacy JavaScript entry point
- **`resources/css/app.css`** - Global CSS styles

#### Components (`resources/js/components/`)

**Layout Components:**
- **`layout/AppLayout.vue`** - Main application layout wrapper
- **`layout/Navbar.vue`** - Navigation bar component

**Post Components:**
- **`posts/PostCard.vue`** - Individual post display card
- **`posts/CommentForm.vue`** - Form for creating new comments
- **`posts/CommentList.vue`** - List of comments for a post

**UI Components:**
- **`ui/Button.vue`** - Reusable button component
- **`ui/Modal.vue`** - Modal dialog component
- **`ui/Spinner.vue`** - Loading spinner component
- **`ui/TextArea.vue`** - Text area input component
- **`ui/TextInput.vue`** - Text input component

#### Views (`resources/js/views/`)
- **`Home.vue`** - Home page displaying all posts
- **`NotFound.vue`** - 404 error page
- **`AdminDashboard.vue`** - Admin panel for managing content
- **`auth/Login.vue`** - User login form
- **`auth/Register.vue`** - User registration form
- **`posts/PostList.vue`** - List view of all posts
- **`posts/PostShow.vue`** - Individual post detail view
- **`posts/PostCreate.vue`** - Form for creating new posts
- **`posts/PostEdit.vue`** - Form for editing existing posts

#### Router (`resources/js/router/`)
- **`index.ts`** - Main router configuration with navigation guards
- **`guards.ts`** - Route guards for authentication and authorization
- **`routes/index.ts`** - Main route definitions
- **`routes/auth.ts`** - Authentication-related routes
- **`routes/posts.ts`** - Post-related routes
- **`routes/admin.ts`** - Admin-only routes

#### Services (`resources/js/services/`)
- **`api.ts`** - Base API client configuration with interceptors
- **`auth.service.ts`** - Authentication API calls (login, register, logout)
- **`posts.service.ts`** - Post-related API calls (CRUD operations)
- **`comments.service.ts`** - Comment-related API calls
- **`admin.ts`** - Admin-specific API calls
- **`index.ts`** - Service exports

#### State Management (`resources/js/store/`)
- **`index.ts`** - Pinia store configuration
- **`auth.ts`** - Authentication state management (user, token, roles)
- **`posts.ts`** - Posts state management and caching

#### Type Definitions (`resources/js/types/`)
- **`index.ts`** - Main type exports
- **`environment.d.ts`** - Environment variable type definitions
- **`shims-vue.d.ts`** - Vue.js type shims
- **`api/ApiResponse.ts`** - API response type definitions
- **`models/User.ts`** - User model type definitions
- **`models/Post.ts`** - Post model type definitions
- **`models/Comment.ts`** - Comment model type definitions
- **`store/auth.ts`** - Authentication store state types
- **`store/posts.ts`** - Posts store state types
- **`router/index.ts`** - Router type definitions


## Personal Reflection

I learned a lot during the development of this application. I made a few technical decisions such as:

**Choosing Vue.js for the frontend** - I wanted to work with a modern reactive framework that would provide a smooth user experience and good developer tooling. Also, I haven't worked with Pinia in a long time, so I wanted to update my memory on it.

**Implementing a service layer architecture** - This approach keeps API calls organized and reusable, making the codebase more maintainable and easier to test. In my experience, this architecture has worked well for me  before on other projects.

**Using localStorage for authentication** - I decided to chose localStorage for authentication because it integrates easily with SPAs and ensures persistence across browser sessions, resulting in a smooth user experience.
In retrospect, this approach is not ideal in my opinion. 
While it is good for an MVP, it exposes the application to potential security risks (XSS attacks). 
For a production application, I would instead opt for secure, HTTP-only cookies with CSRF protection.

**Building a decoupled API-first backend** - This allows the frontend and backend to evolve independently and makes the application more scalable. 

## Areas for Improvement

If I were to continue working on this project, I would focus on these improvements:

**State Management Refactoring** - The state management files, particularly the auth and posts stores, have grown quite long. I would break them down into smaller, more focused modules to improve maintainability and readability.

**Component Refactoring** - The AdminDashboard component has become quite large (283 lines) and could benefit from being split into smaller, more focused components like AdminStats, AdminTabs, and separate tab components for posts, comments, and users.

**Utility Functions Organization** - Create a dedicated utils folder for helper functions like `formatDate`, `truncateText`, and other reusable utilities that are currently scattered throughout components. This would improve code reusability and make the codebase more maintainable.