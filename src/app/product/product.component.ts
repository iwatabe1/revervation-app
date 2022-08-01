import { Component, OnInit } from '@angular/core';
import { products } from '../shared/product';
import { Product } from '../shared/product.model';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  products: Product[] = products;

  constructor() { }

  ngOnInit(): void {
  }

}
