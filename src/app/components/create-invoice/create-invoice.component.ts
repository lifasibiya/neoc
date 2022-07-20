import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Invoice } from 'src/app/Models';

@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.scss']
})
export class CreateInvoiceComponent implements OnInit {

  @Output('save') save: EventEmitter<Invoice> = new EventEmitter()
  @Output('close') close: EventEmitter<boolean> = new EventEmitter()
  invoice: any = {};
  constructor() { }

  ngOnInit(): void {
  }

  submit = () => {
    this.save.emit(this.invoice);
  }

  cancel = () => {
    this.close.emit(false)
  }

}
