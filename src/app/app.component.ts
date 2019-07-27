import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor () {}
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
      
      // this.ts.searchTweets(this.word).subscribe(
      //   tweets => console.log(tweets)
      // );
    }
  }
}
