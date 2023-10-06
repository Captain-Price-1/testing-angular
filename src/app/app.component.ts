import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title:any = 'rollbar-testing';
  constructor(){
    // this.runFunction()
  }
  runFunction(){
    const divisionByZero:any = 1/0;
    console.log(divisionByZero.find('a'))
  }

}
