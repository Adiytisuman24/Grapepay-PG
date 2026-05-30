import { DynamoDBClient, CreateTableCommand, ListTablesCommand, BillingMode } from '@aws-sdk/client-dynamodb';

const client = new DynamoDBClient({
  region:   process.env.DYNAMODB_REGION   || 'ap-south-1',
  endpoint: process.env.DYNAMODB_ENDPOINT || 'http://localhost:8000',
  credentials: {
    accessKeyId:     process.env.AWS_ACCESS_KEY_ID     || 'local',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'local',
  },
});

const TABLES = [
  // ── Payments ────────────────────────────────────────────────────────────────
  {
    TableName:            'grapepay-payments',
    BillingMode:          BillingMode.PAY_PER_REQUEST,
    AttributeDefinitions: [
      { AttributeName: 'paymentId',  AttributeType: 'S' },
      { AttributeName: 'merchantId', AttributeType: 'S' },
      { AttributeName: 'createdAt',  AttributeType: 'S' },
      { AttributeName: 'customerId', AttributeType: 'S' },
    ],
    KeySchema: [
      { AttributeName: 'paymentId', KeyType: 'HASH' },
    ],
    GlobalSecondaryIndexes: [
      {
        IndexName:  'merchantId-createdAt-index',
        KeySchema: [
          { AttributeName: 'merchantId', KeyType: 'HASH' },
          { AttributeName: 'createdAt',  KeyType: 'RANGE' },
        ],
        Projection: { ProjectionType: 'ALL' },
      },
      {
        IndexName:  'customerId-createdAt-index',
        KeySchema: [
          { AttributeName: 'customerId', KeyType: 'HASH' },
          { AttributeName: 'createdAt',  KeyType: 'RANGE' },
        ],
        Projection: { ProjectionType: 'ALL' },
      },
    ],
  },

  // ── Customers ───────────────────────────────────────────────────────────────
  {
    TableName:            'grapepay-customers',
    BillingMode:          BillingMode.PAY_PER_REQUEST,
    AttributeDefinitions: [
      { AttributeName: 'customerId', AttributeType: 'S' },
      { AttributeName: 'merchantId', AttributeType: 'S' },
      { AttributeName: 'createdAt',  AttributeType: 'S' },
      { AttributeName: 'email',      AttributeType: 'S' },
    ],
    KeySchema: [
      { AttributeName: 'customerId', KeyType: 'HASH' },
    ],
    GlobalSecondaryIndexes: [
      {
        IndexName:  'merchantId-createdAt-index',
        KeySchema: [
          { AttributeName: 'merchantId', KeyType: 'HASH' },
          { AttributeName: 'createdAt',  KeyType: 'RANGE' },
        ],
        Projection: { ProjectionType: 'ALL' },
      },
      {
        IndexName:  'email-index',
        KeySchema: [
          { AttributeName: 'email', KeyType: 'HASH' },
        ],
        Projection: { ProjectionType: 'ALL' },
      },
    ],
  },

  // ── Invoices ─────────────────────────────────────────────────────────────────
  {
    TableName:            'grapepay-invoices',
    BillingMode:          BillingMode.PAY_PER_REQUEST,
    AttributeDefinitions: [
      { AttributeName: 'invoiceId',  AttributeType: 'S' },
      { AttributeName: 'merchantId', AttributeType: 'S' },
      { AttributeName: 'createdAt',  AttributeType: 'S' },
    ],
    KeySchema: [
      { AttributeName: 'invoiceId', KeyType: 'HASH' },
    ],
    GlobalSecondaryIndexes: [
      {
        IndexName:  'merchantId-createdAt-index',
        KeySchema: [
          { AttributeName: 'merchantId', KeyType: 'HASH' },
          { AttributeName: 'createdAt',  KeyType: 'RANGE' },
        ],
        Projection: { ProjectionType: 'ALL' },
      },
    ],
  },

  // ── Merchants + Users (single-table design) ───────────────────────────────
  {
    TableName:            'grapepay-merchants',
    BillingMode:          BillingMode.PAY_PER_REQUEST,
    AttributeDefinitions: [
      { AttributeName: 'merchantId', AttributeType: 'S' },
      { AttributeName: 'pk',         AttributeType: 'S' },
      { AttributeName: 'sk',         AttributeType: 'S' },
      { AttributeName: 'email',      AttributeType: 'S' },
    ],
    KeySchema: [
      { AttributeName: 'merchantId', KeyType: 'HASH' },
    ],
    GlobalSecondaryIndexes: [
      {
        IndexName:  'pk-sk-index',
        KeySchema: [
          { AttributeName: 'pk', KeyType: 'HASH' },
          { AttributeName: 'sk', KeyType: 'RANGE' },
        ],
        Projection: { ProjectionType: 'ALL' },
      },
      {
        IndexName:  'email-index',
        KeySchema: [
          { AttributeName: 'email', KeyType: 'HASH' },
        ],
        Projection: { ProjectionType: 'ALL' },
      },
    ],
  },

  // ── Audit Logs ────────────────────────────────────────────────────────────
  {
    TableName:            'grapepay-audit-logs',
    BillingMode:          BillingMode.PAY_PER_REQUEST,
    AttributeDefinitions: [
      { AttributeName: 'logId',      AttributeType: 'S' },
      { AttributeName: 'merchantId', AttributeType: 'S' },
      { AttributeName: 'timestamp',  AttributeType: 'S' },
    ],
    KeySchema: [
      { AttributeName: 'logId', KeyType: 'HASH' },
    ],
    GlobalSecondaryIndexes: [
      {
        IndexName:  'merchantId-timestamp-index',
        KeySchema: [
          { AttributeName: 'merchantId', KeyType: 'HASH' },
          { AttributeName: 'timestamp',  KeyType: 'RANGE' },
        ],
        Projection: { ProjectionType: 'ALL' },
      },
    ],
  },
];

async function setup(): Promise<void> {
  console.log('🔧 Setting up DynamoDB tables...\n');

  // Get existing tables
  const existing = await client.send(new ListTablesCommand({}));
  const existingNames = new Set(existing.TableNames || []);

  for (const tableConfig of TABLES) {
    if (existingNames.has(tableConfig.TableName)) {
      console.log(`  ✓ ${tableConfig.TableName} (already exists)`);
      continue;
    }

    try {
      await client.send(new CreateTableCommand(tableConfig as any));
      console.log(`  ✅ Created: ${tableConfig.TableName}`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`  ❌ Failed: ${tableConfig.TableName} — ${msg}`);
    }
  }

  console.log('\n✅ DynamoDB setup complete!');
}

setup().catch(err => {
  console.error('Fatal setup error:', err);
  process.exit(1);
});
