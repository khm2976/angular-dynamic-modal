import { Component, ViewChild, TemplateRef } from '@angular/core';

import { ModalService } from './service/modal.service';
import { ModalRef } from './service/modal-ref';

import { CardComponent } from './card/card.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    @ViewChild('tmplFullView', {read: TemplateRef}) modalDialogFullView: TemplateRef<any>;
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

    // 모달 딤드 닫기 처리 안되도록
    openTemplateNoOverlay() {
        if (!this.dialogModal) {
            this.dialogModal = this.modalService.open(this.modalDialogView, false, false);
            // 모달 딤드 클릭하여 닫기시
            const dialogModalCloseSubscription = this.dialogModal.closed().subscribe(modalRef => {
                this.dialogModal = null;
                dialogModalCloseSubscription.unsubscribe();
            });
        }
    }

    // 컨텐츠를 모달로 풀로 띄우기
    openTemplateFull() {
        if (!this.dialogModal) {
            this.dialogModal = this.modalService.open(this.modalDialogFullView, true, true);
            // 모달 딤드 클릭하여 닫기시
            const dialogModalCloseSubscription = this.dialogModal.closed().subscribe(modalRef => {
                this.dialogModal = null;
                dialogModalCloseSubscription.unsubscribe();
            });
        }
    }

    openComponent() {
        const cardModalRef = this.modalService.open(CardComponent, false, true, {point: 5});
        // cardComponent Output 이벤트 받기
        const cardComp = cardModalRef.innerContent.instance;
        // 카드 컴포넌트에서 이벤트 받기
        // TODO: 이벤트 받아오는 부분
        cardComp.clickHeart.subscribe(() => {
            alert('하트 클릭')
            // this.modalService.close(cardModalRef)
        });
    }

    // 동적 생성된 뷰에서 모달 컨테이너 닫기 처리
    clickClose() {
        if (this.dialogModal) {
            this.modalService.close(this.dialogModal);
            this.dialogModal = null;
        }
    }
}
