# Journaling complete development process of this API


> 08.03.2024
1. created product route handlers
2. learnt a bit about express-validator

> 09.03.2024
1. learnt about express-validator through documentation, trial and errors
2. added validation checks in the '/product' route and handled errors
3. createProduct route handler is now complete and product is being saved in the database

>10.03.2024
1. added ID validation check in GET /product route handler
2. error handling in PUT /product route handler
3. ID validation check in DELETE /product route handler

# Questions
1. why to do validation checks in the API?
A. To ensure that the data is correct and the API is not being misused. And we try to do them before passing the data to the handler(in separate middleware) so that the handler can focus on the business logic and not on the validation checks.
It scales better. If we have multiple handlers, we don't have to repeat the validation checks in each handler. We can just do them once in the middleware and then pass the data to the handler.

```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```