---
title: 실용적인 리액트 클린코드 전략
description: 과거에 내가 짠 코드에 현재의 내가 공격 당하면서 느낀 클린 코드 전략을 상황별로 정리해 보았습니다.
category: Front-end
date: 2022-02-26
---

## 시작하기 전에…

이제 갓 2년차가 된 주니어가 (심지어 리액트는 실무에서는 3개월 밖에 안 사용해봄…) 클린 코드에 대해 느낀 점을 공유하는게 의미가 있을까 라는 생각에 공유하기가 매우 매우 조심스럽습니다.

하지만, 복잡한 비지니스 요구사항을 최대한 단순화하고 변화에 유연하게 만들고자 공부하고 고민하면서 느낀점을 일반화 해서 세운 나름대로의 원칙을 공유하고 피드백을 받는 것은 의미가 있을 것 같아 공유하게 되었습니다.

그냥 이런 사람도 있구나~ 라는 가벼운 마음으로 봐 주시고, 더 좋은 방법이 있다면 피드백 주시면 감사하겠습니다.

## 1. 반복에 대해

### 반복되는 로직은 커스텀 훅으로 추출한다.

함수형 컴포넌트를 사용할 경우 커스텀 훅을 사용할 수가 있는데, 상태와 관련된 동일한 로직이 두 번 이상 반복된다면 커스텀 훅을 사용해 추출을 고려해 볼 수 있습니다.

```jsx
// AS IS...
function Component1() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleIdInputChange = (e) => {
    if (e.target.value !== id) {
      setId(e.target.value);
    }
  };

  const handlePasswordInputChange = (e) => {
    if (e.target.value !== id) {
      setPassword(e.target.value);
    }
  };

  return (
    <div>
      <input type="text" value={id} onChange={handleIdInputChange} />
      <input
        type="text"
        value={password}
        onChange={handlePasswordInputChange}
      />
    </div>
  );
}
```

```jsx
// TO BE...
function useInput(initialValue) {
  const [input, setInput] = useState(initialValue);

  const handleInputChange = (e) => {
    if (e.target.value !== input) {
      setInput(e.target.value);
    }
  };

  return [input, handleInputChange];
}

function Component1() {
  const [id, handleIdInputChange] = useInput("");
  const [password, handlePasswordChange] = useInput("");

  return (
    <div>
      <input type="text" value={id} onChange={handleIdInputChange} />
      <input
        type="text"
        value={password}
        onChange={handlePasswordInputChange}
      />
    </div>
  );
}
```

## 비슷한 느낌의 Props가 반복된다면 객체로 묶어서 한번에 넘길수 있을지에 대해 고민해본다.

비슷한 느낌의 Props가 반복된다면 객체로 묶어서 한번에 넘기는 방법을 사용해 Props 개수를 줄일 수 있습니다.

```jsx
// AS IS...
function Comp() {
  const rowOne = <div />;
  const rowTwo = <button />;
  const rowThree = <span />;
  const rowFour = <section />;

  return (
    <Container
      rowOne={rowOne}
      rowTwo={rowTwo}
      rowThree={rowThree}
      rowFour={rowFour}
    />
  );
}
```

```jsx
// TO BE...
function Comp() {
  const ROW_COMPONENT_MAP = {
    ONE: <div />,
    TWO: <button />,
    THREE: <span />,
    FOUR: <section />,
  };

  return <Container rowComponentMap={ROW_COMPONENT_MAP} />;
}
```

### Props가 반복된다면 Props Getter 함수를 만들어서 재활용한다.

다른 두개 이상의 컴포넌트에서 동일한 Props가 반복된다면 Props Getter 함수를 만들어서 반복을 제거할 수 있습니다.

```jsx
// AS IS...

import React from "react";

function DraggableButton() {
  const handleDragStart = () => {};
  const handleDrag = () => {};
  const handleDragEnd = () => {};
  const handleDragEnter = () => {};
  const handleDragLeave = () => {};

  return (
    <Draggable
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
    >
      <button />
    </Draggable>
  );
}

function DraggableInput() {
  const handleDragStart = () => {};
  const handleDrag = () => {};
  const handleDragEnd = () => {};
  const handleDragEnter = () => {};
  const handleDragLeave = () => {};

  return (
    <Draggable
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
    >
      <input type="text" />
    </Draggable>
  );
}
```

```jsx
// TO BE...
const getDraagableProps = () => {
  return {
    onDragStart: () => {},
    onDrag: () => {},
    onDragEnd: () => {},
    onDragEnter: () => {},
    onDragLeave: () => {},
  };
};

function DraggableButton() {
  return (
    <Draggable {...getDraggableProps()}>
      <button />
    </Draggable>
  );
}

function DraggableInput() {
  return (
    <Draggable {...getDraggableProps()}>
      <input type="text" />
    </Draggable>
  );
}
```

## 복잡도에 대해

### 복잡한 로직은 커스텀 훅이나 함수로 추출하는 것이 좋다.

복잡한 로직이 컴포넌트에 들어간다면 컴포넌트의 복잡도가 올라가 코드를 이해하기 힘들어집니다.

컴포넌트의 복잡도가 올라간다면, 로직을 커스텀 훅이나 함수로 추출하는 것을 고려해 볼 수 있습니다.

```jsx
// AS IS..
function Component() {
  const [input, setInput] = useState("");

  const changeInput = (value) => {
    setInput(value);
  };

  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos([...todos, todo]);
  };

  return (
    <>
      <input type="text" value={input} onChange={changeInput} />
      <button onClick={addTodo} />
      {todos.map((todo) => (
        <div key={todo.id}>{todo}</div>
      ))}
    </>
  );
}
```

```jsx
// TO BE...
function Component() {
  const { input, changeInput } = useInput();
  const { todos, addTodo } = useTodo();

  return (
    <>
      <input type="text" value={input} onChange={changeInput} />
      <button onClick={addTodo} />
      {todos.map((todo) => (
        <div key={todo.id}>{todo}</div>
      ))}
    </>
  );
}
```

### 조건문이 복잡해 이해하기 힘들 때는, 조건에 해당하는 타입을 만들고, 타입에 해당하는 행동으로 분리한다.

조건문이 복잡할 때에는 조건에 따른 타입과 조건에 따른 행동을 분리하게 된다면 컴포넌트의 복잡도를 줄일 수 있습니다.

```tsx
// AS IS
const Card = (props: Props) => {
  const { application, column } = props;
  const applyStatus = application.apply_status;

  if (applyStatus === APPLICATION_STATUS.REJECT) {
    return <RejectedCard {...props} />;
  }

  if (
    APPLICATION_STATUS.NOT_FOUND === applyStatus ||
    APPLICATION_STATUS.DENY === applyStatus ||
    APPLICATION_STATUS.WRONG === applyStatus
  ) {
    return <ErrorCard {...props} />;
  }

  return null;
};
```

```tsx
// TO BE
const Card = (props: Props) => {
  const { application, column } = props;
  const cardType = buildCardType(application, column);

  if (cardType === CardType.REJECTED_APPLICATION) {
    return <RejectedCard {...props} />;
  }

  if (cardType === CardType.Error) {
    return <ErrordCard {...props} />;
  }

  return null;
};
```

### JSX에 Condition이 많아지면 컴포넌트를 분리한다.

JSX에 Condition이 많아지면 코드를 보기가 힘들어집니다.  
이때, 컨디션을 타입으로 만들고, 타입에 따라 컴포넌트를 분리하면 복잡도를 줄일 수 있습니다.

```jsx
// AS IS...
function Component() {
  return (
    <div>
      {isHappy ? (
        <Happy />
      ) : isSad ? (
        <Sad />
      ) : isExcited ? (
        <Excited />
      ) : (
        <Soso />
      )}
    </div>
  );
}
```

```jsx
// To BE...
function Component() {
  const emotion = getEmotion();

  const emotionComponentMap = {
    HAPPY: <Happy />,
    SAD: <Sad />,
    EXCITED: <Excited />,
  };

  return emotionComponentMap[emotion] || <SoSo />;
}
```

#### 컴포넌트 Props에 Type이 들어간다면 컴포넌트를 분리하거나 Composition을 고려한다.

타입에 따라 분기를 타게 되면, 코드를 한눈에 이해하기 힘들어집니다.
이때 컴포넌트 분리나 Composition을 고려할 수 있습니다.

```jsx
// AS IS...
function IconButton({ type, text, onClick }) {
  let iconComponent;

  if (type === "plus") {
    iconComponent = <i className="plus-icon" />;
  }

  if (type === "minus") {
    iconComponent = <i className="minus-icon" />;
  }

  if (type === "multiply") {
    iconComponent = <i className="multiply-icon" />;
  }

  if (type === "divide") {
    iconComponent = <i className="divide-icon" />;
  }

  if (!iconComponent) {
    iconComponent = <React.Fragment />;
  }

  return (
    <StyledButton onClick={onClick}>
      {iconComponent}
      {text}
    </StyledButton>
  );
}
```

```jsx
// TO BE(1)...
function AddIconButton({ text, onClick }) {
  return (
    <StyledButton onClick={onClick}>
      <i className="plus-icon" />
      {text}
    </StyledButton>
  );
}

function MinusIconButton({ text, onClick }) {
  return (
    <StyledButton onClick={onClick}>
      <i className="minus-icon" />
      {text}
    </StyledButton>
  );
}
```

```jsx
// TO BE(2)...
function IconButton({ iconComponent, onClick }) {
  return (
    <StyledButton onClick={onClick}>
      {iconComponent}
      {text}
    </StyledButton>
  );
}
```

### 컴포넌트가 해야할 기능은 최대한 각자의 컴포넌트 스스로 처리한다.

자식이 해야할 일을 부모로 끌어올린다면 부모 컴포넌트의 복잡도가 올라가 코드를 이해하기 어려워집니다.
컴포넌트가 해야할 기능은 최대한 각자 컴포넌트 스스로 처리하게 되면 부모 컴포넌트의 복잡도를 줄일 수 있습니다.

```jsx
// AS IS...
function PlayList() {
  const [list, setList] = useState(INITIAL_LIST);

  const handlePlayListItemClick = (item) => (e) => {
    console.log(item.name);
  };

  return (
    <ul>
      {list.map((item) => (
        <PlayListItem
          key={item.id}
          item={item}
          onClick={handlePlayListItemClick(item)}
        />
      ))}
    </ul>
  );
}

function PlayListItem({ item, onClick }) {
  return <li onClick={onClick}>{item.name}</li>;
}
```

```jsx
//To Be...
function PlayList() {
  const [list, setList] = useState(INITIAL_LIST);

  return (
    <ul>
      {list.map((item) => (
        <PlayListItem key={item.id} {...item} />
      ))}
    </ul>
  );
}

function PlayListItem({ name }) {
  const handleClickItem = () => {
    console.log(item.name);
  };

  return <li onClick={handleClickItem}>{name}</li>;
}
```

### Props가 복잡하다면 Props Getter 함수를 만들어서 격리시킨다.

Props Getter 함수를 만들어서 Props의 복잡도를 줄일 수 있습니다.  
다만, Props Getter 함수를 만든다면 한눈에 어떤 Props가 들어가는지 파악하기 어려워지므로, `한눈에 어떤 Props가 들어가는지 파악하기 어려워지는 단점` < `Props가 복잡해져서 컴포넌트가 무엇을 하는지 파악이 어려워지는 단점`의 상황에서만 사용하는게 좋다고 느꼈습니다.

```jsx
// AS IS...
function DraggableButton() {
  const handleDragStart = () => {};
  const handleDrag = () => {};
  const handleDragEnd = () => {};
  const handleDragEnter = () => {};
  const handleDragLeave = () => {};

  return (
    <Draggable
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
    >
      <button />
    </Draggable>
  );
}
```

```jsx
// TO BE...
const getDraggableProps = () => {
  return {
    onDragStart: () => {},
    onDrag: () => {},
    onDragEnd: () => {},
    onDragEnter: () => {},
    onDragLeave: () => {},
  };
};

function DraggableButton() {
  return (
    <Draggable {...getDraggableProps()}>
      <button />
    </Draggable>
  );
}
```

### 배열을 순회하면서 원소에 대한 복잡한 작업을 할때는, 작업을 각자의 원소에 분할해 복잡도를 줄일수 있다.

해야하는 작업을 분할해서 처리하는 것이 대부분의 상황에서 복잡도가 적게 느껴집니다.

```jsx
// AS IS...
const humanInfos = humans.map((human) => {
  let info = "";

  info += human.name;
  info += human.age;
  info += human.job;
  info += human.gender;

  return info;
});
```

```jsx
// TO BE...
const humanInfos = humans.map((human) => human.getInfo());
```

## 3. 가독성에 대해

### 복잡한 조건문은 변수나 함수로 어떤 기능을 하는지 명시해준다.

조건문이 복잡해지면 변수나 함수로 어떤 것을 판별하는지에 대해 명시를 해주면 코드 이해가 쉬워질 수 있습니다.

```jsx
// AS IS...
function check() {
  const application = getApplication();
  const { applyStatus } = application;

  if (
    MATCHUP_PROPOSAL_APPLICATION_STATUS.OFFER === applyStatus ||
    MATCHUP_PROPOSAL_APPLICATION_STATUS.OPEN === applyStatus ||
    MATCHUP_PROPOSAL_APPLICATION_STATUS.CHECK === applyStatus
  ) {
    application.check();
  }
}
```

```jsx
// TO BE...
function check() {
  const application = getApplication();
  const { applyStatus } = application;

  const isApplicaionCheckable =
    MATCHUP_PROPOSAL_APPLICATION_STATUS.OFFER === applyStatus ||
    MATCHUP_PROPOSAL_APPLICATION_STATUS.OPEN === applyStatus ||
    MATCHUP_PROPOSAL_APPLICATION_STATUS.CHECK === applyStatus;

  if (isApplicationCheckable) {
    application.check();
  }
}
```

### 최대한 일반적인 인터페이스를 사용해야 한번에 코드를 이해하기 쉽다.

인터페이스는 일반적이라면 한눈에 어떻게 동작할지 예상이 가능해져서 코드를 이해하기 쉬워집니다.

일반적인 인터페이스의 예시로는 `DOM Attribute`를 들 수 있을 것 같습니다.
그 외에, 일반적으로 사용하는 인터페이스가 무엇인지 쉽게 파악하기 어려운데,
저는 여러 디자인 시스템 라이브러리의 인터페이스를 참고하면서 개발하였습니다.

```jsx
// AS IS
function Button({ whenClickMouse }) {
  return <button type="button" onClick={whenClickMouse} />;
}

function Component() {
  return <Button whenClickMouse={() => {}} />;
}
```

```jsx
// AS IS
function Button({ onClick }) {
  return <button type="button" onClick={onClick} />;
}

function Component() {
  return <Button onClick={() => {}} />;
}
```

## 3. 변경과 확장에 대해

### 컴포넌트가 해야할 기능은 최대한 각자의 컴포넌트 내부에서 처리한다.

컴포넌트가 해야할 일은 최대한 각자의 컴포넌트 내부에서 처리하는 것이 유지 보수하기 좋습니다.

플레이 리스트의 아이템을 클릭했을 때 해야하는 동작에 대한 기획이 변경되어 이를 수정해야 한다고 가정해봅시다.

대부분의 사람들은 플레이 리스트의 아이템을 클릭했을 때 생기는 일이니 `PlayListItem` 컴포넌트를 먼저 찾아가 수정을 시도할 것입니다.

이때 만약 부모에서 onClick을 주입을 받는다면, PlayListItem의 부모를 찾아 올라가야 합니다.

```jsx
// AS IS...
function PlayList() {
  const [list, setList] = useState(INITIAL_LIST);

  const handlePlayListItemClick = (item) => (e) => {
    console.log(item.name);
  };

  return (
    <ul>
      {list.map((item) => (
        <PlayListItem
          key={item.id}
          item={item}
          onClick={handlePlayListItemClick(item)}
        />
      ))}
    </ul>
  );
}

function PlayListItem({ item, onClick }) {
  return <li onClick={onClick}>{item.name}</li>;
}
```

```jsx
//To Be...
function PlayList() {
  const [list, setList] = useState(INITIAL_LIST);

  return (
    <ul>
      {list.map((item) => (
        <PlayListItem key={item.id} {...item} />
      ))}
    </ul>
  );
}

function PlayListItem({ name }) {
  const handleItemClick = () => {
    console.log(item.name);
  };

  return <li onClick={handleItemClick}>{name}</li>;
}
```

### 커스텀 훅은 하나의 기능을 해야 코드를 변경할 때 용이하다.

커스텀 훅이 여러개의 기능을 한다면 기획이 바뀌어서 커스텀 훅의 기능 중 하나의 동작을 바꾸어야 할 때, 해당하는 기능을 여러 코드들 사이에서 찾아야 합니다.

여러 코드들 사이에서 해당하는 기능을 찾고 변경하는 것보다 단일 기능으로 분리된 훅의 기능을 변경하는 것이 시간이 더 적게 듭니다.

```jsx
// AS IS...
function useComplex() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);

  const changeInput = (value) => {
    setInput(value);
  };

  const addTodo = (todo) => {
    setTodos([...todos, todo]);
  };

  return {
    input,
    changeInput,
    todos,
    addTodo,
  };
}
```

```jsx
// TO BE...
function useInput() {
  const [input, setInput] = useState("");

  const changeInput = (value) => {
    setInput(value);
  };

  return {
    input,
    changeInput,
  };
}

function useTodo() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos([...todos, todo]);
  };

  return { todos, addTodo };
}
```

### 컴포넌트에서 조건에 따라 여러 형태로 변경되거나, 기획 변경이 예상되는 UI는 외부에서 Composition을 이용해 주입해주어 변경에 유연하게 만들어준다.

헤더를 만들어야 하는 상황을 가정해봅시다.
디자이너가 만들어 준 디자인을 보니 헤더의 왼쪽에는 타이틀이 있고, 헤더에 오른쪽에는 검색을 할 수 있는 검색창이 존재합니다.

그래서, 기획에 따라 `Header` 컴포넌트를 만들었습니다.

```jsx
function Header(props) {
  return (
    <header className="header">
      <div>
        <Title />
      </div>

      <div>
        <SearchBar />
      </div>
    </header>
  );
}
```

하지만 3일 뒤에, 기획이 변경되어 `검색 페이지`에서는 헤더의 오른쪽에 검색창이 나오지 않고, 프로필 사진이 나와야 한다는 기획이 추가되었습니다.

따라서, 헤더 컴포넌트를 아래와 같이 수정하였습니다.

```jsx
function Header(props) {
  return (
    <header className="header">
      <div>
        <Title />
      </div>

      <div>{props.isSearchPage ? <ProfileImage /> : <SearchBar />}</div>
    </header>
  );
}
```

추가적으로 한달 뒤에, 기획이 변경되어 `프로필 페이지`에서는 헤더의 오른쪽이 비어야 한다는 기획이 추가되었습니다.

따라서, 헤더 컴포넌트를 아래와 같이 수정하였습니다.

```jsx
function Header(props) {
  return (
    <header className="header">
      <div>
        <Title />
      </div>

      <div>
        {props.isSearchPage ? (
          <ProfileImage />
        ) : props.isProfilePage ? (
          <div />
        ) : (
          <SearchBar />
        )}
      </div>
    </header>
  );
}
```

갈수록 코드가 더러워지고 있습니다.
이러한 상황을 막기 위해서는, 컴포넌트에서 조건에 따라 여러 형태로 변경되거나, 기획 변경이 예상되는 UI는 외부에서 Composition을 이용해 주입해주어 변경에 유연하게 만들어 줄 수 있습니다.

```jsx
// TO BE
function Header(props) {
  return (
    <header className="header">
      <div className="header-left">{props.left}</div>
      <div className="header-right">{props.right}</div>
    </header>
  );
}

function SearchPage() {
  return <Header left={<Title />} right={<ProfileImage />} />;
}

function ProfilePage() {
  return <Header left={<Title />} right={<div />} />;
}
```

## 4. 재활용에 대해

### 재활용할 컴포넌트는 도메인을 걷어내고 개발해야 재활용할때 어색하지 않다.

재활용할 컴포넌트는 도메인 지식을 걷어내고, UI에 포커싱을해서 개발해야 다른 도메인에서 해당 컴포넌트를 재활용 할 때 어색하지 않습니다.

```jsx
// AS IS...
function ApplicationCard(props) {
  return (
    <>
      <div>{props.name}</div>
      <div>{props.job}</div>
    </>
  );
}
```

```jsx
// TO BE...
function Card(props) {
  return (
    <>
      <div>{props.title}</div>
      <div>{props.description}</div>
    </>
  );
}
```

### 단순히 코드 블록에 대한 추출보다 추상화가 재활용에 용이하다.

단순한 코드 블록에 대한 추출을 하게 되면, 사용하게 된 도메인의 컨텍스트까지 함께 추출될 가능성이 높아 재활용이 쉽지 않습니다.

이를 일반적인 목적으로 추상화하여 추출하면 다음에 재사용하기에 용이하다 느꼈습니다.

```jsx
// AS IS
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

```jsx
// TO BE

// useHttpGetRequest.jsx
import { useEffect, useReducer, useState } from "react";
import { loadingReducer } from "./LoadingReducer";

const initialState = {
  isLoading: true,
};

export const useHttpGetRequest = (URL) => {
  const [data, setData] = useState([]);
  const [state, dispatch] = useReducer(loadingReducer, initialState);

  useEffect(() => {
    dispatch({ type: "LOADING" });
    fetch(URL)
      .then((response) => response.json())
      .then((json) => {
        dispatch({ type: "FINISHED" });
        setData(json);
      });
  }, []);

return { data, isLoading: state.isLoading };

// useGetRemoteData.jsx
import { useEffect, useState } from "react";
import { useHttpGetRequest } from "./useHttpGet";
const REMOTE_URL = "https://jsonplaceholder.typicode.com/users";

export const useGetRemoteData = () => {
  const { data: users, isLoading } = useHttpGetRequest(REMOTE_URL);
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

### 타입은 최대한 갈갈히 찢어야 재활용하기 용이하다.

타입을 하나로 뭉쳐놓는 것 보다, 여러개로 쪼개서 합치는 것이 재활용하기 더 용이합니다.

```tsx
// YoutubeVideoType.ts
export type RelatedVideo = {
  // type definition
};

export type YoutubeVideoThumbnail = {
  // type definition
};

export type YoutubeVideoResponse = {
  thumbnail: YoutubeVideoThumbnail;
  relatedVideos: RelatedVideo[];
};

/// VideoItem.tsx

type Props = React.HTMLAttributes<HTMLDivElement> & RelatedVideo;

function VideoItem(props: Props) {
  return <div>{props.children}</div>;
}
```

### 최대한 의존성을 주입받아야 재활용하기 용이하다. (컴포지션)

아까 헤더의 예시를 들 수 있을 것 같습니다.

## 5. 그 밖에 삽질 + 공부하며 얻은 유용한 패턴

### Compounded Pattern

React Bootstrap에서 사용하는 패턴입니다.

컴포넌트를 다른 곳에서 재활용하고, 유동적으로 요소를 추가 및 삭제하기 용이합니다.

(예시: 해당하는 폼에서 버튼을 하나 더 추가하고 싶다면 Form 컴포넌트의 의 자식으로 Button을 추가해주면 됩니다.)

```jsx
<Form>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" />
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>

  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>
```

또한, Props Drilling을 방지할 수 있습니다.

(예시: Compounded Pattern을 사용하지 않았을 때의 Form Props)

```jsx
<Form
  labelName="Email address"
  formGroupControlId="formBasicEmail"
  controlType="email"
  controlPlaceHolder="Enter email"
  mutedText="We'll never share your email with anyone else."
  onSubmit={() => {}}
/>
```

단점은, 사용하는 쪽에서 코드가 장황해진다는 점이 있습니다.

```jsx
<Form>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" />
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>

  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>
```

### React.cloneElement

`React.cloneElement`를 통해 선언적으로 반복되는 로직을 추가할 수 있습니다.

```jsx
// WithAmplitude.jsx
function WithAmplitude({ children, key }) {
  const child = Children.only(children);
  const pushEvent = (key: string) => Amplitude.send(key);

  return cloneElement(child, {
    onClick: () => {
      child.props.onClick();
      pushEvent(key);
    },
  });
}

function Component() {
  const handleButtonClick = () => {};

  return (
    <WithAmplitude key="click-event">
      <Button onClick={handleButtonClick} />
    </WithAmplitude>
  );
}
```

출처: https://jbee.io/react/react-5-component/

### useImperativeHandle을 이용한 State Lifting 방지

`useImperativeHandle`을 이용하여 상태를 부모 컴포넌트로 올리는 것을 방지할 수 있습니다.

```jsx
// AS IS...
const FormContainer = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  // 그 외 수많은 handler

  return (
    <section>
      <Input value={value} onValueChange={setValue} />
      <Input value={age} onValueChange={setAge} />
      <Input value={address} onValueChange={setAddress} />
    </section>
  );
};
```

```jsx
// TO BE...
const Input = forwardRef((_, ref) => {
  const [value, setValue] = useState("");
  useImperativeHandle(ref, () => ({ value }), [value]);

  return <input value={value} onChange={(e) => setValue(e.target.value)} />;
});

const FormContainer = () => {
  const nameRef = useRef("");
  const ageRef = useRef("");
  const addressRef = useRef("");

  return (
    <section>
      <Input ref={nameRef} />
      <Input ref={ageRef} />
      <Input ref={addressRef} />
      <button onClick={() => alert(nameRef.current.value)}>Click</button>
    </section>
  );
};
```

출처: https://jbee.io/react/react-5-component/
