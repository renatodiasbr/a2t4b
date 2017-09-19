import { observable } from 'rxjs/symbol/observable';
import { ActivatedRoute } from '@angular/router';
import { GithubFollowersService } from './../services/github-followers.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'github-followers',
  templateUrl: './github-followers.component.html',
  styleUrls: ['./github-followers.component.css']
})
export class GithubFollowersComponent implements OnInit {
  followers: any[];

  constructor(
    private service: GithubFollowersService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe(parms => {
        const page = +parms.get('page');
    });

    Observable.combineLatest([
        this.route.paramMap,
        this.route.queryParamMap
      ]).switchMap(combined => {
        const id = +combined[0].get('id');
        const page = +combined[1].get('page');

        return this.service.getAll();
      }).subscribe(followers => this.followers = followers);
  }
}
