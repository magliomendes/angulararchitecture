import { AppInitializeModule } from './app-initialize.module';
import { CoreModule } from '@shared/modules/core.module';
import { AuthGuard } from '@shared/guards/auth.guard';
import { RouterModule } from '@angular/router';
import { AuthService } from '@app/shared/services/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { SharedModule } from '@shared/modules';
import { routing } from './app.routing';
''
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppInitializeModule,
    BrowserModule,
    routing,
    BrowserAnimationsModule,
    SharedModule,
    RouterModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
