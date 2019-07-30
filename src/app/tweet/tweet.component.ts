import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css']
})
export class TweetComponent   {

  constructor() {
    this.adjustBottom('30px');
  }

  @Input() tweet: {};
  logo: string = 'https://png.pngtree.com/element_our/md/20180509/md_5af2d4c9325e1.png';
  height: string;
  bottom: string;
  moreClicked: boolean = false;
  

  adjustBottom(value: string) {
    this.height = value;
    this.bottom = this.height == '0px' ? this.height : `-${this.height}`;
  }

  showFullTweet() {
    this.moreClicked = !this.moreClicked;
    let value = this.moreClicked ? '400px': '30px';
    this.adjustBottom(value);
  }

}
