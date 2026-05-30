import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

const rawClient = new DynamoDBClient({
  region: process.env.DYNAMODB_REGION || 'ap-south-1',
  endpoint: process.env.DYNAMODB_ENDPOINT || 'http://localhost:8000',
  credentials: {
    accessKeyId:     process.env.AWS_ACCESS_KEY_ID     || 'local',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'local',
  },
});

export const dynamoDb = DynamoDBDocumentClient.from(rawClient, {
  marshallOptions: {
    removeUndefinedValues: true,
    convertEmptyValues: true,
  },
});

// ─── Table Names ──────────────────────────────────────────────────────────────
export const TABLES = {
  PAYMENTS:   process.env.DYNAMODB_TABLE_PAYMENTS   || 'grapepay-payments',
  CUSTOMERS:  process.env.DYNAMODB_TABLE_CUSTOMERS  || 'grapepay-customers',
  INVOICES:   process.env.DYNAMODB_TABLE_INVOICES   || 'grapepay-invoices',
  MERCHANTS:  process.env.DYNAMODB_TABLE_MERCHANTS  || 'grapepay-merchants',
  AUDIT_LOGS: process.env.DYNAMODB_TABLE_AUDIT_LOGS || 'grapepay-audit-logs',
} as const;
