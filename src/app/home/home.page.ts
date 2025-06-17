import { Component, inject } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  // IonLabel,
  // IonSegmentButton,
  // IonSegment
} from '@ionic/angular/standalone';

import { NgFor } from '@angular/common';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonGrid,
    IonRow,
    IonCol,
    IonIcon,
    NgFor,
    // IonLabel,
    // IonSegmentButton,
    // IonSegment
  ],
})
export class HomePage {

  private pokemonService = inject(PokemonService);
  segmentValue = 'all';

  pokemons: any[] = [];
  offset = 0;
  limit = 20;
  favorites: Set<string> = new Set();
  constructor() {}

    ngOnInit() {
    this.loadFavorites();
    this.loadPokemons();
  }

  loadPokemons() {
    this.pokemonService.getPokemons(this.offset, this.limit).subscribe(res => {
      this.pokemons = res.results.map((poke: any) => {
        const id = this.extractId(poke.url);
        return {
          name: poke.name,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
          id,
        };
      });
    });
  }

  extractId(url: string): number {
    const match = url.match(/\/pokemon\/(\d+)\//);
    return match ? +match[1] : 0;
  }

  nextPage() {
    this.offset += this.limit;
    this.loadPokemons();
  }

  prevPage() {
    if (this.offset >= this.limit) {
      this.offset -= this.limit;
      this.loadPokemons();
    }
  }

  toggleFavorite(name: string) {
    if (this.favorites.has(name)) {
      this.favorites.delete(name);
    } else {
      this.favorites.add(name);
    }
    this.saveFavorites();
  }

  isFavorite(name: string): boolean {
    return this.favorites.has(name);
  }

  saveFavorites() {
    localStorage.setItem('favorites', JSON.stringify(Array.from(this.favorites)));
  }

  loadFavorites() {
    const saved = localStorage.getItem('favorites');
    if (saved) {
      this.favorites = new Set(JSON.parse(saved));
    }
  }
}
