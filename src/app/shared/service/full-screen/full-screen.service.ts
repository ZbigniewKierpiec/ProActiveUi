import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FullScreenService {
  // Method to toggle full-screen mode
  toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }
}
