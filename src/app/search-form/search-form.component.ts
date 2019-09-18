import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent {

  formContent: string;

  constructor() { }

  @Output() submitForm = new EventEmitter();

  onSubmit(formContent) {
    this.submitForm.emit(formContent);
  }
}
