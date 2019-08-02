import { Component, OnInit } from '@angular/core';
import { TwitterService } from './services/twitter.service';
import { AlertService } from './services/alert.service';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  constructor (private ts: TwitterService, private _alert: AlertService) {}
  ngOnInit() {
    this.initInfiniteScroll();
    this.ts.getTweets().subscribe(
      tweets => {
        if (!tweets.error) {
          if (tweets.data.length > 0) {
            this.resetAll();
            this.setResultText('Tweets recientes...');
            this.makePagination(tweets.data);
            this.addToResults(this.page);
          }
        }
      }
    );
  }
  tweets: any[] = [];
  endOfResults: boolean = false;
  pagination = {};
  page: number = 1;
  infoText: string = '';

  initInfiniteScroll() {
    $(window).scroll(() => {
      if ($(window).scrollTop() >= $('body').height() - $(window).height() - 15) {
        this.page++;
        this.addToResults(this.page);
      }
    });
  }

  resetAll() { //reset variables paginacion y posicion del scroll
    $(window).scrollTop(0);
    this.page = 1;
    this.pagination = {};
    this.tweets = [];
    this.endOfResults = false;
    this.setResultText('');
  }

  setResultText(text: string) {
    this.infoText = text; //establece el texto de acuerdo a la busqueda
  }

  //buscador estandar no soporta paginacion con cursores, por tanto se arma la paginacion en esta funcion
  makePagination(results: any[]) {
    let page = 0, aux = 0;
    for (let i = 9; i<= results.length; i = i + 9) {
      page++;
      this.pagination[page] = [];
      for (let j = aux; j < i; j++) this.pagination[page].push(results[j]);
      aux = i;
    }
  }

  addToResults(index_: number) {
    if (this.pagination.hasOwnProperty(index_.toString())) {
      this.endOfResults = false;
      for (let i of this.pagination[index_]) this.tweets.push(i);
    }
    else this.endOfResults = true;
  }

  searchTweets(word: string) {
    this.ts.searchTweets(word).subscribe(
      tweets => {
        if(!tweets.error) {
          if (tweets.data.length <= 0) {
            this._alert.infoAlert('Sin resultados...', `No se encontraron resultados para "${word}"...`);
            this.resetAll();
          }else {
            this.resetAll();
            this.setResultText(`Resultados para "${word}"...`);
            this.makePagination(tweets.data);
            this.addToResults(this.page);
          }
        }
      }
    );
  }

  deleteTweet(id: string) {
    let index = -1;
    for (let [i,j] of this.tweets.entries()) {
      if (id == j.id_str) {
        index = i;
        break;
      }
    }
    if (index > -1) {
      setTimeout(() => {
        this.tweets.splice(index, 1);
      },3000);
    }
  }
}