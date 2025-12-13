import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { ArrowLeft, Clock, User, Share2, BookOpen } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import blogsData from '../data/blogs.json';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: 'Training' | 'Nutrition' | 'Gear' | 'Race Recap';
  author: string | { name: string };
  date: string;
  readTime: string | number;
  image: string;
  content?: string;
}

export function BlogsSection() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const blogPosts: BlogPost[] = blogsData.blogPosts.map(p => ({
    id: p.id,
    title: p.title,
    excerpt: p.excerpt,
    category: p.category as 'Training' | 'Nutrition' | 'Gear' | 'Race Recap',
    author: typeof p.author === 'string' ? p.author : p.author.name,
    date: p.publishDate,
    readTime: `${p.readTime} min`,
    image: p.image,
    content: p.content
  }));

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
                <span>{typeof selectedPost.author === 'string' ? selectedPost.author : selectedPost.author.name}</span>
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
                <span>{typeof blogPosts[0].author === 'string' ? blogPosts[0].author : blogPosts[0].author.name}</span>
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