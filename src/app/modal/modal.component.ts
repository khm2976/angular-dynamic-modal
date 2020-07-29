import { Component, AfterViewInit, Input, Output, EventEmitter, ElementRef, Renderer2 } from '@angular/core';

/**
 * 모달 레이어 컨테이너로 사용될 컴포넌트
 */
@Component({
    selector: 'app-modal',
    templateUrl: 'modal.component.html',
    styleUrls: ['modal.component.css'],
})
export class ModalComponent implements AfterViewInit {
    @Output() open = new EventEmitter<any>();
    @Output() close = new EventEmitter<any>();
    @Input() isFullCover = false;

    constructor(
        private el: ElementRef,
        private renderer: Renderer2,
    ) {
    }

    ngAfterViewInit() {
        this.open.emit();
    }

    clickOverlay() {
        this.close.emit();
    }

    // container 에 커스텀하게 클래스 추가
    addClass(className: string) {
        this.renderer.addClass(this.el.nativeElement, className);
    }

    // container 에 커스텀 클래스 제거
    removeClass(className: string) {
        this.renderer.removeClass(this.el.nativeElement, className);
    }

    // 딤드 영역 아래로 클릭 되지 않도록 처리
    touchMoveOverlay(event) {
        event.preventDefault();
        event.stopPropagation();
    }
}
