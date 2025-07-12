# 📌 서비스명

**PREMIUMY** – 프리미엄 **텍스트 기반** 자료 공유 플랫폼

---

## 🎯 프로젝트 개요

PREMIUMY는 OAuth2 소셜 로그인을 통해 다양한 텍스트 기반 자료를 열람하고, 유료 콘텐츠는 결제를 통해 접근할 수 있는 콘텐츠 플랫폼입니다.  
자료는 템플릿, 코드, PDF, 노션 양식 등 텍스트 형식으로 구성되며, 무료/유료 구분이 명확하고 결제 기반 접근 제어가 가능합니다.

---

## 💡 주요 기능 요약

| 기능 영역 | 설명 |
| -------- | ---- |
| 로그인 | Google / Kakao / GitHub / Naver OAuth2 로그인 |
| 콘텐츠 탐색 | 전체 자료 목록 조회 (검색/카테고리) |
| 콘텐츠 상세 | 썸네일, 미리보기, 설명, 가격 정보 |
| 결제 기능 | 아임포트 단건 결제 연동 (정기 구독 옵션 가능) |
| 마이페이지 | 구매한 자료 목록 및 결제 내역 확인 |
| 접근 제어 | 유료 콘텐츠는 결제자만 열람 가능 |
| 관리자 기능 | 콘텐츠 업로드 / 수정 / 삭제 (선택 구현) |

---

## 🧱 기술 스택

- **Frontend**: React (Vite), Styled Components, Axios, React Router  
- **Backend**: NestJS, TypeORM, MySQL, Passport OAuth2, JWT  
- **OAuth Providers**: Google, Kakao, GitHub, **Naver**  
- **Payment**:
  - **아임포트 (PortOne)**  
    - 다양한 PG사 연동 지원 (카드, 계좌이체, 휴대폰 결제 등)  
    - 정기/단건 결제 모두 지원, 카카오페이·네이버페이 등 간편결제 가능  
  - **카카오페이**, **네이버페이**, **토스페이먼츠** (필요시 연동)  
- **Deployment**:  
  - Frontend: Vercel  
  - Backend: AWS EC2 또는 Render  
  - DB: AWS RDS (MySQL)  
- **DevOps**:
  - Docker (FE, BE 컨테이너화 및 통합)
  - GitHub Actions (CI/CD 자동화: 테스트 → 빌드 → 배포)
- **기타**: Swagger, dotenv, GitHub Secrets, AWS Secrets Manager

---

## 🔒 인증/인가 설계

- Google, Kakao, GitHub, **Naver** OAuth2 로그인 지원  
- JWT 발급 (Access + Refresh Token)  
- NestJS Guard + Role Decorator 기반 권한 제어  
- 유료 콘텐츠 접근 시 결제 여부 확인 후 열람 허용  

---

## 💳 결제 플로우 요약

1. 사용자가 콘텐츠 상세 페이지에서 결제 버튼 클릭  
2. 아임포트 결제창 호출 (프론트엔드)  
3. 결제 성공 시 `imp_uid` 등 결제 정보 백엔드로 전달  
4. 백엔드에서 PortOne REST API로 결제 검증  
5. DB에 결제 기록 저장 및 열람 권한 부여  

---

## 🗂 ERD 요약

```text
[User]
- id (PK)                         
- email (nullable)               
- userName
- nickname                     
- provider                      
- socialId (unique)           
- createdAt                 
- updatedAt                     


[Content]
- id (PK)
- title
- description
- thumbnail_url
- is_paid (bool)
- price
- created_at

[Payment]
- id (PK)
- user_id (FK)
- content_id (FK)
- payment_type (SINGLE / SUBSCRIPTION)
- paid_at
- status (SUCCESS / FAILED)

[Subscription] (옵션)
- id (PK)
- user_id (FK)
- started_at
- expired_at
```

---

🚀 CI/CD 및 Docker 적용 계획
Docker: 프론트엔드와 백엔드를 각각 컨테이너화

Docker Compose로 FE/BE/DB 개발 환경 구성

CI/CD: GitHub Actions:

push → 자동 테스트 → 빌드 → Docker 이미지 생성

이미지 → Docker Hub 또는 AWS ECR 업로드

AWS EC2 또는 Render로 자동 배포 (SSH or API)

보안: 환경 변수는 .env, GitHub Secrets, AWS Secrets Manager로 분리 및 암호화 관리

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

