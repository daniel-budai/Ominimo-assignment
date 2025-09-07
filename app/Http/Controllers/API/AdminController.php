<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    /**
     * Get all posts for admin dashboard
     */
    public function getAllPosts(): JsonResponse
    {
        $posts = Post::with(['user', 'comments'])->latest()->get();
        return response()->json($posts);
    }

    /**
     * Get all comments for admin dashboard
     */
    public function getAllComments(): JsonResponse
    {
        $comments = Comment::with(['user', 'post'])->latest()->get();
        return response()->json($comments);
    }

    /**
     * Get all users for admin dashboard
     */
    public function getAllUsers(): JsonResponse
    {
        $users = User::with(['posts', 'comments'])->latest()->get();
        return response()->json($users);
    }

    /**
     * Admin force delete any post
     */
    public function deletePost(string $id): JsonResponse
    {
        $post = Post::findOrFail($id);
        $post->delete();
        
        return response()->json(['message' => 'Post deleted by admin'], 200);
    }

    /**
     * Admin force delete any comment
     */
    public function deleteComment(string $id): JsonResponse
    {
        $comment = Comment::findOrFail($id);
        $comment->delete();
        
        return response()->json(['message' => 'Comment deleted by admin'], 200);
    }

    /**
     * Update user role (admin only)
     */
    public function updateUserRole(Request $request, string $id): JsonResponse
    {
        $request->validate([
            'role' => 'required|in:user,admin'
        ]);

        $user = User::findOrFail($id);
        $user->update(['role' => $request->role]);
        
        return response()->json(['message' => 'User role updated successfully', 'user' => $user]);
    }
}
