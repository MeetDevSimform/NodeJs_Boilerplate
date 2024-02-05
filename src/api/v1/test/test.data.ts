const TESTDATA = {
  create: {
    name: "Admin",
    description: "Role for normal users",
    permissionKeys: [
      "create_event",
      "delete_event",
      "show_orders",
      "delete_orders",
    ],
    key: Math.floor(Date.now()),
  },
  signup: {
    fname: "test",
    lname: "test",
    email: `test@test${Math.floor(Date.now())}.com`,
    password: "test@12345",
    roleKey: "user",
    isActive: true,
  },
  signin: {
    email: "test@test.com",
    password: "password",
  },
  createEvent: {
    poster: "src/api/v1/test/images.jfif",
    name: "Test Event",
    slug: `test_${Math.floor(Date.now())}`,
    startDate: new Date().toLocaleDateString(),
    endDate: new Date(new Date().getDate() + 1).toLocaleDateString(),
    description: "Test Desc",
  },
  createTicket: {
    name: "Ticket1",
    description: "Tickets for fun Event1",
    price: 500,
    quantity: 1000,
  },
  createOrder: {
    quantity: 5,
  },
};

export default TESTDATA;
