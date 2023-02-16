import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { order, orderProduct, Product } from 'src/app/Interface/iProduct';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  constructor(private _service: SharedService, private _route: ActivatedRoute ) {}

  @ViewChild("link") btn!: ElementRef<HTMLAnchorElement>

  products: Product[] = [];
  orderProducts: Product[] = [];
  Prods: orderProduct[] = [];
  total: number = 0;
  sessionId: string | null = '';
  userId: string | null = '';

  message: string = '';
  show: boolean = false;

  ngOnInit(): void {

    this.sessionId = this._route.snapshot.paramMap.get('sessionId');
    this.userId = this._route.snapshot.paramMap.get('userId');

    if(this.sessionId === null){
      this.message = 'Por favor ingrese un pin valido';
      this.show = true;
    }

    if(this.sessionId === null){
      this.message = 'Por favor ingrese un pin valido';
      this.show = true;
    }

    this._service.getProducts().subscribe({
      next: (res) => {
        this.products = res;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  addProd(prod: Product) {
    this.orderProducts.push(prod);

    const sum = this.orderProducts
      .filter((item) => item._id === prod._id)
      .reduce((sum, current) => sum + current.price, 0);

    const pr = this.Prods.find((x) => x._id === prod._id);

    if (!pr) {
      this.Prods.push({
        _id: prod._id,
        image_url: prod.image_url,
        name: prod.name,
        price: prod.price,
        quantity: 1,
        total: sum,
      });
    } else {
      pr.quantity = pr.quantity + 1;
      pr.total = sum;
    }

    this.total = this.total + prod.price;
  }

  postOrder(){

    let pro:  string[]= [];

    this.orderProducts.forEach(pr => {
      pro.push(pr._id);
    })

    let obj: order = {
      user_id : this.userId!,
      session: this.sessionId!,
      products: pro
    }

    this._service.postOrden(obj).subscribe({
      next: res =>{
        this.btn.nativeElement.click();
      },
      error: err =>{
        this.message = err;
        this.show = true;
        console.log(err);
      }
    })

  }

}
