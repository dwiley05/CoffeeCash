import { Component, OnInit } from '@angular/core';
import { CoffeeService, Coworker } from '../../services/coffee.service';

@Component({
  selector: 'app-coffee-selector',
  templateUrl: './coffee-selector.component.html',
  styleUrls: ['./coffee-selector.component.scss'],
})
export class CoffeeSelectorComponent implements OnInit {
  coworkers: Coworker[] = [];
  nextPayer: string = '';
  averagePaid: number = 0;
  currentMode: 'ParticipationEquityMode' | 'BalancedContributionsMode' =
    'BalancedContributionsMode';

  constructor(public coffeeService: CoffeeService) {}

  ngOnInit() {
    this.coworkers = this.coffeeService.getCoworkers();
    this.calculateAveragePaid();
    this.determinePayer();
  }

  calculateAveragePaid() {
    const totalPaid = this.coworkers.reduce(
      (total, coworker) => total + coworker.totalPaid,
      0
    );
    this.averagePaid = totalPaid / this.coworkers.length;
  }

  determinePayer() {
    this.nextPayer = this.coffeeService.selectPayer();
    console.log('Next payer is: ', this.nextPayer);
  }

  addToCart(coworker: Coworker) {
    const order = {
      name: coworker.name,
      coffee: coworker.coffee,
      price: this.coffeeService.getPriceForCoffee(coworker.coffee),
    };
    this.coffeeService.addToCart(order);
  }

  payForCoffee() {
    this.coffeeService.buyingRounds += 1;
    const total = this.coffeeService.calculateTotal();
    this.coffeeService.setCurrentCartTotal(total);

    this.coffeeService.updateTotals(this.nextPayer, total);
    this.determinePayer();
    this.coffeeService.clearCart();
  }

  handlePayment() {
    const total = this.coffeeService.calculateTotal();
    this.coffeeService.updateTotalPaidFor(this.nextPayer, total);
    this.coffeeService.clearCart();
    this.determinePayer();
  }

  canPayForCoffee(): boolean {
    return this.coffeeService.allCoworkersHaveCoffee();
  }

  getPaymentDifferences() {
    const average = this.coffeeService.calculateTotal() / this.coworkers.length;
    return this.coworkers.map((coworker) => ({
      ...coworker,
      difference: coworker.totalPaid - average,
    }));
  }

  togglePaymentMode() {
    this.currentMode =
      this.currentMode === 'ParticipationEquityMode'
        ? 'BalancedContributionsMode'
        : 'ParticipationEquityMode';
    this.coffeeService.setPaymentMode(this.currentMode);
  }
}
