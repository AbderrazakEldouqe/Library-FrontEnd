import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as XLSX from 'xlsx';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {NotificationService} from '../../../_core/services/notification.service';

@Component({
  selector: 'app-import-excel',
  templateUrl: './import-excel.component.html',
  styleUrls: ['./import-excel.component.css']
})
export class ImportExcelComponent implements OnInit {
  fileName = 'SheetJS.xlsx';

  @ViewChild('inputFile') inputFile: ElementRef;
  isExcelFile: boolean;

  isHovering: boolean;
  isEmptyDrop = true;
  isExcelDrop = true;

  keys = [];
  data = [];

  config = {
    id: 'custom',
    itemsPerPage: 4,
    currentPage: 1,
    totalItems: this.data.length
  };

  tableSizes = [4, 8, 10, 14];

  filter = '';

  source = null;

  constructor(private activatedroute: ActivatedRoute,
              private router: Router,
              private http: HttpClient,
              private notification: NotificationService) {
  }

  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe(params => {
      this.source = params.get('source');
    });
  }

  onFileChange(evt: any): void {
    /* wire up file reader */
    const target: DataTransfer = (evt.target) as DataTransfer;
    if (target.files.length !== 1) {
      this.inputFile.nativeElement.value = '';
      throw new Error('Cannot use multiple files');
    }
    this.isExcelFile = !!target.files[0].name.match(/(.xls|.xlsx)/);

    if (this.isExcelFile) {
      // *** this.spinnerEnabled = true;
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        /* read workbook */
        const bstr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});

        /* grab first sheet */
        const wsname2: string = wb.SheetNames[0];
        const sheet = wb.Sheets[wsname2];

        /* save data */
        this.data = XLSX.utils.sheet_to_json(sheet, {defval: null});
        this.keys = Object.keys(this.data[0]);

      };
      reader.readAsBinaryString(target.files[0]);
      reader.onloadend = (e) => {
        // *** this.spinnerEnabled = false;
        // this.keys = Object.keys(data[0]);
        // this.dataSheet.next(data);
      };
    } else {
      this.inputFile.nativeElement.value = '';
      throw new Error('Excel file only');
    }
  }


  export(): void {
    /* generate worksheet */
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.data);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }

  removeData(): void {
    this.inputFile.nativeElement.value = '';
    this.data = [];
    this.keys = [];
  }

  /**/
  toggleHover(event: boolean): void {
    this.isHovering = event;
  }

  dropExcelOnChance(targetInput: Array<File>): void {
    // this.sheetJsExcelName = targetInput[0].name;
    if (targetInput.length !== 1) {
      throw new Error('Cannot use multiple files');
    }
    // *** this.spinnerEnabled = true;
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});

      /* grab first sheet */
      const wsname2: string = wb.SheetNames[0];
      const sheet = wb.Sheets[wsname2];

      /* save data */
      this.data = XLSX.utils.sheet_to_json(sheet, {defval: null});
      this.keys = Object.keys(this.data[0]);

    };
    reader.readAsBinaryString(targetInput[0]);
    reader.onloadend = (e) => {
      // *** this.spinnerEnabled = false;
      // this.keys = Object.keys(data[0]);
      // this.dataSheet.next(data);
    };
    this.isEmptyDrop = false;
    this.isExcelDrop = true;
  }

  dropExcelBlock(fileList: Array<File>): void {
    if (fileList.length === 0) {
      return;
    } else {
      this.isExcelDrop = false;
      throw new Error('Excel File only');
    }
  }

  onTableSizeChange(event): void {
    this.config.itemsPerPage = event.target.value;
    this.config.currentPage = 1;
  }

  confirmUpload(): void {
    const resource = {feuil1: this.data, source: this.source, keys: this.keys};
    this.http.post(`${environment.apiUrl}/import-excel`, resource).subscribe((res) => {
      this.notification.success('Data successfully imported !', '');
      this.router.navigateByUrl(`/application/${this.source}`);
    });
  }
}
