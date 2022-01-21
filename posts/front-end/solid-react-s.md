---
title: SOLID 원칙을 리액트에 적용해보자 - 단일 책임 원칙
description: How To Apply SOLID Principles To Clean Your Code in React - SRP 를 번역했습니다.
category: Front-end
date: 2022-01-20
---

SOLID 원칙의 목적은 좋은 코드를 짜고 싶은 개발자에게 가이드를 주는 것입니다.

우리는 안좋은 코드에서 시작해 SOLID의 첫번째 원칙을 적용해 볼 것입니다. 그리고 이 원칙이 우리에게 어떻게 코드 양이 적고 깔끔한 리액트 컴포넌트를 만드는 것을 도와주는 지 볼 것입니다.

시작해봅시다.

## 단일 책임 원칙이란 무엇일까요?

단일 책임 원칙(SRP, Single Responsibility Principle)은 각각의 클래스나 컴포넌트가 하나의 이유만을 위해서 존재해야 한다는 것입니다.

`컴포넌트는 하나의 기능만을 해야합니다.`

잘 돌아가지만 안좋은 코드를 리팩토링하고, 단일 책임 원칙을 통해 이 코드를 깔끔하게 만들어봅시다.

## 안좋은 예로 시작해봅시다.

먼저 단일 책임 원칙을 어긴 코드를 먼저 봅시다. 주석이 이해를 돕기 위해서 달려 있습니다.

```jsx
import React, { useEffect, useReducer, useState } from "react";

const initialState = {
  isLoading: true,
};

// 복잡한 상태 관리
function reducer(state, action) {
  switch (action.type) {
    case "LOADING":
      return { isLoading: true };
    case "FINISHED":
      return { isLoading: false };
    default:
      return state;
  }
}

export const SingleResponsibilityPrinciple = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [state, dispatch] = useReducer(reducer, initialState);

  const showDetails = (userId) => {
    const user = filteredUsers.find((user) => user.id === userId);
    alert(user.contact);
  };

  // 데이터 페칭
  useEffect(() => {
    dispatch({ type: "LOADING" });
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => {
        dispatch({ type: "FINISHED" });
        setUsers(json);
      });
  }, []);

  // 데이터 가공
  useEffect(() => {
    const filteredUsers = users.map((user) => {
      return {
        id: user.id,
        name: user.name,
        contact: `${user.phone} , ${user.email}`,
      };
    });
    setFilteredUsers(filteredUsers);
  }, [users]);

  // 복잡한 UI 렌더링
  return (
    <>
      <div> Users List</div>
      <div> Loading state: {state.isLoading ? "Loading" : "Success"}</div>
      {users.map((user) => {
        return (
          <div key={user.id} onClick={() => showDetails(user.id)}>
            <div>{user.name}</div>
            <div>{user.email}</div>
          </div>
        );
      })}
    </>
  );
};
```

### 이 코드가 하는 일

이 함수형 컴포넌트는 데이터를 페칭하고, 데이터를 필터링하고, 그리고 UI를 보여주고 있습니다. 또한 API 요청의 로딩 상태 또한 존재합니다.

이 컴포넌트에서는 많은 일이 일어나고 있습니다.

1. 원격 데이터 페칭
2. 데이터 필터링
3. 복잡한 상태 관리
4. 복잡한 UI 기능

이 코드를 개선시켜봅시다.

## 첫째, 데이터 가공 로직을 분리합시다.

경험에 따르면, HTTP 요청을 컴포넌트에서 하는 것은 좋지 않습니다. 이 코드들을 컴포넌트에서 분리할 수 있는 몇가지 전략이 있습니다.

적어도 데이터 페칭 로직을 커스텀 훅에 옮기세요.
예를 들면, 우리는 `useGetRemoteData`라는 이름의 코드를 만들 수 있습니다.

```jsx
import { useEffect, useReducer, useState } from "react";

const initialState = {
  isLoading: true,
};

function reducer(state, action) {
  switch (action.type) {
    case "LOADING":
      return { isLoading: true };
    case "FINISHED":
      return { isLoading: false };
    default:
      return state;
  }
}

export const useGetRemoteData = (url) => {
  const [users, setUsers] = useState([]);
  const [state, dispatch] = useReducer(reducer, initialState);

  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    dispatch({ type: "LOADING" });
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => {
        dispatch({ type: "FINISHED" });
        setUsers(json);
      });
  }, []);

  useEffect(() => {
    const filteredUsers = users.map((user) => {
      return {
        id: user.id,
        name: user.name,
        contact: `${user.phone} , ${user.email}`,
      };
    });
    setFilteredUsers(filteredUsers);
  }, [users]);

  return { filteredUsers, isLoading: state.isLoading };
};
```

이제 우리의 컴포넌트는 아래와 같은 모습으로 바뀝니다.

```jsx
import React from "react";
import { useGetRemoteData } from "./useGetRemoteData";

export const SingleResponsibilityPrinciple = () => {
  const { filteredUsers, isLoading } = useGetRemoteData();

  const showDetails = (userId) => {
    const user = filteredUsers.find((user) => user.id === userId);
    alert(user.contact);
  };

  return (
    <>
      <div> Users List</div>
      <div> Loading state: {isLoading ? "Loading" : "Success"}</div>
      {filteredUsers.map((user) => {
        return (
          <div key={user.id} onClick={() => showDetails(user.id)}>
            <div>{user.name}</div>
            <div>{user.email}</div>
          </div>
        );
      })}
    </>
  );
};
```

컴포넌트가 엄청 작아지고 이해하기 쉬워졌습니다! 커스텀 훅으로 데이터 페칭 로직을 분리하는 것은 복잡한 코드 베이스에서 가장 먼저 할 수 있는 일입니다.

하지만, 우리는 더 할 일이 남았습니다.

## 둘째, 데이터 페칭을 위한 재사용 가능한 Hook을 만듭시다.

`useGetRemoteData` Hook을 보면, 이 훅이 두가지 일을 하는 것을 알수 있습니다.

1. 데이터 페칭
2. 데이터 가공

데이터 페칭하는 로직을 `useHttpGetRequest`라는 이름을 가진 훅으로 분리해봅시다.

```jsx
import { useEffect, useReducer, useState } from "react";
import { loadingReducer } from "./LoadingReducer";

const initialState = {
  isLoading: true,
};

export const useHttpGetRequest = (URL) => {
  const [users, setUsers] = useState([]);
  const [state, dispatch] = useReducer(loadingReducer, initialState);

  useEffect(() => {
    dispatch({ type: "LOADING" });
    fetch(URL)
      .then((response) => response.json())
      .then((json) => {
        dispatch({ type: "FINISHED" });
        setUsers(json);
      });
  }, []);

  return { users, isLoading: state.isLoading };
};
```

추가로, 리듀서 로직을 다른 파일로 분리할 수 있습니다.

```jsx
export function loadingReducer(state, action) {
  switch (action.type) {
    case "LOADING":
      return { isLoading: true };
    case "FINISHED":
      return { isLoading: false };
    default:
      return state;
  }
}
```

변화된 `useGetRemoteData` Hook은 아래와 같습니다.

```jsx
import { useEffect, useState } from "react";
import { useHttpGetRequest } from "./useHttpGet";
const REMOTE_URL = "https://jsonplaceholder.typicode.com/users";

export const useGetRemoteData = () => {
  const { users, isLoading } = useHttpGetRequest(REMOTE_URL);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const filteredUsers = users.map((user) => {
      return {
        id: user.id,
        name: user.name,
        contact: `${user.phone} , ${user.email}`,
      };
    });
    setFilteredUsers(filteredUsers);
  }, [users]);

  return { filteredUsers, isLoading };
};
```

훨씬 깔끔하고 훨씬 낫지 않나요?

## 셋째, UI 컴포넌트를 분해합시다.

컴포넌트에서 유저 디테일을 보여주는 부분을 봅시다.
우리는 재활용 가능한 `UserDetails` 컴포넌트를 만들수 있습니다.

```jsx
const UserDetails = (user) => {
  const showDetails = (user) => {
    alert(user.contact);
  };

  return (
    <div key={user.id} onClick={() => showDetails(user)}>
      <div>{user.name}</div>
      <div>{user.email}</div>
    </div>
  );
};
```

최종적으로, 우리의 컴포넌트는 아래와 같이 변경되었습니다.

```jsx
import React from "react";
import {useGetRemoteData} from "./useGetRemoteData";

export const Users = () => {
    const {filteredUsers , isLoading} = useGetRemoteData()

    return <>
        <div> Users List</div>
        <div> Loading state: {isLoading? 'Loading': 'Success'}</div>
        {filteredUsers.map(user => <UserDetails user={user}/>)}
    </>
```

60줄의 코드가 12줄로 줄였습니다. 그리고 5개의 깔끔하고 하나의 책임을 가진 파일로 분리했습니다.

## 복습

코드를 돌이켜보며 우리가 단일 책임 원칙을 지켰는지 점검해봅시다.

- `User.js` - 유저 리스트를 보여주는 기능
- `UserDetail.js` - 유저 디테일을 보여주는 기능
- `UseGetRemoteData.js` - 페칭한 데이터를 가공하는 기능
- `useHttpGetRequest.js` - HTTP 요청하는 기능
- `LoadingReducer.js` - 복잡한 상태 관리

물론, 더 개선할 여지는 많지만 방금 했던 작업들이 좋은 출발점이 될 것입니다.

## 결론

SOLID 원칙으로 각 파일의 코드 양을 줄이고 아름답고 재사용 가능한 구성 요소를 만드는 방법에 대해 알아보았습니다.

원글: [How To Apply SOLID Principles To Clean Your Code in React - SRP](https://betterprogramming.pub/how-to-apply-solid-principles-to-clean-your-code-in-react-cdfd5e0a9cea)
