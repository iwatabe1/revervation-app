import { Component, OnInit } from '@angular/core';
import { products } from 'src/app/shared/product';
import { Product } from 'src/app/shared/product.model';


@Component({
  selector: 'app-product-listings',
  templateUrl: './product-listings.component.html',
  styleUrls: ['./product-listings.component.scss']
})
export class ProductListComponent implements OnInit {

  products: Product[] = products;

  constructor() { }

  ngOnInit(): void {
  }

}
