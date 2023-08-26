const x: {
  user: {
    name: string;
    adress?: {
      street: string;
      city: string;
    };
  };
} = undefined as any;

console.log(x.user.adress?.city);

class Foo {
  name;
  constructor(rawName?: string) {
    this.name = rawName ?? '(no name)';
  }
  log() {
    console.log(this.name);
  }
}

type Doo<T extends any[]> = [boolean, ...T, boolean];

type Adress = [
  StreetNumber: number,
  city: string,
  state: string,
  postal: number,
];

function PrintAdrees(...adress: Adress) {}

PrintAdrees(1, 'a', 'x', 4);


