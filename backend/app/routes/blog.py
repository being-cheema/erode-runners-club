from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import desc
from app.database import get_db
from app.models import User, BlogPost
from app.schemas import BlogPostCreate, BlogPostUpdate, BlogPostResponse
from app.auth import get_current_user, get_current_admin_user
from typing import List
from datetime import datetime
import re

router = APIRouter(prefix="/api/blog", tags=["Blog"])

def create_slug(title: str) -> str:
    """Create URL-friendly slug from title"""
    slug = title.lower()
    slug = re.sub(r'[^\w\s-]', '', slug)
    slug = re.sub(r'[-\s]+', '-', slug)
    return slug.strip('-')

@router.get("", response_model=List[BlogPostResponse])
async def get_blog_posts(
    published_only: bool = True,
    db: Session = Depends(get_db)
):
    """Get all blog posts"""
    query = db.query(BlogPost)
    
    if published_only:
        query = query.filter(BlogPost.is_published == True)
    
    posts = query.order_by(desc(BlogPost.created_at)).all()
    return [BlogPostResponse.model_validate(post) for post in posts]

@router.get("/{slug}", response_model=BlogPostResponse)
async def get_blog_post(
    slug: str,
    db: Session = Depends(get_db)
):
    """Get single blog post by slug"""
    post = db.query(BlogPost).filter(BlogPost.slug == slug).first()
    
    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Blog post not found"
        )
    
    return BlogPostResponse.model_validate(post)

@router.post("", response_model=BlogPostResponse, status_code=status.HTTP_201_CREATED)
async def create_blog_post(
    post_data: BlogPostCreate,
    current_user: User = Depends(get_current_admin_user),
    db: Session = Depends(get_db)
):
    """Create a new blog post (Admin only)"""
    # Generate slug
    slug = create_slug(post_data.title)
    
    # Check if slug already exists
    existing = db.query(BlogPost).filter(BlogPost.slug == slug).first()
    if existing:
        # Append timestamp to make unique
        slug = f"{slug}-{int(datetime.now().timestamp())}"
    
    new_post = BlogPost(
        author_id=current_user.id,
        title=post_data.title,
        slug=slug,
        content=post_data.content,
        excerpt=post_data.excerpt,
        cover_image=post_data.cover_image,
        category=post_data.category,
        tags=post_data.tags,
        is_published=post_data.is_published,
        published_at=datetime.utcnow() if post_data.is_published else None
    )
    
    db.add(new_post)
    db.commit()
    db.refresh(new_post)
    
    return BlogPostResponse.model_validate(new_post)

@router.put("/{post_id}", response_model=BlogPostResponse)
async def update_blog_post(
    post_id: str,
    post_data: BlogPostUpdate,
    current_user: User = Depends(get_current_admin_user),
    db: Session = Depends(get_db)
):
    """Update blog post (Admin only)"""
    post = db.query(BlogPost).filter(BlogPost.id == post_id).first()
    
    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Blog post not found"
        )
    
    # Update fields
    update_data = post_data.model_dump(exclude_unset=True)
    
    # Update slug if title changed
    if 'title' in update_data:
        post.slug = create_slug(update_data['title'])
    
    # Update published_at if publishing
    if 'is_published' in update_data and update_data['is_published'] and not post.is_published:
        post.published_at = datetime.utcnow()
    
    for key, value in update_data.items():
        setattr(post, key, value)
    
    post.updated_at = datetime.utcnow()
    
    db.commit()
    db.refresh(post)
    
    return BlogPostResponse.model_validate(post)

@router.delete("/{post_id}")
async def delete_blog_post(
    post_id: str,
    current_user: User = Depends(get_current_admin_user),
    db: Session = Depends(get_db)
):
    """Delete blog post (Admin only)"""
    post = db.query(BlogPost).filter(BlogPost.id == post_id).first()
    
    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Blog post not found"
        )
    
    db.delete(post)
    db.commit()
    
    return {"message": "Blog post deleted successfully"}