import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { TwitterService } from '../services/twitter.service';
import { AlertService } from '../services/alert.service';
import { ClipboardService } from 'ngx-clipboard';

declare var $: any;

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css']
})
export class TweetComponent implements OnInit {

  constructor(private ts: TwitterService, private cb: ClipboardService, private _alert: AlertService) { }

  ngOnInit() {
    this.tooltipsText();
  }

  clicked: boolean = false; //estado del boton que muestra/oculta contenedor del tweet con el texto completo
  logo: string = 'https://png.pngtree.com/element_our/md/20180509/md_5af2d4c9325e1.png'; //url logo twitter
  retweeted: string;
  favorited: string;
  @Output('delete') toDelete = new EventEmitter<string>();
  @Input() tweet: { //informacion util de cada tweet del response
    created_at: string,
    full_text: string,
    id_str: string,
    retweeted: boolean,
    favorited: boolean,
    user: {
      profile_image_url: string,
      name: string,
      screen_name: string,
    },
    entities: any
  };

  copyUrl() {//copiar en el portapapeles
    console.log(this.tweet.entities)
    if (this.tweet.entities.urls.length > 0) {
      this.cb.copyFromContent(this.tweet.entities.urls[0].url);
      this._alert.infoToast('Link copiado al portapapeles...');
    }
    else this._alert.infoToast('No hay link para compartir...');
  }
  
  tooltipsText() { // modifica textos tooltips botones de favorito y retweet
    this.favorited = this.tweet.favorited ? 'Desmarcar de favoritos': 'Marcar como favorito';
    this.retweeted = this.tweet.retweeted ? 'Deshacer retweet' : 'Retweet';
  }

  toogle() {// muestra/oculta contenedor del tweet con el texto completo
    $('#' + this.tweet.id_str).slideToggle();
    this.clicked = !this.clicked; // se cambia el estado del boton para mostrar texto "mas" o flecha hacia arriba
  }

  favorite() {
    if (!this.tweet.favorited) {
      this.ts.favorite(this.tweet.id_str).subscribe(
        result => {
          if (!result.error && result.favorited) {
            this.tweet.favorited = true; //se marca como favorito si la respuesta es exitosa
            this.tooltipsText();
            this._alert.successToast('Marcado como favorito...');
          }
          else {
            this._alert.showError(result);
            if (result.code == 139) this.tweet.favorited = true;//se actualiza el estado del tweet a favorito
            if (result.code == 144) this.toDelete.emit(this.tweet.id_str);
          }
        }
      );
    }else {
      this.ts.unfavorite(this.tweet.id_str).subscribe(
        result => {
          if (!result.error  && !result.favorited) {
            this.tweet.favorited = false; //se remueve de favoritos si la respuesta es exitosa
            this.tooltipsText();
            this._alert.successToast('Removido de favoritos...');
          }else {
            this._alert.showError(result);
            if (result.code == 144) this.toDelete.emit(this.tweet.id_str);
          }
        }
      );
    }
  }
  retweet() { //metodo para agregar o deshacer un retweet
    if (!this.tweet.retweeted) {
      this.ts.retweet(this.tweet.id_str).subscribe(
        result => {
          if (!result.error && result.retweeted) {
            this.tweet.retweeted = true;
            this.tooltipsText();
            this._alert.successToast('Retweet...');
          }else {
            this._alert.showError(result);
            if (result.code == 327) this.tweet.retweeted = true;//se actualiza el estado del retweet
            if (result.code == 144) this.toDelete.emit(this.tweet.id_str);
          }
        }
      );
    }else { 
      this.ts.unretweet(this.tweet.id_str).subscribe(
        result => {
          if (!result.error || result.truncated) { // esto se debe a que a veces hay errores en las respuestas del api
            this.tweet.retweeted = false;
            this.tooltipsText();
            this._alert.successToast('Retweet removido...');
          }else {
            this._alert.showError(result);
            if (result.code == 327) this.tweet.retweeted = true;//se actualiza el estado del retweet
            if (result.code == 144) this.toDelete.emit(this.tweet.id_str);
          }
        }
      );
    }
  }
}