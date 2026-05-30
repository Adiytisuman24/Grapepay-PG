# GrapePay Backend

> Event-driven microservices payment infrastructure built on Node.js, Kafka, DynamoDB, and Redis.

## Architecture Overview

```
Frontend (React) → API Gateway (Express)
                        │
                   Kafka Topics
                  ┌─────┴──────┐
                  │            │
           Payment Service  Notification Service
           (Stripe/Razorpay) (Email/SMS/Webhooks)
                  │
               DynamoDB + Redis
```

## Services

| Service              | Port  | Description                                      |
|----------------------|-------|--------------------------------------------------|
| `api-gateway`        | 3000  | REST API entry point, auth, routing              |
| `payment-service`    | —     | Kafka consumer, Stripe/Razorpay processor        |
| `notification-service` | —   | Email (SES), SMS (Twilio), merchant webhooks     |
| `@grapepay/shared`   | —     | Types, Kafka/Redis/DynamoDB clients (library)    |

## Infrastructure

| Component        | Port  | UI                               |
|------------------|-------|----------------------------------|
| DynamoDB Local   | 8000  | http://localhost:8001 (Admin UI) |
| Redis            | 6379  | —                                |
| Kafka            | 9092  | http://localhost:8080 (Kafka UI) |
| Zookeeper        | 2181  | —                                |

## Quick Start

### 1. Start infrastructure

```bash
cd backend/infrastructure
docker-compose up -d
```

### 2. Create DynamoDB tables

```bash
cd backend
npm install
npx ts-node infrastructure/dynamodb-setup.ts
```

### 3. Set up environment

```bash
cp .env.example .env
# Edit .env with your secrets
```

### 4. Start all services (separate terminals)

```bash
# API Gateway
cd services/api-gateway && npm run dev

# Payment Service
cd services/payment-service && npm run dev

# Notification Service
cd services/notification-service && npm run dev
```

## API Reference

### Auth
| Method | Path                | Description           |
|--------|---------------------|-----------------------|
| POST   | /v1/auth/register   | Register merchant     |
| POST   | /v1/auth/login      | Login + get JWT       |
| POST   | /v1/auth/logout     | Invalidate token      |
| GET    | /v1/auth/me         | Current user info     |

### Payments
| Method | Path                            | Description         |
|--------|---------------------------------|---------------------|
| POST   | /v1/payments                    | Initiate payment    |
| GET    | /v1/payments                    | List payments       |
| GET    | /v1/payments/:id                | Get payment         |
| POST   | /v1/payments/:id/refund         | Refund payment      |

### Invoices
| Method | Path                            | Description         |
|--------|---------------------------------|---------------------|
| POST   | /v1/invoices                    | Create invoice      |
| GET    | /v1/invoices                    | List invoices       |
| GET    | /v1/invoices/:id                | Get invoice         |
| POST   | /v1/invoices/:id/send           | Send to customer    |

### Customers
| Method | Path                            | Description         |
|--------|---------------------------------|---------------------|
| POST   | /v1/customers                   | Create customer     |
| GET    | /v1/customers                   | List customers      |
| GET    | /v1/customers/:id               | Get customer        |
| PATCH  | /v1/customers/:id               | Update customer     |

### Webhooks (No auth — signature verified)
| Method | Path                            | Description         |
|--------|---------------------------------|---------------------|
| POST   | /v1/webhooks/stripe             | Stripe events       |
| POST   | /v1/webhooks/razorpay           | Razorpay events     |

### Health
| Method | Path             | Description          |
|--------|------------------|----------------------|
| GET    | /health          | Liveness + deps      |
| GET    | /health/ready    | Readiness probe      |

## Payment Flow

```
POST /v1/payments
      │
      ▼
API Gateway validates + saves to DynamoDB (status: initiated)
      │
      ▼
Publishes "payment.initiated" → Kafka
      │
      ├──▶ Payment Service consumes event
      │         ├── Fraud check (amount limits)
      │         ├── Creates Stripe PaymentIntent
      │         ├── Updates DynamoDB (status: authorized)
      │         └── Publishes "payment.authorized" + notification events
      │
      └──▶ Notification Service consumes events
                ├── Sends email to customer
                └── Delivers webhook to merchant
```

## Environment Variables

See [`.env.example`](.env.example) for all required variables.

Key secrets to set:
- `JWT_SECRET` — change from default in production
- `STRIPE_SECRET_KEY` — from Stripe dashboard
- `TWILIO_ACCOUNT_SID` + `TWILIO_AUTH_TOKEN` — for SMS
- `WEBHOOK_SECRET` — shared with Stripe/Razorpay

## Directory Structure

```
backend/
├── shared/                    # @grapepay/shared library
│   └── src/
│       ├── types/             # Payment, User, Invoice types
│       ├── clients/           # DynamoDB, Redis, Kafka clients
│       └── events.ts          # Kafka topic & event name constants
│
├── services/
│   ├── api-gateway/           # Express REST API
│   │   └── src/
│   │       ├── middleware/    # auth, rateLimit, logging, errorHandler
│   │       └── routes/        # payments, invoices, customers, webhooks, auth, health
│   │
│   ├── payment-service/       # Kafka consumer → Stripe/Razorpay
│   │   └── src/
│   │       └── services/paymentProcessor.ts
│   │
│   └── notification-service/  # Kafka consumer → Email/SMS/Webhooks
│       └── src/
│           └── notificationSender.ts
│
└── infrastructure/
    ├── docker-compose.yml     # All infra + services
    └── dynamodb-setup.ts      # Table provisioning script
```
