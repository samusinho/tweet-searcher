import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { TwitterService } from '../services/twitter.service';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  word: string = '';
  @Output() search = new EventEmitter<string>();

  constructor(private ts: TwitterService) { }

  ngOnInit() {
    $('#text').on('keyup', (e) => {
      if (e.keyCode == 13) this.searchTweets();
    });
  }

  isEmpty() {
    return this.word.length <= 0;
  }
  isWrong() {
    console.log(this.word.indexOf('#'), this.word.indexOf('@'))
    return false//this.word.indexOf('#') == -1 || this.word.indexOf('@') == -1;
  }
  searchTweets () {
    if (this.isEmpty()) Swal.fire({ type: 'warning', title: 'Campo vacio...', text: 'Debes escribir algo!' });
    else if (this.isWrong()) Swal.fire({ type: 'warning', 
                                         title: 'Texto con errores...', 
                                         text: `El texto de busqueda no puede contener "@" o "#"!` });
    else this.search.emit(this.word);
  }
}