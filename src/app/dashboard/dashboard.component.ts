import { Component, OnInit, Inject } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

import { TransferState, makeStateKey } from '@angular/platform-browser';

const HEROES_KEY = makeStateKey('heroes');

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(
    private heroService: HeroService,
    private state: TransferState,
    @Inject('cookies') private cookies: any,
  ) { }

  ngOnInit() {
    console.log('cookies: ', this.cookies);
    this.heroes = this.state.get(HEROES_KEY, null as any);
    if (!this.heroes) {
      this.getHeroes();
    }
  }

  getHeroes(): void {
    this.heroService.getHeroes()
    .subscribe(heroes => {
      this.heroes = heroes.slice(1, 5);
      this.state.set(HEROES_KEY, heroes.slice(1, 5));
    });
  }
}
