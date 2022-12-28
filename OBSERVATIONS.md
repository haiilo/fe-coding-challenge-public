## ui
  - product: 
    - Each product is a card. 
    - In order to make the card accessible using the keyboard, a full width and height link is placed, with a high z-index.
    - In order to have the card buttons still responding to the mouse events, they have a z-index even higher than the link.
    - Another approach would be to place the card inside an anchor html element. But this changes the text color and underlines it. Also the card headers are not properly aligned among cards.
