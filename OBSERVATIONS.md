## contibution:
- Fynn Feldpausch - card should be accessible using keyboard, usage of 'grid' display
- Diana Dima - https://github.com/haiilo/fe-coding-challenge-public/pull/3 - grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr))

## ui
- product:
- Each product is a card.
- In order to make the card accessible using the keyboard, a full width and height link is placed above, with a high z-index.
- In order to have the card buttons still responding to mouse events, they have a z-index even higher than the link.
- Another approach would be to place the card inside an anchor html element. But this changes the text color and underlines it. Also, the card headers are not properly aligned among cards.


## services
- the products are provided using a 'store'. It is provided in the 'products component' in order to have a different instance for each component.
- all information from store is extracted via observable. By using async pipe in the html there is no need to subscribe and unsubscribe explicitely.
- in order to avoid the process of multiple load more requests, the exhaustMap operator is used. It discards all subsequent requests while one is performed. Also, this ensures that the responses get processed in the right order (there is no guarantee that multiple http requests are completed in the order they are issued).
- also the store provides the information about loading state and when a new request could be performed.


## development
- there are some ui notifications that are used only for the demo. The intention is to prove that the same page is no longer requested if obtained.
- also there is a notification when there are no more items.
