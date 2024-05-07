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
    name: "kế hoạch - ", //done
    note: "", //done
    periodCount: 11, //done
    savedProviderIds: [6, 7],
    schedule: [
      [
        {
          type: "CHECKIN",
          duration: "01:00:00",
          isStarred: false,
          description: "Nhận phòng tại khách sạn lưu trú.",
          shortDescription: "Nhận phòng.",
          orderUUID: null,
        },
        {
          type: "VISIT",
          duration: "01:00:00",
          isStarred: false,
          description: "Khám phá khu vực xung quanh, đi bộ hoặc thuê xe đạp.",
          shortDescription: "Khám phá khu vực.",
          orderUUID: null,
        },
        {
          type: "EAT",
          duration: "01:00:00",
          isStarred: true,
          description: "Ăn trưa tại quán ăn địa phương.",
          shortDescription: "Ăn trưa",
          orderUUID: null,
        },
        {
          type: "VISIT",
          duration: "01:00:00",
          isStarred: false,
          description: "Tham quan các điểm du lịch địa phương.",
          shortDescription: "Tham quan.",
          orderUUID: null,
        },
        {
          type: "VISIT",
          duration: "01:00:00",
          isStarred: false,
          description:
            "Dạo chơi và tận hưởng cảnh đẹp hoàng sơ của địa phương.",
          shortDescription: "Dạo chơi.",
          orderUUID: null,
        },
        {
          type: "FREE",
          duration: "01:30:00",
          isStarred: false,
          description: "Tự túc hoặc tham gia hoạt động cộng đồng địa phương.",
          shortDescription: "Tự túc.",
          orderUUID: null,
        },
      ],
      [
        {
          type: "EAT",
          duration: "01:30:00",
          isStarred: true,
          description: "Ăn sáng tại quán cà phê hoặc nhà hàng địa phương.",
          shortDescription: "Ăn sáng.",
          orderUUID: null,
        },
        {
          type: "VISIT",
          duration: "01:30:00",
          isStarred: false,
          description: "Tham gia hoạt động mạo hiểm tại vị trí vui chơi.",
          shortDescription: "Tham gia hoạt động.",
          orderUUID: null,
        },
        {
          type: "EAT",
          duration: "01:30:00",
          isStarred: true,
          description:
            "Dùng bữa trưa cùng thiên nhiên hoặc tại một quán ăn địa phương.",
          shortDescription: "Dùng bữa.",
          orderUUID: null,
        },
        {
          type: "VISIT",
          duration: "01:30:00",
          isStarred: false,
          description:
            "Khám phá những điểm tham quan khác hoặc dành thời gian thư giãn.",
          shortDescription: "Khám phá xung quanh.",
          orderUUID: null,
        },
        {
          type: "GATHER",
          duration: "01:30:00",
          isStarred: false,
          description:
            "Tham gia hoạt động vui chơi như đốt lửa trại, tổ chức tiệc BBQ.",
          shortDescription: "Tập trung vui chơi.",
          orderUUID: null,
        },
        {
          type: "FREE",
          duration: "01:30:00",
          isStarred: false,
          description:
            "Tự túc hoặc tham gia các hoạt động giao lưu với dân địa phương như trò chơi dân gian, hòa nhạc nhỏ.",
          shortDescription: "Tự túc.",
          orderUUID: null,
        },
      ],
      [
        {
          type: "EAT",
          duration: "01:00:00",
          isStarred: true,
          description: "Ăn sáng và chuẩn bị cho một ngày mới.",
          shortDescription: "Ăn sáng.",
          orderUUID: null,
        },
        {
          type: "VISIT",
          duration: "02:00:00",
          isStarred: false,
          description:
            "Tham gia vào một hoạt động vui chơi mới tại địa điểm du lịch do trưởng đoàn tổ chức.",
          shortDescription: "Tham gia giải trí.",
          orderUUID: null,
        },
        {
          type: "EAT",
          duration: "01:00:00",
          isStarred: true,
          description:
            "Dùng bữa trưa tại một quán ăn địa phương hoặc dùng cơm trưa pic-nic ngoài trời.",
          shortDescription: "Dùng bữa.",
          orderUUID: null,
        },
        {
          type: "VISIT",
          duration: "01:30:00",
          isStarred: false,
          description: "Khám phá các địa điểm thú vị xung quanh địa điểm.",
          shortDescription: "Khám phá.",
          orderUUID: null,
        },
        {
          type: "FREE",
          duration: "01:30:00",
          isStarred: false,
          description:
            "Thư giãn và thưởng thức cảnh đẹp hoàng sơ của địa phương.",
          shortDescription: "Tự do.",
          orderUUID: null,
        },
        {
          type: "GATHER",
          duration: "01:30:00",
          isStarred: false,
          description:
            "Tự do hoặc tham gia các hoạt động giao lưu với dân địa phương như đốt lửa trại và chia sẻ câu chuyện.",
          shortDescription: "Tự túc, giao lưu với cư dân địa phương.",
          orderUUID: null,
        },
      ],
      [
        {
          type: "EAT",
          duration: "01:00:00",
          isStarred: true,
          description: "Ăn sáng và chuẩn bị cho một ngày mới.",
          shortDescription: "Ăn sáng.",
          orderUUID: null,
        },
        {
          type: "VISIT",
          duration: "02:00:00",
          isStarred: false,
          description:
            "Tham gia vào một hoạt động vui chơi mới tại địa điểm du lịch do trưởng đoàn tổ chức.",
          shortDescription: "Tham gia giải trí.",
          orderUUID: null,
        },
        {
          type: "EAT",
          duration: "01:00:00",
          isStarred: true,
          description:
            "Dùng bữa trưa tại một quán ăn địa phương hoặc dùng cơm trưa pic-nic ngoài trời.",
          shortDescription: "Dùng bữa.",
          orderUUID: null,
        },
        {
          type: "VISIT",
          duration: "01:30:00",
          isStarred: false,
          description: "Khám phá các địa điểm thú vị xung quanh địa điểm.",
          shortDescription: "Khám phá.",
          orderUUID: null,
        },
        {
          type: "FREE",
          duration: "01:30:00",
          isStarred: false,
          description:
            "Thư giãn và thưởng thức cảnh đẹp hoàng sơ của địa phương.",
          shortDescription: "Tự do.",
          orderUUID: null,
        },
        {
          type: "GATHER",
          duration: "01:30:00",
          isStarred: false,
          description:
            "Tự do hoặc tham gia các hoạt động giao lưu với dân địa phương như đốt lửa trại và chia sẻ câu chuyện.",
          shortDescription: "Tự túc, giao lưu với cư dân địa phương.",
          orderUUID: null,
        },
      ],
      [
        {
          type: "EAT",
          duration: "01:00:00",
          isStarred: true,
          description: "Ăn sáng và chuẩn bị cho một ngày mới.",
          shortDescription: "Ăn sáng.",
          orderUUID: null,
        },
        {
          type: "VISIT",
          duration: "02:00:00",
          isStarred: false,
          description:
            "Tham gia vào một hoạt động vui chơi mới tại địa điểm du lịch do trưởng đoàn tổ chức.",
          shortDescription: "Tham gia giải trí.",
          orderUUID: null,
        },
        {
          type: "EAT",
          duration: "01:00:00",
          isStarred: true,
          description:
            "Dùng bữa trưa tại một quán ăn địa phương hoặc dùng cơm trưa pic-nic ngoài trời.",
          shortDescription: "Dùng bữa.",
          orderUUID: null,
        },
        {
          type: "VISIT",
          duration: "01:30:00",
          isStarred: false,
          description: "Khám phá các địa điểm thú vị xung quanh địa điểm.",
          shortDescription: "Khám phá.",
          orderUUID: null,
        },
        {
          type: "FREE",
          duration: "01:30:00",
          isStarred: false,
          description:
            "Thư giãn và thưởng thức cảnh đẹp hoàng sơ của địa phương.",
          shortDescription: "Tự do.",
          orderUUID: null,
        },
        {
          type: "GATHER",
          duration: "01:30:00",
          isStarred: false,
          description:
            "Tự do hoặc tham gia các hoạt động giao lưu với dân địa phương như đốt lửa trại và chia sẻ câu chuyện.",
          shortDescription: "Tự túc, giao lưu với cư dân địa phương.",
          orderUUID: null,
        },
      ],
      [
        {
          type: "EAT",
          duration: "01:00:00",
          isStarred: true,
          description: "Ăn sáng và chuẩn bị cho một ngày mới.",
          shortDescription: "Ăn sáng.",
          orderUUID: null,
        },
        {
          type: "VISIT",
          duration: "02:00:00",
          isStarred: false,
          description:
            "Tham gia vào một hoạt động vui chơi mới tại địa điểm du lịch do trưởng đoàn tổ chức.",
          shortDescription: "Tham gia giải trí.",
          orderUUID: null,
        },
        {
          type: "EAT",
          duration: "01:00:00",
          isStarred: true,
          description:
            "Dùng bữa trưa tại một quán ăn địa phương hoặc dùng cơm trưa pic-nic ngoài trời.",
          shortDescription: "Dùng bữa.",
          orderUUID: null,
        },
        {
          type: "VISIT",
          duration: "01:30:00",
          isStarred: false,
          description: "Khám phá các địa điểm thú vị xung quanh địa điểm.",
          shortDescription: "Khám phá.",
          orderUUID: null,
        },
        {
          type: "FREE",
          duration: "01:30:00",
          isStarred: false,
          description:
            "Thư giãn và thưởng thức cảnh đẹp hoàng sơ của địa phương.",
          shortDescription: "Tự do.",
          orderUUID: null,
        },
        {
          type: "GATHER",
          duration: "01:30:00",
          isStarred: false,
          description:
            "Tự do hoặc tham gia các hoạt động giao lưu với dân địa phương như đốt lửa trại và chia sẻ câu chuyện.",
          shortDescription: "Tự túc, giao lưu với cư dân địa phương.",
          orderUUID: null,
        },
      ],
      [
        {
          type: "EAT",
          duration: "01:00:00",
          isStarred: true,
          description: "Ăn sáng và chuẩn bị cho một ngày mới.",
          shortDescription: "Ăn sáng.",
          orderUUID: null,
        },
        {
          type: "VISIT",
          duration: "02:00:00",
          isStarred: false,
          description:
            "Tham gia vào một hoạt động vui chơi mới tại địa điểm du lịch do trưởng đoàn tổ chức.",
          shortDescription: "Tham gia giải trí.",
          orderUUID: null,
        },
        {
          type: "EAT",
          duration: "01:00:00",
          isStarred: true,
          description:
            "Dùng bữa trưa tại một quán ăn địa phương hoặc dùng cơm trưa pic-nic ngoài trời.",
          shortDescription: "Dùng bữa.",
          orderUUID: null,
        },
        {
          type: "VISIT",
          duration: "01:30:00",
          isStarred: false,
          description: "Khám phá các địa điểm thú vị xung quanh địa điểm.",
          shortDescription: "Khám phá.",
          orderUUID: null,
        },
        {
          type: "FREE",
          duration: "01:30:00",
          isStarred: false,
          description:
            "Thư giãn và thưởng thức cảnh đẹp hoàng sơ của địa phương.",
          shortDescription: "Tự do.",
          orderUUID: null,
        },
        {
          type: "GATHER",
          duration: "01:30:00",
          isStarred: false,
          description:
            "Tự do hoặc tham gia các hoạt động giao lưu với dân địa phương như đốt lửa trại và chia sẻ câu chuyện.",
          shortDescription: "Tự túc, giao lưu với cư dân địa phương.",
          orderUUID: null,
        },
      ],
      [
        {
          type: "EAT",
          duration: "01:00:00",
          isStarred: true,
          description: "Ăn sáng và chuẩn bị cho một ngày mới.",
          shortDescription: "Ăn sáng.",
          orderUUID: null,
        },
        {
          type: "VISIT",
          duration: "02:00:00",
          isStarred: false,
          description:
            "Tham gia vào một hoạt động vui chơi mới tại địa điểm du lịch do trưởng đoàn tổ chức.",
          shortDescription: "Tham gia giải trí.",
          orderUUID: null,
        },
        {
          type: "EAT",
          duration: "01:00:00",
          isStarred: true,
          description:
            "Dùng bữa trưa tại một quán ăn địa phương hoặc dùng cơm trưa pic-nic ngoài trời.",
          shortDescription: "Dùng bữa.",
          orderUUID: null,
        },
        {
          type: "VISIT",
          duration: "01:30:00",
          isStarred: false,
          description: "Khám phá các địa điểm thú vị xung quanh địa điểm.",
          shortDescription: "Khám phá.",
          orderUUID: null,
        },
        {
          type: "FREE",
          duration: "01:30:00",
          isStarred: false,
          description:
            "Thư giãn và thưởng thức cảnh đẹp hoàng sơ của địa phương.",
          shortDescription: "Tự do.",
          orderUUID: null,
        },
        {
          type: "GATHER",
          duration: "01:30:00",
          isStarred: false,
          description:
            "Tự do hoặc tham gia các hoạt động giao lưu với dân địa phương như đốt lửa trại và chia sẻ câu chuyện.",
          shortDescription: "Tự túc, giao lưu với cư dân địa phương.",
          orderUUID: null,
        },
      ],
      [
        {
          type: "EAT",
          duration: "01:00:00",
          isStarred: true,
          description: "Ăn sáng và chuẩn bị cho một ngày mới.",
          shortDescription: "Ăn sáng.",
          orderUUID: null,
        },
        {
          type: "VISIT",
          duration: "02:00:00",
          isStarred: false,
          description:
            "Tham gia vào một hoạt động vui chơi mới tại địa điểm du lịch do trưởng đoàn tổ chức.",
          shortDescription: "Tham gia giải trí.",
          orderUUID: null,
        },
        {
          type: "EAT",
          duration: "01:00:00",
          isStarred: true,
          description:
            "Dùng bữa trưa tại một quán ăn địa phương hoặc dùng cơm trưa pic-nic ngoài trời.",
          shortDescription: "Dùng bữa.",
          orderUUID: null,
        },
        {
          type: "VISIT",
          duration: "01:30:00",
          isStarred: false,
          description: "Khám phá các địa điểm thú vị xung quanh địa điểm.",
          shortDescription: "Khám phá.",
          orderUUID: null,
        },
        {
          type: "FREE",
          duration: "01:30:00",
          isStarred: false,
          description:
            "Thư giãn và thưởng thức cảnh đẹp hoàng sơ của địa phương.",
          shortDescription: "Tự do.",
          orderUUID: null,
        },
        {
          type: "GATHER",
          duration: "01:30:00",
          isStarred: false,
          description:
            "Tự do hoặc tham gia các hoạt động giao lưu với dân địa phương như đốt lửa trại và chia sẻ câu chuyện.",
          shortDescription: "Tự túc, giao lưu với cư dân địa phương.",
          orderUUID: null,
        },
      ],
      [
        {
          type: "EAT",
          duration: "01:00:00",
          isStarred: true,
          description: "Ăn sáng và chuẩn bị cho một ngày mới.",
          shortDescription: "Ăn sáng.",
          orderUUID: null,
        },
        {
          type: "VISIT",
          duration: "02:00:00",
          isStarred: false,
          description:
            "Tham gia vào một hoạt động vui chơi mới tại địa điểm du lịch do trưởng đoàn tổ chức.",
          shortDescription: "Tham gia giải trí.",
          orderUUID: null,
        },
        {
          type: "EAT",
          duration: "01:00:00",
          isStarred: true,
          description:
            "Dùng bữa trưa tại một quán ăn địa phương hoặc dùng cơm trưa pic-nic ngoài trời.",
          shortDescription: "Dùng bữa.",
          orderUUID: null,
        },
        {
          type: "VISIT",
          duration: "01:30:00",
          isStarred: false,
          description: "Khám phá các địa điểm thú vị xung quanh địa điểm.",
          shortDescription: "Khám phá.",
          orderUUID: null,
        },
        {
          type: "FREE",
          duration: "01:30:00",
          isStarred: false,
          description:
            "Thư giãn và thưởng thức cảnh đẹp hoàng sơ của địa phương.",
          shortDescription: "Tự do.",
          orderUUID: null,
        },
        {
          type: "GATHER",
          duration: "01:30:00",
          isStarred: false,
          description:
            "Tự do hoặc tham gia các hoạt động giao lưu với dân địa phương như đốt lửa trại và chia sẻ câu chuyện.",
          shortDescription: "Tự túc, giao lưu với cư dân địa phương.",
          orderUUID: null,
        },
      ],
      [
        {
          type: "EAT",
          duration: "01:00:00",
          isStarred: true,
          description: "Ăn sáng và chuẩn bị cho một ngày mới.",
          shortDescription: "Ăn sáng.",
          orderUUID: null,
        },
        {
          type: "VISIT",
          duration: "02:00:00",
          isStarred: false,
          description:
            "Tham gia vào một hoạt động vui chơi mới tại địa điểm du lịch do trưởng đoàn tổ chức.",
          shortDescription: "Tham gia giải trí.",
          orderUUID: null,
        },
        {
          type: "EAT",
          duration: "01:00:00",
          isStarred: true,
          description:
            "Dùng bữa trưa tại một quán ăn địa phương hoặc dùng cơm trưa pic-nic ngoài trời.",
          shortDescription: "Dùng bữa.",
          orderUUID: null,
        },
        {
          type: "VISIT",
          duration: "01:30:00",
          isStarred: false,
          description: "Khám phá các địa điểm thú vị xung quanh địa điểm.",
          shortDescription: "Khám phá.",
          orderUUID: null,
        },
        {
          type: "FREE",
          duration: "01:30:00",
          isStarred: false,
          description:
            "Thư giãn và thưởng thức cảnh đẹp hoàng sơ của địa phương.",
          shortDescription: "Tự do.",
          orderUUID: null,
        },
        {
          type: "GATHER",
          duration: "01:30:00",
          isStarred: false,
          description:
            "Tự do hoặc tham gia các hoạt động giao lưu với dân địa phương như đốt lửa trại và chia sẻ câu chuyện.",
          shortDescription: "Tự túc, giao lưu với cư dân địa phương.",
          orderUUID: null,
        },
      ],
      [
        {
          type: "EAT",
          duration: "01:00:00",
          isStarred: true,
          description: "Ăn sáng và chuẩn bị cho một ngày mới.",
          shortDescription: "Ăn sáng.",
          orderUUID: null,
        },
        {
          type: "VISIT",
          duration: "02:00:00",
          isStarred: false,
          description:
            "Tham gia vào một hoạt động vui chơi mới tại địa điểm du lịch do trưởng đoàn tổ chức.",
          shortDescription: "Tham gia giải trí.",
          orderUUID: null,
        },
        {
          type: "EAT",
          duration: "01:00:00",
          isStarred: true,
          description:
            "Dùng bữa trưa tại một quán ăn địa phương hoặc dùng cơm trưa pic-nic ngoài trời.",
          shortDescription: "Dùng bữa.",
          orderUUID: null,
        },
        {
          type: "VISIT",
          duration: "01:30:00",
          isStarred: false,
          description: "Khám phá các địa điểm thú vị xung quanh địa điểm.",
          shortDescription: "Khám phá.",
          orderUUID: null,
        },
        {
          type: "FREE",
          duration: "01:30:00",
          isStarred: false,
          description:
            "Thư giãn và thưởng thức cảnh đẹp hoàng sơ của địa phương.",
          shortDescription: "Tự do.",
          orderUUID: null,
        },
        {
          type: "GATHER",
          duration: "01:30:00",
          isStarred: false,
          description:
            "Tự do hoặc tham gia các hoạt động giao lưu với dân địa phương như đốt lửa trại và chia sẻ câu chuyện.",
          shortDescription: "Tự túc, giao lưu với cư dân địa phương.",
          orderUUID: null,
        },
      ],
      [
        {
          type: "EAT",
          duration: "01:00:00",
          isStarred: true,
          description: "Ăn sáng và chuẩn bị cho một ngày mới.",
          shortDescription: "Ăn sáng.",
          orderUUID: null,
        },
        {
          type: "VISIT",
          duration: "02:00:00",
          isStarred: false,
          description:
            "Tham gia vào một hoạt động vui chơi mới tại địa điểm du lịch do trưởng đoàn tổ chức.",
          shortDescription: "Tham gia giải trí.",
          orderUUID: null,
        },
        {
          type: "EAT",
          duration: "01:00:00",
          isStarred: true,
          description:
            "Dùng bữa trưa tại một quán ăn địa phương hoặc dùng cơm trưa pic-nic ngoài trời.",
          shortDescription: "Dùng bữa.",
          orderUUID: null,
        },
        {
          type: "VISIT",
          duration: "01:30:00",
          isStarred: false,
          description: "Khám phá các địa điểm thú vị xung quanh địa điểm.",
          shortDescription: "Khám phá.",
          orderUUID: null,
        },
        {
          type: "FREE",
          duration: "01:30:00",
          isStarred: false,
          description:
            "Thư giãn và thưởng thức cảnh đẹp hoàng sơ của địa phương.",
          shortDescription: "Tự do.",
          orderUUID: null,
        },
        {
          type: "GATHER",
          duration: "01:30:00",
          isStarred: false,
          description:
            "Tự do hoặc tham gia các hoạt động giao lưu với dân địa phương như đốt lửa trại và chia sẻ câu chuyện.",
          shortDescription: "Tự túc, giao lưu với cư dân địa phương.",
          orderUUID: null,
        },
      ],
      [
        {
          type: "EAT",
          duration: "01:00:00",
          isStarred: true,
          description: "Ăn sáng và chuẩn bị cho một ngày mới.",
          shortDescription: "Ăn sáng.",
          orderUUID: null,
        },
        {
          type: "VISIT",
          duration: "02:00:00",
          isStarred: false,
          description:
            "Tham gia vào một hoạt động vui chơi mới tại địa điểm du lịch do trưởng đoàn tổ chức.",
          shortDescription: "Tham gia giải trí.",
          orderUUID: null,
        },
        {
          type: "EAT",
          duration: "01:00:00",
          isStarred: true,
          description:
            "Dùng bữa trưa tại một quán ăn địa phương hoặc dùng cơm trưa pic-nic ngoài trời.",
          shortDescription: "Dùng bữa.",
          orderUUID: null,
        },
        {
          type: "VISIT",
          duration: "01:30:00",
          isStarred: false,
          description: "Khám phá các địa điểm thú vị xung quanh địa điểm.",
          shortDescription: "Khám phá.",
          orderUUID: null,
        },
        {
          type: "FREE",
          duration: "01:30:00",
          isStarred: false,
          description:
            "Thư giãn và thưởng thức cảnh đẹp hoàng sơ của địa phương.",
          shortDescription: "Tự do.",
          orderUUID: null,
        },
        {
          type: "GATHER",
          duration: "01:30:00",
          isStarred: false,
          description:
            "Tự do hoặc tham gia các hoạt động giao lưu với dân địa phương như đốt lửa trại và chia sẻ câu chuyện.",
          shortDescription: "Tự túc, giao lưu với cư dân địa phương.",
          orderUUID: null,
        },
      ],
      [
        {
          type: "EAT",
          duration: "01:00:00",
          isStarred: false,
          description: "Ăn sáng và thu xếp đồ đạc để trả phòng.",
          shortDescription: "Ăn sáng",
          orderUUID: null,
        },
        {
          type: "FREE",
          duration: "01:00:00",
          isStarred: true,
          description:
            "Dành thời gian cuối cùng thăm lại những điểm mà bạn yêu thích nhất.",
          shortDescription: "Tự do tham quan.",
          orderUUID: null,
        },
        {
          type: "EAT",
          duration: "01:00:00",
          isStarred: false,
          description:
            "Ăn trưa lần cuối cùng tại một nhà hàng địa phương hoặc gian hàng ăn vỉa hè.",
          shortDescription: "Ăn trưa.",
          orderUUID: null,
        },
        {
          type: "GATHER",
          duration: "01:00:00",
          isStarred: false,
          description:
            "Tập hợp để chia tay và gửi lời cảm ơn đến những người bạn đồng hành.",
          shortDescription: "Tập hợp",
          orderUUID: null,
        },
        {
          type: "CHECKOUT",
          duration: "01:00:00",
          isStarred: false,
          description: "Trả phòng và chuẩn bị cho việc rời đi.",
          shortDescription: "Trả phòng",
          orderUUID: null,
        },
      ],
    ],
    surcharges: [], //done
    travelDuration: "05:30:00", //done
    sourceId: null, //done
  },
];
