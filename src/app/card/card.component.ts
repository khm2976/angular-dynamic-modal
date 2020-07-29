import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css']
})
export class CardComponent {
    @Input() point = 0;
    @Output() clickHeart = new EventEmitter<any>();

    clickHeartItem() {
        this.clickHeart.emit();
    }
}
