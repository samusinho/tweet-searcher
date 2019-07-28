import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import Swal from 'sweetalert2';
import { TwitterService } from '../services/twitter.service';
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
    return false;
  }
  searchTweets () {
    if (this.isEmpty()) Swal.fire({ type: 'error', title: 'Campo vacio...', text: 'Debes escribir algo!' });
    else if (this.isWrong()) Swal.fire({ type: 'error', 
                                         title: 'Texto con errores...', 
                                         text: 'El texto de busqueda no puede contener @ o #!' });
    else this.search.emit(this.word);
  }
}
