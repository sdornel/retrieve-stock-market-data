import { Injectable } from '@angular/core';
import { Observable, map, of, pipe, timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  firstCallTime: number | null = null;

  constructor() {}

  trackTimeToNonpingResponse(): Observable<boolean> {
    const now = Date.now();

    // If this is the first call, record the time and return false.
    if (this.firstCallTime === null) {
      this.firstCallTime = now;
      // Using timer to simulate immediate return of false
      // This is important for consistency in return type (Observable).
      return timer(0).pipe(map(() => false));
    }

    const elapsedSinceFirstCall = now - this.firstCallTime;
    if (elapsedSinceFirstCall >= 4000) {
      this.firstCallTime = null;
      return of(true);
    } else {
      this.firstCallTime = null;
      return of(false);
    }
  }
}