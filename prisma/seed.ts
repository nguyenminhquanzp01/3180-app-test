import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function randomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function generateVietnameseName(): string {
  const firstNames = ['Nguyen', 'Tran', 'Le', 'Pham', 'Hoang', 'Phan', 'Vu'];
  const middleNames = ['Van', 'Thi', 'Minh', 'Quang', 'Duc', 'Thanh', 'Ngoc'];
  const lastNames = ['Anh', 'Hoa', 'Linh', 'Tuan', 'Khanh', 'Hung', 'Trang'];
  return `${randomElement(firstNames)} ${randomElement(middleNames)} ${randomElement(lastNames)}`;
}

function generateNationalId(): string {
  let id = '';
  for (let i = 0; i < 12; i++) {
    id += Math.floor(Math.random() * 10);
  }
  return id;
}

function generatePhoneNumber(): string {
  let phone = '0';
  for (let i = 0; i < 9; i++) {
    phone += Math.floor(Math.random() * 10);
  }
  return phone;
}

async function main() {
  // Seed apartments
  const totalFloors = 7;
  const apartmentsPerFloor = 9;
  const apartmentIds: number[] = [];

  for (let floor = 1; floor <= totalFloors; floor++) {
    for (let apt = 1; apt <= apartmentsPerFloor; apt++) {
      const apartmentNo = floor * 100 + apt; // Ensure unique apartmentNo
      const size = Math.floor(50 + Math.random() * 150); // Apartment size in square meters

      const apartment = await prisma.apartment.create({
        data: {
          apartmentNo,
          size,
        },
      });

      apartmentIds.push(apartment.apartmentNo);
    }
  }

  // Seed addresses
  const vietnamCities = [
    'Hanoi',
    'Ho Chi Minh City',
    'Da Nang',
    'Hai Phong',
    'Can Tho',
    'Nha Trang',
    'Hue',
  ];

  const targetApartments = [
    ...Array.from({ length: 7 }, (_, i) => i + 101),
    ...Array.from({ length: 7 }, (_, i) => i + 201),
    ...Array.from({ length: 7 }, (_, i) => i + 301),
    ...Array.from({ length: 7 }, (_, i) => i + 401),
    ...Array.from({ length: 7 }, (_, i) => i + 501),
  ];

  const addressIds: string[] = [];

  for (const apartmentNo of targetApartments) {
    const residentsCount = Math.floor(1 + Math.random() * 5); // 1 to 5 residents per apartment
    for (let i = 0; i < residentsCount; i++) {
      const isStaying = Math.random() < 0.5;

      const address = await prisma.address.create({
        data: {
          apartmentNo,
          permanentAddress: randomElement(vietnamCities),
          currentAddress: 'Hanoi',
          isStaying,
        },
      });

      addressIds.push(address.id);
    }
  }

  // Seed residents
  const usedAddressIds = new Set<string>();

  for (const addressId of addressIds) {
    const name = generateVietnameseName();
    let nationalId;
    do {
      nationalId = generateNationalId();
    } while (await prisma.resident.findUnique({ where: { nationalId } }));

    const phoneNumber = generatePhoneNumber();
    const gender = randomElement(['Nam', 'Nữ', 'Khác']);
    const vehicle = randomElement(['Xe đạp', 'Xe môtô / Xe gắn máy', 'Xe ôtô', 'Không']);

    if (!usedAddressIds.has(addressId)) {
      await prisma.resident.create({
        data: {
          nationalId,
          phoneNumber,
          name,
          gender,
          vehicle,
          addressId,
        },
      });
      usedAddressIds.add(addressId);
    }
  }

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
