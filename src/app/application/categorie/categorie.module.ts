import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategorieRoutingModule } from './categorie-routing.module';
import {SharedModule} from '../../_shared/shared.module';
import { ContainerCategoriesComponent } from './components/container-categories/container-categories.component';
import { ListCategoriesComponent } from './components/list-categories/list-categories.component';
import { FormAddEditCategoriesComponent } from './components/form-add-edit-categories/form-add-edit-categories.component';
import { HeaderCategoriesComponent } from './components/header-categories/header-categories.component';


@NgModule({
  declarations: [ContainerCategoriesComponent, ListCategoriesComponent, FormAddEditCategoriesComponent, HeaderCategoriesComponent],
  imports: [
    CommonModule,
    CategorieRoutingModule,
    SharedModule
  ]
})
export class CategorieModule { }
