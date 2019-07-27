import { Component, OnInit } from '@angular/core';
import { TwitterService } from '../services/twitter.service';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor (private ts: TwitterService) {}
  ngOnInit() {
    $('#text').on('keyup', (e) => {
      if (e.keyCode == 13) this.searchTweets();
    });
  }
  word: string = '';
  tweets: {}[] = [];
  isEmpty() {
    return this.word.length <= 0;
  }
  searchTweets () {
    if (this.isEmpty()) {
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Debes escribir algo!',
      });
    }
    else {
      this.ts.searchTweets(this.word).subscribe(
        tweets => console.log(tweets)
      );
    }
  }
}
