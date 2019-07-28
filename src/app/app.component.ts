import { Component, OnInit } from '@angular/core';
import { TwitterService } from './services/twitter.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  constructor (private ts: TwitterService) {}
  ngOnInit() {
    this.ts.getTweets().subscribe(
      tweets => {
        this.tweets = tweets.data;
        this.infoText = 'Tweets recientes...';
      }
    );
  }
  tweets: any[];
  infoText: string = '';

  searchTweets(word: string) {
    this.ts.searchTweets(word).subscribe(
      tweets => {
        this.tweets = tweets.data.statuses;
        if (this.tweets.length <= 0) {
          Swal.fire({ type: 'error', 
                      title: 'Sin resultados...', 
                      text: `No se encontraron resultados para "${word}"...` });
          this.infoText = '';
        }
        else this.infoText = `Resultados para "${word}"...`;
      }
    );
  }
}
