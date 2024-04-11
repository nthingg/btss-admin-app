const now = new Date();
now.setHours(8, 0, 0, 0);
const eightDaysLater = new Date(now.getTime() + 27 * 24 * 60 * 60 * 1000); // Add 3 days in milliseconds
const nineDaysLater = new Date(now.getTime() + 28 * 24 * 60 * 60 * 1000); // Add 3 days in milliseconds
const tenDaysLater = new Date(now.getTime() + 29 * 24 * 60 * 60 * 1000); // Add 3 days in milliseconds

export const planData = [
  {
    departAt: eightDaysLater, //done
    departure: [106.80992590984253, 10.841327798960252], //done
    destinationId: 2, //done
    maxMemberCount: 10, //done
    maxMemberWeight: 3, //done
    departureAddress: "Đ. D1, Long Thạnh Mỹ, Quận 9, Thành phố Hồ Chí Minh", //done
    name: "test-plan-", //done
    note: "", //done
    periodCount: 11, //done
    savedProviderIds: [6, 7],
    schedule: [
      [
        {
          type: "CHECKIN",
          duration: "00:30:00",
          isStarred: false,
          description: "Check-in và nhận phòng",
          shortDescription: "Check-in Nhà nghỉ Thiên Định.",
          tempOrder: null,
        },
        {
          type: "EAT",
          duration: "01:00:00",
          isStarred: true,
          description: "Dùng bữa tại nhà hàng",
          shortDescription: "Dùng bữa tại nhà hàng 3*.",
          tempOrder: null,
        },
        {
          type: "VISIT",
          duration: "01:00:00",
          isStarred: false,
          description: "Tham quan, giải trí",
          shortDescription: "Đến bìa rừng Trà Sư và di chuyển.",
          tempOrder: null,
        },
      ],
      [
        {
          type: "VISIT",
          duration: "00:30:00",
          isStarred: false,
          description: "Ngắm cảnh",
          shortDescription: "Đến vọng Lâm Đài, ngắm toàn cảnh rừng.",
          tempOrder: null,
        },
        {
          type: "EAT",
          duration: "00:30:00",
          isStarred: true,
          description: "Dùng bữa tại nhà hàng",
          shortDescription: "Dùng bữa tại nhà hàng 3*",
          tempOrder: null,
        },
        {
          type: "FREE",
          duration: "00:15:00",
          isStarred: false,
          description: "Nghỉ ngơi",
          shortDescription: "Nghỉ ngơi với buổi tối tự túc.",
          tempOrder: null,
        },
      ],
      [
        {
          type: "EAT",
          duration: "01:00:00",
          isStarred: true,
          description: "Tập trung và dùng bữa tại nhà hàng",
          shortDescription: "Dùng bữa sáng tại nhà hàng.",
          tempOrder: null,
        },
        {
          type: "VISIT",
          duration: "02:00:00",
          isStarred: false,
          description: "Tham quan và giải trí",
          shortDescription: "Vui chơi tại cầu tre dài nhất Việt Nam.",
          tempOrder: null,
        },
        {
          type: "VISIT",
          duration: "00:30:00",
          isStarred: false,
          description: "Tham quan, giải trí",
          shortDescription: "Chụp hình tại Thành phố Bố Câu.",
          tempOrder: null,
        },
        {
          type: "EAT",
          duration: "01:00:00",
          isStarred: true,
          description: "Dùng bữa tại nhà hàng",
          shortDescription: "Dùng bữa trưa tại nhà hàng 3*",
          tempOrder: null,
        },
        {
          type: "CHECKOUT",
          duration: "00:30:00",
          isStarred: false,
          description: "Check-out và đi về",
          shortDescription: "Trả phòng và kết thúc chuyến đi.",
          tempOrder: null,
        },
      ],
      [
        {
          type: "CHECKIN",
          duration: "00:30:00",
          isStarred: false,
          description: "Check-in và nhận phòng",
          shortDescription: "Check-in Nhà nghỉ Thiên Định.",
          tempOrder: null,
        },
        {
          type: "EAT",
          duration: "01:00:00",
          isStarred: true,
          description: "Dùng bữa tại nhà hàng",
          shortDescription: "Dùng bữa tại nhà hàng 3*.",
          tempOrder: null,
        },
        {
          type: "VISIT",
          duration: "01:00:00",
          isStarred: false,
          description: "Tham quan, giải trí",
          shortDescription: "Đến bìa rừng Trà Sư và di chuyển.",
          tempOrder: null,
        },
      ],
      [
        {
          type: "CHECKIN",
          duration: "00:30:00",
          isStarred: false,
          description: "Check-in và nhận phòng",
          shortDescription: "Check-in Nhà nghỉ Thiên Định.",
          tempOrder: null,
        },
        {
          type: "EAT",
          duration: "01:00:00",
          isStarred: true,
          description: "Dùng bữa tại nhà hàng",
          shortDescription: "Dùng bữa tại nhà hàng 3*.",
          tempOrder: null,
        },
        {
          type: "VISIT",
          duration: "01:00:00",
          isStarred: false,
          description: "Tham quan, giải trí",
          shortDescription: "Đến bìa rừng Trà Sư và di chuyển.",
          tempOrder: null,
        },
      ],
      [
        {
          type: "CHECKIN",
          duration: "00:30:00",
          isStarred: false,
          description: "Check-in và nhận phòng",
          shortDescription: "Check-in Nhà nghỉ Thiên Định.",
          tempOrder: null,
        },
        {
          type: "EAT",
          duration: "01:00:00",
          isStarred: true,
          description: "Dùng bữa tại nhà hàng",
          shortDescription: "Dùng bữa tại nhà hàng 3*.",
          tempOrder: null,
        },
        {
          type: "VISIT",
          duration: "01:00:00",
          isStarred: false,
          description: "Tham quan, giải trí",
          shortDescription: "Đến bìa rừng Trà Sư và di chuyển.",
          tempOrder: null,
        },
      ],
    ],
    surcharges: [
      { alreadyDivided: true, gcoinAmount: 100000, note: "Mua thêm thức ăn" },
    ], //done
    travelDuration: "05:42:10", //done
    sourceId: null, //done
  },
];
