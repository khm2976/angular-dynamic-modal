import { Subject, Observable, BehaviorSubject, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

export interface ModalConfig {
    id: string;
    isClickedOverlayForClose: boolean;
}

export class ModalRef {
    closeModal$: Subject<ModalRef> = new Subject();
    openModal$: BehaviorSubject<ModalRef> = new BehaviorSubject(null);
    closeSubscription: Subscription = null;
    private mdId: string;

    constructor(
        private mdComponentRef: any,
        private mdInnerContent: any,
        private modalConfig: ModalConfig
    ) {
        this.mdId = this.modalConfig.id;
        if (this.modalConfig.isClickedOverlayForClose) {
            const closeSubscription = this.mdComponentRef.instance.close
            .pipe(take(1))
            .subscribe(data => {
                this.closeModal$.next(this);
            });
        }

        const openSubscription = this.mdComponentRef.instance.open
            .pipe(take(1))
            .subscribe(data => {
                this.openModal$.next(this);
            });
    }

    closed(): Observable<ModalRef> {
        return this.closeModal$.asObservable();
    }

    opened(): Observable<ModalRef> {
        return this.openModal$.asObservable();
    }

    get componentRef() {
        return this.mdComponentRef;
    }

    get innerContent() {
        return this.mdInnerContent;
    }

    get id() {
        return this.mdId;
    }
}
