# 📦 Inventory Manager (재고 관리 시스템)

스프링 부트와 리액트를 활용하여 제작한 **풀스택 재고 관리 토이 프로젝트**입니다. 
단순한 CRUD 구현을 넘어, 백엔드 아키텍처 설계와 프론트엔드의 타입 안정성을 고려하며 개발했습니다.

## 🚀 기술 스택

### Backend
- **Framework**: Java 17, Spring Boot 3.5.8
- **ORM**: Spring Data JPA
- **Database**: MySQL
- **Architecture**: Layered Architecture (Controller - Service - Repository)

### Frontend
- **Library**: React (Vite)
- **Language**: TypeScript
- **State/Communication**: Axios

---

## ✨ 핵심 개발 포인트

### 1. 보안 및 유지보수성 향상
- **환경변수 활용**: DB 접속 정보(계정, 비밀번호)를 코드에 직접 노출하지 않고 환경변수(`${DB_PASSWORD}`)를 통해 관리하도록 개선했습니다.
- **DTO 분리**: Entity와 Request/Response DTO를 엄격히 분리하여 API 데이터 전송의 효율성을 높이고 내부 도메인 구조를 보호했습니다.

### 2. 견고한 에러 핸들링
- **Global Exception Handling**: `@RestControllerAdvice`를 사용하여 백엔드 전역 예외 처리를 구현, 일관된 `ApiErrorResponse` 규격을 프론트엔드에 제공합니다.
- **Axios Interceptor**: 프론트엔드에서 백엔드 에러 메시지를 가공하여 사용자에게 Alert 및 메시지 박스로 전달하도록 구현했습니다.

### 3. TypeScript 도입 및 리팩토링
- 초기 JavaScript 환경에서 TypeScript로 전환하여 데이터 타입 불일치로 인한 런타임 에러를 사전에 방지했습니다.
- 반복되는 비즈니스 로직을 서비스 레이어로 위임하여 코드의 재사용성을 높였습니다.

---

## 🛠 실행 방법 (Local)

### 1. Environment Variables 설정
이 프로젝트는 보안을 위해 환경변수를 사용합니다. 실행 전 아래 변수를 설정해주세요.
- `DB_NAME`: MySQL 계정명
- `DB_PASSWORD`: MySQL 비밀번호

### 2. Backend 실행
```bash
cd backend
./mvnw spring-boot:run
```

### 3. Frontend 실행
```bash
cd frontend
npm install
npm run dev
```

---

## 📈 성장 기록 (Commit History Summary)
2025-12 ~: 초기 프로젝트 환경 구성 및 기초 CRUD 구현

CSS 리팩토링: 사용자 경험 향상을 위한 UI/UX 지속적 개선

안정성 강화: JS -> TS 전환 및 API 호출 구조 개선

보안 강화: DB 접근 권한 분리 및 환경변수 주입 방식 도입