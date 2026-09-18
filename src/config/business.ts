export interface BusinessConfig {
  businessName: string;
  tagline: string;
  logoText: string;
  phone: string;
  whatsappNumber: string; // Formatted without '+' or spaces for direct wa.me link
  displayWhatsapp: string;
  email: string;
  address: string;
  city: string;
  country: string;
  openingHours: string;
  businessHours: string;
  brandName: string;
  currency: string;
  currencySymbol: string;
  standardDeliveryFee: number;
  freeDeliveryThreshold: number;
  socialLinks: {
    instagram: string;
    facebook: string;
    tiktok: string;
    youtube: string;
  };
  announcements: string[];
}

export const businessConfig: BusinessConfig = {
  businessName: 'LUMÉRA BEAUTY',
  tagline: 'BEAUTY, ELEVATED.',
  logoText: 'LUMÉRA',
  phone: '+92 300 1234567',
  whatsappNumber: '923001234567',
  displayWhatsapp: '+92 300 1234567',
  email: 'concierge@lumerabeauty.com',
  address: 'Suite 402, Signature Galleria, MM Alam Road, Gulberg III',
  city: 'Lahore',
  country: 'Pakistan',
  openingHours: 'Mon - Sat: 10:00 AM - 9:00 PM | Sun: 1:00 PM - 8:00 PM',
  businessHours: 'Mon - Sat: 10:00 AM - 9:00 PM | Sun: 1:00 PM - 8:00 PM',
  brandName: 'LUMÉRA BEAUTY',
  currency: 'PKR',
  currencySymbol: 'Rs. ',
  standardDeliveryFee: 250,
  freeDeliveryThreshold: 5000,
  socialLinks: {
    instagram: 'https://instagram.com/lumerabeauty',
    facebook: 'https://facebook.com/lumerabeauty',
    tiktok: 'https://tiktok.com/@lumerabeauty',
    youtube: 'https://youtube.com/@lumerabeauty',
  },
  announcements: [
    'FREE DELIVERY ON ORDERS OVER RS. 5,000',
    'CASH ON DELIVERY AVAILABLE NATIONWIDE',
    'ORDER VIA WHATSAPP FOR INSTANT PERSONALIZED ASSISTANCE',
    'GLOW WEEK: UP TO 25% OFF SELECTED BEAUTY BESTSELLERS'
  ],
};

/**
 * Generate a WhatsApp chat URL with an optional prefilled message
 */
export function getWhatsAppUrl(customMessage?: string): string {
  const number = businessConfig.whatsappNumber.replace(/[^0-9]/g, '');
  if (!customMessage) {
    return `https://wa.me/${number}?text=${encodeURIComponent('Hello LUMÉRA BEAUTY, I would like to inquire about your beauty products.')}`;
  }
  return `https://wa.me/${number}?text=${encodeURIComponent(customMessage)}`;
}

/**
 * Format an order into a clean WhatsApp message
 */
export function formatOrderWhatsAppMessage(order: {
  customerName: string;
  phone: string;
  deliveryAddress: string;
  city: string;
  items: { productName: string; quantity: number; price: number; selectedColor?: string }[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  notes?: string;
}): string {
  let msg = `*NEW ORDER - LUMÉRA BEAUTY*\n\n`;
  msg += `*Customer Details:*\n`;
  msg += `• Name: ${order.customerName}\n`;
  msg += `• Phone: ${order.phone}\n`;
  msg += `• Address: ${order.deliveryAddress}\n`;
  msg += `• City: ${order.city}\n\n`;

  msg += `*Order Items:*\n`;
  order.items.forEach((item, index) => {
    const variant = item.selectedColor ? ` (${item.selectedColor})` : '';
    msg += `${index + 1}. ${item.productName}${variant} x ${item.quantity} - Rs. ${(item.price * item.quantity).toLocaleString()}\n`;
  });

  msg += `\n*Summary:*\n`;
  msg += `• Subtotal: Rs. ${order.subtotal.toLocaleString()}\n`;
  msg += `• Delivery Fee: ${order.deliveryFee === 0 ? 'FREE' : `Rs. ${order.deliveryFee}`}\n`;
  msg += `• *Total Amount:* *Rs. ${order.total.toLocaleString()}*\n`;
  msg += `• Payment Method: Cash on Delivery\n`;

  if (order.notes && order.notes.trim()) {
    msg += `• Special Notes: ${order.notes}\n`;
  }

  msg += `\nPlease confirm my order. Thank you!`;
  return msg;
}
