# 📌 서비스명

**PREMIUMY** – 프리미엄 **텍스트 기반** 자료 공유 플랫폼

---

## 🎯 프로젝트 개요

**PREMIUMY**는 OAuth2 소셜 로그인을 통해 다양한 텍스트 기반 자료를 열람할 수 있는 콘텐츠 공유 플랫폼입니다.  
**텍스트 형태의 자료**를 중심으로 구성되며, **무료/유료 콘텐츠 구분**과 **접근 제어** 기능을 제공합니다.

---

## 💡 주요 기능 요약

| 기능 영역      | 설명 |
| ------------- | ---- |
| 로그인         | Google / Kakao / GitHub / Naver OAuth2 로그인 지원 |
| 콘텐츠 탐색    | 전체 자료 목록 조회 (검색, 카테고리 필터) |
| 콘텐츠 상세    | 썸네일, 미리보기, 설명, 가격 정보 제공 |
| 결제 기능      | 유료 콘텐츠 결제 기능 (결제 시스템 연동 예정) |
| 마이페이지     | 구매한 콘텐츠 목록 및 내역 확인 |
| 접근 제어      | 유료 콘텐츠는 결제자만 접근 가능 |
| 관리자 기능    | 콘텐츠 업로드 / 수정 / 삭제 (선택 구현) |

---

## 🧱 기술 스택

- **Frontend**: **Svelte**, Axios, SvelteKit Router, Tailwind 또는 Styled Components  
- **Backend**: NestJS, TypeORM, MySQL, Passport OAuth2, JWT  
- **OAuth Providers**: Google, Kakao, GitHub, Naver  
- **Deployment**:  
  - Frontend: Vercel 또는 AWS S3 + CloudFront  
  - Backend: AWS EC2 또는 Render  
  - DB: AWS RDS (MySQL)  
- **DevOps**:
  - Docker (FE/BE 컨테이너화 및 통합)
  - GitHub Actions (CI/CD 자동화: 테스트 → 빌드 → 배포)
- **기타 도구**: Swagger, dotenv, GitHub Secrets, AWS Secrets Manager
- 결재기능 추가 예정정
---

## 🔒 인증/인가 설계

- OAuth2 로그인 (Google, Kakao, GitHub, Naver)  
- Access + Refresh Token 기반 JWT 인증  
- NestJS Guard + Role Decorator 기반 권한 제어  
- 유료 콘텐츠 접근 시 결제 여부 확인 후 열람 허용  

---

## 🗂 ERD 요약

```
**[User]**  
- id (PK)  
- email (nullable)  
- userName  
- nickname  
- provider  
- socialId (unique)  
- createdAt  
- updatedAt  

**[Content]**  
- id (PK)  
- title  
- description  
- thumbnail_url  
- is_paid (bool)  
- price  
- created_at  

**[Payment]**  
- id (PK)  
- user_id (FK)  
- content_id (FK)  
- payment_type (SINGLE / SUBSCRIPTION)  
- paid_at  
- status (SUCCESS / FAILED)  

**[Subscription]** *(옵션)*  
- id (PK)  
- user_id (FK)  
- started_at  
- expired_at  
```
---

## 🚀 CI/CD 및 Docker 적용 계획

- **Docker**: 프론트엔드(Svelte)와 백엔드(NestJS) 각각 컨테이너화  
- **Docker Compose**: FE/BE/DB 통합 개발 환경 구성  
- **GitHub Actions (CI/CD)**:
  - push 발생 시 자동 테스트 → 빌드 → Docker 이미지 생성  
  - 이미지 → Docker Hub 또는 AWS ECR 업로드  
  - AWS EC2 또는 Render로 자동 배포 (SSH 또는 API 방식)  
- **보안 관리**:
  - `.env` 파일 → 환경 변수 분리  
  - GitHub Secrets → CI/CD 환경 변수 보관  
  - AWS Secrets Manager → 운영 환경 변수 암호화 관리  


### 확정 X 

✅ 커밋 메시지 컨벤션
태그	설명
✨ feat	새로운 기능 추가
🐛 fix	버그 수정
📝 docs	문서 수정
💄 style	코드 포맷팅, 스타일 변경
♻️ refactor	코드 리팩토링
⚡️ perf	성능 개선
✅ test	테스트 코드 추가/수정
🔧 chore	빌드, 설정, 기타 잡일
🚀 deploy	배포 관련 작업
🔒 security	보안 관련 작업

