import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { DataService } from '../services/data.service';

@Injectable()
export class MyFollowersService extends DataService {
  constructor(http: Http) {
    super('https://api.github.com/users/mosh-hamedani/followers', http);
  }
}
