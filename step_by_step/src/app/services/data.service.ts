import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/not-found-error';
import { BadInputError } from '../common/bad-input-error';
import { ServiceErrorHandler } from '../common/service-error-handler';

@Injectable()
export class DataService {

  constructor(private url: string, private http: Http) { }

  getAll() {
    return this.http.get(this.url)
      .map(response => response.json())
      .catch(ServiceErrorHandler.handleError);
  }

  add(resource) {
    return this.http.post(this.url, resource)
      .map(response => response.json())
      .catch(ServiceErrorHandler.handleError);
  }

  update(resource) {
    return this.http.put(this.url + '/' + resource.id, JSON.stringify(resource))
      .map(response => response.json())
      .catch(ServiceErrorHandler.handleError);
  }

  delete(id: number) {
    return this.http.delete(this.url + '/' + id).catch(ServiceErrorHandler.handleError);
  }
}
