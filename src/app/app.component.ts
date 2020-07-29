import { Component, ViewChild, TemplateRef } from '@angular/core';

import { ModalService } from './service/modal.service';
import { ModalRef } from './service/modal-ref';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    @ViewChild('tmplDialogView', {read: TemplateRef}) modalDialogView: TemplateRef<any>;
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

    openTemplate() {
        if (!this.dialogModal) {
            this.dialogModal = this.modalService.open(this.modalDialogView, false, true);
            // 모달 딤드 클릭하여 닫기시
            const dialogModalCloseSubscription = this.dialogModal.closed().subscribe(modalRef => {
                this.dialogModal = null;
                dialogModalCloseSubscription.unsubscribe();
            });
        }
    }

    // 동적 생성된 뷰에서 모달 컨테이너 닫기 처리
    clickClose() {
        if (this.dialogModal) {
            this.modalService.close(this.dialogModal);
            this.dialogModal = null;
        }
    }
}
