import nodemailer from 'nodemailer';
import axios from 'axios';
import { GetCommand } from '@aws-sdk/lib-dynamodb';
import { dynamoDb, TABLES } from '@grapepay/shared';

// ─── Email transporter (SES in prod, SMTP in dev) ─────────────────────────────
const transporter = nodemailer.createTransport(
  process.env.NODE_ENV === 'production'
    ? {
        host:   'email-smtp.ap-south-1.amazonaws.com',
        port:    465,
        secure:  true,
        auth: {
          user: process.env.SES_SMTP_USER,
          pass: process.env.SES_SMTP_PASS,
        },
      }
    : {
        host:   process.env.SMTP_HOST || 'smtp.ethereal.email',
        port:   parseInt(process.env.SMTP_PORT || '587'),
        auth: {
          user: process.env.SMTP_USER || '',
          pass: process.env.SMTP_PASS || '',
        },
      }
);

// ─── Email templates ──────────────────────────────────────────────────────────
const EMAIL_TEMPLATES: Record<string, (data: Record<string, unknown>) => { subject: string; html: string }> = {
  payment_authorized: (data) => ({
    subject: `Payment Authorized — ₹${data.amount}`,
    html: `
      <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto">
        <div style="background:#6c47ff;padding:24px;border-radius:12px 12px 0 0">
          <h1 style="color:#fff;margin:0;font-size:22px">GrapePay</h1>
        </div>
        <div style="padding:32px;background:#f9f9fb;border-radius:0 0 12px 12px">
          <h2 style="color:#1a1a2e">Payment Authorized ✓</h2>
          <p style="color:#555">Your payment of <strong>₹${data.amount} ${data.currency}</strong> has been authorized and is being processed.</p>
          <div style="background:#fff;border-radius:8px;padding:16px;margin:20px 0;border:1px solid #e0e0e0">
            <p style="margin:0;color:#888;font-size:13px">Amount</p>
            <p style="margin:4px 0 0;font-size:24px;font-weight:700;color:#6c47ff">₹${data.amount}</p>
          </div>
          <p style="color:#888;font-size:12px">Powered by GrapePay • Secure Payments Infrastructure</p>
        </div>
      </div>`,
  }),

  payment_success: (data) => ({
    subject: `Payment Successful — ₹${data.amount}`,
    html: `
      <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto">
        <div style="background:#22c55e;padding:24px;border-radius:12px 12px 0 0">
          <h1 style="color:#fff;margin:0;font-size:22px">GrapePay</h1>
        </div>
        <div style="padding:32px;background:#f9f9fb">
          <h2 style="color:#1a1a2e">Payment Successful 🎉</h2>
          <p style="color:#555">₹<strong>${data.amount} ${data.currency}</strong> has been successfully captured.</p>
          <p style="color:#888;font-size:12px">Powered by GrapePay</p>
        </div>
      </div>`,
  }),

  payment_failed: (data) => ({
    subject: `Payment Failed`,
    html: `
      <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto">
        <div style="background:#ef4444;padding:24px;border-radius:12px 12px 0 0">
          <h1 style="color:#fff;margin:0;font-size:22px">GrapePay</h1>
        </div>
        <div style="padding:32px;background:#f9f9fb">
          <h2 style="color:#1a1a2e">Payment Failed ✗</h2>
          <p style="color:#555">Reason: <strong>${data.reason || 'Unknown error'}</strong></p>
          <p style="color:#555">Please try again or contact support.</p>
          <p style="color:#888;font-size:12px">Powered by GrapePay</p>
        </div>
      </div>`,
  }),

  invoice_sent: (data) => ({
    subject: `Invoice ${data.invoiceNumber} — ₹${data.amount} Due`,
    html: `
      <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto">
        <div style="background:#6c47ff;padding:24px;border-radius:12px 12px 0 0">
          <h1 style="color:#fff;margin:0;font-size:22px">GrapePay Invoice</h1>
        </div>
        <div style="padding:32px;background:#f9f9fb">
          <h2 style="color:#1a1a2e">Invoice ${data.invoiceNumber}</h2>
          <p style="color:#555">Amount due: <strong>₹${data.amount}</strong></p>
          <p style="color:#555">Due date: <strong>${data.dueDate}</strong></p>
          <p style="color:#888;font-size:12px">Powered by GrapePay</p>
        </div>
      </div>`,
  }),
};

// ─── Send email ───────────────────────────────────────────────────────────────
export async function sendEmail(
  to: string,
  template: string,
  data: Record<string, unknown>
): Promise<void> {
  const templateFn = EMAIL_TEMPLATES[template];
  if (!templateFn) {
    console.warn(`[Notification] Unknown template: ${template}`);
    return;
  }

  const { subject, html } = templateFn(data);

  try {
    const info = await transporter.sendMail({
      from:    `"GrapePay" <noreply@${process.env.EMAIL_DOMAIN || 'grapepay.io'}>`,
      to,
      subject,
      html,
    });
    console.log(`[Notification] Email sent → ${to} | Template: ${template} | MsgId: ${info.messageId}`);
  } catch (err) {
    console.error(`[Notification] Email failed → ${to}:`, err);
    throw err;
  }
}

// ─── Send SMS via Twilio ───────────────────────────────────────────────────────
export async function sendSMS(phone: string, body: string): Promise<void> {
  if (!process.env.TWILIO_ACCOUNT_SID) {
    console.log(`[Notification] SMS (dev mode) → ${phone}: ${body}`);
    return;
  }

  try {
    const { Twilio } = await import('twilio');
    const client = new Twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );
    await client.messages.create({
      body,
      from: process.env.TWILIO_FROM_NUMBER,
      to:   phone,
    });
    console.log(`[Notification] SMS sent → ${phone}`);
  } catch (err) {
    console.error(`[Notification] SMS failed → ${phone}:`, err);
  }
}

// ─── Deliver merchant webhook ──────────────────────────────────────────────────
export async function deliverMerchantWebhook(
  merchantId: string,
  event: string,
  payload: Record<string, unknown>
): Promise<void> {
  // Fetch merchant webhook URL from DynamoDB
  const result = await dynamoDb.send(new GetCommand({
    TableName: TABLES.MERCHANTS,
    Key:       { merchantId },
  }));

  const merchant = result.Item;
  if (!merchant?.webhookUrl) {
    console.log(`[Notification] No webhook URL for merchant: ${merchantId}`);
    return;
  }

  const body = JSON.stringify({
    event,
    timestamp: new Date().toISOString(),
    data:      payload,
  });

  // Retry up to 3 times with exponential back-off
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const response = await axios.post(merchant.webhookUrl, body, {
        headers: {
          'Content-Type':        'application/json',
          'X-GrapePay-Event':    event,
          'X-GrapePay-Delivery': `whk_${Date.now()}`,
        },
        timeout: 10_000,
      });
      console.log(`[Notification] Webhook delivered → ${merchant.webhookUrl} (${response.status})`);
      return;
    } catch (err) {
      const wait = attempt * 2000;
      console.warn(`[Notification] Webhook attempt ${attempt}/3 failed. Retrying in ${wait}ms…`);
      if (attempt < 3) await new Promise(r => setTimeout(r, wait));
    }
  }

  console.error(`[Notification] Webhook delivery failed after 3 attempts for merchant: ${merchantId}`);
}
