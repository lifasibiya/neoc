import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-view-invoice',
  templateUrl: './view-invoice.component.html',
  styleUrls: ['./view-invoice.component.scss']
})
export class ViewInvoiceComponent implements OnInit {

  @Input('invoice') invoice: any = {};
  constructor() { }

  ngOnInit(): void {
  }

}
