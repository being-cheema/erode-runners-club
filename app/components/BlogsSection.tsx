import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { ArrowLeft, Clock, User, Share2, BookOpen } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: 'Training' | 'Nutrition' | 'Gear' | 'Race Recap';
  author: string;
  date: string;
  readTime: string;
  image: string;
  content?: string;
}

export function BlogsSection() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: '10 Essential Tips for Marathon Training',
      excerpt: 'Preparing for your first marathon? Here are the essential tips every runner should know before starting their training journey.',
      category: 'Training',
      author: 'Coach Ramesh',
      date: 'August 12, 2025',
      readTime: '5 min',
      image: 'https://images.unsplash.com/photo-1692170226404-969b6e5cde95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydW5uaW5nJTIwbWFyYXRob24lMjBmaW5pc2glMjBsaW5lfGVufDF8fHx8MTc1NTI3MTEyOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      content: 'Marathon training is a journey that requires dedication, patience, and proper planning. Here are the essential tips to help you succeed:\n\n1. Build your base gradually\n2. Include cross-training\n3. Listen to your body\n4. Fuel properly\n5. Get adequate rest\n\nRemember, consistency is key to marathon success.'
    },
    {
      id: '2',
      title: 'Pre-Run Nutrition: What to Eat and When',
      excerpt: 'Maximize your running performance with proper nutrition. Learn what to eat before your runs for optimal energy and endurance.',
      category: 'Nutrition',
      author: 'Dr. Priya Nutritionist',
      date: 'August 10, 2025',
      readTime: '7 min',
      image: 'https://images.unsplash.com/photo-1563674698276-18a7b1df0106?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydW5uaW5nJTIwbnV0cml0aW9uJTIwaGVhbHRoeSUyMGZvb2R8ZW58MXx8fHwxNzU1MjcxMzIwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      content: 'Proper nutrition before running can make or break your performance. Here\'s what you need to know about fueling your runs effectively.'
    },
    {
      id: '3',
      title: 'Best Running Shoes for Indian Roads',
      excerpt: 'Navigate Indian terrain with confidence. Our comprehensive guide to choosing the perfect running shoes for local conditions.',
      category: 'Gear',
      author: 'Gear Expert Arjun',
      date: 'August 8, 2025',
      readTime: '6 min',
      image: 'https://images.unsplash.com/photo-1559743345-60e0907c4853?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydW5uaW5nJTIwZ2VhciUyMHNob2VzJTIwZXF1aXBtZW50fGVufDF8fHx8MTc1NTI3MTMyM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      content: 'Choosing the right running shoes for Indian roads requires understanding the unique challenges of our terrain and climate.'
    },
    {
      id: '4',
      title: 'Erode Half Marathon 2025: Race Recap',
      excerpt: 'Relive the excitement of our biggest race yet! Over 500 runners participated in this year\'s half marathon.',
      category: 'Race Recap',
      author: 'Event Team',
      date: 'August 5, 2025',
      readTime: '4 min',
      image: 'https://images.unsplash.com/photo-1700914299505-d7d0f642b98f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydW5uaW5nJTIwdHJhY2slMjBzdGFkaXVtJTIwcmFjZXxlbnwxfHx8fDE3NTUyNzExNzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      content: 'The Erode Half Marathon 2025 was our most successful event to date, with record participation and fantastic weather conditions.'
    }
  ];

  const getCategoryColor = (category: BlogPost['category']) => {
    switch (category) {
      case 'Training':
        return 'bg-primary/10 text-primary';
      case 'Nutrition':
        return 'bg-green-100 text-green-700';
      case 'Gear':
        return 'bg-secondary/10 text-secondary';
      case 'Race Recap':
        return 'bg-accent/20 text-accent-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  if (selectedPost) {
    return (
      <div className="min-h-screen bg-background">
        {/* Article Header */}
        <div className="relative">
          <div className="aspect-video relative">
            <ImageWithFallback 
              src={selectedPost.image} 
              alt={selectedPost.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedPost(null)}
              className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Article Content */}
        <div className="px-6 py-8 space-y-6">
          <div>
            <div className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded inline-block mb-3">
              {selectedPost.category}
            </div>
            <h1 className="text-2xl font-medium mb-4 leading-tight">
              {selectedPost.title}
            </h1>
            <div className="flex items-center space-x-4 text-muted-foreground text-sm">
              <div className="flex items-center space-x-1">
                <User className="w-4 h-4" />
                <span>{selectedPost.author}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{selectedPost.readTime} read</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-lg leading-relaxed text-muted-foreground">
              {selectedPost.excerpt}
            </p>
            {selectedPost.content && (
              <div className="space-y-4">
                {selectedPost.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            )}
          </div>

          {/* Share Section */}
          <Card className="border border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium mb-1">Enjoyed this article?</h3>
                  <p className="text-sm text-muted-foreground">Share it with fellow runners</p>
                </div>
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="px-6 py-8 border-b border-border">
        <h1 className="text-xl font-medium">Running Blog</h1>
      </div>

      <div className="px-6 py-8 space-y-8">
        {/* Featured Article */}
        <Card className="border border-border overflow-hidden">
          <div className="aspect-video relative">
            <ImageWithFallback 
              src={blogPosts[0].image} 
              alt={blogPosts[0].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="text-xs text-white bg-white/20 backdrop-blur-sm px-2 py-1 rounded inline-block mb-2">
                Featured
              </div>
              <h2 className="text-white font-medium text-xl leading-tight mb-2">
                {blogPosts[0].title}
              </h2>
              <p className="text-white/90 text-sm">
                {blogPosts[0].excerpt}
              </p>
            </div>
          </div>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <span>{blogPosts[0].author}</span>
                <span>•</span>
                <span>{blogPosts[0].readTime}</span>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setSelectedPost(blogPosts[0])}
              >
                Read More
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Articles */}
        <div>
          <h2 className="font-medium mb-4">Recent Articles</h2>
          <div className="space-y-4">
            {blogPosts.slice(1).map((post) => (
              <Card key={post.id} className="border border-border overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex">
                    <div className="w-24 h-24 flex-shrink-0">
                      <ImageWithFallback 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 p-4">
                      <div className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded inline-block mb-2">
                        {post.category}
                      </div>
                      <h3 className="font-medium text-sm leading-tight mb-2">
                        {post.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-muted-foreground">
                          {post.readTime} • {post.date.split(',')[0]}
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setSelectedPost(post)}
                          className="text-xs h-auto py-1 px-2"
                        >
                          Read
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div>
          <h2 className="font-medium mb-4">Browse by Category</h2>
          <div className="grid grid-cols-2 gap-3">
            {['Training', 'Nutrition', 'Gear', 'Race Recap'].map((category) => (
              <Card key={category} className="border border-border cursor-pointer hover:bg-muted/50 transition-colors">
                <CardContent className="p-4 text-center">
                  <h3 className="font-medium">{category}</h3>
                  <p className="text-sm text-muted-foreground">
                    {blogPosts.filter(post => post.category === category).length} articles
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}