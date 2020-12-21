import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges, OnDestroy,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Book} from '../../../../_core/models/book';
import {LanguageService} from '../../../language/services/language.service';
import {CategorieService} from '../../../categorie/services/categorie.service';
import {Language} from '../../../../_core/models/language';
import {Categorie} from '../../../../_core/models/categorie';
import {NotificationService} from '../../../../_core/services/notification.service';
import {environment} from '../../../../../environments/environment';
import {FormDataService} from '../../../../_core/services/form-data.service';
import {SubSink} from 'subsink';

@Component({
  selector: 'app-form-add-edit-books',
  templateUrl: './form-add-edit-books.component.html',
  styleUrls: ['./form-add-edit-books.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormAddEditBooksComponent implements OnInit, OnChanges, OnDestroy {

  @Output() storeEvent = new EventEmitter();
  @Output() updateEvent = new EventEmitter();
  @Input() book: Book = null;
  @Output() backToListEvent = new EventEmitter();
  private subs = new SubSink();
  form: FormGroup;
  languages: Language[] = [];
  categories: Categorie[] = [];
  file: File;
  defaultImage = '../../../../../assets/img/default-upload/default.png';
  imageUrl: string | ArrayBuffer = this.defaultImage;

  constructor(private languageService: LanguageService,
              private categorieService: CategorieService,
              private cd: ChangeDetectorRef,
              private notification: NotificationService,
              private formDataService: FormDataService) {
  }

  ngOnInit(): void {
    this.initialFormGroupe();
    this.getAllLanguages();
    this.getAllCategories();
  }

  initialFormGroupe(): void {
    this.form = new FormGroup({
      isbn: new FormControl(null, [Validators.required]),
      title: new FormControl(null, [Validators.required]),
      edition: new FormControl(null, [Validators.required]),
      author: new FormControl(null, [Validators.required]),
      sotck_quantity: new FormControl(null, [Validators.required, Validators.min(0)]),
      image: new FormControl(null, []),
      description: new FormControl(null, [Validators.required]),
      language_id: new FormControl(null, [Validators.required]),
      categories: new FormControl(null, [Validators.required])
    });
  }

  getAllLanguages(): void {
    this.subs.add(
      this.languageService.getAll().subscribe((res: Language[]) => {
        this.languages = res;
      })
    );
  }

  getAllCategories(): void {
    this.subs.add(
      this.categorieService.getAll().subscribe((res: Categorie[]) => {
        this.categories = res;
      }));
  }

  onSubmit(): void {
    if (this.book) {
      this.update();
    } else {
      this.store();
    }
  }

  store(): void {
    const formData = this.formDataService.getFormData(this.form.value, ['image', 'categories']);
    formData.append('image', this.file);
    formData.append('categories', JSON.stringify(this.form.value.categories));
    this.storeEvent.emit(formData);
    this.form.reset();
    this.imageUrl = this.defaultImage;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.book) {
      this.form.patchValue({
        isbn: this.book.isbn,
        title: this.book.title,
        edition: this.book.edition,
        author: this.book.author,
        sotck_quantity: this.book.sotck_quantity,
        // image: this.book.image,
        description: this.book.description,
        language_id: this.book.language.id,
        categories: this.book.categories.map((item) => {
          return item.id;
        })
      });
      this.imageUrl = `${environment.apiImageUrl}/${this.book.image}`;
    }
  }

  update(): void {
    const formData = this.formDataService.getFormData(this.form.value, ['image', 'categories', 'id']);
    formData.append('_method', 'PUT');
    formData.append('image', this.file);
    formData.append('categories', JSON.stringify(this.form.value.categories));
    formData.append('id', this.book.id);
    this.updateEvent.emit(formData);
    this.form.reset();
    this.book = null;
    this.imageUrl = this.defaultImage;
  }

  back(): void {
    this.form.reset();
    this.backToListEvent.emit();
    this.imageUrl = this.defaultImage;
  }

  onChange(file: File): void {
    if (file) {
      if (!this.validateFile(file.name)) {
        this.notification.error('Selected file format is not supported', 'image');
        this.form.patchValue({image: null});
      } else {
        this.file = file;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = event => {
          this.imageUrl = reader.result;
          this.cd.markForCheck();
        };
      }
    }
  }

  validateFile(name: string): boolean {
    const ext = name.substring(name.lastIndexOf('.') + 1);
    return ext.toLowerCase() === 'png' || ext.toLowerCase() === 'jpg' || ext.toLowerCase() === 'jpeg';
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
