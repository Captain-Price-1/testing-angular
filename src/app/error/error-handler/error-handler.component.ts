import { Component } from '@angular/core';

@Component({
  selector: 'app-error-handler',
  templateUrl: './error-handler.component.html',
  styleUrls: ['./error-handler.component.scss']
})
export class ErrorHandlerComponent {
  constructor() {
    this.runfunction();
  }
  runfunction(){
    const divisionByZero:any = 1/0;
    console.log(divisionByZero.find('aaa'))
  }
}
