<?php

namespace Database\Seeders;

use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get all users
        $users = User::all();
        
        // Create some posts for each user
        foreach ($users as $user) {
            // Create 2-5 posts for each user
            $postsCount = rand(2, 5);
            
            for ($i = 0; $i < $postsCount; $i++) {
                Post::create([
                    'user_id' => $user->id,
                    'title' => 'Sample Post ' . ($i + 1) . ' by ' . $user->name,
                    'content' => 'This is a sample post content. Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. 
                        Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.',
                ]);
            }
        }
    }
}
