# Database Schema - MediFinance Platform

## Overview
This document outlines the complete database schema for the MediFinance platform using PostgreSQL.

## Entity Relationship Diagram

```
┌─────────────┐       ┌──────────────┐       ┌─────────────┐
│   Users     │───────│  Insurance   │───────│   Claims    │
│             │  1:N  │   Policies   │  1:N  │             │
└─────────────┘       └──────────────┘       └─────────────┘
       │                     │
       │ 1:N                 │ N:1
       │                     │
┌─────────────┐       ┌──────────────┐
│  Searches   │       │  Insurers    │
│  /Queries   │       │              │
└─────────────┘       └──────────────┘
       │
       │ 1:N
       │
┌─────────────┐       ┌──────────────┐       ┌─────────────┐
│ Hospitals   │───────│  Procedures  │───────│   Pricing   │
│             │  N:M  │              │  1:N  │             │
└─────────────┘       └──────────────┘       └─────────────┘
       │
       │ 1:N
       │
┌─────────────┐
│ Financing   │
│  Options    │
└─────────────┘
```

## Tables

### 1. Users
Stores patient/caregiver information.

```sql
CREATE TABLE users (
    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    full_name VARCHAR(255) NOT NULL,
    date_of_birth DATE,
    gender VARCHAR(20),
    address JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP,
    is_active BOOLEAN DEFAULT true,
    role VARCHAR(50) DEFAULT 'patient'
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_phone ON users(phone);
```

### 2. Hospitals
Hospital master data with pricing and specializations.

```sql
CREATE TABLE hospitals (
    hospital_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    registration_number VARCHAR(100) UNIQUE,
    address JSONB NOT NULL,
    location_coordinates POINT,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    pincode VARCHAR(10),
    phone VARCHAR(20),
    email VARCHAR(255),
    website VARCHAR(255),
    rating DECIMAL(2,1) DEFAULT 0.0,
    review_count INTEGER DEFAULT 0,
    total_beds INTEGER,
    icu_beds INTEGER,
    is_premium BOOLEAN DEFAULT false,
    accreditations JSONB,
    specializations TEXT[],
    facilities JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT true
);

CREATE INDEX idx_hospitals_city ON hospitals(city);
CREATE INDEX idx_hospitals_rating ON hospitals(rating DESC);
CREATE INDEX idx_hospitals_location ON hospitals USING GIST(location_coordinates);
```

### 3. Procedures
Medical procedures catalog.

```sql
CREATE TABLE procedures (
    procedure_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    icd_code VARCHAR(50),
    description TEXT,
    average_duration_days INTEGER,
    complexity_level VARCHAR(50),
    success_rate_benchmark DECIMAL(5,2),
    keywords TEXT[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_procedures_category ON procedures(category);
CREATE INDEX idx_procedures_name ON procedures(name);
```

### 4. Hospital_Procedures_Pricing
Pricing information for procedures at hospitals.

```sql
CREATE TABLE hospital_procedures_pricing (
    pricing_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hospital_id UUID REFERENCES hospitals(hospital_id),
    procedure_id UUID REFERENCES procedures(procedure_id),
    base_price DECIMAL(10,2) NOT NULL,
    doctor_fees DECIMAL(10,2),
    room_charges_general DECIMAL(10,2),
    room_charges_semiprivate DECIMAL(10,2),
    room_charges_private DECIMAL(10,2),
    ot_charges DECIMAL(10,2),
    anesthesia_charges DECIMAL(10,2),
    consumables_estimate DECIMAL(10,2),
    diagnostics_estimate DECIMAL(10,2),
    misc_charges DECIMAL(10,2),
    total_estimate DECIMAL(10,2) GENERATED ALWAYS AS 
        (base_price + COALESCE(doctor_fees, 0) + COALESCE(consumables_estimate, 0)) STORED,
    effective_from DATE NOT NULL,
    effective_to DATE,
    success_rate DECIMAL(5,2),
    average_stay_days INTEGER,
    confidence_score INTEGER DEFAULT 85,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(hospital_id, procedure_id, effective_from)
);

CREATE INDEX idx_pricing_hospital ON hospital_procedures_pricing(hospital_id);
CREATE INDEX idx_pricing_procedure ON hospital_procedures_pricing(procedure_id);
CREATE INDEX idx_pricing_total ON hospital_procedures_pricing(total_estimate);
```

### 5. Insurers
Insurance companies master data.

```sql
CREATE TABLE insurers (
    insurer_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL UNIQUE,
    short_code VARCHAR(50) UNIQUE,
    logo_url VARCHAR(500),
    contact_email VARCHAR(255),
    contact_phone VARCHAR(20),
    claim_portal_url VARCHAR(500),
    api_endpoint VARCHAR(500),
    network_hospitals_count INTEGER,
    average_claim_settlement_days INTEGER,
    claim_settlement_ratio DECIMAL(5,2),
    rating DECIMAL(2,1),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_insurers_name ON insurers(name);
```

### 6. Insurance_Policies
User insurance policies.

```sql
CREATE TABLE insurance_policies (
    policy_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(user_id),
    insurer_id UUID REFERENCES insurers(insurer_id),
    policy_number VARCHAR(100) UNIQUE NOT NULL,
    policy_type VARCHAR(100) NOT NULL,
    policy_holder_name VARCHAR(255) NOT NULL,
    coverage_amount DECIMAL(10,2) NOT NULL,
    premium_amount DECIMAL(10,2),
    premium_frequency VARCHAR(50),
    deductible DECIMAL(10,2) DEFAULT 0,
    copay_percentage DECIMAL(5,2) DEFAULT 0,
    policy_start_date DATE NOT NULL,
    policy_end_date DATE NOT NULL,
    waiting_period_initial INTEGER DEFAULT 30,
    waiting_period_preexisting INTEGER DEFAULT 730,
    room_rent_sublimit DECIMAL(10,2),
    surgery_sublimit DECIMAL(10,2),
    diagnostics_sublimit DECIMAL(10,2),
    exclusions TEXT[],
    claim_type VARCHAR(50) DEFAULT 'both',
    document_url VARCHAR(500),
    parsed_data JSONB,
    ai_analysis_status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_policies_user ON insurance_policies(user_id);
CREATE INDEX idx_policies_insurer ON insurance_policies(insurer_id);
CREATE INDEX idx_policies_number ON insurance_policies(policy_number);
```

### 7. Cashless_Network
Mapping of hospitals in insurer cashless networks.

```sql
CREATE TABLE cashless_network (
    network_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    insurer_id UUID REFERENCES insurers(insurer_id),
    hospital_id UUID REFERENCES hospitals(hospital_id),
    is_active BOOLEAN DEFAULT true,
    effective_from DATE NOT NULL,
    effective_to DATE,
    turnaround_time_hours INTEGER,
    UNIQUE(insurer_id, hospital_id)
);

CREATE INDEX idx_network_insurer ON cashless_network(insurer_id);
CREATE INDEX idx_network_hospital ON cashless_network(hospital_id);
```

### 8. Financing_Providers
NBFCs, banks, and financing partners.

```sql
CREATE TABLE financing_providers (
    provider_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    provider_type VARCHAR(50) NOT NULL,
    logo_url VARCHAR(500),
    interest_rate_min DECIMAL(5,2),
    interest_rate_max DECIMAL(5,2),
    processing_fee_percentage DECIMAL(5,2),
    tenure_options INTEGER[],
    loan_amount_min DECIMAL(10,2),
    loan_amount_max DECIMAL(10,2),
    approval_time_hours INTEGER,
    min_income_requirement DECIMAL(10,2),
    min_credit_score INTEGER,
    features TEXT[],
    api_endpoint VARCHAR(500),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_financing_type ON financing_providers(provider_type);
CREATE INDEX idx_financing_active ON financing_providers(is_active);
```

### 9. Cost_Estimates
Saved cost simulations and estimates.

```sql
CREATE TABLE cost_estimates (
    estimate_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(user_id),
    hospital_id UUID REFERENCES hospitals(hospital_id),
    procedure_id UUID REFERENCES procedures(procedure_id),
    policy_id UUID REFERENCES insurance_policies(policy_id),
    room_type VARCHAR(50),
    stay_duration_days INTEGER,
    base_cost DECIMAL(10,2),
    total_cost DECIMAL(10,2),
    insurance_covered DECIMAL(10,2),
    out_of_pocket DECIMAL(10,2),
    cost_breakdown JSONB,
    confidence_score INTEGER,
    recommendations JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_finalized BOOLEAN DEFAULT false
);

CREATE INDEX idx_estimates_user ON cost_estimates(user_id);
CREATE INDEX idx_estimates_hospital ON cost_estimates(hospital_id);
CREATE INDEX idx_estimates_created ON cost_estimates(created_at DESC);
```

### 10. Financing_Applications
Loan/EMI applications.

```sql
CREATE TABLE financing_applications (
    application_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(user_id),
    provider_id UUID REFERENCES financing_providers(provider_id),
    estimate_id UUID REFERENCES cost_estimates(estimate_id),
    loan_amount DECIMAL(10,2) NOT NULL,
    tenure_months INTEGER NOT NULL,
    interest_rate DECIMAL(5,2),
    emi_amount DECIMAL(10,2),
    status VARCHAR(50) DEFAULT 'pending',
    application_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    approval_date TIMESTAMP,
    rejection_reason TEXT,
    disbursement_date TIMESTAMP
);

CREATE INDEX idx_applications_user ON financing_applications(user_id);
CREATE INDEX idx_applications_status ON financing_applications(status);
```

### 11. Search_Analytics
User search behavior tracking.

```sql
CREATE TABLE search_analytics (
    search_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(user_id),
    search_type VARCHAR(50),
    search_query TEXT,
    filters_applied JSONB,
    results_count INTEGER,
    clicked_result_id UUID,
    session_id VARCHAR(100),
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_search_user ON search_analytics(user_id);
CREATE INDEX idx_search_created ON search_analytics(created_at DESC);
```

### 12. Reviews_Ratings
Hospital reviews by patients.

```sql
CREATE TABLE reviews_ratings (
    review_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(user_id),
    hospital_id UUID REFERENCES hospitals(hospital_id),
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT,
    treatment_date DATE,
    cost_accuracy_rating INTEGER,
    would_recommend BOOLEAN,
    is_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_reviews_hospital ON reviews_ratings(hospital_id);
CREATE INDEX idx_reviews_rating ON reviews_ratings(rating);
```

## Indexes Summary

- **Primary Keys:** All tables have UUID primary keys
- **Foreign Keys:** Proper relationships with cascading rules
- **Search Indexes:** Email, phone, hospital name, city
- **Performance Indexes:** Rating, price, created_at for fast queries
- **Geospatial Index:** Hospital location for distance-based search

## Data Integrity Rules

1. **Referential Integrity:** All foreign keys enforce cascade on delete
2. **Check Constraints:** Ratings (1-5), percentages (0-100)
3. **Unique Constraints:** Policy numbers, registration numbers
4. **NOT NULL:** Critical fields like names, amounts, dates
5. **Default Values:** Timestamps, boolean flags, status fields

## Backup & Maintenance

```sql
-- Daily backup
pg_dump medifinance > backup_$(date +%Y%m%d).sql

-- Vacuum for performance
VACUUM ANALYZE;

-- Update statistics
ANALYZE;
```

## Security Considerations

1. **Encryption:** Store sensitive data (policy documents) encrypted
2. **Row-Level Security:** Implement RLS for multi-tenancy
3. **Audit Logging:** Track all pricing and policy changes
4. **PII Protection:** Hash/encrypt personal information
5. **Access Control:** Role-based permissions (patient, hospital, admin)

## Future Enhancements

1. **Partitioning:** Date-based partitioning for analytics tables
2. **Sharding:** Geographical sharding for scale
3. **Time-series:** Separate DB for real-time pricing changes
4. **Cache Layer:** Redis for frequently accessed data
5. **Read Replicas:** Separate read replicas for reporting
