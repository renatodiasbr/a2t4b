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
    this.postService.getAll().subscribe(posts => this.posts = posts);
  }

  addPost(newPost: HTMLInputElement) {
    const post: any = { title: newPost.value };
    newPost.value = '';

    this.postService.add(post)
      .subscribe(r => {
        post.id = r.id;
        this.posts.splice(0, 0, post);
      }, (e: AppError) => {
        if (e instanceof BadInputError) {
          // this.form.setErrors(e.originalError);
        } else {
          throw e;
        }
      });
  }

  updatePost(post: any) {
    this.postService.update(post)
      .subscribe(r => {
        console.log(r);
      }, (e: AppError) => {
        if (e instanceof BadInputError) {
          // this.form.setErrors(e.originalError);
        } else if (e instanceof NotFoundError) {
          alert('This post no longer exists.');
        } else {
          throw e;
        }
      });
  }

  deletePost(post: any) {
    this.postService.delete(post.id)
      .subscribe(() => {
        const index = this.posts.indexOf(post);
        this.posts.splice(index, 1);
      }, (e: AppError) => {
        if (e instanceof NotFoundError) {
          alert('This post has already been deleted.');
        } else {
          throw e;
        }
      });
  }

}
