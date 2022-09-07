import { NgModule } from '@angular/core';

import { MenuItems } from './menu-items/menu-items';
import { HorizontalMenuItems } from './menu-items/horizontal-menu-items';

import { AccordionAnchorDirective, AccordionLinkDirective, AccordionDirective } from './accordion';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CustomMaterialModule } from './custom-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { SnackbarComponent } from './snackbar.component/snackbar.component.component';
// import { CustomJavaDatePipe } from '../core/_helpers/custom-java-date-pipe';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';
import { SpinnerOverlayComponent } from './spinner-overlay/spinner-overlay.component';
import { ConfirmationDialog } from './confirmation-dialog/confirmation-dialog.component';
import { FullComponent } from '../layouts/full/full.component';
import { VerticalAppHeaderComponent } from '../layouts/full/vertical-header/vertical-header.component';
import { SpinnerComponent } from './spinner.component';
import { AppBlankComponent } from '../layouts/blank/blank.component';
import { VerticalAppSidebarComponent } from '../layouts/full/vertical-sidebar/vertical-sidebar.component';
import { AppBreadcrumbComponent } from '../layouts/full/breadcrumb/breadcrumb.component';
import { HorizontalAppHeaderComponent } from '../layouts/full/horizontal-header/horizontal-header.component';
import { HorizontalAppSidebarComponent } from '../layouts/full/horizontal-sidebar/horizontal-sidebar.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Base64ImagePipe, CustomJavaDatePipe } from '../core/_helpers';
// import { Base64ImagePipe } from '../core/_helpers/base64-image-pipe';
// import { LoginLayoutComponent } from './layout/login-layout/login-layout.component';
// import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
// import { MenuListItemComponent } from './layout/menu-list-item/menu-list-item.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    CustomMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TextMaskModule,
    PerfectScrollbarModule,

  ],
  declarations: [
    // SpinnerComponent,
    AlertDialogComponent,
    SpinnerOverlayComponent,
    ConfirmationDialog,
    // LoginLayoutComponent,
    // MainLayoutComponent,
    SnackbarComponent,
    // MenuListItemComponent,
    CustomJavaDatePipe,
    Base64ImagePipe,
    AccordionAnchorDirective, AccordionLinkDirective, AccordionDirective,
    // FullComponent,
    // VerticalAppHeaderComponent,
    // SpinnerComponent,
    // AppBlankComponent,
    // VerticalAppSidebarComponent,
    // AppBreadcrumbComponent,
    // HorizontalAppHeaderComponent,
    // HorizontalAppSidebarComponent,
  ],
  exports: [FormsModule,
    ReactiveFormsModule,
    CustomMaterialModule,
    SnackbarComponent,
    TextMaskModule,
    CustomJavaDatePipe,
    Base64ImagePipe,
    AccordionAnchorDirective, AccordionLinkDirective, AccordionDirective,
    PerfectScrollbarModule,
    FlexLayoutModule
  ],
  providers: [MenuItems, HorizontalMenuItems,Base64ImagePipe],
})
export class SharedModule { }
