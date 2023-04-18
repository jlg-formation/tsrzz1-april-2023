const rxjs = require("rxjs");

const { Observable } = rxjs;

const o = new Observable((subscriber) => {
  subscriber.next(34);
  const timer = setTimeout(() => {
    console.log("coucou");
    subscriber.next(17);
    subscriber.complete();
  }, 1000);

  return () => {
    console.log("I die...");
    clearTimeout(timer);
  };
});

const observer = {
  next: (data) => {
    console.log("data: ", data);
  },
  error: (err) => {
    console.log("err: ", err);
  },
  complete: () => {
    console.log("complete");
  },
};

const subscription = o.subscribe(observer);

setTimeout(() => {
  subscription.unsubscribe();
}, 500);
