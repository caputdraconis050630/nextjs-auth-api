/*
  Warnings:

  - A unique constraint covering the columns `[userid]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `user_userid_key` ON `user`(`userid`);
