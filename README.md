# CoffeeCashApp

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.


## Assumptions

The two modes, Participation Equity Mode and Balanced Contributions Mode are selectable with the toggle mode button on the home page. They change the function that will be called to determine who has to pay for the coffee.

Participation Equity Mode: Will choose the coworker who's timesPaid is lower. Times Paid is the amount of times they've paid for for coffees for the group. This function will make sure everyone has paid for the groups coffees a similar amount of times, it does not account for the amount the drinks cost or how much the individual has already paid. 

Balanced Contributions Mode: This mode will choose the coworker that has a lesser amountPaid, the function will keep the coworker group with a similar Total Paid. 


## To use CoffeeCash

Click the add to cart button for each coworker then click pay for coffee. This will iterate the buying rounds, which is the total amount of times the group as a total has bought drinks. The stats page below shows statistics for each coworker, including how much they overpaid against the averate or underpaid against the balance.