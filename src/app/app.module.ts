import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ModalModule } from './modal/modal.module';
import { AppComponent } from './app.component';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        ModalModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
