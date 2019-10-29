# Nano Penny Exchanger

Exchange your pocket change for some sweet [Nano](https://nano.org/en). Inspired by the [original penny exchanger](https://medium.com/the-nano-center/change-old-to-new-penny-nano-exchanger-fbed0e0d609e) I've take on the challenge of creating a different version:

## Material

- Raspberry PI 2 Model B v1.1 & [WIFI adapter](https://www.amazon.ca/gp/product/B07FR95KBG/)
- [Touch screen](https://www.amazon.ca/gp/product/B01CQIPEO0/)
- [Coin acceptor](https://www.amazon.ca/gp/product/B07DC9K42G) & [Power supply](https://www.amazon.ca/gp/product/B076H3WKN4/)
- [Arduino board](https://www.amazon.ca/Elegoo-Board-ATmega2560-ATMEGA16U2-Arduino/dp/B01H4ZLZLQ/)

## Tech stack

- [Electron](https://electronjs.org/) to build the app
- [Electron builder](electron-builder) compile & publish the Electron app
- [Jonny-five](http://johnny-five.io/) to interact with the Arduino board with nodejs
- [React](https://reactjs.org/) to build the UI/UX
- [Flame](https://github.com/lightspeed/flame) design system
- [Snapy.io](https://snapy.io/) to easily interact with the Nano blockchain
- [Localtunnel](https://github.com/localtunnel/localtunnel) subscribe to webhooks to receive the confirmed transaction
- [Nanocrawler](https://nanocrawler.cc/) to verify the Nano transaction hash