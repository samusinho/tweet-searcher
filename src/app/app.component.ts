import { Component, OnInit } from '@angular/core';
import { TwitterService } from './services/twitter.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor (private ts: TwitterService) {}
  ngOnInit() {
    this.ts.getTweets().subscribe(
      tweets => {
        this.tweets = tweets.data;
      }
    );
  }
  tweets: any[];

  searchTweets(word: string) {
    this.ts.searchTweets(word).subscribe(
      tweets => {
        this.tweets = tweets.data.statuses;
      }
    );
  }
}
