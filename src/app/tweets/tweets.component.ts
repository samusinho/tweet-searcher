import { Component, OnInit } from '@angular/core';
import { TwitterService } from '../services/twitter.service';

@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.css']
})
export class TweetsComponent implements OnInit {

  constructor(private ts: TwitterService) { }
  tweets: any[];
  ngOnInit() {
    this.ts.getTweets().subscribe(
      tweets => {
        this.tweets = tweets.data;
      }
    );

  }

}
