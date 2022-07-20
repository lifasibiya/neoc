import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Customer, Product, Invoice, GetInvoice } from 'src/app/Models';
import { environment } from '../../../environments/environment'
import { ViewInvoiceComponent } from '../view-invoice/view-invoice.component';

const domain = environment.baseUrl
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  invoices: GetInvoice[] = []
  invoice: any = {};
  selectedInvoice: any = {};
  showInvoice: boolean = false;
  newInvoice: boolean = false;
  spinner: boolean = false;
  constructor(private http: HttpClient) 
  {
  }

  async ngOnInit() {
    this.getAllInvoices();
  } 
  
  preview = (selectedInvoice: any) => {
    this.selectedInvoice = selectedInvoice;
    this.showInvoice = true;
  }

  getAllInvoices = async () => {
    this.invoices = await this.get('invoice/get');
    console.log(this.invoices)
  }

  createInvoice = async () => {

    this.newInvoice = true
  }

  checkCustomer = async (customer: any) => {
    const payload: Customer = {
      'name': customer['name'],
      'address': customer['address'],
      'tel': customer['tel']
    }

    return await this.post(payload, 'customer/create');
    console.log(this.invoice['customer'])
  }

  checkProduct = async (product: any) => {
    const payload: Product = {
      'desc': product['desc'],
      'price': product['price']
    }
    
    return await this.post(payload, 'product/create');
    console.log(this.invoice['product'])
  }

  getInvoice = async (id: any) => {
    this.invoice = await this.get(`invoice/${id}`);
    console.log(this.invoice)
  }

  save = async (invoice: any): Promise<any> => {
    this.openSpinner();
    const customerId = await this.checkCustomer({
      'name': invoice['name'],
      'address': invoice['address'],
      'tel': invoice['tel']
    })

    const productId = await this.checkProduct({
      'desc': invoice['desc'],
      'price': invoice['price']
    })

    const payload = {
      'customer': customerId,
      'product': productId,
      'quantity': invoice['quantity']
    }
    const response = await this.post(payload, 'invoice/create')
    if (response) {
      this.getAllInvoices()
      this.closeSpinner();
      this.closePopup();
    }
  }

  close = (event: any) => {
    this.newInvoice = event
  }

  closePopup = () => {
    this.newInvoice = false
    this.showInvoice = false
  }

  post = async (payload: any, controller: any): Promise<any> => {
    return await this.http.post(`${domain}${controller}`, payload).toPromise()
  }

  get = async (controller: any): Promise<any> => {
    return await this.http.get(`${domain}${controller}`).toPromise()
  }

  openSpinner() {
    this.spinner = true;
  }

  closeSpinner() {
    this.spinner = false;
  }

}
