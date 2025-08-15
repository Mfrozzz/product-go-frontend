import { Component } from '@angular/core';
import { Navbar } from '../../shared/layouts/navbar/navbar';
import { Footer } from '../../shared/layouts/footer/footer';
import { AutoLogoutService } from '../../services/user/auto-logout-service';

@Component({
  selector: 'app-home',
  imports: [Navbar, Footer],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  ngOnInit(){
    
  }

  constructor(private autoLogout: AutoLogoutService){

  }

}