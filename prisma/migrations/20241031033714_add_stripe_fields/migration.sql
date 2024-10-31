/*
  Warnings:

  - You are about to alter the column `status` on the `booking` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.
  - You are about to alter the column `paymentStatus` on the `booking` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(1))`.
  - A unique constraint covering the columns `[stripeSessionId]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `booking` ADD COLUMN `metadata` JSON NULL,
    ADD COLUMN `pickupInstructions` VARCHAR(191) NULL,
    ADD COLUMN `stripeSessionId` VARCHAR(191) NULL,
    MODIFY `status` ENUM('PENDING', 'CONFIRMED', 'PICKED_UP', 'IN_PROGRESS', 'READY_FOR_DELIVERY', 'DELIVERED', 'COMPLETED', 'CANCELLED') NOT NULL DEFAULT 'PENDING',
    MODIFY `paymentStatus` ENUM('PENDING', 'PAID', 'FAILED', 'REFUNDED') NOT NULL DEFAULT 'PENDING';

-- CreateIndex
CREATE UNIQUE INDEX `Booking_stripeSessionId_key` ON `Booking`(`stripeSessionId`);
