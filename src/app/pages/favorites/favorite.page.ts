import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SegmentHeaderComponent } from '../../components/segment-header.component';
import { PokemonService } from '../../services/pokemon.service';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';

import {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonGrid,
    IonRow,
    IonCol,
    IonSegment,
    IonSegmentButton,
    IonLabel
} from '@ionic/angular/standalone';

@Component({
    selector: 'app-favorites',
    templateUrl: 'favorite.page.html',
    styleUrls: ['favorite.page.scss'],
    standalone: true,
    imports: [
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        IonCard,
        IonCardHeader,
        IonCardTitle,
        IonGrid,
        IonRow,
        IonCol,
        NgFor,
        NgIf,
        IonSegment,
        IonSegmentButton,
        IonLabel,
        FormsModule,
        SegmentHeaderComponent
    ],
})
export class FavoritesPage {
    private pokemonService = inject(PokemonService);
    favorites: any[] = [];

    constructor(private router: Router){}

    async ngOnInit() {
        this.loadFavoritePokemons();
    }

    segmentValue = 'favorites';

    segmentChanged(event: any) {
        const value = event.detail.value;
        if (value === 'all') {
            this.router.navigateByUrl('/home');
        }
    }

    async loadFavoritePokemons() {
        const saved = localStorage.getItem('favorites');
        if (!saved) return;

        const names = JSON.parse(saved) as string[];
        this.favorites = [];

        for (const name of names) {
            const poke = await this.pokemonService.getPokemonDetails(name).toPromise();
            this.favorites.push({
                name: poke.name,
                image: poke.sprites.front_default,
                id: poke.id,
            });
        }
    }
}
