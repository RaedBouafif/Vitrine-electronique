import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiService } from 'src/app/core';
import { Order } from 'src/app/core/_models/Order';
import { PaymentMethod, DeliveryMethod } from 'src/app/core/_models/Method';
import { HttpClient } from '@angular/common/http';

const routes = {
  getAllOrders: () => `/order`,
  orderWithId: (id: string) => `/order/${id}`,
  orderStatus: (id: string) => `/orderStatus/${id}`,
  orderByCustomer: (id: string) => `/getOrderByCustomer/${id}`,
  paymentMethod: () => `/paymentMethod`,
  paymentMethodWithId: (id: string) => `/paymentMethod/${id}`,
  deliveryMethod: () => `/deliveryMethod`,
  deliverytMethodWithId: (id: string) => `/deliveryMethod/${id}`
};
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  route = 'http://localhost:4003';
  constructor(private _http:HttpClient) {}

  getAllOrders(): Observable<Order[]> {
    return this._http.get<Order[]>(this.route + routes.getAllOrders());
  }
  getOrder(id: string): Observable<Order> {
    return this._http.get<Order>(this.route + routes.orderWithId(id));
  }
  addOrder(order:Order): Observable<Order> {
    return this._http.post<Order>(this.route + routes.getAllOrders(),order);
  }
  getCustomerOrders(id:string): Observable<Order[]> {
    return this._http.get<Order[]>(this.route + routes.orderByCustomer(id));
  }
  getAllPaymentMethods(): Observable<PaymentMethod[]> {
    return this._http.get<PaymentMethod[]>(
      this.route + routes.paymentMethod()
    );
  }
  getPaymentMethod(id: string): Observable<PaymentMethod> {
    return this._http.get<PaymentMethod>(
      this.route + routes.paymentMethodWithId(id) );
  }
  addPaymentMethod(paymentMethod: PaymentMethod): Observable<PaymentMethod> {
    return this._http.post<PaymentMethod>(
      this.route + routes.paymentMethod(),
      paymentMethod
    );
  }
  updatePaymentMethod(paymentMethod: PaymentMethod): Observable<PaymentMethod> {
    return this._http.put<PaymentMethod>(
      this.route + routes.paymentMethodWithId(paymentMethod._id),
      paymentMethod
    );
  }
  deletePaymentMethod(id: string): Observable<PaymentMethod> {
    return this._http.delete<PaymentMethod>(
      this.route + routes.paymentMethodWithId(id)
    );
  }

  getAllDeliveryMethods(): Observable<DeliveryMethod[]> {
    return this._http.get<DeliveryMethod[]>(
      this.route + routes.deliveryMethod()
    );
  }
  getDeliveryMethod(id: string): Observable<DeliveryMethod> {
    return this._http.get<DeliveryMethod>(
      this.route + routes.deliverytMethodWithId(id)    );
  }
  addDeliveryMethod(
    deliveryMethod: DeliveryMethod
  ): Observable<DeliveryMethod> {
    return this._http.post<DeliveryMethod>(
      this.route + routes.deliveryMethod(),
      deliveryMethod
    );
  }
  updateDeliveryMethod(
    deliveryMethod: DeliveryMethod
  ): Observable<DeliveryMethod> {
    return this._http.put<DeliveryMethod>(
      this.route + routes.deliverytMethodWithId(deliveryMethod._id),
      deliveryMethod    );
  }
  deleteDeliveryMethod(id: string): Observable<DeliveryMethod> {
    return this._http.delete<DeliveryMethod>(
      this.route + routes.deliverytMethodWithId(id)
    );
  }
}
