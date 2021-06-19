# Today I learned

## Identifier vs Value

```javascript
const a = {
  a:1,
  b:5
}

const b = {
  a:1,
  b:5
}

console.log(a===b) //identifier
console.log(JSON.stringfy(a) === Jsonstringfy(b)); //value
```

> Value

- 끝 없는 복사본
- 상태 변화에 안전함.
- 연산을 기반으로 로직

> Identifier

- 원본유지
- 상태변화를 내부에서 처리
- 메세지 기반으로 로직

## substitution & internal identity

```javascript
const Worker = class{
  run(){
    console.log("work");
  }
  print(){
    this.run();
  }
};

const hardWorker = class extends Worker{
  run(){
    console.log("hardwork");
  }
};

const worker = new HardWorker();
console.log(worker instanceof Worker) // true
worker.print() // 'hardwork'
```

- 확장된 객체는 원본으로 대체 가능하다.
- 생성 시점의 타입이 내부에 일관성 있게 참조된다.

## Polymorphism of Prototype

```javascript
worker instanceof Worker
```

1. 위의 문장을 실행할 때 worker의 속성에는 __proto__가 존재한다.__proto__는 객체를 만들면 생성된다.new로 만들던 리터럴로 만들던 __proto__를 가집니다. 이 __proto__는 Hardwoker의 prototype을 가르킵니다.
2. worker은 Hardworker의 클래스이고 HardWorker는 만들어질때 prototype을 가지는 약속을 가진다. 함수의 프로토타입객체에는 constructor를 가지고있고 자기 자신을 가르키게됩니다. 클래스의 method들은 prototype안에 가집니다.
3. Worker도 프로토타입을 가지고있고 Hardworker의 __proto__는 Worker의 prototype을 가리키게됩니다. 결국 최상위는 null을 가르킬떄까지 갑니다.
4. 프로토타입 체인은 가장 근접한 상속부터 찾아가고 타고 계속 이동되고 내적 일관성을 달성하게 됩니다.
5. 이제 instanceof는 worker가 HardWorker의 constructor를 타고 들어가 일치한지 확인하고 그 상위의 Worker의 constructor를 타고 갑니다.

자바스크립트는 객체지향언어인가?
-> 객체지향언어이다. Polymorphism을 성립하기때문이다.

## Object

```javascript
const EssentialObject = class{
  //hide state
  #name ="";
  #screen = null;

  constructor (name){
    this.#name = name;
  }
  camouflage(){
    this.#screen = Math.random()*10.toString(16).replace ((".""."))
  }
  //encapsulation
  get name(){
    return this.#screen || this.#name;
  }
}
```

- 기능의 캡슐화 (Encapsulation of Functionality)
  - 위반한것들? getter | setter
- 상태 관리 책임 (Maintenance of State)
  - 은닉 private
