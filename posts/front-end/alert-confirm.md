---
title: Alert, Confirm UI를 편하게 다루기 위한 고민과 해결법 공유
description: 좋은 인터페이스에 대한 고민과 이에 대한 저의 생각을 적었습니다.
category: Front-end
date: 2022-07-24
---

## 서론

### 인터페이스의 중요성

저희 팀에서는 같은 기능을 다시 개발 하지 않기 위해 기능을 추상화해서 공통화 시키려 노력합니다. 하지만 컴포넌트와 여러 훅들을 공통화 해도, 사용하기 어렵다면

> 이걸 쓸 바에는 새로 만들지…

라는 생각이 들고, 결국 열심히 공통화 시켜놓은 기능은 자연스럽게 버려지게 된다는 사실을 느끼고 있습니다.

따라서 컴포넌트와 훅을 개발할 때 인터페이스를 사용하기 편하게 뚫으려고 노력하고 있습니다.

### 사용하기 쉬운 인터페이스 !== 사용하기 어려운 인터페이스

그렇다면 사용하기 쉬운 인터페이스는 무엇일까요?

사실 아직 잘 모르겠습니다 😂. 사람마다 생각이 다를겁니다.

다만, 사용하기 어렵지 않은 인터페이스는 사용하기 쉬운 인터페이스일 가능성이 크다는 것입니다.

경험적으로 사용하기 어려운 인터페이스는 이러한 특징을 가지고 있었습니다.

- 어떤 역할을 하는지 코드 내부를 봐야만 해서 사용할 때 시간이 많이 듬
- 기능 확장에 열려있지 않아 조금만 상황이 바뀌어도 재활용하기 힘듬

### 사용하기 쉬운 인터페이스의 예시, JS 기본 인터페이스

제 경험상 사용하기 가장 편한 인터페이스는 자바스크립트 기본 문법과 유사한 인터페이스입니다.

왜냐하면 자바스크립트 기본 인터페이스와 유사한 인터페이스는 사용하기 어려운 인터페이스일 가능성이 적기 때문입니다.

모두가 자바스크립트 기본 문법의 인터페이스를 알고 있기 때문에, 이와 유사하게 인터페이스를 뚫어놓는다면 어떻게 동작하겠다 는 예측이 가능해져 굳이 코드 내부를 볼 필요가 없기 때문입니다.

자바스크립트 기본 문법의 인터페이스는 여러 세월에 걸쳐 짱 잘하는 개발자분들이 열심히 만들어놓았기 때문에, 기능 확장에 열려있는 인터페이스일 가능성이 크기 때문입니다.

저는 이러한 생각을 가지고 최대한 자바스크립트 기본 API와 유사한 인터페이스를 뚫으려고 노력합니다.

## 본론

### 자바스크립트 기본 Confirm, Alert의 사용 방법

자바스크립트에서 confirm은 아래와 같이 사용합니다.

```tsx
const isConfirmed = window.confirm("동의합니까?");

if (isConfirmed) {
  // 동의 했을 때 해야할 행동
} else {
  // 동의 하지 않았을 때 해야할 행동
}
```

**window.confirm을 했을 때 나오는 UI**
<img width="515" alt="image" src="https://user-images.githubusercontent.com/52201658/180597269-de02e486-4569-473f-affb-d193a96d0ef0.png">

자바스크립트에서 alert는 아래와 같이 사용합니다.

```tsx
window.alert("경고!");
```

**window.alert를 했을 때 나오는 UI**

<img width="490" alt="image" src="https://user-images.githubusercontent.com/52201658/180597317-fe3b8e0e-f470-4690-8b98-219f7b44076c.png">

### 자바스크립트 기본 Alert, Confirm의 한계

하지만, 기본 API는 프로젝트에 맞게 디자인 커스텀을 할 수 없습니다.

사실상 프로덕트에서는 활용이 불가능합니다.

따라서, 프로덕트에서는 해당하는 기능과 UI를 만들어 사용하게 됩니다.

**커스텀 컨펌**

<img width="431" alt="image" src="https://user-images.githubusercontent.com/52201658/180635695-b546d226-4d92-40ab-8614-af82f85fd1a8.png">

**커스텀 알러트**

<img width="485" alt="image" src="https://user-images.githubusercontent.com/52201658/180635702-285917bf-869a-48a6-adaa-f308457c3d89.png">

### 디자인은 커스텀하고 싶지만 사용성을 포기하기 싫어

이러한 커스텀 Confirm UI와 Alert UI를 자바스크립트 기본 API와 유사하게 사용하고 싶었습니다.

따라서, 아래와 같은 인터페이스를 목표로 개발을 시작했습니다.

```tsx
function Component() {
  const confirm = useConfirm();

  const handleConfirmButtonClick = async () => {
    const isConfirmed = await confirm.open("동의합니까?");
    if (isConfirmed) {
      // DO SOMETHING
    } else {
      // DO SOMETHING
    }
  };

  return (
    <button type="button" onClick={handleConfirmButtonClick}>
      컨펌 띄우기
    </button>
  );
}
```

### 기존 코드

기존에 Confirm 컴포넌트 UI는 만들어져 있었습니다.

또한, Confirm 컴포넌트는 리덕스와 연결되어 있어 리덕스의 상태에 따라 Confirm의 내용물이 바뀌게 되는 구조였습니다.

```tsx
// Redux (예시)
{
  isConfirmOpen: boolean; // Confirm 컴포넌트가 화면에 나오는지 여부
  content: ReactNode; // Confirm 컴포넌트의 내용
}

// Confirm 컴포넌트 (예시)
function Confirm() {
  const { isConfirmOpen, content } = useSelector((state) => state.confirm);

  return isConfirmOpen ? (
    <section>
      <p>{content}</p>
      <button>확인</button>
      <button>취소</button>
    </section>
  ) : null;
}
```

### 고민

```tsx
const isConfirmed = await confirm.open();
```

Confirm UI에서 확인 버튼을 눌렀을 때 isConfirmed에 true를 할당하고, 취소 버튼을 눌렀을 때 isConfirmed에 false를 할당해야 하는데, 이를 어떻게 구현할 수 있을지 고민했습니다.

결론적으로 이를 `Event Emitter` + `Promise`를 통해 구현했습니다.

### Event Emitter?

[이벤트 이미터](https://nodejs.dev/learn/the-nodejs-event-emitter)는 노드 내장 유틸 클래스입니다.

이미터에 on 메서드를 이벤트가 발생했을 때 무엇을 할지에 대한 콜백을 걸어주면, emit 메서드를 통해 발생한 이벤트를 수신할 수 있는 유틸 클래스입니다.

> 이걸 이용해서 Confirm이 열릴 때, on 메서드를 통해 이벤트 수신 대기 시켜놓고, 확인 버튼을 클릭하면 emit 메서드를 통해 true 이벤트를 쏴주고, 취소 버튼을 클릭하면 emit 메서드를 통해 false 이벤트를 쏘는 방식

을 설계하고, 아래와 같은 코드를 만들었습니다.

```tsx
// useConfirm
function useConfirm() {
  const open = (content: ReactNode) => {
    return new Promise((resolve) => {
      eventEmitter.on(({ isConfirmed }) => resolve(isConfirmed));
      modal.open({ content });
    });
  };
}
```

```tsx
// Confirm 컴포넌트 (예시)
function Confirm() {
  const { isConfirmOpen, content } = useSelector((state) => state.confirm);

  return isConfirmOpen ? (
    <section>
      <p>{content}</p>
      <button onClick={() => eventEmitter.emit(true)}>확인</button>
      <button onClick={() => eventEmitter.emit(false)}>취소</button>
    </section>
  ) : null;
}
```

```tsx
// 사용하는 곳 (예시)
function Component() {
  const confirm = useConfirm();

  const handleConfirmButtonClick = async () => {
    const isConfirmed = await confirm.open("동의합니까?");
    if (isConfirmed) {
      // DO SOMETHING
    } else {
      // DO SOMETHING
    }
  };

  return (
    <button type="button" onClick={handleConfirmButtonClick}>
      컨펌 띄우기
    </button>
  );
}
```

이와 유사한 방법으로 Alert도 만들어 사용하고 있습니다.

```tsx
function Component() {
  const alert = useAlert();

  const handleConfirmButtonClick = async () => {
    await alert.open("경고!");
    // Do Something After Alert
  };

  return (
    <button type="button" onClick={handleConfirmButtonClick}>
      컨펌 띄우기
    </button>
  );
}
```

## 결론

이러한 방법으로 자바스크립트 기본 API를 사용하는 것 수준의 편한 사용성의 코드를 만들어 낼 수 있었습니다.

사용성이 좋은 코드는 단순히 보기 편할 뿐 아니라, 유지 보수성과 개발 생산성이 올라가 더 빠르게 유저의 의견을 반영할 수 있게 되어 비지니스에도 큰 도움이 된다고 확신합니다.

사용성이 좋은 코드를 만들기 위해 항상 노력해주시고 피드백 주시는 팀원분들께 감사드리면서 글 마치겠습니다.

**추가**

NodeJS는 브라우저에서 사용할 수 없어, 구현해 사용하였습니다.

```tsx
class EventEmitter {
  private _callbacks: { [key: string]: unknown[] };

  constructor() {
    this._callbacks = {};
  }

  public on<T extends Object>(
    eventName: string,
    callback: (callbackParams: T) => void
  ) {
    if (!this._callbacks[eventName]) this._callbacks[eventName] = [];
    this._callbacks[eventName].push(callback);
  }

  public emit<T extends Object>(eventName: string, data: T) {
    const callbacks = this._callbacks[eventName];

    if (callbacks) {
      callbacks.forEach((callback) => callback(data));
    }
  }
}

export default EventEmitter;
```
