import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-header-adherent',
  templateUrl: './header-adherent.component.html',
  styleUrls: ['./header-adherent.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderAdherentComponent implements OnInit {

  @Input() name: string;
  @Input() option: string;

  constructor() {
  }

  ngOnInit(): void {
  }

}
