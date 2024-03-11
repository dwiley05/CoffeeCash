import { Injectable } from "@angular/core";

export interface Coworker {
  name: string;
  coffee: string;
  totalPaid: number;
  timesPaid: number;
  totalConsumptionValue: number;
  totalDrinkValue: number;
}

interface Order {
  name: string;
  coffee: string;
  price: number;
}

interface CoffeePrices {
  [coffeeName: string]: number;
}

@Injectable({
  providedIn: "root",
})
export class CoffeeService {
  get averagePaid(): number {
    const totalPaid = this.coworkers.reduce(
      (acc, coworker) => acc + coworker.totalPaid,
      0
    );
    return totalPaid / this.coworkers.length;
  }

  buyingRounds: number = 1;

  private coworkers: Coworker[] = [
    {
      name: "Bob",
      coffee: "cappuccino",
      totalPaid: 30,
      timesPaid: 5,
      totalConsumptionValue: 0,
      totalDrinkValue: 3.5,
    },
    {
      name: "Jeremy",
      coffee: "black",
      totalPaid: 10,
      timesPaid: 4,
      totalConsumptionValue: 0,
      totalDrinkValue: 2.0,
    },
    {
      name: "Manny",
      coffee: "mocha",
      totalPaid: 20,
      timesPaid: 2,
      totalConsumptionValue: 0,
      totalDrinkValue: 4.5,
    },
    {
      name: "Marge",
      coffee: "black",
      totalPaid: 5,
      timesPaid: 1,
      totalConsumptionValue: 0,
      totalDrinkValue: 2.0,
    },
    {
      name: "Mallory",
      coffee: "cappuccino",
      totalPaid: 25.5,
      timesPaid: 6,
      totalConsumptionValue: 0,
      totalDrinkValue: 3.5,
    },
    {
      name: "Trent",
      coffee: "black",
      totalPaid: 40,
      timesPaid: 7,
      totalConsumptionValue: 0,
      totalDrinkValue: 2.0,
    },
    {
      name: "Victor",
      coffee: "latte",
      totalPaid: 29,
      timesPaid: 10,
      totalConsumptionValue: 0,
      totalDrinkValue: 4.0,
    },
    {
      name: "Joe",
      coffee: "black",
      totalPaid: 31,
      timesPaid: 18,
      totalConsumptionValue: 0,
      totalDrinkValue: 2.0,
    },
  ];

  private coffeePrices: CoffeePrices = {
    cappuccino: 3.5,
    black: 2.0,
    latte: 4.0,
    mocha: 4.5,
  };

  private cart: Order[] = [];
  private currentCartTotal = 0;
  private paymentMode: "ParticipationEquityMode" | "BalancedContributionsMode" =
    "BalancedContributionsMode";

  constructor() {}

  selectPayer(): string {
    if (this.paymentMode === "BalancedContributionsMode") {
      return this.selectPayerBasedOnBalancedContributions();
    } else {
      return this.selectPayerBasedOnParticipationEquity();
    }
  }

  setCurrentCartTotal(total: number): void {
    this.currentCartTotal = total;
  }

  updateTotals(payerName: string, totalPayment: number): void {
    const payer = this.coworkers.find(
      (coworker) => coworker.name === payerName
    );
    if (!payer) return;

    payer.totalPaid += totalPayment;
    payer.timesPaid += 1;
    payer.totalDrinkValue += this.calculateDrinkValueForPayment(
      payerName,
      totalPayment
    );
  }

  getCoworkers(): Coworker[] {
    return this.coworkers;
  }

  addToCart(order: Order) {
    this.cart.push(order);
  }

  removeFromCart(order: Order) {
    const index = this.cart.findIndex(
      (o) => o.name === order.name && o.coffee === order.coffee
    );
    if (index > -1) {
      this.cart.splice(index, 1);
    }
  }

  getCart() {
    return this.cart;
  }

  calculateTotal(): number {
    return this.cart.reduce((acc, order) => acc + order.price, 0);
  }

  clearCart() {
    this.cart = [];
  }

  getPriceForCoffee(coffee: string): number {
    return this.coffeePrices[coffee];
  }

  updateTotalPaidFor(payerName: string, total: number): void {
    const payer = this.coworkers.find(
      (coworker) => coworker.name === payerName
    );
    if (!payer) return;

    payer.totalPaid += total;
  }

  allCoworkersHaveCoffee(): boolean {
    return this.coworkers.every((coworker) =>
      this.cart.some((order) => order.name === coworker.name)
    );
  }

  setPaymentMode(
    mode: "ParticipationEquityMode" | "BalancedContributionsMode"
  ) {
    this.paymentMode = mode;
  }

  getPaymentMode(): "ParticipationEquityMode" | "BalancedContributionsMode" {
    return this.paymentMode;
  }

  private selectPayerBasedOnParticipationEquity(): string {
    let nextPayer: Coworker = this.coworkers.reduce((selected, current) => {
      return selected.timesPaid > current.timesPaid ? current : selected;
    }, this.coworkers[0]);

    return nextPayer.name;
  }

  private selectPayerBasedOnBalancedContributions(): string {
    let maxUnderpayment = -Infinity;
    let nextPayer: Coworker = this.coworkers[0];

    this.coworkers.forEach((coworker) => {
      const consumption = coworker.totalDrinkValue;
      const underpayment = consumption - coworker.totalPaid;
      if (underpayment > maxUnderpayment) {
        maxUnderpayment = underpayment;
        nextPayer = coworker;
      }
    });

    return nextPayer.name;
  }

  private calculateDrinkValueForPayment(
    payerName: string,
    totalPayment: number
  ): number {
    if (this.cart.length === 0) return 0;

    const paymentPerOrder = totalPayment / this.cart.length;

    return this.cart
      .filter((order) => order.name === payerName)
      .reduce((sum, order) => sum + paymentPerOrder, 0);
  }
}
