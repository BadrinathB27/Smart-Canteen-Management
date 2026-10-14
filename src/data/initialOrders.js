export const INITIAL_ORDERS = [
  {
    id: 'ord-1001',
    token: 'CN-101',
    customerName: 'Aarav Sharma',
    studentId: 'CS-2024-042',
    phone: '9876543210',
    pickupSlot: '12:30 PM - Break Slot 1',
    items: [
      { id: 'm-7', name: 'Hyderabadi Chicken Dum Biryani', price: 130, quantity: 1 },
      { id: 'm-19', name: 'Fresh Mint Lime Soda', price: 35, quantity: 1 }
    ],
    totalAmount: 165,
    status: 'Ready', // Pending | Preparing | Ready | Completed
    paymentMode: 'Campus Pay (Demo)',
    timestamp: new Date(Date.now() - 18 * 60 * 1000).toISOString(), // 18 mins ago
    estimatedMinutes: 8,
    notes: 'Extra spicy raita please'
  },
  {
    id: 'ord-1002',
    token: 'CN-102',
    customerName: 'Priya Patel',
    studentId: 'EC-2023-118',
    phone: '9812345678',
    pickupSlot: '12:45 PM - Break Slot 1',
    items: [
      { id: 'm-1', name: 'Crispy Masala Dosa', price: 60, quantity: 2 },
      { id: 'm-16', name: 'Special Ginger Masala Chai', price: 20, quantity: 2 }
    ],
    totalAmount: 160,
    status: 'Preparing',
    paymentMode: 'UPI (Demo)',
    timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(), // 10 mins ago
    estimatedMinutes: 6,
    notes: 'Chutney separated'
  },
  {
    id: 'ord-1003',
    token: 'CN-103',
    customerName: 'Rohan Verma',
    studentId: 'ME-2022-089',
    phone: '9765432109',
    pickupSlot: '1:00 PM - Break Slot 2',
    items: [
      { id: 'm-15', name: 'Cheese Maggi with Crunchy Veggies', price: 45, quantity: 1 },
      { id: 'm-18', name: 'Chilled Thick Cold Coffee with Ice Cream', price: 60, quantity: 1 }
    ],
    totalAmount: 105,
    status: 'Pending',
    paymentMode: 'Cash at Counter (Demo)',
    timestamp: new Date(Date.now() - 3 * 60 * 1000).toISOString(), // 3 mins ago
    estimatedMinutes: 5,
    notes: 'Less chili flakes'
  },
  {
    id: 'ord-1004',
    token: 'CN-104',
    customerName: 'Ananya Deshmukh',
    studentId: 'BT-2025-015',
    phone: '9845123654',
    pickupSlot: '12:15 PM - Break Slot 1',
    items: [
      { id: 'm-6', name: 'Special Campus Veg Thali', price: 90, quantity: 1 }
    ],
    totalAmount: 90,
    status: 'Completed',
    paymentMode: 'Campus Pay (Demo)',
    timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    estimatedMinutes: 0,
    notes: ''
  },
  {
    id: 'ord-1005',
    token: 'CN-105',
    customerName: 'Kabir Mehta',
    studentId: 'CS-2024-099',
    phone: '9900112233',
    pickupSlot: '12:00 PM - Morning Snack',
    items: [
      { id: 'm-11', name: 'Crispy Samosa Plate (2 Pcs)', price: 30, quantity: 2 },
      { id: 'm-16', name: 'Special Ginger Masala Chai', price: 20, quantity: 1 }
    ],
    totalAmount: 80,
    status: 'Completed',
    paymentMode: 'UPI (Demo)',
    timestamp: new Date(Date.now() - 75 * 60 * 1000).toISOString(),
    estimatedMinutes: 0,
    notes: 'Hot samosa'
  }
];

export const ORDER_STATUSES = ['Pending', 'Preparing', 'Ready', 'Completed'];
