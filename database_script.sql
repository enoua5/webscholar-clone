ALTER TABLE `users` DROP FOREIGN KEY `users_ibfk_1`;
DROP TABLE IF EXISTS accounts;
CREATE TABLE `accounts` (
  `accountKey` INT AUTO_INCREMENT NOT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(100) NOT NULL,
  `schoolid` varchar(50) NOT NULL,
  `active` boolean NOT NULL,
  PRIMARY KEY (`accountKey`)
);

commit;

Select * from accounts;

DROP TABLE IF EXISTS users;
CREATE TABLE `users` (
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
       REFERENCES accounts(accountkey)
);

commit;

Select * from users;