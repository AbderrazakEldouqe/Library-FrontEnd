import {Component, OnDestroy, OnInit} from '@angular/core';
import {SubSink} from 'subsink';
import {Categorie} from '../../../../_core/models/categorie';
import {NotificationService} from '../../../../_core/services/notification.service';
import {CategorieService} from '../../services/categorie.service';
import {JsService} from '../../../../_core/services/js.service';

@Component({
  selector: 'app-container-categories',
  templateUrl: './container-categories.component.html',
  styleUrls: ['./container-categories.component.css']
})
export class ContainerCategoriesComponent implements OnInit, OnDestroy {

  private subs = new SubSink();
  categories: Categorie[] = [];
  formIsShow = false;
  selectedCategorie: Categorie = null;

  constructor(private categorieService: CategorieService,
              private notification: NotificationService,
              private jsService: JsService) {
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.subs.add(
      this.categorieService.getAll().subscribe((res: Categorie[]) => {
        this.categories = res;
      })
    );
  }

  showForm(): void {
    this.formIsShow = true;
  }

  backToList(): void {
    this.selectedCategorie = null;
    this.formIsShow = false;
  }

  store(categorie: Categorie): void {
    this.subs.add(
      this.categorieService.create(categorie).subscribe((res: Categorie) => {
        this.handleResponseStore(res);
      })
    );
  }

  handleResponseStore(data: Categorie): void {
    this.categories = this.jsService.spread(this.categories, data);
    this.notification.success('Categorie bien crée !', 'bien crée !');
    this.formIsShow = false;
  }


  edit(categorie: Categorie): void {
    this.selectedCategorie = this.jsService.objectAssign(categorie);
    this.showForm();
  }

  update(categorie: Categorie): void {
    const id = categorie.id;
    categorie = this.jsService.deleteElementFromObjectByKey(categorie, 'id');
    this.subs.add(
      this.categorieService.update(id, categorie).subscribe((res: Categorie) => {
        this.handleResponseUpdate(res);
      })
    );
  }

  handleResponseUpdate(data: Categorie): void {
    this.categories = this.jsService.modifyObjectElementFromArrayByKey(this.categories, data, 'id');
    this.notification.success(`Categorie bien Modfiee !`, 'bien Modfiee !');
    this.formIsShow = false;
  }


  delete(categorie: Categorie): void {
    const id = categorie.id;
    this.subs.add(
      this.categorieService.delete(id).subscribe((res: Categorie) => {
        this.handleResponseDelete(categorie);
      })
    );
  }

  handleResponseDelete(data: Categorie): void {
    this.categories = this.jsService.spread(this.jsService.deleteObjectElementFromArrayByKey(this.categories, data, 'id'));
    this.notification.success(`Categorie bien supprimer !`, 'bien supprimer !');
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
