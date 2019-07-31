import { Component, Input, OnInit } from '@angular/core';
import { TwitterService } from '../services/twitter.service';
import { ClipboardService } from 'ngx-clipboard';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css']
})
export class TweetComponent implements OnInit {

  constructor(private ts: TwitterService, private cb: ClipboardService) {
    
  }
  ngOnInit() {
    this.tooltipsText();
  }

  clicked: boolean = false; //estado del boton que muestra/oculta contenedor del tweet con el texto completo
  logo: string = 'https://png.pngtree.com/element_our/md/20180509/md_5af2d4c9325e1.png'; //url logo twitter
  retweeted: string;
  favorited: string;

  @Input() tweet: { //informacion util del tweet
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
    const Toast = Swal.mixin({ //alerta tipo toast
      toast: true,
      position: 'center',
      showConfirmButton: false,
      timer: 3000
    });
    if (this.tweet.entities.urls.length > 0) {
      this.cb.copyFromContent(this.tweet.entities.urls[0].url);
      Toast.fire({
        type: 'info', title: 'Link copiado al portapapeles...'
      });
    }
    else {
      Toast.fire({
        type: 'error', title: 'No hay link para compartir...'
      });
    }
  }
  
  tooltipsText() { // modifica textos tooltips botones de favorito y retweet
    this.favorited = this.tweet.favorited ? 'Desmarcar de favoritos': 'Marcar como favorito';
    this.retweeted = this.tweet.retweeted ? 'Quitar retweet' : 'Retweet';
  }

  toogle() {// muestra/oculta contenedor del tweet con el texto completo
    $('#' + this.tweet.id_str).slideToggle();
    this.clicked = !this.clicked; // se cambia el estado del boton para mostrar texto "mas" o flecha hacia arriba
  }

  favorite() {
    const Toast = Swal.mixin({ //alerta tipo toast
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 3000
    });
    if (!this.tweet.favorited) {
      this.ts.favorite(this.tweet.id_str).subscribe(
        result => {
          if (result.resp.statusCode == 200 && result.data.favorited) {
            this.tweet.favorited = true; //se marca como favorito si la respuesta es exitosa
            this.tooltipsText();
            Toast.fire({
              type: 'success', title: 'Marcado como favorito...'
            });
          }
          else {
            Toast.fire({ //error si llega una respuesta diferente a la esperada
              type: 'error', title: 'No se pudo marcar como favorito...'
            });
          }
        },
        error => console.log(error)
      );
    }else {
      this.ts.unfavorite(this.tweet.id_str).subscribe(
        result => {
          if (result.resp.statusCode == 200 && !result.data.favorited) {
            this.tweet.favorited = false; //se remueve de favoritos si la respuesta es exitosa
            this.tooltipsText();
            Toast.fire({
              type: 'success', title: 'Removido de favoritos...'
            });
          }
          else {
            Toast.fire({
              type: 'error', title: 'No se pudo remover de favoritos...'
            });
          }
        },
        error => console.log(error)
      );
    }
  }
  retweet() { //metodo para agregar o eliminar un retweet
    const Toast = Swal.mixin({
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 3000
    });
    if (!this.tweet.retweeted) {
      this.ts.retweet(this.tweet.id_str).subscribe(
        result => {
          if (result.resp.statusCode == 200 && result.data.retweeted) {
            this.tweet.retweeted = true;
            this.tooltipsText();
            Toast.fire({
              type: 'success',
              title: 'Retweet...'
            });
          }
          else {
            Toast.fire({
              type: 'error',
              title: 'No se pudo agregar el retweet...'
            });
          }
        },
        error => console.log(error)
      );
    }
    else { //ARREGLAR FUNCION ELIMINAR RETWEETS (CONSULTAR LISTA DE RETWEETS)
      this.ts.destroytweet(this.tweet.id_str).subscribe(
        result => {
          console.log(result);
          // this.tooltipsText();
          // if (result.resp.statusCode == 200 && result.data.retweeted) {
          //   this.tweet.retweeted = true;
          //   Toast.fire({
          //     type: 'success',
          //     title: 'Retweet...'
          //   });
          // }
          // else {
          //   Toast.fire({
          //     type: 'error',
          //     title: 'No se pudo agregar el retweet...'
          //   });
          // }
        },
        error => console.log(error)
      );
    }

  }

}
