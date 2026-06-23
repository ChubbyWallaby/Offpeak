"use server";

import { Resend } from "resend";
import { adminDb } from "@/lib/firebase-admin";
import { FieldValue, Timestamp } from "firebase-admin/firestore";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function subscribeUser(formData) {
  const email = formData.get("email");
  if (!email) {
    return { success: false, error: "Email is required" };
  }

  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: process.env.NOTIFICATION_EMAIL || "info@offpeak.pt",
      subject: "New User Subscription - Offpeak.pt",
      html: `
        <div style="font-family: sans-serif; padding: 20px; line-height: 1.5; color: #222;">
          <h2 style="color: #0070f3;">New early access request</h2>
          <p>A new user has subscribed to early access notifications for Offpeak.pt.</p>
          <p><strong>User Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Subscribed At:</strong> ${new Date().toLocaleString()}</p>
        </div>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error("Resend Email Error:", error);
    return { success: false, error: error.message };
  }
}

export async function submitBusinessPartner(formData) {
  const businessName = formData.get("businessName");
  const contactName = formData.get("contactName");
  const email = formData.get("email");
  const activityType = formData.get("activityType");
  const message = formData.get("message") || "No comments provided";

  if (!businessName || !contactName || !email || !activityType) {
    return { success: false, error: "Missing required fields" };
  }

  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: process.env.NOTIFICATION_EMAIL || "info@offpeak.pt",
      subject: `New Business Listing Request: ${businessName}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; line-height: 1.5; color: #222;">
          <h2 style="color: #0070f3;">New Business Partner Lead</h2>
          <p>A business owner has requested to list their off-peak promotions on Offpeak.pt.</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          <p><strong>Business Name:</strong> ${businessName}</p>
          <p><strong>Contact Name:</strong> ${contactName}</p>
          <p><strong>Email Address:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Activity / Experience Type:</strong> ${activityType}</p>
          <p><strong>Message / Comments:</strong></p>
          <blockquote style="background: #f9f9f9; padding: 15px; border-left: 4px solid #0070f3; margin: 0; border-radius: 4px;">
            ${message.replace(/\n/g, "<br>")}
          </blockquote>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          <p><strong>Submitted At:</strong> ${new Date().toLocaleString()}</p>
        </div>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error("Resend Email Error:", error);
    return { success: false, error: error.message };
  }
}

export async function getDeals() {
  try {
    if (!adminDb) return { success: false, error: "Firebase Admin missing" };
    const snapshot = await adminDb.collection("deals").get();
    const deals = snapshot.docs.map(doc => doc.data());
    return { success: true, deals };
  } catch (error) {
    console.error("Error reading deals from Firestore:", error);
    return { success: false, error: "Could not read deals list" };
  }
}

export async function saveDeal(dealData) {
  try {
    if (!adminDb) return { success: false, error: "Firebase Admin missing" };
    const dealsRef = adminDb.collection("deals");
    
    const generateSlug = (title) => {
      return title
        .toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
    };

    let dealId = dealData.id ? String(dealData.id) : dealsRef.doc().id;
    let existingDeal = {};
    if (dealData.id) {
      const doc = await dealsRef.doc(dealId).get();
      if (doc.exists) existingDeal = doc.data();
    }

    const newDeal = {
      ...existingDeal,
      id: dealId,
      slug: dealData.slug || existingDeal.slug || generateSlug(dealData.titlePt),
      category: {
        en: dealData.categoryEn,
        pt: dealData.categoryPt
      },
      title: {
        en: dealData.titleEn,
        pt: dealData.titlePt
      },
      timeSlot: {
        en: dealData.timeSlotEn,
        pt: dealData.timeSlotPt
      },
      days: {
        en: dealData.daysEn,
        pt: dealData.daysPt
      },
      discount: {
        en: `${dealData.baseDiscountPercent}% off`,
        pt: `${dealData.baseDiscountPercent}% desc.`
      },
      baseDiscountPercent: parseInt(dealData.baseDiscountPercent),
      minDiscountPercent: parseInt(dealData.minDiscountPercent),
      decayRate: parseFloat(dealData.decayRate || 1.0),
      ownerEmail: dealData.ownerEmail || existingDeal.ownerEmail || "admin@offpeak.pt",
      price: dealData.price ? parseFloat(dealData.price) : (existingDeal.price || null),
      image: dealData.image || existingDeal.image || "/hero-padel.png",
      isPartner: dealData.isPartner !== undefined ? dealData.isPartner : (existingDeal.isPartner !== undefined ? existingDeal.isPartner : true),
      address: {
        en: dealData.addressEn || (existingDeal.address && existingDeal.address.en) || "",
        pt: dealData.addressPt || (existingDeal.address && existingDeal.address.pt) || ""
      },
      lat: dealData.lat ? parseFloat(dealData.lat) : (existingDeal.lat || null),
      lng: dealData.lng ? parseFloat(dealData.lng) : (existingDeal.lng || null),
      description: {
        en: dealData.descriptionEn || (existingDeal.description && existingDeal.description.en) || "",
        pt: dealData.descriptionPt || (existingDeal.description && existingDeal.description.pt) || ""
      },
      hours: {
        en: dealData.hoursEn || (existingDeal.hours && existingDeal.hours.en) || "",
        pt: dealData.hoursPt || (existingDeal.hours && existingDeal.hours.pt) || ""
      },
      terms: {
        en: dealData.termsEn || (existingDeal.terms && existingDeal.terms.en) || "",
        pt: dealData.termsPt || (existingDeal.terms && existingDeal.terms.pt) || ""
      },
      photos: dealData.photos || existingDeal.photos || [],
      location: dealData.location || existingDeal.location || "",
      bookingMethod: dealData.bookingMethod || existingDeal.bookingMethod || "form",
      bookingTarget: dealData.bookingTarget || existingDeal.bookingTarget || null,
      views: existingDeal.views || 0,
      bookings: existingDeal.bookings || 0,
    };

    await dealsRef.doc(dealId).set(newDeal);
    return { success: true };
  } catch (error) {
    console.error("Error writing to Firestore deals:", error);
    return { success: false, error: "Could not save deal changes" };
  }
}

export async function deleteDeal(dealId) {
  try {
    if (!adminDb) return { success: false, error: "Firebase Admin missing" };
    await adminDb.collection("deals").doc(String(dealId)).delete();
    return { success: true };
  } catch (error) {
    console.error("Error deleting from Firestore:", error);
    return { success: false, error: "Could not delete deal" };
  }
}

export async function submitBooking(formData) {
  const dealId = formData.get("dealId");
  const name = formData.get("name");
  const date = formData.get("date");
  const time = formData.get("time") || "";
  const people = formData.get("people");
  const phone = formData.get("phone") || "";
  const email = formData.get("email") || "";
  const preferredContact = formData.get("preferredContact") || "email";

  if (!dealId || !name || !date || !people) {
    return { success: false, error: "Missing required fields" };
  }

  if (!phone && !email) {
    return { success: false, error: "Indique pelo menos um contacto (e-mail ou telefone)." };
  }

  try {
    const dealsRes = await getDeals();
    const deal = dealsRes.deals?.find((d) => String(d.id) === String(dealId));

    if (!deal) {
      return { success: false, error: "Deal not found" };
    }

    const partnerEmail = deal.ownerEmail || "info@offpeak.pt";
    const dealTitle = deal.title?.pt || deal.title?.en || "Oferta Offpeak";
    const preferredLabel = preferredContact === "phone" ? "Telefone" : "E-mail";

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: process.env.NOTIFICATION_EMAIL || "info@offpeak.pt",
      subject: `Nova Reserva Offpeak — ${dealTitle}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; line-height: 1.5; color: #222;">
          <h2 style="color: #1e2235;">Nova Reserva via Offpeak.pt</h2>
          <p>Uma nova reserva foi submetida para a oferta <strong>${dealTitle}</strong>.</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          <p><strong>Nome:</strong> ${name}</p>
          <p><strong>Data pretendida:</strong> ${date}</p>
          <p><strong>Horário pretendido:</strong> ${time || "Não especificado"}</p>
          <p><strong>Número de pessoas:</strong> ${people}</p>
          ${email ? `<p><strong>E-mail do cliente:</strong> <a href="mailto:${email}">${email}</a></p>` : ""}
          ${phone ? `<p><strong>Telefone do cliente:</strong> ${phone}</p>` : ""}
          <p><strong>Contacto preferido:</strong> ${preferredLabel}</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          <p><strong>E-mail do parceiro:</strong> <a href="mailto:${partnerEmail}">${partnerEmail}</a></p>
          <p><strong>Submetido em:</strong> ${new Date().toLocaleString("pt-PT")}</p>
          <p style="color: #6b7280; font-size: 0.85rem; margin-top: 20px;">
            Esta reserva foi gerada automaticamente via Offpeak.pt. 
            O parceiro deve confirmar diretamente com o cliente via <strong>${preferredLabel.toLowerCase()}</strong>.
          </p>
        </div>
      `,
    });

    try {
      if (adminDb) {
        await adminDb.collection("deals").doc(String(dealId)).update({
          bookings: FieldValue.increment(1)
        });
      }
    } catch (e) {
      console.error("Failed to increment bookings in Firestore", e);
    }

    return { success: true };
  } catch (error) {
    console.error("Booking submission error:", error);
    return { success: false, error: error.message };
  }
}

/* ═══════════════════════════════════════════════════
   Social Sessions — Firestore-backed actions
   ═══════════════════════════════════════════════════ */



export async function createSession(formData) {
  try {
    console.log("createSession called!");
    if (!adminDb) {
      console.log("adminDb is null! Returning error.");
      return { success: false, error: "Firebase Admin not configured" };
    }

    const activity = (formData.get("activity") || "other").trim().slice(0, 30);
    const dealSlug = (formData.get("dealSlug") || "").trim().slice(0, 100);
    const venueName = (formData.get("venueName") || "").trim().slice(0, 100);
    const dateStr = (formData.get("date") || "").trim();
    const timeSlot = (formData.get("timeSlot") || "").trim().slice(0, 20);
    const spotsTotal = Math.min(Math.max(parseInt(formData.get("spotsTotal") || "4"), 2), 20);
    const message = (formData.get("message") || "").trim().slice(0, 200);
    const creatorUid = (formData.get("creatorUid") || "").trim();
    const creatorDisplayName = (formData.get("creatorDisplayName") || "Offpeak User").trim().slice(0, 50);
    const lang = formData.get("lang") === "en" ? "en" : "pt";

    if (!venueName || !dateStr || !timeSlot || !creatorUid) {
      console.log("Missing required fields");
      return { success: false, error: "Missing required fields" };
    }

    const date = new Date(dateStr);
    if (isNaN(date.getTime()) || date < new Date()) {
      console.log("Invalid date", dateStr, date, new Date());
      return { success: false, error: "Invalid date" };
    }

    console.log("Attempting to insert into Firestore sessions collection...");
    const docRef = await adminDb.collection("sessions").add({
      activity,
      dealSlug,
      venueName,
      date: Timestamp.fromDate(date),
      timeSlot,
      spotsTotal,
      spotsFilled: 1,
      message,
      creatorUid,
      creatorDisplayName,
      participants: [],
      status: "open",
      lang,
      createdAt: Timestamp.now(),
    });
    
    console.log("Successfully created session:", docRef.id);
    return { success: true, sessionId: docRef.id };
  } catch (error) {
    console.error("CRITICAL createSession error:", error);
    // Return a completely safe, serializable object.
    return { success: false, error: error && error.message ? error.message : "Unknown error occurred" };
  }
}

export async function joinSession(formData) {
  if (!adminDb) return { success: false, error: "Firebase Admin not configured" };

  const sessionId = (formData.get("sessionId") || "").trim();
  const participantUid = (formData.get("participantUid") || "").trim();
  const participantDisplayName = (formData.get("participantDisplayName") || "Offpeak User").trim().slice(0, 50);
  const note = (formData.get("note") || "").trim().slice(0, 150);

  if (!sessionId || !participantUid) {
    return { success: false, error: "Missing required fields" };
  }

  try {
    const ref = adminDb.collection("sessions").doc(sessionId);
    const snap = await ref.get();

    if (!snap.exists) return { success: false, error: "Session not found" };

    const data = snap.data();
    if (data.status !== "open") return { success: false, error: "Session is not open" };

    const alreadyIn =
      data.participants?.some((p) => p.uid === participantUid) ||
      data.creatorUid === participantUid;
    if (alreadyIn) return { success: false, error: "Already joined" };

    const spotsLeft = data.spotsTotal - (data.participants?.length || 0) - 1;
    if (spotsLeft <= 0) return { success: false, error: "No spots left" };

    const newParticipant = {
      uid: participantUid,
      displayName: participantDisplayName,
      note,
      joinedAt: Timestamp.now(),
    };

    await ref.update({
      participants: FieldValue.arrayUnion(newParticipant),
      spotsFilled: FieldValue.increment(1),
      ...(spotsLeft === 1 ? { status: "full" } : {}),
    });

    return { success: true };
  } catch (error) {
    console.error("joinSession error:", error);
    return { success: false, error: error.message };
  }
}

export async function getSessions({ activity, limit: lim = 6 } = {}) {
  try {
    if (!adminDb) return [];

    let q = adminDb
      .collection("sessions")
      .where("status", "==", "open")
      .orderBy("date", "asc")
      .limit(lim);
    if (activity && activity !== "all") q = q.where("activity", "==", activity);
    const snap = await q.get();
    return snap.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        activity: data.activity,
        venueName: data.venueName,
        timeSlot: data.timeSlot,
        spotsTotal: data.spotsTotal,
        spotsFilled: data.spotsFilled,
        message: data.message,
        creatorDisplayName: data.creatorDisplayName,
        status: data.status,
        date: data.date?.toMillis ? data.date.toMillis() : null,
      };
    });
  } catch (error) {
    console.error("getSessions error:", error);
    return [];
  }
}
