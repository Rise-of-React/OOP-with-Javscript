# Today I learned

## 프론트엔드에서의 테스트 과정?

- 수많은 테스트 용어들

      블랙박스, 그레이박스, 화이트박스, 단위, 회귀, 통합, UI, 시스템, 기능, E2E, 성능, 베타, 알파 , 오픈 베타, 클로즈 베타 테스트 등..

Kent.C.Dodds가 제안한 프론트엔드 개발자가 테스트를 해야하는 부분들

### Static Test

> 코드를 실행시키지 않고 테스트하는것.
>
> 타입에러, 참조에러를 겪는 문제를 처리하기 위함.

- `구문 오류`, 나쁜 코드, `스타일 검증`

      ESLint, Typescript, Flow(Facebook)

### Unit Test

> 기능의 개별적인 단위를 테스트하는것.
>
> 전체 어플에서 작은 단위로 떼어 내어 분리된 환경에서 테스트를 함.
>
> `Mocking 필요`

      Jest

- 장점

      단위가 작아서 비용이 낮음.
      실행속도가 빠르다.

### Intgration Test

> `어플의 여러부분을 통합`해서 테스트하는 높은수준의 테스트
>
> 단위테스트보다 큰 범위의 테스트
>
> 주로 페이지 범위의 테스트를 의미한다.

      Jest, RTL, Enzyme

### E2E Test

> 실제 사용하는 `사용자와 같은 조건`에서 테스트 하는것.
>
> API, DB 외부 서비스를 모두 사용하여 테스트 진행한다.

      Cypress, Selenium

- 단점

      비용이 많이듬
      실행속도가 느림

### 통합테스트가 비중이 높은 이유?

테스트를 작성하지만 너무 많이 하면 안됨.
테스트 커버리지는 70퍼센트 수준으로 한다.

## 프론트엔드 테스팅 대상

### `사용자 이벤트 처리`

      Mouse Event, Keyboard Event 등..
      브라우저상에 이벤트를 발생시켜서 테스트를 진행해야함

> Example

```javascript
import {fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

fireEvent.change(검색창, {target: {value: '네이버'}});
fireEvent.click(검색버튼);

userEvent.type(정보,'효진');
userEvent.click(버튼);
```

### `API 서버 통신`

실제 API나 mock API 사용해서 테스트

> Example
```javascript
const response = await fetch('https://api.com',{
  method: 'POST',
  body: JSON.stringfy({
    이름:'안효진',
    주소:'서울'
  }),
});
const result = await response.json();

expect(result).toBe('맞아요'); //Error: expected '틀려요'
```

### `시각적 요소`

백엔드의 경우 입력과 출력값을 검증하는데 프론트엔드에서는 입력은 사용자 액션이고 출력은 사용자 액션에따른 화면의 변화 처리를 해야함.

> 스냅샷 테스트

    HTML 구조가 의도한 대로 나타나는지 테스트
    ex) Jest, Storybook

>> Example
```javascript
import {render} from '@testing-library/react';

const number= 21;
test('still number 21 even clicked button',()=>{
  const element = render(<div>{number}</div>);

  expect(element).toMatchSnapshot();
})
```

> 시각적 회귀 테스트

    HTML에 CSS를 더해서 컴포넌트가 실제로 브라우저에서 렌더링 되는 모습이 의도한대로 나타나는지 테스트
    ex) Storybook

# `테스팅 환경`

## 브라우저 환경

1. 모든 WebAPI에 접근할 수 있고 서로 다른 브라우저에서 테스팅할수있어서 브라우저, 기기 호환성 테스트를 할 수 있음.
2. 브라우저 process가 node보다 느렵고 무거워 테스팅이 느림.
3. 브라우저를 실행해야하기때문에 별도로 Headless브라우저를 사용해야함.

## NodeJS 환경

1. 브라우저보다 속도가 빠름
2. 모듈단위로 테스트 가능
3. DOM API가 없어서 가상으로 구현하는 라이브러리jsdom을 사용한다. 하지만 한계가 있다.

        ex) Jest,Mocha

### 뭘 써야하는지?

1. `크로스 브라우징 테스트`가 반드시 필요한 경우 브라우저 환경을 사용
2. `브라우저의 실제 동작`에 대한 테스트가 필요하면 브라우저 환경을 사용
3. 그 외의 Node환경에서 사용한다.
