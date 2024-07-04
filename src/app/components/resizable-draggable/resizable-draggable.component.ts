import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-resizable-draggable',
  templateUrl: './resizable-draggable.component.html',
  styleUrls: ['./resizable-draggable.component.scss'],
})
export class ResizableDraggableComponent implements OnInit {
  @ViewChild('elementRef') elem!: ElementRef;
  @Input() class: string = '';
  @Input() data: any;
  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    if (!this.elem) {
      console.error('Element  not available.');
      return;
    }

    const element = this.elem.nativeElement;

    this.renderer.listen(
      element,
      'mousedown',
      this.mutable.bind(this, element)
    );
  }

  mutable(element: HTMLElement, e: MouseEvent): void {
    e.preventDefault();

    const h = element.offsetHeight;
    const w = element.offsetWidth;
    const t = element.offsetTop;
    const l = element.offsetLeft;
    const y = t + h - e.pageY;
    const x = l + w - e.pageX;

    const hasMoved = () =>
      !(t === element.offsetTop && l === element.offsetLeft);
    const hasResized = () =>
      !(w === element.offsetWidth && h === element.offsetHeight);

    const boundary = {
      top: 0,
      left: 0,
      right: window.innerWidth - w, // Adjust as needed
      bottom: window.innerHeight - h, // Adjust as needed
    };

    const follow = (e: MouseEvent) => {
      let newTop = e.pageY + y - h;
      let newLeft = e.pageX + x - w;

      // Boundary checks
      newTop = Math.max(boundary.top, Math.min(boundary.bottom, newTop));
      newLeft = Math.max(boundary.left, Math.min(boundary.right, newLeft));

      this.renderer.setStyle(element, 'top', `${newTop}px`);
      this.renderer.setStyle(element, 'left', `${newLeft}px`);
    };

    const resize = (e: MouseEvent) => {
      let newWidth = e.pageX - l + x;
      let newHeight = e.pageY - t + y;

      // Boundary checks
      newWidth = Math.min(window.innerWidth - l, newWidth);
      newHeight = Math.min(window.innerHeight - t, newHeight);

      this.renderer.setStyle(element, 'width', `${newWidth}px`);
      this.renderer.setStyle(element, 'height', `${newHeight}px`);
    };

    const unresize = (e: MouseEvent) => {
      document.removeEventListener('mousemove', resize);
      document.removeEventListener('mouseup', unresize);
    };

    const unfollow = (e: MouseEvent) => {
      document.removeEventListener('mousemove', follow);
      document.removeEventListener('mouseup', unfollow);
    };

    if (x > 12 && y > 12) {
      document.addEventListener('mousemove', follow);
      document.addEventListener('mouseup', unfollow);
    } else {
      document.addEventListener('mousemove', resize);
      document.addEventListener('mouseup', unresize);
    }
  }

  ngOnInit(): void {}
}
