import { Component, Input } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css']
})
export class TweetComponent   {

  constructor() {

  }

  clicked: boolean = false;

  @Input() tweet: {
    created_at: string,
    full_text: string,
    id_str: string,
    retweeted: boolean,
    favorited: boolean,
    user: {
      profile_image_url: string,
      name: string,
      screen_name: string,
    }
  };
  logo: string = 'https://png.pngtree.com/element_our/md/20180509/md_5af2d4c9325e1.png';
  
  toogle() {
    $('#' + this.tweet.id_str).slideToggle();
    this.clicked = !this.clicked;
  }

}
