import { Component, OnInit } from '@angular/core';
import { TwitterService } from './services/twitter.service';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  constructor (private ts: TwitterService) {}
  ngOnInit() {
    this.initInfiniteScroll();
    this.ts.getTweets().subscribe(
      tweets => {
        this.resetAll();
        this.setResultText('Tweets recientes...');
        this.makePagination(tweets.data);
        this.addToResults(this.page.toString());
      },
      error => console.log(error)
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
        this.addToResults(this.page.toString());
      }
    });
  }

  resetAll() { //reset variables paginacion y posicion del scroll
    $(window).scrollTop(0);
    this.page = 1;
    this.pagination = {};
    this.tweets = [];
    this.endOfResults = false;
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

  addToResults(index_: string) {
    if (this.pagination.hasOwnProperty(index_)) {
      this.endOfResults = false;
      for (let i of this.pagination[index_]) this.tweets.push(i);
    }
    else this.endOfResults = true;
  }

  searchTweets(word: string) {
    this.ts.searchTweets(word).subscribe(
      tweets => {
        if (tweets.data.statuses.length <= 0) {
          Swal.fire({ type: 'error', 
                      title: 'Sin resultados...', 
                      text: `No se encontraron resultados para "${word}"...` });
          this.infoText = '';
        }else {
          this.resetAll();
          this.setResultText(`Resultados para "${word}"...`);
          this.makePagination(tweets.data.statuses);
          this.addToResults(this.page.toString());
        }
      },
      error => console.log(error)
    );
  }
}