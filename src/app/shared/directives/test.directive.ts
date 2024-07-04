import { Directive, ElementRef, HostListener, Input, NgZone, Renderer2 } from '@angular/core';
interface Boundary {
  top: number;
  right: number;
  bottom: number;
  left: number;
}
@Directive({
  selector: '[appTest]',
  standalone: true
})
export class TestDirective {


  @Input('appTest') padding?: string;
  @Input() condition: boolean = true; // Example conditional input

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    if (this.condition) {
      this.setPadding(this.padding || '0');
    } else {
      // Optionally handle the case when condition is false
      this.setPadding('0');
    }
  }

  private setPadding(padding: string) {
    this.renderer.setStyle(this.el.nativeElement, 'padding', padding);
  }



}
