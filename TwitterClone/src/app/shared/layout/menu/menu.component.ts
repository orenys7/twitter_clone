import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  languages: String[] = ['EN', 'ES'];

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  checkIfLoggedIn(): boolean {
    return this.authService.checkIfLoggedIn();
  }

}
