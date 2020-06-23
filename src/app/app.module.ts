import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
// Material
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSelectModule} from '@angular/material/select';
// Stories
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {StoryComponent} from './story/story.component';

@NgModule({
  declarations: [
    AppComponent,
    StoryComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatListModule,
    MatExpansionModule,
    MatTabsModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatSelectModule,
    MatSidenavModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
