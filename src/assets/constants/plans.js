import { v4 as uuidv4 } from "uuid";

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
          duration: "01:30:00",
          isStarred: false,
          description: "Check-in và nhận phòng",
          shortDescription: "Check-in tại khách sạn.",
          orderUUID: null,
        },
        {
          type: "EAT",
          duration: "01:00:00",
          isStarred: true,
          description: "Dùng bữa",
          shortDescription: "Mọi người tự túc bữa ăn.",
          orderUUID: null,
        },
        {
          type: "VISIT",
          duration: "01:00:00",
          isStarred: false,
          description: "Tham quan, giải trí",
          shortDescription: "Bắt đầu dạo chơi, tham quan.",
          orderUUID: null,
        },
        {
          type: "CHECKOUT",
          duration: "01:30:00",
          isStarred: false,
          description: "Check-out và đi về",
          shortDescription: "Trả phòng và kết thúc chuyến đi.",
          orderUUID: null,
        },
      ],
      [
        {
          type: "VISIT",
          duration: "01:30:00",
          isStarred: false,
          description: "Ngắm cảnh",
          shortDescription: "Ngắm cảnh đêm tại địa điểm du lịch.",
          orderUUID: null,
        },
        {
          type: "EAT",
          duration: "01:30:00",
          isStarred: true,
          description: "Dùng bữa tại nhà hàng",
          shortDescription: "Dùng bữa tại nhà hàng 3*",
          orderUUID: null,
        },
        {
          type: "FREE",
          duration: "01:30:00",
          isStarred: false,
          description: "Nghỉ ngơi",
          shortDescription: "Nghỉ ngơi với buổi tối tự túc.",
          orderUUID: null,
        },
        {
          type: "CHECKOUT",
          duration: "01:30:00",
          isStarred: false,
          description: "Check-out và đi về",
          shortDescription: "Trả phòng và kết thúc chuyến đi.",
          orderUUID: null,
        },
      ],
      [
        {
          type: "VISIT",
          duration: "02:00:00",
          isStarred: false,
          description: "Tham quan và giải trí",
          shortDescription: "Vui chơi tại vị trí tham quan.",
          orderUUID: null,
        },
        {
          type: "EAT",
          duration: "01:00:00",
          isStarred: true,
          description: "Tập trung và dùng bữa tại nhà hàng",
          shortDescription: "Dùng bữa sáng tại nhà hàng.",
          orderUUID: null,
        },
        {
          type: "VISIT",
          duration: "01:30:00",
          isStarred: false,
          description: "Tham quan, giải trí",
          shortDescription: "Chụp hình vị trí tham quan.",
          orderUUID: null,
        },
        {
          type: "CHECKOUT",
          duration: "01:30:00",
          isStarred: false,
          description: "Check-out và đi về",
          shortDescription: "Trả phòng và kết thúc chuyến đi.",
          orderUUID: null,
        },
      ],
      [
        {
          type: "CHECKIN",
          duration: "01:30:00",
          isStarred: false,
          description: "Check-in và nhận phòng",
          shortDescription: "Check-in tại nhà nghỉ.",
          orderUUID: null,
        },
        {
          type: "EAT",
          duration: "01:00:00",
          isStarred: true,
          description: "Dùng bữa",
          shortDescription: "Dùng bữa tại nơi tham quan.",
          orderUUID: null,
        },
        {
          type: "FREE",
          duration: "01:00:00",
          isStarred: false,
          description: "Hoạt động vui chơi",
          shortDescription: "Tổ chức các hoạt động vui chơi.",
          orderUUID: null,
        },
        {
          type: "CHECKOUT",
          duration: "01:30:00",
          isStarred: false,
          description: "Check-out và đi về",
          shortDescription: "Trả phòng và kết thúc chuyến đi.",
          orderUUID: null,
        },
      ],
      [
        {
          type: "CHECKIN",
          duration: "01:30:00",
          isStarred: false,
          description: "Check-in và nhận phòng",
          shortDescription: "Check-in tại nhà nghỉ.",
          orderUUID: null,
        },
        {
          type: "EAT",
          duration: "01:00:00",
          isStarred: true,
          description: "Dùng bữa",
          shortDescription: "Dùng bữa tại quán ăn.",
          orderUUID: null,
        },
        {
          type: "FREE",
          duration: "01:00:00",
          isStarred: false,
          description: "Tự giải trí",
          shortDescription: "Mọi người tự giải trí.",
          orderUUID: null,
        },
        {
          type: "CHECKOUT",
          duration: "01:30:00",
          isStarred: false,
          description: "Check-out và đi về",
          shortDescription: "Trả phòng và kết thúc chuyến đi.",
          orderUUID: null,
        },
      ],
      [
        {
          type: "CHECKIN",
          duration: "01:30:00",
          isStarred: false,
          description: "Check-in và nhận phòng",
          shortDescription: "Check-in khách sạn.",
          orderUUID: null,
        },
        {
          type: "EAT",
          duration: "01:00:00",
          isStarred: true,
          description: "Dùng bữa",
          shortDescription: "Dùng bữa tại nhà hàng.",
          orderUUID: null,
        },
        {
          type: "VISIT",
          duration: "01:00:00",
          isStarred: false,
          description: "Tham quan, giải trí",
          shortDescription: "Đến vị trí tham quan, giải trí.",
          orderUUID: null,
        },
        {
          type: "CHECKOUT",
          duration: "01:30:00",
          isStarred: false,
          description: "Check-out và đi về",
          shortDescription: "Trả phòng và kết thúc chuyến đi.",
          orderUUID: null,
        },
      ],
    ],
    surcharges: [
      { gcoinAmount: 10000, note: "Mua thêm thức ăn" },
      { gcoinAmount: 10000, note: "Phí tổ chức hoạt động vui chơi" },
      {
        gcoinAmount: 10000,
        note: "Mua dụng cụ cắm trại trong lúc tham quan",
      },
    ], //done
    travelDuration: "05:42:10", //done
    sourceId: null, //done
  },
];
