SET FOREIGN_KEY_CHECKS=0;
DROP TABLE IF EXISTS account;
CREATE TABLE `account` (
  `accountKey` INT AUTO_INCREMENT NOT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(100) NOT NULL,
  `schoolid` varchar(50) NOT NULL,
  `active` boolean NOT NULL,
  PRIMARY KEY (`accountKey`)
);

commit;

Select * from account;
SET FOREIGN_KEY_CHECKS=1;
DROP TABLE IF EXISTS user;
CREATE TABLE `user` (
  `userkey` INT AUTO_INCREMENT NOT NULL,
  `accountkey` INT NOT NULL,
  `usertype` varchar(100) NOT NULL,
  `firstname` varchar(100) NOT NULL,
  `middlename` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `address1` varchar(100) NOT NULL,
  `address2` varchar(100) NOT NULL,
  `city` varchar(100) NOT NULL,
  `state` varchar(100) NOT NULL,
  `zipcode` varchar(10) NOT NULL,
  `school` varchar(100) NOT NULL,
  `sex` varchar(6) NOT NULL,
  `race` varchar(100) NOT NULL,
  PRIMARY KEY (`userkey`),
   FOREIGN KEY(accountkey)
       REFERENCES account(accountkey)
);

commit;

Select * from user;