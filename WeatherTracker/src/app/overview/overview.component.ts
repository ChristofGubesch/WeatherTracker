import { Router } from '@angular/router';
import { AuthentificationService } from './../services/authentification.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  image: string;

  constructor(private authentificationService: AuthentificationService, private router: Router) { }

  ngOnInit() {
    /*this.authentificationService.user.subscribe(user => {
      this.image = user.photoURL;
      console.log(user);
    });*/
  }

  navigateLogin() {
    this.router.navigate(['login']);
  }
}
