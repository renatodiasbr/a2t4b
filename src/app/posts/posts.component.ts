import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { PostService } from './post.service';
import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/not-found-error';
import { BadInputError } from '../common/bad-input-error';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  posts: any[];

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.postService.getPosts().subscribe(r => {
      this.posts = r.json();
    }, e => {
      alert('An unexpected error occurred.');
    });
  }

  addPost(newPost: HTMLInputElement) {
    const post: any = { title: newPost.value };
    newPost.value = '';

    this.postService.addPost(post)
      .subscribe(r => {
        post.id = r.json().id;
        this.posts.splice(0, 0, post);
      }, (e: AppError) => {
        if (e instanceof BadInputError) {
          // this.form.setErrors(e.originalError);
        } else {
          alert('An unexpected error occurred.');
        }
      });
  }

  updatePost(post: any) {
    this.postService.updatePost(post)
      .subscribe(r => {
        console.log(r.json());
      }, (e: AppError) => {
        if (e instanceof BadInputError) {
          // this.form.setErrors(e.originalError);
        } else {
          alert('An unexpected error occurred.');
        }
      });
  }

  deletePost(post: any) {
    this.postService.deletePost(post.id)
      .subscribe(r => {
        const index = this.posts.indexOf(post);
        this.posts.splice(index, 1);
      }, (e: AppError) => {
        if (e instanceof NotFoundError) {
          alert('This post has already been deleted.');
        } else {
          alert('An unexpected error occurred.');
        }
      });
  }

}
