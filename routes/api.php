<?php

use App\Http\Controllers\API\AdminController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\CommentController;
use App\Http\Controllers\API\PostController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Public routes

// These routes don't need CSRF protection
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

// Post routes (public)
Route::get('posts', [PostController::class, 'index']);
Route::get('posts/{id}', [PostController::class, 'show']);

// Guest comment route
Route::post('posts/{postId}/guest-comments', [CommentController::class, 'storeGuest']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    // Auth routes
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('user', [AuthController::class, 'user']);
    
    // Post routes (protected)
    Route::post('posts', [PostController::class, 'store']);
    Route::put('posts/{id}', [PostController::class, 'update']);
    Route::delete('posts/{id}', [PostController::class, 'destroy']);
    
    // Comment routes (protected)
    Route::post('posts/{postId}/comments', [CommentController::class, 'store']);
    Route::delete('comments/{id}', [CommentController::class, 'destroy']);
});

// Admin routes
Route::prefix('admin')->middleware(['auth:sanctum', \App\Http\Middleware\AdminMiddleware::class])->group(function () {
    // Admin dashboard data
    Route::get('posts', [AdminController::class, 'getAllPosts']);
    Route::get('comments', [AdminController::class, 'getAllComments']);
    Route::get('users', [AdminController::class, 'getAllUsers']);
    
    // Admin force delete
    Route::delete('posts/{id}', [AdminController::class, 'deletePost']);
    Route::delete('comments/{id}', [AdminController::class, 'deleteComment']);
    
    // User role management
    Route::put('users/{id}/role', [AdminController::class, 'updateUserRole']);
});
