import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ModalModule } from './modal/modal.module';
import { ModalComponent } from './modal/modal.component';
import { ModalService } from './service/modal.service';
import { AppComponent } from './app.component';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        ModalModule
    ],
    providers: [
        ModalService,
    ],
    bootstrap: [AppComponent],
    entryComponents: [
        ModalComponent,     // 동적으로 추가 될 컴포넌트는 entryComponents에 추가
    ]
})
export class AppModule { }
