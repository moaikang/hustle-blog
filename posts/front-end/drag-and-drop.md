---
title: 커스텀 드래그 앤 드랍 개발 및 일반화 경험 공유
description: 커스텀 드래그 앤 드랍을 개발하고 일반화한 경험을 공유합니다.
category: Front-end
date: 2022-02-06
---

## 드래그 앤 드랍이란?

드래그 앤 드랍(Drag and Drop)이란 특정 엘리먼트를 원하는 위치로 잡아 끌어 옮기는 방법을 말합니다.

아래의 링크에서 드래그 앤 드랍의 예시를 확인해 볼 수 있습니다.

[드래그 앤 드랍 예시 (W3School)](https://www.w3schools.com/html/tryit.asp?filename=tryhtml5_draganddrop)

HTML5 에서는 드래그 앤 드랍을 위해 API를 제공하고 있습니다.

[HTML 드래그 앤 드롭 API - Web API | MDN](https://developer.mozilla.org/ko/docs/Web/API/HTML_Drag_and_Drop_API)

## 커스텀 드래그 앤 드랍 개발 배경

### 왜 HTML5 Drag And Drop API를 사용하지 않고 커스텀 드래그 앤 드랍을 개발하였나요?

원티드랩 기업 서비스는 Internet Explorer 11 (IE11) 버전까지 서비스를 지원합니다.

HTML5 드래그 앤 드랍 API를 사용하면, Internet Explorer 11 (IE11) 에서 디자인이 나온대로 개발하기가 어려웠습니다. 나온 디자인은 아래와 같습니다.

![design](https://i.imgur.com/roDnXIL.png)

**편의를 위해, 드래그 할 때 마우스를 따라 댕기는 이미지를 고스트(Ghost)라고 칭하겠습니다.**

지원자 카드를 드래그 할 때, 지원자 카드에 파란색 테두리가 생긴 고스트가 마우스를 따라 다녀야 하는 디자인이 나왔습니다. HTML5에서 제공하는 드래그 앤 드랍 API를 사용하면, draggable 속성이 붙은 DOM이 아래 그림과 같이 살짝 투명하게 변한채로 고스트가 생성됩니다.

![html5-default-ghost](https://i.imgur.com/qcEve3l.png)

하지만 디자인을 보면 고스트가 투명해지지 않습니다. 디자인대로 구현하기 위해서는 HTML5의 기본 동작을 막아야 했습니다. 기본 동작을 막기 위해 몇가지를 방법을 찾아 시도해 보았습니다.

**시도해 본 방법들**

- `event.dataTransfer.setDragImage()`

  - 이 메서드는 고스트를 커스텀 할 수 있는 메서드입니다.
  - 이 메서드를 사용해 고스트를 커스텀 하려고 시도했었습니다.
    ![](https://i.imgur.com/l6l1zBb.png)
  - `Can I Use` 서비스에서 `setDragImage()` 메서드 지원 범위를 확인해보니 IE11에서 지원하지 않았습니다.
  - 따라서 HTML5에서 기본으로 제공하는 Drag & Drop을 사용하지 않기로 하였습니다.

- 라이브러리 사용

  - `npm trends` 서비스에서 드래그 라이브러리를 찾아보고 검토하였습니다.
    ![](https://i.imgur.com/YRZaNjN.png)
  - 사람들이 많이쓰는 react-beautiful-dnd, react-dnd 중에 더 사용하기 편한 것을 찾아 사용하려 했습니다.

  - 스타가 가장 많은 react-beautiful-dnd 는 unpacked-size가 1.39mb로, 드래그 앤 드랍 하나를 위해 번들 사이즈를 늘리는 것이 합리적이지 않다는 생각이 들었습니다.

  - 두번째로 react-dnd는 용량은 합리적이었으나, 공식 문서가 보기 힘들고, 제공하는 인터페이스가 (작성자인 저의 기준)에서 사용하기 어렵다고 느껴지고, 디자인과 비지니스 요구사항에 맞게 프로덕트를 완성시키려면 라이브러리 자체를 배우는 시간이 많이 필요하고, 직접 만드는 것에 비해 미세한 에러 핸들링이 쉽지 않을 것 같아 사용하지 않기로 생각했습니다.

### 결론

MouseEvent를 이용해 직접 Drag & Drop을 구현하기로 결정 했습니다.

## 어떻게 구현했나요?

### 마우스 이벤트에 대한 간단한 설명

마우스 이벤트는 (마우스를 눌렀을 때) `mousedown` → (움직임이 있다면) `mousemove` → (누른 마우스를 땠을 때) `mouseup` → `click` 순서대로 이벤트가 발생합니다.

### 마우스 이벤트로 드래그를 구현하기 위한 아이디어

- `mousedown` 이 되었을 때, 고스트에 대한 구성을 진행하고,
- `mousedown`이 된 상태로 `mousemove`가 일어난다면 고스트가 마우스를 따라 렌더링이 되고
- `mouseup`이 되었을 때 고스트를 삭제한다면 드래그 앤 드랍을 직접 구현할 수 있습니다.

코드를 통해 확인해봅시다. (편한 설명을 위해 코드가 조금 생략되었습니다)

```tsx
function useDrag() {
  const mouseMoveHandlerRef = React.useRef((e) => {
    Ghost.renderAtMousePointer(e);
  });

  const mouseUpHandlerRef = React.useRef((e) => {
    window.removeEventListener("mousemove", mouseMoveHandlerRef.current);
    window.removeEventListener("mouseup", mouseUpHandlerRef.current);

    Ghost.cleanUp();
  });

  const handleDragStart = (e) => {
    const isLeftMouseClick = e.button === 0;
    if (!isLeftMouseClick) return;

    window.addEventListener("mousemove", mouseMoveHandlerRef.current);
    window.addEventListener("mouseup", mouseUpHandlerRef.current);

    Ghost.configure();
  };
}
```

- React 컴포넌트에서 `mousedown` 이벤트가 발생했을 때 고스트를 구성 해주고(`Ghost.configure()`), `window`에 `mousemove`, `mouseup` 이벤트 리스너를 걸어줍니다.

- `mousemove`이벤트가 발생하면 고스트가 마우스를 따라 움직입니다. (`Ghost.renderAtMousePointer`)

- 이후 `mouseup` 이벤트가 발생하면 고스트를 지워주고 (`Ghost.cleanUp()`) 이벤트 리스너를 해지해주면 됩니다.

### 그렇다면 고스트는 어떻게 구현하였나요?

(편한 설명을 위해 코드가 조금 생략되었습니다.)

```tsx
export class DragGhost {
  public configure(): void {
    // 클릭한 리액트 컴포넌트의 위치, 크기 정보를 구합니다.
    this.draggingElementDOMRect = event.currentTarget.getBoundingClientRect();

    // 클릭한 좌표가 리액트 컴포넌트 왼쪽 위 꼭지점을 (0, 0)으로 가정했을 때
    // 상대적으로 어떤 좌표를 가지고 있는지 계산합니다.
    this.startCoordinateInDraggingElement = {
      x: event.pageX - this.draggingElementDOMRect.left - window.scrollX,
      y: event.pageY - this.draggingElementDOMRect.top - window.scrollY,
    };

    // 고스트를 생성합니다.
    this.ghostEl = this._buildGhostEl();
  }

  private _buildGhostEl(): HTMLElement {
    // 빈 HTMLElement 생성
    const ghostEl: HTMLElement = document.createElement("div");

    // 클릭한 리액트 컴포넌트에 해당하는 HTMLElement를 DOM 트리를 순회해서 찾습니다.
    const draggingElement = document.querySelector();

    // 찾은 HTMLElement를 복제해서
    let clonedDraggingElement = draggingElement.cloneNode(true) as HTMLElement;

    // 빈 HTMLElement에 붙힙니다.
    ghostEl.appendChild(clonedDraggingElement);

    return ghostEl;
  }

  // 마우스 위치에 따라 고스트를 렌더해줍니다.
  public renderAtMousePointer(e: MouseEvent): void {
    this._renderAt(
      e.pageX - this.startCoordinateInDraggingElement.x,
      e.pageY - this.startCoordinateInDraggingElement.y
    );
  }

  // x, y 포지션에 고스트를 렌더합니다.
  private _renderAt(x: number, y: number): void {
    if (!this.ghostEl) return;

    // top, left 속성을 이용해 위치를 조정하면 리플로우가 일어날 가능성이 매우 높습니다.
    // renderAt 메서드는 mouseMove 때 마다 호출됩니다.
    // 매우 반복적으로 일어납니다.
    // top, left를 사용해 위치를 조정하면
    // MouseMove 때 마다 리플로우가 발생해 성능이 떨어집니다. (실제로 버벅거림)
    // 따라서, 리플로우가 일어나지 않는 CSS 속성인 transform을 이용하여 위치 조정을 해줍니다.
    this.ghostEl.style.transform = `translate(${px(x)}, ${px(y)})`;
  }

  private _unmountGhostEl(): void {
    if (!this.ghostEl) return;
    this.ghostEl.remove();
  }

  // 고스트를 제거합니다.
  public cleanUp(): void {
    this._unmountGhostEl();
    this.ghostEl = null;
  }
}
```

이와 같은 방법으로 고스트를 개발하였습니다.

## 커스텀 드래그 앤 드랍 로직 일반화

### 진행 배경

다음 스프린트에도 드래그 앤 드랍을 사용하는 기획이 들어갔습니다.

다음에 드래그 앤 드랍 기능을 작업하실 팀원분들이 저와 같은 삽질을 하지 않았으면 하는 바램에 커스텀 드래그 앤 드랍을 일반화 하기로 결정하였습니다.

### 어떻게 일반화 하였나요?

사용하는 사람의 입장에서 커스텀 드래그 앤 드랍에 대한 로직을 알 필요없이 사용할 수 있도록 추상화하려고 노력했습니다.

위에 설명한 로직을 기반으로 일반화를 진행하였습니다.

### 완성된 컴포넌트 사용 방법

**`Draggable` 컴포넌트**

```tsx
// 이렇게 [Draggable] 컴포넌트로 감싼 컴포넌트는 드래그 가능해지게 됩니다.
const DragComponent = () => {
  return (
    <Draggable>
      <SomeComponent />
    </Draggable>
  );
};
```

**`Droppable` 컴포넌트**

```tsx
// 이렇게 [Droppable] 컴포넌트로 감싼 컴포넌트는 드랍이 가능하게 됩니다.
const DropComponent = () => {
  return (
    <Droppable>
      <SomeComponent />
    </Droppable>
  );
};
```

드래그가 시작될때 해야할 행동은 아래와 같이 정의합니다.

```tsx
const DragComponent = () => {
  const handleDragStart = (e: React.MouseEvent) => {
    console.log("나 드래그 시작했어");
  };

  return (
    <Draggable onDragStart={handleDragStart}>
      <SomeComponent />
    </Draggable>
  );
};
```

드랍이 되었을 때 해야할 행동은 아래와 같이 정의합니다.

```tsx
const DropComponent = () => {
  const handleDrop = (e: React.MouseEvent) => {
    console.log("드랍했어");
  };

  return (
    <Droppable onDragDrop={handleDrop}>
      <SomeComponent />
    </Droppable>
  );
};
```

추가로, `Draggable` 컴포넌트가 특정 컴포넌트에만 `Droppable` 해야할 때를 고려하여 `dragKey` 라는 `Attribute`를 만들어서 사용하였습니다.

```tsx
// 이렇게 "hi"라는 dragKey를 가진 컴포넌트는 "hi"라는 dragKey를 가진 Droppable 컴포넌트에만 드랍이 가능해지게 됩니다.
const DragComponent = () => {
  return (
    <Draggable dragKey="hi">
      <SomeComponent />
    </Draggable>
  );
};

// 이 컴포넌트는 "bye" 라는 dragKey를 가졌으므로, "hi"라는 dragKey를 가진 Dragabble 컴포넌트는 이 곳에 드랍할 수 없습니다.
const DropComponent = () => {
  return (
    <Droppable dragKey="bye">
      <SomeComponent />
    </Droppable>
  );
};
```

### 설계

우선 `Draggable`, `Droppable`이라는 두개의 컴포넌트를 만들었습니다.

`Draggable Component`의 코드는 아래와 같습니다.

(편한 설명을 위해 코드가 조금 생략되었습니다.)

```tsx
const Draggable = (props: DraggableProps) => {
  const {
    dragKey,
    children,
    dragData, // 드래그 할때 가지고 있어야 할 데이터
    onDragStart,
    onDrag,
  } = props;

  const dragDrop = useDragDrop(dragKey);

  // Draggable 컴포넌트 마다의 유니크한 아이디를 생성해줌
  const [dragId] = React.useState<string>(createUUID());
  const ghostRef = React.useRef<Nullable<Ghost>>(null);

  const cleanUp = () => {
    if (!ghostRef.current) return;

    ghostRef.current.cleanUp();
    ghostRef.current = null;
  };

  const onMouseMoveRef = React.useRef((e: MouseEvent) => {
    if (!ghostRef.current) return;

    ghostRef.current.renderAtMousePointer(e);
  });

  const onMouseUpRef = React.useRef((e: MouseEvent) => {
    window.removeEventListener("mousemove", onMouseMoveRef.current);
    window.removeEventListener("mouseup", onMouseUpRef.current);

    cleanUp();
  });

  // 드래그가 시작될 때 해야할 행동
  const handleDragStart = (e: React.MouseEvent) => {
    window.addEventListener("mousemove", onMouseMoveRef.current);
    window.addEventListener("mouseup", onMouseUpRef.current);

    ghostRef.current = new Ghost();

    onDragStart && onDragStart(e);
  };

  return (
    <div
      data-drag-id={dragId} // Draggable 마다의 고유한 키를 할당해 줍니다.
      onMouseDown={handleDragStart}
    >
      {children}
    </div>
  );
};
```

Drag Start 이벤트가 발생하면, 발생한 컴포넌트의 `data-drag-id` 라는 `dataSet`에 할당된 `dragId`를 이용하여 컴포넌트의 `HTMLElement`를 찾아 `Ghost`를 생성합니다.

`Droppable 컴포넌트`의 코드는 아래와 같습니다.

(편한 설명을 위해 코드가 조금 생략되었습니다.)

```tsx
const Droppable = (props: DroppableProps) => {
  const { children, dragKey, onDragEnter, onDragLeave, onDragDrop, className } =
    props;

  const handleDragDrop = (e: React.MouseEvent) => {
    onDragDrop && onDragDrop();
  };

  return <div onMouseUp={handleDragDrop}>{children}</div>;
};
```

## 결론

이런 방법으로 생각보다 길지 않은 코드로 드래그 앤 드랍이라는 복잡한 인터렉션을 구현하고 일반화하였습니다.

또한, 라이브러리를 사용하지 않아 번들 사이즈가 크게 늘어나지 않아 라이브러리를 사용했을 때 보다 더 빠르게 유저에게 웹페이지를 서빙할 수 있게 되었습니다.
