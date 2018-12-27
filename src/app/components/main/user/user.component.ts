import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(public router:Router,public authenticationService:AuthenticationService) {
    var path:any[] = router.url.split('/');
    if(path[path.length-1] == 'user'){
  
      
    }
   }

  ngOnInit() {
  }

}
