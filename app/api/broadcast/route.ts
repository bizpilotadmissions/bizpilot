import { NextResponse } from "next/server";

interface Recipient {
  phone: string;
  email: string;
  channel: "Instagram" | "WhatsApp" | "Facebook" | "Email";
}

interface BroadcastRequestBody {
  recipients: Recipient[];
  message: string;
}

export async function POST(request: Request) {
  try {
    const body: BroadcastRequestBody = await request.json();
    const { recipients, message } = body;

    if (!recipients || !Array.isArray(recipients) || recipients.length === 0) {
      return NextResponse.json(
        { error: "No recipients provided for broadcast." },
        { status: 400 }
      );
    }

    if (!message || message.trim() === "") {
      return NextResponse.json(
        { error: "Broadcast message content cannot be empty." },
        { status: 400 }
      );
    }

    // Group recipients by channel for batch processing
    const dispatchedResults = await Promise.allSettled(
      recipients.map(async (recipient) => {
        switch (recipient.channel) {
          case "WhatsApp":
            return await sendWhatsAppMessage(recipient.phone, message);
          case "Email":
            return await sendEmailMessage(recipient.email, message);
          case "Instagram":
            return await sendInstagramDM(recipient.phone, message);
          case "Facebook":
            return await sendFacebookDM(recipient.phone, message);
          default:
            throw new Error(`Unsupported channel: ${recipient.channel}`);
        }
      })
    );

    const successful = dispatchedResults.filter((r) => r.status === "fulfilled").length;
    const failed = dispatchedResults.filter((r) => r.status === "rejected").length;

    return NextResponse.json({
      success: true,
      summary: {
        total: recipients.length,
        successful,
        failed,
      },
    });
  } catch (error: any) {
    console.error("[BROADCAST_API_ERROR]", error);
    return NextResponse.json(
      { error: "Failed to dispatch broadcast messages.", details: error?.message },
      { status: 500 }
    );
  }
}

// --- Provider Integration Logic ---

async function sendWhatsAppMessage(phone: string, text: string) {
  // WhatsApp Cloud API Integration (Meta Graph API)
  // const token = process.env.WHATSAPP_API_TOKEN;
  // const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  // Send POST request to https://graph.facebook.com/v18.0/${phoneNumberId}/messages
  return { channel: "WhatsApp", target: phone, status: "sent" };
}

async function sendEmailMessage(email: string, text: string) {
  // Email Integration (e.g., Resend, SendGrid, or Nodemailer)
  // await resend.emails.send({ from: 'onboarding@resend.dev', to: email, subject: 'Update', text });
  return { channel: "Email", target: email, status: "sent" };
}

async function sendInstagramDM(recipientId: string, text: string) {
  // Meta Instagram Graph API
  return { channel: "Instagram", target: recipientId, status: "sent" };
}

async function sendFacebookDM(recipientId: string, text: string) {
  // Meta Messenger API
  return { channel: "Facebook", target: recipientId, status: "sent" };
}