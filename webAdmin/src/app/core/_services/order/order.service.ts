import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiService } from '@app/core';
import { Order } from '@app/core/_models/Order';
import { PaymentMethod, DeliveryMethod } from '@app/core/_models/Method';
import { HttpClient } from '@angular/common/http';

const routes = {
  getAllOrders: () => `/order`,
  orderWithId: (id: string) => `/order/${id}`,
  orderStatus: (id: string) => `/orderStatus/${id}`,
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
  constructor(private api: HttpClient) {}

  getAllOrders(): Observable<Order[]> {
    return this.api.get<Order[]>(this.route + routes.getAllOrders());
  }
  getOrder(id: string): Observable<Order> {
    return this.api.get<Order>(this.route + routes.orderWithId(id));
  }
  updateOrder(order: Order): Observable<Order> {
    return this.api.put<Order>(
      this.route + routes.orderStatus(order._id),
      order
    );
  }
  getAllPaymentMethods(): Observable<PaymentMethod[]> {
    return this.api.get<PaymentMethod[]>(
      this.route + routes.paymentMethod()
    );
  }
  getPaymentMethod(id: string): Observable<PaymentMethod> {
    return this.api.get<PaymentMethod>(
      this.route + routes.paymentMethodWithId(id)    );
  }
  addPaymentMethod(paymentMethod: PaymentMethod): Observable<PaymentMethod> {
    return this.api.post<PaymentMethod>(
      this.route + routes.paymentMethod(),
      paymentMethod
    );
  }
  updatePaymentMethod(paymentMethod: PaymentMethod): Observable<PaymentMethod> {
    return this.api.put<PaymentMethod>(
      this.route + routes.paymentMethodWithId(paymentMethod._id),
      paymentMethod    );
  }
  deletePaymentMethod(id: string): Observable<PaymentMethod> {
    return this.api.delete<PaymentMethod>(
      this.route + routes.paymentMethodWithId(id)
    );
  }

  getAllDeliveryMethods(): Observable<DeliveryMethod[]> {
    return this.api.get<DeliveryMethod[]>(
      this.route + routes.deliveryMethod()
    );
  }
  getDeliveryMethod(id: string): Observable<DeliveryMethod> {
    return this.api.get<DeliveryMethod>(
      this.route + routes.deliverytMethodWithId(id)
    );
  }
  addDeliveryMethod(
    deliveryMethod: DeliveryMethod
  ): Observable<DeliveryMethod> {
    return this.api.post<DeliveryMethod>(
      this.route + routes.deliveryMethod(),
      deliveryMethod
      
    );
  }
  updateDeliveryMethod(
    deliveryMethod: DeliveryMethod
  ): Observable<DeliveryMethod> {
    return this.api.put<DeliveryMethod>(
      this.route + routes.deliverytMethodWithId(deliveryMethod._id),
      deliveryMethod
      
    );
  }
  deleteDeliveryMethod(id: string): Observable<DeliveryMethod> {
    return this.api.delete<DeliveryMethod>(
      this.route + routes.deliverytMethodWithId(id)
      
    );
  }
}
