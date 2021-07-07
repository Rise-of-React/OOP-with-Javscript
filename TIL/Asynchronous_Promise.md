# Today I learned

## 프론트에서 왜 비동기를 사용하는지?

- 요즈음의 웹의 변화는 단방향의 정보 전달만 하는 페이지에서 사용자와의 상호작용을 하는 흐름으로 넘어온것.
- 주기적으로 발생하는 인터렉션, 연속적으로 변경된 정보를 사용자에게 보여줘야함
- 위의 인터렉션은 순서대로만 처리 할 수 는 없어서 이 문제를 처리하기위해서는 타이머 이벤트, 서버와 네트워크 통신, 애니메이션 등 여러 요인들이 생겨나 대기시간이 발생하고 이를 처리하는 과정이 필요해짐
- 대기시간을 기다려야하는 건 유저가 아닌 브라우저의 역할이다.

## 프론트 엔드에서 비동기를 어떻게 처리해야하는가?

- 예전에는 비동기를 처리하기 위해 `Callback`을 사용했지만 요즘은 잘 보이지않고 Callback의 문제는 낮은 신뢰성이다.
- 예시로 모든 제어권을 다른 곳으로 넘겨서 여러 문제들이 발생할 수 있다. 콜백 내부에서는 예외 처리는 가능할지라도 콜백 호출로 이루어지는 흐름은 외부에서 관찰하거나 제어할 수가 없다. -> `제어의 역전`(Inversion Of Control)
- 위의 문제를 해결하기 위해서 `Promise`가 존재한다.
    1. ES6
    2. 미래에 값을 반환할 수도 있는 함수를 `캡슐화`한 객체
    3. 제어의 재역전
    4. 비동기 요청 수행에 대한 세가지(`성공,실패,대기`)의 상태를 가짐
    5. 내부에서 비동기 요청이 끝나면 결과값을 연결된 콜백으로 보내줌.

  - 장점
    1. 제어권을 확보해서 신뢰할 수 없는 여러사항을 대처할수 있음.
    2. 체이닝을 통해 구조화된 콜백 작성가능
  - 고려할 점
    1. Promise 객체 외부에서 Promise내의 연쇄적인 흐름에 대한 예외처리가 어려움.
    2. 단일 값 전달의 한계 -> 여러개 값을 전달할려면 객체 배열로 감싸야함.
    3. 단순 콜백 처리와 비교했을 때 성능 저하

- 그 후에 나온 것이 `Generator`이다. Generator를 이용한 비동기 처리 방식이 있었는데 비동기를 동기적으로 보이게하는것으로 유용하게 사용할 수 있었다.
  1. ES6
  2. *: genetator 함수를 작성하기 위한 규칙, function 키워드 뒤나 식별자 앞에 선언.
  3. Iterator: generator 호출로 반환된 객체 next()를 가지고 있음.
  4. next(): generator함수안의 yield문으로 넘어가기 위한 method.
  5. yield: next()가 호출될 때 1) 중간에 멈추고 2) 데이터를 받는 지점.

- Generator(`가독성`)와 Promise(`신뢰성`)을 둘다 사용하면서 `Async Function`이 출현하게 되었다.
  1. ES2017
  2. Syntatic Sugar
  3. 함수 내에서 await 문을 만나면 함수의 실행을 일시 중지
  4. await 뒤에 있는 promise의 수행 결과 값을 받아 함수 재진행

  - 장점
    - await을 통해 반환 받은 것이 Promise의 수행된 값이기 때문에 외부에서 예외처리가 용이하다.
    - 다른 방법에 비해 높은 가독성
  - 고려할점
    - Promise에 대한 Syntatic sugar이기 때문에 Promise에 대한 이해가 선행되어야한다.
    - 하나의 함수 안에서 다수의 Promise를 병렬적으로 처리할 수 없다. ->Promise.all, Promise.race
    - 경우에 따라 async 키워드를 관련 함수마다 일일이 선언해야 할 수도 있다.

## Promise와 Async Function은 왜 사용하는가?

- 기존 콜백 방식의 신뢰성, 비동키 코드 자체의 가독성을 해결
- Generator

```javascript
function *asyncTask() {
  const data= yield request();
}

function request() {
  ajax('url',function(data){
    it.next(data);
  });
}

const it = asyncTask();
it.next();
```

- Async Function

```javascript
async function asyncTask() {
  const data = await request();
}

function request() {
  return new Promise(resolve => {
    ajax('url', function (data) {
      resolve(data);
    })
  })
}
```
