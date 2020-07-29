import { Component } from '@angular/core';

import { ModalService } from './service/modal.service';
import { ModalRef } from './service/modal-ref';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    dialogModal: ModalRef = null;

    constructor(
        protected modalService: ModalService,
    ) {
    }

    openString() {
        if (!this.dialogModal) {
            this.dialogModal = this.modalService.open('TEST string 내용입니다', false, true);
            // 모달 딤드 클릭하여 닫기시
            const dialogModalCloseSubscription = this.dialogModal.closed().subscribe(modalRef => {
                this.dialogModal = null;
                dialogModalCloseSubscription.unsubscribe();
            });
        }
    }
}
