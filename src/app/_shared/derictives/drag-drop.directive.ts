import {Directive, EventEmitter, HostBinding, HostListener, Input, Output} from '@angular/core';

@Directive({
  selector: '[appDragDrop]'
})
export class DragDropDirective {

  @Input() private allowedExtensions: Array<string> = [];
  @Output() private filesChangeEmiter: EventEmitter<File[]> = new EventEmitter();
  @Output() private filesInvalidEmiter: EventEmitter<File[]> = new EventEmitter();

  // @Output() dropped =  new EventEmitter<FileList>();
  @Output() hovered = new EventEmitter<boolean>();
  @HostBinding('class.fileover') fileOver: boolean;

  @HostListener('dragover', ['$event'])
  onDragOver($event): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.hovered.emit(true);
    this.fileOver = true;
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave($event): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.hovered.emit(false);
    this.fileOver = false;
  }

  @HostListener('drop', ['$event'])
  onDrop($event): void {
    $event.preventDefault();
    $event.stopPropagation();
    // this.dropped.emit($event.dataTransfer.files);
    this.hovered.emit(false);
    this.fileOver = false;
    const files = $event.dataTransfer.files;
    const validFiles: Array<File> = [];
    const invalidFiles: Array<File> = [];
    if (files.length > 0) {
      Array.from(files).forEach((file: File) => {
        const ext = file.name.split('.')[file.name.split('.').length - 1];
        if (this.allowedExtensions.lastIndexOf(ext) !== -1) {
          validFiles.push(file);
        } else {
          invalidFiles.push(file);
        }
      });
      this.filesInvalidEmiter.emit(invalidFiles);
      if (validFiles.length === 0) {
        return;
      }
      this.filesChangeEmiter.emit(validFiles);
    }
  }

}
