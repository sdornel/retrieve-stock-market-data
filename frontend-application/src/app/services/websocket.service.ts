import { Injectable } from '@angular/core';
import { Observable, map, of, pipe, timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private firstCallTime: number | null = null;

  constructor() {}

  trackTimeToNonpingResponse() {
    // return timer(6000).pipe(map(() => true));
    const now = Date.now();

    // If this is the first call, record the time and return false.
    if (this.firstCallTime === null) {
      this.firstCallTime = now;
      // Using timer to simulate immediate return of false
      // This is important for consistency in return type (Observable).
      return timer(0).pipe(map(() => false));
    }

    const elapsedSinceFirstCall = now - this.firstCallTime;
    if (elapsedSinceFirstCall >= 6000) {
      this.firstCallTime = null;
      // If 6 seconds have already elapsed since the first call, return true.
      return of(true);
    } else {
      this.firstCallTime = null;
      // If it hasn't been 6 seconds yet, wait the remaining time before returning true.
      return of(false);
    }
  }

  // I need to see if this function is even necessary.
  // At the very least it needs to be refactored.
  isMarketClosed(): boolean {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    console.log(currentHour, currentMinute);
    // Returns true if it is later than 17:00 or earlier than 9:30
    // somehow trades still happen after 16:30
    return (currentHour > 17 || (currentHour <= 9 && currentMinute < 30));
  }
}