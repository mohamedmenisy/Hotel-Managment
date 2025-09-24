import { Component, inject, signal, ViewChild } from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule,UntypedFormBuilder} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepper, MatStepperModule} from '@angular/material/stepper';
import { MatDividerModule } from '@angular/material/divider';
import {injectStripe,StripeCardComponent,StripeElementsDirective,StripePaymentElementComponent} from 'ngx-stripe';
import {StripeCardElementOptions, StripeElementsOptions,StripePaymentElementOptions} from '@stripe/stripe-js';
import { PaymentService } from '../../services/payment.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    StripeElementsDirective,
    StripeCardComponent,
    CurrencyPipe,
    RouterLink,
    TranslatePipe
  ],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss',
  providers:[
      {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
  ]
})
export class PaymentComponent {
  @ViewChild(MatStepper) stepper!: MatStepper;
  @ViewChild(StripeCardComponent) cardElement!: StripeCardComponent;
  bookingDetails:any;
  constructor(private _payment:PaymentService  ,private route:ActivatedRoute) {}
  ngOnInit(): void {
    this.getBookDetails();
  }
  private readonly fb = inject(UntypedFormBuilder);

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'en'
  };

  checkoutForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]]
  });

  // Replace with your own public key
  stripe = injectStripe('pk_test_51OTjURBQWp069pqTmqhKZHNNd3kMf9TTynJtLJQIJDOSYcGM7xz3DabzCzE7bTxvuYMY0IX96OHBjsysHEKIrwCK006Mu7mKw8');

  createToken() {
    const name = this.checkoutForm.get('name')?.value;
    if(!this.checkoutForm.invalid){
  this.stripe
      .createToken(this.cardElement.element, { name })
      .subscribe((result) => {
        if (result.token) {
          // Use the token
          this.payForBooking(result.token.id)
        } else if (result.error) {
          // Error creating the token
          console.log(result.error.message);
        }
      });
    }else{
          this.checkoutForm.markAllAsTouched();

    }

  }
  getBookDetails(){
    let BookingId = this.route.snapshot.paramMap.get('id');
    if(BookingId){
      this._payment.getBookDetails(BookingId).subscribe({
        next:(res)=>{
          this.bookingDetails=res.data.booking;
          console.log(res.data.booking);

        }
      })
    }
  }
  payForBooking(token:any){
    let BookingId = this.route.snapshot.paramMap.get('id');
    let mytoken =  {
      token:token
    }
    if (BookingId) {
      this._payment.payBooking(BookingId,mytoken).subscribe({
        next:(res)=>{
          console.log(res);
          this.stepper.next();
        },
        error:(err)=>{
          console.log(err);
        }
      })
    }
  }
  getTotal(price:number):number
  {
    let total = price + (price * 10 / 100);
    return total;
  }
}
