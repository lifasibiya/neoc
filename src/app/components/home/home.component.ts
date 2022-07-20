import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Customer, Product, Invoice, GetInvoice } from 'src/app/Models';
import { environment } from '../../../environments/environment'

const domain = environment.baseUrl
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  invoices: GetInvoice[] = []
  invoice: any = {};
  constructor(private http: HttpClient) { }

  async ngOnInit() {
    this.getAllInvoices();
  } 
  
  preview = () => {
    
  }

  getAllInvoices = async () => {
    this.invoices = await this.get('invoice/get');
    console.log(this.invoices)
  }

  createInvoice = async () => {

    const response = await this.post(this.invoice, 'customer/create');
    console.log(response)
  }

  checkCustomer = async () => {
    const payload: Customer = {
      'name': this.invoice['name'],
      'address': this.invoice['address'],
      'tel': this.invoice['tell']
    }

    this.invoice['customer'] = await this.post(payload, 'customer/create');
    console.log(this.invoice['customer'])
  }

  checkProduct = async () => {
    const payload: Product = {
      'desc': this.invoice['desc'],
      'price': this.invoice['price']
    }
    
    this.invoice['product'] = await this.post(payload, 'product/create');
    console.log(this.invoice['product'])
  }

  getInvoice = async (id: any) => {
    this.invoice = await this.get(`invoice/${id}`);
    console.log(this.invoice)
  }

  post = async (payload: any, controller: any): Promise<any> => {
    return await this.http.post(`${domain}${controller}`, payload).toPromise()
  }

  get = async (controller: any): Promise<any> => {
    return await this.http.get(`${domain}${controller}`).toPromise()
  }

}
