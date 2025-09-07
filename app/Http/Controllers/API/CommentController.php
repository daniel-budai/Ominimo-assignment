<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Models\Post;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    use AuthorizesRequests;
    /**
     * Store a comment for a post (for authenticated users).
     */
    public function store(Request $request, string $postId): JsonResponse
    {
        $post = Post::findOrFail($postId);
        
        $request->validate([
            'comment' => 'required|string',
        ]);
        
        $comment = $post->comments()->create([
            'comment' => $request->comment,
            'user_id' => $request->user()->id,
        ]);
        
        return response()->json($comment, 201);
    }
    
    /**
     * Store a comment for a post (for guests).
     */
    public function storeGuest(Request $request, string $postId): JsonResponse
    {
        $post = Post::findOrFail($postId);
        
        $request->validate([
            'comment' => 'required|string',
        ]);
        
        $comment = $post->comments()->create([
            'comment' => $request->comment,
            'user_id' => null, // Guest comment
        ]);
        
        return response()->json($comment, 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, string $id): JsonResponse
    {
        $comment = Comment::findOrFail($id);
        
        // Check authorization using policy
        $this->authorize('delete', $comment);
        
        $comment->delete();
        
        return response()->json(['message' => 'Comment deleted successfully'], 200);
    }
}
