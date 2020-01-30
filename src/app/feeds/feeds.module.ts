import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedsRoutingModule } from './feeds-routing.module';
import { FeedsComponent } from './feeds.component';
import { HeaderComponent } from './header/header.component';
import { PostsComponent } from './posts/posts.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [FeedsComponent, HeaderComponent, PostsComponent],
  imports: [
    CommonModule,
    FeedsRoutingModule,
    FormsModule
  ]
})
export class FeedsModule { }
