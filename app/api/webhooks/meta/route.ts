import { NextRequest, NextResponse } from "next/server";

// Verify token set in Meta Developer Dashboard
const VERIFY_TOKEN = process.env.META_VERIFY_TOKEN || "bizpilot_secret_token_123";

/**
 * GET Handler: Webhook Verification
 * Meta sends a GET request to verify the endpoint when setting up Webhooks.
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("[Meta Webhook] Verification successful.");
    return new NextResponse(challenge, { status: 200 });
  }

  console.warn("[Meta Webhook] Verification failed. Token mismatch.");
  return new NextResponse("Forbidden", { status: 403 });
}

/**
 * POST Handler: Incoming Webhook Events
 * Receives live updates for Instagram DMs, Facebook Messenger, and WhatsApp messages.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Verify event object type
    if (body.object === "page" || body.object === "instagram" || body.object === "whatsapp_business_account") {
      
      // Iterate through incoming entries
      for (const entry of body.entry || []) {
        
        // 1. WhatsApp Messages
        if (entry.changes) {
          for (const change of entry.changes) {
            if (change.value && change.value.messages) {
              const message = change.value.messages[0];
              const contact = change.value.contacts?.[0];

              console.log("[WhatsApp Event]", {
                senderPhone: message.from,
                senderName: contact?.profile?.name || "Unknown",
                text: message.text?.body,
                timestamp: message.timestamp,
              });

              // TODO: Call addLead() or store in DB/Context here
            }
          }
        }

        // 2. Instagram & Facebook Messenger DMs
        if (entry.messaging) {
          for (const messagingEvent of entry.messaging) {
            const senderId = messagingEvent.sender?.id;
            const text = messagingEvent.message?.text;

            console.log("[Instagram/FB Messenger Event]", {
              senderId,
              text,
              timestamp: messagingEvent.timestamp,
            });

            // TODO: Call addLead() or store in DB/Context here
          }
        }
      }

      // Return 200 OK to acknowledge receipt to Meta immediately
      return NextResponse.json({ status: "EVENT_RECEIVED" }, { status: 200 });
    }

    return NextResponse.json({ error: "Not a valid Meta event" }, { status: 404 });
  } catch (error) {
    console.error("[Meta Webhook Error]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}