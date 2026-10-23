/**
 * Put your REAL details here. Anything left empty ('') is simply hidden on the
 * site, so nothing fake or half-filled is ever shown to visitors.
 *
 * Save this file as: src/config/siteConfig.ts
 * (components import it as '@/config/siteConfig')
 */
export const SITE = {
  name: 'Sadaiv Yuva Foundation',

  // Contact details shown on the Contact section
  region: 'Madhya Pradesh, India',
  address: '',            // e.g. 'Full street address, City, PIN'  (leave '' to show only the region)
  phone: '',              // e.g. '+91 XXXXX XXXXX'
  emails: {
    general: 'info@sadaivyuvafoundation.org',   // please confirm these inboxes exist
    puja:    'puja@sadaivyuvafoundation.org',
    cyber:   'cyber@sadaivyuvafoundation.org',
    donate:  'donate@sadaivyuvafoundation.org',
  },

  // How the contact form delivers messages.
  // Set NEXT_PUBLIC_CONTACT_ENDPOINT in .env.local to a form service URL
  // (Formspree, Web3Forms, Getform, or your own /api route that accepts JSON POST).
  // If it is empty, the form opens the visitor's email app with the message prefilled.
  formEndpoint: process.env.NEXT_PUBLIC_CONTACT_ENDPOINT ?? '',

  // Donation details (all optional)
  donation: {
    paymentUrl: '',       // a Razorpay / payment-page link. If set, "Donate" goes here.
    upiId: '',            // e.g. 'sadaivyuva@bank'
    bank: {
      accountName: '',
      accountNumber: '',
      ifsc: '',
      bankName: '',
    },
    registrations: {
      g80: '',            // 80G registration number
      a12: '',            // 12A registration number
      pan: '',            // Foundation PAN
    },
  },
};