import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-back-to-top-btn',
  standalone: true,
  imports: [],
  templateUrl: './back-to-top-btn.component.html',
  styleUrl: './back-to-top-btn.component.scss',
})
export class BackToTopBtnComponent implements OnInit {
  // Initialize component properties
  active = false; // Initially set to false, will be true when scroll conditions are met
  items = Array.from({ length: 100 }, (_, i) => `Item ${i + 1}`);  // Example array of items
// OnInit lifecycle hook, called when component initializes
  ngOnInit() {
    this.checkScrollPosition();
  }
// HostListener to listen for scroll events on the window
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.checkScrollPosition();
  }
// Function to check current scroll position and determine if the button should be active
  checkScrollPosition() {
    const scrollPosition = window.scrollY + window.innerHeight;
    const edge = document.documentElement.scrollHeight * 0.8;
    this.active = scrollPosition >= edge && window.scrollY >= 50;
  }
// Function to scroll to the top of the page when the button is clicked
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
