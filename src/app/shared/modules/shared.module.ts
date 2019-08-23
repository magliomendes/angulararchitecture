import { ToastComponent } from './../components/toast/toast.component';
import { StorageService } from './../services/storage.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ToastService } from '../services';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule
    ],
    exports: [
        ToastComponent
    ],
    declarations: [
        ToastComponent
    ],
    providers: [
        ToastService
    ]
})

export class SharedModule { }
