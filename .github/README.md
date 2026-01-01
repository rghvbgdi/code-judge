# GitHub Actions CI/CD Pipeline

## Overview

This repository uses GitHub Actions for automated testing, building, and deployment to AWS Lambda and S3.

## Workflows

### 1. Development Workflow (`development.yml`)
- **Triggers**: Push to `develop` or `feature/*` branches, PRs to `develop`
- **Jobs**: 
  - Run tests and linting
  - Build frontend
  - Create deployment packages
  - Upload artifacts for testing

### 2. Production Deployment (`deploy.yml`)
- **Triggers**: Push to `main` branch only
- **Jobs**:
  - Test all components
  - Deploy backend Lambda
  - Deploy compiler Lambda
  - Deploy frontend to S3
  - Update CloudFront
  - Send deployment status

## Setup Instructions

### 1. Repository Secrets
Add these secrets in GitHub Repository → Settings → Secrets:

```bash
# AWS Credentials
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key

# Database
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-jwt-secret
GEMINI_API_KEY=your-gemini-key

# Frontend
CLIENT_ORIGIN=https://your-domain.com
CLOUDFRONT_DISTRIBUTION_ID=E123456789ABCDEF
CLOUDFRONT_DOMAIN=xyz123.cloudfront.net

# S3
S3_BUCKET_NAME=code-judge-frontend-unique-name
```

### 2. AWS Requirements
Ensure you have:
- Lambda functions: `code-judge-backend`, `code-judge-compiler`
- API Gateways: `code-judge-backend-api`, `code-judge-compiler-api`
- S3 bucket for frontend
- CloudFront distribution

### 3. Branch Strategy
- `main`: Production branch (auto-deploys)
- `develop`: Development branch (tests only)
- `feature/*`: Feature branches (tests only)

## Deployment Process

### To Production (main branch):
1. Push to `main` branch
2. GitHub Actions runs tests
3. If tests pass, deploys to AWS
4. Updates Lambda functions
5. Deploys frontend to S3
6. Invalidates CloudFront cache

### To Development (develop branch):
1. Push to `develop` branch
2. GitHub Actions runs tests
3. Creates deployment packages
4. Uploads artifacts for manual testing

## Monitoring

- Check GitHub Actions tab for deployment status
- Monitor CloudWatch logs for Lambda errors
- Use AWS Console for manual verification

## Troubleshooting

### Common Issues:
1. **AWS Credentials Error**: Verify secrets are correct
2. **Lambda Update Failed**: Check function exists and permissions
3. **S3 Upload Failed**: Verify bucket exists and permissions
4. **CloudFront Invalidation Failed**: Verify distribution ID

### Debug Steps:
1. Check GitHub Actions logs
2. Verify AWS resources exist
3. Check IAM permissions
4. Test deployment packages locally

## Security

- Secrets are encrypted and not exposed in logs
- Least privilege IAM roles recommended
- Regular secret rotation recommended
- No secrets in repository code

## Best Practices

- Always test on `develop` branch first
- Use meaningful commit messages
- Monitor deployment costs
- Keep dependencies updated
- Regular security audits
