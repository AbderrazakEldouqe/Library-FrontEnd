import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LanguageRoutingModule } from './language-routing.module';
import {SharedModule} from '../../_shared/shared.module';
import { ContainerLanguagesComponent } from './components/container-languages/container-languages.component';
import { ListLanguagesComponent } from './components/list-languages/list-languages.component';
import { FormAddEditLanguagesComponent } from './components/form-add-edit-languages/form-add-edit-languages.component';
import { HeaderLanguagesComponent } from './components/header-languages/header-languages.component';


@NgModule({
  declarations: [ContainerLanguagesComponent, ListLanguagesComponent, FormAddEditLanguagesComponent, HeaderLanguagesComponent],
  imports: [
    CommonModule,
    LanguageRoutingModule,
    SharedModule
  ]
})
export class LanguageModule { }
