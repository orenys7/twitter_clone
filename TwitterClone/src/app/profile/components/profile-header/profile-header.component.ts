import { Component, OnInit, Input } from '@angular/core';
import { IProfile } from 'src/app/core/models';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.css']
})
export class ProfileHeaderComponent implements OnInit {
  @Input() user: IProfile;

  constructor() { }

  ngOnInit() {

  }

}
