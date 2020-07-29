import {
    ApplicationRef,
    ComponentFactoryResolver,
    ComponentFactory,
    Injector,
    Injectable,
    TemplateRef,
    Type,
} from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { ModalRef, ModalConfig } from './modal-ref';

type Content<T> = string | TemplateRef<T> | Type<T>;
@Injectable()
export class ModalService {
    modalComponentRefs = [];
    count = 0;
    constructor(
        private appRef: ApplicationRef,
        private resolver: ComponentFactoryResolver,
        private injector: Injector,
    ) {
    }

    open(content: any, isFullCoverContent = false, isClickedOverlayForClose = true, config?: any, context?: any) {
        const modalRef = this.generateComponent(
            content,
            isFullCoverContent,
            isClickedOverlayForClose,
            config ? config : {},
            context ? context : null
        );
        this.appendView(modalRef.componentRef);
        this.addCompenentRef(modalRef);
        modalRef.closeSubscription = modalRef.closed().subscribe(ref => this.close(ref));
        return modalRef;
    }

    generateComponent(content: any, isFullCoverContent: boolean, isClickedOverlayForClose: boolean, config: any, context: any) {
        const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(ModalComponent);
        const ngContent = this.resolveNgContent(content, config, context);
        const componentRef = factory.create(this.injector, ngContent.nodes);
        componentRef.instance.isFullCover = isFullCoverContent;
        const modalConfig: ModalConfig = {
            id: `modal-${this.count++}`,
            isClickedOverlayForClose: isClickedOverlayForClose
        };
        return new ModalRef(componentRef, ngContent.innerContent, modalConfig);
    }

    appendView(componentRef) {
        componentRef.hostView.detectChanges();
        this.appRef.attachView(componentRef.hostView);
        document.body.appendChild(componentRef.location.nativeElement);
    }

    resolveNgContent(content: Content<any>, config?: any, context?: any): {innerContent: any, nodes: any[][]} {
        if (typeof content === 'string') {
            const element = document.createTextNode(content);
            return {
                innerContent: element,
                nodes: [[element]]
            };
        } else if (content instanceof TemplateRef) {
            const ctx = { $implicit: context };
            const viewRef = content.createEmbeddedView(ctx);
            this.appRef.attachView(viewRef);
            return {
                innerContent: viewRef,
                nodes: [viewRef.rootNodes]
            };
        } else if (content instanceof Type) {
            const factory = this.resolver.resolveComponentFactory(content);
            const componentRef = factory.create(this.injector);
            Object.keys(config).forEach(key => {
                componentRef.instance[key] = config[key];
            });
            this.appRef.attachView(componentRef.hostView);
            return {
                innerContent: componentRef,
                nodes: [[componentRef.location.nativeElement]]
            };
        } else {
        }
    }

    addCompenentRef(comp) {
        this.modalComponentRefs.push(comp);
    }

    close(ref: ModalRef) {
        const index = this.modalComponentRefs.findIndex(list => list.id === ref.id);
        const modalRef = this.modalComponentRefs[index];

        if (modalRef.closeSubscription) {
            modalRef.closeSubscription.unsubscribe();
        }
        if (modalRef.componentRef) {
            this.appRef.detachView(modalRef.componentRef.hostView);
            modalRef.componentRef.destroy();
        }
        this.modalComponentRefs.splice(index, 1);
    }

    closeAll() {
        this.modalComponentRefs.forEach(modalRef => {
            if (modalRef.closeSubscription) {
                modalRef.closeSubscription.unsubscribe();
            }
            if (modalRef.componentRef) {
                this.appRef.detachView(modalRef.componentRef.hostView);
                modalRef.componentRef.destroy();
            }
        });
        this.modalComponentRefs = [];
    }
}
