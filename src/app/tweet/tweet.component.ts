import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css']
})
export class TweetComponent   {

  constructor() {
    this.moreTweetBottom = '-30px';
  }

  @Input() tweet: {};
  logo: string = 'https://png.pngtree.com/element_our/md/20180509/md_5af2d4c9325e1.png';
  moreButtonClicked: boolean = false;
  moreTweetBottom: string;

  showFullTweet() {
    this.moreButtonClicked = !this.moreButtonClicked;
    // calcular altura del contenedor pendiente
    this.moreTweetBottom = this.moreButtonClicked ? '-100px': '-30px'
  }

}
