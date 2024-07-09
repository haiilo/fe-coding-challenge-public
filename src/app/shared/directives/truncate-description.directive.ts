import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  Input
} from '@angular/core';

@Directive({
  selector: '[appTruncateDescription]',
})
export class TruncateDescriptionDirective implements AfterViewInit {
  @Input() maxLines: number = 3;
  private originalText: string = '';

  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    this.originalText = this.el.nativeElement.innerText;
    this.truncateText();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.truncateText();
  }

  private truncateText(): void {
    const element = this.el.nativeElement;
    const computedStyle = getComputedStyle(element);
    const lineHeight = parseFloat(computedStyle.lineHeight);
    const maxHeight = lineHeight * this.maxLines;

    element.innerText = this.originalText;
    const originalText = this.originalText;

    if (this.fitsWithinHeight(element, maxHeight)) {
      return;
    }

    let low = 0;
    let high = originalText.length;
    let mid = 0;

    while (low < high) {
      mid = Math.floor((low + high) / 2);
      element.innerText = originalText.slice(0, mid) + '...';
      if (this.fitsWithinHeight(element, maxHeight)) {
        low = mid + 1;
      } else {
        high = mid;
      }
    }

    element.innerText = originalText.slice(0, low - 1) + '...';
  }

  private fitsWithinHeight(element: HTMLElement, maxHeight: number): boolean {
    return element.scrollHeight <= maxHeight;
  }
}
