import { Component, OnInit } from '@angular/core';
import { MyFollowersService } from './my-followers.service';

@Component({
  selector: 'app-my-followers',
  templateUrl: './my-followers.component.html',
  styleUrls: ['./my-followers.component.scss']
})
export class MyFollowersComponent implements OnInit {

  followers: any[];

  constructor(private service: MyFollowersService) { }

  ngOnInit() {
    this.service.getAll().subscribe(followers => this.followers = followers);
  }

}
