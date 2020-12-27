import {Component, OnDestroy, OnInit} from '@angular/core';
import {SubSink} from 'subsink';
import {Account} from '../../../../_core/models/account';
import {NotificationService} from '../../../../_core/services/notification.service';
import {JsService} from '../../../../_core/services/js.service';
import {ProfileService} from '../../services/profile.service';
import {Categorie} from '../../../../_core/models/categorie';
import {TokenService} from '../../../../_core/services/token.service';

@Component({
  selector: 'app-container-profile',
  templateUrl: './container-profile.component.html',
  styleUrls: ['./container-profile.component.css']
})
export class ContainerProfileComponent implements OnInit, OnDestroy {

  private subs = new SubSink();
  account: Account = null;

  constructor(private profileService: ProfileService,
              private tokenService: TokenService,
              private notification: NotificationService,
              private jsService: JsService) {
  }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser(): void {
    this.subs.add(
      this.profileService.getOne(this.tokenService.getId()).subscribe((res: Account) => {
        this.account = res;
      })
    );
  }

  updateUser(user: any): void {
    const id = user.id;
    user = this.jsService.deleteElementFromObjectByKey(user, 'id');
    this.subs.add(
      this.profileService.update(id, user).subscribe((res: Account) => {
        this.account = res;
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
