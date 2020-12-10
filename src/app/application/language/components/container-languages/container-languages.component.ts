import {Component, OnDestroy, OnInit} from '@angular/core';
import {SubSink} from 'subsink';
import {NotificationService} from '../../../../_core/services/notification.service';
import {Language} from '../../../../_core/models/language';
import {LanguageService} from '../../services/language.service';

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
              private notification: NotificationService) {
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
    this.languages = [data, ...this.languages];
    this.notification.success('Language bien crée !', 'bien crée !');
    this.formIsShow = false;
  }


  edit(language: Language): void {
    this.selectedLanguage = Object.assign({}, language);
    this.showForm();
  }

  update(language: Language): void {
    const id = language.id;
    delete language.id;
    this.subs.add(
      this.languageService.update(id, language).subscribe((res: Language) => {
        this.handleResponseUpdate(res);
      })
    );
  }

  handleResponseUpdate(data: Language): void {
    this.languages = this.languages.map(language => {
      if (data.id === language.id) {
        language = data;
      }
      return language;
    });
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
    const index = this.languages.findIndex((item, i) => {
      return data.id === item.id;
    });
    this.languages.splice(index, 1);
    this.languages = [...this.languages];
    this.notification.success(`Language bien supprimer !`, 'bien supprimer !');

  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
