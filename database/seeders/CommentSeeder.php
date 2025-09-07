<?php

namespace Database\Seeders;

use App\Models\Comment;
use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CommentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get all posts and users
        $posts = Post::all();
        $users = User::all();
        $userCount = $users->count();
        
        // Add comments to each post
        foreach ($posts as $post) {
            // Add 0-10 comments for each post
            $commentCount = rand(0, 10);
            
            for ($i = 0; $i < $commentCount; $i++) {
                // Randomly decide if this is a guest comment or a user comment
                $isGuestComment = rand(0, 1) === 0;
                
                if ($isGuestComment) {
                    // Create a guest comment
                    Comment::create([
                        'post_id' => $post->id,
                        'user_id' => null,
                        'comment' => 'This is a guest comment on this post. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                    ]);
                } else {
                    // Create a user comment (from a random user)
                    $randomUser = $users[rand(0, $userCount - 1)];
                    
                    Comment::create([
                        'post_id' => $post->id,
                        'user_id' => $randomUser->id,
                        'comment' => 'This is a comment by ' . $randomUser->name . '. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                    ]);
                }
            }
        }
    }
}
