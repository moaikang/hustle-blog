---
title: SOLID 원칙을 리액트에 적용해보자 - 개방 폐쇄 원칙
description: How To Apply SOLID Principles To Clean Your Code in React - OCP 를 번역했습니다.
category: Front-end
date: 2022-01-21
---

SOLID 원칙의 목적은 유지보수 하기 좋은 코드를 짜고 싶은 개발자에게 가이드를 주는 것입니다.

React는 본질적으로 객체 지향은 아니지만, SOLID 원칙의 아이디어가 좋은 코드를 짜는데 도움이 될 것입니다. 이 글에서는 이 원칙들을 좋은 코드를 짜기 위해 적용하는 것을 보여줄 것입니다.

[지난 글](./solid-react-o)에서는 단일 책임 원칙에 대해 이야기 했습니다. 오늘은 SOLID의 두번째 원칙: 개방 폐쇄 원칙(Open-Closed Principle)에 대해 이야기 해보려 합니다.

## 개방 폐쇄 원칙 (Open-Closed Principle)

Robert C. Martin은 이 원칙을 객체지향 설계에서 가장 중요한 원칙이라고 생각했습니다. 또한, Betrand Meyer는 그의 책 `Object-Oriented Sofware Construction`에서 개방 폐쇄 원칙을 아래와 같이 표현하였습니다.

> 소프트웨어 요소들(클래스, 모듈, 함수 등등..)은 확장에는 열려있어야 하고 변경에는 닫혀 있어야 합니다.

이 원칙은 `새로운 기능을 추가할 때 기존 코드를 건들이지 않고 짤 수 있게` 설계하라고 알려주고 있습니다.

이 원칙을 적용한 예시를 봅시다.

## 예시

유저 디테일을 넘겨받고, 특정 유저의 디테일을 보여주는 기능을 하는 `User`라는 컴포넌트가 있다고 합시다.

```jsx
import React from "react";

export const User = ({ user }) => {
  return (
    <>
      <div> Name: {user.name}</div>
      <div> Email: {user.email}</div>
    </>
  );
};
```

시작하기에 충분히 간단합니다. 하지만 우리의 인생은 단순하지 않습니다. 몇일 뒤에 매니저가 우리 프로덕트에는 유저는 3종류라고 알려줍니다. 예를들면 `SuperAdmin`, `Admin`, `etc` 와 같이요.

그리고 각각은 다른 정보와 기능을 가지고 있습니다.

## 안 좋은 해결책

흠, 가장 명확한 방법은 컴포넌트에 분기를 넣고 유저 타입에 따라 달라지는 정보를 렌더링하는 방법입니다.

```jsx
import React from "react";

export const User = ({ user }) => {
  return (
    <>
      <div> Name: {user.name}</div>
      <div> Email: {user.email}</div>
      {user.type === "SUPER_ADMIN" && <div> Details about super admin</div>}
      {user.type === "ADMIN" && <div> Details about admin</div>}
    </>
  );
};
```

어떤 문제가 있는지 보이십니까?  
첫째로, 코드가 무거워졌습니다.  
둘째로, 다른 타입의 유저가 추가로 생성된다면요? 우리는 `User.js`에 가서 분기를 또 추가해야 합니다.

이건 명확하게 개방 폐쇄 원칙을 위반했습니다. 왜냐하면 새로운 기능이 추가될 때, 기존 코드를 변경해야 하기 때문입니다.

## 해결책은 무엇일까요?

좋습니다. 우리는 이런 상황에 두가지 테크닉을 적용할 수 있습니다.

1. 고차 컴포넌트 (High-order Component)
2. 컴포넌트 합성 (Component Composition)

가능하면 컴포넌트 합성을 이용하는 것이 좋지만, HOC를 사용해야 하는 경우가 있습니다.

이번에는, [컴포넌트 합성(Component Composition)](https://ko.reactjs.org/docs/composition-vs-inheritance.html)이라고 불리는 페이스북에서 권장한 테크닉을 사용할 것입니다.

## 분리된 유저 컴포넌트를 만들어 봅시다.

이제 `User.js`에 Conditional한 코드를 추가할 필요가 없게끔 설계할 필요성이 있습니다.
`SuperAdmin` 이라는 독립적인 컴포넌트를 만들어봅시다.

```jsx
import React from "react";
import { User } from "./User";

export const SuperAdmin = ({ user }) => {
  return (
    <>
      <User user={user} />
      <div> This is super admin user details</div>
    </>
  );
};
```

비슷하게, `Admin` 이라는 컴포넌트를 만들어봅시다.

```jsx
import React from "react";
import { User } from "./User";

export const Admin = ({ user }) => {
  return (
    <>
      <User user={user} />
      <div> This is admin user details</div>
    </>
  );
};
```

이제 `App.js`는 아래와 같이 변하게 됩니다.

```jsx
import React from 'react';
import Admin from './Admin'
import SuperAdmin from './SuperAdmin'


export default function App = () =>{

  const user = {}

  const userByTypes = {
    'admin' : <Admin /> ,
    'superadmin' : <SuperAdmin />
  }

  return <div>
    {userByTypes[`${user.type}`]}
  <div/>
}
```

이제 우리는 우리가 필요한 만큼 유저 타입을 만들수 있습니다.
다른 유저 타입에 대한 우리에 로직은 캡슐화되고, 추가적인 변경을 위해 코드에 재방문할 필요가 없습니다.

우리가 파일 개수를 쓸데없이 늘리고 있다고 말하는 사람도 존재합니다.

물론 지금 정도의 코드는 그대로 둘 수 있지만, 프로젝트 규모가 커지면 관리가 힘들어져서 고통받을 것입니다.

## 주의

`SOLID`는 원칙에 불과합니다. 반드시 모든 시나리오에 적용해야 하는 것은 아닙니다.
노련한 개발자들은 코드 길이와 가독성 사이에서 좋은 밸런스를 찾습니다.

이 원칙들에 너무 집착하지 마십시오. 실제로 이러한 시나리오를 설명하는 유명한 문구가 있습니다.

```
"Too Much Solid"
```

따라서 이러한 원칙을 아는 것은 좋지만, 균형을 유지해야합니다.
하나 또는 두개의 추가 필드에는 이러한 구성이 필요하지 않을 수도 있습니다.
하지만, 타입에 따른 컴포넌트를 별도로 가져가게 되면, 장기적으로 코드를 유지보수할 때 큰 도움이 됩니다.

## 결론

이러한 원칙을 제대로 아는데에는 긴 시간이 필요합니다. 하나의 기능을 만드는 데에는 여러가지 방법이 있기 때문입니다.

원글: [How To Apply SOLID Principles To Clean Your Code in React - OCP](https://betterprogramming.pub/applying-the-open-closed-principle-to-write-clean-react-components-4e4514963e40)
