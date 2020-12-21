import {Component, OnDestroy, OnInit} from '@angular/core';
import {SubSink} from 'subsink';
import {NotificationService} from '../../../../_core/services/notification.service';
import {Language} from '../../../../_core/models/language';
import {LanguageService} from '../../services/language.service';
import {JsService} from '../../../../_core/services/js.service';

@Component({
  selector: 'app-container-languages',
  templateUrl: './container-languages.component.html',
  styleUrls: ['./container-languages.component.css']
})
export class ContainerLanguagesComponent implements OnInit, OnDestroy {

  private subs = new SubSink();
  languages: Language[] = [];
  formIsShow = false;
  selectedLanguage: Language = null;

  constructor(private languageService: LanguageService,
              private notification: NotificationService,
              private jsService: JsService) {
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.subs.add(
      this.languageService.getAll().subscribe((res: Language[]) => {
        this.languages = res;
      })
    );
  }

  showForm(): void {
    this.formIsShow = true;
  }

  backToList(): void {
    this.selectedLanguage = null;
    this.formIsShow = false;
  }

  store(language: Language): void {
    this.subs.add(
      this.languageService.create(language).subscribe((res: Language) => {
        this.handleResponseStore(res);
      })
    );
  }

  handleResponseStore(data: Language): void {
    this.languages = this.jsService.spread(this.languages, data);
    this.notification.success('Language bien crée !', 'bien crée !');
    this.formIsShow = false;
  }


  edit(language: Language): void {
    this.selectedLanguage = this.jsService.objectAssign(language);
    this.showForm();
  }

  update(language: Language): void {
    const id = language.id;
    language = this.jsService.deleteElementFromObjectByKey(language, 'id');
    this.subs.add(
      this.languageService.update(id, language).subscribe((res: Language) => {
        this.handleResponseUpdate(res);
      })
    );
  }

  handleResponseUpdate(data: Language): void {
    this.languages = this.jsService.modifyObjectElementFromArrayByKey(this.languages, data, 'id');
    this.notification.success(`Language bien Modfiee !`, 'bien Modfiee !');
    this.formIsShow = false;
  }


  delete(language: Language): void {
    const id = language.id;
    this.subs.add(
      this.languageService.delete(id).subscribe((res: Language) => {
        this.handleResponseDelete(language);
      })
    );
  }

  handleResponseDelete(data: Language): void {
    this.languages = this.jsService.spread(this.jsService.deleteObjectElementFromArrayByKey(this.languages, data, 'id'));
    this.notification.success(`Language bien supprimer !`, 'bien supprimer !');
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
