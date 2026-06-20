This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## Adding a New Partner or Deal

To add, edit, or remove a partner deal/offer on the site, you only need to modify the hardcoded JSON database located at:
👉 **[app/deals.json](file:///Users/ctw03023/offpeak/app/deals.json)**

Every entry in the array corresponds to a partner/offer card on the website. Here is an example of an entry format:

```json
  {
    "id": 6,
    "image": "/card-custom.png",
    "isPartner": true,
    "category": {
      "en": "Padel",
      "pt": "Padel"
    },
    "title": {
      "en": "Custom Padel Club — Super Off-Peak Hours",
      "pt": "Custom Padel Club — Horários Super Off-Peak"
    },
    "discount": {
      "en": "45% off",
      "pt": "45% desc."
    },
    "timeSlot": {
      "en": "09:00–12:00",
      "pt": "09:00–12:00"
    },
    "days": {
      "en": "Mon–Wed",
      "pt": "Seg–Qua"
    }
  }
```

### Field Reference:
- `id`: Unique number identifier.
- `image`: Image path. Place the image in the `public/` directory (e.g. `public/card-custom.png`) and specify the URL starting with a slash (e.g. `/card-custom.png`).
- `isPartner`: If `true`, a green **"Official Partner"** / **"Parceiro Oficial"** badge will be overlayed on the card image.
- `category`: Category object with English (`en`) and Portuguese (`pt`) values.
- `title`: Title object with English (`en`) and Portuguese (`pt`) values.
- `discount`: Discount object (e.g. "50% off" / "50% desc.").
- `timeSlot`: Time Slot object (e.g. "14:00-17:00").
- `days`: Days active object (e.g. "Mon-Fri" / "Seg-Sex").

---

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

