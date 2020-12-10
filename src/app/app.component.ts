import {Component, ViewEncapsulation} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {slider} from './_core/animations/route-animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slider],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'library-hero';

  prepareRoute(outlet: RouterOutlet): any {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData.animation
    );
  }
}
