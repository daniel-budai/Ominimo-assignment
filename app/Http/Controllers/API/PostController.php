<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PostController extends Controller
{
    use AuthorizesRequests;
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $posts = Post::with('user')->withCount('comments')->latest()->get();
        return response()->json($posts);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        $post = $request->user()->posts()->create($request->all());

        return response()->json($post, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): JsonResponse
    {
        $post = Post::with(['user', 'comments.user'])->findOrFail($id);
        return response()->json($post);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $post = Post::findOrFail($id);
        
        // Check authorization using policy
        $this->authorize('update', $post);
        
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);
        
        $post->update($request->all());
        
        return response()->json($post);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, string $id): JsonResponse
    {
        $post = Post::findOrFail($id);
        
        // Check authorization using policy
        $this->authorize('delete', $post);
        
        $post->delete();
        
        return response()->json(['message' => 'Post deleted successfully'], 200);
    }
}
