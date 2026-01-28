# API Contracts - MediFinance Platform

## Base URL
```
Production: https://api.medifinance.health/v1
Staging: https://api-staging.medifinance.health/v1
Local: http://localhost:5000/api/v1
```

## Authentication

All API requests require JWT authentication via Bearer token in header:
```
Authorization: Bearer <jwt_token>
```

### Get Access Token
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword"
}

Response: 200 OK
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "...",
  "expiresIn": 3600,
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

## 1. Hospital APIs

### Get All Hospitals
```http
GET /hospitals
Query Parameters:
  - city (string, optional)
  - procedure (string, optional)
  - maxDistance (number, optional)
  - priceMin (number, optional)
  - priceMax (number, optional)
  - rating (number, optional)
  - cashlessInsurer (string, optional)
  - page (number, default: 1)
  - limit (number, default: 20)

Response: 200 OK
{
  "data": [
    {
      "id": "uuid",
      "name": "Apollo Hospitals",
      "location": {
        "address": "Bannerghatta Road",
        "city": "Bangalore",
        "state": "Karnataka",
        "pincode": "560076",
        "coordinates": {
          "lat": 12.9352,
          "lng": 77.6245
        }
      },
      "distance": 3.2,
      "rating": 4.7,
      "reviewCount": 1248,
      "successRate": 96.5,
      "isPremium": true,
      "cashlessInsurers": ["Star Health", "HDFC Ergo"],
      "specializations": ["Orthopedics", "Cardiology"]
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 156,
    "pages": 8
  }
}
```

### Get Hospital Details
```http
GET /hospitals/:hospitalId

Response: 200 OK
{
  "id": "uuid",
  "name": "Apollo Hospitals",
  "registrationNumber": "REG123456",
  "location": { ... },
  "contact": {
    "phone": "+91-80-12345678",
    "email": "info@apollo.com",
    "website": "https://apollo.com"
  },
  "rating": 4.7,
  "reviewCount": 1248,
  "facilities": {
    "totalBeds": 500,
    "icuBeds": 50,
    "emergencyServices": true,
    "ambulanceService": true
  },
  "accreditations": ["NABH", "JCI"],
  "specializations": ["Orthopedics", "Cardiology", "Neurology"],
  "cashlessInsurers": ["Star Health", "HDFC Ergo"]
}
```

### Get Hospital Pricing for Procedure
```http
GET /hospitals/:hospitalId/pricing/:procedureId
Query Parameters:
  - roomType (string, optional: general|semiprivate|private)

Response: 200 OK
{
  "hospitalId": "uuid",
  "procedureId": "uuid",
  "procedureName": "Knee Replacement Surgery",
  "pricing": {
    "basePrice": 285000,
    "doctorFees": 45000,
    "roomCharges": {
      "general": 25000,
      "semiprivate": 35000,
      "private": 50000
    },
    "otCharges": 30000,
    "anesthesia": 15000,
    "consumables": 28000,
    "diagnostics": 12000,
    "miscCharges": 8000,
    "totalEstimate": 405000
  },
  "averageStayDays": 5,
  "successRate": 96.5,
  "confidenceScore": 87,
  "lastUpdated": "2026-01-15T10:30:00Z"
}
```

## 2. Insurance APIs

### Analyze Insurance Policy
```http
POST /insurance/analyze
Content-Type: multipart/form-data

Form Data:
  - policyDocument (file)
  - procedureId (string, optional)
  - hospitalId (string, optional)

Response: 202 Accepted
{
  "analysisId": "uuid",
  "status": "processing",
  "estimatedTime": 120
}

GET /insurance/analysis/:analysisId
Response: 200 OK
{
  "analysisId": "uuid",
  "status": "completed",
  "policy": {
    "policyNumber": "SH-2024-789456",
    "provider": "Star Health",
    "policyHolder": "John Doe",
    "coverageAmount": 500000,
    "premium": 15000,
    "type": "Individual Health Insurance",
    "validFrom": "2024-01-01",
    "validTo": "2025-12-31"
  },
  "coverage": {
    "sublimits": {
      "roomRent": 5000,
      "surgery": 350000,
      "diagnostics": 50000
    },
    "waitingPeriods": {
      "initial": 30,
      "preExisting": 730
    },
    "copay": 10,
    "deductible": 0
  },
  "eligibility": {
    "status": "approved",
    "checks": [
      {
        "name": "Policy Active",
        "passed": true,
        "message": "Policy is currently active"
      },
      {
        "name": "Waiting Period",
        "passed": true,
        "message": "No waiting period applicable"
      }
    ]
  },
  "exclusions": [
    "Cosmetic procedures",
    "Pre-existing conditions (first 2 years)"
  ],
  "claimType": "cashless",
  "networkHospitals": 15,
  "confidenceScore": 92
}
```

### Get Coverage Estimate
```http
POST /insurance/coverage-estimate
Content-Type: application/json

{
  "policyId": "uuid",
  "hospitalId": "uuid",
  "procedureId": "uuid",
  "roomType": "semiprivate",
  "stayDuration": 5
}

Response: 200 OK
{
  "totalCost": 405000,
  "breakdown": [
    {
      "category": "Surgery Base Cost",
      "amount": 285000,
      "covered": true,
      "reason": "Within surgery sublimit"
    },
    {
      "category": "Room Charges",
      "amount": 35000,
      "covered": false,
      "reason": "Exceeds room rent sublimit of ₹5,000/day"
    },
    {
      "category": "Consumables",
      "amount": 28000,
      "covered": false,
      "reason": "Not covered under policy"
    }
  ],
  "insuranceCovered": 350000,
  "outOfPocket": 55000,
  "copayAmount": 0,
  "deductible": 0,
  "confidenceScore": 87,
  "warnings": [
    "Room rent sublimit may cause proportional deduction"
  ]
}
```

## 3. Financing APIs

### Get Financing Options
```http
GET /financing/options
Query Parameters:
  - amount (number, required)
  - tenure (number, optional)

Response: 200 OK
{
  "data": [
    {
      "id": "uuid",
      "provider": "MediFin Zero-Cost EMI",
      "type": "emi",
      "interestRate": 0,
      "processingFee": 0,
      "tenureOptions": [3, 6, 9, 12],
      "minAmount": 10000,
      "maxAmount": 300000,
      "approvalTime": "instant",
      "features": [
        "No credit score impact",
        "Instant approval",
        "Zero documentation"
      ],
      "emi": {
        "3": 18333,
        "6": 9167,
        "9": 6111,
        "12": 4583
      }
    }
  ]
}
```

### Calculate EMI
```http
POST /financing/calculate-emi
Content-Type: application/json

{
  "principal": 55000,
  "interestRate": 10.5,
  "tenure": 12
}

Response: 200 OK
{
  "principal": 55000,
  "interestRate": 10.5,
  "tenure": 12,
  "emi": 4847,
  "totalPayment": 58164,
  "totalInterest": 3164,
  "schedule": [
    {
      "month": 1,
      "emi": 4847,
      "principal": 4366,
      "interest": 481,
      "balance": 50634
    }
    // ... more months
  ]
}
```

### Check Eligibility
```http
POST /financing/eligibility
Content-Type: application/json

{
  "amount": 55000,
  "income": 50000,
  "age": 32,
  "employmentType": "salaried"
}

Response: 200 OK
{
  "eligible": true,
  "maxAmount": 300000,
  "recommendations": [
    {
      "providerId": "uuid",
      "provider": "MediFin Zero-Cost EMI",
      "approvalProbability": 95
    }
  ],
  "checks": [
    {
      "criterion": "Age",
      "required": "21-65 years",
      "status": "passed"
    },
    {
      "criterion": "Income",
      "required": "₹15,000/month minimum",
      "status": "passed"
    }
  ]
}
```

### Submit Financing Application
```http
POST /financing/applications
Content-Type: application/json

{
  "providerId": "uuid",
  "amount": 55000,
  "tenure": 12,
  "purpose": "Medical treatment",
  "estimateId": "uuid"
}

Response: 201 Created
{
  "applicationId": "uuid",
  "status": "pending",
  "submittedAt": "2026-01-28T10:30:00Z",
  "expectedDecision": "2026-01-28T12:30:00Z",
  "trackingUrl": "https://medifinance.health/applications/uuid"
}
```

## 4. Cost Estimation APIs

### Create Cost Estimate
```http
POST /cost-estimates
Content-Type: application/json

{
  "hospitalId": "uuid",
  "procedureId": "uuid",
  "roomType": "semiprivate",
  "stayDuration": 5,
  "policyId": "uuid",
  "includeFinancing": true
}

Response: 201 Created
{
  "estimateId": "uuid",
  "hospital": {
    "id": "uuid",
    "name": "Apollo Hospitals"
  },
  "procedure": {
    "id": "uuid",
    "name": "Knee Replacement Surgery"
  },
  "costs": {
    "basePrice": 285000,
    "doctorFees": 45000,
    "roomCharges": 35000,
    "consumables": 28000,
    "diagnostics": 12000,
    "miscCharges": 8000,
    "total": 413000
  },
  "insurance": {
    "covered": 350000,
    "outOfPocket": 63000
  },
  "financing": {
    "available": true,
    "options": [
      {
        "provider": "MediFin",
        "emi": 5250,
        "tenure": 12
      }
    ]
  },
  "recommendations": [
    {
      "type": "cost_saving",
      "title": "Consider Narayana Health",
      "savings": 85000
    }
  ],
  "confidenceScore": 87,
  "createdAt": "2026-01-28T10:30:00Z"
}
```

### Get Estimate Details
```http
GET /cost-estimates/:estimateId

Response: 200 OK
{
  "estimateId": "uuid",
  "status": "active",
  "validUntil": "2026-02-28T10:30:00Z",
  ... (same structure as create response)
}
```

### Generate Report
```http
GET /cost-estimates/:estimateId/report
Query Parameters:
  - format (string: pdf|json, default: json)

Response: 200 OK (JSON) or PDF file
{
  "reportId": "uuid",
  "estimateId": "uuid",
  "generatedAt": "2026-01-28T10:30:00Z",
  "summary": { ... },
  "downloadUrl": "https://medifinance.health/reports/uuid.pdf"
}
```

## 5. Search APIs

### Search Procedures
```http
GET /procedures/search
Query Parameters:
  - q (string, required)
  - category (string, optional)
  - limit (number, default: 10)

Response: 200 OK
{
  "results": [
    {
      "id": "uuid",
      "name": "Knee Replacement Surgery",
      "category": "Orthopedics",
      "icdCode": "81.54",
      "averageCost": 350000,
      "averageDuration": 5
    }
  ]
}
```

### Autocomplete
```http
GET /search/autocomplete
Query Parameters:
  - q (string, required)
  - type (string: hospital|procedure|insurer)

Response: 200 OK
{
  "suggestions": [
    {
      "value": "Apollo Hospitals",
      "type": "hospital",
      "id": "uuid"
    },
    {
      "value": "Knee Replacement",
      "type": "procedure",
      "id": "uuid"
    }
  ]
}
```

## Error Responses

### Standard Error Format
```json
{
  "error": {
    "code": "INVALID_REQUEST",
    "message": "The request is invalid",
    "details": [
      {
        "field": "amount",
        "message": "Amount must be greater than 0"
      }
    ],
    "requestId": "uuid",
    "timestamp": "2026-01-28T10:30:00Z"
  }
}
```

### Error Codes
| Code | HTTP Status | Description |
|------|-------------|-------------|
| UNAUTHORIZED | 401 | Authentication required or token invalid |
| FORBIDDEN | 403 | Insufficient permissions |
| NOT_FOUND | 404 | Resource not found |
| INVALID_REQUEST | 400 | Request validation failed |
| RATE_LIMIT_EXCEEDED | 429 | Too many requests |
| INTERNAL_ERROR | 500 | Server error |

## Rate Limiting

- **Public endpoints:** 100 requests/hour per IP
- **Authenticated endpoints:** 1000 requests/hour per user
- **Premium tier:** 5000 requests/hour per user

Rate limit headers:
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1643356800
```

## Webhooks (Future)

### Register Webhook
```http
POST /webhooks
Content-Type: application/json

{
  "url": "https://your-app.com/webhook",
  "events": ["application.approved", "estimate.expired"],
  "secret": "your-webhook-secret"
}
```

### Webhook Events
- `application.approved` - Financing application approved
- `application.rejected` - Financing application rejected
- `estimate.expired` - Cost estimate validity expired
- `policy.analyzed` - Insurance policy analysis complete

## API Versioning

- Current version: v1
- Version specified in URL: `/api/v1/`
- Deprecation notice: Minimum 6 months before removal
- Legacy version support: Up to 12 months

## SDK Libraries (Future)

```javascript
// JavaScript/Node.js
npm install @medifinance/sdk

import { MediFinance } from '@medifinance/sdk';
const client = new MediFinance('API_KEY');
const hospitals = await client.hospitals.list({ city: 'Bangalore' });
```

```python
# Python
pip install medifinance-sdk

from medifinance import Client
client = Client('API_KEY')
hospitals = client.hospitals.list(city='Bangalore')
```
