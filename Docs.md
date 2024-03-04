# Journaling complete development process of this API








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