// Component do header (navbar)

import { Component, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonToolbar,
  IonHeader
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-segment-header',
  standalone: true,
  imports: [
    CommonModule,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonToolbar,
    IonHeader,
    FormsModule
  ],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-segment [(ngModel)]="segmentValue" (ionChange)="onSegmentChange($event)">
          <ion-segment-button value="all">
            <ion-label>Todos</ion-label>
          </ion-segment-button>
          <ion-segment-button value="favorites">
            <ion-label>Favoritos</ion-label>
          </ion-segment-button>
        </ion-segment>
      </ion-toolbar>
    </ion-header>
  `,
})
export class SegmentHeaderComponent implements OnDestroy {
  segmentValue = 'all';  // Inicializa como 'all'
  private routeSub: Subscription;

  constructor(private router: Router) {
    this.routeSub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateSegmentValue(event.urlAfterRedirects);  // Atualiza valor do segmento
      }
    });
  }

  updateSegmentValue(url: string) {
    console.log('URL atual: ', url);
    if (url.includes('/favorites')) {
      setTimeout(() => {
        this.segmentValue = 'favorites';
      }, 0);
    } else {
      setTimeout(() => {
        this.segmentValue = 'all';
      }, 0);
    }
  }

  onSegmentChange(event: any) {
    const value = event.detail.value;
    if (value === 'favorites') {
      this.router.navigateByUrl('/favorites');
    } else {
      this.router.navigateByUrl('/home');
    }
  }

  ngOnDestroy() {
    this.routeSub?.unsubscribe();
  }
}
