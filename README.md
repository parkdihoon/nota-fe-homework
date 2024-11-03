# Nota frontend 과제

https://nota-fe-homework.vercel.app/

## 사용 기술 스택

### 상태 관리 zustand + tanstack query

- 클라이언트 상태와 서버 상태를 분리해서 관리하여 상태 관리에 도움이 되었습니다.
- 클라이언트 상태 관리를 위해 zustand 를 사용하였습니다.
  - 적은 보일러플레이트와 쉬운 사용성으로 빠르게 개발하는 데에 도움이 되었습니다.
  - 상태 관리를 위한 코드가 간결해져서 컴포넌트 코드 가독성이 좋아졌습니다.
- 서버 상태 관리를 위해 tanstack query 를 사용하였습니다.
  - api 호출에 대한 상태 관리를 구조적이고 간결하게 할 수 있었습니다.
  - optimistic update 이 필요한 상황에 쉽게 처리하는 데에 도움이 되었습니다.
  - 캐시를 통해 불필요한 요청을 줄일 수 있었습니다.

### 스타일 작업 tailwindcss

- 스타일링에 대한 큰 제약은 없어서 UI 상태 표시를 위해 별도의 UI 라이브러리를 사용하지 않고 tailwindcss 만을 사용했습니다. 

### UI 테스트 vitest + react testing library
- 기본적으로 Vite 환경으로 구성되어 있었기 떄문에 환경 설정이 더욱 간결한 vitest 를 테스트 러너를 사용하였고 사용자 관점에서 UI 테스트를 진행하기 용이한 react testing library 를 사용하였습니다.

## 설치 및 실행

### 의존성 패키지 설치

```bash
npm install
```

### 개발 환경 실행

```bash
npm run dev
```

### 프로덕션 환경 실행

```bash
## 빌드
npm run build 

## 실행
npm run preview
```

### UI 테스트

```bash
npm run test
```

### 디렉토리 구조
    
``` 
├── App.tsx
├── components
│   ├── ActivatedChat.tsx
│   ├── Chat.tsx
│   ├── ChatList.tsx
│   ├── Dialogue.tsx
│   ├── ModelSelect.tsx
│   ├── MswWrapper.tsx
│   └── PromptInput.tsx
├── hooks
│   └── useFetchChatDetailQuery.ts
├── models
│   └── chat.interface.ts
├── services
│   └── api.ts
├── stores
│   ├── useActivatedChatStore.ts
│   └── useChatStore.ts
├── tests
│   ├── ActivatedChat.test.tsx
│   ├── ChatList.test.tsx
│   ├── setup.ts
│   └── test-utils.tsx
└── utils
    └── renameFields.ts
```

## 요구사항 체크 리스트

- [x] [채팅 목록] 전체 채팅 목록 표시
- [x] [채팅 목록] 선택된 채팅 표시
- [x] [채팅 목록] 대화의 첫 질문 내용과 채팅에서 사용한 모델명 표시
- [x] [채팅 목록] 스크롤 처리
- [x] [채팅 목록] New 버튼 클릭 시, 우측 채팅 내역 초기화 및 현재 선택된 채팅 비활성화
- [x] [현재 채팅] 모델 미선택시, 입력란과 제출 버튼 비활성화
- [x] [현재 채팅] 모델 목록 불러오는 과정의 로딩 처리
- [x] [현재 채팅] 모델 초기값은 불러온 모델 목록의 첫 번째
- [x] [현재 채팅] 모델을 변경하면 입력란, 채팅 내역, 현재 선택된 채팅도 초기화
- [x] [현재 채팅] 채팅 목록에 새로운 채팅이 추가되는 시점은 새로운 질문이 제출된 이후
- [x] [현재 채팅] 이전 대화 내역 선택한 경우, 채팅 내역 표시, 사용됐던 모델 표시
- [x] [현재 채팅] 채팅 화면 로딩 처리
- [x] [현재 채팅] 질문 입력란 3줄 이상일 경우만 스크롤
- [x] [현재 채팅] 스크롤이 최하단에서 벗어난 경우 최하단으로 이동할 수 있는 버튼 추가
