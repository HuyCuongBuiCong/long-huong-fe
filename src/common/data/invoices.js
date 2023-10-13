const invoiceList = [
  {
    id: 1,
    invoiceId: '#MN0215',
    founder: 'Marion Burton',
    founderAt: 'Skote',
    invoiceID: '14251',
    company: 'Skote Dashboard UI',
    invoicePrice: '1455',
    Amount: '$26.30',
    status: 'Paid',
    date: '10 Oct, 2020',
    color: 'success',
    orderId: '12345',
    billingAddress: 'John Smith, 1234 Main, Apt. 4B, Springfield ST 54321',
    shippingAddress: 'Kenny Rigdon, 1234 Main, Apt. 4B, Springfield ST 54321',
    card: 'Visa ending **** 4242',
    email: 'jsmith@email.com',
    orderDate: 'October 16, 2019',
    orderSummary: {
      items: [
        {
          id: 1,
          item: 'Skote',
          adminName: 'Bootstrap 4 Landing Template',
          price: '$499.00'
        },
        {
          id: 2,
          item: 'Clinic',
          adminName: 'React Bootstrap 5 Landing Template',
          price: '$399.00'
        },
        {
          id: 3,
          item: 'Dorsin',
          adminName: 'Vue 4 Landing Template',
          price: '$499.00'
        }
      ],
      subTotal: '$1397.00',
      shipping: '$13.00',
      total: '$1410.00'
    }
  },
  {
    id: 2,
    invoiceId: '#MN0214',
    image: 'avatar2',
    founder: 'Francis Witte',
    founderAt: 'Skote',
    invoiceID: '14252',
    company: 'Brand logo design',
    invoicePrice: '1024',
    Amount: '$24.20',
    status: 'Paid',
    color: 'success',
    date: '11 Oct, 2020',
    orderId: '12345',
    billingAddress: 'John Smith, 1234 Main, Apt. 4B, Springfield ST 54321',
    shippingAddress: 'Kenny Rigdon, 1234 Main, Apt. 4B, Springfield ST 54321',
    card: 'Visa ending **** 4242',
    email: 'jsmith@email.com',
    orderDate: 'October 16, 2019',
    orderSummary: {
      items: [
        {
          id: 1,
          item: 'Skote - Bootstrap 4 Admin Dashboard',
          price: '$499.00'
        },
        {
          id: 2,
          item: 'Skote - Bootstrap 4 Landing Template',
          price: '$399.00'
        },
        {
          id: 3,
          item: 'Veltrix - Bootstrap 4 Admin Template',
          price: '$499.00'
        }
      ],
      subTotal: '$1397.00',
      shipping: '$13.00',
      total: '$1410.00'
    }
  },
  {
    id: 3,
    invoiceId: '#MN0213',
    image: 'avatar2',
    founder: 'Joseph Flint',
    founderAt: 'Skote',
    invoiceID: '14253',
    company: 'Landing page Design',
    invoicePrice: '1189',
    Amount: '$20.20',
    status: 'Pending',
    color: 'warning',
    date: '12 Oct, 2020',
    orderId: '12345',
    billingAddress: 'John Smith, 1234 Main, Apt. 4B, Springfield ST 54321',
    shippingAddress: 'Kenny Rigdon, 1234 Main, Apt. 4B, Springfield ST 54321',
    card: 'Visa ending **** 4242',
    email: 'jsmith@email.com',
    orderDate: 'October 16, 2019',
    orderSummary: {
      items: [
        {
          id: 1,
          item: 'Skote - Bootstrap 4 Admin Dashboard',
          price: '$499.00'
        },
        {
          id: 2,
          item: 'Skote - Bootstrap 4 Landing Template',
          price: '$399.00'
        },
        {
          id: 3,
          item: 'Veltrix - Bootstrap 4 Admin Template',
          price: '$499.00'
        }
      ],
      subTotal: '$1397.00',
      shipping: '$13.00',
      total: '$1410.00'
    }
  },
  {
    id: 4,
    invoiceId: '#MN0212',
    image: 'avatar2',
    founder: 'Larry Nielsen',
    founderAt: 'Skote',
    invoiceID: '14254',
    company: 'Redesign - Landing page',
    invoicePrice: '1245',
    Amount: '$16.80',
    status: 'Paid',
    color: 'success',
    date: '12 Oct, 2020',
    orderId: '12345',
    billingAddress: 'John Smith, 1234 Main, Apt. 4B, Springfield ST 54321',
    shippingAddress: 'Kenny Rigdon, 1234 Main, Apt. 4B, Springfield ST 54321',
    card: 'Visa ending **** 4242',
    email: 'jsmith@email.com',
    orderDate: 'October 16, 2019',
    orderSummary: {
      items: [
        {
          id: 1,
          item: 'Skote - Bootstrap 4 Admin Dashboard',
          price: '$499.00'
        },
        {
          id: 2,
          item: 'Skote - Bootstrap 4 Landing Template',
          price: '$399.00'
        },
        {
          id: 3,
          item: 'Veltrix - Bootstrap 4 Admin Template',
          price: '$499.00'
        }
      ],
      subTotal: '$1397.00',
      shipping: '$13.00',
      total: '$1410.00'
    }
  },
  {
    id: 5,
    invoiceId: '#MN0211',
    image: 'avatar2',
    founder: 'Mark Evans',
    founderAt: 'Skote',
    invoiceID: '14255',
    company: 'Blog Template Design',
    invoicePrice: '1024',
    Amount: '$22.00',
    status: 'Paid',
    color: 'success',
    date: '11 Oct, 2020',
    orderId: '12345',
    billingAddress: 'John Smith, 1234 Main, Apt. 4B, Springfield ST 54321',
    shippingAddress: 'Kenny Rigdon, 1234 Main, Apt. 4B, Springfield ST 54321',
    card: 'Visa ending **** 4242',
    email: 'jsmith@email.com',
    orderDate: 'October 16, 2019',
    orderSummary: {
      items: [
        {
          id: 1,
          item: 'Skote - Bootstrap 4 Admin Dashboard',
          price: '$499.00'
        },
        {
          id: 2,
          item: 'Skote - Bootstrap 4 Landing Template',
          price: '$399.00'
        },
        {
          id: 3,
          item: 'Veltrix - Bootstrap 4 Admin Template',
          price: '$499.00'
        }
      ],
      subTotal: '$1397.00',
      shipping: '$13.00',
      total: '$1410.00'
    }
  },
  {
    id: 6,
    invoiceId: '#MN0210',
    founder: 'Timothy Lee',
    founderAt: 'Skote',
    invoiceID: '14256',
    company: 'Landing page Design',
    invoicePrice: '1189',
    Amount: '$15.60',
    status: 'Pending',
    date: '13 Oct, 2020',
    color: 'warning',
    orderId: '12345',
    billingAddress: 'John Smith, 1234 Main, Apt. 4B, Springfield ST 54321',
    shippingAddress: 'Kenny Rigdon, 1234 Main, Apt. 4B, Springfield ST 54321',
    card: 'Visa ending **** 4242',
    email: 'jsmith@email.com',
    orderDate: 'October 16, 2019',
    orderSummary: {
      items: [
        {
          id: 1,
          item: 'Skote - Bootstrap 4 Admin Dashboard',
          price: '$499.00'
        },
        {
          id: 2,
          item: 'Skote - Bootstrap 4 Landing Template',
          price: '$399.00'
        },
        {
          id: 3,
          item: 'Veltrix - Bootstrap 4 Admin Template',
          price: '$499.00'
        }
      ],
      subTotal: '$1397.00',
      shipping: '$13.00',
      total: '$1410.00'
    }
  },
  {
    id: 7,
    invoiceId: '#MN0209',
    image: 'avatar2',
    founder: 'Stanley Bland',
    founderAt: 'Skote',
    invoiceID: '14257',
    company: 'Landing page UI',
    invoicePrice: '1148',
    Amount: '$26.50',
    status: 'Paid',
    date: '14 Oct, 2020',
    color: 'success',
    orderId: '12345',
    billingAddress: 'John Smith, 1234 Main, Apt. 4B, Springfield ST 54321',
    shippingAddress: 'Kenny Rigdon, 1234 Main, Apt. 4B, Springfield ST 54321',
    card: 'Visa ending **** 4242',
    email: 'jsmith@email.com',
    orderDate: 'October 16, 2019',
    orderSummary: {
      items: [
        {
          id: 1,
          item: 'Skote - Bootstrap 4 Admin Dashboard',
          price: '$499.00'
        },
        {
          id: 2,
          item: 'Skote - Bootstrap 4 Landing Template',
          price: '$399.00'
        },
        {
          id: 3,
          item: 'Veltrix - Bootstrap 4 Admin Template',
          price: '$499.00'
        }
      ],
      subTotal: '$1397.00',
      shipping: '$13.00',
      total: '$1410.00'
    }
  },
  {
    id: 8,
    invoiceId: '#MN0208',
    founder: 'Tommy Wilson',
    founderAt: 'Skote',
    invoiceID: '14258',
    company: 'Redesign - Dashboard',
    invoicePrice: '1259',
    Amount: '$24.20',
    status: 'Pending',
    date: '15 Oct, 2020',
    color: 'warning',
    orderId: '12345',
    billingAddress: 'John Smith, 1234 Main, Apt. 4B, Springfield ST 54321',
    shippingAddress: 'Kenny Rigdon, 1234 Main, Apt. 4B, Springfield ST 54321',
    card: 'Visa ending **** 4242',
    email: 'jsmith@email.com',
    orderDate: 'October 16, 2019',
    orderSummary: {
      items: [
        {
          id: 1,
          item: 'Skote - Bootstrap 4 Admin Dashboard',
          price: '$499.00'
        },
        {
          id: 2,
          item: 'Skote - Bootstrap 4 Landing Template',
          price: '$399.00'
        },
        {
          id: 3,
          item: 'Veltrix - Bootstrap 4 Admin Template',
          price: '$499.00'
        }
      ],
      subTotal: '$1397.00',
      shipping: '$13.00',
      total: '$1410.00'
    }
  },
  {
    id: 9,
    invoiceId: '#MN0207',
    image: 'avatar2',
    founder: 'Louis Brandon',
    founderAt: 'Skote',
    invoiceID: '14259',
    company: 'Email Template UI',
    invoicePrice: '1355',
    Amount: '$26.5',
    status: 'Paid',
    color: 'success',
    date: '15 Oct, 2020',
    orderId: '12345',
    billingAddress: 'John Smith, 1234 Main, Apt. 4B, Springfield ST 54321',
    shippingAddress: 'Kenny Rigdon, 1234 Main, Apt. 4B, Springfield ST 54321',
    card: 'Visa ending **** 4242',
    email: 'jsmith@email.com',
    orderDate: 'October 16, 2019',
    orderSummary: {
      items: [
        {
          id: 1,
          item: 'Skote - Bootstrap 4 Admin Dashboard',
          price: '$499.00'
        },
        {
          id: 2,
          item: 'Skote - Bootstrap 4 Landing Template',
          price: '$399.00'
        },
        {
          id: 3,
          item: 'Veltrix - Bootstrap 4 Admin Template',
          price: '$499.00'
        }
      ],
      subTotal: '$1397.00',
      shipping: '$13.00',
      total: '$1410.00'
    }
  }
];

export { invoiceList };