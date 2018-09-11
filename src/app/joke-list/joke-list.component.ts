import { Component, OnInit } from '@angular/core';
import { merge, Observable, Subject } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';
import { Joke, JokeService } from '../joke.service';

@Component({
  selector: 'app-joke-list',
  templateUrl: './joke-list.component.html',
  styleUrls: ['./joke-list.component.css']
})
export class JokeListComponent implements OnInit {
  jokes$: Observable<Array<Joke>>;
  update$ = new Subject<void>();
  constructor(private jokeService: JokeService) { }

  ngOnInit() {
    const initialJokes$ = this.getDataOnce();

    const updates$ =  this.update$.pipe(
      mergeMap(() => this.getDataOnce())
    );

    this.jokes$ = merge(initialJokes$ , updates$);
  }


  getDataOnce(){
   return this.jokeService.jokes.pipe(take(1));
  }
}
