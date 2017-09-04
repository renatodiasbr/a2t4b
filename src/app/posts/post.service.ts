import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/not-found-error';
import { BadInputError } from '../common/bad-input-error';

@Injectable()
export class PostService {

  url = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: Http) { }

  getPosts() {
    return this.http.get(this.url);
  }

  addPost(post: any) {
    return this.http.post(this.url, post)
      .catch((r: Response) => {
        if (r.status === 400) {
          return Observable.throw(new BadInputError(r.json()));
        }
        return Observable.throw(new AppError(r.json()));
      });
  }

  updatePost(post: any) {
    return this.http.patch(this.url + '/' + post.id, JSON.stringify({ isReady: true }))
      .catch((r: Response) => {
        if (r.status === 400) {
          return Observable.throw(new BadInputError(r.json()));
        }
        return Observable.throw(new AppError(r.json()));
      });
  }

  deletePost(postId: number) {
    return this.http.delete(this.url + '/' + postId)
      .catch((r: Response) => {
        if (r.status === 404) {
          return Observable.throw(new NotFoundError());
        }
        return Observable.throw(new AppError(r.json()));
      });
  }
}
