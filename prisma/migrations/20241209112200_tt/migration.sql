-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Resident" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nationalId" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "vehicle" TEXT NOT NULL,
    "create_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "addressId" TEXT NOT NULL,
    CONSTRAINT "Resident_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "apartmentNo" INTEGER NOT NULL,
    "permanentAddress" TEXT NOT NULL,
    "currentAddress" TEXT NOT NULL,
    "isStaying" BOOLEAN NOT NULL,
    CONSTRAINT "Address_apartmentNo_fkey" FOREIGN KEY ("apartmentNo") REFERENCES "Apartment" ("apartmentNo") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DateRange" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "start_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_date" DATETIME NOT NULL,
    "type" TEXT NOT NULL,
    "addressId" TEXT NOT NULL,
    CONSTRAINT "DateRange_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Apartment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "apartmentNo" INTEGER NOT NULL,
    "size" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Fee" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "apartmentSizeFee" INTEGER NOT NULL,
    "internetFee" INTEGER NOT NULL,
    "electricityFee" INTEGER NOT NULL,
    "waterFee" INTEGER NOT NULL,
    "contributionFee" INTEGER,
    "vehicleFee" INTEGER NOT NULL,
    "notes" TEXT,
    "totalAmount" REAL NOT NULL,
    "dueDate" DATETIME NOT NULL,
    "isPaid" BOOLEAN NOT NULL DEFAULT false,
    "apartmentNo" INTEGER NOT NULL,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Fee_apartmentNo_fkey" FOREIGN KEY ("apartmentNo") REFERENCES "Apartment" ("apartmentNo") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "Resident_nationalId_key" ON "Resident"("nationalId");

-- CreateIndex
CREATE UNIQUE INDEX "Resident_addressId_key" ON "Resident"("addressId");

-- CreateIndex
CREATE UNIQUE INDEX "Apartment_apartmentNo_key" ON "Apartment"("apartmentNo");
