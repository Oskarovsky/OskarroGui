import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NavigationComponent} from "./navigation/navigation.component";
import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatListModule} from "@angular/material/list";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {FormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {MatTableModule} from "@angular/material/table";
import {MatTabsModule} from "@angular/material/tabs";
import {MatSortModule} from "@angular/material/sort";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MenuListItemComponent} from "./navigation/menu-list-item/menu-list-item.component";
import {SidebarRightComponent} from "./sidebar/sidebar-right/sidebar-right.component";
import {FooterComponent} from "./footer/footer.component";
import {AlertComponent} from "./alert/alert.component";
import {HomeComponent} from "./home/home.component";
import {CKEditorModule} from "ng2-ckeditor";
import {AddPostComponent} from "./article/add-post/add-post.component";
import {PostComponent} from "./article/post/post.component";
import {PlaylistFilterPipe} from "./services/playlist/playlist-filter.pipe";
import {PostDetailsComponent} from "./article/post-details/post-details.component";



@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    SidebarRightComponent,
    FooterComponent,
    AlertComponent,
    HomeComponent,
    MenuListItemComponent,

    AddPostComponent,
    PostComponent,
    PostDetailsComponent,

    PlaylistFilterPipe
  ],
  imports: [
    AppRoutingModule,
    NoopAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,

    /* region MATERIAL ANGULAR */
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    MatSelectModule,
    MatTableModule,
    MatTabsModule,
    MatSortModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatSidenavModule,
    /* endregion */

    CKEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
