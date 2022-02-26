---
title: SOLID 원칙을 리액트에 적용해보자 - 리스코브 치환 원칙
description: How To Apply SOLID Principles To Clean Your Code in React - LSP 를 번역했습니다.
category: Front-end
date: 2022-01-22
---

SOLID 원칙은 클린 코드를 만들고 버그가 적고 에러가 적은 유지보수 하기 쉬운 애플리케이션을 만들기 위한 가이드 라인입니다.

오늘, 우리는 SOLID의 3번째 원칙인 `리스코브 치환 원칙` 대해 알아볼 것입니다.
이 원칙이 어떻게 더 좋고 깔끔한 리액트 애플리케이션을 만드는데 도움을 주는지 알아볼 것입니다.

## 리스코브 치환 원칙이란?

간단하게 말하면, 이 원칙은 아래와 같습니다.

```
자식 클래스는 부모 클래스를 완벽하게 대체 할 수 있어야 합니다.
```

특정 클래스의 서브 클래스는 기능을 해치지 않고 부모 클래스를 대체할 수 있어야 한다는 것입니다.

### 예시

만약 `플라스틱 오리`가 `오리`의 자식 클래스라면, `오리`의 인스턴스를 `플라스틱 오리`의 인스턴스로 바꾸어도 별 이상없이 돌아가야 합니다.

![오리오리](https://miro.medium.com/max/1400/1*dRfUFxV7oKEEJAI9X9BdEA.png)

이 말은 `플라스틱 오리`가 `오리`의 요구사항을 반드시 만족시켜야 한다는 말과 같습니다.

## 이 원칙을 리액트에서는 어떻게 받아들일까요?

리액트는 기본적으로 자바스크립트이기 때문에, 객체지향 프레임워크가 아닙니다.
리액트의 맥락으로는, 이 원칙안에 있는 주요한 아이디어는 아래와 같습니다.

```
컴포넌트는 반드시 일종의 규칙을 준수해야 합니다.
```

본질적으로 이는 컴포넌트간에 일종의 규칙이 있어야 함을 의미합니다.
따라서, 컴포넌트가 다른 컴포넌트에서 사용될 때, 컴포넌트는 기능을 고장내거나 다른 문제를 일으키면 안됩니다.

## 더 자세히 알아봅시다.

`ModalHolder` 컴포넌트를 봅시다. 이 컴포넌트는 `contentToShow`를 `props`로 받고, 이를 모달 안에서 보여줍니다.

```jsx
import { useState } from "react";
import Modal from "react-modal";

export const ModalHolder = ({ contentToShow }) => {
  const [visibility, setVisibility] = useState(false);

  return (
    <>
      <button onClick={() => setVisibility(true)}> Show Modal</button>

      <Modal isOpen={visibility}>
        <div>{contentToShow}</div>
      </Modal>
    </>
  );
};
```

여기서 문제가 무엇일까요?

흠, 문제는 `ModalHolder` 컴포넌트로 내려오는 `props`에 대해 아무 제한이 없다는 것입니다.
확실히 아무 값이나 `contentToShow`를 통해서 내려올 수 있습니다.

먼저, 우리 코드가 잘 동작하는지 확인해봅시다.

```jsx
// App.jsx

import React, { useEffect } from "react";
import { ModalHolder } from "./views/liskov-substitution-principle/ModalHolder";

function App() {
  const modalContent = <div> This is shown inside modal </div>;

  return (
    <div>
      <ModalHolder contentToShow={modalContent} />
    </div>
  );
}

export default App;
```

이 코드는 잘 동작할 것입니다.

![모달잘돼](https://miro.medium.com/max/1400/1*Ej45FJzyv9mtFXh3QtAeGA.png)

앞에서 살펴본 문제로 이 어플리케이션을 어떻게 깨트릴 수 있는지 확인해봅시다.

```jsx
// App.jsx

import React, { useEffect } from "react";
import { ModalHolder } from "./views/liskov-substitution-principle/ModalHolder";

function App() {
  const modalContent = { key: " value" };

  return (
    <div>
      <ModalHolder contentToShow={modalContent} />
    </div>
  );
}

export default App;
```

이 코드는 컴파일 단계에서는 에러를 절대 뿜지 않을 것입니다.
자, 우리 애플리케이션을 열고 우리가 버튼을 클릭하면 무슨 일이 일어나는지 확인해 봅시다.

![에러천지](https://miro.medium.com/max/1400/1*67ENRHAiKBwYpndTSVFT-w.png)

우리의 애플리케이션은 코드에 에러가 없는데에도 불구하고 에러를 뿜어냅니다. 무엇이 잘못되었을까요?

`Modal` 컴포넌트는 리액트 컴포넌트만을 받아야 동작하도록 개발되어 있습니다.
하지만, 다른 요소들을 받을 수 있게 되어있습니다.
다른 요소들을 고려하지 않고 개발되었기에 동작하지 않습니다.

## 해결책은 무엇인가요?

우리는 타입스크립트 사용의 중요성을 알아볼 것입니다.
`ModalHolder` 컴포넌트를 타입스크립트로 리팩터링하고 어떤 일이 일어나는지 확인해봅시다.

```tsx
import { ReactElement, useState } from "react";
import Modal from "react-modal";

interface ModalHolderProps {
  contentToShow: JSX.Element;
}

export const ModalHolder = ({ contentToShow }: ModalHolderProps) => {
  const [visibility, setVisibility] = useState(false);

  return (
    <>
      <button onClick={() => setVisibility(true)}> Show Modal</button>

      <Modal isOpen={visibility}>
        <div>{contentToShow}</div>
      </Modal>
    </>
  );
};
```

우리는 우리 컴포넌트의 `contentToShow` Props를 `JSX.Element` 타입으로만 받을수 있게 리팩토링 했습니다.

만약 `JSX.Element` 타입이 아닌 타입을 내려주려 한다면, 에러를 뿜을 것입니다.

![](https://miro.medium.com/max/1400/1*w4d0iPlF-h1CFJkWHSkiIg.png)

짜잔! 이제 `ModalHolder` 컴포넌트에 연결하려는 다른 모든 컴포넌트는 예기치 않은 동작을 하지 않도록 규칙을 따라야 합니다.

## 우리가 해냈나요?

`ModalHolder` 컴포넌트는 이 컴포넌트를 사용하는 어떤 자식 컴포넌트도 반드시 부모의 규칙을 따라야 하도록 만들어졌기 때문에, 예기치 않은 동작을 할수 없게 됩니다.

이게 `리스코브 치환 원칙`이 말하고자 하는 바입니다.

맞아요. 우리가 해냈습니다!

원글: [How To Apply SOLID Principles To Clean Your Code in React - Liscov Substitution Principle](https://betterprogramming.pub/applying-the-liskov-substitution-principle-in-react-3a0614a42a08)
