import { Injectable } from '@angular/core';
import { Observable, map, of, pipe, timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private firstCallTime: number | null = null;

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
    if (elapsedSinceFirstCall >= 5000) {
      this.firstCallTime = null;
      // If 6 seconds have already elapsed since the first call, return true.
      return of(true);
    } else {
      this.firstCallTime = null;
      // If it hasn't been 6 seconds yet, wait the remaining time before returning true.
      return of(false);
    }
  }
}