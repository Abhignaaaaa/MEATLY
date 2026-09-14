/**
 * Demo Data for MEATLY Customer Checkout (Karimnagar Launch Market)
 */

export const savedAddressesData = [
  {
    id: 'addr-1',
    type: 'Home',
    fullName: 'Rahul Verma',
    phone: '9876543210',
    house: 'H.No 12-4-123',
    street: 'Collectorate Road, Mukarampura',
    city: 'Karimnagar',
    state: 'Telangana',
    pincode: '505001',
    isDefault: true,
  },
  {
    id: 'addr-2',
    type: 'Work',
    fullName: 'Rahul Verma',
    phone: '9876543210',
    house: 'Plot 45, 2nd Floor',
    street: 'IT Tower Road, Kaman Circle',
    city: 'Karimnagar',
    state: 'Telangana',
    pincode: '505002',
    isDefault: false,
  },
];

export const deliveryOptionsData = [
  {
    id: 'standard',
    title: 'Standard Delivery',
    time: '25–40 min',
    price: 40,
    desc: 'Prepared and delivered fresh from local shop',
    isDefault: true,
  },
  {
    id: 'express',
    title: 'Express Fast Delivery',
    time: '15–25 min',
    price: 70,
    desc: 'Priority partner rider dispatch',
    isDefault: false,
  },
];

export const paymentMethodsData = [
  {
    id: 'upi',
    title: 'UPI Payment',
    desc: 'Pay securely using Google Pay, PhonePe, Paytm, or BHIM',
    icon: 'Smartphone',
    isDefault: true,
  },
  {
    id: 'card',
    title: 'Credit / Debit Card',
    desc: 'Visa, Mastercard, RuPay, Maestro',
    icon: 'CreditCard',
    isDefault: false,
  },
  {
    id: 'cod',
    title: 'Cash on Delivery',
    desc: 'Pay cash or UPI when your order arrives',
    icon: 'Banknote',
    isDefault: false,
  },
];
